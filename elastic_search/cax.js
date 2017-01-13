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


calendar = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 105
    if(options.cellSize == undefined) options.cellSize = 12
    if(options.container == undefined) options.container = "body"
    if(options.date_format == undefined) options.date_format = "%Y-%m-%d"
    if(options.start_year == undefined) options.start_year = 2010
    if(options.end_year == undefined) options.end_year = 2013
    if(options.range == undefined) options.range = ["white", "steelblue"]
    if(options.date == undefined) options.date = 'date'
    if(options.value == undefined) options.value = 'value'
    if(options.data == undefined) options.data = {}
    
    var width = options.width,
    height = options.height,
    cellSize = options.cellSize;
    
    week_days = ['sun','mon','tue','wed','thu','fri','sat']
    month = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']

var day = d3.time.format("%w"),
    week = d3.time.format("%U"),
    percent = d3.format(".1%"),
    format = d3.time.format(options.date_format);

var color = d3.scale.linear().range(options.range)
    .domain([0, 1])

var svg = d3.select(options.container).selectAll("svg")
    .data(d3.range(options.start_year, options.end_year+1))
    .enter().append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .attr("class", "RdYlGn")
    .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("transform", "translate(-38," + cellSize * 3.5 + ")rotate(-90)")
    .style("text-anchor", "middle")
    .text(function(d) { return d; });

for (var i=0; i<week_days.length; i++)
{
svg.append("text")
    .attr("transform", "translate(-5," + cellSize*(i+1) + ")")
    .style("text-anchor", "end")
    .attr("dy", "-.25em")
    .text(function(d) { return week_days[i]; });    
}

var rect = svg.selectAll(".day")
    .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    .enter().append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return week(d) * cellSize; })
    .attr("y", function(d) { return day(d) * cellSize; })
    .attr("fill",'#fff')
    .datum(format);

svg.selectAll(".month")
    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    .enter().append("path")
    .attr("class", "month")
    .attr("id", function(d,i){ return month[i] })
    .attr("d", monthPath);

svg.selectAll(".month")
    .append("text")
    .attr("class", function(d,i){ return month[i] })
    .style("text-anchor", "end")
    .attr("dy", "-.25em")
    .text(function(d,i){ return month[i] });

options.data.forEach(function(d) {
    d[options.value] = parseInt(d[options.value]);
    });

 var max_value = d3.max(options.data, function(d) { return d[options.value]; });
 
    var data = d3.nest()
    .key(function(d) { return d[options.date]; })
    .rollup(function(d) { return (d[0][options.value] / max_value); })
    .map(options.data);

    rect.filter(function(d) { return d in data; })
    .attr("fill", function(d) { return color(data[d]); })
    .attr("data-title", function(d) { return d + ": " + percent(data[d]); });
    $("rect").tooltip({container: 'body', html: true, placement:'right'});    

function monthPath(t0) {
    var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
    d0 = +day(t0), w0 = +week(t0),
    d1 = +day(t1), w1 = +week(t1);
    return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
    + "H" + w0 * cellSize + "V" + 7 * cellSize
    + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
    + "H" + (w1 + 1) * cellSize + "V" + 0
    + "H" + (w0 + 1) * cellSize + "Z";
}

}
}

treemap = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = 'color'
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.size == undefined) options.size = 'value'
    if(options.data == undefined) options.data = {}

     var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .attr("xmlns", 'http://www.w3.org/2000/svg')
    .attr("xlink", 'http://www.w3.org/1999/xlink')
    .attr("version", '1.1');
    
    var treemap = d3.layout.treemap()
    .padding(0.5)
    .size([options.width, options.height])
    .sticky(true)
    .value(function(d) {return d[options.size];})
    .children(function(d) {return d.values;});
    data_root = {"key":"treemap"};

    var nest = d3.nest()
    .key(function(d) { return    d[options.groupby]; })
    .entries(options.data);

    data_root["values"] = nest

    var cell = svg.data([data_root]).selectAll("g")
    .data(treemap.nodes)
    .enter().append("rect")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("width", function(d) { return d.dx; })
    .attr("height", function(d) { return d.dy; })
    .attr("data-title",function(d) { return d[options.groupby]+' : '+addThousandsSeparator(d[options.size]) ;})
    .style("fill", function(d) { return d[options.color]; })
    .style("stroke", '#fff')
    .style("stroke-width", 0.5);

    $("rect").tooltip({container: 'body', html: true, placement:'top'});
    }
    }

cloud = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 300
    if(options.height == undefined) options.height = 300
    if(options.font == undefined) options.font = "sans-serif"
    if(options.container == undefined) options.container = "body"
    if(options.text == undefined) options.text = 'text'
    if(options.size == undefined) options.size = 'size'
    if(options.words == undefined) options.words = [{text: "This", size: 40}, {text: "is", size: 40}, {text: "an", size: 40}, {text: "Example", size: 40}]
    if(options.fill == undefined) options.fill = d3.scale.category20();

    var max_size = d3.max(options.words, function(d) { return d[options.size]; });
 

    options.words.forEach(function(d) {
    d[options.size] = parseInt(d[options.size]/max_size)*100;
    }); 

    d3.layout.cloud().size([options.width, options.height])
    .words(options.words)
    .rotate(function(d) { return ~~(Math.random() *    2) * 90; })
    .font(options.font)
    .fontSize(function(d) { return d[options.size]; })
    .on("end", function(words) {
    d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .attr("xmlns", 'http://www.w3.org/2000/svg')
    .attr("xlink", 'http://www.w3.org/1999/xlink')
    .attr("version", '1.1')
    .append("g")
    .attr("transform", "translate(" + (options.width/2) + "," + (options.height/2) + ")")
    .selectAll("text")
    .data(words)
    .enter()
    .append("text")
    .style("font-size", function(d) { return d[options.size] + "px"; })
    .style("font-family", options.font)
    .style("fill", function(d, i) { return    options.fill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .attr("data-title",function(d) { return d[options.text]+' : '+addThousandsSeparator(d[options.size]); })
    .text(function(d) { return d[options.text]; });

    $("text").tooltip({container: 'body', html: true, placement:'top'});    
    })
    .start();
    }
}


sankey = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 1200
    if(options.height == undefined) options.height = 900
    if(options.container == undefined) options.container = "body"
    if(options.nodeWidth == undefined) options.nodeWidth = 100
    if(options.nodePadding == undefined) options.nodePadding = 3
    if(options.source == undefined) options.source = 'source'
    if(options.target == undefined) options.target = 'target'
    if(options.value == undefined) options.value = 'value'
    if(options.color == undefined) options.color = d3.scale.category10()
    if(options.data == undefined) options.data = {}

 var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+(options.width+20)+' '+(options.height+20))
    .attr("xmlns", 'http://www.w3.org/2000/svg')
    .attr("xlink", 'http://www.w3.org/1999/xlink')
    .attr("version", '1.1');

 width=options.width;

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(options.nodeWidth)
    .nodePadding(options.nodePadding)
    .size([options.width, options.height]);


var path = sankey.link();

    graph = {"nodes" : [], "links" : []};

    name_list = []
    options.data.forEach(function (d) {
    name_list.push(d.source);
    graph.nodes.push({ "name": d[options.source] });
    graph.nodes.push({ "name": d[options.target] });
    graph.links.push({ "source": d[options.source],
     "target": d[options.target],
     "value": +parseInt(d[options.value]) });
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

     // rather than an array of strings
     graph.nodes.forEach(function (d, i) {
     graph.nodes[i] = { "name": d };
     });

    sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(32);

// add in the links
    var link = svg.append("g").selectAll(".link")
    .data(graph.links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", path)
    .style("stroke-width", function(d) { return Math.max(1, d.dy); })
    .sort(function(a, b) { return b.dy - a.dy; })
    .attr("data-title",function(d) { return d.source.name + " vs " + d.target.name + "\n" +addThousandsSeparator(d.value); });

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
     .style("fill", function(d,i) { return options.color(i); })
    .style("stroke", function(d) { return d3.rgb(options.color).darker(2); })
     .attr('data-title',function(d) { return d.name + "\n" + addThousandsSeparator(d.value); });

    $("rect").tooltip({container: 'body', html: true, placement:'top'});
    $("path").tooltip({container: 'body', html: true, placement:'top'});

// add in the title for the nodes
    node.append("text")
    .attr("x", -6)
    .attr("y", function(d) { return d.dy / 2; })
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("transform", null)
    .text(function(d) { return d.name.charAt(0).toUpperCase()+d.name.slice(1);; })
    .filter(function(d) { return d.x < options.width / 2; })
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
    }
}

forcelayout = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 1200
    if(options.height == undefined) options.height = 900
    if(options.container == undefined) options.container = "body"
    if(options.charge == undefined) options.charge = -160
    if(options.linkDistance == undefined) options.linkDistance = 80
    if(options.radius == undefined) options.radius = 70    
    if(options.source == undefined) options.source = 'source'
    if(options.target == undefined) options.target = 'target'
    if(options.value == undefined) options.value = 'value'
    if(options.data == undefined) options.data = {}
    if(options.color == undefined) options.color = d3.scale.category10();

    var svg = d3.select(options.container).append("svg")
    .attr("width", options.width)
    .attr("height", options.height)
    .attr("xmlns", 'http://www.w3.org/2000/svg')
    .attr("xlink", 'http://www.w3.org/1999/xlink')
    .style("width", "100%")
    .attr("data-height","0.54")
    .attr("viewBox","0 0 "+options.width+" "+options.height)
    .attr("version", '1.1');

    var fisheye = d3.fisheye.circular()
    .radius(options.radius);

    var force = d3.layout.force()
    .charge(options.charge)
    .linkDistance(options.linkDistance)
    .size([options.width, options.height]);
 
    var nodesByName = {};

    options.data.forEach(function(o) {
    o[options.value] = parseFloat(o[options.value]);
    });

    force
    .nodes(nodes)
    .links(options.data);
    
    var drag = force.drag()
    .on("dragstart", dragstart); 

    var links = d3.nest()
    .entries(options.data);

    links.forEach(function(link) {
    link.source = nodeByName_source(link[options.source]);
    link.target = nodeByName_target(link[options.target]);
    });

    // Extract the array of nodes from the map by name.
    var nodes = d3.values(nodesByName);

    // Create the link lines.
    var link = svg.selectAll(".link")
    .data(links)
     .enter().append("line")
    .attr("class", "link")
    .style('stroke-width', 1.5)
    .attr('data-title', function(d){ return addThousandsSeparator(d[options.value]) })
    .attr('stroke','steelblue');

    // Create the link nodes.
    var node = svg.selectAll(".node")
    .data(nodes)
     .enter().append("g")
    .attr("class", "node")
    .on("dblclick", dblclick);

    node
    .append("rect")
     .attr("fill", function(d,i) { return options.color(i); })
    .attr("stroke", function(d) { return d3.rgb(options.color).darker(2); })
    .style('stroke-width',1.5)
    .attr("x", -10)
    .attr("y", -10)
    .attr("width", 20)
    .attr("height",20)
    .attr("rx",10)
     .attr('data-title', function(d){ return d.name})
    .on("mouseover", function(d) { mouseover_node(d); })
    .on("mouseout", function(d) { mouseout_node(d) })
    .call(drag);

     var text =    node.append('text')
    .attr("text-anchor", "start")
    .attr('sub_link',function(d) { return d.name} )
    .text(function(d){ return d.name})
    .style("opacity", 0); 

    $("rect").tooltip({container: 'body', html: true, placement:'top'});
    $("line").tooltip({container: 'body', html: true, placement:'top'});

    force
    .nodes(nodes)
    .links(links)
    .on("tick", tick)
    .start();

    function tick() {

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

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
    }).style("stroke-width", 3);

    node.filter(function(d){ return neighbors[d.index] })
    .style("stroke-width", 2); 

    text.filter(function(d){ return neighbors[d.index] })
    .style("opacity", 1);    
    };

    var mouseout_node = function(z){ 
    link.style("stroke-width", 1.5)

    node.style("stroke-width", 1.5)
    text.style("opacity", 0);    
    };

    function nodeByName_source(name) {
    return nodesByName[name] || (nodesByName[name] = {name:name ,group:0});
    }

    function nodeByName_target(name) {
    return nodesByName[name] || (nodesByName[name] = {name:name ,group:1});
    }
    }
    }

