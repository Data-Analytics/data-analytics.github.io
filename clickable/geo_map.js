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
		
	d3.csv("assembly_tn_detail.csv", function(data_csv) {
	
	data_set = data_csv.filter(function(d){return (d.YEAR==2011)& (d.AC_NAME==acct_no)& (d.rank<12) })
	
	var margin = {top: 10, right: 70, bottom: 15, left: 60},
				width = 860 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;
	
	var horizontal_bar_svg = d3.select(".geo_map").select("svg").append("g")
										.attr("class", "clear")
										.attr("transform", "translate(1040,200)");
							
	var constituency_name = '';
	
    data_set.forEach(function(o) {
		constituency_name = o.AC_NAME;
	  });
    	  
	var layers = d3.layout.stack()(['VOTES'].map(function(period) {
	    return data_set.map(function(d) {
		  return {x: d['rank']+': '+d.PARTY, y: parseFloat(d[period]), votes: parseFloat(d[period]), color : d.color, party:d.PARTY,constituency:d.AC_NAME,name:d.NAME,polled_votes:d.polled_votes };
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
		  .attr("x", 310)
		  .attr("y", -25)
		  .attr("dy",".35em")
		  .attr("font-size","32px")
		  .style("text-anchor","middle")
		  .attr("fill", "#444")
			.text(function(d) { return d });
			
    var layer = horizontal_bar_svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer");
		
		d3.selectAll(".tick > text")
			.style("font-size", "22px")	
  
    var rect = layer.selectAll("rect")
        .data(function(d) { return  d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("height", yScale.rangeBand())
        .attr("x", function(d) { return  x(d.y0); })
        .attr("width", function(d) { return x(d.y); })
		.attr("data-title",function(d) { return 'Constituency : '+d.constituency+' <br/> Candidate : '+d.name+' <br/> party : '+d.party+' <br/> percentage : '+(parseFloat((d.votes/d.polled_votes))*100).toFixed(2)+'%  <br/> votes : '+addThousandsSeparator(d.votes)+'<br/> polled votes : '+addThousandsSeparator(d.polled_votes)+''})
		.style("fill", function(d,i) { return color_map[d.party]; })
		.style("stroke", function(d,i) { return d3.rgb(color_map[d.party]).darker(); });
      
	var rect = layer.selectAll("text")
        .data(function(d) { return  d; })
        .enter().append("text")
        .attr("y", function(d) { return yScale(d.x)+(yScale.rangeBand()*4/5); })
        .attr("x", function(d) { return  x(d.y)+3; })
        .style("text-anchor", "start")
		.attr("fill", "#444")
		.style("font-size","22px")
		.text(function(d) { return addThousandsSeparator(d.votes)+' votes'; })
		
    horizontal_bar_svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height -margin.bottom - margin.top) + ")")
        .call(xAxis)
		.selectAll("text").style("text-anchor", "middle")
            .attr("dx", "-.18em")
            .attr("dy", ".15em")
			.style("fill", "rgb(99, 99, 99)")
			.style("font-size","22px")

	horizontal_bar_svg.append("text")
		.attr("x", width-margin.left-margin.left-margin.right)
		.attr("y", height-(margin.top/2)-35)
		.style("fill", "rgb(99, 99, 99)")
		.style("font-size","22px")
		.style("text-anchor", "end")
		.text("Votes");
			  
    horizontal_bar_svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(yAxis)
		.selectAll("text")
			.style("fill", "rgb(99, 99, 99)")
			.style("font-size","22px");

	$("rect").tooltip({container: 'body', html: true, placement:'top'});
	
	});
	
});		

		}

d3.csv("assembly_tn_detail.csv", function(data_csv) {

  data_set = data_csv.filter(function(d){return (d.YEAR==2011) & (d.rank==1) })

d3.csv("color_mapper.csv", function(error_color, color_data) {

color_map = {}

color_data.forEach(function (d) {
	color_map[d.party] = d.color;
});

	constituency_color = {}
	Candidate = {}
	PARTY ={}
	percent_votes = {}
	votes = {}
	polled_votes = {}
	constituency_list =[]
	 data_set.forEach(function(o) {
	  o.rank = parseInt(o.rank);
	  o.year = parseInt(o.YEAR);
	  o.votes = parseInt(o.VOTES);
	  o.polled_votes = parseInt(o.polled_votes);
	  constituency_list.push(o.AC_NAME)
	  votes[o.AC_NAME] = o.VOTES;
	  polled_votes[o.AC_NAME]  = o.polled_votes;
	  constituency_color[o.AC_NAME] = color_map[o.PARTY]
	  Candidate[o.AC_NAME] = o.NAME
	  PARTY[o.AC_NAME] = o.PARTY
	  percent_votes[o.AC_NAME] = (parseFloat((o.votes/o.polled_votes))*100).toFixed(2)
	  
	  });
	  
	d3.selectAll("polygon").each( function(d, i){
			
    d3.select(this).attr("class",function(d) { return 'rect_names '+PARTY[d3.select(this).attr("id")]; })
	d3.select(this).attr("sub_link",function(d) { return d3.select(this).attr("id")+' '+PARTY[d3.select(this).attr("id")]+' '+Candidate[d3.select(this).attr("id")] ;})
    d3.select(this).style("fill", constituency_color[d3.select(this).attr("id")] )
	d3.select(this).style("stroke","#333")
	d3.select(this).style("stroke-width", 2)
	d3.select(this).attr("data-title",'Constituency : '+d3.select(this).attr("id")+' <br/> Candidate : '+Candidate[d3.select(this).attr("id")]+' <br/> party : '+PARTY[d3.select(this).attr("id")]+' <br/> percentage : '+percent_votes[d3.select(this).attr("id")]+'%  <br/> votes : '+addThousandsSeparator(votes[d3.select(this).attr("id")])+'<br/> polled votes : '+addThousandsSeparator(polled_votes[d3.select(this).attr("id")]))
	
	});
	
  var margin = {top: 0, right: 20, bottom: 35, left: 50},
		width = 1750 - margin.left - margin.right,
		height = 1200 - margin.top - margin.bottom;

  var party_names = ['DMK','ADMK','INC','CPM','TMC','CPI','PMK','DMDK','NCO','JNP','MDMK','IND','BJP','Others'];
  
	svg = d3.select(".geo_map")
		.select("svg")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
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
			fill_color($(this).attr("sub_title"));
		});
			
  svg.selectAll("text")
      .data(party_names)
      .enter().append("text")
      .attr("x",  function(d,i) { return (i+.5)*(width/party_names.length) })
	  .attr("y", 45)
      .attr("dy",".35em")
	  .attr("font-size","22px")
      .attr("sub_title",function(d) { return '.'+d })
	  .style("text-anchor","middle")
	  .style("fill", function(d) { return (parseInt(color_map[d].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
	  .on("click", function(){
	  		d3.selectAll('.rect_names').style("fill", "#fff");
			fill_color($(this).attr("sub_title"));
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
			fill_color('.rect_names');
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
			fill_color('.rect_names');
			})
			.text(function(d) { return d });
			
    function fill_color(party)
	{

	d3.selectAll(party).each( function(d, i){		
    d3.select(this).attr("class",function(d) { return 'rect_names '+PARTY[d3.select(this).attr("id")]; })
	d3.select(this).attr("sub_link",function(d) { return d3.select(this).attr("id")+' '+PARTY[d3.select(this).attr("id")]+' '+Candidate[d3.select(this).attr("id")] ;})
    d3.select(this).style("fill", constituency_color[d3.select(this).attr("id")] )
	d3.select(this).style("stroke","#333")
	d3.select(this).style("stroke-width", 2)	
	d3.select(this).attr("data-title",'Constituency : '+d3.select(this).attr("id")+' <br/> Candidate : '+Candidate[d3.select(this).attr("id")]+' <br/> party : '+PARTY[d3.select(this).attr("id")]+' <br/> percentage : '+percent_votes[d3.select(this).attr("id")]+'%  <br/> votes : '+addThousandsSeparator(votes[d3.select(this).attr("id")])+'<br/> polled votes : '+addThousandsSeparator(polled_votes[d3.select(this).attr("id")]))
	
	});
	}
	
	
	$("polygon").click( function(){
		d3.select('.clear').remove();
		
		detail_view(d3.select(this).attr("id"));
	});

	
$("polygon").tooltip({container: 'body', html: true, placement:'top'});
	
});
	
});