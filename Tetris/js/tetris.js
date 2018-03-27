
var gamedata = [
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
],
  div = 33,
  rows = 18,
  cols = 10,
  w = cols * div,
  h = rows * div,
  shape = {},
  nextShape = {},
  next = -1,
  interval = 0,
  timeInterval = 0,
  level = 1,
  lines = 0,
  time = 0,
  gameover = false,
  paused = false,
  grid = false,
  svg,
  svgnext,
  scoreID;

function tetris() {
  svg = d3
    .select(".svg-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h), svgnext = d3.select(".next").append("svg");

  attachKeyListeners();
  gameOver();
}

function play() {
  createShape(true);
  timeInterval = setInterval(
    function() {
      time++;
      d3.select("#time").text(time);
    },
    1000
  );
  interval = setInterval(start, 650);
}

function start() {
  if (shape.animate()) {
    shape.down().draw();
  } else {
    clearInterval(interval);
    updateGame();
    createShape(false);

    if (gameover) {
      gameOver();
      clearInterval(timeInterval);
    } else {
      interval = setInterval(start, 650 - level * 50);
    }
  }
}

function createShape(first) {
  var curr;
  if (next >= 0) {
    curr = next;
    next = Math.round(Math.random() * 6);
    if (next == curr) {
      next = Math.round(Math.random() * 6);
    }
  } else {
    curr = Math.round(Math.random() * 6);
    next = Math.round(Math.random() * 6);
  }

  switch (curr) {
  case 0:
    shape = createBar();
    break;
  case 1:
    shape = createL1();
    break;
  case 2:
    shape = createSquare();
    break;
  case 3:
    shape = createZ1();
    break;
  case 4:
    shape = createL2();
    break;
  case 5:
    shape = createT();
    break;
  case 6:
    shape = createZ2();
    break;
  }

  switch (next) {
  case 0:
    nextShape = createBar("next");
    break;
  case 1:
    nextShape = createL1("next");
    break;
  case 2:
    nextShape = createSquare("next");
    break;
  case 3:
    nextShape = createZ1("next");
    break;
  case 4:
    nextShape = createL2("next");
    break;
  case 5:
    nextShape = createT("next");
    break;
  case 6:
    nextShape = createZ2("next");
    break;
  }
}


function createBar(next) {
  var d = [ [ 3 * div, 0 ], [ 4 * div, 0 ], [ 5 * div, 0 ], [ 6 * div, 0 ] ],
    // data
    dPreview = [ [ 10, 20 ], [ 30, 20 ], [ 50, 20 ], [ 70, 20 ] ],
    o = 0,
    // orientation
    f = "#ccc",
    // fill
    grace = true,
    bar = {};

  if (next) {
    drawNext(dPreview, 20, f);
  } else {
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);
  }

  bar.f = function(value) {
    if (!arguments.length)
      return f;

    f = value;
    return bar;
  };

  bar.d = function(value) {
    if (!arguments.length)
      return d;

    d = value;
    return bar;
  };

  bar.o = function(value) {
    if (!arguments.length)
      return o;

    o = value;
    return bar;
  };

  bar.left = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (d[0][0] > 0) {
      if (
        o == 0 && gamedata[r][c - 1] == 0 ||
          o == 90 && gamedata[r][c - 1] == 0 && gamedata[r - 1][c - 1] == 0 &&
            (gamedata[r - 2] == undefined || gamedata[r - 2][c - 1] == 0) &&
            (gamedata[r - 3] == undefined || gamedata[r - 3][c - 1] == 0)
      ) {
        for (var i = 0; i < d.length; i++) {
          d[i][0] -= div;
        }
      }
    }
    return bar;
  };

  bar.right = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (d[3][0] < w - div) {
      if (
        o == 0 && gamedata[r][c + 4] == 0 ||
          o == 90 && gamedata[r][c + 1] == 0 && gamedata[r - 1][c + 1] == 0 &&
            (gamedata[r - 2] == undefined || gamedata[r - 2][c + 1] == 0) &&
            (gamedata[r - 3] == undefined || gamedata[r - 3][c + 1] == 0)
      ) {
        for (var i = 0; i < d.length; i++) {
          d[i][0] += div;
        }
      }
    }
    return bar;
  };

  bar.down = function() {
    for (var i = 0; i < d.length; i++) {
      d[i][1] += div;
    }

    return bar;
  };

  bar.drop = function() {
    var x1, x2, r = d[0][1] / div, done = false;

    if (o == 0) {
      x1 = d[0][0] / div;
      x2 = d[3][0] / div;

      for (var i = r; i < rows; i++) {
        for (var j = x1; j <= x2; j++) {
          if (gamedata[i][j]) {
            done = true;
            break;
          }
        }
        if (done)
          break;
      }

      for (var k = 0; k < d.length; k++) {
        d[k][1] = div * (i - 1);
      }
    } else {
      x1 = d[0][0] / div;

      for (var i = r; i < rows; i++) {
        if (gamedata[i][x1]) {
          break;
        }
      }

      for (var k = 0; k < d.length; k++) {
        d[k][1] = div * (i - k - 1);
      }
    }
    grace = false;
    return bar;
  };

  bar.rotate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        r + 1 <= rows && gamedata[r + 1][c + 1] == 0 &&
          (gamedata[r - 1] == undefined || gamedata[r - 1][c + 1] == 0) &&
          (gamedata[r - 2] == undefined || gamedata[r - 2][c + 1] == 0)
      ) {
        o = 90;
        d[0][0] += div;
        d[0][1] += div;
        d[2][0] -= div;
        d[2][1] -= div;
        d[3][0] -= 2 * div;
        d[3][1] -= 2 * div;
      }
    } else {
      if (
        gamedata[r - 1][c - 1] == 0 && gamedata[r - 1][c + 1] == 0 &&
          gamedata[r - 1][c + 2] == 0
      ) {
        o = 0;
        d[0][0] -= div;
        d[0][1] -= div;
        d[2][0] += div;
        d[2][1] += div;
        d[3][0] += 2 * div;
        d[3][1] += 2 * div;
      }
    }

    return bar;
  };

  bar.animate = function() {
    var r, c, animate = true;

    if (d[0][1] == div * 17) {
      return false;
    } else if (o == 0) {
      for (var i = 0; i < d.length; i++) {
        r = d[i][1] / div + 1;
        c = d[i][0] / div;

        if (gamedata[r][c]) {
          animate = false;
          break;
        }
      }
      return animate;
    } else if (o == 90) {
      r = d[0][1] / div + 1;
      c = d[0][0] / div;
      return gamedata[r][c] == 0;
    }

    return bar;
  };

  bar.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  bar.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return bar;
  };

  return bar;
}