bar_pie = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container_bar == undefined) options.container_bar = "body"
    if(options.container_pie == undefined) options.container_pie = "body"
    if(options.container_legend == undefined) options.container_legend = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.values == undefined) options.values = ['A','B','C','D']
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}

    dashboard('#dashboard',options.data);

    function dashboard(id, fData){

    combined_list = options.values;

    var barColor = 'steelblue';
    var color_value = options.color;

    var combined_dict = {};
    combined_list.forEach(function(d,i) {
    combined_dict[d] = color_value(i);
    });

    function segColor(c){ return combined_dict[c]; }

    // compute total for each options.groupby.
    fData.forEach(function(d) {
    var value_dict = {};
    combined_list.forEach(function(o,i) {
    value_dict[o] = parseInt(d[o]);
    });
    d.freq = value_dict;

    d.total = 0;
    combined_list.forEach(function(p) {
    d.total = d.total+d.freq[p]
    });
    });

    // function to handle histogram.
    function histoGram(fD){
    var hG={},hGDim = {t: 60, r: 0, b: 30, l: 0};
    hGDim.w = 450 - hGDim.l - hGDim.r, 
    hGDim.h = 300 - hGDim.t - hGDim.b;
    
    //create svg for histogram.
    var hGsvg = d3.select(options.container_bar).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.58')
    .attr("viewBox","0 0 "+options.width+" "+options.height)
    .append("g")
    .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

    // create function for x-axis mapping.
    var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
    .domain(fD.map(function(d) { return d[0]; }));

    // Add x-axis to the histogram svg.
    hGsvg.append("g").attr("class", "x axis")
    .attr("transform", "translate(0," + hGDim.h + ")")
    .call(d3.svg.axis().scale(x).orient("bottom"));

    // Create function for y-axis map.
    var y = d3.scale.linear().range([hGDim.h, 0])
    .domain([0, d3.max(fD, function(d) { return d[1]; })]);

    // Create bars for histogram to contain rectangles and freq labels.
    var bars = hGsvg.selectAll(".bar").data(fD).enter()
    .append("g").attr("class", "bar");

    //create the rectangles.
    bars.append("rect")
    .attr("x", function(d) { return x(d[0]); })
    .attr("y", function(d) { return y(d[1]); })
    .attr("width", x.rangeBand())
    .attr("height", function(d) { return hGDim.h - y(d[1]); })
    .attr('fill',barColor)
    .attr('stroke',d3.rgb(barColor).darker())
    .on("mouseover",mouseover)// mouseover is defined below.
    .on("mouseout",mouseout);// mouseout is defined below.

    //Create the frequency labels above the rectangles.
    bars.append("text").text(function(d){ return d3.format(",")(d[1])})
    .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
    .attr("y", function(d) { return y(d[1])-5; })
    .attr("text-anchor", "middle");

    function mouseover(d){    // utility function to be called on mouseover.
    // filter for selected options.groupby.
    var st = fData.filter(function(s){ return s[options.groupby] == d[0];})[0],
    nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});

    // call update functions of pie-chart and legend.
    pC.update(nD);
    leg.update(nD);
    }

    function mouseout(d){// utility function to be called on mouseout.
    // reset the pie-chart and legend.
    pC.update(tF);
    leg.update(tF);
    }

    // create function to update the bars. This will be used by pie-chart.
    hG.update = function(nD, color){
    // update the domain of the y-axis map to reflect change in frequencies.
    y.domain([0, d3.max(nD, function(d) { return d[1]; })]);

    // Attach the new data to the bars.
    var bars = hGsvg.selectAll(".bar").data(nD);

    // transition the height and color of rectangles.
    bars.select("rect").transition().duration(500)
    .attr("y", function(d) {return y(d[1]); })
    .attr("height", function(d) { return hGDim.h - y(d[1]); })
    .attr("fill", color);

    // transition the frequency labels location and change value.
    bars.select("text").transition().duration(500)
    .text(function(d){ return d3.format(",")(d[1])})
    .attr("y", function(d) {return y(d[1])-5; });
    }
    return hG;
    }

    // function to handle pieChart.
    function pieChart(pD){
    var pC ={},    pieDim ={w:500, h: 390};
    pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

    // create svg for pie chart.
    var piesvg = d3.select(options.container_pie).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.58')
    .attr("viewBox","0 0 "+options.width+" "+options.height)
    .append("g")
    .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

    // create function to draw the arcs of the pie slices.
    var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

    // create a function to compute the pie slice angles.
    var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

    // Draw the pie slices.
    piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
    .each(function(d) { this._current = d; })
    .style("fill", function(d) { return segColor(d.data.type); })
    .on("mouseover",mouseover).on("mouseout",mouseout);

    // create function to update pie-chart. This will be used by histogram.
    pC.update = function(nD){
    piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
    .attrTween("d", arcTween);
    }
    // Utility function to be called on mouseover a pie slice.
    function mouseover(d){
    // call the update function of histogram with new data.
    hG.update(fData.map(function(v){ 
    return [v[options.groupby],v.freq[d.data.type]];}),segColor(d.data.type));
    }
    //Utility function to be called on mouseout a pie slice.
    function mouseout(d){
    // call the update function of histogram with all data.
    hG.update(fData.map(function(v){
    return [v[options.groupby],v.total];}), barColor);
    }
    // Animating the pie-slice requiring a custom function which specifies
    // how the intermediate paths should be drawn.
    function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) { return arc(i(t));};
    }
    return pC;
    }

    // function to handle legend.
    function legend(lD){
    var leg = {};

    // create table for legend.
    var legend = d3.select(options.container_legend).append("table").attr('class','table table-bordered');

    // create one row per segment.
    var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

    // create the first column for each segment.
    tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
    .attr("width", '16').attr("height", '16')
    .attr("fill",function(d){ return segColor(d.type); });
    // create the second column for each segment.
    tr.append("td").text(function(d){ return d.type;});

    // create the third column for each segment.
    tr.append("td").attr("class",'legendFreq')
    .text(function(d){ return d3.format(",")(d.freq);});

    // create the fourth column for each segment.
    tr.append("td").attr("class",'legendPerc')
    .text(function(d){ return getLegend(d,lD);});

    // Utility function to be used to update the legend.
    leg.update = function(nD){
    // update the data attached to the row elements.
    var l = legend.select("tbody").selectAll("tr").data(nD);

    // update the frequencies.
    l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});

    // update the percentage column.
    l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});
    }

    function getLegend(d,aD){ // Utility function to compute percentage.
    return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
    }

    return leg;
    }

    // calculate total frequency by segment for all options.groupby.
    var tF = combined_list.map(function(d){ 
    return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))}; 
    });

    // calculate total frequency by options.groupby for all segment.
    var sF = fData.map(function(d){return [d[options.groupby],d.total];});

    var hG = histoGram(sF), // create the histogram.
    pC = pieChart(tF), // create the pie-chart.
    leg= legend(tF);// create the legend.
}

}
}
pyramid = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.value == undefined) options.value = 'value'
    if(options.text == undefined) options.text = 'text'
    if(options.data == undefined) options.data = {}

var width = options.width;
    height = options.height,
    mid_point = Math.min(options.width, options.height)/2,
    area = Math.pow(Math.min(options.width, options.height),2)/2,
    color = options.color;

