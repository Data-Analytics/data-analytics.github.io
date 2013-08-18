var width = 960,
    height = 400;
	

var force = d3.layout.force()
    .size([width, height]);

d3.select("#render").on("click", function() {
    
    d3.select("svg")
       .remove();
           
	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

    txt_value = document.getElementById('input_data').value;
    links = d3.csv.parse(txt_value);
	
  var nodesByName = {};

  // Create nodes for each unique source and target.
  links.forEach(function(link) {
    link.source = nodeByName(link.source);
    link.target = nodeByName(link.target);
  });

  // Extract the array of nodes from the map by name.
  var nodes = d3.values(nodesByName);

  // Create the link lines.
  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("line")
      .attr("class", "link");

  // Create the node circles.
  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 4)
	  .call(force.drag);

  // Start the force layout.
  force
      .nodes(nodes)
      .links(links)
      .on("tick", tick)
      .start();

  function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  function nodeByName(name) {
    return nodesByName[name] || (nodesByName[name] = {name: name});
  }
});
