var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 680 - margin.left - margin.right,
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

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });


function onRender() {   
    d3.select("svg")
       .remove();

    var svg = d3.select(".cliped_sparkline").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    txt_value = document.getElementById('input_data').value;
    data = d3.csv.parse(txt_value);	    

  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.temperature = +d.temperature;
  });

  x.domain([data[0].date, data[data.length - 1].date]);
  y.domain(d3.extent(data, function(d) { return d.temperature; }));

  svg.append("clipPath")
      .attr("id", "clip-above")
    .append("rect")
      .attr("width", width)
      .attr("height", y(55));

  svg.append("clipPath")
      .attr("id", "clip-below")
    .append("rect")
      .attr("y", y(55))
      .attr("width", width)
      .attr("height", height - y(55));

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
      .text("Temperature (ºF)");

  svg.selectAll(".line")
      .data(["above", "below"])
    .enter().append("path")
      .attr("class", function(d) { return "line " + d; })
      .attr("clip-path", function(d) { return "url(#clip-" + d + ")"; })
      .datum(data)
      .attr("d", line);
};