var svg = d3.select(options.container).append("svg")
    .attr("width", options.width)
    .attr("height", options.height)
    .attr("width", '100%')
    .attr("data-height", '0.58')
    .attr("viewBox","0 0 "+options.width+" "+options.height);

    options.data.forEach(function(d) {
    d[options.value] = +d[options.value];
    });

    options.data.sort(function(a,b){return d3.ascending(a[options.value],b[options.value]);});
 
 
 var cum_area=0 ;
 for (var i = 0; i < options.data.length; i++) options.data[i].area = cum_area+options.data[i][options.value],cum_area=cum_area+options.data[i][options.value];

    options.data.sort(function(a,b){    return d3.descending(a[options.value],b[options.value]);});

    rollup = d3.nest().key(function(d) {
    return d.nos;
    }).rollup(function(d) {
    return d3.sum(d, function(g) {
    return g[options.value];
    });
    }).entries(options.data);

     rollup.forEach(function(d) {
    sub_area = area/d.values
    });

 var id = 0; 
 for (var i = 0; i < options.data.length; i++) options.data[i].sl_no = id++,options.data[i].nos=1,options.data[i].sub_area = Math.sqrt(2*options.data[i].area*sub_area).toFixed(2);
    for (var i = 0; i < options.data.length; i++) options.data[i].pos_1 = mid_point -(options.data[i].sub_area/2),options.data[i].pos_2 = mid_point +(options.data[i].sub_area/2);

    var g = svg.selectAll(".arc")
    .data(options.data)
    .enter().append("g")
    .attr("class", "arc");

    g.append("path")
    .attr("d", function(d) { return    "M"+mid_point.toString()+" 0 L"+(d.pos_1).toString()+" "+(d.sub_area).toString()+" L"+(d.pos_2).toString()+" "+(d.sub_area).toString()+" Z"})
    .style("fill", function(d) { return color(d.sl_no); })
     .attr("data-title",function(d) { return d[options.text]+': '+addThousandsSeparator(d[options.value]) ;})
    .style("stroke",function(d) { return d3.rgb(color(d.sl_no)).darker(); });

    $("path").tooltip({container: 'body', html: true, placement:'bottom'});

}
}

sunburst = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.radius == undefined) options.radius = 190
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.value == undefined) options.value = 'value'
    if(options.text_1 == undefined) options.text_1 = 'text'
    if(options.text_2 == undefined) options.text_2 = 'text_2'
    if(options.data == undefined) options.data = {}

    options.data.forEach(function(o) {
    o[options.value] = parseInt(o[options.value])
    });

vals = d3.scale.category20();

var partition = d3.layout.partition()
    .size([2 * Math.PI, options.radius])
    .value(function(d) { return d[options.value]; });
 
var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return d.y/1.5; })
    .outerRadius(function(d) { return d.y + d.dy; });

var svg = d3.select(options.container).append("svg")
    .attr("width", options.width)
    .attr("height", options.height)
    .attr("width", '100%')
    .attr("data-height", '0.58')
    .attr("viewBox","0 0 "+options.width/2+" "+options.height/2)
    .append("g")
    .attr("transform", "translate(" + options.width / 4 + "," + options.height / 4 + ")");
 
 function unique(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
    if(!u.hasOwnProperty(arr[i])) {
    a.push(arr[i]);
    u[arr[i]] = 1;
    }
    }
    return a;
}
    var treeData= {"key": "Origin Data", "values": 
    d3.nest()
    .key(function (d) { return d[options.text_1]; })
    .entries(options.data)
    };

    var root = { "key": "Origin Data", "children":
    treeData.values.map( function(text){
    return { "key": text.key,"children": text.values }; 
})
};

addup=-1;
    path = svg.data([root]).selectAll("path")
    .data(partition.nodes)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("stroke-width",.75)
    .attr("fill", function(d,i) { if (d.children) {addup=addup+1; return options.color(addup); } else { return vals(i) } })
    .attr("stroke", function(d,i) { if (d.children) {addup=addup+1; return options.color(addup); } else { return d3.rgb(vals(i)).brighter() } })
    .attr("data-title", function(d) { if (d.children){return d.key}else { return d[options.text_2] +':'+parseInt(d[[options.value]]);}})
    .on("click", magnify)
    .each(stash);

    $("path").tooltip({container: 'body', html: true, placement:'top'});

function magnify(node) {
    if (parent = node.parent) {
    var parent,
    x = parent.x,
    k = .8;
    parent.children.forEach(function(sibling) {
    x += reposition(sibling, x, sibling === node
    ? parent.dx * k / node.value
    : parent.dx * (1 - k) / (parent.value - node.value));
    });
    } else {
    reposition(node, 0, node.dx / node.value);
    }
 
    path.transition()
    .duration(750)
    .attrTween("d", arcTween);
}
 
function reposition(node, x, k) {
    node.x = x;
    if (node.children && (n = node.children.length)) {
    var i = -1, n;
    while (++i < n) x += reposition(node.children[i], x, k);
    }
    return node.dx = node.value * k;
}
 
function stash(d) {
    d.x0 = d.x;
    d.dx0 = d.dx;
}
 
function arcTween(a) {
    var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
    return function(t) {
    var b = i(t);
    a.x0 = b.x;
    a.dx0 = b.dx;
    return arc(b);
    };
}
}
}

marimekko = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.values == undefined) options.values = ['A','B','C','D']
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}

	
	var margin = {top: options.height/10,left: options.width/10};

    var x = d3.scale.linear()
    .range([0, options.width-margin.left-margin.left]);

    var y = d3.scale.linear()
    .range([0, options.height-margin.top]);

    var n = d3.format(",d"),
    p = d3.format("%");

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate("+margin.left/2+","+margin.top/2+")");
    
   var color = d3.scale.ordinal()
    .range(options.color.range());
 
	color.domain(options.values);

    segments_group =[];

	options.data.forEach(function(d) {
    segments_group.push(color.domain().map(function(name) { return {name: name,value:+d[name],group:d[options.groupby]}; }));
    });

	segments = [];
	
	segments_group.forEach(function(d) {
	let_group = [];

	d.forEach(function(o) {
	let_group.push( {name: o.name,value:o.value })
    group = o.group
	});
	
	segments.push({key:group,values:let_group})
	
	});
	
	var sum = segments.reduce(function(v, p) {
    return (p.offset = v) + (p.sum = p.values.reduceRight(function(v, d) {
    d.parent = p;
    return (d.offset = v) + d.value;
    }, 0));
    }, 0);
	
    // Add x-axis ticks.
    var xtick = svg.selectAll(".x")
    .data(x.ticks(10))
    .enter().append("g")
    .attr("class", "x")
    .attr("transform", function(d) { return "translate(" + x(d) + "," + y(0) + ")"; });

    xtick.append("line")
    .attr("y2", 6)
    .style("stroke", "#000");

    xtick.append("text")
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .attr("dy", ".71em")
    .text(p);

    // Add y-axis ticks.
    var ytick = svg.selectAll(".y")
    .data(y.ticks(10))
    .enter().append("g")
    .attr("class", "y")
    .attr("transform", function(d) { return "translate(0," + y(1 - d) + ")"; });

    ytick.append("line")
    .attr("x1", -6)
    .style("stroke", "#000");

    ytick.append("text")
    .attr("x", -8)
    .attr("text-anchor", "end")
    .attr("dy", ".35em")
    .text(p);

    // Add a group for each names.
    var segments = svg.selectAll(".names")
    .data(segments)
    .enter().append("g")
    .attr("class", "names")
    .attr("transform", function(d) { return "translate(" + x(d.offset / sum) + ")"; });

    // Add a rect for each group.
    var markets = segments.selectAll(".group")
    .data(function(d) { return d.values; })
    .enter()
    .append("rect")
    .attr("y", function(d) { return y(d.offset / d.parent.sum); })
    .attr("height", function(d) { return y(d.value / d.parent.sum); })
    .attr("width", function(d) { return x(d.parent.sum / sum) -1 ; })
    .attr("stroke", function(d) { return d3.rgb(options.color(d.name)).darker(); })
    .attr("data-title", function(d) { return d.name + " - " + d.parent.key + ": " + n(d.value); })
    .style("fill", function(d) { return options.color(d.name); });

  var legend = svg.selectAll(".legend")
    .data(options.values)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

 legend.append("rect")
    .attr("x", options.width - margin.left+8)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

    legend.append("text")
    .attr("x", options.width - margin.left)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });

    $("rect").tooltip({container: 'body', html: true, placement:'top'});

}
}

bubble = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 300
    if(options.height == undefined) options.height = 300
    if(options.font == undefined) options.font = "sans-serif"
    if(options.container == undefined) options.container = "body"
    if(options.text == undefined) options.text = 'text'
    if(options.size == undefined) options.size = 'size'
    if(options.data == undefined) options.data = {}
    if(options.color == undefined) options.color = d3.scale.category20();

    var diameter = Math.min(options.width, options.height),
    color= options.color;

var bubble = d3.layout.pack()
    .sort(null)
    .size([options.width, options.height])
    .padding(1.5);

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .attr("class", "bubble");

    data = options.data.map(function(d){ d.value = +d[options.size]; return d; });

    var nodes = bubble.nodes({children:data}).filter(function(d) { return !d.children; });

    var bubbles = svg.append("g")
    .attr("transform", "translate(0,0)")
    .selectAll(".bubble")
    .data(nodes)
    .enter();

    //create the bubbles
    bubbles.append("circle")
    .attr("r", function(d){ return d.r; })
    .attr("cx", function(d){ return d.x; })
    .attr("cy", function(d){ return d.y; })
    .style("fill", function(d) { return color(d.value); })
    .style("stroke", function(d) { return d3.rgb(color(d.value)).darker(); })
    .attr("data-title",function(d) { return d[options.text]+' : '+addThousandsSeparator(d.value) });

    //format the text for each bubble
    bubbles.append("text")
    .attr("x", function(d){ return d.x; })
    .attr("y", function(d){ return d.y + 5; })
    .attr("text-anchor", "middle")
    .text(function(d){ return d[options.text].substring(0, d.r / 3); })
    .style({"fill":"white", "font-family":options.font,"font-size": "12px"})
    .attr("data-title",function(d) { return d[options.text]+' : '+addThousandsSeparator(d.value) });

    $("circle").tooltip({container: 'body', html: true, placement:'left'});
    $("text").tooltip({container: 'body', html: true, placement:'top'});

    }
}

aster_plot = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.value == undefined) options.value = 'value'
    if(options.weight == undefined) options.weight = 'weight'
    if(options.text == undefined) options.text = 'text'
    if(options.data == undefined) options.data = {}

var max_value = d3.max(options.data, function(d) { return d[options.value]; });
 
var radius = Math.min(options.width, options.height) / 2,
    innerRadius = 0.3 * radius;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d[options.weight]; });

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(function (d) { 
    return (radius - innerRadius) * (d.data[options.value] / 100.0) + innerRadius; 
    });

