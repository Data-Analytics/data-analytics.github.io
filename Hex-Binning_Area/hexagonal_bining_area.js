var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 960 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

var randomX = d3.random.normal(width / 2, 80),
    randomY = d3.random.normal(height / 2, 80),
    points = d3.range(800).map(function() { return [randomX(), randomY()]; });

var radius = d3.scale.sqrt()
    .domain([0, 50])
    .range([0, 20]);

var hexbin = d3.hexbin()
    .size([width, height])
    .radius(20);

var x = d3.scale.identity()
    .domain([0, width]);

var y = d3.scale.linear()
    .domain([0, height])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(6, -height);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(6, -width);

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("class", "mesh")
    .attr("width", width)
    .attr("height", height);

svg.append("g")
    .attr("clip-path", "url(#clip)")
  .selectAll(".hexagon")
    .data(hexbin(points))
  .enter().append("path")
    .attr("class", "hexagon")
    .attr("d", function(d) { return hexbin.hexagon(radius(d.length)); })
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr('data-title',function(d) { return 'value : '+d.length });

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

$("path").tooltip({container: 'body', html: true, placement:'right'});   
