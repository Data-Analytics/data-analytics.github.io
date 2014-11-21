var width = 960,
    height = 420,
    radius = 10,
    fill = d3.scale.category20();

var fisheye = d3.fisheye.circular()
      .radius(80);
      
var force = d3.layout.force()
    .charge(-80)
    .linkDistance(250)
    .size([width, height]);

var svg = d3.select(".force-layout").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("xmlns", 'http://www.w3.org/2000/svg')
    .attr("xlink", 'http://www.w3.org/1999/xlink')
    .attr("version", '1.1');
    
d3.csv("node.csv", function(error, nodes) {
    d3.csv("link.csv", function(error, links) {    
    name_list =[];
   
      nodes.forEach(function(o) {
      name_list.push(o.name.split(" ")[0]);
      });
      
    nodes.forEach(function(o) {
      o.group = parseInt(o.group);});
      
    links.forEach(function(o) {
      o.source = parseInt(o.source); 
      o.target = parseInt(o.target);});
    
    var drag = force.drag()
    .on("dragstart", dragstart);
    
    var link = svg.selectAll("line")
      .data(links)
    .enter().append("line")
    .style("stroke","#999")
    .style("stroke-width", function(d) { return d.value });

var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .on("dblclick", dblclick);
      

var circle =  node.append("a")
        .attr("xlink:href",function(d) { return 'https://www.google.co.in/search?q='+d.name } )
        .attr("target","_blank")
        .append("circle")
          .attr("r", radius)
          .style("fill", function(d) { return fill(d.group) } )
          .style("stroke", function(d) { return d3.rgb(fill(d.group)).darker(); })
          .style("stroke-width", 1.5)
          .attr('data-title',function(d) { return d.name; })
          .on("dblclick", dblclick)
          .on("mouseover", function(d) { mouseover_node(d); })
          .on("mouseout", function(d) { mouseout_node(d) })
          .call(drag);
          
 var text =  node.append('text')
        .attr("text-anchor", "start")
        .attr('sub_link',function(d) { return d.name} )
        .text(function(d){ return d.name})
        .style("opacity", 0);  
        
        
       $("circle").tooltip({container: '.force-layout', html: true, placement:'top'});

      force
          .nodes(nodes)
          .links(links)
          .on("tick", tick)
          .start();

      function tick() {
        node.attr("transform", function(d) { return "translate(" + Math.max(Math.min(width - radius, d.x),10) + "," + Math.max(Math.min(height - radius, d.y),0) + ")"; });

        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
      }
      
        function dblclick(d) {
          d3.select(this).classed("fixed", d.fixed = false);
        }

        function dragstart(d) {
          d3.select(this).classed("fixed", d.fixed = true);
        }
        
      svg.on("mousemove", function() {
      fisheye.focus(d3.mouse(this));
       node.each(function(d) { d.fisheye = fisheye(d); })
     
            .attr("transform", function(d) { return "translate(" + d.fisheye.x + "," + d.fisheye.y + ")"; }); 

      link.attr("x1", function(d) { return d.source.fisheye.x; })
          .attr("y1", function(d) { return d.source.fisheye.y; })
          .attr("x2", function(d) { return d.target.fisheye.x; })
          .attr("y2", function(d) { return d.target.fisheye.y; });
    });
    
          var mouseover_node = function(z){ 

        var neighbors = {};
        neighbors[z.index] = true;

        link.filter(function(d){
            if (d.source == z) {
              neighbors[d.target.index] = true
              return true
            } else if (d.target == z) {
              neighbors[d.source.index] = true
              return true
            } else {
              return false
            }
          })
            .style("stroke-width", 3);

        circle.filter(function(d){ return neighbors[d.index] })
            .style("stroke-width", 3); 
        text.filter(function(d){ return neighbors[d.index] })
             .style("opacity", 1);   
      };

      var mouseout_node = function(z){ 
        link
          .style("stroke-width", 1.5)

        node
          circle.style("stroke-width", 1)
           text.style("opacity", 0);  
      };
      
        var lastsearch = '';
    var $box = {};
    function add_search(search, chart) {
      var $chart = $(chart);
      $(search).on('keypress, change, keyup', function() {
        var search = $(this).val();
        if (lastsearch != search) {
          lastsearch = search;
          var re = new RegExp(search, "i");
        $('circle', $chart).each(function(){
              $(this).css('opacity', re.test($(this).attr("data-title")) ? '1.0': '0.3');
          });
        }
      });
    }

    add_search('.search', '.force-layout');
    
   $( ".search" ).autocomplete({
  source: function( request, response ) {
    var matches = $.map( name_list, function(tag) {
      if ( tag.toUpperCase().indexOf(request.term.toUpperCase()) === 0 ) {
        return tag;
      }
    });
    response(matches);
    }
    });
    
    
    });
});
        