var outlineArc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + options.width / 2 + "," + options.height / 2 + ")");

    options.data.forEach(function(d) {
    d._display_value = d[options.value];
    d[options.value] = (parseFloat(d[options.value])/parseFloat(max_value))*100;
    d[options.weight] = +d[options.weight];

    });

    var path = svg.selectAll(".solidArc")
    .data(pie(options.data))
    .enter().append("path")
    .attr("fill", function(d,i) { return options.color(i); })
    .attr("data-title",function(d,i) { return options.data[i][options.text]+' : '+options.data[i]._display_value })
    .attr("class", "solidArc")
    .attr("stroke", "gray")
    .attr("d", arc);

    var outerPath = svg.selectAll(".outlineArc")
    .data(pie(options.data))
    .enter().append("path")
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("class", "outlineArc")
    .attr("d", outlineArc);    

    var score = 
    options.data.reduce(function(a, b) {
    return a + (b[options.value] * b[options.weight]); 
    }, 0) / 
    options.data.reduce(function(a, b) { 
    return a + b[options.weight]; 
    }, 0);

    svg.append("svg:text")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .attr("font-size", "500%")
    .text(Math.round(score));

    $("path").tooltip({container: 'body', html: true, placement:'top'});
}
}

donut = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.innerRadius == undefined) options.innerRadius = 0
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.value == undefined) options.value = 'value'
    if(options.text == undefined) options.text = 'text'
    if(options.data == undefined) options.data = {}

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + options.width / 2 + "," + options.height / 2 + ")");

var radius = Math.min(options.width, options.height) / 2;

 options.data.forEach(function(d) {
    d[options.value] = +d[options.value];
    });

var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(options.innerRadius);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d[options.value]; });

    var g = svg.selectAll(".arc")
    .data(pie(options.data))
    .enter().append("g")
    .attr("class", "arc");

    g.append("path")
    .attr("d", arc)
    .style("fill", function(d,i) { return options.color(i); })
    .attr("data-title",function(d,i) { return d.data[options.text]+' : '+d.data[options.value]; });

    g.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .text(function(d) { return d.data[options.text]; });

    $("path").tooltip({container: 'body', html: true, placement:'top'}); 
}
}
stacked_bar = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.values == undefined) options.values = ['A','B','C','D']
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}

var margin = {top: options.height/10,left: options.width/10};

var x = d3.scale.ordinal()
    .rangeRoundBands([0, options.width-margin.left-margin.left], .1);

var y = d3.scale.linear()
    .rangeRound([options.height-margin.top, 0]);

var color = d3.scale.ordinal()
    .range(options.color.range());

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left / 2 + "," + margin.top / 2 + ")");

    color.domain(options.values);

    options.data.forEach(function(d) {
    var y0 = 0;
    d.groups = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name],value:d[name],groupby:d[options.groupby]}; });
    d.total = d.groups[d.groups.length - 1].y1;
    });
 
    x.domain(options.data.map(function(d) { return d[options.groupby]; }));
    y.domain([0, d3.max(options.data, function(d) { return d.total; })]);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (options.height-margin.top) + ")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text");

    var stackedbar = svg.selectAll(".stackedbar")
    .data(options.data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function(d) { return "translate(" + x(d[options.groupby]) + ",0)"; });

    stackedbar.selectAll("rect")
    .data(function(d) { return d.groups; })
    .enter().append("rect")
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.y1); })
    .attr("height", function(d) { return y(d.y0) - y(d.y1); })
    .attr("data-title",function(d) { return d.groupby+','+d.name+' '+addThousandsSeparator(d.value) })
    .style("fill", function(d) { return color(d.name); });

    var legend = svg.selectAll(".legend")
    .data(color.domain().slice().reverse())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
    .attr("x", options.width - margin.left+8)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

    legend.append("text")
    .attr("x", options.width - margin.left)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });
	
    $("rect").tooltip({container: 'body', html: true, placement:'top'});
	
}
}

normalized_stacked_bar = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.values == undefined) options.values = ['A','B','C','D']
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}

var margin = {top: options.height/5,left: options.width/10};

var x = d3.scale.ordinal()
    .rangeRoundBands([0, options.width-margin.left], .33);

var y = d3.scale.linear()
    .rangeRound([options.height-margin.top, 0]);

var color = d3.scale.ordinal()
    .range(options.color.range());

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left / 2 + "," + margin.top / 5 + ")");

    color.domain(options.values);

    options.data.forEach(function(d) {
    var y0 = 0;
    d.groups = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name],value:d[name],groupby:d[options.groupby]}; });
    d.groups.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; d.y0= d.y0*100,d.y1=d.y1*100 });
    d.total = d.groups[d.groups.length - 1].y1;
    });
 
    options.data.sort(function(a, b) { return b.total - a.total; });

    x.domain(options.data.map(function(d) { return d[options.groupby]; }));
    y.domain([0, d3.max(options.data, function(d) { return d.total; })]);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (options.height-margin.top) + ")")
    .call(xAxis)
	.selectAll('text')
	.style("font-size", "12px");

    svg.append("g")
    .attr("class", "y axis")
	.attr("display", "none")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 2)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Percentage");

    var stackedbar = svg.selectAll(".stackedbar")
    .data(options.data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function(d) { return "translate(" + x(d[options.groupby]) + ",0)"; });

    stackedbar.selectAll("rect")
    .data(function(d) { return d.groups.reverse(); })
    .enter().append("rect")
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.y1); })
    .attr("height", function(d) { return y(d.y0) - y(d.y1)+3; })
	.attr("data-title",function(d) { return d.groupby+','+d.name+' '+addThousandsSeparator(d.value) })
    .attr("fill", function(d) { return color(d.name); })
	.attr("rx", 3)
	.attr("stroke", '#ddd')
	.attr("stroke-width", 1);


	stackedbar.selectAll("text")
    .data(function(d) { return d.groups; })
    .enter().append("text")
    .attr("y", function(d) { return ((y(d.y1)+y(d.y0))/2)+6; })
    .attr("x", x.rangeBand()/2)
	.attr("text-anchor", "middle")
	.style("font-size", "12px")
	.attr("data-title",function(d) { return d.groupby+','+d.name+' '+addThousandsSeparator(d.value) })
    .style("fill", function(d) { return (parseInt(color(d.name).replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
	.text(function(d) { return (y(d.y0) - y(d.y1))>25 ?parseInt(d.y1-d.y0)+'%':' '; });
 
    var legend = svg.selectAll(".legend")
    .data(color.domain().slice().reverse())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate("+ (options.width-margin.left-margin.left-(i * (options.width/10))) +",0)"; });

    legend.append("rect")
	.attr("y", options.height-(margin.top/1.5))
    .attr("width", (options.width/12))
	.attr("rx", (options.width/72))
    .attr("height", (options.width/36))
    .attr("data-title",function(d) { return d; })
	.style("fill", color);

    legend.append("text")
    .attr("x",(options.width/24))
    .attr("y", options.height-(margin.top/1.5)+(options.width/54))
	.style("fill", function(d) { return (parseInt(color(d).replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';})
    .style("text-anchor", "middle")
	.style("font-size", "9px")
    .attr("data-title",function(d) { return d; })
	.text(function(d) { return d; });

	 svg.append("line")
			.attr("class", "base_line")
			.attr("x1", margin.left/4)
			.attr("y1", options.height-(margin.top/1.4))
			.attr("x2", options.width-(margin.left*5)/4)
			.attr("y2", options.height-(margin.top/1.4))
			.attr("stroke","gray")
			.attr("stroke-width",.5);
					
    $("rect").tooltip({container: 'body', html: true, placement:'top'});
	$("text").tooltip({container: 'body', html: true, placement:'top'});

}
}
grouped_bar = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.values == undefined) options.values = ['A','B','C','D']
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}

var margin = {top: options.height/10,left: options.width/10};

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, options.width-margin.left-margin.left], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .rangeRound([options.height-margin.top, 0]);

var color = d3.scale.ordinal()
    .range(options.color.range());

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left / 2 + "," + margin.top / 2 + ")");

    color.domain(options.values);

    options.data.forEach(function(d) {
    var y0 = 0;
    d.groups = color.domain().map(function(name) { return {name: name, value:+d[name],groupby:d[options.groupby]}; });
    });
 
    x0.domain(options.data.map(function(d) { return d[options.groupby]; }));
    x1.domain(options.values).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(options.data, function(d) { return d3.max(d.groups, function(d) { return d.value; }); })]);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (options.height-margin.top) + ")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

    var state = svg.selectAll(".state")
    .data(options.data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function(d) { return "translate(" + x0(d[options.groupby]) + ",0)"; });

    state.selectAll("rect")
    .data(function(d) { return d.groups; })
    .enter().append("rect")
    .attr("width", x1.rangeBand())
    .attr("x", function(d) { return x1(d.name); })
    .attr("y", function(d) { return y(d.value); })
    .attr("data-title",function(d) { return d.groupby+','+d.name+' '+addThousandsSeparator(d.value) })
    .attr("height", function(d) { return options.height - y(d.value)-margin.top; })
    .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
    .data(options.values)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
    .attr("x", options.width - margin.left+8)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);
    
	legend.append("text")
    .attr("x", options.width - margin.left)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });
	
	
	
	

    $("rect").tooltip({container: 'body', html: true, placement:'top'});
}
}

dual_scale_bar = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.value_1 == undefined) options.value_1 = 'value_1'
    if(options.value_2 == undefined) options.value_2 = 'value_2'
    if(options.data == undefined) options.data = {}

var margin = {top: options.height/10,left: options.width/10};

var x = d3.scale.ordinal()
    .rangeRoundBands([0, options.width-margin.left-margin.left], .1);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left / 2 + "," + margin.top / 2 + ")");


