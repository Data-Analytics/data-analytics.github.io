var label_width = 40;
var plot_width  = 920;
var plot_margin_right = 200;
var plot_margin_bottom = 15;
var max_width = label_width + plot_width + plot_margin_right;
var bar_height = 20;
var bolt_time  = 9.69;
var base_url = 'http://stats.espncricinfo.com/ci/engine/player/35320.html?class=2;template=results;type=allround;view=match;year=';
var data_points = [{"label":1989,"value":0,"unit":"runs"},{"label":1990,"value":239,"unit":"runs"},{"label":1991,"value":417,"unit":"runs"},{"label":1992,"value":704,"unit":"runs"},{"label":1993,"value":319,"unit":"runs"},{"label":1994,"value":1089,"unit":"runs"},{"label":1995,"value":444,"unit":"runs"},{"label":1996,"value":1611,"unit":"runs"},{"label":1997,"value":1011,"unit":"runs"},{"label":1998,"value":1894,"unit":"runs"},{"label":1999,"value":843,"unit":"runs"},{"label":2000,"value":1328,"unit":"runs"},{"label":2001,"value":904,"unit":"runs"},{"label":2002,"value":741,"unit":"runs"},{"label":2003,"value":1141,"unit":"runs"},{"label":2004,"value":812,"unit":"runs"},{"label":2005,"value":412,"unit":"runs"},{"label":2006,"value":628,"unit":"runs"},{"label":2007,"value":1425,"unit":"runs"},{"label":2008,"value":460,"unit":"runs"},{"label":2009,"value":972,"unit":"runs"},{"label":2010,"value":204,"unit":"runs"},{"label":2011,"value":513,"unit":"runs"},{"label":2012,"value":315,"unit":"runs"}];
var max_height = (data_points.length * bar_height) + plot_margin_bottom;
var total_time = 0;
var width_per_sec = 0;

    for(var i = 0; i < data_points.length; i++) {
      total_time += data_points[i].value;
    }

    width_per_sec = plot_width / total_time;

    function get_x(data, index) {
      var x = label_width;
      if (index > 0) {
          for (var j = 0; j < index; j++) {
              var time = data_points[j].value;
              x += time * width_per_sec;
          }
      }
      return x;
    }

    function get_cumulative_runs(index) {
      var runs = 0;
      for (var j = 0; j <= index; j++) {
          runs += data_points[j].value;
      }
      return runs;
    }

    //our 'canvas'
    var svg = d3.select("#viz")
        .append("svg")
        .attr("width", max_width)
        .attr("height", max_height + 10);

    //y axis
    svg.append("line")
        .attr("x1", label_width - 0.5)
        .attr("y1", 10)
        .attr("x2", label_width - 0.5)
        .attr("y2", function() { return data_points.length * bar_height + 10})
        .attr("stroke", "black");

    //x axis
    svg.append("line")
        .attr("x1", label_width - 1)
        .attr("y1", function() { return data_points.length * bar_height - 0.5 + 10 })
        .attr("x2", plot_width + label_width)
        .attr("y2", function() { return data_points.length * bar_height - 0.5 + 10})
        .attr("stroke", "black");

    
//the y-axis labels
    svg.selectAll("label")
        .data(data_points)
        .enter()
        .append("text")
        .text(function(d) { return d.label })
        .attr("x", 30)
        .attr("y", function(d, i) { return (i * bar_height) + bar_height + 10})
        .attr("dy", 0)
        .attr("class", "small")
        .attr("text-anchor", "end")
        .attr("id", function(d) { return "l_" + d.label });
    
        
    //the bars
    svg.selectAll("waterfall")
        .data(data_points)
        .enter()
        .append("rect")
        .attr("x", function(d, i) { return Math.ceil(get_x(d, i)); })
        .attr("y", function(d, i) { return i * bar_height + 10; })
        .attr("rx", bar_height/5)
        .attr("ry", bar_height/5)
        .attr("height", bar_height)
        .attr("fill", "steelblue")
        .attr("stroke", "#000")
        .attr("stroke-width", 0.5)
        .attr("width", function(d) { return Math.floor(d.value * width_per_sec); })
        .attr("class", "bar")
        .attr("value", function(d) { return d.value; })
        .attr("data-title", function(d) { return d.value+' Runs' })
        
        .each(function(d, i) {
          var x = Math.ceil(get_x(d,i));
          var y = Math.ceil(i * bar_height - bar_height / 2 + bar_height + 10) +  0.5;
          var grp = svg.append("svg:g").attr("id", "g_" + d.label).style("display", "none");


      //guides to show cumulative runs on x-axis
      var x1 = x + Math.ceil(d.value * width_per_sec);
      var y2 = data_points.length * bar_height + 10;
      grp.append("line")
          .attr("x1", x1 - 0.5)
          .attr("y1", y + Math.floor(bar_height/2) - 0.5)
          .attr("x2", x1 - 0.5)
          .attr("y2", y2)
          .attr("stroke", "#000")
          .attr("stroke-width", 1);

      grp.append("circle")
          .attr("cx", x1)
          .attr("cy", y2 - 0.5)
          .attr("r", 3)
          .attr("stroke", "#000")
          .attr("stroke-width", 1);

      grp.append("text")
          .text(get_cumulative_runs(i) + " " + d.unit)
          .attr("x", x1)
          .attr("y", y2 + 12)
          .attr("text-anchor", "middle")
          .attr("class", "small")
    })
    .on("mouseover", function(d) {
      
      //show the guide
      svg.select("#g_" + d.label).style("display", "");
    })
    .on("mouseout", function(d) {
      //undo underline and bold
      
      //hide the guide
      svg.select("#g_" + d.label).style("display", "none");
    })
    .on("click", function(d) {
      var url = base_url + d.label;
      window.open(url);
    });

    $("rect").tooltip({container: 'body', html: true, placement:'top'});   


