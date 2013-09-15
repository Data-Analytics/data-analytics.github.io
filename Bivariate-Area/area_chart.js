var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 720 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.low); })
    .y1(function(d) { return y(d.high); });


d3.select("#render").on("click", function() {
    
    d3.select("svg")
		.remove();
	   
var svg = d3.select("#Bivariate-Area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    txt_value = document.getElementById('input_data').value;
    data = d3.csv.parse(txt_value);

  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.low = +d.low;
    d.high = +d.high;
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([d3.min(data, function(d) { return d.low; }), d3.max(data, function(d) { return d.high; })]);

  svg.append("path")
      .datum(data)
      .attr("class", "area")
      .style("fill", "lightgreen")
      .style("stroke", "grey")
      .attr("d", area);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("fill", "brown")
      .text("Temperature (ºF)");
});