var y0 = d3.scale.linear().domain([0, d3.max(options.data, function(d) { return d[options.value_1]; })]).range([options.height-margin.top, 0]),
    y1 = d3.scale.linear().domain([0, d3.max(options.data, function(d) { return d[options.value_2]; })]).range([options.height-margin.top, 0]);

    // create left yAxis
    var yAxisLeft = d3.svg.axis().scale(y0).ticks(5).orient("left");
    // create right yAxis
    var yAxisRight = d3.svg.axis().scale(y1).ticks(6).orient("right");

    x.domain(options.data.map(function(d) { return d[options.groupby]; }));
    y0.domain([0, d3.max(options.data, function(d) { return d[options.value_1]; })]);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (options.height-margin.top) + ")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "y axis axisLeft")
    .attr("transform", "translate(0,0)")
    .call(yAxisLeft)
    .attr("fill", function(d) {    return options.color(0)})    
    .append("text")
    .attr("y", 6)
    .attr("dy", "-2em")
    .style("text-anchor", "end")
    .attr("fill", function(d) {    return options.color(0)})
    .text(options.value_1);

    svg.append("g")
    .attr("class", "y axis axisRight")
    .attr("transform", "translate(" + (options.width - margin.left - margin.left) + ",0)")
    .attr("fill", function(d) {    return options.color(1)})
    .call(yAxisRight)
    .append("text")
    .attr("y", 6)
    .attr("dy", "-2em")
    .attr("dx", "2em")
    .style("text-anchor", "end")
    .attr("fill", function(d) {    return options.color(1)})
    .text(options.value_2);

     bars = svg.selectAll(".bar").data(options.data).enter();

    bars.append("rect")
    .attr("class", "bar1")
    .attr("x", function(d) { return x(d[options.groupby]); })
    .attr("width", x.rangeBand()/2)
    .attr("rx", x.rangeBand()/8)
    .attr("y", function(d) { return y0(d[options.value_1]); })
    .attr("height", function(d) { return options.height - y0(d[options.value_1])-margin.top; })
    .attr("fill", function(d) {    return options.color(0)})
    .attr("data-title", function(d) { return options.value_1+' : '+addThousandsSeparator(d[options.value_1]) });

    bars.append("rect")
    .attr("class", "bar2")
    .attr("x", function(d) { return x(d[options.groupby]) + x.rangeBand()/2; })
    .attr("width", x.rangeBand()/ 2)
    .attr("rx", x.rangeBand()/8)
    .attr("y", function(d) { return y1(d[options.value_2]); })
    .attr("height", function(d) { return options.height - y1(d[options.value_2])-margin.top; })
    .attr("fill",function(d) {    return options.color(1)})
    .attr("data-title", function(d) { return options.value_2+' : '+addThousandsSeparator(d[options.value_2]) });

    $("rect").tooltip({container: 'body', html: true, placement:'right'});

}
}


bubble_axis = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.size == undefined) options.size = 'size'
	if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.xAxis == undefined) options.xAxis = 'xAxis'
    if(options.yAxis == undefined) options.yAxis = 'yAxis'
    if(options.data == undefined) options.data = {}

function x(d) { return d[options.xAxis]; }
function y(d) { return d[options.yAxis]; }
function radius(d) { return d[options.size]; }
function key(d) { return d[options.groupby]; }

// Chart dimensions.
var margin = {top: options.height/10,left: options.width/10};

max_xAxis = d3.max(options.data, function(d) { return d[options.xAxis]; });
max_yAxis = d3.max(options.data, function(d) { return d[options.yAxis]; });

max_radiusScale = d3.max(options.data, function(d) { return d[options.size]; });

min_radiusScale = d3.min(options.data, function(d) { return d[options.size]; });

if (max_radiusScale == min_radiusScale) { ranges=50 } else { ranges=4 }

// Various scales. These domains derives assumptions of data, naturally.
var xScale = d3.scale.linear().domain([0, max_xAxis]).range([0, (options.width-(2*margin.left))]),
    yScale = d3.scale.linear().domain([0, max_yAxis]).range([(options.height-(2*margin.top)), 0]),
    radiusScale = d3.scale.sqrt().domain([0, 1+'e'+((max_radiusScale.toString().length)+1).toString() ]).range([0, ranges]),
    colorScale = options.color;

// The x & y axes.
var xAxis = d3.svg.axis().orient("bottom").scale(xScale),
    yAxis = d3.svg.axis().scale(yScale).orient("left");

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (options.height-2*(margin.top)) + ")")
    .call(xAxis);

// Add the y-axis.
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  // A bisector since many nation's data is sparsely-defined.
  var bisect = d3.bisector(function(d) { return d[0]; });
  
  // Add a dot per nation. Initialize the data at 1800, and set the colors.
  var dot = svg.append("g")
      .attr("class", "dots")
    .selectAll(".dot")
      .data(options.data)
    .enter().append("circle")
      .attr("class", "dot")
      .style("fill", function(d,i) { return colorScale(i); })
      .style("stroke", '#444')
	  .call(position)
      .sort(order)
	  .attr("data-title",function(d) { return d[options.groupby]+' : '+addThousandsSeparator(d[options.size]) });

  // Positions the dots based on data.
  function position(dot) {
    dot .attr("cx", function(d) { return xScale(x(d)); })
        .attr("cy", function(d) { return yScale(y(d)); })
        .attr("r", function(d) { return radiusScale(radius(d)); });
  }

  // Defines a sort order so that the smallest dots are drawn on top.
  function order(a, b) {
    return radius(b) - radius(a);
  }
  
$("circle").tooltip({container: 'body', html: true, placement:'top'});
		}
		
		}
		
		
normalized_horizontal_stacked_bar = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
	if(options.values == undefined) options.values = ['A','B','C','D']
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.groupby == undefined) options.groupby = 'groupby'  
    if(options.data == undefined) options.data = {}
    
var margin = {top: options.height/10,left: options.width/10};		

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top/2 + ")");

	
	options.data.forEach(function(d) {
    
	total = 0
	options.values.forEach(function(i) {
    d[i+'_values'] = +d[i]
	total = total+d[i+'_values']
	});
	d.total =total
	});
	
	options.data.forEach(function(d) {
    
	options.values.forEach(function(i) {
    d[i] = d[i+'_values']/d.total
	});
	});
	
	
	
    var layers = d3.layout.stack()(options.values.map(function(period) {
        return options.data.map(function(d) {
		  return {x: d[options.groupby], y: parseFloat(d[period]), value: parseFloat(d[period+'_values']),name: period };
		
		});
    }));

	
    var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });
    var yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

    var yScale = d3.scale.ordinal()
        .domain(layers[0].map(function(d) { return d.x; }))
        .rangeRoundBands([25, options.height-margin.top], .2);

    var x = d3.scale.linear()
        .domain([0, yStackMax])
        .range([0, options.width-margin.left-margin.left]);

	var color = d3.scale.ordinal()
		.range(options.color.range());
	
	    color.domain(options.values);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")		
        .tickPadding(12)
		.tickFormat(d3.format(".0%"));
		
		
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickSize(0)
        .tickPadding(6)
        .orient("left");

    var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer");
		
		d3.selectAll(".tick > text")
			.style("font-size", "12px")	
  
    var rect = layer.selectAll("rect")
        .data(function(d) { return  d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("height", yScale.rangeBand())
        .attr("x", function(d) { return x(d.y0); })
        .attr("width", function(d) { return x(d.y); })
		.style("fill", function(d) { return color(d.name); })
		.style("stroke", function(d) { return d3.rgb(color(d.name)).darker(); })
		.attr("data-title",function(d) { return d.x+','+d.name+' '+addThousandsSeparator(d.value) })
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (options.height-margin.top) + ")")
        .call(xAxis)
        .selectAll("text").style("text-anchor", "middle")
            .attr("dx", "-.18em")
            .attr("dy", ".15em");

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(yAxis);
	
  var legend = svg.selectAll(".legend")
    .data(options.values)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", options.width - (margin.left*3/2)+8)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color)
	.on("mouseover",function(d) { return  fade(.1,d); })
	.on("mouseout", function(d) { return  fade(1,d); });

   legend.append("text")
    .attr("x", options.width - (margin.left*3/2))
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });

		// Returns an event handler for fading a given chord group.
	function fade(opacity,name) {
          	
		  rect
			.filter(function(d) { return d.name != name; })
			.style("opacity", opacity);
	}	 
	
	$("rect").tooltip({container: 'body', html: true, placement:'top'});
	
		}
	}
	
horizontal_stacked_bar = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
	if(options.values == undefined) options.values = ['A','B','C','D']
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.groupby == undefined) options.groupby = 'groupby'  
    if(options.data == undefined) options.data = {}
    
var margin = {top: options.height/10,left: options.width/10};		

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top/2 + ")");

    var layers = d3.layout.stack()(options.values.map(function(period) {
        return options.data.map(function(d) {
		  return {x: d[options.groupby], y: parseFloat(d[period]), value: parseFloat(d[period]),name: period };
		
		});
    }));

    var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });
    var yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

    var yScale = d3.scale.ordinal()
        .domain(layers[0].map(function(d) { return d.x; }))
        .rangeRoundBands([25, options.height-margin.top], .2);

    var x = d3.scale.linear()
        .domain([0, yStackMax])
        .range([0, options.width-margin.left-margin.left]);

	var color = d3.scale.ordinal()
		.range(options.color.range());
	
	    color.domain(options.values);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")		
        .tickPadding(12);
		
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickSize(0)
        .tickPadding(6)
        .orient("left");

    var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer");
		
		d3.selectAll(".tick > text")
			.style("font-size", "12px")	
  
    var rect = layer.selectAll("rect")
        .data(function(d) { return  d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("height", yScale.rangeBand())
        .attr("x", function(d) { return x(d.y0); })
        .attr("width", function(d) { return x(d.y); })
		.style("fill", function(d) { return color(d.name); })
		.style("stroke", function(d) { return d3.rgb(color(d.name)).darker(); })
		.attr("data-title",function(d) { return d.x+','+d.name+' '+addThousandsSeparator(d.value) })
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (options.height-margin.top) + ")")
        .call(xAxis)
        .selectAll("text").style("text-anchor", "middle")
            .attr("dx", "-.18em")
            .attr("dy", ".15em");

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(yAxis);
	
  var legend = svg.selectAll(".legend")
    .data(options.values)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", options.width - (margin.left*3/2)+8)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color)
	.on("mouseover",function(d) { return  fade(.1,d); })
	.on("mouseout", function(d) { return  fade(1,d); });

   legend.append("text")
    .attr("x", options.width - (margin.left*3/2))
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });

	$("rect").tooltip({container: 'body', html: true, placement:'top'});
	
	// Returns an event handler for fading a given chord group.
	function fade(opacity,name) {
          	
		  rect
			.filter(function(d) { return d.name != name; })
			.style("opacity", opacity);
	}	 
	
		}
	}	

