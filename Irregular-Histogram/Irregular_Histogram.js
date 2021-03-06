var margin = {top: 10, right: 20, bottom: 20, left: 60},
    width = 680 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;
    
function onRender() {

    var x = d3.scale.linear()
    .range([0, width]);

    var y = d3.scale.linear()
    .range([height, 0]);
    
    d3.select("svg")
       .remove();
           
    var svg = d3.select("#histogram").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    txt_value = document.getElementById('input_data').value;
    bins = d3.csv.parse(txt_value);
    
  // Coerce types.
  bins.forEach(function(bin) {
    bin.Income = +bin.Income;
    bin.People = +bin.People;
  });

  // Normalize each bin to so that height = quantity/width;
  // see http://en.wikipedia.org/wiki/Histogram#Examples
  for (var i = 1, n = bins.length, bin; i < n; i++) {
    bin = bins[i];
    bin.offset = bins[i - 1].Income;
    bin.width = bin.Income - bin.offset;
    bin.height = bin.People / bin.width;
  }

  // Drop the first bin, since it's incorporated into the next.
  bins.shift();

  // Set the scale domain.
  x.domain([0, d3.max(bins.map(function(d) { return d.offset + d.width; }))]);
  y.domain([0, d3.max(bins.map(function(d) { return d.height; }))]);

  // Add the bins.
  svg.selectAll(".bin")
      .data(bins)
    .enter().append("rect")
      .attr("class", "bin")
      .attr("x", function(d) { return x(d.offset); })
      .attr("rx", 5)
      .attr("width", function(d) { return x(d.width) - 1; })
      .attr("y", function(d) { return y(d.height); })
      .attr("height", function(d) { return height - y(d.height); })
      .attr('data-title',function(d) {return 'Income : '+d.Income+' ,People: '+d.People });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.svg.axis()
      .scale(x)
      .orient("bottom"));

  svg.append("g")
      .attr("class", "y axis")
      .call(d3.svg.axis()
      .scale(y)
      .orient("left"));
      
   $("rect").tooltip({container: 'body', html: true, placement:'right'});    
   
};