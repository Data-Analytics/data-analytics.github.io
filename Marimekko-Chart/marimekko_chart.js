var width = 680,
    height = 420,
    margin = 24;

var x = d3.scale.linear()
    .range([0, width - 3 * margin]);

var y = d3.scale.linear()
    .range([0, height - 2 * margin]);

var z = d3.scale.category20();

var n = d3.format(",d"),
    p = d3.format("%");


function onRender() {
    
    d3.select("svg")
       .remove();
  
  var svg = d3.select("#marimekkomap").append("svg")
    .attr("width", width)
    .attr("height", height)
   .append("g")
    .attr("transform", "translate(" + 2 * margin + "," + margin + ")");

  txt_value = document.getElementById('input_data').value;
  data = d3.csv.parse(txt_value);
    
  data.forEach(function(o) {
      o.value = parseInt(o.value); });  

  var offset = 0;

  // Nest values by names. We assume each names+group is unique.
  var segments = d3.nest()
      .key(function(d) { return d.names; })
      .entries(data);

  // Compute the total sum, the per-names sum, and the per-group offset.
  // You can use reduce rather than reduceRight to reverse the ordering.
  // We also record a reference to the parent names for each group.
  var sum = segments.reduce(function(v, p) {
    return (p.offset = v) + (p.sum = p.values.reduceRight(function(v, d) {
      d.parent = p;
      return (d.offset = v) + d.value;
    }, 0));
  }, 0);

  // Add x-axis ticks.
  var xtick = svg.selectAll(".x")
      .data(x.ticks(10))
    .enter().append("g")
      .attr("class", "x")
      .attr("transform", function(d) { return "translate(" + x(d) + "," + y(1) + ")"; });

  xtick.append("line")
      .attr("y2", 6)
      .style("stroke", "#000");

  xtick.append("text")
      .attr("y", 8)
      .attr("text-anchor", "middle")
      .attr("dy", ".71em")
      .text(p);

  // Add y-axis ticks.
  var ytick = svg.selectAll(".y")
      .data(y.ticks(10))
    .enter().append("g")
      .attr("class", "y")
      .attr("transform", function(d) { return "translate(0," + y(1 - d) + ")"; });

  ytick.append("line")
      .attr("x1", -6)
      .style("stroke", "#000");

  ytick.append("text")
      .attr("x", -8)
      .attr("text-anchor", "end")
      .attr("dy", ".35em")
      .text(p);

  // Add a group for each names.
  var segments = svg.selectAll(".names")
      .data(segments)
    .enter().append("g")
      .attr("class", "names")
      .attr("xlink:title", function(d) { return d.key; })
      .attr("transform", function(d) { return "translate(" + x(d.offset / sum) + ")"; });

  // Add a rect for each group.
  var markets = segments.selectAll(".group")
      .data(function(d) { return d.values; })
    .enter().append("a")
      .attr("class", "group")
      .attr("xlink:title", function(d) { return d.group + " " + d.parent.key + ": " + n(d.value); })
    .append("rect")
      .attr("y", function(d) { return y(d.offset / d.parent.sum); })
      .attr("height", function(d) { return y(d.value / d.parent.sum); })
      .attr("width", function(d) { return x(d.parent.sum / sum); })
      .style("fill", function(d) { return z(d.group); });
};