function createSquare(next) {
  var d = [
    [ 4 * div, 0 ],
    [ 5 * div, 0 ],
    [ 4 * div, div ],
    [ 5 * div, div ]
  ],
    // data
    dPreview = [ [ 30, 10 ], [ 50, 10 ], [ 30, 30 ], [ 50, 30 ] ],
    o = 0,
    // orientation
    f = "#ccc",
    // fill
    grace = true,
    sqr = {};

  if (next)
    drawNext(dPreview, 20, f);
  else
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);

  sqr.f = function(value) {
    if (!arguments.length)
      return f;
    f = value;
    return sqr;
  };

  sqr.d = function(value) {
    if (!arguments.length)
      return d;

    d = value;
    return sqr;
  };

  sqr.o = function(value) {
    if (!arguments.length)
      return o;

    o = value;
    return sqr;
  };

  sqr.left = function() {
    var r = d[0][1] / div,
      // row
      c = d[0][0] / div;
    // col
    if (c > 0 && gamedata[r][c - 1] == 0 && gamedata[r + 1][c - 1] == 0) {
      for (var i = 0; i < 4; i++) {
        d[i][0] -= div;
      }
    }
    return sqr;
  };

  sqr.right = function() {
    var r = d[0][1] / div, c = d[1][0] / div;

    if (
      c < cols - 1 && gamedata[r][c + 1] == 0 && gamedata[r + 1][c + 1] == 0
    ) {
      for (var i = 0; i < 4; i++) {
        d[i][0] += div;
      }
    }
    return sqr;
  };

  sqr.down = function() {
    for (var i = 0; i < 4; i++) {
      d[i][1] += div;
    }
    return sqr;
  };

  sqr.drop = function() {
    var r = d[3][1] / div, c = d[0][0] / div;

    for (var i = r; i < rows; i++) {
      if (gamedata[i][c] != 0 || gamedata[i][c + 1] != 0) {
        break;
      }
    }

    d[0][1] = div * (i - 2);
    d[1][1] = div * (i - 2);
    d[2][1] = div * (i - 1);
    d[3][1] = div * (i - 1);
    grace = false;
    return sqr;
  };

  sqr.rotate = function() {
    // it's a square! no need to implement rotate()!
    return sqr;
  };

  sqr.animate = function() {
    var r = d[2][1] / div,
      // row
      c = d[2][0] / div;
    // col
    if (
      r < rows - 1 && gamedata[r + 1][c] == 0 && gamedata[r + 1][c + 1] == 0
    ) {
      return true;
    }

    return false;
  };

  sqr.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  sqr.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return sqr;
  };

  return sqr;
}


