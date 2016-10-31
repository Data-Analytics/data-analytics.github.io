function scatter_charts(data,width_value){

    var margin = {top: 30, right: 20, bottom: 20, left: 40},
        width = width_value - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom,
        x = d3.scale.linear().range([0, width]),
        y = d3.scale.linear().range([height - 60, 0]),
        //colors that will reflect geographical regions
        color = d3.scale.category10();
        
    var svg = d3.select("#chart").append("svg")
                    .attr("width", "100%")
                    .attr("data-height","0.54")
                    .attr("viewBox","0 0 "+(width + margin.left + margin.right)+" "+(height + margin.top + margin.bottom))
                    .attr("xmlns", 'http://www.w3.org/2000/svg')
                    .attr("xlink", 'http://www.w3.org/1999/xlink')
                    .attr("version", '1.1');

    // set axes, as well as details on their ticks
    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(10)
        .tickSubdivide(true)
        .tickSize(6, 3, 0)
        .orient("bottom")
        .tickFormat(d3.format("2s"));
        
    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(10)
        .tickSubdivide(true)
        .tickSize(6, 3, 0)
        .orient("left")
        .tickFormat(d3.format("2s"));
        
    // group that will contain all of the plots
    var groups = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // array of the regions, used for the legend
    var regions = ["Unknown", "Male", "Female"]
    
  
    data.forEach(function(o) {    
          o.cats = parseInt(o.cats);
          o.horses = parseInt(o.horses);
    });

    // sort data alphabetically by region, so that the colors match with legend
    data.sort(function(a, b) { return d3.ascending(a.gender, b.gender); })
    
    function addThousandsSeparator(t){var a=t;if(parseFloat(t)){t=new String(t);var e=t.split(".");e[0]=e[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g,"$1,").split("").reverse().join(""),a=e.join(".")}return a}

    var x0 = Math.max(-d3.min(data, function(d) { return d.cats; }), d3.max(data, function(d) { return d.cats; }));
    
    x.domain([0,d3.max(data, function(d) { return d.cats; })*1.02 ]);
    y.domain([0,d3.max(data, function(d) { return d.horses; })*1.02 ])
    
    // style the circles, set their locations based on data
    var circles =
    groups.selectAll("circle")
        .data(data)
      .enter()
      .append("circle")
      .attr("class", "circles")
      .attr({
        cx: function(d) { return x(+d.cats); },
        cy: function(d) { return y(+d.horses); },
        r: 8,
        id: function(d) { return d.gender; }
      })
        .attr("data-title", function(d) { return 'Gender : '+d.gender+'<br/> Ethnicity : '+d.ethnicity+'<br/> Cats : '+addThousandsSeparator(d.cats)+'</br> Horses : '+addThousandsSeparator(d.horses) })
        .style("fill", function(d) { return color(d.gender); })
        .style("stroke", function(d) { return d3.rgb(color(d.gender)).darker(); });
        
    // the legend color guide
    var legend = svg.selectAll("rect")
            .data(regions)
        .enter()
        .append("rect")
        .attr({
          x: function(d, i) { return (40 + i*125); },
          y: height,
          width: 20,
          height: 10,
          rx:2
        })
        .style("fill", function(d) { return color(d); })
        .style("stroke", function(d) { return d3.rgb(color(d)).darker(); });
    
    
    // legend labels    
        svg.selectAll("text")
            .data(regions)
        .enter().append("text")
        .attr({
        x: function(d, i) { return (65 + i*125); },
        y: height + 10,
        })
        .text(function(d) { return d; });
    
      $("circle").tooltip({container: 'body', html: true, placement:'top'});  
    // draw axes and axis labels
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height - 60 + margin.top) + ")")
        .call(xAxis);
    
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis);
        
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width + 50)
        .attr("y", height - margin.top - 5)
        .text("Cats");
        
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -20)
        .attr("y", 45)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Horses");
        
    var mouseOn = function() { 
    var circle = d3.select(this);
       circle.transition()
        .duration(800).attr("r", 16).ease("elastic");


        // append lines to bubbles that will be used to show the precise data points.
        // translate their location based on margins
        groups.append("g")
            .attr("class", "guide")

        .append("line")
            .attr('stroke-width','1')
            .attr("x1", circle.attr("cx"))
            .attr("x2", circle.attr("cx"))
            .attr("y1", circle.attr("cy"))
            .attr("y2", height - margin.bottom - margin.top - 10 )
            .style("stroke", circle.style("fill"))
            .transition().delay(200).duration(400).styleTween("opacity", 
                        function() { return d3.interpolate(0, 1); })

        groups.append("g")
            .attr("class", "guide")
        .append("line")
            .attr('stroke-width','1')
            .attr("x1", circle.attr("cx"))
            .attr("x2", 0)
            .attr("y1", circle.attr("cy"))
            .attr("y2", circle.attr("cy"))
            .style("stroke", circle.style("fill"))
            .transition().delay(200).duration(400).styleTween("opacity", 
                        function() { return d3.interpolate(0, 1); });

        d3.selection.prototype.moveToFront = function() { 
          return this.each(function() { 
            this.parentNode.appendChild(this); }); 
        };

        if (!$.browser.msie) {circle.moveToFront();}
    };
    
  var mouseOff = function() {
   var circle = d3.select(this);
    circle.transition()
     .duration(800).attr("r", 8).ease("elastic");    
     

        // fade out guide lines, then remove them
        d3.selectAll(".guide").transition().duration(100).styleTween("opacity", 
                        function() { return d3.interpolate(1, 0); })
            .remove()


    };

    circles.on("mouseover", mouseOn);
    circles.on("mouseout", mouseOff);
}


