// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0);
		  
var y = d3.scaleLinear()
          .range([height, 0]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".par_treemap").append("svg")
                .style("width", "100%")
                .attr("data-height","0.54")
                .attr("viewBox","0 0 "+(width + margin.left + margin.right)+" "+(height + margin.top + margin.bottom))
                .attr("xmlns", 'http://www.w3.org/2000/svg')
                .attr("xlink", 'http://www.w3.org/1999/xlink')
                .attr("version", '1.1')
				.append("g")
				.attr("transform", 
					  "translate(" + margin.left + "," + margin.top + ")");

//thousand separator					  
function addThousandsSeparator(t){var a=t;if(parseFloat(t)){t=new String(t);var e=t.split(".");e[0]=e[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g,"$1,").split("").reverse().join(""),a=e.join(".")}return a}

// get the data
d3.json("data.json", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.value = +d.value;
  });

   // Scale the range of color
	var color = d3.scaleLinear()
			.domain([0, d3.max(data, function(d) { return d.value; })/2, d3.max(data, function(d) { return d.value; })])
			.range(["red", "yellow", "green"]);

			
  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.label; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.label)+(x.bandwidth()*9/20); })
      .attr("width", x.bandwidth()/10)
	  .attr("fill", function(d) { return color(d.value); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
	  .attr("data-title", function(d) { return 'year : '+d.label+'<br/>'+addThousandsSeparator(d.value)+' Runs' });
        

	    // append the rectangles for the bar chart
  svg.selectAll(".circle")
      .data(data)
    .enter().append("circle")
      .attr("class", "circle")
      .attr("cx", function(d) { return x(d.label)+(x.bandwidth()*.5); })
      .attr("r", x.bandwidth()/3.2)
	  .attr("fill", function(d) { return color(d.value); })
      .attr("cy", function(d) { return y(d.value); })
	  .attr("data-title", function(d) { return 'year : '+d.label+'<br/>'+addThousandsSeparator(d.value)+' Runs' });
        	
  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

	
    $("rect").tooltip({container: 'body', html: true, placement:'top'});   

    $("circle").tooltip({container: 'body', html: true, placement:'top'});   	
});
