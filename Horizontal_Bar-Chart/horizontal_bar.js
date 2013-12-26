var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 680 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;


function onRender() {
    
var x = d3.scale.linear()
    .range([0, width]);
    
    d3.selectAll("svg")
       .remove();  
       
var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
    txt_value = document.getElementById('input_data').value;
    data = d3.csv.parse(txt_value);
    
  x.domain([0, d3.max(data, function(d) { return d.value; })]);

  var barHeight = height/ data.length
  
  var bar = svg.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(d.value); })
      .attr("height", barHeight - 1)
      .attr("rx", barHeight/4)
      .append("svg:title").text(function(d) { return d.name+' : '+d.value; });

  bar.append("text")
      .attr("x", function(d) { return x(d.value) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .style("fill","#fff")
      .style("text-anchor","end")
      .text(function(d) { return d.value; });
   
 bar.append("text")
      .attr("x", 3)
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .style("fill","#000")
      .style("text-anchor","start")
      .text(function(d) { return d.name; });

      
}

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}