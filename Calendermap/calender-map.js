var width = 960,
    height = 105,
    cellSize = 12; // cell size
    week_days = ['sun','mon','tue','wed','thu','fri','sat']
    month = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
var day = d3.time.format("%w"),
    week = d3.time.format("%U"),
    percent = d3.format(".1%"),
    format = d3.time.format("%Y-%m-%d");

var color = d3.scale.linear().range(["white", "steelblue"])
    .domain([-.02, .04])
    
var svg = d3.select(".calender-map").selectAll("svg")
    .data(d3.range(2010, 2014))
  .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "RdYlGn")
  .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("transform", "translate(-38," + cellSize * 3.5 + ")rotate(-90)")
    .style("text-anchor", "middle")
    .text(function(d) { return d; });

for (var i=0; i<week_days.length; i++)
{    
svg.append("text")
    .attr("transform", "translate(-5," + cellSize*(i+1) + ")")
    .style("text-anchor", "end")
    .attr("dy", "-.25em")
    .text(function(d) { return week_days[i]; });
    
 }
  
var rect = svg.selectAll(".day")
    .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return week(d) * cellSize; })
    .attr("y", function(d) { return day(d) * cellSize; })
    .attr("fill",'#fff')
    .datum(format);

svg.selectAll(".month")
    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("path")
    .attr("class", "month")
    .attr("id", function(d,i){ return month[i] })
    .attr("d", monthPath);

svg.selectAll(".month")
   .append("text")
   .attr("class", function(d,i){ return month[i] })
   .style("text-anchor", "end")
   .attr("dy", "-.25em")
   .text(function(d,i){ return month[i] });

d3.csv("data.csv", function(error, csv) {
  var data = d3.nest()
    .key(function(d) { return d.Date; })
    .rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
    .map(csv);

  rect.filter(function(d) { return d in data; })
      .attr("fill", function(d) { return color(data[d]); })
      .attr("data-title", function(d) { return d + ": " + percent(data[d]); });
     
  $("rect").tooltip({container: 'body', html: true, placement:'right'});  
});

function monthPath(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = +day(t0), w0 = +week(t0),
      d1 = +day(t1), w1 = +week(t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}

