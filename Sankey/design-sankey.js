    var margin = {top: 5, right: 5, bottom: 6, left: 5},
        width = 960 - margin.left - margin.right,
        height = 560 - margin.top - margin.bottom;

    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var sankey = d3.sankey()
        .nodeWidth(20)
        .nodePadding(10)
        .size([width, height]);


    var path = sankey.link();

    d3.csv("nodes.csv", function(nodes) {

        d3.csv("mappings.csv", function(mappings) {

            mappings.forEach(function(mapping){
                mapping.source = + mapping.source;
                mapping.target = + mapping.target;
            });

            sankey
                .nodes(nodes)
                .links(mappings)
                .layout(10);

            var link = svg.append("g")
                .selectAll(".link")
                .data(mappings)
                .enter().append("path")
                .attr("class", "link")
                .attr("d", path)
                .style("stroke-width", function(d) { return Math.max(1, d.dy); })
                .style("stroke", "#099990")
                .sort(function(a, b) { return a.dy - b.dy; });

            link.append("title").text(function(d) {return d.source.name + " -> " + d.target.name; });

            var node = svg.append("g").selectAll(".node")
                .data(nodes)
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                .call(d3.behavior.drag()
                    .origin(function(d) { return d; })
                    .on("dragstart", function() { this.parentNode.appendChild(this); })
                    .on("drag", dragmove));

            node.append("rect")
                .attr("height", function(d) { return d.dy;})
                .attr("width", sankey.nodeWidth())
                .style("fill", "444444") 
                .style("stroke", "#000000")
                .style("stroke-width", "2.5")
                .append("title")
                .text(function(d) { return nodeText(d); });

            // Percentage complete
            node.append("rect")
                .attr("height", function(d){ return completedHeight(d)-2.5; })
                .attr("width", sankey.nodeWidth()-2.5)
                .attr("y", function(d){ return d.dy - completedHeight(d)+1.25;})
                .attr("x", 1.25)
                .attr("fill", function(d){ return nodeGradient(d); })
                .append("title")
                .text(function(d) { return nodeText(d); });
            
            node.append("text")
                    .text(function(d){ return d.complete ?  d.complete + "%" : "";})
                    .style("font-size", "8px")
                    .style("fill", "#ffffff")
                    .attr("x", 0)
                    .attr("y", function(d){ 
                        var y = d.dy - completedHeight(d) + 10; 
                        return y < d.dy ? y : d.dy;
                    });

            node.append("text")
                .attr("x", -6)
                .attr("y", function(d) { return d.dy / 2; })
                .attr("dy", ".35em")
                .attr("text-anchor", "end")
                .attr("transform", null)
                .text(function(d) { return d.name; })
                .filter(function(d) { return d.x < width / 2; })
                .attr("x", 6 + sankey.nodeWidth())
                .attr("text-anchor", "start");

            function dragmove(d) {
                d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
                sankey.relayout();
                link.attr("d", path);
            }
        });
    });

    var completedHeight = function(node){
        if(!node || !node.complete)
            return 0;

        return (node.dy * node.complete) / 100;
    };

    var nodeGradient = function(node){
        if(!node || !node.failingTests)
            return d3.rgb("green");

        var red = (255 * node.failingTests)/100;
        var green = (255 * (100 - node.failingTests)) / 100;

        return d3.rgb(red, green, 0);
    };

    var nodeText = function(node){
        var completed = node.complete ? node.complete : 0;
        var failingTests = node.failingTests ? node.failingTests : 0;
        var text = node.name + "\nCompleted: " + completed + "% \nFailing Tests: " + failingTests + "%";
        if(node.estimate){
            text += "\nEstimate: " + node.estimate + "d";
        }

        return text;
    };