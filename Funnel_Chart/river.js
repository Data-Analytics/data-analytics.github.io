var Funnel_Charts = {};
Funnel_Charts.River = function (t) {
    return this.execute = function () {
        if (!this.validate_options()) return !1;
        $(this.options.selection).html("<img src='http://data-analytics.github.io/images/spinner.gif'> Loading... Please wait");
        var t = this;
        t.source_name = this.options.sourceName, t.source_link = this.options.sourceLink;
        var e = this.options;
        d3.json(e.data, function (e, r) {
            t.data = r, t.render()
        })
    }, this.validate_options = function () {
        return void 0 === this.options.selection ? !1 : void 0 === this.options.data ? !1 : this.options.width < 300 ? !1 : !0
    }, this.options = jQuery.extend({
        width: 960,
        height: 200,
        filterList: [],
        fullList: [],
        extended: !1
    }, t), this.render = function () {
        $(this.options.selection).html("");
        var t = this.options.height,
            e = this.options.width;
        this.svg = d3.select(this.options.selection).append("svg").attr("class", "pyk-river").attr("height", t + 20).attr("width", e), this.legends_group = this.svg.append("g").attr("class", "legend-holder").attr("transform", "translate(0,15)"), this.map_group = this.svg.append("g").attr("class", "map-holder"), this.renderTooltip(), this.draw()
    }, this.renderTooltip = function () {
        $("#river-tooltip").remove(), this.tooltip = d3.select("body").append("div").attr("id", "river-tooltip").style("position", "absolute").style("z-index", "10").style("visibility", "hidden").style("background", "#fff").style("padding", "10px 20px").style("box-shadow", "0 0 10px #000").style("border-radius", "5px").text("a simple tooltip")
    }, this.draw = function () {
        this.renderLegends(), this.renderChart()
    }, this.renderLegends = function () {
        var t = this,
            e = (this.legends_group.append("g").attr("class", "option-holder").attr("transform", "translate(0,15)"), [{
                name: "Percentage",
                on: this.extended
            }, {
                name: "Absolute",
                on: !this.extended
            }]),
            r = this.legends_group.select("g.option-holder").selectAll("text").data(e);
        r.enter().append("text").text(function (t) {
            return t.name
        }).attr("transform", function (t, e) {
            return "translate(" + (100 * e + 20) + ",0)"
        }).on("click", function () {
            t.extended = !t.extended, t.draw()
        });
        var n = this.legends_group.select("g.option-holder").selectAll("circles").data(e);
        n.enter().append("circle").attr("cx", function (t, e) {
            return 100 * e + 10
        }).attr("cy", -6).attr("r", 6).attr("style", function (t) {
            var e = t.on ? "#000" : "#fff";
            return "fill: " + e + "; stroke-width: 3px; stroke:#000"
        }).on("click", function () {
            t.extended = !t.extended, t.draw()
        });
        var i = this.data[0].breakup,
            a = (this.options.width - 250) / i.length,
            o = this.legends_group.append("g").attr("class", "legend-holder").attr("transform", "translate(250,15)");
        o.selectAll("g.legend").data(i).enter().append("g").attr("class", "legend").attr("transform", function (t, e) {
            var r = e * a;
            return "translate(" + r + ",0)"
        }).on("click", function (e) {
            t.toggleFilter(e.name)
        });
        var s = d3.selectAll("g.legend")[0];
        for (var l in i) {
            var u = d3.select(s[l]);
            u.selectAll("text").data([i[l]]).enter().append("text").text(function (e) {
                return t.options.filterList.push(e.name), t.options.fullList.push(e.name), e.name
            }).attr("transform", "translate(20,-1)");
            var d = u.selectAll("circle").data([i[l]]);
            d.enter().append("circle"), d.attr("cx", 9).attr("cy", -6).attr("r", 6).attr("style", function (e) {
                var r = -1 === t.options.filterList.indexOf(e.name) ? "#fff" : e.color;
                return 0 === t.options.filterList.length && (r = e.color), "fill: " + r + "; stroke-width: 3px; stroke:" + e.color
            })
        }
    }, this.renderChart = function () {
        var t = jQuery.extend(!0, [], this.data),
            e = 40,
            r = this;
        t = this.filter(t), t = this.parseData(t);
        var n = this.maxTotal(t),
            i = this.options.width,
            a = this.options.height,
            o = d3.scale.linear().domain([0, n]).range([0, i - 200]),
            s = d3.scale.linear().domain([0, a]).range([e, a]),
            l = a / (2 * t.length),
            u = 2 * l,
            d = this.map_group;
        d.selectAll("line.top_line").data(t).enter().append("line").attr("class", "top_line").attr("x1", 0).attr("x2", i).attr("y1", function (t, e) {
            return s(e * u)
        }).attr("y2", function (t, e) {
            return s(e * u)
        }), d.selectAll("line.bottom_line").data(t).enter().append("line").attr("class", "bottom_line").attr("x1", 0).attr("x2", i).attr("y1", function (t, e) {
            return s(e * u + l)
        }).attr("y2", function (t, e) {
            return s(e * u + l)
        });
        var c = d.selectAll("g.bar-holder").data(t);
        c.enter().append("g").attr("class", "bar-holder").attr("transform", function (t, e) {
            var r = s(e * u),
                i = o((n - t.breakupTotal) / 2) + 100;
            return "translate(" + i + "," + r + ")"
        }), c.transition().duration(1e3).attr("height", s(l)).attr("width", function (t) {
            return o(t.breakupTotal)
        }).attr("transform", function (t, e) {
            var a = s(e * u),
                l = o((n - t.breakupTotal) / 2) + 100,
                d = 1,
                c = 1;
            if (r.extended) {
                var p = o(t.breakupTotal);
                d = (i - 200) / p, c = 2, l = s(100)
            }
            return "translate(" + l + "," + a + ") scale(" + d + ", " + c + ")"
        }), c.exit().remove();
        var p = d.selectAll("g.bar-holder")[0];
        for (var h in t) {
            var f = p[h],
                v = t[h].breakup,
                g = d3.select(f).selectAll("rect").data(v);
            g.enter().append("rect").attr("width", 0), g.transition().duration(1e3).attr("x", function (t, e) {
                if (0 === e) return 0;
                for (var r = 0, n = 0; e > n; n++) r += v[n].count;
                return o(r)
            }).attr("y", 0).attr("height", function () {
                return l * (a - e) / a
            }).attr("width", function (t) {
                return o(t.count)
            }), g.attr("style", function (t) {
                return "fill: " + t.color
            }).on("mouseover", function (t) {
                var e = d3.select("#river-tooltip");
                e.html(t.tooltip), e.style("visibility", "visible")
            }).on("mousemove", function () {
                var t = d3.select("#river-tooltip"),
                    e = parseInt(t.style("height")) + 40,
                    r = parseInt(t.style("width")) / 2;
                t.style("top", d3.event.pageY - e + "px").style("left", d3.event.pageX - r + "px")
            }).on("mouseout", function () {
                var t = d3.select("#river-tooltip");
                t.style("visibility", "hidden")
            }).on("click", function (t) {
                r.onlyFilter(t.name)
            }), g.exit().transition().duration(1e3).attr("width", 0).remove()
        }
        var x = d.selectAll("text.cool_label").data(t);
        x.enter().append("text").attr("class", "cool_label"), x.attr("x", i).attr("y", function (t, e) {
            return s(e * u + l / 2 + 5)
        }).text(function (t) {
            return t.breakupTotal + " " + t.technical_name
        });
        var y = d.selectAll("text.left_label").data(t);
        y.enter().append("svg:text").attr("class", "left_label"), y.attr("y", function (t, e) {
            return s(e * u + l / 2 + 5)
        }).attr("x", 0).text(function (t) {
            return t.display_name
        });
        var m = d.selectAll("text.right_label").data(t);
        if (m.enter().append("svg:text").attr("class", "right_label"), m.attr("y", function (t, e) {
            return s(e * u + 1.5 * l + 5)
        }).attr("x", i).text(function (e, r) {
            return void 0 === t[r + 1] ? "" : e.duration
        }), this.extended) return $("line.left_line").fadeOut(), void $("line.right_line").fadeOut();
        var b = d.selectAll("line.left_line").data(t);
        b.enter().append("line").attr("class", "left_line").attr("y2", function (t, e) {
            return s(e * u + l)
        }).attr("x2", function (t) {
            return o((n - t.breakupTotal) / 2) + 100
        }), b.transition().duration(1e3).attr("style", function (e, r) {
            return t[r + 1] ? void 0 : "stroke-width: 0"
        }).attr("y1", function (t, e) {
            return s(e * u + l)
        }).attr("x1", function (t) {
            return o((n - t.breakupTotal) / 2) + 100
        }).attr("y2", function (t, e) {
            return s((e + 1) * u)
        }).attr("x2", function (e, r) {
            return t[r + 1] ? o((n - t[r + 1].breakupTotal) / 2) + 100 : 0
        });
        var k = d.selectAll("line.right_line").data(t);
        k.enter().append("line").attr("class", "right_line").attr("y2", function (t, e) {
            return s(e * u + l)
        }).attr("x2", function (t) {
            return o((n - t.breakupTotal) / 2 + t.breakupTotal) + 100
        }), k.transition().duration(1e3).attr("style", function (e, r) {
            return t[r + 1] ? void 0 : "stroke-width: 0"
        }).attr("y1", function (t, e) {
            return s(e * u + l)
        }).attr("x1", function (t) {
            return o((n - t.breakupTotal) / 2 + t.breakupTotal) + 100
        }).attr("y2", function (t, e) {
            return s((e + 1) * u)
        }).attr("x2", function (e, r) {
            return t[r + 1] ? o((n - t[r + 1].breakupTotal) / 2 + t[r + 1].breakupTotal) + 100 : 0
        })
    }, this.filter = function (t) {
        this.options.filterList.length < 1 && (this.options.filterList = jQuery.extend(!0, [], this.options.fullList));
        for (var e in t) {
            var r = t[e].breakup,
                n = [];
            for (var i in r) jQuery.inArray(r[i].name, this.options.filterList) >= 0 && n.push(r[i]);
            t[e].breakup = n
        }
        return t
    }, this.onlyFilter = function (t) {
        var e = this.options.filterList.indexOf(t);
        1 === this.options.filterList.length && -1 != e ? this.options.filterList = [] : (this.options.filterList = [], this.options.filterList.push(t)), this.draw()
    }, this.toggleFilter = function (t) {
        var e = this.options.filterList.indexOf(t); - 1 === e ? this.options.filterList.push(t) : this.options.filterList.splice(e, 1), this.draw()
    }, this.totalInBreakup = function (t) {
        var e = 0;
        for (var r in t) e += t[r].count;
        return e
    }, this.maxTotal = function (t) {
        var e = [];
        for (var r in t) e.push(t[r].breakupTotal);
        return e = e.sort(function (t, e) {
            return t - e
        }), e[e.length - 1]
    }, this.parseData = function (t) {
        for (var e in t) t[e].breakupTotal = this.totalInBreakup(t[e].breakup);
        return t
    }, this
}, $(document).ready(function () {
    var t = new Funnel_Charts.River({
        data: "river-data.json",
        selection: "#river-container",
        height: 400,
        width: 960,
        sourceName: "",
        sourceLink: ""
    });
    t.execute()
});