
      if (!document.createElementNS) {
        document.getElementsByTagName("form")[0].style.display = "none";
      }

      var percent = (function() {
            var fmt = d3.format(".2f");
            return function(n) { return fmt(n) + "%"; };
          })(),
          fields = [
            {name: "(no scale)", id: "none"},
            {name: "Number of languages", id: "nrlangs", key: "NRLANGUAGES%d", unit: " languages"},
            {name: "Population", id: "population", key: "POPULATION%d", unit: ",000"},
            ],
          years = [2010],
          fieldsById = d3.nest()
            .key(function(d) { return d.id; })
            .rollup(function(d) { return d[0]; })
            .map(fields),
          field = fields[0],
          year = years[0],
          colors = colorbrewer.YlOrRd[3]
            //.reverse()
            .map(function(rgb) { return d3.hsl(rgb); });

      var body = d3.select("body"),
          stat = d3.select("#status");

      var fieldSelect = d3.select("#field")
        .on("change", function(e) {
          field = fields[this.selectedIndex];
          location.hash = "#" + [field.id].join("/");
        });
        
      var showLang = d3.select("#lgloc")
        .on("change",function(e){
            if(this.checked){
                d3.select("#languages").classed("nodisplay",false);
            }
            else{
                d3.select("#languages").classed("nodisplay",true);
            }
        });

      fieldSelect.selectAll("option")
        .data(fields)
        .enter()
        .append("option")
          .attr("value", function(d) { return d.id; })
          .text(function(d) { return d.name; });

      var yearSelect = d3.select("#year")
        .on("change", function(e) {
          year = years[this.selectedIndex];
          location.hash = "#" + field.id;
        });

      yearSelect.selectAll("option")
        .data(years)
        .enter()
        .append("option")
          .attr("value", function(y) { return y; })
          .text(function(y) { return y; })

      var map = d3.select("#map"),
          zoom = d3.behavior.zoom()
            .translate([-260,-25])
            .scale(1.29)

            .on("zoom", updateZoom),
          layer = map.append("g")
            .attr("id", "layer"),
          worldcountries = layer.append("g")
            .attr("id", "worldcountries")
            .selectAll("path");
          layer2 = map.append("g")
            .attr("id","layer2"),
          languages = layer.append("g")
            .attr("id","languages")
            .selectAll("circle");


      updateZoom();

      function updateZoom() {
        var scale = zoom.scale();
        layer.attr("transform",
          "translate(" + zoom.translate() + ") " +
          "scale(" + [scale, scale] + ")");
      }

      var proj = d3.geo.mercator(),
          topology,
          geometries,
          rawData,
          dataById = {},
          carto = d3.cartogram()
            .projection(proj)
            .properties(function(d) {
              return dataById[d.id];
            })
            .value(function(d) {
              return +d.properties[field];
            });

      window.onhashchange = function() {
        parseHash();
      };

      d3.json("worldcountries.topojson", function(topo) {
        topology = topo;
        geometries = topology.objects.worldcountries.geometries;

        
        d3.csv("nrlangspop.csv", function(data) {
          rawData = data;
          //console.log(data);
          dataById = d3.nest()
            .key(function(d) { return d.NAME; })
            .rollup(function(d) {  return d[0]; })
            .map(data);
            
            d3.csv("lang_coord.txt", function(data) {
                languagedata = data;

            
          init();
          
            });
          
          
        });
      });

      function init() {
        var features = carto.features(topology, geometries),
            path = d3.geo.path()
              .projection(proj);

        worldcountries = worldcountries.data(features)
          .enter()
          .append("path")
            .attr("class", "state")
            .attr("id", function(d) {
            //console.log(d)
              return d.properties.NAME;
              //return d.objects.worldcountries.geometries.id;
            })
            .attr("fill", "#fafafa")
            .attr("d", path)
            .attr("cursor","pointer");

        worldcountries.append("title");
        
        
        
        
        languages = languages.data(languagedata)
            .enter()
            .append("circle")
            .attr("class","lg")
            .attr("id",function(d){
                return d.NAME;
            })
            .attr("fill","steelblue")
            .attr("cx", function(d) {
                return proj([d.LON, d.LAT])[0];
            })
            .attr("cy", function(d) {
                return proj([d.LON, d.LAT])[1];
            })
            .attr("r", 0.5)
            .attr("pointer-events","none");
        

        parseHash();
      }

      function reset() {
        stat.text("");
        body.classed("updating", false);
        
        document.getElementById("lgloc").disabled = false;

        var features = carto.features(topology, geometries),
            path = d3.geo.path()
              .projection(proj);

        worldcountries.data(features)
          .transition()
            .duration(750)
            .ease("linear")
            .attr("fill", "#fafafa")
            .attr("d", path);

        worldcountries.select("title")
          .text(function(d) {
            return d.properties.FULLNAME;
          });
          
      }

      function update() {
        var start = Date.now();
        body.classed("updating", true);
        
        d3.select("#languages").classed("nodisplay",true)
        document.getElementById("lgloc").checked = false;
        document.getElementById("lgloc").disabled = true;

        var key = field.key.replace("%d", year),
            fmt = (typeof field.format === "function")
              ? field.format
              : d3.format(field.format || ","),
            value = function(d) {
              return +d.properties[key];
            },
            values = worldcountries.data()
              .map(value)
              .filter(function(n) {
                return !isNaN(n);
              })
              .sort(d3.ascending),
            lo = values[0],
            hi = values[values.length - 1];

        var color = d3.scale.linear()
          .range(colors)
          .domain(lo < 0
            ? [lo, 0, hi]
            : [lo, d3.mean(values), hi]);

        // normalize the scale to positive numbers
        var scale = d3.scale.linear()
          .domain([lo, hi])
          .range([10, 1000]);

        // tell the cartogram to use the scaled values
        carto.value(function(d) {
          return scale(value(d));
        });

        // generate the new features, pre-projected
        var features = carto(topology, geometries).features;

        // update the data
        worldcountries.data(features)
          .select("title")
            .text(function(d) {
              return [d.properties.FULLNAME, fmt(value(d))].join(": ") + field.unit;
            });

        worldcountries.transition()
          .duration(2750)
          .ease("linear")
          .attr("fill", function(d) {
            return color(value(d));
          })
          .attr("d", carto.path);

        var delta = (Date.now() - start) / 1000;
        stat.text(["calculated in", delta.toFixed(1), "seconds"].join(" "));
        body.classed("updating", false);
      }
      
      

      var deferredUpdate = (function() {
        var timeout;
        return function() {
          var args = arguments;
          clearTimeout(timeout);
          stat.text("calculating...");
          return timeout = setTimeout(function() {
            update.apply(null, arguments);
          }, 10);
        };
      })();

      var hashish = d3.selectAll("a.hashish")
        .datum(function() {
          return this.href;
        });

      function parseHash() {
        var parts = location.hash.substr(1).split("/"),
            desiredFieldId = parts[0],
            desiredYear = +parts[1];

        field = fieldsById[desiredFieldId] || fields[0];
        year = (years.indexOf(desiredYear) > -1) ? desiredYear : years[0];

        fieldSelect.property("selectedIndex", fields.indexOf(field));

        if (field.id === "none") {

          yearSelect.attr("disabled", "disabled");
          reset();

        } else {

          if (field.years) {
            if (field.years.indexOf(year) === -1) {
              year = field.years[0];
            }
            yearSelect.selectAll("option")
              .attr("disabled", function(y) {
                return (field.years.indexOf(y) === -1) ? "disabled" : null;
              });
          } else {
            yearSelect.selectAll("option")
              .attr("disabled", null);
          }

          yearSelect
            .property("selectedIndex", years.indexOf(year))
            .attr("disabled", null);

          deferredUpdate();
          location.replace("#" + field.id);

          hashish.attr("href", function(href) {
            return href + location.hash;
          });
        }
      }
