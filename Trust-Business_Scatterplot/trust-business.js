    var margin = {top: 30, right: 20, bottom: 20, left: 40},
        width = 920 - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom,
        x = d3.scale.linear().range([0, width]),
        y = d3.scale.linear().range([height - 60, 0]),
        //colors that will reflect geographical regions
        color = d3.scale.category10();
        
    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("xmlns", 'http://www.w3.org/2000/svg')
        .attr("xlink", 'http://www.w3.org/1999/xlink')
        .attr("version", '1.1');

// bring in the data, and do everything that is data-driven
d3.csv("trust-business.csv", function(data) {

        
    // set axes, as well as details on their ticks
    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(20)
        .tickSubdivide(true)
        .tickSize(6, 3, 0)
        .orient("bottom");
        
    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(20)
        .tickSubdivide(true)
        .tickSize(6, 3, 0)
        .orient("left");
        
    // group that will contain all of the plots
    var groups = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // array of the regions, used for the legend
    var regions = ["Asia", "Europe", "Middle East", "N. America", "S. America", "Sub-Saharan Africa"]
    
    
    // sort data alphabetically by region, so that the colors match with legend
    data.sort(function(a, b) { return d3.ascending(a.region, b.region); })
    
    var x0 = Math.max(-d3.min(data, function(d) { return d.trust; }), d3.max(data, function(d) { return d.trust; }));
    x.domain([-100, 100]);
    y.domain([180, 0])
    
    // style the circles, set their locations based on data
    var circles =
    groups.selectAll("circle")
        .data(data)
      .enter().append("a")
        .attr("xlink:href",function(d) { return 'https://www.google.co.in/search?q='+d.country } )
        .attr("target","_blank")
      .append("circle")
      .attr("class", "circles")
      .attr({
        cx: function(d) { return x(+d.trust); },
        cy: function(d) { return y(+d.business); },
        r: 8,
        id: function(d) { return d.country; }
      })
       .attr("data-title", function(d) { return d.country; })
        .style("fill", function(d) { return color(d.region); })
        .style("stroke", function(d) { return d3.rgb(color(d.region)).darker(); });
        
                  
    // the legend color guide
    var legend = svg.selectAll("rect")
            .data(regions)
        .enter().append("a")
        .attr("xlink:href",function(d) { return 'https://www.google.co.in/search?q='+d } )
        .attr("target","_blank")
        .append("rect")
        .attr({
          x: function(d, i) { return (40 + i*125); },
          y: height,
          width: 20,
          height: 10,
          rx:2
        })
        .style("fill", function(d) { return color(d); })
        .style("stroke", function(d) { return d3.rgb(color(d)).darker(); });
    
    
    // legend labels    
        svg.selectAll("text")
            .data(regions)
        .enter().append("text")
        .attr({
        x: function(d, i) { return (65 + i*125); },
        y: height + 10,
        })
        .text(function(d) { return d; });
    
      $("circle").tooltip({container: 'body', html: true, placement:'top'});  
    // draw axes and axis labels
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height - 60 + margin.top) + ")")
        .call(xAxis);
    
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis);
        
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width + 50)
        .attr("y", height - margin.top - 5)
        .text("others in society seen as trustworthy*");
        
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -20)
        .attr("y", 45)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("ease of doing business (rank)");
        
    var mouseOn = function() { 
    var circle = d3.select(this);
       circle.transition()
        .duration(800).attr("r", 16).ease("elastic");

        d3.selection.prototype.moveToFront = function() { 
          return this.each(function() { 
            this.parentNode.appendChild(this); }); 
        };

        if (!$.browser.msie) {circle.moveToFront();}
    };
    
  var mouseOff = function() {
   var circle = d3.select(this);
    circle.transition()
     .duration(800).attr("r", 8).ease("elastic");    
    };

    circles.on("mouseover", mouseOn);
    circles.on("mouseout", mouseOff);

    
    });
