d3.json("linePlusBarData.json",function(error,data) {
  nv.addGraph(function() {
      var chart = nv.models.linePlusBarChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
            .x(function(d,i) { return i })
            .y(function(d,i) {return d[1] })
            ;

      chart.xAxis.tickFormat(function(d) {
        var dx = data[0].values[d] && data[0].values[d][0] || 0;
        return d3.time.format('%x')(new Date(dx))
      });

      chart.y1Axis
          .tickFormat(d3.format(',f'));

      chart.y2Axis
          .tickFormat(function(d) { return '$' + d3.format(',f')(d) });

      chart.bars.forceY([0]);

  d3.select('#chart')
      .append('svg')
      .attr('width','960px')
      .attr('height','500px')
        .datum(data)
        .transition()
        .duration(0)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
  });

});


