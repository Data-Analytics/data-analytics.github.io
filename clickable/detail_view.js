function addThousandsSeparator(input) {
    var output = input
    if (parseFloat(input)) {
    input = new String(input); 
    var parts = input.split("."); 
    parts[0] = parts[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g, "$1,").split("").reverse().join("");
    output = parts.join(".");
    }

    return output;
} 

function detail_view(acct_no){

d3.csv("color_mapper.csv", function(error_color, color_data) {

color_map = {}
color_data.forEach(function (d) {
	color_map[d.party] = d.color;
});
		
	d3.csv("real_time.csv", function(data_csv) {
	
	data_set = data_csv.filter(function(d){return (d.constituency==acct_no)& (d.rank<7) })
	
	var margins = {top: 5, right: 0, bottom: 5, left: 0},
				widths = 960 - margins.left - margins.right,
				heights = 90 - margins.top - margins.bottom;
	
		var legend_bar_svg = d3.select(".detail_bar").append("svg")
				.attr("width", "100%")
				.attr("data-height","0.54")
				.attr("viewBox","0 0 "+(widths)+" "+(heights))
				.attr("xmlns", 'http://www.w3.org/2000/svg')
				.attr("xlink", 'http://www.w3.org/1999/xlink')
				.attr("version", '1.1')
				.append("g")
				.attr("transform", "translate(" + margins.left + "," + margins.top + ")");
				
	
   var party_names = ['DMK','ADMK','INC','CPM','TMC','CPI','PMK','DMDK','IMUL','VCK','MDMK','NTK','BJP','Others'];
  
  
  legend_bar_svg.selectAll("rect")
      .data(party_names)
      .enter().append("rect")
      .attr("x",  function(d,i) { return i*(widths/party_names.length) })
	  .attr("class","party-legend")
	  .attr("data-party",function(d) { return d }) 
	  .attr("data-highlight",function(d) { return "[data-party="+d+"]" }) 
	  .attr("data-toggle","highlight") 
      .attr("sub_title",function(d) { return '.'+d })
	  .attr("width", (widths/party_names.length))
      .attr("y", 20)
      .attr("height",20)
      .style("fill", function(d) { return color_map[d] })
	  .attr("stroke-width",.5)
	  .style("stroke", function(d) { return d3.rgb(color_map[d.name]).darker(); })	
	  .on("click", function(){
	  		d3.selectAll('.rect_names').style("fill", "#fff");
			//fill_color($(this).attr("sub_title"));
		});
			
  legend_bar_svg.selectAll("text")
      .data(party_names)
      .enter().append("text")
	  .attr("class",function(d,i) { return "party-legend "+d+'s'})
      .attr("x",  function(d,i) { return (i+.5)*(widths/party_names.length) })
	  .attr("y", 30)
      .attr("dy",".35em")
      .attr("sub_title",function(d) { return '.'+d })
	  .style("text-anchor","middle")
	  .style("fill", function(d) { return (parseInt(color_map[d].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
	  .on("click", function(){
	  		d3.selectAll('.rect_names').style("fill", "#fff");
			//fill_color($(this).attr("sub_title"));
		})
		.text(function(d) { return d });
		
  legend_bar_svg.selectAll(".clear")
      .data(['X'])
      .enter().append("rect")
      .attr("x",  -30)
	  .attr("class","party-legend")
	  .attr("data-party",function(d) { return d }) 
	  .attr("data-highlight",function(d) { return "[data-party="+d+"]" }) 
	  .attr("data-toggle","highlight")
	  .attr("width", 30)
      .attr("y", 20)
      .attr("height",20)
      .style("fill", function(d) { return color_map[d] })
	  .attr("stroke-width",.5)
	  .style("stroke", function(d) { return d3.rgb(color_map[d.name]).darker(); })	
	  .on("click", function(){
			fill_color('.rect_names');
		});
			
  legend_bar_svg.selectAll(".clear")
		  .data(['X'])
		  .enter().append("text")		  
		  .attr("x", -15)
		  .attr("y", 30)
		  .attr("dy",".35em")
		  .style("text-anchor","middle")
		  .style("fill", function(d) { return (parseInt(color_map[d].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
		  .on("click", function(){
			fill_color('.rect_names');
			})
			.text(function(d) { return d });

	var margin = {top: 40, right: 30, bottom: 30, left: 80},
				width = 960 - margin.left - margin.right,
				height = 420 - margin.top - margin.bottom;
	
	var horizontal_bar_svg = d3.select(".detail_bar").append("svg")
				.attr("width", "100%")
				.attr("data-height","0.54")
				.attr("viewBox","0 0 "+(width)+" "+(height))
				.attr("xmlns", 'http://www.w3.org/2000/svg')
				.attr("xlink", 'http://www.w3.org/1999/xlink')
				.attr("version", '1.1')
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				
	var constituency_name = '';
	
    data_set.forEach(function(o) {
		constituency_name = o.constituency;
	  });
    	  
	var layers = d3.layout.stack()(['votes'].map(function(period) {
	    return data_set.map(function(d) {
		  return {x: d['rank']+': '+d.party, y: parseFloat(d[period]), votes: parseFloat(d[period]), color : d.color, party:d.party,constituency:d.constituency,name:d.name,location:d.location };
		});
    }));

   var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });

    var yScale = d3.scale.ordinal()
        .domain(layers[0].map(function(d) { return d.x; }))
        .rangeRoundBands([0, height- margin.top - margin.bottom], .2);

    var x = d3.scale.linear()
        .domain([0, yGroupMax])
        .range([0, width-(margin.left*5/2)]);

	var color = d3.scale.ordinal()
		.range(["#7aa1c2","#72d8f2","#f3daa4","#66ca9b","#f7f7f7","#f7f7f7"]);
	
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")		
        .tickPadding(12)
		.ticks(4);
		
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickSize(0)
        .tickPadding(9)
        .orient("left");

	  horizontal_bar_svg.selectAll(".head_id")
		  .data([acct_no])
		  .enter().append("text")				  
		  .attr("x", width*2/5)
		  .attr("y", -12)
		  .attr("dy",".35em")
		  .attr("font-size","25px")
		  .style("text-anchor","middle")
		  .attr("fill", "#444")
			.text(function(d) { return d });
			
    var layer = horizontal_bar_svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer");
		
		d3.selectAll(".tick > text")
			.style("font-size", "13px")	
  
    var rect = layer.selectAll("rect")
        .data(function(d) { return  d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("height", yScale.rangeBand())
        .attr("x", function(d) { return  x(d.y0); })
        .attr("width", function(d) { return x(d.y); })
		.attr("data-title",function(d) { return d.location!=undefined ? '<img align="center" width="150" height="150" src=photos/'+d.location+'/><br/><br/>Constituency : '+d.constituency+' <br/> Candidate : '+d.name+' <br/> party : '+d.party+'<br/> votes : '+addThousandsSeparator(d.votes)+'' :'Constituency : '+d.constituency+' <br/> Candidate : '+d.name+' <br/> party : '+d.party+'<br/> votes : '+addThousandsSeparator(d.votes)+''})
		.style("fill", function(d,i) { return color_map[d.party]; })
		.style("stroke", function(d,i) { return d3.rgb(color_map[d.party]).darker(); });
      
	var rect = layer.selectAll("text")
        .data(function(d) { return  d; })
        .enter().append("text")
        .attr("y", function(d) { return yScale(d.x)+(yScale.rangeBand()*4/5); })
        .attr("x", function(d) { return  x(d.y)+3; })
        .style("text-anchor", "start")
		.attr("fill", "#444")
		.style("font-size","13px")
		.text(function(d) { return addThousandsSeparator(d.votes)+' votes'; })
		
    horizontal_bar_svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height -margin.bottom - margin.top) + ")")
        .call(xAxis)
		.selectAll("text").style("text-anchor", "middle")
            .attr("dx", "-.18em")
            .attr("dy", ".15em")
			.style("fill", "rgb(99, 99, 99)")
			.style("font-size","13px")

	horizontal_bar_svg.append("text")
		.attr("x", width-margin.left-margin.left-margin.right)
		.attr("y", height-(margin.top/2)-35)
		.style("fill", "rgb(99, 99, 99)")
		.style("font-size","13px")
		.style("text-anchor", "end")
		.text("Votes");
			  
    horizontal_bar_svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(yAxis)
		.selectAll("text")
			.style("fill", "rgb(99, 99, 99)")
			.style("font-size","13px");

	$("rect").tooltip({container: 'body', html: true, placement:'top'});
	
	 $(".DMKs").html("&#2980;&#3007;&#2990;&#3009;&#2965;");
	 $(".ADMKs").html("&#2949;&#2980;&#3007;&#2990;&#3009;&#2965;");
	 $(".INCs").html("&#2965;&#3006;&#2969;&#3021;")
	 $(".CPMs").html("&#2970;&#3007;&#2986;&#3007;&#2990;&#3021;");
	 $(".TMCs").html("&#2980;&#2990;&#2965;");
	 $(".CPIs").html("&#2970;&#3007;&#2986;&#3007;&#2960;");
	 $(".PMKs").html("&#2986;&#3006;&#2990;&#2965;");						 
	 $(".DMDKs").html("&#2980;&#3015;&#2990;&#3009;&#2980;&#3007;&#2965;");	 
	 $(".NCOs").html("&#2958;&#2985;&#3021;&#2970;&#3007;&#2963;");
	 $(".JNPs").html("&#2972; &#2985;&#3006;");
	 $(".MDMKs").html("&#2990;&#2980;&#3007;&#2990;&#3009;&#2965;");
	 $(".INDs").html("&#2970;&#3009;&#2991;");
	 $(".BJPs").html("&#2986;&#3006;&#2972;&#2965;");
	 $(".Otherss").html("&#2986;&#3007;&#2993;");
	 $(".NTKs").html("&#2984;&#2980;&#2965;");
	 $(".VCKs").html("&#2997;&#3007;&#2970;&#3007;&#2965;");
	 $(".IMULs").html("&#2990;&#3009; &#2994;&#3008;&#2965;&#3021;");
	 
	});
	
});		
		}