function scatter_sub_charts(data,width_value,animal){

    var margin = {top: 30, right: 20, bottom: 20, left: 40},
        width = width_value - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom,
        x = d3.scale.linear().range([0, width]),
        y = d3.scale.linear().range([height - 60, 0]),
        //colors that will reflect geographical regions
        color = d3.scale.category10();

    var svg = d3.select("#"+animal+"_chart").append("svg")
                    .attr("width", "100%")
                    .attr("data-height","0.54")
                    .attr("viewBox","0 0 "+(width + margin.left + margin.right)+" "+(height + margin.top + margin.bottom))
                    .attr("xmlns", 'http://www.w3.org/2000/svg')
                    .attr("xlink", 'http://www.w3.org/1999/xlink')
                    .attr("version", '1.1');

    // set axes, as well as details on their ticks
    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(10)
        .tickSubdivide(true)
        .tickSize(6, 3, 0)
        .orient("bottom")
        .tickFormat(d3.format("2s"));
        
    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(10)
        .tickSubdivide(true)
        .tickSize(6, 3, 0)
        .orient("left")
        .tickFormat(d3.format("2s"));
        
    // group that will contain all of the plots
    var groups = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // array of the regions, used for the legend
    var regions = ["Unknown", "Male", "Female"]
    
  
    data.forEach(function(o) {    
          o[animal] = parseInt(o[animal]);
          o.cats = parseInt(o.cats);
    });

    // sort data alphabetically by region, so that the colors match with legend
    data.sort(function(a, b) { return d3.ascending(a.gender, b.gender); })
    
    function addThousandsSeparator(t){var a=t;if(parseFloat(t)){t=new String(t);var e=t.split(".");e[0]=e[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g,"$1,").split("").reverse().join(""),a=e.join(".")}return a}

    var x0 = Math.max(-d3.min(data, function(d) { return d[animal]; }), d3.max(data, function(d) { return d[animal]; }));
    x.domain([0,d3.max(data, function(d) { return d[animal]; })*1.02 ]);
    y.domain([0,d3.max(data, function(d) { return d.cats; })*1.02 ])
    
    // style the circles, set their locations based on data
    var circles =
    groups.selectAll("circle")
        .data(data)
      .enter()
      .append("circle")
      .attr("class", "circles")
      .attr({
        cx: function(d) { return x(+d[animal]); },
        cy: function(d) { return y(+d.cats); },
        r: 8,
        id: function(d) { return d.gender; }
      })
        .attr("data-title", function(d) { return 'Gender : '+d.gender+'<br/> Ethnicity : '+d.ethnicity+'<br/> '+animal+' : '+addThousandsSeparator(d[animal])+'</br> cats : '+addThousandsSeparator(d.cats) })
        .style("fill", function(d) { return color(d.gender); })
        .style("stroke", function(d) { return d3.rgb(color(d.gender)).darker(); });
        
    // the legend color guide
    var legend = svg.selectAll("rect")
            .data(regions)
        .enter()
        .append("rect")
        .attr({
          x: function(d, i) { return (40 + i*125); },
          y: height,
          width: 20,
          height: 10,
          rx:2
        })
        .style("fill", function(d) { return color(d); })
        .style("stroke", function(d) { return d3.rgb(color(d)).darker(); });
    
    
    // legend labels    
        svg.selectAll("text")
            .data(regions)
        .enter().append("text")
        .attr({
        x: function(d, i) { return (65 + i*125); },
        y: height + 10,
        })
        .text(function(d) { return d; });
    
      $("circle").tooltip({container: 'body', html: true, placement:'top'});  
    // draw axes and axis labels
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height - 60 + margin.top) + ")")
        .call(xAxis);
    
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis);
        
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width + 50)
        .attr("y", height - margin.top - 5)
        .text(animal);
        
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -20)
        .attr("y", 45)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Cats");
        
    var mouseOn = function() { 
    var circle = d3.select(this);
       circle.transition()
        .duration(800).attr("r", 16).ease("elastic");
        // append lines to bubbles that will be used to show the precise data points.
        // translate their location based on margins
        groups.append("g")
            .attr("class", "guide")

        .append("line")
            .attr('stroke-width','1')
            .attr("x1", circle.attr("cx"))
            .attr("x2", circle.attr("cx"))
            .attr("y1", circle.attr("cy"))
            .attr("y2", height - margin.bottom - margin.top - 10 )
            .style("stroke", circle.style("fill"))
            .transition().delay(200).duration(400).styleTween("opacity", 
                        function() { return d3.interpolate(0, 1); })

        groups.append("g")
            .attr("class", "guide")
        .append("line")
            .attr('stroke-width','1')
            .attr("x1", circle.attr("cx"))
            .attr("x2", 0)
            .attr("y1", circle.attr("cy"))
            .attr("y2", circle.attr("cy"))
            .style("stroke", circle.style("fill"))
            .transition().delay(200).duration(400).styleTween("opacity", 
                        function() { return d3.interpolate(0, 1); });

        d3.selection.prototype.moveToFront = function() { 
          return this.each(function() { 
            this.parentNode.appendChild(this); }); 
        };

        if (!$.browser.msie) {circle.moveToFront();}
    };
    
  var mouseOff = function() {
   var circle = d3.select(this);
    circle.transition()
     .duration(800).attr("r", 8).ease("elastic");    
        // fade out guide lines, then remove them
        d3.selectAll(".guide").transition().duration(100).styleTween("opacity", 
                        function() { return d3.interpolate(1, 0); })
            .remove()
    };

    circles.on("mouseover", mouseOn);
    circles.on("mouseout", mouseOff);
}