horizontal_grouped_bar = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
	if(options.values == undefined) options.values = ['A','B','C','D']
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.groupby == undefined) options.groupby = 'groupby'  
    if(options.data == undefined) options.data = {}
    
var margin = {top: options.height/10,left: options.width/10};		

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top/2 + ")");

    var layers = d3.layout.stack()(options.values.map(function(period,index) {
        return options.data.map(function(d) {
		  return {x: d[options.groupby], y: parseFloat(d[period]), value: parseFloat(d[period]),name: period, sub_group : index};
		
		});
    }));

    var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });
    
    var yScale = d3.scale.ordinal()
        .domain(layers[0].map(function(d) { return d.x; }))
        .rangeRoundBands([25, options.height-margin.top], .2);

    var x = d3.scale.linear()
        .domain([0, yGroupMax])
        .range([0, options.width-margin.left-margin.left]);

	var color = d3.scale.ordinal()
		.range(options.color.range());
	
	    color.domain(options.values);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")		
        .tickPadding(12);
		
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickSize(0)
        .tickPadding(6)
        .orient("left");

    var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer");
		
		d3.selectAll(".tick > text")
			.style("font-size", "12px")	
  
    var rect = layer.selectAll("rect")
        .data(function(d) { return  d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x)+(d.sub_group*yScale.rangeBand()/options.values.length); })
        .attr("height", (yScale.rangeBand()/(options.values.length+1)))
        .attr("x", 0)
        .attr("width", function(d) { return x(d.y); })
		.style("fill", function(d) { return color(d.name); })
		.style("stroke", function(d) { return d3.rgb(color(d.name)).darker(); })
		.attr("data-title",function(d) { return d.x+','+d.name+' '+addThousandsSeparator(d.value) })
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (options.height-margin.top) + ")")
        .call(xAxis)
        .selectAll("text").style("text-anchor", "middle")
            .attr("dx", "-.18em")
            .attr("dy", ".15em");

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(yAxis);
	
  var legend = svg.selectAll(".legend")
    .data(options.values)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", options.width - (margin.left*3/2)+8)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color)
	.on("mouseover",function(d) { return  fade(.1,d); })
	.on("mouseout", function(d) { return  fade(1,d); });

   legend.append("text")
    .attr("x", options.width - (margin.left*3/2))
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });

	$("rect").tooltip({container: 'body', html: true, placement:'top'});
	
	// Returns an event handler for fading a given chord group.
	function fade(opacity,name) {
          	
		  rect
			.filter(function(d) { return d.name != name; })
			.style("opacity", opacity);
	}	 
	
		}
	}	
	
	
correlation = {
    make: function(options) {

	if(options == undefined) options = {}
    if(options.width == undefined) options.width = 1200
    if(options.height == undefined) options.height = 900
    if(options.container == undefined) options.container = "body"
    if(options.source == undefined) options.source = 'source'
    if(options.target == undefined) options.target = 'target'
    if(options.value == undefined) options.value = 'value'
	if(options.range == undefined) options.range = ["white", "blue"]
	if(options.data == undefined) options.data = {}
	    
var margin = {top: options.height/10,left: options.width/10};		

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

data = {"nodes" : [], "links" : []};

options.data.forEach(function (d) {
      data.nodes.push({ "name": d.source ,"group":1});
      data.nodes.push({ "name": d.target ,"group":1});
      data.links.push({ "source": d.source,
                         "target": d.target,
                         "value": parseFloat(d.value) });
     });
	 
     data.nodes = d3.keys(d3.nest()
       .key(function (d) { return d.name; })
       .map(data.nodes));
	 
     // loop through each link replacing the text with its index from node
     data.links.forEach(function (d, i) {
       data.links[i].source = data.nodes.indexOf(data.links[i].source);
       data.links[i].target = data.nodes.indexOf(data.links[i].target);
     });
	 
  var matrix = [],
      nodes = data.nodes,
      n = nodes.length;

  // Compute index per node.
  nodes.forEach(function(node, i) {
    node.index = i;
    node.count = 0;
    matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });
  });

  // Convert links to matrix; count character occurrences.
  data.links.forEach(function(link) {
    matrix[link.source][link.target].z += link.value;
    matrix[link.target][link.source].z += link.value;
    matrix[link.source][link.source].z += link.value;
    matrix[link.target][link.target].z += link.value;
    nodes[link.source].count += link.value;
    nodes[link.target].count += link.value;
  });

  
 var x = d3.scale.ordinal().rangeBands([0, (d3.min([options.width,options.height])-margin.left)]),
    z = d3.scale.linear().domain([0, 4]).clamp(true),
	c = d3.scale.linear().range(options.range).domain([d3.min(data.links,function(d) { return d.value }),d3.max(data.links,function(d) { return d.value})]);
	
  // The default sort order.
  x.domain(data.nodes);

  svg.append("rect")
      .attr("class", "background")
      .attr("width", d3.min([options.width,options.height])-margin.left)
      .attr("height", d3.min([options.width,options.height])-margin.left)
	  .attr("fill", "#fff");

  var row = svg.selectAll(".row")
      .data(matrix)
    .enter().append("g")
      .attr("class", "row")
      .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
      .each(row);

  row.append("text")
      .attr("x", -6)
      .attr("y", x.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "end")
      .text(function(d, i) { return data.nodes[i]; });
	  
  row.append("line")
      .attr("x2", options.width-margin.left);

  var column = svg.selectAll(".column")
      .data(matrix)
    .enter().append("g")
      .attr("class", "column")
      .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

  column.append("line")
      .attr("x1", -options.width+margin.left);

  column.append("text")
      .attr("x", 6)
      .attr("y", x.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "start")
      .text(function(d, i) { return data.nodes[i]; });

  function row(row) {
    
	var cell = d3.select(this).selectAll(".cell")
        .data(row.filter(function(d) { return d.z; }))
      .enter().append("rect")
        .attr("class", "cell")
        .attr("x", function(d) { return x(d.x); })
        .attr("width", x.rangeBand())
        .attr("height", x.rangeBand())
		.attr("data-title", function(d) { return data.nodes[d.x]+','+data.nodes[d.y]+' : '+addThousandsSeparator(d.z.toFixed(0)); })			
		.style("fill", function(d) { if (d.x>d.y) {return c(d.z)} else if(d.y>d.x) {return c(d.z)} else { return "#fff" };}); 
	
	var cell_text = d3.select(this).selectAll(".texts")
        .data(row.filter(function(d) { return d.z; }))
      .enter().append("text")
        .attr("x", function(d) { return x(d.x)+(x.rangeBand()/2); })
        .attr("y", x.rangeBand()*3/4)
		.style("text-anchor","middle")
		.attr("data-title", function(d) { return data.nodes[d.x]+','+data.nodes[d.y]+' : '+addThousandsSeparator(d.z.toFixed(2)); })			
		.text(function(d) { if (d.x>d.y) {return d.z.toFixed(0) } else if(d.y>d.x) {return d.z.toFixed(0) }}); 

		
	}	
	
      $("rect").tooltip({container: 'body', html: true, placement:'top'});
   
	}
	}
	
	
normalized_stacked_area = {
    make: function(options) {
    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.values == undefined) options.values = ['A','B','C','D']
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}
	if(options.date_format == undefined) options.date_format = "%Y-%m-%d"


var margin = {top: options.height/10,left: options.width/10};

var parseDate = d3.time.format(options.date_format).parse;

var x = d3.time.scale()
    .range([0, options.width-margin.left-margin.left]);

var y = d3.scale.linear()
    .range([options.height-margin.top, 0]);

var color = d3.scale.ordinal()
    .range(options.color.range());

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
	.ticks(5);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".0%"));

	
var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var stack = d3.layout.stack()
    .values(function(d) { return d.values; });
	
var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left / 2 + "," + margin.top / 2 + ")");

    color.domain(options.values);

	options.data.forEach(function(d) {
		d[options.groupby] = parseDate(d[options.groupby]),
		total=0,
		color.domain().forEach(function(o) {
			total=total+parseFloat(d[o]);
	});
		d.total=total;
		color.domain().forEach(function(o) {
			d[o] = parseFloat(((parseFloat(d[o])/d.total)*100).toFixed(2));
	});
		
	});
     
  var area_values = stack(color.domain().map(function(name) {
    return {
      name: name,	  
      values: options.data.map(function(d) {
        return {date: d[options.groupby], y: d[name]/100 };
      })
    };
  }));
  
   x.domain(d3.extent(options.data, function(d) { return d[options.groupby]; }));

  var area_svg = svg.selectAll(".browser")
      .data(area_values)
    .enter().append("g")
      .attr("class", "browser");

  area_svg.append("path")
      .attr("class", "area")
      .attr("d", function(d) { return area(d.values); })
      .attr("data-title", function(d) { return d.name; })
	  .style("fill", function(d) { return color(d.name); });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (options.height-margin.top) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
	
 var legend = svg.selectAll(".legend")
    .data(color.domain().slice().reverse())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
    .attr("x", options.width - margin.left+8)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color)
	.on("mouseover",function(d) { return  fade(.1,d); })
	.on("mouseout", function(d) { return  fade(1,d); });
	
    legend.append("text")
    .attr("x", options.width - margin.left)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });
	
    $("path").tooltip({container: 'body', html: true, placement:'top'});
    $("rect").tooltip({container: 'body', html: true, placement:'top'});
	

	// Returns an event handler for fading a given chord group.
	function fade(opacity,name) {		
		  area_svg
			.filter(function(d) { return d.name != name; })
			.style("opacity", opacity);
	}	  

	
	}
}	
	
	
stacked_area = {
    make: function(options) {
    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.values == undefined) options.values = ['A','B','C','D']
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}
	if(options.date_format == undefined) options.date_format = "%Y-%m-%d"


var margin = {top: options.height/10,left: options.width/10};

var parseDate = d3.time.format(options.date_format).parse;

var x = d3.time.scale()
    .range([0, options.width-margin.left-margin.left]);

var y = d3.scale.linear()
    .range([options.height-margin.top, 0]);

var color = d3.scale.ordinal()
    .range(options.color.range());

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
	 .ticks(5);
	
var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var stack = d3.layout.stack()
    .values(function(d) { return d.values; });
	
