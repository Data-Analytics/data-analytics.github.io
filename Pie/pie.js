
nv.addGraph(function() {
  var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true);

    d3.select("#chart")
        .append('svg')
        .attr("width","400")
        .attr("height","500")
        .datum(exampleData())
        .transition().duration(350)
        .call(chart);

  return chart;
});

nv.addGraph(function() {
  var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true)     
      .labelThreshold(.05) 
      .labelType("percent") 
      .donut(true)          
      .donutRatio(0.35)     
      ;

    d3.select("#chart2")
        .append('svg')
        .attr("width","400")
        .attr("height","500")
        .datum(exampleData())
        .transition().duration(350)
        .call(chart);

  return chart;
});


function exampleData() {
  return  [
      { 
        "label": "One",
        "value" : 29.765957771107
      } , 
      { 
        "label": "Two",
        "value" : 0
      } , 
      { 
        "label": "Three",
        "value" : 32.807804682612
      } , 
      { 
        "label": "Four",
        "value" : 196.45946739256
      } , 
      { 
        "label": "Five",
        "value" : 0.19434030906893
      } , 
      { 
        "label": "Six",
        "value" : 98.079782601442
      } , 
      { 
        "label": "Seven",
        "value" : 13.925743130903
      } , 
      { 
        "label": "Eight",
        "value" : 5.1387322875705
      }
    ];
}


