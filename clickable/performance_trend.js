d3.csv("color_mapper.csv", function(error_color, color_data) {

color_map = {}

color_data.forEach(function (d) {
	
	color_map[d.party] = d.color;
	
});

// load the data (using the timelyportfolio csv method)
d3.csv("real_time.csv", function(error, data) {

	var sub_width = parseInt(d3.select('.aster_chart').style('width'), 10)
		
	var margin = {top: 90, right: 20, bottom: 50, left: 20},
		width = sub_width - margin.left - margin.right,
		height = 520 - margin.top - margin.bottom;
	
    var party_performance_trend_svg = d3.select(".aster_chart").append("svg")
		    .attr("width", "100%")
            .attr("data-height","0.54")
            .attr("viewBox","0 0 "+(width + margin.left + margin.right)+" "+(height + margin.top + margin.bottom))
			.attr("xmlns", 'http://www.w3.org/2000/svg')
			.attr("xlink", 'http://www.w3.org/1999/xlink')
			.attr("version", '1.1')
			.append("g")
			.attr("transform", "translate(" + (margin.left)+ "," + (margin.top) + ")");
						
			
	var party_names = ['DMK','ADMK','INC','CPM','TMC','CPI','PMK','DMDK','NCO','JNP','MDMK','IND','BJP','Others'];
  
		  party_performance_trend_svg.selectAll("rect")
			  .data(party_names)
			  .enter().append("rect")
			  .attr("x",  function(d,i) { return i*(width/party_names.length) })
			  .attr("class",function(d,i) { return "party-legend "+d})
			  .attr("data-party",function(d) { return d }) 
			  .attr("data-highlight",function(d) { return "[data-party="+d+"]" }) 
			  .attr("data-toggle","highlight") 
			  .attr("sub_title",function(d) { return '.'+d })
			  .attr("width", (width/party_names.length))
			  .attr("y", -70)
			  .attr("height",40)
			  .style("fill", function(d) { return color_map[d] })
			  .attr("stroke-width",.5)
			  .style("stroke", function(d) { return d3.rgb(color_map[d.name]).darker(); })	
			  .on("click", function(){
					d3.selectAll('.rect_names').style("opacity", 0);
					d3.selectAll($(this).attr("sub_title")).style("opacity", 1);
					d3.selectAll($(this).attr("sub_title")+'s').style("opacity", 1);
				});
					
		  party_performance_trend_svg.selectAll(".text")
			  .data(party_names)
			  .enter().append("text")
			  .attr("x",  function(d,i) { return (i+.5)*(width/party_names.length) })
			  .attr("y", -50)
			  .attr("dy",".35em")
			  .attr("font-size","13px")
			  .attr("class",function(d) { return d })
			  .attr("sub_title",function(d) { return '.'+d })
			  .style("text-anchor","middle")
			  .style("fill", function(d) { return (parseInt(color_map[d].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
			  .on("click", function(){
				d3.selectAll('.rect_names').style("opacity", 0);
				d3.selectAll($(this).attr("sub_title")).style("opacity", 1);
				d3.selectAll($(this).attr("sub_title")+'s').style("opacity", 1);
				})
				.text(function(d) { return d });

function asterplot(basedon,side)
{			
	
		var contest_data_count = d3.nest()
			  .key(function(d) { return d[basedon]; })
			  .rollup(function(v) { return v.length; })
			  .entries(data);
			  
	winning_data_csv = data.filter(function(d){return (d.rank==1)});  
	
		var winning_data_count = d3.nest()
			  .key(function(d) { return d[basedon]; })
			  .rollup(function(v) { return v.length; })
			  .entries(winning_data_csv);
			  
		 
		winning_data_count.forEach(function(o) {
		    o.weight = o.values
			o.width  = +o.weight;
			contest_data_count.forEach(function(d) {
				if(d.key==o.key){
					o.contest = d.values
				} 

			});
			o.score  = (o.values*100/o.contest).toFixed(2);			
		});
		
		radius = Math.min(width/2, height) / 2,
		innerRadius = 0.3 * radius;

	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) { return d.width; });


		var arc = d3.svg.arc()
		  .innerRadius(innerRadius)
		  .outerRadius(function (d) { 
			return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
		  });

		var outlineArc = d3.svg.arc()
				.innerRadius(innerRadius)
				.outerRadius(radius);


  var path = party_performance_trend_svg.append("g")
				.attr("transform", "translate(" + (side*(width/4))+ ","+((height/2)+margin.bottom/2)+")")
	 .selectAll(".solidArc")
      .data(pie(winning_data_count))
    .enter().append("path")
      .attr("fill", function(d) { return side==3? color_map[d.data.key.slice(0,-1)] : color_map[d.data.key]; })
      .attr("class", "solidArc")
      .attr("stroke", function(d) { return side==3? d3.rgb(color_map[d.data.key.slice(0,-1)]).darker() : d3.rgb(color_map[d.data.key]).darker(); })
      .attr("d", arc)
	  .attr("data-title",function(d) { return  basedon+' : '+d.data.key+' <br/> contested seats : '+d.data.contest+' <br/> seats won : '+d.data.values+' <br/> convertion percentage : '+d.data.score ;});

  var outerPath = party_performance_trend_svg.append("g")
				.attr("transform", "translate(" + (side*(width/4))+ ","+((height/2)+margin.bottom/2)+")")
  .selectAll(".outlineArc")
      .data(pie(winning_data_count))
    .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);  
	
  var max_value = d3.max(winning_data_count, function(d) { return d.values; });
  winning_party = winning_data_count.filter(function(d){return (d.values==max_value)});  
  
  party_performance_trend_svg.append("g")
				.attr("transform", "translate(" + (side*(width/4))+ ","+((height/2)+margin.bottom/2)+")")
		.append("text")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
	.style("fill", "rgb(99, 99, 99)")
	.attr("font-size", 22)	// text-align: right
    .text(winning_party[0]['key']);
	
	party_performance_trend_svg.append("g")
				.attr("transform", "translate(" + (side*(width/4))+ ",0)")
		.append("text")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
	.style("fill", "rgb(99, 99, 99)")
	.attr("font-size", 22)	// text-align: right
    .text(basedon.toUpperCase());
	
      $("path").tooltip({container: '.aster_chart', html: true, placement:'top'});	  
	  
	 }
	 
	asterplot('party',1);
	asterplot('Alliance',3);

        });
  
	});
