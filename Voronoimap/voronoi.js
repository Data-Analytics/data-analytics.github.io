var width = 960,
    height = 420;

var colors = [
"rgb(178,24,43)",
"rgb(214,96,77)",
"rgb(244,165,130)",
"rgb(253,219,199)",
"rgb(255,255,255)",
"rgb(224,224,224)",
"rgb(186,186,186)",
"rgb(135,135,135)",
"rgb(77,77,77)"
];


var sites = d3.range(100).map(function(d) {
  return [Math.random() * width, Math.random() * height];
});

var voronoi = d3.geom.voronoi();

var canvas = d3.select(".Voronoi_Map").append("canvas")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", function() { sites[0] = d3.mouse(this); redraw(); });

var context = canvas.node().getContext("2d");

redraw();

function redraw() {
  var cells = voronoi(sites);

  context.clearRect(0, 0, width, height);

  context.fillStyle = "#0000ff";
  draw(cells[0]);
  context.fill();

  for (var k = 0, l = colors.length; k < l; ++k) {
    context.fillStyle = colors[k];
    for (var i = 1, n = cells.length; i < n; ++i) {
      if (i % l === k && draw(cells[i])) context.fill();
    }
  }

  context.strokeStyle = "#000";
  for (var i = 0, n = cells.length; i < n; ++i) {
    if (draw(cells[i])) context.stroke();
  }

  context.fillStyle = "#000";
  for (var i = 1, n = sites.length, site; i < n; ++i) {
    site = sites[i];
    context.beginPath();
    context.arc(site[0], site[1], 1.5, 0, 2 * Math.PI, false);
    context.fill();
  }
}

function draw(cell) {
  if (cell) {
    context.beginPath();
    context.moveTo(cell[0][0], cell[0][1]);
    for (var j = 1, m = cell.length; j < m; ++j) {
      context.lineTo(cell[j][0], cell[j][1]);
    }
    context.closePath();
    return true;
  }
}