var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left / 2 + "," + margin.top / 2 + ")");

    color.domain(options.values);

	options.data.forEach(function(d) {
		d[options.groupby] = parseDate(d[options.groupby]),
		total=0,
		color.domain().forEach(function(o) {
			total=total+parseFloat(d[o]);
	});
		d.total=total;
	});
    var max_total = d3.max(options.data, function(d) { return d.total; });
	
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
	.tickFormat(function(d) { return (d*max_total); })
	.ticks(5);
	
	options.data.forEach(function(d) {

	color.domain().forEach(function(o) {
			d[o] = parseFloat(((parseFloat(d[o])/max_total)*100).toFixed(2));
	});
		
	});
     
	 
  var area_values = stack(color.domain().map(function(name) {
    return {
      name: name,	  
      values: options.data.map(function(d) {
        return {date: d[options.groupby], y: d[name]/100 };
      })
    };
  }));
  
  
   x.domain(d3.extent(options.data, function(d) { return d[options.groupby]; }));

  var area_svg = svg.selectAll(".browser")
      .data(area_values)
    .enter().append("g")
      .attr("class", "browser");

  area_svg.append("path")
      .attr("class", "area")
      .attr("d", function(d) { return area(d.values); })
      .attr("data-title", function(d) { return d.name; })
	  .style("fill", function(d) { return color(d.name); });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (options.height-margin.top) + ")")
	  .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
	
 var legend = svg.selectAll(".legend")
    .data(color.domain().slice().reverse())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
    .attr("x", options.width - margin.left+8)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color)
	.on("mouseover",function(d) { return  fade(.1,d); })
	.on("mouseout", function(d) { return  fade(1,d); });
	
    legend.append("text")
    .attr("x", options.width - margin.left)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });
	
    $("path").tooltip({container: 'body', html: true, placement:'top'});
    $("rect").tooltip({container: 'body', html: true, placement:'top'});
	
	
	// Returns an event handler for fading a given chord group.
	function fade(opacity,name) {		
		  area_svg
			.filter(function(d) { return d.name != name; })
			.style("opacity", opacity);
	}	  

	}
}	

day_hour_heatmap = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.range == undefined) options.range = ["white", "steelblue"]
    if(options.day == undefined) options.day = 'day'
	if(options.hour == undefined) options.hour = 'hour'
    if(options.value == undefined) options.value = 'value'
    if(options.data == undefined) options.data = {}

	var margin = {top: options.height/10,left: options.width/10};
	
	var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left / 2 + "," + margin.top / 2 + ")");
	
	gridSize = Math.floor((options.width-margin.left) / 24),
    
	legendElementWidth = gridSize*2,
    days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];

		options.data.forEach(function(d) {
	        d[options.day] = +d[options.day],
            d[options.hour] = +d[options.hour],
            d[options.value] =  parseFloat(d[options.value])
		});
	
	  var colorScale = d3.scale.linear()
		  .range(options.range)
		  .domain([0, d3.max(options.data, function (d) { return d[options.value]; })]);
              
          var dayLabels = svg.selectAll(".dayLabel")
              .data(days)
              .enter().append("text")
                .text(function (d) { return d; })
                .attr("x", 0)
                .attr("y", function (d, i) { return i * gridSize; })
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
                .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

          var timeLabels = svg.selectAll(".timeLabel")
              .data(times)
              .enter().append("text")
                .text(function(d) { return d; })
                .attr("x", function(d, i) { return i * gridSize; })
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + gridSize / 2 + ", -6)")
                .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

          var heatMap = svg.selectAll(".hour")
              .data(options.data)
              .enter().append("rect")
              .attr("x", function(d) { return (d[options.hour] - 1) * gridSize; })
              .attr("y", function(d) { return (d[options.day] - 1) * gridSize; })
              .attr("rx", gridSize/10)
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", function(d) { return colorScale(d[options.value]); })
              .style("stroke", "#ccc")
              .attr('data-title',function(d) { return days[d[options.day]-1]+' - '+times[d[options.hour]-1]+' : '+addThousandsSeparator(d[options.value]); });
			  
              
        $("rect").tooltip({container: 'body', html: true, placement:'right'});        
	  
	}
}	

negative_bar = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.text == undefined) options.text = 'text'
    if(options.value == undefined) options.value = 'value'
    if(options.data == undefined) options.data = {}

	options.data.forEach(function(d) {
	        d[options.value] =  parseFloat(d[options.value])
		});
	
	
var margin = {top: options.height/10,left: options.width/10};

var x = d3.scale.linear()
		.range([0, options.width-margin.left-margin.left]);
    
var y = d3.scale.ordinal()
    .rangeRoundBands([0, options.height-margin.top], .2);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
	
var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left / 2 + "," + margin.top / 2 + ")");


  x.domain(d3.extent(options.data, function(d) { return d[options.value]; })).nice();
  y.domain(options.data.map(function(d) { return d[options.text]; }));

  svg.selectAll(".bar")
      .data(options.data)
    .enter().append("rect")
      .attr("class", function(d) { return d.value < 0 ? "bar negative" : "bar positive"; })
      .attr("x", function(d) { return x(Math.min(0, d[options.value])); })
      .attr("y", function(d) { return y(d[options.text]); })
      .attr('data-title',function(d) { return d[options.text]+' : '+addThousandsSeparator(d[options.value]); })
	  .attr("width", function(d) { return Math.abs(x(d[options.value]) - x(0)); })
      .attr("height", y.rangeBand());

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," +(options.height-margin.top) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
    .append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y2", (options.height-margin.top));
       
        $("rect").tooltip({container: 'body', html: true, placement:'right'});        
	 
}
}

multiseries_line = {
    make: function(options) {
	
    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.values == undefined) options.values = ['A','B','C','D']
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}
	if(options.date_format == undefined) options.date_format = "%Y-%m-%d"

var margin = {top: options.height/10,left: options.width/10};

var parseDate = d3.time.format(options.date_format).parse;

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left / 2 + "," + margin.top / 2 + ")");

var x = d3.time.scale()
    .range([0, options.width-margin.left-margin.left]);

var y = d3.scale.linear()
    .range([options.height-margin.top, 0]);

var color = d3.scale.ordinal()
    .range(options.color.range());

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
	 .ticks(5);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.line_value); });
	 
  color.domain(options.values);

  options.data.forEach(function(d) {
 	d[options.groupby] = parseDate(d[options.groupby])
	
	  });

  var line_data = color.domain().map(function(name) {
    return {
      name: name,
      values: options.data.map(function(d) {
        return {date: d[options.groupby], line_value: parseFloat(d[name])};
      })
    };
  });

  x.domain(d3.extent(options.data, function(d) { return d[options.groupby]; }));

  y.domain([
    d3.min(line_data, function(c) { return d3.min(c.values, function(v) { return v.line_value; }); }),
    d3.max(line_data, function(c) { return d3.max(c.values, function(v) { return v.line_value; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," +(options.height-margin.top) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  var groupby = svg.selectAll(".groupby")
      .data(line_data)
    .enter().append("g")
      .attr("class", "groupby");

  groupby.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke-width", 1.5)
	  .attr("data-title", function(d) { return d.name; })	  
	  .style("stroke", function(d) { return color(d.name); })
	  .style("fill", 'None');

 var legend = svg.selectAll(".legend")
    .data(color.domain().slice().reverse())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
    .attr("x", options.width - margin.left+8)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color)
	.on("mouseover",function(d) { return  fade(.1,d); })
	.on("mouseout", function(d) { return  fade(1,d); });
	
    legend.append("text")
    .attr("x", options.width - margin.left)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });
	
    $("path").tooltip({container: 'body', html: true, placement:'top'});
    $("rect").tooltip({container: 'body', html: true, placement:'top'});

	// Returns an event handler for fading a given chord group.
	function fade(opacity,name) {		
		  groupby
			.filter(function(d) { return d.name != name; })
			.style("opacity", opacity);
	}	  

	}
}

difference_line = {
    make: function(options) {
	
    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.value_1 == undefined) options.value_1 = 'value_1'
    if(options.value_2 == undefined) options.value_2 = 'value_2'	
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}
	if(options.date_format == undefined) options.date_format = "%Y-%m-%d"

var margin = {top: options.height/10,left: options.width/10};

var parseDate = d3.time.format(options.date_format).parse;

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top / 2 + ")");

var x = d3.time.scale()
    .range([0, options.width-margin.left-margin.left]);

var y = d3.scale.linear()
    .range([options.height-margin.top, 0]);

var color = d3.scale.ordinal()
    .range(options.color.range());

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
	 .ticks(5);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

 var line = d3.svg.area()
        .interpolate("basis")
        .x(function(d) { return x(d[options.groupby]); })
        .y(function(d) { return y(d[options.value_1]); });

 var area = d3.svg.area()
        .interpolate("basis")
        .x(function(d) { return x(d[options.groupby]); })
        .y1(function(d) { return y(d[options.value_1]); });
   
  options.data.forEach(function(d) {
		d[options.groupby] = parseDate(d[options.groupby])
		d[options.value_1] = parseFloat(d[options.value_1])
		d[options.value_2] = parseFloat(d[options.value_2])
	  
	  });
  x.domain(d3.extent(options.data, function(d) { return d[options.groupby]; }));

  y.domain([
    d3.min(options.data, function(d) { return Math.min(d[options.value_1], d[options.value_2]); }),
    d3.max(options.data, function(d) { return Math.max(d[options.value_1], d[options.value_2]); })
  ]);

 svg.datum(options.data);

  svg.append("clipPath")
      .attr("id", "clip-below")
    .append("path")
      .attr("d", area.y0(options.height-margin.top));

  svg.append("clipPath")
      .attr("id", "clip-above")
    .append("path")
      .attr("d", area.y0(0));

  svg.append("path")
      .attr("class", "area above")
      .attr("clip-path", "url(#clip-above)")
      .style("fill",'red')
      .attr("d", area.y0(function(d) { return y(d[options.value_2]); }));
      
  svg.append("path")
      .attr("class", "area below")
      .attr("clip-path", "url(#clip-below)")
      .style("fill",'steelblue')
      .attr("d", area);

  svg.append("path")
      .attr("class", "line")
      .attr("d", line);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," +(options.height-margin.top) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

	}
}

