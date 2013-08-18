var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

d3.select("#render").on("click", function() {
    
    d3.select("svg")
       .remove();
           
	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
    txt_value = document.getElementById('input_data').value;
    data = d3.csv.parse(txt_value);	
	
  // Coerce the data to numbers.
  data.forEach(function(d) {
    d.x = +d.x;
    d.y = +d.y;
  });

  // Compute the scales’ domains.
 // x.domain(d3.extent(data, function(d) { return d.x; }));
 // y.domain(d3.extent(data, function(d) { return d.y; }));

  // Add the x-axis.
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.svg.axis().scale(x).orient("bottom"));

  // Add the y-axis.
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.svg.axis().scale(y).orient("left"));

  // Add the points!
  svg.selectAll(".point")
      .data(data)
    .enter().append("circle")
      .attr("class", "point")
      .attr("r", 4)
	  .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); });
});
