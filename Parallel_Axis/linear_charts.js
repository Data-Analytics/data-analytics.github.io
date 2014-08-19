var linear_charts = {};
linear_charts.linearRangeQuery = function (options) {

    //----------------------------------------------------------------------------------------
    //1. This is the method that executes the various JS functions in the proper sequence to generate the chart
    //----------------------------------------------------------------------------------------
    this.execute = function () {
        //1.1 Assign Global variable var that to access function and variable throughout   
        var that = this;

        //1.2 set width height to local variable   
        width = this.options.width;
        height = this.options.height;
        that.nonchartColumns = this.options.nonchartColumns;
        that.imageColumns = this.options.imageColumns;
        that.linkColumns = this.options.linkColumns;
        that.source_name = this.options.sourceName;
        that.source_link = this.options.sourceLink;
        

        // 1.3 Read Json File Get all the data and pass to render
       d3.csv(options.data, function (e, data) {
            that.data = data;
            that.render();
            that.renderTooltip();

        }); 
    };
	
	
    //----------------------------------------------------------------------------------------
    //2. setting up options
    //----------------------------------------------------------------------------------------
    this.options = jQuery.extend({
        width: 550,
        height: 400
    }, options);

 //----------------------------------------------------------------------------------------
    //3. Render chart
    //----------------------------------------------------------------------------------------
    this.render = function () {
        var that = this;


// shim layer with setTimeout fallback
window.requestAnimFrame = window.requestAnimationFrame       ||
                          window.webkitRequestAnimationFrame ||
                          window.mozRequestAnimationFrame    ||
                          window.oRequestAnimationFrame      ||
                          window.msRequestAnimationFrame     ||
                          function( callback ){
                            window.setTimeout(callback, 1000 / 60);
                          };

var m = [60, 10, 20, 0],
    w = 860 - m[1] - m[3],
    h = 290 - m[0] - m[2];

var xscale = d3.scale.ordinal().rangePoints([0, w], 1),
    yscale = {};

var line = d3.svg.line(),
    axis = d3.svg.axis().orient("left"),
    foreground,
    dimensions,
    brush_count = 0;

var colors = {
  "year": [28,100,52],
  "Below 18 Years": [214,55,79],
  "Between 18-30 Years": [185,56,73],
  "Between 30-45 Years": [30,100,73],
  "Between 45-60 Years": [359,69,49],
  "Above 60 Years": [110,57,70],
  "Total": [120,56,40]
  
};

d3.select("#chart").attr("class","linear-range-query")
    .style("width", (w + m[1] + m[3]) + "px")
    .style("height", (h + m[0] + m[2]) + "px");

d3.selectAll("canvas").attr("class","linear-range-query")
    .attr("width", w)
    .attr("height", h)
    .style("padding", m.join("px ") + "px");

d3.select("#hide-ticks")
    .on("click", function() {
      d3.selectAll(".axis g").style("display", "none");
      d3.selectAll(".axis path").style("display", "none");
    });

d3.select("#show-ticks")
    .on("click", function() {
      d3.selectAll(".axis g").style("display", "block");
      d3.selectAll(".axis path").style("display", "block");
    });

d3.select("#dark-theme")
    .on("click", function() {
      d3.select("body").attr("class", "dark");
    });

d3.select("#light-theme")
    .on("click", function() {
      d3.select("body").attr("class", null);
    });

foreground = document.getElementById('foreground').getContext('2d');

foreground.strokeStyle = "rgba(0,100,160,0.1)";
foreground.lineWidth = 1.3;    // avoid weird subpixel effects

foreground.fillText("Loading...",w/2,h/2);

var svg = d3.select("svg").attr("class","linear-range-query")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
  .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");


d3.csv(options.data, function(data) {

  // Convert quantitative scales to floats
  data = data.map(function(d) {
    for (var k in d) {
      if (_.contains(that.nonchartColumns,k)===false && _.contains(that.imageColumns,k)===false && _.contains(that.linkColumns,k)===false)
        d[k] = parseFloat(d[k]) || 0;
    }
    return d;
  });

  // Extract the list of dimensions and create a scale for each.
  xscale.domain(dimensions = d3.keys(data[0]).filter(function(d) {
    return _.contains(that.nonchartColumns,d)===false && _.contains(that.imageColumns,d)===false && _.contains(that.linkColumns,d)===false &&(yscale[d] = d3.scale.linear()
        .domain(d3.extent(data, function(p) { return +p[d]; }))
        .range([h, 0]));
  }));

  // Render full foreground
  paths(data, foreground, brush_count);

  // Add a group element for each dimension.
  var g = svg.selectAll(".dimension")
      .data(dimensions)
    .enter().append("svg:g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + xscale(d) + ")"; });

  // Add an axis and title.
  g.append("svg:g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(yscale[d])); })
    .append("svg:text")
      .attr("text-anchor", "left")
      .attr("y", -8)
      .attr("x", -4)
      .attr("transform", "rotate(-19)")
      .attr("class", "label")
      .text(String);

  // Add and store a brush for each axis.
  g.append("svg:g")
      .attr("class", "brush")
      .each(function(d) { d3.select(this).call(yscale[d].brush = d3.svg.brush().y(yscale[d]).on("brush", brush)); })
    .selectAll("rect")
      .attr("x", -16)
      .attr("width", 32)
      .attr("rx", 3)
      .attr("ry", 3);

  // Handles a brush event, toggling the display of foreground lines.
  function brush() {
    brush_count++;
    var actives = dimensions.filter(function(p) { return !yscale[p].brush.empty(); }),
        extents = actives.map(function(p) { return yscale[p].brush.extent(); });

    // Get lines within extents
    var selected = [];
    data.map(function(d) {
      return actives.every(function(p, i) {
        return extents[i][0] <= d[p] && d[p] <= extents[i][1];
      }) ? selected.push(d) : null;
    });

    // Render selected lines
    paths(selected, foreground, brush_count);
  }

  function paths(data, ctx, count) {
    var n = data.length,
        i = 0,
        opacity = d3.min([2/Math.pow(n,0.37),1]);
    d3.select("#selected-count").text(n);
    d3.select("#opacity").text((""+opacity).slice(0,6));

    data = shuffle(data);

    // Create table
    d3.select("table").remove();
      // the columns you'd like to display
      var columns = _.keys(data[0]);

      var table = d3.select("#wrap-table").append("table").attr("class","table table-striped table-hover"),
          thead = table.append("thead"),
          tbody = table.append("tbody");

      // append the header row
      thead.append("tr")
          .selectAll("th")
          .data(columns)
          .enter()
          .append("th")
              .text(function(column) { return column; });

      // create a row for each object in the data
      var rows = tbody.selectAll("tr")
          .data(data)
          .enter()
          .append("tr");

      // create a cell in each row for each column
      var cells = rows.selectAll("td")
          .data(function(row) {
              return columns.map(function(column) {
                  return {column: column, value: row[column]};
              });
          })
          .enter()
          .append("td")
              .html(function(d) { 
                  if(_.contains(that.imageColumns,d.column)===true){
                      return "<svg width='25' height='25'><circle cx='12.5' cy='12.5' r='8' stroke='"+d3.rgb(d.value).darker()+"' stroke-width='0.5' fill='"+d.value+"'/></svg> ";
                  }else{
                      return d.value;
                  }
              });
    //Table Created

    ctx.clearRect(0,0,w+1,h+1);
    function render() {
      var max = d3.min([i+12, n]);
      data.slice(i,max).forEach(function(d) {
        path(d, foreground, color(d.group,opacity));
      });
      i = max;
      d3.select("#rendered-count").text(i);
    }

    // render all lines until finished or a new brush event
    (function animloop(){
      if (i >= n || count < brush_count) return;
      requestAnimFrame(animloop);
      render();
    })();
  }


});


function path(d, ctx, color) {
  if (color) ctx.strokeStyle = color;
  ctx.beginPath();
  var x0 = 0,
      y0 = 0;
  dimensions.map(function(p,i) {
    var x = xscale(p),
        y = yscale[p](d[p]);
    if (i === 0) {
      ctx.moveTo(x,y);
    } else { 
      var cp1x = x - 0.85*(x-x0);
      var cp1y = y0;
      var cp2x = x - 0.15*(x-x0);
      var cp2y = y;
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    x0 = x;
    y0 = y;
  });
  ctx.stroke();
}
function color(d,a) {
  var c = colors[d];
  //return "red";
  //return ["hsla(",c[0],",",c[1],"%,",c[2],"%,",a,")"].join("");
}

// Fisher-Yates shuffle
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

};


    //----------------------------------------------------------------------------------------
    //4. Render Tooltip
    //----------------------------------------------------------------------------------------
    this.renderTooltip = function () {

        $("#pyk-wrap").remove();
        this.tooltip = d3.select("body")
            .append("div").attr("id", "pyk-wrap")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("background", "#fff")
            .style("padding", "10px 20px")
            .style("box-shadow", "0 0 10px #000")
            .style("border-radius", "5px")
            .text("a simple tooltip");

    };
	
};

$(document).ready(function(e){
  var k = new linear_charts.linearRangeQuery({
    data: "linear_range_query.csv",
    selection: "#wrap",
    width: 550,
    height: 400,
    nonchartColumns: ["Name"], //Enter the exact names of columns from the data file which should not be included in chart. Leave empty for no value. e.g. ["Name","ID"]
    imageColumns: ["Status"], //Enter the exact names of columns from the data file which has the image path. Leave empty for no value. e.g. ["Status", "Logo"]
    linkColumns: ["Profile"], //Enter the exact names of columns from the data file which has the external link. Leave empty for no value. e.g. ["Profile","Website"]
    sourceName: "",
    sourceLink: ""
  });
  k.execute();
});