bivariate_area = {
    make: function(options) {
	
    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.value_1 == undefined) options.value_1 = 'value_1'
    if(options.value_2 == undefined) options.value_2 = 'value_2'	
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}
	if(options.date_format == undefined) options.date_format = "%Y-%m-%d"

var margin = {top: options.height/10,left: options.width/10};

var parseDate = d3.time.format(options.date_format).parse;

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top / 2 + ")");

var color = d3.scale.ordinal()
    .range(options.color.range());
	
var x = d3.time.scale()
    .range([0, options.width-margin.left-margin.left]);

var y = d3.scale.linear()
    .range([options.height-margin.top, 0]);

var color = d3.scale.ordinal()
    .range(options.color.range());

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
	 .ticks(5);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var area = d3.svg.area()
    .x(function(d) { return x(d[options.groupby]); })
    .y0(function(d) { return y(d[options.value_1]); })
    .y1(function(d) { return y(d[options.value_2]); });


  options.data.forEach(function(d) {
		d[options.groupby] = parseDate(d[options.groupby])
		d[options.value_1] = parseFloat(d[options.value_1])
		d[options.value_2] = parseFloat(d[options.value_2])
	  
	  });
  x.domain(d3.extent(options.data, function(d) { return d[options.groupby]; }));

  y.domain([d3.min(options.data, function(d) { return d[options.value_1]; }), d3.max(options.data, function(d) { return d[options.value_2]; })]);

 svg.append("path")
      .datum(options.data)
      .attr("class", "area")
      .attr("fill", color(0))
	  .style("stroke", "#555")
      .attr("d", area);

svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," +(options.height-margin.top) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
	}
}

area = {
    make: function(options) {
	
    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.value == undefined) options.value = 'value'	
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}
	if(options.date_format == undefined) options.date_format = "%Y-%m-%d"

var margin = {top: options.height/10,left: options.width/10};

var parseDate = d3.time.format(options.date_format).parse;

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top / 2 + ")");

var color = d3.scale.ordinal()
    .range(options.color.range());
	
var x = d3.time.scale()
    .range([0, options.width-margin.left-margin.left]);

var y = d3.scale.linear()
    .range([options.height-margin.top, 0]);

var color = d3.scale.ordinal()
    .range(options.color.range());

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
	 .ticks(5);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var area = d3.svg.area()
    .x(function(d) { return x(d[options.groupby]); })
    .y0(options.height-margin.top)
    .y1(function(d) { return y(d[options.value]); });


  options.data.forEach(function(d) {
		d[options.groupby] = parseDate(d[options.groupby])
		d[options.value] = parseFloat(d[options.value])
	  
	  });
  
  x.domain(d3.extent(options.data, function(d) { return d[options.groupby]; }));
  y.domain([0, d3.max(options.data, function(d) { return d[options.value]; })]);
 
 
 svg.append("path")
      .datum(options.data)
      .attr("class", "area")
      .attr("fill", color(0))
	  .style("stroke", "#555")
      .attr("d", area);
 
svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," +(options.height-margin.top) + ")")
      .call(xAxis);

svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
	}
}

horizontal_bar = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
	if(options.value == undefined) options.value = 'value'
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.groupby == undefined) options.groupby = 'groupby'  
    if(options.data == undefined) options.data = {}
    
var margin = {top: options.height/10,left: options.width/5};		

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top/2 + ")");

    var layers = d3.layout.stack()([options.value].map(function(period) {
        return options.data.map(function(d) {
		  return {x: d[options.groupby], y: parseFloat(d[period]), value: parseFloat(d[period])};
		});
    }));

   var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });

    var yScale = d3.scale.ordinal()
        .domain(layers[0].map(function(d) { return d.x; }))
        .rangeRoundBands([25, options.height-margin.top], .2);

    var x = d3.scale.linear()
        .domain([0, yGroupMax])
        .range([0, options.width-margin.left-margin.left]);

	var color = d3.scale.ordinal()
		.range(options.color.range());
	
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")		
        .tickPadding(12);
		
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickSize(0)
        .tickPadding(6)
        .orient("left");

    var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer");
		
		d3.selectAll(".tick > text")
			.style("font-size", "12px")	
  
    var rect = layer.selectAll("rect")
        .data(function(d) { return  d; })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("height", yScale.rangeBand())
        .attr("x", function(d) { return  x(d.y0); })
        .attr("width", function(d) { return x(d.y); })
		.style("fill", function(d) { return color(0); })
		.style("stroke", function(d) { return d3.rgb(color(0)).darker(); })
		.attr("data-title",function(d) { return d.x+' : '+addThousandsSeparator(d.value) })
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (options.height-margin.top) + ")")
        .call(xAxis)
        .selectAll("text").style("text-anchor", "middle")
            .attr("dx", "-.18em")
            .attr("dy", ".15em");

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(yAxis);
		
	
	$("rect").tooltip({container: 'body', html: true, placement:'top'});
	
	}
	}	

bar = {
    make: function(options) {

    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.value == undefined) options.value = 'value'
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}

var margin = {top: options.height/10,left: options.width/10};

var x = d3.scale.ordinal()
    .rangeRoundBands([0, options.width-margin.left-margin.left], .1);

var y = d3.scale.linear()
    .rangeRound([options.height-margin.top, 0]);

var color = d3.scale.ordinal()
    .range(options.color.range());

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left / 2 + "," + margin.top/ 2 + ")");

	options.data.forEach(function(d) {
		d[options.value] = parseFloat(d[options.value])
	  });

    options.data.forEach(function(d) {
		d.groups = [options.value].map(function(name) { return { value:parseFloat(d[name]),groupby:d[options.groupby]}; });
    });
    
    x.domain(options.data.map(function(d) { return d[options.groupby]; }));
    y.domain([0, d3.max(options.data, function(d) { return d[options.value]; })]);
	
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (options.height-margin.top) + ")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text");

    var stackedbar = svg.selectAll(".stackedbar")
    .data(options.data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function(d) { return "translate(" + x(d[options.groupby]) + ",0)"; });

    stackedbar.selectAll("rect")
    .data(function(d) { return d.groups; })
    .enter().append("rect")
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return y(0) - y(d.value); })
    .attr("data-title",function(d) { return d.groupby+' : '+addThousandsSeparator(d.value) })
    .attr("fill", function(d) { return color(0); })
    .attr("fill", function(d) { return d3.rgb(color(0)).darker(); });

    $("rect").tooltip({container: 'body', html: true, placement:'top'});
	
}
}	
sparkline = {
    make: function(options) {
	
    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 960
    if(options.height == undefined) options.height = 500
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.value == undefined) options.value = 'A'
    if(options.groupby == undefined) options.groupby = 'groupby'
    if(options.data == undefined) options.data = {}
	if(options.date_format == undefined) options.date_format = "%Y-%m-%d"

var margin = {top: options.height/10,left: options.width/10};

var parseDate = d3.time.format(options.date_format).parse;

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + margin.left / 2 + "," + margin.top / 2 + ")");

var x = d3.time.scale()
    .range([0, options.width-margin.left-margin.left]);

var y = d3.scale.linear()
    .range([options.height-margin.top, 0]);

var color = d3.scale.ordinal()
    .range(options.color.range());

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
	 .ticks(5);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.line_value); });

  data_values = []	
  options.data.forEach(function(d) {
 	d[options.groupby] = parseDate(d[options.groupby])
	d[options.value] = parseFloat(d[options.value])	
	  data_values.push(options.value)
	  });

  var line_data = [options.value].map(function(name) {
    return {
      values: options.data.map(function(d) {
        return {date: d[options.groupby], line_value: d[name]};
      })
    };
  });

  x.domain(d3.extent(options.data, function(d) { return d[options.groupby]; }));

  y.domain([
    d3.min(line_data, function(c) { return d3.min(c.values, function(v) { return v.line_value; }); }),
    d3.max(line_data, function(c) { return d3.max(c.values, function(v) { return v.line_value; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," +(options.height-margin.top) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  var groupby = svg.selectAll(".groupby")
      .data(line_data)
    .enter().append("g")
      .attr("class", "groupby");

  groupby.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke-width", 1.5)
	  .attr("data-title", options.value)	  
	  .style("stroke", function(d) { return color(0); })
	  .style("fill", 'None');
	 
    $("path").tooltip({container: 'body', html: true, placement:'top'});

	}
}


progress_bar = {
    make: function(options) {
	
    if(options == undefined) options = {}
    if(options.width == undefined) options.width = 200
    if(options.height == undefined) options.height = 200
    if(options.container == undefined) options.container = "body"
    if(options.color == undefined) options.color = d3.scale.category10();
    if(options.value == undefined) options.value = 50
    if(options.innerRadius == undefined) options.innerRadius = 60
    if(options.outerRadius == undefined) options.outerRadius = 80	
    if(options.data == undefined) options.data = {}

	
var margin = {top: options.height/10,left: options.width/10};

var svg = d3.select(options.container).append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 '+options.width+' '+options.height)
    .append("g")
    .attr("transform", "translate(" + options.width / 2 + "," + options.height / 2 + ")");

	
	twoPi = 2 * Math.PI;

	value =  options.value;
	fontSize = options.innerRadius/3;

	var arc = d3.svg.arc()
				.innerRadius(options.innerRadius)
				.outerRadius(options.outerRadius)
				.startAngle(0);

	var meter = svg.append("g")
					.attr('title', name + ":" + value + "%")
					.attr("class", "season-progress");

	var background = meter.append("path")
						.datum({ endAngle : twoPi })
						.style("fill", "#ddd")
						.attr("d", arc);

	var foreground = meter.append("path")
							.datum({ endAngle : 0 })
							.style("fill", options.color(value))
							.attr("class", "foreground")
							.attr("d", arc);

		foreground.transition()
					.duration(1000)
					.ease("linear")
					.attrTween("d", function(d) {
		
		var interpolate = d3.interpolate(d.endAngle, twoPi * value / 100)
				return function(t) { d.endAngle = interpolate(t); return arc(d); }
				
	});

	var text = meter.append("text")
						.attr("text-anchor", "middle")
						.attr("dy", ".35em")
						.style("fill", "rgb(99, 99, 99)")
						.attr("font-size", fontSize)
						.text(value + "%");
}

}