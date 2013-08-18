var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

d3.select("#render").on("click", function() {
    
    d3.select("svg")
       .remove();
           
	var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    txt_value = document.getElementById('input_data').value;
    links = d3.csv.parse(txt_value);
	
  var nodesByName = {};

  // Create nodes for each unique source and target.
  links.forEach(function(link) {
    var parent = link.source = nodeByName(link.source),
        child = link.target = nodeByName(link.target);
    if (parent.children) parent.children.push(child);
    else parent.children = [child];
  });

  // Extract the root node and compute the layout.
  var nodes = tree.nodes(links[0].source);

  // Create the link lines.
  svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  // Create the node circles.
  svg.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 4.5)
      .attr("cx", function(d) { return d.y; })
      .attr("cy", function(d) { return d.x; });

  function nodeByName(name) {
    return nodesByName[name] || (nodesByName[name] = {name: name});
  }
});
