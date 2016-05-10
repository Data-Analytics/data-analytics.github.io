
var margin = {top: 90, right: 20, bottom: 20, left: 20},
    width = 1200 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"), 
    format = function(d) { return formatNumber(d); },
    color = d3.scale.category20b();
	
// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(100)
    .nodePadding(3)
    .size([width, height+70]);

var path = sankey.link();


d3.csv("color_mapper.csv", function(error_color, color_data) {

color_map = {}

color_data.forEach(function (d) {
	
	color_map[d.party] = d.color;
	
});


// load the data (using the timelyportfolio csv method)
d3.csv("real_time.csv", function(error, data) {

var svg = d3.select(".sankey_chart").append("svg")
	.attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 1200 600')
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

		  
  var party_names = ['DMK','ADMK','INC','CPM','TMC','CPI','PMK','DMDK','MDMK','IND','Others'];
  
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
			
  svg.selectAll(".text")
      .data(party_names)
      .enter().append("text")
      .attr("x",  function(d,i) { return (i+.5)*(width/party_names.length) })
	  .attr("y", -50)
      .attr("dy",".35em")
	  .attr("font-size","18px")
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

	data = data.filter(function(d){return (d.rank==1) });
		
	data.forEach(function (d) {
		d.source_year =d['old_party']
		d.target_year =d['party'] 
		d.combined_year =d.old_party+'_'+d.party 
		});

		data = data.filter(function(d){return (d.source_year!='') & (d.target_year!='') })
		
		var data_Count = d3.nest()
			  .key(function(d) { return d.combined_year; })
			  .rollup(function(v) { return v.length; })
			  .entries(data);
			
  graph = {"nodes" : [], "links" : []};
    
	name_list = []
	data_Count.forEach(function (d) {

	  graph.nodes.push({ "name": d.key.split("_")[0], "color": color_map[d.key.split("_")[0]] });
	  graph.nodes.push({ "name": '_'+d.key.split("_")[1], "color": color_map[d.key.split("_")[1]] });

	  graph.links.push({ "source": d.key.split("_")[0],
						 "target": '_'+d.key.split("_")[1],
						 "source_color": color_map[d.key.split("_")[0]],
						 "target_color": color_map[d.key.split("_")[1]],
						 "value": d.values });
	 });
	 
     // return only the distinct / unique nodes
     graph.nodes = d3.keys(d3.nest()
       .key(function (d) { return d.name; })
       .map(graph.nodes));
	 
     // loop through each link replacing the text with its index from node
     graph.links.forEach(function (d, i) {
       graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
       graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
     });

     //now loop through each nodes to make nodes an array of objects
     // rather than an array of strings
     graph.nodes.forEach(function (d, i) {	   
       graph.nodes[i] = { "name": d };
     });

  sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(32);

	//var party_colors = {'ADMK':'#b2d33c','BJP':'#ff7f0e','CPI':'#ff5757','CPM':'#ff5757','DMK':'#c0392b','Others':'#222','INC':'#2ecc71','IND':'#bdc3c7','MDMK':'#9b59b6','PMK':'#d35400','TMC(M)':'#4747ff','CPI(M)':'#ff5757','DMDK':'#f1c40f'}

 svg.selectAll(".head")
      .data([2011,2016])
    .enter().append("text")
      .attr("y", -4)
	  .attr("font-size",21)
      .attr("x", function(d,p) { return p < 1 ?  50 : 1110 ; })
	  .attr("fill", function(d,p) { return p > 0 ? "rgb(99, 99, 99)" : "rgb(99, 99, 99)"; })
	  .attr("text-anchor", function(d,p) { return p <  1 ? 'middle' : 'middle'; })
	  .text(function(d) { return  d ; });
  
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .style("fill", function(d) { return d.target_color; })
      .style("stroke", function(d) { return d.target_color; })	  
	  .sort(function(a, b) { return b.dy - a.dy; })
	  .attr("data-title",function(d) { return d.source.name == d.target.name.replace('_','') ?  d.source.name+' has retained '+format(d.value)+' seats'  : d.target.name.replace('_','') + " has got "+ format(d.value)+" seats from "+ d.source.name; });
		
// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
		  return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { 
		  this.parentNode.appendChild(this); })
      .on("drag", dragmove));
      
// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
     .style("fill", function(d) { return color_map[d.name.replace('_','')]; })
      .style("stroke", function(d) { return d3.rgb(color_map[d.name.replace('_','')]).darker(2); })
	   .attr('data-title',function(d) { return d.name.replace('_','') + "\n" + format(d.value)+' Seats'; });

  node
	.append("text")
	.attr("y", function(d) { return (d.dy/2)-4; })
    .attr("x", sankey.nodeWidth()/2)
	.attr("text-anchor", "middle")
	.style("font-size", "18px")
	.attr("data-title", function(d) { console.log(color_map[d.name.replace('_','')],d.name); return d.name.replace('_','')+' : '+format(d.value)+' seats'; })
	.style("fill", function(d) { return (parseInt(color_map[d.name.replace('_','')].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
	.text(function(d) { return d.dy>35 ?d.value:' '; });

  node
	.append("text")
	.attr("y", function(d) { return (d.dy/2)+16; })
    .attr("x", sankey.nodeWidth()/2)
	.attr("text-anchor", "middle")
	.style("font-size", "18px")
	.attr("data-title", function(d) { return d.name.replace('_','')+' : '+format(d.value)+' seats'; })
	.style("fill", function(d) { return (parseInt(color_map[d.name.replace('_','')].replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
	.text(function(d) { return d.dy>35 ?d.name.replace('_',''):' '; });
	
  $("text").tooltip({container: '.sankey_chart', html: true, placement:'top'});
  $("rect").tooltip({container: '.sankey_chart', html: true, placement:'top'});  
  $("path").tooltip({container: '.sankey_chart', html: true, placement:'top'}); 	 

// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name.replace('_',''); })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

// the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr("transform", 
        "translate(" + d.x + "," + (
                d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
            ) + ")");
    sankey.relayout();
    link.attr("d", path);
  }

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
	 $(".NTK").html("&#2984;&#2980;&#2965;");
	 $(".VC").html("&#2997;&#3007;&#2970;&#3007;&#2965;");
	 $(".IMUL").html("&#2990;&#3009; &#2994;&#3008;&#2965;&#3021;");
	 
});	

});	