function merge_charts(data,width_value){

    var margin = {top: 30, right: 0, bottom: 20, left: 40},
        width = width_value - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom,
        x = d3.scale.linear().range([0, width/2]),
        sub_x = d3.scale.linear().range([width/2, width]),
        y = d3.scale.linear().range([height - 60, 0]),
        //colors that will reflect geographical regions
        color = d3.scale.category10();

    var svg = d3.select("#chart_combined").append("svg")
                    .attr("width", "100%")
                    .attr("data-height","0.54")
                    .attr("viewBox","0 0 "+(width + margin.left + margin.right)+" "+(height + margin.top + margin.bottom))
                    .attr("xmlns", 'http://www.w3.org/2000/svg')
                    .attr("xlink", 'http://www.w3.org/1999/xlink')
                    .attr("version", '1.1');

    // set axes, as well as details on their ticks
    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(10)
        .tickSubdivide(true)
        .tickSize(6, 3, 0)
        .orient("bottom")
        .tickFormat(d3.format("2s"));

    var sub_xAxis = d3.svg.axis()
        .scale(sub_x)
        .ticks(10)
        .tickSubdivide(true)
        .tickSize(6, 3, 0)
        .orient("bottom")
        .tickFormat(d3.format("2s"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(10)
        .tickSubdivide(true)
        .tickSize(6, 3, 0)
        .orient("left")
        .tickFormat(d3.format("2s"));
  

    var yAxis_sub = d3.svg.axis()
        .scale(y)
        .ticks(0)
        .orient("left")
        .tickSubdivide(true)
        .tickFormat(d3.format("2s"));  

    // group that will contain all of the plots
    var groups = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
    var sub_groups = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
    // array of the regions, used for the legend
    var regions = ["Unknown", "Male", "Female"]
  
    data.forEach(function(o) {    
          o.elephants = parseInt(o.elephants);
          o.horses = parseInt(o.horses);
          o.cats = parseInt(o.cats);
    });

    // sort data alphabetically by region, so that the colors match with legend
    data.sort(function(a, b) { return d3.ascending(a.gender, b.gender); })
    
    function addThousandsSeparator(t){var a=t;if(parseFloat(t)){t=new String(t);var e=t.split(".");e[0]=e[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g,"$1,").split("").reverse().join(""),a=e.join(".")}return a}

    var x0 = Math.max(-d3.min(data, function(d) { return d.horses; }), d3.max(data, function(d) { return d.horses; }));
    x.domain([0,d3.max(data, function(d) { return d.horses; })*1.02 ]);
    y.domain([0,d3.max(data, function(d) { return d.cats; })*1.02 ])


    var sub_x0 = Math.max(-d3.min(data, function(d) { return d.elephants; }), d3.max(data, function(d) { return d.elephants; }));
    sub_x.domain([0,d3.max(data, function(d) { return d.elephants; })*1.02 ]);

    // style the circles, set their locations based on data
    var circles =
    groups.selectAll("circle")
        .data(data)
      .enter()
      .append("circle")
      .attr("class", "circles")
      .attr({
        cx: function(d) { return x(+d.horses); },
        cy: function(d) { return y(+d.cats); },
        r: 8,
        id: function(d) { return d.gender; }
      })
        .attr("data-title", function(d) { return 'Gender : '+d.gender+'<br/> Ethnicity : '+d.ethnicity+'<br/> horses : '+addThousandsSeparator(d.horses)+'</br> cats : '+addThousandsSeparator(d.cats) })
        .style("fill", function(d) { return color(d.gender); })
        .style("stroke", function(d) { return d3.rgb(color(d.gender)).darker(); });

    // style the circles, set their locations based on data
    var sub_circles =
    sub_groups.selectAll("circle")
        .data(data)
      .enter()
      .append("circle")
      .attr("class", "circles")
      .attr({
        cx: function(d) { return sub_x(+d.elephants); },
        cy: function(d) { return y(+d.cats); },
        r: 8,
        id: function(d) { return d.gender; }
      })
        .attr("data-title", function(d) { return 'Gender : '+d.gender+'<br/> Ethnicity : '+d.ethnicity+'<br/> elephants : '+addThousandsSeparator(d.elephants)+'</br> cats : '+addThousandsSeparator(d.cats) })
        .style("fill", function(d) { return color(d.gender); })
        .style("stroke", function(d) { return d3.rgb(color(d.gender)).darker(); });
        
    // the legend color guide
    var legend = svg.selectAll("rect")
            .data(regions)
        .enter()
        .append("rect")
        .attr({
          x: function(d, i) { return (40 + i*125); },
          y: height,
          width: 20,
          height: 10,
          rx:2
        })
        .style("fill", function(d) { return color(d); })
        .style("stroke", function(d) { return d3.rgb(color(d)).darker(); });
    
    // legend labels    
        svg.selectAll("text")
            .data(regions)
        .enter().append("text")
        .attr({
        x: function(d, i) { return (65 + i*125); },
        y: height + 10,
        })
        .text(function(d) { return d; });
    
      $("circle").tooltip({container: 'body', html: true, placement:'top'});  
    // draw axes and axis labels
 
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis);
            

    svg.append("g")
        .attr("class", "y axis sub")
        .attr("transform", "translate(" + (margin.left+(width/2))  + "," + margin.top + ")")
        .call(yAxis_sub);
                
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -20)
        .attr("y", 45)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Cats");
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height - 60 + margin.top) + ")")
        .call(xAxis);
    
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", (width/2) + 30)
        .attr("y", height - margin.top - 5)
        .text('horses');

    svg.append("g")
        .attr("class", "x axis sub")
        .attr("transform", "translate(" + margin.left + "," + (height - 60 + margin.top) + ")")
        .call(sub_xAxis);

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width + 30)
        .attr("y", height - margin.top - 5)
        .text('elephants');

    var mouseOn = function() { 
    var circle = d3.select(this);
       circle.transition()
        .duration(800).attr("r", 16).ease("elastic");
        // append lines to bubbles that will be used to show the precise data points.
        // translate their location based on margins
        groups.append("g")
            .attr("class", "guide")

        .append("line")
            .attr('stroke-width','1')
            .attr("x1", circle.attr("cx"))
            .attr("x2", circle.attr("cx"))
            .attr("y1", circle.attr("cy"))
            .attr("y2", height - margin.bottom - margin.top - 10 )
            .style("stroke", circle.style("fill"))
            .transition().delay(200).duration(400).styleTween("opacity", 
                        function() { return d3.interpolate(0, 1); })

        groups.append("g")
            .attr("class", "guide")
        .append("line")
            .attr('stroke-width','1')
            .attr("x1", circle.attr("cx"))
            .attr("x2", 0)
            .attr("y1", circle.attr("cy"))
            .attr("y2", circle.attr("cy"))
            .style("stroke", circle.style("fill"))
            .transition().delay(200).duration(400).styleTween("opacity", 
                        function() { return d3.interpolate(0, 1); });

        d3.selection.prototype.moveToFront = function() { 
          return this.each(function() { 
            this.parentNode.appendChild(this); }); 
        };

        if (!$.browser.msie) {circle.moveToFront();}
    };
    
  var mouseOff = function() {
   var circle = d3.select(this);
    circle.transition()
     .duration(800).attr("r", 8).ease("elastic");    
        // fade out guide lines, then remove them
        d3.selectAll(".guide").transition().duration(100).styleTween("opacity", 
                        function() { return d3.interpolate(1, 0); })
            .remove()
    };


    var sub_mouseOn = function() { 
    var circle = d3.select(this);
       circle.transition()
        .duration(800).attr("r", 16).ease("elastic");
        // append lines to bubbles that will be used to show the precise data points.
        // translate their location based on margins
        sub_groups.append("g")
            .attr("class", "guide")

        .append("line")
            .attr('stroke-width','1')
            .attr("x1", circle.attr("cx"))
            .attr("x2", circle.attr("cx"))
            .attr("y1", circle.attr("cy"))
            .attr("y2", height - margin.bottom - margin.top - 10 )
            .style("stroke", circle.style("fill"))
            .transition().delay(200).duration(400).styleTween("opacity", 
                        function() { return d3.interpolate(0, 1); })

        sub_groups.append("g")
            .attr("class", "guide")
        .append("line")
            .attr('stroke-width','1')
            .attr("x1", circle.attr("cx"))
            .attr("x2", 0)
            .attr("y1", circle.attr("cy"))
            .attr("y2", circle.attr("cy"))
            .style("stroke", circle.style("fill"))
            .transition().delay(200).duration(400).styleTween("opacity", 
                        function() { return d3.interpolate(0, 1); });

        d3.selection.prototype.moveToFront = function() { 
          return this.each(function() { 
            this.parentNode.appendChild(this); }); 
        };

        if (!$.browser.msie) {circle.moveToFront();}
    };
    

    circles.on("mouseover", mouseOn);
    circles.on("mouseout", mouseOff);

    sub_circles.on("mouseover", sub_mouseOn);
    sub_circles.on("mouseout", mouseOff);
}

// bring in the data and control data-driven activities
d3.csv("dataset.csv", function(data) {
        scatter_charts(data,960)
        scatter_sub_charts(data,480,'horses')
        scatter_sub_charts(data,480,'elephants') 
        merge_charts(data,960)     
    });
