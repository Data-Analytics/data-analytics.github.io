var width = 960,
    height = 420;

var n = 100,
    m = 12,
    degrees = 180 / Math.PI;

var spermatozoa = d3.range(n).map(function() {
  var x = Math.random() * width,
      y = Math.random() * height;
  return {
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
    path: d3.range(m).map(function() { return [x, y]; }),
    count: 0
  };
});

var svg = d3.select(".chart").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.selectAll("g")
    .data(spermatozoa)
  .enter().append("g");

var head = g.append("ellipse")
    .attr("rx", 6.5)
    .attr("ry", 4);

g.append("path")
    .datum(function(d) { return d.path.slice(0, 3); })
    .attr("class", "mid");

g.append("path")
    .datum(function(d) { return d.path; })
    .attr("class", "tail");

var tail = g.selectAll("path");

d3.timer(function() {
  for (var i = -1; ++i < n;) {
    var spermatozoon = spermatozoa[i],
        path = spermatozoon.path,
        dx = spermatozoon.vx,
        dy = spermatozoon.vy,
        x = path[0][0] += dx,
        y = path[0][1] += dy,
        speed = Math.sqrt(dx * dx + dy * dy),
        count = speed * 10,
        k1 = -5 - speed / 3;

    // Bounce off the walls.
    if (x < 0 || x > width) spermatozoon.vx *= -1;
    if (y < 0 || y > height) spermatozoon.vy *= -1;

    // Swim!
    for (var j = 0; ++j < m;) {
      var vx = x - path[j][0],
          vy = y - path[j][1],
          k2 = Math.sin(((spermatozoon.count += count) + j * 3) / 300) / speed;
      path[j][0] = (x += dx / speed * k1) - dy * k2;
      path[j][1] = (y += dy / speed * k1) + dx * k2;
      speed = Math.sqrt((dx = vx) * dx + (dy = vy) * dy);
    }
  }

  head.attr("transform", headTransform);
  tail.attr("d", tailPath);
});

function headTransform(d) {
  return "translate(" + d.path[0] + ")rotate(" + Math.atan2(d.vy, d.vx) * degrees + ")";
}

function tailPath(d) {
  return "M" + d.join("L");
}