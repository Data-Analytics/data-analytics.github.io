var width = 960,
    height = 500;

var treemap = d3.layout.treemap()
    .padding(0.5)
    .size([width, height])
    .sticky(true)
    .value(function(d) {return d.votes;})
    .children(function(d) {return d.values;});

var svg = d3.select(".par_treemap").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("xmlns", 'http://www.w3.org/2000/svg')
    .attr("xlink", 'http://www.w3.org/1999/xlink')
    .attr("version", '1.1');

d3.csv("parliament_data.csv", function(csv) {
     
    
    data_root = {"key":"treemap"};
    
     csv.forEach(function(o) {
      o.votes = parseInt(o.votes);
      o.electors = parseInt(o.electors);
      o.rank = parseInt(o.rank);
      });
      
      var nest = d3.nest()
        .key(function(d) { return d.party; })
        .entries(csv);
                
                
    data_root["values"] = nest
    
  var cell = svg.data([data_root]).selectAll("g")
      .data(treemap.nodes)
    .enter().append("a")
      .attr("xlink:href",function(d) { return 'https://www.google.co.in/search?q='+d.pc} )
      .attr("target","_blank").append("rect")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.dx; })
      .attr("height", function(d) { return d.dy; })
      .attr("data-title",function(d) { return '<p>Constituency : '+d.pc+'</p> <br/> <p>Candidate : '+d.name+'</p> <br/> <p>State : '+d.state+'</p> <br/> <p>party : '+d.party+'</p> <br/><p> percentage-votes : '+((d.votes/d.electors)*100).toFixed(2);+'</p>' ;})
      .style("fill", function(d) { return (d.color); })
      .style("opacity", function(d) { return 1 - parseFloat(0.2+(d.votes/d.electors)).toFixed(1); })
      .style("stroke", '#fff')
      .style("stroke-width", 0.5);              
      
      
      $("rect").tooltip({container: '.par_treemap', html: true, placement:'top'});
      
      });