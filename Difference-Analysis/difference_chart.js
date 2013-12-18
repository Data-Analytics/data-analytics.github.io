var margin = {top: 20, right: 50, bottom: 30, left: 60},
    width = 680 - margin.right - margin.left,
    height = 420 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

function onRender() {

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

    var line = d3.svg.area()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d["New York"]); });

    var area = d3.svg.area()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y1(function(d) { return y(d["New York"]); });
    
    d3.selectAll("svg")
       .remove(); 
    
    var svg = d3.select(".difference-analysis").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    txt_value = document.getElementById('input_data').value;
    data = d3.csv.parse(txt_value);

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d["New York"]= +d["New York"];
        d["Paris"] = +d["Paris"];
      });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(data, function(d) { return Math.min(d["New York"], d["Paris"]); }),
    d3.max(data, function(d) { return Math.max(d["New York"], d["Paris"]); })
  ]);

  svg.datum(data);

  svg.append("clipPath")
      .attr("id", "clip-below")
    .append("path")
      .attr("d", area.y0(height));

  svg.append("clipPath")
      .attr("id", "clip-above")
    .append("path")
      .attr("d", area.y0(0));

  svg.append("path")
      .attr("class", "area above")
      .attr("clip-path", "url(#clip-above)")
      .attr("d", area.y0(function(d) { return y(d["Paris"]); }));

  svg.append("path")
      .attr("class", "area below")
      .attr("clip-path", "url(#clip-below)")
      .attr("d", area);

  svg.append("path")
      .attr("class", "line")
      .attr("d", line);

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
};