function createL1(next) {
  var d = [ [ 3 * div, div ], [ 3 * div, 0 ], [ 4 * div, 0 ], [ 5 * div, 0 ] ],
    dPreview = [ [ 20, 10 ], [ 40, 10 ], [ 60, 10 ], [ 20, 30 ] ],
    o = 0,
    // orientation
    f = "#ccc",
    // fill
    grace = true,
    l1 = {};
  if (next)
    drawNext(dPreview, 20, f);
  else
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);

  l1.f = function() {
    return f;
  };

  l1.d = function() {
    return d;
  };

  l1.left = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c - 1] == 0 && gamedata[r - 1][c - 1] == 0)
        move = true;
    } else if (o == 90) {
      if (
        (gamedata[r] == undefined || gamedata[r][c - 1] == 0) &&
          gamedata[r + 1][c] == 0 &&
          gamedata[r + 2][c] == 0
      )
        move = true;
    } else if (o == 180) {
      if (gamedata[r][c - 1] == 0 && gamedata[r + 1][c - 3] == 0)
        move = true;
    } else if (o == 270) {
      if (
        gamedata[r][c - 2] == 0 && gamedata[r - 1][c - 2] == 0 &&
          gamedata[r - 2][c - 2] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] -= div;
    }

    return l1;
  };

  l1.right = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c + 1] == 0 && gamedata[r - 1][c + 3] == 0)
        move = true;
    } else if (o == 90) {
      if (
        (gamedata[r] == undefined || gamedata[r][c + 2] == 0) &&
          gamedata[r + 1][c + 2] == 0 &&
          gamedata[r + 2][c + 2] == 0
      )
        move = true;
    } else if (o == 180) {
      if (gamedata[r][c + 1] == 0 && gamedata[r + 1][c + 1] == 0)
        move = true;
    } else if (o == 270) {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r - 1][c] == 0 &&
          gamedata[r - 2][c] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] += div;
    }

    return l1;
  };

  l1.down = function() {
    for (var i = 0; i < 4; i++) {
      d[i][1] += div;
    }
    return l1;
  };

  l1.drop = function() {
    var c = d[0][0] / div, r = d[0][1] / div, j;

    if (o == 0) {
      for (j = r + 1; j < rows; j++) {
        if (
          gamedata[j][c] || gamedata[j - 1][c] || gamedata[j - 1][c + 1] ||
            gamedata[j - 1][c + 2]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j - 1);
      d[2][1] = div * (j - 1);
      d[3][1] = div * (j - 1);
    } else if (o == 90) {
      for (j = r + 1; j < rows - 2; j++) {
        if (
          gamedata[j][c] || gamedata[j][c + 1] || gamedata[j + 1][c + 1] ||
            gamedata[j + 2][c + 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * (j + 1);
      d[3][1] = div * (j + 2);
    } else if (o == 180) {
      for (j = r + 1; j < rows - 1; j++) {
        if (
          gamedata[j][c] || gamedata[j + 1][c] || gamedata[j + 1][c - 1] ||
            gamedata[j + 1][c - 2]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j + 1);
      d[2][1] = div * (j + 1);
      d[3][1] = div * (j + 1);
    } else {
      for (j = r + 1; j < rows; j++) {
        if (
          gamedata[j][c] || gamedata[j][c - 1] || gamedata[j - 1][c - 1] ||
            gamedata[j - 2][c - 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * (j - 1);
      d[3][1] = div * (j - 2);
    }
    grace = false;
    return l1;
  };

  l1.rotate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        r + 1 < rows - 1 &&
          (gamedata[r - 2] == undefined || gamedata[r - 2][c] == 0) &&
          (gamedata[r - 2] == undefined || gamedata[r - 2][c + 1] == 0) &&
          gamedata[r][c + 1] == 0
      ) {
        o = 90;
        d[0][1] -= div * 2;
        d[1][0] += div;
        d[1][1] -= div;
        d[3][1] += div;
        d[3][0] -= div;
      }
    } else if (o == 90) {
      if (
        (gamedata[r] == undefined || gamedata[r][c + 2] == 0) &&
          (gamedata[r + 1] == undefined || gamedata[r + 1][c + 2] == 0) &&
          (gamedata[r + 1] == undefined || gamedata[r + 1][c] == 0)
      ) {
        o = 180;
        d[0][0] += div * 2;
        d[1][0] += div;
        d[1][1] += div;
        d[3][0] -= div;
        d[3][1] -= div;
      }
    } else if (o == 180) {
      if (
        r + 2 < rows - 1 &&
          (gamedata[r + 2] == undefined || gamedata[r + 2][c] == 0) &&
          (gamedata[r + 2] == undefined || gamedata[r + 2][c - 1] == 0) &&
          (gamedata[r] == undefined || gamedata[r][c - 1] == 0)
      ) {
        o = 270;
        d[0][1] += div * 2;
        d[1][0] -= div;
        d[1][1] += div;
        d[3][0] += div;
        d[3][1] -= div;
      }
    } else {
      if (
        gamedata[r][c - 2] == 0 && gamedata[r - 1][c - 2] == 0 &&
          gamedata[r - 1][c] == 0
      ) {
        o = 0;
        d[0][0] -= div * 2;
        d[1][0] -= div;
        d[1][1] -= div;
        d[3][0] += div;
        d[3][1] += div;
      }
    }
    return l1;
  };

  l1.animate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        r + 1 < rows && gamedata[r + 1][c] == 0 && gamedata[r][c + 1] == 0 &&
          gamedata[r][c + 2] == 0
      )
        return true;
    } else if (o == 90) {
      if (
        r + 3 < rows && gamedata[r + 1][c] == 0 && gamedata[r + 3][c + 1] == 0
      )
        return true;
    } else if (o == 180) {
      if (
        r + 2 < rows && gamedata[r + 2][c] == 0 &&
          gamedata[r + 2][c - 1] == 0 &&
          gamedata[r + 2][c - 2] == 0
      )
        return true;
    } else {
      if (
        r + 1 < rows && gamedata[r + 1][c] == 0 && gamedata[r + 1][c - 1] == 0
      )
        return true;
    }
    return false;
  };

  l1.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  l1.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return l1;
  };

  return l1;
}

