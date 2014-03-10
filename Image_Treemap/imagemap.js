var width = 960,
    height = 500,
    color = d3.scale.category20b();

var treemap = d3.layout.treemap()
    .padding(0.5)
    .size([width, height])
    .sticky(true)
    .value(function(d) {return d.overall_life;})
    .children(function(d) {return d.values;});

var svg = d3.select(".imagemap").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("xmlns", 'http://www.w3.org/2000/svg')
    .attr("xlink", 'http://www.w3.org/1999/xlink')
    .attr("version", '1.1');

d3.csv("life_data.csv", function(csv) {
    
    data_root = {"key":"treemap"};
    
     csv.forEach(function(o) {
      o.overall_life = parseFloat(o.overall_life); });
      
      var nest = d3.nest()
        .key(function(d) { return d.url; })
        .entries(csv);
                
    data_root["values"] = nest
    
  var cell = svg.data([data_root]).selectAll("g")
      .data(treemap.nodes)
    .enter().append("a")
      .attr("xlink:href",function(d) { return d.url} )
      .attr("target","_blank").append("image")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.dx; })
      .attr("height", function(d) { return d.dy; })
      .attr("preserveAspectRatio", "defer xMidYMid slice")
      .style("stroke", '#fff')
      .style("stroke-width", 0.5)
      .attr("xlink:href",function(d) { return d.image;} )
      .attr("data-title",function(d) { return '<p>'+d.Country+' : '+d.overall_life+' Years (average life expectancy)</p>'});
      
      $("image").tooltip({container: '.imagemap', html: true, placement:'top'});

      });