var width = 960,
    height = 500,
    color = d3.scale.category20b();

var svg = d3.select(".imagemap").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("xmlns", 'http://www.w3.org/2000/svg')
    .attr("xlink", 'http://www.w3.org/1999/xlink')
    .attr("version", '1.1');
 
function onRender() {   

     d3.select('.imagemap').select("svg")
       .remove();

   var based_on = document.getElementById("options_view").value

    var svg = d3.select(".imagemap").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("xmlns", 'http://www.w3.org/2000/svg')
        .attr("xlink", 'http://www.w3.org/1999/xlink')
        .attr("version", '1.1');
        
var treemap = d3.layout.treemap()
    .padding(0.5)
    .size([width, height])
    .sticky(true)
    .value(function(d) {return d[based_on];})
    .children(function(d) {return d.values;});

d3.csv("life_data.csv", function(csv) {
    
    data_root = {"key":"treemap"};
    
     csv.forEach(function(o) {
      o.overall_life = parseFloat(o.overall_life);
      o.male = parseFloat(o.male);
      o.female = parseFloat(o.female);
      });
      
      var nest = d3.nest()
        .key(function(d) { return d.url; })
        .entries(csv);
                
    data_root["values"] = nest
    
  var cell = svg.data([data_root]).selectAll("g")
      .data(treemap.nodes)
    .enter().append("a")
      .attr("xlink:href",function(d) { return d.url} )
      .attr("target","_blank").append("image")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.dx; })
      .attr("height", function(d) { return d.dy; })
      .attr("preserveAspectRatio", "defer xMidYMid slice")
      .style("stroke", '#fff')
      .style("stroke-width", 0.5)
      .attr("xlink:href",function(d) { return d.image;} )
      .attr("sub_link",function(d) { return d.Country; })
      .attr("data-title",function(d) { return '<p>'+d.Country+' : '+d[based_on]+' Years (average '+based_on+' life expectancy)</p>'});
      
      $("image").tooltip({container: '.imagemap', html: true, placement:'top'});

    var lastsearch = '';
    var $box = {};
    
      function add_search(search, chart) {
      var $chart = $(chart);
      $(search).on('keypress, change, keyup', function() {
        var search = $(this).val();
        if (lastsearch != search) {
          lastsearch = search;
          var re = new RegExp(search, "i");
          $('image', $chart).each(function(){
              $(this).css('opacity', re.test($(this).attr("sub_link")) ? '1.0': '0.1');
          });
        }
      });
    }

    add_search('.search', '.imagemap');
    
      });
      
      }