function createL2(next) {
  var d = [ [ 3 * div, 0 ], [ 4 * div, 0 ], [ 5 * div, 0 ], [ 5 * div, div ] ],
    // data
    dPreview = [ [ 20, 10 ], [ 40, 10 ], [ 60, 10 ], [ 60, 30 ] ],
    o = 0,
    // orientation
    f = "#ccc",
    // fill
    grace = true,
    l2 = {};

  if (next)
    drawNext(dPreview, 20, f);
  else
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);

  l2.f = function() {
    return f;
  };

  l2.d = function() {
    return d;
  };

  l2.left = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (c > 0 && gamedata[r][c - 1] == 0 && gamedata[r + 1][c + 1] == 0)
        move = true;
    } else if (o == 90) {
      if (
        c > 0 && gamedata[r][c - 1] == 0 && gamedata[r + 1][c - 1] == 0 &&
          gamedata[r + 2][c - 2] == 0
      )
        move = true;
    } else if (o == 180) {
      if (c > 0 && gamedata[r][c - 3] == 0 && gamedata[r - 1][c - 3] == 0)
        move = true;
    } else {
      if (
        c > 0 && gamedata[r][c - 1] == 0 && gamedata[r - 1][c - 1] == 0 &&
          gamedata[r - 2][c - 1] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] -= div;
    }

    return l2;
  };

  l2.right = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c + 3] == 0 && gamedata[r + 1][c + 3] == 0)
        move = true;
    } else if (o == 90) {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r + 1][c + 1] == 0 &&
          gamedata[r + 2][c + 1] == 0
      )
        move = true;
    } else if (o == 180) {
      if (gamedata[r][c + 1] == 0 && gamedata[r - 1][c - 1] == 0)
        move = true;
    } else {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r - 1][c + 1] == 0 &&
          gamedata[r - 2][c + 2] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] += div;
    }

    return l2;
  };

  l2.down = function() {
    for (var i = 0; i < 4; i++) {
      d[i][1] += div;
    }
    return l2;
  };

  l2.drop = function() {
    var r = d[0][1] / div, c = d[0][0] / div, j;

    if (o == 0) {
      for (j = r + 1; j < rows - 1; j++) {
        if (gamedata[j][c] || gamedata[j][c + 1] || gamedata[j + 1][c + 2])
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * j;
      d[3][1] = div * (j + 1);
    } else if (o == 90) {
      for (j = r + 1; j < rows - 2; j++) {
        if (
          gamedata[j][c] || gamedata[j + 1][c] || gamedata[j + 2][c] ||
            gamedata[j + 2][c - 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j + 1);
      d[2][1] = div * (j + 2);
      d[3][1] = div * (j + 2);
    } else if (o == 180) {
      for (j = r + 1; j < rows; j++) {
        if (
          gamedata[j][c] || gamedata[j][c - 1] || gamedata[j][c - 2] ||
            gamedata[j - 1][c - 2]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * j;
      d[3][1] = div * (j - 1);
    } else {
      for (j = r + 1; j < rows; j++) {
        if (gamedata[j][c] || gamedata[j - 2][c + 1])
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j - 1);
      d[2][1] = div * (j - 2);
      d[3][1] = div * (j - 2);
    }

    grace = false;
    return l2;
  };

  l2.rotate = function() {
    var r, c;

    if (o == 0) {
      r = d[0][1] / div;
      c = d[0][0] / div;

      if (
        r + 2 < rows - 1 && gamedata[r + 1][c + 1] == 0 &&
          gamedata[r + 2][c] == 0 &&
          gamedata[r + 2][c + 1] == 0
      ) {
        o = 90;
        d[0][0] += div;
        d[1][1] += div;
        d[2][0] -= div;
        d[2][1] += div * 2;
        d[3][0] -= div * 2;
        d[3][1] += div;
      }
    } else if (o == 90) {
      r = d[3][1] / div;
      c = d[3][0] / div;

      if (
        (gamedata[r - 2] == undefined || gamedata[r - 2][c] == 0) &&
          (gamedata[r - 1] == undefined || gamedata[r - 1][c] == 0) &&
          (gamedata[r - 1] == undefined || gamedata[r - 1][c + 2] == 0)
      ) {
        o = 180;
        d[0][0] += div;
        d[0][1] += div;
        d[2][0] -= div;
        d[2][1] -= div;
        d[3][1] -= div * 2;
      }
    } else if (o == 180) {
      r = d[0][1] / div;
      c = d[0][0] / div;

      if (
        r + 1 < rows && gamedata[r - 1][c] == 0 &&
          gamedata[r - 1][c - 1] == 0 &&
          gamedata[r + 1][c - 1] == 0
      ) {
        o = 270;
        d[0][0] -= div;
        d[0][1] += div;
        d[2][0] += div;
        d[2][1] -= div;
        d[3][0] += div * 2;
      }
    } else {
      r = d[3][1] / div;
      c = d[3][0] / div;

      if (gamedata[r + 1][c] == 0 && gamedata[r][c - 2] == 0) {
        o = 0;
        d[0][0] -= div;
        d[0][1] -= div * 2;
        d[1][1] -= div;

        d[2][0] += div;
        d[3][1] += div;
      }
    }

    return l2;
  };

  l2.animate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        r + 1 < rows - 1 && gamedata[r + 1][c] == 0 &&
          gamedata[r + 1][c + 1] == 0 &&
          gamedata[r + 2][c + 2] == 0
      )
        return true;
    } else if (o == 90) {
      if (
        r + 3 < rows && gamedata[r + 3][c] == 0 && gamedata[r + 3][c - 1] == 0
      )
        return true;
    } else if (o == 180) {
      if (
        r + 1 < rows && gamedata[r + 1][c] == 0 &&
          gamedata[r + 1][c - 1] == 0 &&
          gamedata[r + 1][c - 2] == 0
      )
        return true;
    } else {
      if (
        r + 1 < rows && gamedata[r + 1][c] == 0 && gamedata[r - 1][c + 1] == 0
      )
        return true;
    }

    return false;
  };

  l2.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  l2.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return l2;
  };

  return l2;
}

