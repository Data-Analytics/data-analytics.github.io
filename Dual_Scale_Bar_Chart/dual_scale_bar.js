var margin = {top: 60, right: 60, bottom: 60, left: 60},
    width = 680 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

function onRender() {

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    d3.selectAll("svg")
       .remove();     

var svg = d3.select(".dual_scale_bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    txt_value = document.getElementById('input_data').value;
    data = d3.csv.parse(txt_value);
    var y0 = d3.scale.linear().domain([0, d3.max(data, function(d) { return d.money; })]).range([height, 0]),
        y1 = d3.scale.linear().domain([0, d3.max(data, function(d) { return d.number; })]).range([height, 0]);

    // create left yAxis
    var yAxisLeft = d3.svg.axis().scale(y0).ticks(5).orient("left");
    // create right yAxis
    var yAxisRight = d3.svg.axis().scale(y1).ticks(6).orient("right");

  x.domain(data.map(function(d) { return d.year; }));
  y0.domain([0, d3.max(data, function(d) { return d.money; })]);
  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
          .attr("class", "y axis axisLeft")
          .attr("transform", "translate(0,0)")
          .call(yAxisLeft)
        .append("text")
          .attr("y", 6)
          .attr("dy", "-2em")
          .style("text-anchor", "end")
          .style("text-anchor", "end")
          .text("Dollars");
        
  svg.append("g")
          .attr("class", "y axis axisRight")
          .attr("transform", "translate(" + (width) + ",0)")
          .call(yAxisRight)
        .append("text")
          .attr("y", 6)
          .attr("dy", "-2em")
          .attr("dx", "2em")
          .style("text-anchor", "end")
          .text("#");

  bars = svg.selectAll(".bar").data(data).enter();

  bars.append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y0(d.money); })
          .attr("height", function(d,i,j) { return height - y0(d.money); })
      .append('title').text(function(d) { return 'money : '+d.money });

  bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.year) + x.rangeBand()/2; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y1(d.number); })
          .attr("height", function(d,i,j) { return height - y1(d.number); })
       .append('title').text(function(d) { return 'number : '+d.number });

}

function type(d) {
  d.money = +d.money;
  return d;
}