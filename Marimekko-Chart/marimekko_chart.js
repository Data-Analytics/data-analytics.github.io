var margin = {top: 20, right: 40, bottom: 20, left: 20},
    width = 680 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;
    
function onRender() {

    var x = d3.scale.linear()
    .range([0, width]);

    var y = d3.scale.linear()
        .range([0, height]);

    var z = d3.scale.category10();

    var n = d3.format(",d"),
        p = d3.format("%");

    
    d3.select("svg")
       .remove();
  
  var svg = d3.select("#marimekkomap").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
   .append("g")
    .attr("transform", "translate(" + 2 * margin.left + "," + margin.top + ")");

  txt_value = document.getElementById('input_data').value;
  data = d3.csv.parse(txt_value);
    
  data.forEach(function(o) {
      o.value = parseInt(o.value); });  

  var offset = 0;

  // Nest values by names. We assume each names+group is unique.
  var segments = d3.nest()
      .key(function(d) { return d.names; })
      .entries(data);

	  console.log(segments);
	  
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
      .attr("transform", function(d) { return "translate(" + x(d) + "," + y(0) + ")"; });

  xtick.append("line")
      .attr("y2", 6)
      .style("stroke", "#000");

  xtick.append("text")
      .attr("y", -10)
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
      .attr("transform", function(d) { return "translate(" + x(d.offset / sum) + ")"; });

  // Add a rect for each group.
  var markets = segments.selectAll(".group")
      .data(function(d) { return d.values; })
    .enter()
    .append("rect")
      .attr("y", function(d) { return y(d.offset / d.parent.sum); })
      .attr("height", function(d) { return y(d.value / d.parent.sum); })
      .attr("width", function(d) { return x(d.parent.sum / sum); })
      .attr("data-title", function(d) { return d.group + " - " + d.parent.key + ": " + n(d.value); })
      .style("fill", function(d) { return z(d.group); });
      
      $("rect").tooltip({container: 'body', html: true, placement:'top'});  
};