/*
	o = 0
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	o = 90
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
*/
function createZ1(next) {
  var d = [
    [ 3 * div, 0 ],
    [ 4 * div, 0 ],
    [ 4 * div, div ],
    [ 5 * div, div ]
  ],
    // data
    dPreview = [ [ 20, 10 ], [ 40, 10 ], [ 40, 30 ], [ 60, 30 ] ],
    o = 0,
    // orientation
    f = "#ccc",
    // fill
    grace = true,
    z1 = {};

  if (next)
    drawNext(dPreview, 20, f);
  else
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);

  z1.f = function() {
    return f;
  };

  z1.d = function() {
    return d;
  };

  z1.left = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c - 1] == 0 && gamedata[r + 1][c] == 0)
        move = true;
    } else if (o = 90) {
      if (
        gamedata[r][c - 1] == 0 && gamedata[r + 1][c - 2] == 0 &&
          gamedata[r + 2][c - 2] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] -= div;
    }

    return z1;
  };

  z1.right = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c + 2] == 0 && gamedata[r + 1][c + 3] == 0)
        move = true;
    } else if (o == 90) {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r + 1][c + 1] == 0 &&
          gamedata[r + 2][c] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] += div;
    }

    return z1;
  };

  z1.down = function() {
    for (var i = 0; i < 4; i++) {
      d[i][1] += div;
    }

    return z1;
  };

  z1.drop = function() {
    var c = d[0][0] / div, r = d[0][1] / div, j;

    if (o == 0) {
      for (j = r + 1; j < rows - 1; j++) {
        if (
          gamedata[j][c] || gamedata[j][c + 1] || gamedata[j + 1][c + 1] ||
            gamedata[j + 1][c + 2]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * (j + 1);
      d[3][1] = div * (j + 1);
    } else if (o == 90) {
      for (j = r + 1; j < rows - 2; j++) {
        if (
          gamedata[j][c] || gamedata[j + 1][c] || gamedata[j + 1][c - 1] ||
            gamedata[j + 2][c - 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j + 1);
      d[2][1] = div * (j + 1);
      d[3][1] = div * (j + 2);
    }

    grace = false;
    return z1;
  };

  z1.rotate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (gamedata[r][c + 2] == 0 && gamedata[r + 2][c + 1] == 0) {
        o = 90;
        d[0][0] += div * 2;
        d[1][0] += div;
        d[1][1] += div;
        d[3][0] -= div;
        d[3][1] += div;
      }
    } else {
      if (gamedata[r][c - 2] == 0 && gamedata[r][c - 1] == 0) {
        o = 0;
        d[0][0] -= div * 2;
        d[1][0] -= div;
        d[1][1] -= div;
        d[3][0] += div;
        d[3][1] -= div;
      }
    }

    return z1;
  };

  z1.animate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        gamedata[r + 1][c] == 0 &&
          (gamedata[r + 2] && gamedata[r + 2][c + 1] == 0) &&
          (gamedata[r + 2] && gamedata[r + 2][c + 2] == 0)
      )
        return true;
    } else {
      if (
        gamedata[r + 2][c] == 0 &&
          (gamedata[r + 3] && gamedata[r + 3][c - 1] == 0)
      )
        return true;
    }

    return false;
  };

  z1.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  z1.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return z1;
  };

  return z1;
}

