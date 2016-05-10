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

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//constituency,candidate,party,votes,rank
d3.csv("tamil_nadu_2014.csv", function(data_set) {
  
d3.csv("color_mapper.csv", function(error_color, color_data) {

color_map = {}

color_data.forEach(function (d) {
	color_map[d.party] = d.color;
});

	constituency_color = {}
	Candidate = {}
	party ={}
	votes = {}
	
	 data_set.forEach(function(o) {
	  constituency_color[o.constituency] = color_map[o.party]
	  Candidate[o.constituency] = o.candidate
	  party[o.constituency] = o.party
	  votes[o.votes] = o.votes
	  
	  });
	  
	d3.selectAll("polygon").each( function(d, i){
	
    d3.select(this).attr("class",function(d) { return 'rect_names '+party[d3.select(this).attr("id")]; })
	d3.select(this).attr("sub_link",function(d) { return d3.select(this).attr("id")+' '+party[d3.select(this).attr("id")]+' '+Candidate[d3.select(this).attr("id")] ;})
    d3.select(this).style("fill", constituency_color[d3.select(this).attr("id")] )
	d3.select(this).style("stroke","#333")
	d3.select(this).style("stroke-width", 2)
	d3.select(this).attr("data-title",'Constituency : '+d3.select(this).attr("id")+' <br/> Candidate : '+Candidate[d3.select(this).attr("id")]+' <br/> party : '+party[d3.select(this).attr("id")]+' <br/> votes : '+votes[d3.select(this).attr("id")] )
	
	});
	
  var margin = {top: 0, right: 20, bottom: 35, left: 50},
		width = 1750 - margin.left - margin.right,
		height = 1200 - margin.top - margin.bottom;

  var party_names = ['DMK','ADMK','INC','CPM','TMC','CPI','PMK','DMDK','IMUL','VCK','MDMK','NTK','BJP','Others'];
  
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
    d3.select(this).attr("class",function(d) { return 'rect_names '+party[d3.select(this).attr("id")]; })
	d3.select(this).attr("sub_link",function(d) { return d3.select(this).attr("id")+' '+party[d3.select(this).attr("id")]+' '+Candidate[d3.select(this).attr("id")] ;})
    d3.select(this).style("fill", constituency_color[d3.select(this).attr("id")] )
	d3.select(this).style("stroke","#333")
	d3.select(this).style("stroke-width", 2)	
	d3.select(this).attr("data-title",'Constituency : '+d3.select(this).attr("id")+' <br/> Candidate : '+Candidate[d3.select(this).attr("id")]+' <br/> party : '+party[d3.select(this).attr("id")]+' <br/> votes : '+votes[d3.select(this).attr("id")] )
	
	});
	}
	
$("polygon").tooltip({container: 'body', html: true, placement:'top'});
	
});
	
});