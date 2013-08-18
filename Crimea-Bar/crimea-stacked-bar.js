var margin = {top: 20, right: 50, bottom: 90, left: 20},
    width = 820 - margin.right - margin.left,
    height = 450 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width]);

var y = d3.scale.linear()
    .range([0, height]);

var z = d3.scale.ordinal()
    .range(["lightpink", "darkgray", "lightblue"]);

d3.select("#render").on("click", function() {
    
    d3.select("svg")
       .remove();
           
     var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")");

    txt_value = document.getElementById('input_data').value;
    csv_txt = d3.csv.parse(txt_value);
    csv_txt.forEach(function(o){
        o.param1=parseInt(o.param1);
        o.param2=parseInt(o.param2);
        o.param3=parseInt(o.param3);
    });
    
    
  // Transpose the data into layers by cause.
  var causes = d3.layout.stack()(["param1", "param2", "param3"].map(function(cause) {
    return csv_txt.map(function(d) { //alert(d.Group);
         return {x: d.Group, y: d[cause]};
    }); 
  }));
  
  // Compute the x-domain (by date) and y-domain (by top).
  x.domain(causes[0].map(function(d) { return d.x; }));
  y.domain([0, d3.max(causes[causes.length - 1], function(d) { return d.y0 + d.y; })]);
  
  // Add a group for each cause.
  var cause = svg.selectAll("g.cause")
      .data(causes)
    .enter().append("g")
      .attr("class", "cause")
      .style("fill", function(d, i) { return z(i); })
      .style("stroke", function(d, i) { return d3.rgb(z(i)).darker(); })
      
  // Add a rect for each date.
  var rect = cause.selectAll("rect")
      .data(Object)
    .enter().append("rect")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return -y(d.y0) - y(d.y); })
      .attr("height", function(d) { return y(d.y); })
      .attr("width", x.rangeBand()) 
  rect.append("title")
        .text(function(d) { return "Group:"+d.x+", value:" +(d.y) ; });
     
  // Add y-axis rules.
  var rule = svg.selectAll("g.rule")
      .data(y.ticks(7))
    .enter().append("g")
      .attr("class", "rule")
      .attr("transform", function(d) { return "translate(0," + -y(d) + ")"; });
    
  rule.append("line")
      .attr("x2", width)
      .style("stroke", function(d) { return d ? "#fff" : "#000"; })
      .style("stroke-opacity", function(d) { return d ? .7 : null; });

  rule.append("text")
      .attr("x", width + 10)
      .attr("dy", ".35em")
      .text(d3.format(",d"))
    
});