/*
	o = 0
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	o = 90
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
*/
function createZ2(next) {
  var d = [
    [ 3 * div, div ],
    [ 4 * div, div ],
    [ 4 * div, 0 ],
    [ 5 * div, 0 ]
  ],
    // data
    dPreview = [ [ 20, 30 ], [ 40, 30 ], [ 40, 10 ], [ 60, 10 ] ],
    o = 0,
    // orientation
    f = "#ccc",
    // fill
    grace = true,
    z2 = {};

  if (next)
    drawNext(dPreview, 20, f);
  else
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);

  z2.f = function() {
    return f;
  };

  z2.d = function() {
    return d;
  };

  z2.left = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c - 1] == 0 && gamedata[r - 1][c] == 0)
        move = true;
    } else if (o = 90) {
      if (
        gamedata[r][c - 1] == 0 && gamedata[r + 1][c - 1] == 0 &&
          gamedata[r + 2][c] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] -= div;
    }

    return z2;
  };

  z2.right = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c + 2] == 0 && gamedata[r - 1][c + 3] == 0)
        move = true;
    } else if (o == 90) {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r + 1][c + 2] == 0 &&
          gamedata[r + 2][c + 2] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] += div;
    }

    return z2;
  };

  z2.down = function() {
    for (var i = 0; i < 4; i++) {
      d[i][1] += div;
    }

    return z2;
  };

  z2.drop = function() {
    var c = d[0][0] / div, r = d[0][1] / div, j;

    if (o == 0) {
      for (j = r + 1; j < rows; j++) {
        if (
          gamedata[j][c] || gamedata[j][c + 1] || gamedata[j - 1][c + 1] ||
            gamedata[j - 1][c + 2]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * (j - 1);
      d[3][1] = div * (j - 1);
    } else if (o == 90) {
      for (j = r + 1; j < rows - 2; j++) {
        if (
          gamedata[j][c] || gamedata[j + 1][c] || gamedata[j + 1][c + 1] ||
            gamedata[j + 2][c + 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j + 1);
      d[2][1] = div * (j + 1);
      d[3][1] = div * (j + 2);
    }

    grace = false;
    return z2;
  };

  z2.rotate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (gamedata[r][c + 2] == 0 && gamedata[r + 1][c + 2] == 0) {
        o = 90;
        d[0][0] += div;
        d[0][1] -= div;
        d[2][0] += div;
        d[2][1] += div;
        d[3][1] += div * 2;
      }
    } else {
      if (gamedata[r + 1][c - 1] == 0 && gamedata[r][c + 1] == 0) {
        o = 0;
        d[0][0] -= div;
        d[0][1] += div;
        d[2][0] -= div;
        d[2][1] -= div;
        d[3][1] -= div * 2;
      }
    }

    return z2;
  };

  z2.animate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        gamedata[r + 1] && gamedata[r + 1][c] == 0 &&
          (gamedata[r + 1] && gamedata[r + 1][c + 1] == 0) &&
          gamedata[r][c + 2] == 0
      )
        return true;
    } else {
      if (
        gamedata[r + 2][c] == 0 &&
          (gamedata[r + 3] && gamedata[r + 3][c + 1] == 0)
      )
        return true;
    }

    return false;
  };

  z2.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  z2.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return z2;
  };

  return z2;
}

