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

d3.csv("real_time.csv", function(data_csv) {

console.log(data_csv);

d3.csv("color_mapper.csv", function(error_color, color_data) {

color_map = {}

color_data.forEach(function (d) {
	color_map[d.party] = d.color;
});

 data_set = data_csv.filter(function(d){return (d.rank==1) })

  var result_data_count = d3.nest()
			  .key(function(d) { return d.Alliance; })
			  .rollup(function(v) { return v.length; })
			  .entries(data_set);
			  
 var result_data_sub_count = d3.nest()
			  .key(function(d) { return d.Alliance; })
			  .key(function(d) { return d.party; })
			  .rollup(function(v) { return v.length; })
			  .entries(data_set);
			  
	
	result_data_sub_count.forEach(function(o) {
			result_data_count.forEach(function(d) {
				if(d.key==o.key){
					o.group_values = d.values
				} 
			});	
		});
	
var result_data_sub_count = result_data_sub_count.sort(function(a, b) { return b.group_values - a.group_values; })

	result_table  = d3.select('.result_data')
					 .selectAll('div')		 
					.data(result_data_sub_count)
					.enter()
					.append("div")
					.attr("class","col-md-2")
					.append("table")
					.attr("class","table table-condensed party-summary")
				
			result_table.append('thead')
				.append('tr')
				.selectAll("th")
					.data(function(d) { return [d.key,d.group_values] }).enter()
					.append('th')
					.text(function(o) { return o });
					
			result_table.append('tbody')
				.selectAll("tr")
				.data(function(o) { return o.values}).enter()
				.append("tr")
				.selectAll("td")
					.data(function(d) { return [d.key,d.values] }).enter()
					.append('td')
					.text(function(o) { return o });				
					
	constituency_color = {}
	Candidate = {}
	party ={}
	old_party ={}
	ali_party = {}
	votes = {}
	constituency_list =[]
	 
	 data_set.forEach(function(o) {
	  
	  o.rank = parseInt(o.rank);
	  o.year = parseInt(o.YEAR);
	  o.votes = parseInt(o.votes);
	  constituency_list.push(o.constituency)
	  votes[o.constituency] = o.votes;
	  constituency_color[o.constituency] = color_map[o.party]
	  Candidate[o.constituency] = o.name
	  party[o.constituency] = o.party
	  old_party[o.constituency] = o.old_party
	  ali_party[o.constituency] = o.Alliance
	  });
	  
	d3.selectAll("polygon").each( function(d, i){
			
	if (party[d3.select(this).attr("id")] !=undefined)
	{
    d3.select(this).attr("class",function(d) { return 'rect_names '+party[d3.select(this).attr("id")]+' '+old_party[d3.select(this).attr("id")]+'_old'+' '+ali_party[d3.select(this).attr("id")].slice(0,-1)+'p' })
	d3.select(this).attr("sub_link",function(d) { return d3.select(this).attr("id")+' '+party[d3.select(this).attr("id")]+' '+Candidate[d3.select(this).attr("id")] })
    d3.select(this).style("fill", function(d) { return constituency_color[d3.select(this).attr("id")] })
	d3.select(this).style("stroke","#333")
	d3.select(this).style("stroke-width", 2)
	d3.select(this).attr("data-title",'Constituency : '+d3.select(this).attr("id")+' <br/> Candidate : '+Candidate[d3.select(this).attr("id")]+' <br/> party : '+party[d3.select(this).attr("id")]+' <br/> votes : '+addThousandsSeparator(votes[d3.select(this).attr("id")]) )
	}
	
	});
	
  var margin = {top: 0, right: 20, bottom: 35, left: 125},
		width = 1750 - margin.left - margin.right,
		height = 1200 - margin.top - margin.bottom;

  var party_names = ['DMK','ADMK','INC','CPM','TMC','CPI','PMK','DMDK','IMUL','VC','MDMK','NTK','BJP','Others'];
  
  var sub_party_names = ['DMK','ADMK','INC','CPM','CPI','PMK','DMDK','Others'];
  
  var alli_names = ['DMK+','ADMK+','PWF+','PMK+','BJP+','NTK+'];
  
  svg = d3.select(".geo_map")
		.select("svg")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
 old_svg = d3.select(".geo_map")
		.select("svg")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");		
			
 head_svg = d3.select(".geo_map")
		.select("svg")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");		
						

 alli_svg = d3.select(".geo_map")
		.select("svg")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");		

  alli_svg.selectAll("rect")
      .data(alli_names)
      .enter().append("rect")
      .attr("x",  function(d,i) { return i>2? (i-3)*(width/party_names.length) : i*(width/party_names.length) })
	  .attr("class","party-legend")
	  .attr("data-party",function(d) { return d }) 
	  .attr("data-highlight",function(d) { return "[data-party="+d+"]" }) 
	  .attr("data-toggle","highlight") 
      .attr("sub_title",function(d) { return '.'+d.slice(0,-1)+'p' })
	  .attr("width", (width/party_names.length))
      .attr("y", function(d,i) { return i>2? 250 : 200 })
      .attr("height",50)
      .style("fill", function(d) { return color_map[d.slice(0,-1)] })
	  .attr("stroke-width",.5)
	  .style("stroke", function(d) { return d3.rgb(color_map[d.name]).darker(); })	
	  .on("click", function(){
	  		d3.selectAll('.rect_names').style("fill", "#fff");
			fill_color($(this).attr("sub_title"),1);
		});
		
  alli_svg.selectAll("text")
      .data(alli_names)
      .enter().append("text")
	  .attr("class",function(d,i) { return "party-legend "+d+'s'})
	  .attr("x",  function(d,i) { return i>2? (i-2.5)*(width/party_names.length) : (i+.5)*(width/party_names.length) })
      .attr("y", function(d,i) { return i>2? 275 : 225 })
      .attr("dy",".35em")
	  .attr("font-size","20px")
      .attr("sub_title",function(d) { return '.'+d.slice(0,-1)+'p' })
	  .style("text-anchor","middle")
	  .style("fill", function(d) { return (parseInt(color_map[d.slice(0,-1)].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
	  .on("click", function(){
	  		d3.selectAll('.rect_names').style("fill", "#fff");
			fill_color($(this).attr("sub_title"),1);
		})
		.text(function(d) { return d });
		
  svg.selectAll("rect")
      .data(party_names)
      .enter().append("rect")
      .attr("x",  function(d,i) { return i*(width/party_names.length) })
	  .attr("class","party-legend")
	  .attr("data-party",function(d) { return d }) 
	  .attr("data-highlight",function(d) { return "[data-party="+d+"]" }) 
	  .attr("data-toggle","highlight") 
      .attr("sub_title",function(d) { return '.'+d })
	  .attr("width", (width/party_names.length))
      .attr("y", 20)
      .attr("height",50)
      .style("fill", function(d) { return color_map[d] })
	  .attr("stroke-width",.5)
	  .style("stroke", function(d) { return d3.rgb(color_map[d.name]).darker(); })	
	  .on("click", function(){
	  		d3.selectAll('.rect_names').style("fill", "#fff");
			fill_color($(this).attr("sub_title"),0);
		});
			
  svg.selectAll("text")
      .data(party_names)
      .enter().append("text")
	  .attr("class",function(d,i) { return "party-legend "+d+'s'})
      .attr("x",  function(d,i) { return (i+.5)*(width/party_names.length) })
	  .attr("y", 45)
      .attr("dy",".35em")
	  .attr("font-size","20px")
      .attr("sub_title",function(d) { return '.'+d })
	  .style("text-anchor","middle")
	  .style("fill", function(d) { return (parseInt(color_map[d].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
	  .on("click", function(){
	  		d3.selectAll('.rect_names').style("fill", "#fff");
			fill_color($(this).attr("sub_title"),0);
		})
		.text(function(d) { return d });
		
  svg.selectAll(".clear")
      .data(['X'])
      .enter().append("rect")
      .attr("x",  -30)
	  .attr("class","party-legend")
	  .attr("data-party",function(d) { return d }) 
	  .attr("data-highlight",function(d) { return "[data-party="+d+"]" }) 
	  .attr("data-toggle","highlight")
	  .attr("width", 30)
      .attr("y", 20)
      .attr("height",50)
      .style("fill", function(d) { return color_map[d] })
	  .attr("stroke-width",.5)
	  .style("stroke", function(d) { return d3.rgb(color_map[d.name]).darker(); })	
	  .on("click", function(){
			fill_color('.rect_names',0);
		});
			
  svg.selectAll(".clear")
		  .data(['X'])
		  .enter().append("text")		  
		  .attr("x", -15)
		  .attr("y", 45)
		  .attr("dy",".35em")
		  .attr("font-size","22px")
		  .style("text-anchor","middle")
		  .style("fill", function(d) { return (parseInt(color_map[d].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
		  .on("click", function(){
			fill_color('.rect_names',0);
			})
			.text(function(d) { return d });

			
old_svg.selectAll("rect")
      .data(sub_party_names)
      .enter().append("rect")
	  .attr("x",  function(d,i) { return i>3? (i-4)*(width/party_names.length) : i*(width/party_names.length) })
      //.attr("x",  function(d,i) { return i*(width/party_names.length) })
	  .attr("class","party-legend")
	  .attr("data-party",function(d) { return d }) 
	  .attr("data-highlight",function(d) { return "[data-party="+d+"]" }) 
	  .attr("data-toggle","highlight") 
	  //.attr("data-title",function(d) { return d }) 
      .attr("sub_title",function(d) { return '.'+d+'_old' })
	  .attr("width", (width/party_names.length))
	  .attr("y", function(d,i) { return i>3? 140 : 90 })
      .attr("height",50)
      .style("fill", function(d) { return color_map[d] })
	  .attr("stroke-width",.5)
	  .style("stroke", function(d) { return d3.rgb(color_map[d.name]).darker(); })	
	  .on("click", function(){
	  		d3.selectAll('.rect_names').style("fill", "#fff");
			fill_color($(this).attr("sub_title"),0);
		});
			
  old_svg.selectAll("text")
      .data(sub_party_names)
      .enter().append("text")
	  .attr("class",function(d,i) { return "party-legend "+d+'s'})
	  //.attr("data-title",function(d) { return d }) 
      .attr("x",  function(d,i) { return i>3? (i-3.5)*(width/party_names.length) : (i+.5)*(width/party_names.length) })
	  //.attr("x",  function(d,i) { return (i+.5)*(width/party_names.length) })
	  .attr("y", function(d,i) { return i>3? 165 : 115 })
      .attr("dy",".35em")
	  .attr("font-size","20px")
      .attr("sub_title",function(d) { return '.'+d+'_old' })
	  .style("text-anchor","middle")
	  .style("fill", function(d) { return (parseInt(color_map[d].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
	  .on("click", function(){
	  		d3.selectAll('.rect_names').style("fill", "#fff");
			fill_color($(this).attr("sub_title"),0);
		})
		.text(function(d) { return d });
			
  head_svg.selectAll(".clear")
	  .data(['2016','2011-party','2016-ali'])
      .enter().append("rect")
      .attr("x",  -120)
	  .attr("class","party-legend")
	  .attr("data-party",function(d) { return d }) 
	  .attr("data-highlight",function(d) { return "[data-party="+d+"]" }) 
	  .attr("data-title",function(d) { return d+' winners filter by' }) 
	  .attr("data-toggle","highlight")
	  .attr("width", function(d,i) { return i>0?  120 : 90  })
      .attr("y", function(d,i) { return i>0?  (i*110)-20 : 20 })
      .attr("height",function(d,i) { return i>0?  100 : 50  })
      .style("fill",'#fff')
	  .attr("stroke-width",.5)
	  .style("stroke", function(d) { return d3.rgb(color_map[d.name]).darker(); })	
	  .on("click", function(){
			fill_color('.rect_names',0);
		});
			
  head_svg.selectAll(".clear")
		  .data(['2016','2011-party','2016-ali'])
		  .enter().append("text")		  
		  .attr("x", function(d,i) { return i>0?  -60 : -75  })
		  .attr("y", function(d,i) { return i>0?  (i*110)+30 : 45 })
		  .attr("dy",".35em")
		  .attr("font-size","22px")
		  .attr("data-title",function(d) { return d+' winners filter by' }) 
		  .style("text-anchor","middle")
		  .style("fill", '#000')
		  .on("click", function(){
			fill_color('.rect_names',0);
			})
			.text(function(d) { return d });
			
    function fill_color(parties,bases)
	{	  
	  d3.selectAll(parties).each(function(d, i){ 
		d3.select(this).attr("class",function(d) { return 'rect_names '+party[d3.select(this).attr("id")]+' '+old_party[d3.select(this).attr("id")]+'_old'+' '+ali_party[d3.select(this).attr("id")].slice(0,-1)+'p' })
		d3.select(this).attr("sub_link",function(d) { return d3.select(this).attr("id")+' '+party[d3.select(this).attr("id")]+' '+Candidate[d3.select(this).attr("id")] ;})
		d3.select(this).style("fill", constituency_color[d3.select(this).attr("id")] )
		d3.select(this).style("stroke","#333")
		d3.select(this).style("stroke-width", 2)	
		d3.select(this).attr("data-title",'Constituency : '+d3.select(this).attr("id")+' <br/> Candidate : '+Candidate[d3.select(this).attr("id")]+' <br/> party : '+party[d3.select(this).attr("id")] )
	  });
	}

$("polygon").tooltip({container: 'body', html: true, placement:'top'});
$("rect").tooltip({container: 'body', html: true, placement:'top'});
$("text").tooltip({container: 'body', html: true, placement:'top'});
	
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
	 $(".VCs").html("&#2997;&#3007;&#2970;&#3007;&#2965;");
	 $(".IMULs").html("&#2990;&#3009; &#2994;&#3008;&#2965;&#3021;");
	 
});
	
});