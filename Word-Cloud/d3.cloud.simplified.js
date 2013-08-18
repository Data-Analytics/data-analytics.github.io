cloud = {
    make: function(options) {
        
        if(options == undefined) options = {}
        if(options.width == undefined) options.width = 300
        if(options.height == undefined) options.height = 300
        if(options.font == undefined) options.font = "Arial"
        if(options.container == undefined) options.container = "body"
        if(options.words == undefined) options.words = [{text: "This", size: 40}, {text: "is", size: 40}, {text: "an", size: 40}, {text: "Example", size: 40}]
    
        var fill = d3.scale.category20();
  
        d3.layout.cloud().size([options.width, options.height])
        .words(options.words)
        .rotate(function(d) { return ~~(Math.random() *  2) * 90; })
        .font(options.font)
        .fontSize(function(d) { return d.size; })
        .on("end", function(words) {
            d3.select(options.container).append("svg")
            .attr("width", options.width)
            .attr("height", options.height)
            .append("g")
            .attr("transform", "translate(" + (options.width/2) + "," + (options.height/2) + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", options.font)
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
        })
        .start();
    }
}

