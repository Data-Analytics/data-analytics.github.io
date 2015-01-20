d3.select(window).on('resize', resize); 
var width = parseInt(d3.select('.pyramid_chart').style('width'), 10);
    height = width*.618,
    mid_point = Math.min(width, height)/2,
    area = Math.pow(Math.min(width, height),2)/2;
    color = d3.scale.category20();
    
var svg = d3.select(".pyramid_chart").append("svg")
    .attr("width", width)
    .attr("height", height);

function resize() {
    d3.select('.pyramid_chart').select("svg")
       .remove();
    
var width = parseInt(d3.select('.pyramid_chart').style('width'), 10);
    height = width*.618,
    mid_point = Math.min(width, height)/2,
    area = Math.pow(Math.min(width, height),2)/2;
    
var svg = d3.select(".pyramid_chart").append("svg")
    .attr("width", width)
    .attr("height", height);
    
d3.csv("data.csv", function(data) {

  data.forEach(function(d) {
    d.value = +d.value;
  });
    data.sort(function(a,b){  return d3.ascending(a.value,b.value);  });
 
 var cum_area=0 ;
 for (var i = 0; i < data.length; i++) data[i].area = cum_area+data[i].value,cum_area=cum_area+data[i].value;

  data.sort(function(a,b){  return d3.descending(a.value,b.value);  });

      rollup = d3.nest().key(function(d) {
      return d.nos;
    }).rollup(function(d) {
      return d3.sum(d, function(g) {
        return g.value;
      });
    }).entries(data);

       rollup.forEach(function(d) {
        sub_area = area/d.values
      });

 var id = 0; 
 for (var i = 0; i < data.length; i++) data[i].sl_no = id++,data[i].nos=1,data[i].sub_area = Math.sqrt(2*data[i].area*sub_area).toFixed(2);
  
  for (var i = 0; i < data.length; i++) data[i].pos_1 = mid_point -(data[i].sub_area/2),data[i].pos_2 = mid_point +(data[i].sub_area/2);
      
  var g = svg.selectAll(".arc")
      .data(data)
    .enter().append("g")
      .attr("class", "arc");
      
      g.append("a")
      .attr("xlink:href",function(d) { return  'https://www.google.co.in/search?q='+d.name} )
      .attr("target","_blank").append("path")
      .attr("d", function(d) { return  "M"+mid_point.toString()+" 0 L"+(d.pos_1).toString()+" "+(d.sub_area).toString()+" L"+(d.pos_2).toString()+" "+(d.sub_area).toString()+" Z"})
      .style("fill", function(d) { return color(d.sl_no); })
      .attr("data-title",function(d) { return '<p>State : '+d.name+'</p> <br/> <p>No of Districts : '+d.value+'</p>' ;})
      .style("stroke",function(d) { return d3.rgb(color(d.sl_no)).darker(); });
      
      $("path").tooltip({container: '.pyramid_chart', html: true, placement:'bottom'});
         
});
}