var width = 840,
    height = 450,
    color = d3.scale.category20b();

 d3.select("#render").on("click", function() {
    
    var div = document.getElementById("Wrappertreemap");
           div.parentNode.removeChild(div);
    
    txt_value = document.getElementById('input_data').value;
    csv_txt = d3.csv.parse(txt_value);    
    data_root = {"key":"treemap"};
    csv_txt.forEach(function(o) {
      o.param1 = parseInt(o.param1); 
      o.param2 = parseInt(o.param2);});
      
    var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) {return d.param1;})
    .children(function(d) {return d.values;});
        
    var div = d3.select("#chart").append("div")
    .style("position", "relative")
    .attr("id", "Wrappertreemap")
    .style("width", width + "px")
    .style("height", height + "px");
    
    var nest = d3.nest()
        .key(function(d) { return d.Group; })
        .entries(csv_txt);
        
        
    data_root["values"] = nest

    div.data([data_root]).selectAll("div")
          .data(treemap.nodes)
        .enter().append("div")
          .attr("class", "cell")
          .attr("id", "treemapcell")
          .style("background", function(d) { return d.values ? color(d.key) : 1; })
          .call(cell)
          .text(function(d) { return d.values ? null : d.name; });
          
      
      d3.select("#param1").on("click", function() {
        div.selectAll("div")
            .data(treemap.value(function(d) { return d.param1; }))
          .transition()
            .duration(1500)
            .call(cell);

        d3.select("#param1").classed("active", true);
        d3.select("#param2").classed("active", false);
      });
      d3.select("#param2").on("click", function() {
        div.selectAll("div")
           .data(treemap.value(function(d) { return d.param2; }))
          .transition()
            .duration(1500)
            .call(cell);

        d3.select("#param1").classed("active", false);
        d3.select("#param2").classed("active", true);
      });
});
function cell() {
  this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
} 