function createT(next) {
  var d = [ [ 3 * div, 0 ], [ 4 * div, 0 ], [ 5 * div, 0 ], [ 4 * div, div ] ],
    // data
    dPreview = [ [ 20, 10 ], [ 40, 10 ], [ 60, 10 ], [ 40, 30 ] ],
    o = 0,
    // orientation
    f = "#ccc",
    // fill
    grace = true,
    t = {};

  if (next)
    drawNext(dPreview, 20, f);
  else
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);

  t.f = function() {
    return f;
  };

  t.d = function() {
    return d;
  };

  t.left = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c - 1] == 0 && gamedata[r + 1][c] == 0)
        move = true;
    } else if (o == 90) {
      if (
        gamedata[r][c - 1] == 0 && gamedata[r + 1][c - 2] == 0 &&
          gamedata[r + 2][c - 1] == 0
      )
        move = true;
    } else if (o == 180) {
      if (gamedata[r][c - 3] == 0 && gamedata[r - 1][c - 2] == 0)
        move = true;
    } else {
      if (
        gamedata[r][c - 1] == 0 && gamedata[r - 1][c - 1] == 0 &&
          gamedata[r - 2][c - 1] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] -= div;
    }

    return t;
  };

  t.right = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c + 3] == 0 && gamedata[r + 1][c + 2] == 0)
        move = true;
    } else if (o == 90) {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r + 1][c + 1] == 0 &&
          gamedata[r + 2][c + 1] == 0
      )
        move = true;
    } else if (o == 180) {
      if (gamedata[r][c + 1] == 0 && gamedata[r - 1][c] == 0)
        move = true;
    } else {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r - 1][c + 2] == 0 &&
          gamedata[r - 2][c + 1] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] += div;
    }

    return t;
  };

  t.down = function() {
    for (var i = 0; i < 4; i++) {
      d[i][1] += div;
    }

    return t;
  };

  t.drop = function() {
    var c = d[0][0] / div, r = d[0][1] / div, j;

    if (o == 0) {
      for (j = r + 1; j < rows - 1; j++) {
        if (
          gamedata[j][c] || gamedata[j][c + 1] || gamedata[j][c + 2] ||
            gamedata[j + 1][c + 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * j;
      d[3][1] = div * (j + 1);
    } else if (o == 90) {
      for (j = r + 1; j < rows - 2; j++) {
        if (
          gamedata[j][c] || gamedata[j + 1][c] || gamedata[j + 2][c] ||
            gamedata[j + 1][c - 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j + 1);
      d[2][1] = div * (j + 2);
      d[3][1] = div * (j + 1);
    } else if (o == 180) {
      for (j = r + 1; j < rows; j++) {
        if (
          gamedata[j][c] || gamedata[j][c - 1] || gamedata[j][c - 2] ||
            gamedata[j - 1][c - 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * j;
      d[3][1] = div * (j - 1);
    } else {
      for (j = r + 1; j < rows; j++) {
        if (
          gamedata[j][c] || gamedata[j - 1][c] || gamedata[j - 2][c] ||
            gamedata[j - 1][c + 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j - 1);
      d[2][1] = div * (j - 2);
      d[3][1] = div * (j - 1);
    }

    grace = false;
    return t;
  };

  t.rotate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (gamedata[r - 1] == undefined || gamedata[r - 1][c + 1] == 0) {
        o = 90;
        d[0][0] += div;
        d[0][1] -= div;
        d[2][0] -= div;
        d[2][1] += div;
        d[3][0] -= div;
        d[3][1] -= div;
      }
    } else if (o == 90) {
      if (gamedata[r + 1][c + 1] == 0) {
        o = 180;
        d[0][0] += div;
        d[0][1] += div;
        d[2][0] -= div;
        d[2][1] -= div;
        d[3][0] += div;
        d[3][1] -= div;
      }
    } else if (o == 180) {
      if (gamedata[r + 1] && gamedata[r + 1][c - 1] == 0) {
        o = 270;
        d[0][0] -= div;
        d[0][1] += div;
        d[2][0] += div;
        d[2][1] -= div;
        d[3][0] += div;
        d[3][1] += div;
      }
    } else {
      if (gamedata[r - 1][c - 1] == 0) {
        o = 0;
        d[0][0] -= div;
        d[0][1] -= div;
        d[2][0] += div;
        d[2][1] += div;
        d[3][0] -= div;

        d[3][1] += div;
      }
    }

    return t;
  };

  t.animate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        gamedata[r + 1][c] == 0 && gamedata[r + 1][c + 2] == 0 &&
          (gamedata[r + 2] && gamedata[r + 2][c + 1] == 0)
      )
        return true;
    } else if (o == 90) {
      if (
        gamedata[r + 3] && gamedata[r + 3][c] == 0 &&
          gamedata[r + 2][c - 1] == 0
      )
        return true;
    } else if (o == 180) {
      if (
        gamedata[r + 1] && gamedata[r + 1][c] == 0 &&
          gamedata[r + 1][c - 1] == 0 &&
          gamedata[r + 1][c - 2] == 0
      )
        return true;
    } else {
      if (gamedata[r + 1] && gamedata[r + 1][c] == 0 && gamedata[r][c + 1] == 0)
        return true;
    }

    return false;
  };

  t.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  t.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return t;
  };

  return t;
}

function toggleGrid() {
  if (grid) {
    d3.selectAll("line").remove();
    grid = false;
  } else {
    drawGrid();
    grid = true;
  }
}

function drawGrid() {
  for (var i = 1; i < rows; i++) {
    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", i * div)
      .attr("x2", w)
      .attr("y2", i * div)
      .attr("stroke", "lightgray")
      .attr("stroke-width", 0.5);
  }

  for (var j = 1; j < cols; j++) {
    svg
      .append("line")
      .attr("x1", j * div)
      .attr("y1", 0)
      .attr("x2", j * div)
      .attr("y2", h)
      .attr("stroke", "lightgray")
      .attr("stroke-width", 0.5);
  }
}

function attachKeyListeners() {
  d3.select("body").on("keydown", function(event) {
    if (d3.event.keyCode == 37) {
      if (!paused && (shape.animate() || shape.grace())) {
        d3.event.preventDefault();
        shape.left().draw();
      }
    } else if (d3.event.keyCode == 39) {
      if (!paused && (shape.animate() || shape.grace())) {
        d3.event.preventDefault();
        shape.right().draw();
      }
    } else if (d3.event.keyCode == 40) {
      if (!paused && shape.animate()) {
        d3.event.preventDefault();
        shape.down().draw();
      }
    } else if (d3.event.keyCode == 32) {
      if (!paused && shape.animate()) {
        d3.event.preventDefault();
        shape.drop().draw();
      }
    } else if (d3.event.keyCode == 38) {
      if (!paused && (shape.animate() || shape.grace())) {
        d3.event.preventDefault();
        shape.rotate().draw();
      }
    } else if (d3.event.keyCode == 80) {
      if (interval) {
        d3.event.preventDefault();
        pause();
      }
    }
  });
}

function updateGame() {
  var a = shape.d(), r, c, j, done = false;

  for (var i = 0; i < 4; i++) {
    r = a[i][1] / div;
    c = a[i][0] / div;
    gamedata[r][c] = shape.f();
  }

  j = rows - 1;
  while (!done && j > 1) {
    if (emptyRow(j)) {
      done = true;
    } else if (fullRow(j)) {
      slideDown(j);
    } else {
      j--;
    }
  }

  d3.selectAll("rect.active").remove();
  svg.selectAll("g").data([]).exit().remove();

  svg
    .selectAll("g")
    .data(gamedata)
    .enter()
    .append("g")
    .selectAll("rect")
    .data(function(d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("x", function(d, i, j) {
      return i * div + 1;
    })
    .attr("y", function(d, i, j) {
      return j * div + 1;
    })
    .attr("rx", 1)
    .attr("width", function(d) {
      return div - 3;
    })
    .attr("height", function(d) {
      return div - 3;
    })
    .style("fill", function(d, i, j) {
      return d ? gamedata[j][i] : "none";
    })
    .style("fill-opacity", function(d, i, j) {
      return d ? 0.7 : "none";
    })
    .style("stroke", function(d, i, j) {
      return d ? gamedata[j][i] : "none";
    })
    .style("stroke-width", function(d) {
      return d ? 2 : 0;
    });

  if (!emptyRow(1)) {
    gameover = true;
  }
}

function gameOver() {
  if (gameover) {
    updateScore();
    scoreID = null;
  }

  d3.selectAll("rect.active").remove();
  svgnext.selectAll("rect").data([]).exit().remove();

  svg
    .selectAll("g")
    .data(gamedata)
    .selectAll("rect")
    .data(function(d) {
      return d;
    })
    .transition()
    .duration(300)
    .delay(function(d, i, j) {
      return j * 100;
    })
    .style("fill-opacity", 0)
    .style("stroke-opacity", 0);

  d3.select("#modal").classed("active-modal", true);
}

function newGame() {
  gamedata = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 0
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 1
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 2
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 3
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 4
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 5
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 6
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 7
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 8
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 9
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 10
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 11
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 12
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 13
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 14
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 15
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 16
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ], // 17
  prev = -1, interval = 0, timeInterval = 0, gameover = false, shape = {}, nextShape = {}, next = -1, level = 1, lines = 0, time = 0;

  svg.selectAll("g").data([]).exit().remove();
  d3.select("#modal").classed("active-modal", false);
  d3.select("#level").text(level);
  d3.select("#lines").text(lines);
  d3.select("#time").text(time);
  createScore();
  play();
}

function drawNext(data, length, fill) {
  svgnext.selectAll("rect").data([]).exit().remove();

  svgnext
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) {
      return d[0];
    })
    .attr("y", function(d) {
      return d[1];
    })
    .attr("width", length - 2.5)
    .attr("height", length - 2.5)
    .style("stroke", fill)
    .style("stroke-width", 1.5)
    .style("fill", fill)
    .style("fill-opacity", 0.6);
}

function emptyRow(j) {
  for (var i = 0; i < cols; i++) {
    if (gamedata[j][i])
      return false;
  }

  return true;
}

function fullRow(j) {
  for (var i = 0; i < cols; i++) {
    if (gamedata[j][i] == 0)
      return false;
  }

  return true;
}

function slideDown(j) {
  for (var k = j; k > 0; k--) {
    if (emptyRow(k)) {
      break;
    } else {
      for (var i = 0; i < cols; i++)
        gamedata[k][i] = gamedata[k - 1][i];
    }
  }

  lines++;
  if (lines % 5 == 0)
    level++;
  d3.select("#level").text(level);
  d3.select("#lines").text(lines);
}

function pause() {
  if (paused) {
    paused = false;
    interval = setInterval(start, 650 - level * 50);
    timeInterval = setInterval(
      function() {
        time++;
        d3.select("#time").text(time);
      },
      1000
    );
    d3.select("#pause").classed("paused", false);
  } else {
    paused = true;
    clearInterval(interval);
    clearInterval(timeInterval);
    d3.select("#pause").classed("paused", true);
  }
}

function createScore() {}

function updateScore() {}

function createURL() {
  var url = "http://d3tetris.herokuapp.com/scores/";
  // var url = "http://localhost:3000/scores/";
  if (gameover) {
    url += "update?level=" + level;
    url += "&lines=" + lines;
    url += "&time=" + time;
  } else {
    url += "create";
  }

  return url;
}

function updateStats(json) {
  d3.select("#gamesplayed").text(json.count);
  d3.select("#hs-lines").text(json.hs.lines);
  d3.select("#hs-time").text(json.hs.time);
}

function updateCount() {
  var count = Number(d3.select("#gamesplayed").text());
  d3.select("#gamesplayed").text(count + 1);
}
