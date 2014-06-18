var margin = {top: 20, right: 80, bottom: 30, left: 60},
    width = 680 - margin.right - margin.left,
    height = 420 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse,
    formatDate = d3.time.format("%b %d");
    
function onRender() {
    
var x = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    z = d3.scale.linear().range(["white", "steelblue"]);

var xStep = 864e5,
    yStep = 100;
    
    d3.select("svg")
        .remove();
       
    var svg = d3.select(".heatmap").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    txt_value = document.getElementById('input_data').value;
    buckets = d3.csv.parse(txt_value);
    
  buckets.forEach(function(d) {
    d.date = parseDate(d.date);
    d.bucket = +d.bucket;
    d.count = +d.count;
  });

  x.domain(d3.extent(buckets, function(d) { return d.date; }));
  y.domain(d3.extent(buckets, function(d) { return d.bucket; }));
  z.domain([0, d3.max(buckets, function(d) { return d.count; })]);

  x.domain([x.domain()[0], +x.domain()[1] + xStep]);
  y.domain([y.domain()[0], y.domain()[1] + yStep]);

  svg.selectAll(".tile")
      .data(buckets)
    .enter().append("rect")
      .attr("class", "tile")
      .attr("x", function(d) { return x(d.date); })
      .attr("y", function(d) { return y(d.bucket + yStep); })
      .attr("rx", (x(xStep) - x(0))/8)
      .attr("width", x(xStep) - x(0))
      .attr("height",  y(0) - y(yStep))
      .attr('data-title',function(d) {return 'Bucket : '+d.bucket+' ,Count: '+d.count })
      .style("stroke-width", 1.5)
      .style("stroke", "#555")
      .style("fill", function(d) { return z(d.count); });
      
      
  // Add a legend for the color values.
  var legend = svg.selectAll(".legend")
      .data(z.ticks(6).slice(1).reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(" + (width + 20) + "," + (20 + i * 20) + ")"; });

  legend.append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .style("fill", z)
      .style("stroke", "#555")
      .style("stroke-width", 0.5);

  legend.append("text")
      .attr("x", 26)
      .attr("y", 10)
      .attr("dy", ".35em")
      .text(String);

  svg.append("text")
      .attr("class", "label")
      .attr("x", width + 20)
      .attr("y", 10)
      .attr("dy", ".35em")
      .text("Count");

  // Add an x-axis with label.
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.svg.axis().scale(x).ticks(d3.time.days).tickFormat(formatDate).orient("bottom"))
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .attr("text-anchor", "end")
      .text("Date");

  // Add a y-axis with label.
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.svg.axis().scale(y).orient("left"))
    .append("text")
      .attr("class", "label")
      .attr("y", 6)
      .attr("dy", ".71em")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .text("Value");
      
   $("rect").tooltip({container: 'body', html: true, placement:'right'});    
};
