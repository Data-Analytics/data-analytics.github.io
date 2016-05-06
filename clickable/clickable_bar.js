d3.csv("color_mapper.csv", function(error_color, color_data) {

color_map = {}

color_data.forEach(function (d) {
	
	color_map[d.party] = d.color;
	
});

d3.csv("sample.csv", function(data) { 
	
var margin = {top: 80, right: 20, bottom: 35, left: 20},
    width = 960 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .2);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select(".stacked_bar").append("svg")
            .style("width", "100%")
            .attr("data-height","0.54")
            .attr("viewBox","0 0 "+(width + margin.left + margin.right)+" "+(height + margin.top + margin.bottom))
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var party_names = ['DMK','ADMK','INC','CPM','TMC','CPI','PMK','DMDK','NCO','JNP','MDMK','IND','BJP','Others'];
  
  svg.selectAll("rect")
      .data(party_names)
      .enter().append("rect")
      .attr("x",  function(d,i) { return i*(width/party_names.length) })
	  .attr("class",function(d,i) { return "party-legend "+d})
	  .attr("data-party",function(d) { return d }) 
	  .attr("data-highlight",function(d) { return "[data-party="+d+"]" }) 
	  .attr("data-toggle","highlight") 
      .attr("sub_title",function(d) { return '.'+d })
	  .attr("width", (width/party_names.length))
      .attr("y", -50)
      .attr("height",20)
      .style("fill", function(d) { return color_map[d] })
	  .attr("stroke-width",.5)
	  .style("stroke", function(d) { return d3.rgb(color_map[d.name]).darker(); })	
	  .on("click", function(){
			d3.selectAll('.rect_names').style("opacity", 0);
			d3.selectAll($(this).attr("sub_title")).style("opacity", 1);
		});
			
  svg.selectAll(".text")
      .data(party_names)
      .enter().append("text")
      .attr("x",  function(d,i) { return (i+.5)*(width/party_names.length) })
	  .attr("y", -40)
      .attr("dy",".35em")
	  .attr("class",function(d) { return d })
      .attr("sub_title",function(d) { return '.'+d })
	  .style("text-anchor","middle")
	  .style("fill", function(d) { return (parseInt(color_map[d].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
	  .on("click", function(){
		d3.selectAll('.rect_names').style("opacity", 0);
		d3.selectAll($(this).attr("sub_title")).style("opacity", 1);
		})
		.text(function(d) { return d });

	 var clear = svg.selectAll(".clear")
      .data(['X'])
      .enter().append("rect")
      .attr("x",  -20)
	  .attr("class","party-legend")
	  .attr("data-party",function(d) { return d }) 
	  .attr("data-highlight",function(d) { return "[data-party="+d+"]" }) 
	  .attr("data-toggle","highlight")
	  .attr("width", 20)
      .attr("y", -50)
      .attr("height",20)
      .style("fill", function(d) { return color_map[d] })
	  .attr("stroke-width",.5)
	  .style("stroke", function(d) { return d3.rgb(color_map[d.name]).darker(); })	
	  .on("click", function(){
		d3.selectAll('.rect_names').style("opacity", 1);	
		});
			
	 var clear = svg.selectAll(".clear")
				  .data(['X'])
				  .enter().append("text")				  
				  .attr("x", -10)
				  .attr("y", -40)
				  .attr("dy",".35em")
				  .style("text-anchor","middle")
				  .style("fill", function(d) { return (parseInt(color_map[d].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
				  .on("click", function(){
					d3.selectAll('.rect_names').style("opacity", 1);
				})
					.text(function(d) { return d });
		
 data.forEach(function(d) {
        var y0 = 0;
        d.party = party_names.map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name],value: +d[name],YEAR:d['YEAR']}; });
        d.party.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; d.y0= d.y0*100,d.y1=d.y1*100 });
        d.total = d.party[d.party.length - 1].y1;
  });
	
  x.domain(data.map(function(d) { return d['YEAR']; }));
  y.domain([0, d3.max(data, function(d) { return d.total; })]);

  svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

  var party = svg.selectAll(".party")
      .data(data)
      .enter().append("g")
      .attr("class", "party")
      .attr("transform", function(d) { return "translate(" + x(d['YEAR']) + ",0)"; });

  party.selectAll("rect")
      .data(function(d) { return d.party; })
      .enter().append("rect")
	  .attr("class",function(d) { return "rect_names "+d.name })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return color_map[d.name] })
	  .style("stroke", function(d) { return d3.rgb(color_map[d.name]).darker(); })
	  .attr("data-title", function(d) { return d['YEAR']+', '+d.name+' : '+d.value+' seats'; })
	  .on("mouseover", function() { d3.select(this).attr("stroke-width", 5);})
	  .on("mouseout", function() { d3.select(this).attr("stroke-width", 1);});
	  
  party.selectAll(".value")
    .data(function(d) { return d.party; })
    .enter().append("text")
    .attr("class",function(d) { return "value rect_names" })
	.attr("y", function(d) { return ((y(d.y1)+y(d.y0))/2)-1; })
    .attr("x", x.rangeBand()/2)
	.attr("text-anchor", "middle")
	.style("font-size", "15px")
	.attr("data-title", function(d) { return d['YEAR']+', '+d.name+' : '+d.value+' seats'; })
	.style("fill", function(d) { return (parseInt(color_map[d.name].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
	.text(function(d) { return (y(d.y0) - y(d.y1))>29 ?d.value:' '; });

  party.selectAll(".name")
    .data(function(d) { return d.party; })
    .enter().append("text")
    .attr("class",function(d) { return (y(d.y0) - y(d.y1))>29 ?d.name+" name rect_names":" name rect_names" })
	.attr("y", function(d) { return ((y(d.y1)+y(d.y0))/2)+13; })
    .attr("x", x.rangeBand()/2)
	.attr("text-anchor", "middle")
	.style("font-size", "10px")
	.attr("data-title", function(d) { return d['YEAR']+', '+d.name+' : '+d.value+' seats'; })
	.style("fill", function(d) { return (parseInt(color_map[d.name].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
	.text(function(d) { return (y(d.y0) - y(d.y1))>29 ?d.name:' '; });

      $("rect").tooltip({container: '.stacked_bar', html: true, placement:'top'});
      $("text").tooltip({container: '.stacked_bar', html: true, placement:'top'});

		 $(".DMK").html("&#2980;&#3007;&#2990;&#3009;&#2965;");
		 $(".ADMK").html("&#2949;&#2980;&#3007;&#2990;&#3009;&#2965;");
		 $(".INC").html("&#2965;&#3006;&#2969;&#3021;")
		 $(".CPM").html("&#2970;&#3007;&#2986;&#3007;&#2990;&#3021;");
		 $(".TMC").html("&#2980;&#2990;&#2965;");
		 $(".CPI").html("&#2970;&#3007;&#2986;&#3007;&#2960;");
		 $(".PMK").html("&#2986;&#3006;&#2990;&#2965;");						 
		 $(".DMDK").html("&#2980;&#3015;&#2990;&#3009;&#2980;&#3007;&#2965;");	 
		 $(".NCO").html("&#2958;&#2985;&#3021;&#2970;&#3007;&#2963;");
		 $(".JNP").html("&#2972; &#2985;&#3006;");
		 $(".MDMK").html("&#2990;&#2980;&#3007;&#2990;&#3009;&#2965;");
		 $(".IND").html("&#2970;&#3009;&#2991;");
		 $(".BJP").html("&#2986;&#3006;&#2972;&#2965;");
		 $(".Others").html("&#2986;&#3007;&#2993;");
	 

	 
  });

});	