function highlightPath(t) {
    var e = d3.select("g.team." + t)[0][0];
    e.parentNode.appendChild(e), d3.select("text.legend." + t).transition().duration(200).style("font-weight", "bold"), d3.select('path.inner[data-team="' + t + '"]').transition().duration(200).style("stroke-width", "4px").style("opacity", .9), d3.select('path.outer[data-team="' + t + '"]').transition().duration(200).style("stroke-opacity", .9)
}

function unHighlightPath(t) {
    d3.select("text.legend." + t).transition().duration(200).style("font-weight", "normal"), d3.select('path.inner[data-team="' + t + '"]').transition().duration(200).style("stroke-width", "2px").style("opacity", .7), d3.select('path.outer[data-team="' + t + '"]').transition().duration(200).style("stroke-opacity", 0)
}

function getYearForFile(t) {
    var e = t + 1;
    return ("0" + t % 100).slice(-2) + ("0" + e % 100).slice(-2)
}

function showYear() {
    var t = $("#year").data("year"),
        e = t + 1;
    $("#yeartext").text(t + "-" + e)
}

function ordinal_suffix_of(t) {
        var e = t % 10;
        return 1 == e && 11 != t ? t + "st" : 2 == e && 12 != t ? t + "nd" : 3 == e && 13 != t ? t + "rd" : t + "th"
    }(function(t, e) {
        function n(t) {
            var e = pe[t] = {};
            return K.each(t.split(ee), function(t, n) {
                e[n] = !0
            }), e
        }

        function r(t, n, r) {
            if (r === e && 1 === t.nodeType) {
                var i = "data-" + n.replace(me, "-$1").toLowerCase();
                if (r = t.getAttribute(i), "string" == typeof r) {
                    try {
                        r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : ge.test(r) ? K.parseJSON(r) : r
                    } catch (o) {}
                    K.data(t, n, r)
                } else r = e
            }
            return r
        }

        function i(t) {
            var e;
            for (e in t)
                if (("data" !== e || !K.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
            return !0
        }

        function o() {
            return !1
        }

        function a() {
            return !0
        }

        function u(t) {
            return !t || !t.parentNode || 11 === t.parentNode.nodeType
        }

        function s(t, e) {
            do t = t[e]; while (t && 1 !== t.nodeType);
            return t
        }

        function c(t, e, n) {
            if (e = e || 0, K.isFunction(e)) return K.grep(t, function(t, r) {
                var i = !!e.call(t, r, t);
                return i === n
            });
            if (e.nodeType) return K.grep(t, function(t) {
                return t === e === n
            });
            if ("string" == typeof e) {
                var r = K.grep(t, function(t) {
                    return 1 === t.nodeType
                });
                if (qe.test(e)) return K.filter(e, r, !n);
                e = K.filter(e, r)
            }
            return K.grep(t, function(t) {
                return K.inArray(t, e) >= 0 === n
            })
        }

        function l(t) {
            var e = Ye.split("|"),
                n = t.createDocumentFragment();
            if (n.createElement)
                for (; e.length;) n.createElement(e.pop());
            return n
        }

        function f(t, e) {
            return t.getElementsByTagName(e)[0] || t.appendChild(t.ownerDocument.createElement(e))
        }

        function h(t, e) {
            if (1 === e.nodeType && K.hasData(t)) {
                var n, r, i, o = K._data(t),
                    a = K._data(e, o),
                    u = o.events;
                if (u) {
                    delete a.handle, a.events = {};
                    for (n in u)
                        for (r = 0, i = u[n].length; i > r; r++) K.event.add(e, n, u[n][r])
                }
                a.data && (a.data = K.extend({}, a.data))
            }
        }

        function d(t, e) {
            var n;
            1 === e.nodeType && (e.clearAttributes && e.clearAttributes(), e.mergeAttributes && e.mergeAttributes(t), n = e.nodeName.toLowerCase(), "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), K.support.html5Clone && t.innerHTML && !K.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && Ze.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.selected = t.defaultSelected : "input" === n || "textarea" === n ? e.defaultValue = t.defaultValue : "script" === n && e.text !== t.text && (e.text = t.text), e.removeAttribute(K.expando))
        }

        function p(t) {
            return t.getElementsByTagName !== void 0 ? t.getElementsByTagName("*") : t.querySelectorAll !== void 0 ? t.querySelectorAll("*") : []
        }

        function g(t) {
            Ze.test(t.type) && (t.defaultChecked = t.checked)
        }

        function m(t, e) {
            if (e in t) return e;
            for (var n = e.charAt(0).toUpperCase() + e.slice(1), r = e, i = yn.length; i--;)
                if (e = yn[i] + n, e in t) return e;
            return r
        }

        function v(t, e) {
            return t = e || t, "none" === K.css(t, "display") || !K.contains(t.ownerDocument, t)
        }

        function y(t, e) {
            for (var n, r, i = [], o = 0, a = t.length; a > o; o++) n = t[o], n.style && (i[o] = K._data(n, "olddisplay"), e ? (!i[o] && "none" === n.style.display && (n.style.display = ""), "" === n.style.display && v(n) && (i[o] = K._data(n, "olddisplay", _(n.nodeName)))) : (r = nn(n, "display"), !i[o] && "none" !== r && K._data(n, "olddisplay", r)));
            for (o = 0; a > o; o++) n = t[o], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? i[o] || "" : "none"));
            return t
        }

        function x(t, e, n) {
            var r = fn.exec(e);
            return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : e
        }

        function b(t, e, n, r) {
            for (var i = n === (r ? "border" : "content") ? 4 : "width" === e ? 1 : 0, o = 0; 4 > i; i += 2) "margin" === n && (o += K.css(t, n + vn[i], !0)), r ? ("content" === n && (o -= parseFloat(nn(t, "padding" + vn[i])) || 0), "margin" !== n && (o -= parseFloat(nn(t, "border" + vn[i] + "Width")) || 0)) : (o += parseFloat(nn(t, "padding" + vn[i])) || 0, "padding" !== n && (o += parseFloat(nn(t, "border" + vn[i] + "Width")) || 0));
            return o
        }

        function M(t, e, n) {
            var r = "width" === e ? t.offsetWidth : t.offsetHeight,
                i = !0,
                o = K.support.boxSizing && "border-box" === K.css(t, "boxSizing");
            if (0 >= r || null == r) {
                if (r = nn(t, e), (0 > r || null == r) && (r = t.style[e]), hn.test(r)) return r;
                i = o && (K.support.boxSizingReliable || r === t.style[e]), r = parseFloat(r) || 0
            }
            return r + b(t, e, n || (o ? "border" : "content"), i) + "px"
        }

        function _(t) {
            if (pn[t]) return pn[t];
            var e = K("<" + t + ">").appendTo(R.body),
                n = e.css("display");
            return e.remove(), ("none" === n || "" === n) && (rn = R.body.appendChild(rn || K.extend(R.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            })), on && rn.createElement || (on = (rn.contentWindow || rn.contentDocument).document, on.write("<!doctype html><html><body>"), on.close()), e = on.body.appendChild(on.createElement(t)), n = nn(e, "display"), R.body.removeChild(rn)), pn[t] = n, n
        }

        function w(t, e, n, r) {
            var i;
            if (K.isArray(e)) K.each(e, function(e, i) {
                n || Mn.test(t) ? r(t, i) : w(t + "[" + ("object" == typeof i ? e : "") + "]", i, n, r)
            });
            else if (n || "object" !== K.type(e)) r(t, e);
            else
                for (i in e) w(t + "[" + i + "]", e[i], n, r)
        }

        function k(t) {
            return function(e, n) {
                "string" != typeof e && (n = e, e = "*");
                var r, i, o, a = e.toLowerCase().split(ee),
                    u = 0,
                    s = a.length;
                if (K.isFunction(n))
                    for (; s > u; u++) r = a[u], o = /^\+/.test(r), o && (r = r.substr(1) || "*"), i = t[r] = t[r] || [], i[o ? "unshift" : "push"](n)
            }
        }

        function T(t, n, r, i, o, a) {
            o = o || n.dataTypes[0], a = a || {}, a[o] = !0;
            for (var u, s = t[o], c = 0, l = s ? s.length : 0, f = t === On; l > c && (f || !u); c++) u = s[c](n, r, i), "string" == typeof u && (!f || a[u] ? u = e : (n.dataTypes.unshift(u), u = T(t, n, r, i, u, a)));
            return (f || !u) && !a["*"] && (u = T(t, n, r, i, "*", a)), u
        }

        function S(t, n) {
            var r, i, o = K.ajaxSettings.flatOptions || {};
            for (r in n) n[r] !== e && ((o[r] ? t : i || (i = {}))[r] = n[r]);
            i && K.extend(!0, t, i)
        }

        function E(t, n, r) {
            var i, o, a, u, s = t.contents,
                c = t.dataTypes,
                l = t.responseFields;
            for (o in l) o in r && (n[l[o]] = r[o]);
            for (;
                "*" === c[0];) c.shift(), i === e && (i = t.mimeType || n.getResponseHeader("content-type"));
            if (i)
                for (o in s)
                    if (s[o] && s[o].test(i)) {
                        c.unshift(o);
                        break
                    }
            if (c[0] in r) a = c[0];
            else {
                for (o in r) {
                    if (!c[0] || t.converters[o + " " + c[0]]) {
                        a = o;
                        break
                    }
                    u || (u = o)
                }
                a = a || u
            }
            return a ? (a !== c[0] && c.unshift(a), r[a]) : void 0
        }

        function N(t, e) {
            var n, r, i, o, a = t.dataTypes.slice(),
                u = a[0],
                s = {},
                c = 0;
            if (t.dataFilter && (e = t.dataFilter(e, t.dataType)), a[1])
                for (n in t.converters) s[n.toLowerCase()] = t.converters[n];
            for (; i = a[++c];)
                if ("*" !== i) {
                    if ("*" !== u && u !== i) {
                        if (n = s[u + " " + i] || s["* " + i], !n)
                            for (r in s)
                                if (o = r.split(" "), o[1] === i && (n = s[u + " " + o[0]] || s["* " + o[0]])) {
                                    n === !0 ? n = s[r] : s[r] !== !0 && (i = o[0], a.splice(c--, 0, i));
                                    break
                                }
                        if (n !== !0)
                            if (n && t["throws"]) e = n(e);
                            else try {
                                e = n(e)
                            } catch (l) {
                                return {
                                    state: "parsererror",
                                    error: n ? l : "No conversion from " + u + " to " + i
                                }
                            }
                    }
                    u = i
                }
            return {
                state: "success",
                data: e
            }
        }

        function C() {
            try {
                return new t.XMLHttpRequest
            } catch (e) {}
        }

        function A() {
            try {
                return new t.ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        }

        function D() {
            return setTimeout(function() {
                Vn = e
            }, 0), Vn = K.now()
        }

        function L(t, e) {
            K.each(e, function(e, n) {
                for (var r = (tr[e] || []).concat(tr["*"]), i = 0, o = r.length; o > i; i++)
                    if (r[i].call(t, e, n)) return
            })
        }

        function H(t, e, n) {
            var r, i = 0,
                o = Qn.length,
                a = K.Deferred().always(function() {
                    delete u.elem
                }),
                u = function() {
                    for (var e = Vn || D(), n = Math.max(0, s.startTime + s.duration - e), r = n / s.duration || 0, i = 1 - r, o = 0, u = s.tweens.length; u > o; o++) s.tweens[o].run(i);
                    return a.notifyWith(t, [s, i, n]), 1 > i && u ? n : (a.resolveWith(t, [s]), !1)
                },
                s = a.promise({
                    elem: t,
                    props: K.extend({}, e),
                    opts: K.extend(!0, {
                        specialEasing: {}
                    }, n),
                    originalProperties: e,
                    originalOptions: n,
                    startTime: Vn || D(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(e, n) {
                        var r = K.Tween(t, s.opts, e, n, s.opts.specialEasing[e] || s.opts.easing);
                        return s.tweens.push(r), r
                    },
                    stop: function(e) {
                        for (var n = 0, r = e ? s.tweens.length : 0; r > n; n++) s.tweens[n].run(1);
                        return e ? a.resolveWith(t, [s, e]) : a.rejectWith(t, [s, e]), this
                    }
                }),
                c = s.props;
            for (j(c, s.opts.specialEasing); o > i; i++)
                if (r = Qn[i].call(s, t, c, s.opts)) return r;
            return L(s, c), K.isFunction(s.opts.start) && s.opts.start.call(t, s), K.fx.timer(K.extend(u, {
                anim: s,
                queue: s.opts.queue,
                elem: t
            })), s.progress(s.opts.progress).done(s.opts.done, s.opts.complete).fail(s.opts.fail).always(s.opts.always)
        }

        function j(t, e) {
            var n, r, i, o, a;
            for (n in t)
                if (r = K.camelCase(n), i = e[r], o = t[n], K.isArray(o) && (i = o[1], o = t[n] = o[0]), n !== r && (t[r] = o, delete t[n]), a = K.cssHooks[r], a && "expand" in a) {
                    o = a.expand(o), delete t[r];
                    for (n in o) n in t || (t[n] = o[n], e[n] = i)
                } else e[r] = i
        }

        function F(t, e, n) {
            var r, i, o, a, u, s, c, l, f, h = this,
                d = t.style,
                p = {},
                g = [],
                m = t.nodeType && v(t);
            n.queue || (l = K._queueHooks(t, "fx"), null == l.unqueued && (l.unqueued = 0, f = l.empty.fire, l.empty.fire = function() {
                l.unqueued || f()
            }), l.unqueued++, h.always(function() {
                h.always(function() {
                    l.unqueued--, K.queue(t, "fx").length || l.empty.fire()
                })
            })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === K.css(t, "display") && "none" === K.css(t, "float") && (K.support.inlineBlockNeedsLayout && "inline" !== _(t.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", K.support.shrinkWrapBlocks || h.done(function() {
                d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
            }));
            for (r in e)
                if (o = e[r], Gn.exec(o)) {
                    if (delete e[r], s = s || "toggle" === o, o === (m ? "hide" : "show")) continue;
                    g.push(r)
                }
            if (a = g.length) {
                u = K._data(t, "fxshow") || K._data(t, "fxshow", {}), "hidden" in u && (m = u.hidden), s && (u.hidden = !m), m ? K(t).show() : h.done(function() {
                    K(t).hide()
                }), h.done(function() {
                    var e;
                    K.removeData(t, "fxshow", !0);
                    for (e in p) K.style(t, e, p[e])
                });
                for (r = 0; a > r; r++) i = g[r], c = h.createTween(i, m ? u[i] : 0), p[i] = u[i] || K.style(t, i), i in u || (u[i] = c.start, m && (c.end = c.start, c.start = "width" === i || "height" === i ? 1 : 0))
            }
        }

        function q(t, e, n, r, i) {
            return new q.prototype.init(t, e, n, r, i)
        }

        function O(t, e) {
            var n, r = {
                    height: t
                },
                i = 0;
            for (e = e ? 1 : 0; 4 > i; i += 2 - e) n = vn[i], r["margin" + n] = r["padding" + n] = t;
            return e && (r.opacity = r.width = t), r
        }

        function P(t) {
            return K.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
        }
        var Y, z, R = t.document,
            $ = t.location,
            B = t.navigator,
            I = t.jQuery,
            W = t.$,
            U = Array.prototype.push,
            X = Array.prototype.slice,
            V = Array.prototype.indexOf,
            Z = Object.prototype.toString,
            G = Object.prototype.hasOwnProperty,
            J = String.prototype.trim,
            K = function(t, e) {
                return new K.fn.init(t, e, Y)
            },
            Q = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
            te = /\S/,
            ee = /\s+/,
            ne = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            re = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
            ie = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            oe = /^[\],:{}\s]*$/,
            ae = /(?:^|:|,)(?:\s*\[)+/g,
            ue = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            se = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
            ce = /^-ms-/,
            le = /-([\da-z])/gi,
            fe = function(t, e) {
                return (e + "").toUpperCase()
            },
            he = function() {
                R.addEventListener ? (R.removeEventListener("DOMContentLoaded", he, !1), K.ready()) : "complete" === R.readyState && (R.detachEvent("onreadystatechange", he), K.ready())
            },
            de = {};
        K.fn = K.prototype = {
            constructor: K,
            init: function(t, n, r) {
                var i, o, a;
                if (!t) return this;
                if (t.nodeType) return this.context = this[0] = t, this.length = 1, this;
                if ("string" == typeof t) {
                    if (i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : re.exec(t), i && (i[1] || !n)) {
                        if (i[1]) return n = n instanceof K ? n[0] : n, a = n && n.nodeType ? n.ownerDocument || n : R, t = K.parseHTML(i[1], a, !0), ie.test(i[1]) && K.isPlainObject(n) && this.attr.call(t, n, !0), K.merge(this, t);
                        if (o = R.getElementById(i[2]), o && o.parentNode) {
                            if (o.id !== i[2]) return r.find(t);
                            this.length = 1, this[0] = o
                        }
                        return this.context = R, this.selector = t, this
                    }
                    return !n || n.jquery ? (n || r).find(t) : this.constructor(n).find(t)
                }
                return K.isFunction(t) ? r.ready(t) : (t.selector !== e && (this.selector = t.selector, this.context = t.context), K.makeArray(t, this))
            },
            selector: "",
            jquery: "1.8.3",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return X.call(this)
            },
            get: function(t) {
                return null == t ? this.toArray() : 0 > t ? this[this.length + t] : this[t]
            },
            pushStack: function(t, e, n) {
                var r = K.merge(this.constructor(), t);
                return r.prevObject = this, r.context = this.context, "find" === e ? r.selector = this.selector + (this.selector ? " " : "") + n : e && (r.selector = this.selector + "." + e + "(" + n + ")"), r
            },
            each: function(t, e) {
                return K.each(this, t, e)
            },
            ready: function(t) {
                return K.ready.promise().done(t), this
            },
            eq: function(t) {
                return t = +t, -1 === t ? this.slice(t) : this.slice(t, t + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            slice: function() {
                return this.pushStack(X.apply(this, arguments), "slice", X.call(arguments).join(","))
            },
            map: function(t) {
                return this.pushStack(K.map(this, function(e, n) {
                    return t.call(e, n, e)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: U,
            sort: [].sort,
            splice: [].splice
        }, K.fn.init.prototype = K.fn, K.extend = K.fn.extend = function() {
            var t, n, r, i, o, a, u = arguments[0] || {},
                s = 1,
                c = arguments.length,
                l = !1;
            for ("boolean" == typeof u && (l = u, u = arguments[1] || {}, s = 2), "object" != typeof u && !K.isFunction(u) && (u = {}), c === s && (u = this, --s); c > s; s++)
                if (null != (t = arguments[s]))
                    for (n in t) r = u[n], i = t[n], u !== i && (l && i && (K.isPlainObject(i) || (o = K.isArray(i))) ? (o ? (o = !1, a = r && K.isArray(r) ? r : []) : a = r && K.isPlainObject(r) ? r : {}, u[n] = K.extend(l, a, i)) : i !== e && (u[n] = i));
            return u
        }, K.extend({
            noConflict: function(e) {
                return t.$ === K && (t.$ = W), e && t.jQuery === K && (t.jQuery = I), K
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(t) {
                t ? K.readyWait++ : K.ready(!0)
            },
            ready: function(t) {
                if (t === !0 ? !--K.readyWait : !K.isReady) {
                    if (!R.body) return setTimeout(K.ready, 1);
                    K.isReady = !0, t !== !0 && --K.readyWait > 0 || (z.resolveWith(R, [K]), K.fn.trigger && K(R).trigger("ready").off("ready"))
                }
            },
            isFunction: function(t) {
                return "function" === K.type(t)
            },
            isArray: Array.isArray || function(t) {
                return "array" === K.type(t)
            },
            isWindow: function(t) {
                return null != t && t == t.window
            },
            isNumeric: function(t) {
                return !isNaN(parseFloat(t)) && isFinite(t)
            },
            type: function(t) {
                return null == t ? t + "" : de[Z.call(t)] || "object"
            },
            isPlainObject: function(t) {
                if (!t || "object" !== K.type(t) || t.nodeType || K.isWindow(t)) return !1;
                try {
                    if (t.constructor && !G.call(t, "constructor") && !G.call(t.constructor.prototype, "isPrototypeOf")) return !1
                } catch (n) {
                    return !1
                }
                var r;
                for (r in t);
                return r === e || G.call(t, r)
            },
            isEmptyObject: function(t) {
                var e;
                for (e in t) return !1;
                return !0
            },
            error: function(t) {
                throw Error(t)
            },
            parseHTML: function(t, e, n) {
                var r;
                return t && "string" == typeof t ? ("boolean" == typeof e && (n = e, e = 0), e = e || R, (r = ie.exec(t)) ? [e.createElement(r[1])] : (r = K.buildFragment([t], e, n ? null : []), K.merge([], (r.cacheable ? K.clone(r.fragment) : r.fragment).childNodes))) : null
            },
            parseJSON: function(e) {
                return e && "string" == typeof e ? (e = K.trim(e), t.JSON && t.JSON.parse ? t.JSON.parse(e) : oe.test(e.replace(ue, "@").replace(se, "]").replace(ae, "")) ? Function("return " + e)() : (K.error("Invalid JSON: " + e), void 0)) : null
            },
            parseXML: function(n) {
                var r, i;
                if (!n || "string" != typeof n) return null;
                try {
                    t.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
                } catch (o) {
                    r = e
                }
                return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && K.error("Invalid XML: " + n), r
            },
            noop: function() {},
            globalEval: function(e) {
                e && te.test(e) && (t.execScript || function(e) {
                    t.eval.call(t, e)
                })(e)
            },
            camelCase: function(t) {
                return t.replace(ce, "ms-").replace(le, fe)
            },
            nodeName: function(t, e) {
                return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
            },
            each: function(t, n, r) {
                var i, o = 0,
                    a = t.length,
                    u = a === e || K.isFunction(t);
                if (r)
                    if (u) {
                        for (i in t)
                            if (n.apply(t[i], r) === !1) break
                    } else
                        for (; a > o && n.apply(t[o++], r) !== !1;);
                else if (u) {
                    for (i in t)
                        if (n.call(t[i], i, t[i]) === !1) break
                } else
                    for (; a > o && n.call(t[o], o, t[o++]) !== !1;);
                return t
            },
            trim: J && !J.call("﻿ ") ? function(t) {
                return null == t ? "" : J.call(t)
            } : function(t) {
                return null == t ? "" : (t + "").replace(ne, "")
            },
            makeArray: function(t, e) {
                var n, r = e || [];
                return null != t && (n = K.type(t), null == t.length || "string" === n || "function" === n || "regexp" === n || K.isWindow(t) ? U.call(r, t) : K.merge(r, t)), r
            },
            inArray: function(t, e, n) {
                var r;
                if (e) {
                    if (V) return V.call(e, t, n);
                    for (r = e.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
                        if (n in e && e[n] === t) return n
                }
                return -1
            },
            merge: function(t, n) {
                var r = n.length,
                    i = t.length,
                    o = 0;
                if ("number" == typeof r)
                    for (; r > o; o++) t[i++] = n[o];
                else
                    for (; n[o] !== e;) t[i++] = n[o++];
                return t.length = i, t
            },
            grep: function(t, e, n) {
                var r, i = [],
                    o = 0,
                    a = t.length;
                for (n = !!n; a > o; o++) r = !!e(t[o], o), n !== r && i.push(t[o]);
                return i
            },
            map: function(t, n, r) {
                var i, o, a = [],
                    u = 0,
                    s = t.length,
                    c = t instanceof K || s !== e && "number" == typeof s && (s > 0 && t[0] && t[s - 1] || 0 === s || K.isArray(t));
                if (c)
                    for (; s > u; u++) i = n(t[u], u, r), null != i && (a[a.length] = i);
                else
                    for (o in t) i = n(t[o], o, r), null != i && (a[a.length] = i);
                return a.concat.apply([], a)
            },
            guid: 1,
            proxy: function(t, n) {
                var r, i, o;
                return "string" == typeof n && (r = t[n], n = t, t = r), K.isFunction(t) ? (i = X.call(arguments, 2), o = function() {
                    return t.apply(n, i.concat(X.call(arguments)))
                }, o.guid = t.guid = t.guid || K.guid++, o) : e
            },
            access: function(t, n, r, i, o, a, u) {
                var s, c = null == r,
                    l = 0,
                    f = t.length;
                if (r && "object" == typeof r) {
                    for (l in r) K.access(t, n, l, r[l], 1, a, i);
                    o = 1
                } else if (i !== e) {
                    if (s = u === e && K.isFunction(i), c && (s ? (s = n, n = function(t, e, n) {
                            return s.call(K(t), n)
                        }) : (n.call(t, i), n = null)), n)
                        for (; f > l; l++) n(t[l], r, s ? i.call(t[l], l, n(t[l], r)) : i, u);
                    o = 1
                }
                return o ? t : c ? n.call(t) : f ? n(t[0], r) : a
            },
            now: function() {
                return (new Date).getTime()
            }
        }), K.ready.promise = function(e) {
            if (!z)
                if (z = K.Deferred(), "complete" === R.readyState) setTimeout(K.ready, 1);
                else if (R.addEventListener) R.addEventListener("DOMContentLoaded", he, !1), t.addEventListener("load", K.ready, !1);
            else {
                R.attachEvent("onreadystatechange", he), t.attachEvent("onload", K.ready);
                var n = !1;
                try {
                    n = null == t.frameElement && R.documentElement
                } catch (r) {}
                n && n.doScroll && function i() {
                    if (!K.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (t) {
                            return setTimeout(i, 50)
                        }
                        K.ready()
                    }
                }()
            }
            return z.promise(e)
        }, K.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(t, e) {
            de["[object " + e + "]"] = e.toLowerCase()
        }), Y = K(R);
        var pe = {};
        K.Callbacks = function(t) {
            t = "string" == typeof t ? pe[t] || n(t) : K.extend({}, t);
            var r, i, o, a, u, s, c = [],
                l = !t.once && [],
                f = function(e) {
                    for (r = t.memory && e, i = !0, s = a || 0, a = 0, u = c.length, o = !0; c && u > s; s++)
                        if (c[s].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
                            r = !1;
                            break
                        }
                    o = !1, c && (l ? l.length && f(l.shift()) : r ? c = [] : h.disable())
                },
                h = {
                    add: function() {
                        if (c) {
                            var e = c.length;
                            (function n(e) {
                                K.each(e, function(e, r) {
                                    var i = K.type(r);
                                    "function" === i ? (!t.unique || !h.has(r)) && c.push(r) : r && r.length && "string" !== i && n(r)
                                })
                            })(arguments), o ? u = c.length : r && (a = e, f(r))
                        }
                        return this
                    },
                    remove: function() {
                        return c && K.each(arguments, function(t, e) {
                            for (var n;
                                (n = K.inArray(e, c, n)) > -1;) c.splice(n, 1), o && (u >= n && u--, s >= n && s--)
                        }), this
                    },
                    has: function(t) {
                        return K.inArray(t, c) > -1
                    },
                    empty: function() {
                        return c = [], this
                    },
                    disable: function() {
                        return c = l = r = e, this
                    },
                    disabled: function() {
                        return !c
                    },
                    lock: function() {
                        return l = e, r || h.disable(), this
                    },
                    locked: function() {
                        return !l
                    },
                    fireWith: function(t, e) {
                        return e = e || [], e = [t, e.slice ? e.slice() : e], c && (!i || l) && (o ? l.push(e) : f(e)), this
                    },
                    fire: function() {
                        return h.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!i
                    }
                };
            return h
        }, K.extend({
            Deferred: function(t) {
                var e = [
                        ["resolve", "done", K.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", K.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", K.Callbacks("memory")]
                    ],
                    n = "pending",
                    r = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return i.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var t = arguments;
                            return K.Deferred(function(n) {
                                K.each(e, function(e, r) {
                                    var o = r[0],
                                        a = t[e];
                                    i[r[1]](K.isFunction(a) ? function() {
                                        var t = a.apply(this, arguments);
                                        t && K.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === i ? n : this, [t])
                                    } : n[o])
                                }), t = null
                            }).promise()
                        },
                        promise: function(t) {
                            return null != t ? K.extend(t, r) : r
                        }
                    },
                    i = {};
                return r.pipe = r.then, K.each(e, function(t, o) {
                    var a = o[2],
                        u = o[3];
                    r[o[1]] = a.add, u && a.add(function() {
                        n = u
                    }, e[1 ^ t][2].disable, e[2][2].lock), i[o[0]] = a.fire, i[o[0] + "With"] = a.fireWith
                }), r.promise(i), t && t.call(i, i), i
            },
            when: function(t) {
                var e, n, r, i = 0,
                    o = X.call(arguments),
                    a = o.length,
                    u = 1 !== a || t && K.isFunction(t.promise) ? a : 0,
                    s = 1 === u ? t : K.Deferred(),
                    c = function(t, n, r) {
                        return function(i) {
                            n[t] = this, r[t] = arguments.length > 1 ? X.call(arguments) : i, r === e ? s.notifyWith(n, r) : --u || s.resolveWith(n, r)
                        }
                    };
                if (a > 1)
                    for (e = Array(a), n = Array(a), r = Array(a); a > i; i++) o[i] && K.isFunction(o[i].promise) ? o[i].promise().done(c(i, r, o)).fail(s.reject).progress(c(i, n, e)) : --u;
                return u || s.resolveWith(r, o), s.promise()
            }
        }), K.support = function() {
            var e, n, r, i, o, a, u, s, c, l, f, h = R.createElement("div");
            if (h.setAttribute("className", "t"), h.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = h.getElementsByTagName("*"), r = h.getElementsByTagName("a")[0], !n || !r || !n.length) return {};
            i = R.createElement("select"), o = i.appendChild(R.createElement("option")), a = h.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", e = {
                leadingWhitespace: 3 === h.firstChild.nodeType,
                tbody: !h.getElementsByTagName("tbody").length,
                htmlSerialize: !!h.getElementsByTagName("link").length,
                style: /top/.test(r.getAttribute("style")),
                hrefNormalized: "/a" === r.getAttribute("href"),
                opacity: /^0.5/.test(r.style.opacity),
                cssFloat: !!r.style.cssFloat,
                checkOn: "on" === a.value,
                optSelected: o.selected,
                getSetAttribute: "t" !== h.className,
                enctype: !!R.createElement("form").enctype,
                html5Clone: "<:nav></:nav>" !== R.createElement("nav").cloneNode(!0).outerHTML,
                boxModel: "CSS1Compat" === R.compatMode,
                submitBubbles: !0,
                changeBubbles: !0,
                focusinBubbles: !1,
                deleteExpando: !0,
                noCloneEvent: !0,
                inlineBlockNeedsLayout: !1,
                shrinkWrapBlocks: !1,
                reliableMarginRight: !0,
                boxSizingReliable: !0,
                pixelPosition: !1
            }, a.checked = !0, e.noCloneChecked = a.cloneNode(!0).checked, i.disabled = !0, e.optDisabled = !o.disabled;
            try {
                delete h.test
            } catch (d) {
                e.deleteExpando = !1
            }
            if (!h.addEventListener && h.attachEvent && h.fireEvent && (h.attachEvent("onclick", f = function() {
                    e.noCloneEvent = !1
                }), h.cloneNode(!0).fireEvent("onclick"), h.detachEvent("onclick", f)), a = R.createElement("input"), a.value = "t", a.setAttribute("type", "radio"), e.radioValue = "t" === a.value, a.setAttribute("checked", "checked"), a.setAttribute("name", "t"), h.appendChild(a), u = R.createDocumentFragment(), u.appendChild(h.lastChild), e.checkClone = u.cloneNode(!0).cloneNode(!0).lastChild.checked, e.appendChecked = a.checked, u.removeChild(a), u.appendChild(h), h.attachEvent)
                for (c in {
                        submit: !0,
                        change: !0,
                        focusin: !0
                    }) s = "on" + c, l = s in h, l || (h.setAttribute(s, "return;"), l = "function" == typeof h[s]), e[c + "Bubbles"] = l;
            return K(function() {
                var n, r, i, o, a = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                    u = R.getElementsByTagName("body")[0];
                u && (n = R.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", u.insertBefore(n, u.firstChild), r = R.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = r.getElementsByTagName("td"), i[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = 0 === i[0].offsetHeight, i[0].style.display = "", i[1].style.display = "none", e.reliableHiddenOffsets = l && 0 === i[0].offsetHeight, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", e.boxSizing = 4 === r.offsetWidth, e.doesNotIncludeMarginInBodyOffset = 1 !== u.offsetTop, t.getComputedStyle && (e.pixelPosition = "1%" !== (t.getComputedStyle(r, null) || {}).top, e.boxSizingReliable = "4px" === (t.getComputedStyle(r, null) || {
                    width: "4px"
                }).width, o = R.createElement("div"), o.style.cssText = r.style.cssText = a, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), e.reliableMarginRight = !parseFloat((t.getComputedStyle(o, null) || {}).marginRight)), r.style.zoom !== void 0 && (r.innerHTML = "", r.style.cssText = a + "width:1px;padding:1px;display:inline;zoom:1", e.inlineBlockNeedsLayout = 3 === r.offsetWidth, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", e.shrinkWrapBlocks = 3 !== r.offsetWidth, n.style.zoom = 1), u.removeChild(n), n = r = i = o = null)
            }), u.removeChild(h), n = r = i = o = a = u = h = null, e
        }();
        var ge = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            me = /([A-Z])/g;
        K.extend({
            cache: {},
            deletedIds: [],
            uuid: 0,
            expando: "jQuery" + (K.fn.jquery + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: !0
            },
            hasData: function(t) {
                return t = t.nodeType ? K.cache[t[K.expando]] : t[K.expando], !!t && !i(t)
            },
            data: function(t, n, r, i) {
                if (K.acceptData(t)) {
                    var o, a, u = K.expando,
                        s = "string" == typeof n,
                        c = t.nodeType,
                        l = c ? K.cache : t,
                        f = c ? t[u] : t[u] && u;
                    if (f && l[f] && (i || l[f].data) || !s || r !== e) return f || (c ? t[u] = f = K.deletedIds.pop() || K.guid++ : f = u), l[f] || (l[f] = {}, c || (l[f].toJSON = K.noop)), ("object" == typeof n || "function" == typeof n) && (i ? l[f] = K.extend(l[f], n) : l[f].data = K.extend(l[f].data, n)), o = l[f], i || (o.data || (o.data = {}), o = o.data), r !== e && (o[K.camelCase(n)] = r), s ? (a = o[n], null == a && (a = o[K.camelCase(n)])) : a = o, a
                }
            },
            removeData: function(t, e, n) {
                if (K.acceptData(t)) {
                    var r, o, a, u = t.nodeType,
                        s = u ? K.cache : t,
                        c = u ? t[K.expando] : K.expando;
                    if (s[c]) {
                        if (e && (r = n ? s[c] : s[c].data)) {
                            K.isArray(e) || (e in r ? e = [e] : (e = K.camelCase(e), e = e in r ? [e] : e.split(" ")));
                            for (o = 0, a = e.length; a > o; o++) delete r[e[o]];
                            if (!(n ? i : K.isEmptyObject)(r)) return
                        }(n || (delete s[c].data, i(s[c]))) && (u ? K.cleanData([t], !0) : K.support.deleteExpando || s != s.window ? delete s[c] : s[c] = null)
                    }
                }
            },
            _data: function(t, e, n) {
                return K.data(t, e, n, !0)
            },
            acceptData: function(t) {
                var e = t.nodeName && K.noData[t.nodeName.toLowerCase()];
                return !e || e !== !0 && t.getAttribute("classid") === e
            }
        }), K.fn.extend({
            data: function(t, n) {
                var i, o, a, u, s, c = this[0],
                    l = 0,
                    f = null;
                if (t === e) {
                    if (this.length && (f = K.data(c), 1 === c.nodeType && !K._data(c, "parsedAttrs"))) {
                        for (a = c.attributes, s = a.length; s > l; l++) u = a[l].name, u.indexOf("data-") || (u = K.camelCase(u.substring(5)), r(c, u, f[u]));
                        K._data(c, "parsedAttrs", !0)
                    }
                    return f
                }
                return "object" == typeof t ? this.each(function() {
                    K.data(this, t)
                }) : (i = t.split(".", 2), i[1] = i[1] ? "." + i[1] : "", o = i[1] + "!", K.access(this, function(n) {
                    return n === e ? (f = this.triggerHandler("getData" + o, [i[0]]), f === e && c && (f = K.data(c, t), f = r(c, t, f)), f === e && i[1] ? this.data(i[0]) : f) : (i[1] = n, this.each(function() {
                        var e = K(this);
                        e.triggerHandler("setData" + o, i), K.data(this, t, n), e.triggerHandler("changeData" + o, i)
                    }), void 0)
                }, null, n, arguments.length > 1, null, !1))
            },
            removeData: function(t) {
                return this.each(function() {
                    K.removeData(this, t)
                })
            }
        }), K.extend({
            queue: function(t, e, n) {
                var r;
                return t ? (e = (e || "fx") + "queue", r = K._data(t, e), n && (!r || K.isArray(n) ? r = K._data(t, e, K.makeArray(n)) : r.push(n)), r || []) : void 0
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var n = K.queue(t, e),
                    r = n.length,
                    i = n.shift(),
                    o = K._queueHooks(t, e),
                    a = function() {
                        K.dequeue(t, e)
                    };
                "inprogress" === i && (i = n.shift(), r--), i && ("fx" === e && n.unshift("inprogress"), delete o.stop, i.call(t, a, o)), !r && o && o.empty.fire()
            },
            _queueHooks: function(t, e) {
                var n = e + "queueHooks";
                return K._data(t, n) || K._data(t, n, {
                    empty: K.Callbacks("once memory").add(function() {
                        K.removeData(t, e + "queue", !0), K.removeData(t, n, !0)
                    })
                })
            }
        }), K.fn.extend({
            queue: function(t, n) {
                var r = 2;
                return "string" != typeof t && (n = t, t = "fx", r--), r > arguments.length ? K.queue(this[0], t) : n === e ? this : this.each(function() {
                    var e = K.queue(this, t, n);
                    K._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && K.dequeue(this, t)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    K.dequeue(this, t)
                })
            },
            delay: function(t, e) {
                return t = K.fx ? K.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, n) {
                    var r = setTimeout(e, t);
                    n.stop = function() {
                        clearTimeout(r)
                    }
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, n) {
                var r, i = 1,
                    o = K.Deferred(),
                    a = this,
                    u = this.length,
                    s = function() {
                        --i || o.resolveWith(a, [a])
                    };
                for ("string" != typeof t && (n = t, t = e), t = t || "fx"; u--;) r = K._data(a[u], t + "queueHooks"), r && r.empty && (i++, r.empty.add(s));
                return s(), o.promise(n)
            }
        });
        var ve, ye, xe, be = /[\t\r\n]/g,
            Me = /\r/g,
            _e = /^(?:button|input)$/i,
            we = /^(?:button|input|object|select|textarea)$/i,
            ke = /^a(?:rea|)$/i,
            Te = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            Se = K.support.getSetAttribute;
        K.fn.extend({
            attr: function(t, e) {
                return K.access(this, K.attr, t, e, arguments.length > 1)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    K.removeAttr(this, t)
                })
            },
            prop: function(t, e) {
                return K.access(this, K.prop, t, e, arguments.length > 1)
            },
            removeProp: function(t) {
                return t = K.propFix[t] || t, this.each(function() {
                    try {
                        this[t] = e, delete this[t]
                    } catch (n) {}
                })
            },
            addClass: function(t) {
                var e, n, r, i, o, a, u;
                if (K.isFunction(t)) return this.each(function(e) {
                    K(this).addClass(t.call(this, e, this.className))
                });
                if (t && "string" == typeof t)
                    for (e = t.split(ee), n = 0, r = this.length; r > n; n++)
                        if (i = this[n], 1 === i.nodeType)
                            if (i.className || 1 !== e.length) {
                                for (o = " " + i.className + " ", a = 0, u = e.length; u > a; a++) 0 > o.indexOf(" " + e[a] + " ") && (o += e[a] + " ");
                                i.className = K.trim(o)
                            } else i.className = t;
                return this
            },
            removeClass: function(t) {
                var n, r, i, o, a, u, s;
                if (K.isFunction(t)) return this.each(function(e) {
                    K(this).removeClass(t.call(this, e, this.className))
                });
                if (t && "string" == typeof t || t === e)
                    for (n = (t || "").split(ee), u = 0, s = this.length; s > u; u++)
                        if (i = this[u], 1 === i.nodeType && i.className) {
                            for (r = (" " + i.className + " ").replace(be, " "), o = 0, a = n.length; a > o; o++)
                                for (; r.indexOf(" " + n[o] + " ") >= 0;) r = r.replace(" " + n[o] + " ", " ");
                            i.className = t ? K.trim(r) : ""
                        }
                return this
            },
            toggleClass: function(t, e) {
                var n = typeof t,
                    r = "boolean" == typeof e;
                return K.isFunction(t) ? this.each(function(n) {
                    K(this).toggleClass(t.call(this, n, this.className, e), e)
                }) : this.each(function() {
                    if ("string" === n)
                        for (var i, o = 0, a = K(this), u = e, s = t.split(ee); i = s[o++];) u = r ? u : !a.hasClass(i), a[u ? "addClass" : "removeClass"](i);
                    else("undefined" === n || "boolean" === n) && (this.className && K._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : K._data(this, "__className__") || "")
                })
            },
            hasClass: function(t) {
                for (var e = " " + t + " ", n = 0, r = this.length; r > n; n++)
                    if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(be, " ").indexOf(e) >= 0) return !0;
                return !1
            },
            val: function(t) {
                var n, r, i, o = this[0]; {
                    if (arguments.length) return i = K.isFunction(t), this.each(function(r) {
                        var o, a = K(this);
                        1 === this.nodeType && (o = i ? t.call(this, r, a.val()) : t, null == o ? o = "" : "number" == typeof o ? o += "" : K.isArray(o) && (o = K.map(o, function(t) {
                            return null == t ? "" : t + ""
                        })), n = K.valHooks[this.type] || K.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, o, "value") !== e || (this.value = o))
                    });
                    if (o) return n = K.valHooks[o.type] || K.valHooks[o.nodeName.toLowerCase()], n && "get" in n && (r = n.get(o, "value")) !== e ? r : (r = o.value, "string" == typeof r ? r.replace(Me, "") : null == r ? "" : r)
                }
            }
        }), K.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = t.attributes.value;
                        return !e || e.specified ? t.value : t.text
                    }
                },
                select: {
                    get: function(t) {
                        for (var e, n, r = t.options, i = t.selectedIndex, o = "select-one" === t.type || 0 > i, a = o ? null : [], u = o ? i + 1 : r.length, s = 0 > i ? u : o ? i : 0; u > s; s++)
                            if (n = r[s], !(!n.selected && s !== i || (K.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && K.nodeName(n.parentNode, "optgroup"))) {
                                if (e = K(n).val(), o) return e;
                                a.push(e)
                            }
                        return a
                    },
                    set: function(t, e) {
                        var n = K.makeArray(e);
                        return K(t).find("option").each(function() {
                            this.selected = K.inArray(K(this).val(), n) >= 0
                        }), n.length || (t.selectedIndex = -1), n
                    }
                }
            },
            attrFn: {},
            attr: function(t, n, r, i) {
                var o, a, u, s = t.nodeType;
                if (t && 3 !== s && 8 !== s && 2 !== s) return i && K.isFunction(K.fn[n]) ? K(t)[n](r) : t.getAttribute === void 0 ? K.prop(t, n, r) : (u = 1 !== s || !K.isXMLDoc(t), u && (n = n.toLowerCase(), a = K.attrHooks[n] || (Te.test(n) ? ye : ve)), r !== e ? null === r ? (K.removeAttr(t, n), void 0) : a && "set" in a && u && (o = a.set(t, r, n)) !== e ? o : (t.setAttribute(n, r + ""), r) : a && "get" in a && u && null !== (o = a.get(t, n)) ? o : (o = t.getAttribute(n), null === o ? e : o))
            },
            removeAttr: function(t, e) {
                var n, r, i, o, a = 0;
                if (e && 1 === t.nodeType)
                    for (r = e.split(ee); r.length > a; a++) i = r[a], i && (n = K.propFix[i] || i, o = Te.test(i), o || K.attr(t, i, ""), t.removeAttribute(Se ? i : n), o && n in t && (t[n] = !1))
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (_e.test(t.nodeName) && t.parentNode) K.error("type property can't be changed");
                        else if (!K.support.radioValue && "radio" === e && K.nodeName(t, "input")) {
                            var n = t.value;
                            return t.setAttribute("type", e), n && (t.value = n), e
                        }
                    }
                },
                value: {
                    get: function(t, e) {
                        return ve && K.nodeName(t, "button") ? ve.get(t, e) : e in t ? t.value : null
                    },
                    set: function(t, e, n) {
                        return ve && K.nodeName(t, "button") ? ve.set(t, e, n) : (t.value = e, void 0)
                    }
                }
            },
            propFix: {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            },
            prop: function(t, n, r) {
                var i, o, a, u = t.nodeType;
                if (t && 3 !== u && 8 !== u && 2 !== u) return a = 1 !== u || !K.isXMLDoc(t), a && (n = K.propFix[n] || n, o = K.propHooks[n]), r !== e ? o && "set" in o && (i = o.set(t, r, n)) !== e ? i : t[n] = r : o && "get" in o && null !== (i = o.get(t, n)) ? i : t[n]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var n = t.getAttributeNode("tabindex");
                        return n && n.specified ? parseInt(n.value, 10) : we.test(t.nodeName) || ke.test(t.nodeName) && t.href ? 0 : e
                    }
                }
            }
        }), ye = {
            get: function(t, n) {
                var r, i = K.prop(t, n);
                return i === !0 || "boolean" != typeof i && (r = t.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : e
            },
            set: function(t, e, n) {
                var r;
                return e === !1 ? K.removeAttr(t, n) : (r = K.propFix[n] || n, r in t && (t[r] = !0), t.setAttribute(n, n.toLowerCase())), n
            }
        }, Se || (xe = {
            name: !0,
            id: !0,
            coords: !0
        }, ve = K.valHooks.button = {
            get: function(t, n) {
                var r;
                return r = t.getAttributeNode(n), r && (xe[n] ? "" !== r.value : r.specified) ? r.value : e
            },
            set: function(t, e, n) {
                var r = t.getAttributeNode(n);
                return r || (r = R.createAttribute(n), t.setAttributeNode(r)), r.value = e + ""
            }
        }, K.each(["width", "height"], function(t, e) {
            K.attrHooks[e] = K.extend(K.attrHooks[e], {
                set: function(t, n) {
                    return "" === n ? (t.setAttribute(e, "auto"), n) : void 0
                }
            })
        }), K.attrHooks.contenteditable = {
            get: ve.get,
            set: function(t, e, n) {
                "" === e && (e = "false"), ve.set(t, e, n)
            }
        }), K.support.hrefNormalized || K.each(["href", "src", "width", "height"], function(t, n) {
            K.attrHooks[n] = K.extend(K.attrHooks[n], {
                get: function(t) {
                    var r = t.getAttribute(n, 2);
                    return null === r ? e : r
                }
            })
        }), K.support.style || (K.attrHooks.style = {
            get: function(t) {
                return t.style.cssText.toLowerCase() || e
            },
            set: function(t, e) {
                return t.style.cssText = e + ""
            }
        }), K.support.optSelected || (K.propHooks.selected = K.extend(K.propHooks.selected, {
            get: function(t) {
                var e = t.parentNode;
                return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
            }
        })), K.support.enctype || (K.propFix.enctype = "encoding"), K.support.checkOn || K.each(["radio", "checkbox"], function() {
            K.valHooks[this] = {
                get: function(t) {
                    return null === t.getAttribute("value") ? "on" : t.value
                }
            }
        }), K.each(["radio", "checkbox"], function() {
            K.valHooks[this] = K.extend(K.valHooks[this], {
                set: function(t, e) {
                    return K.isArray(e) ? t.checked = K.inArray(K(t).val(), e) >= 0 : void 0
                }
            })
        });
        var Ee = /^(?:textarea|input|select)$/i,
            Ne = /^([^\.]*|)(?:\.(.+)|)$/,
            Ce = /(?:^|\s)hover(\.\S+|)\b/,
            Ae = /^key/,
            De = /^(?:mouse|contextmenu)|click/,
            Le = /^(?:focusinfocus|focusoutblur)$/,
            He = function(t) {
                return K.event.special.hover ? t : t.replace(Ce, "mouseenter$1 mouseleave$1")
            };
        K.event = {
                add: function(t, n, r, i, o) {
                    var a, u, s, c, l, f, h, d, p, g, m;
                    if (3 !== t.nodeType && 8 !== t.nodeType && n && r && (a = K._data(t))) {
                        for (r.handler && (p = r, r = p.handler, o = p.selector), r.guid || (r.guid = K.guid++), s = a.events, s || (a.events = s = {}), u = a.handle, u || (a.handle = u = function(t) {
                                return K === void 0 || t && K.event.triggered === t.type ? e : K.event.dispatch.apply(u.elem, arguments)
                            }, u.elem = t), n = K.trim(He(n)).split(" "), c = 0; n.length > c; c++) l = Ne.exec(n[c]) || [], f = l[1], h = (l[2] || "").split(".").sort(), m = K.event.special[f] || {}, f = (o ? m.delegateType : m.bindType) || f, m = K.event.special[f] || {}, d = K.extend({
                            type: f,
                            origType: l[1],
                            data: i,
                            handler: r,
                            guid: r.guid,
                            selector: o,
                            needsContext: o && K.expr.match.needsContext.test(o),
                            namespace: h.join(".")
                        }, p), g = s[f], g || (g = s[f] = [], g.delegateCount = 0, m.setup && m.setup.call(t, i, h, u) !== !1 || (t.addEventListener ? t.addEventListener(f, u, !1) : t.attachEvent && t.attachEvent("on" + f, u))), m.add && (m.add.call(t, d), d.handler.guid || (d.handler.guid = r.guid)), o ? g.splice(g.delegateCount++, 0, d) : g.push(d), K.event.global[f] = !0;
                        t = null
                    }
                },
                global: {},
                remove: function(t, e, n, r, i) {
                    var o, a, u, s, c, l, f, h, d, p, g, m = K.hasData(t) && K._data(t);
                    if (m && (h = m.events)) {
                        for (e = K.trim(He(e || "")).split(" "), o = 0; e.length > o; o++)
                            if (a = Ne.exec(e[o]) || [], u = s = a[1], c = a[2], u) {
                                for (d = K.event.special[u] || {}, u = (r ? d.delegateType : d.bindType) || u, p = h[u] || [], l = p.length, c = c ? RegExp("(^|\\.)" + c.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, f = 0; p.length > f; f++) g = p[f], !(!i && s !== g.origType || n && n.guid !== g.guid || c && !c.test(g.namespace) || r && r !== g.selector && ("**" !== r || !g.selector) || (p.splice(f--, 1), g.selector && p.delegateCount--, !d.remove || !d.remove.call(t, g)));
                                0 === p.length && l !== p.length && ((!d.teardown || d.teardown.call(t, c, m.handle) === !1) && K.removeEvent(t, u, m.handle), delete h[u])
                            } else
                                for (u in h) K.event.remove(t, u + e[o], n, r, !0);
                        K.isEmptyObject(h) && (delete m.handle, K.removeData(t, "events", !0))
                    }
                },
                customEvent: {
                    getData: !0,
                    setData: !0,
                    changeData: !0
                },
                trigger: function(n, r, i, o) {
                    if (!i || 3 !== i.nodeType && 8 !== i.nodeType) {
                        var a, u, s, c, l, f, h, d, p, g, m = n.type || n,
                            v = [];
                        if (Le.test(m + K.event.triggered)) return;
                        if (m.indexOf("!") >= 0 && (m = m.slice(0, -1), u = !0), m.indexOf(".") >= 0 && (v = m.split("."), m = v.shift(), v.sort()), (!i || K.event.customEvent[m]) && !K.event.global[m]) return;
                        if (n = "object" == typeof n ? n[K.expando] ? n : new K.Event(m, n) : new K.Event(m), n.type = m, n.isTrigger = !0, n.exclusive = u, n.namespace = v.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, f = 0 > m.indexOf(":") ? "on" + m : "", !i) {
                            a = K.cache;
                            for (s in a) a[s].events && a[s].events[m] && K.event.trigger(n, r, a[s].handle.elem, !0);
                            return
                        }
                        if (n.result = e, n.target || (n.target = i), r = null != r ? K.makeArray(r) : [], r.unshift(n), h = K.event.special[m] || {}, h.trigger && h.trigger.apply(i, r) === !1) return;
                        if (p = [
                                [i, h.bindType || m]
                            ], !o && !h.noBubble && !K.isWindow(i)) {
                            for (g = h.delegateType || m, c = Le.test(g + m) ? i : i.parentNode, l = i; c; c = c.parentNode) p.push([c, g]), l = c;
                            l === (i.ownerDocument || R) && p.push([l.defaultView || l.parentWindow || t, g])
                        }
                        for (s = 0; p.length > s && !n.isPropagationStopped(); s++) c = p[s][0], n.type = p[s][1], d = (K._data(c, "events") || {})[n.type] && K._data(c, "handle"), d && d.apply(c, r), d = f && c[f], d && K.acceptData(c) && d.apply && d.apply(c, r) === !1 && n.preventDefault();
                        return n.type = m, !(o || n.isDefaultPrevented() || h._default && h._default.apply(i.ownerDocument, r) !== !1 || "click" === m && K.nodeName(i, "a") || !K.acceptData(i) || !f || !i[m] || ("focus" === m || "blur" === m) && 0 === n.target.offsetWidth || K.isWindow(i) || (l = i[f], l && (i[f] = null), K.event.triggered = m, i[m](), K.event.triggered = e, !l || !(i[f] = l))), n.result
                    }
                },
                dispatch: function(n) {
                    n = K.event.fix(n || t.event);
                    var r, i, o, a, u, s, c, l, f, h = (K._data(this, "events") || {})[n.type] || [],
                        d = h.delegateCount,
                        p = X.call(arguments),
                        g = !n.exclusive && !n.namespace,
                        m = K.event.special[n.type] || {},
                        v = [];
                    if (p[0] = n, n.delegateTarget = this, !m.preDispatch || m.preDispatch.call(this, n) !== !1) {
                        if (d && (!n.button || "click" !== n.type))
                            for (o = n.target; o != this; o = o.parentNode || this)
                                if (o.disabled !== !0 || "click" !== n.type) {
                                    for (u = {}, c = [], r = 0; d > r; r++) l = h[r], f = l.selector, u[f] === e && (u[f] = l.needsContext ? K(f, this).index(o) >= 0 : K.find(f, this, null, [o]).length), u[f] && c.push(l);
                                    c.length && v.push({
                                        elem: o,
                                        matches: c
                                    })
                                }
                        for (h.length > d && v.push({
                                elem: this,
                                matches: h.slice(d)
                            }), r = 0; v.length > r && !n.isPropagationStopped(); r++)
                            for (s = v[r], n.currentTarget = s.elem, i = 0; s.matches.length > i && !n.isImmediatePropagationStopped(); i++) l = s.matches[i], (g || !n.namespace && !l.namespace || n.namespace_re && n.namespace_re.test(l.namespace)) && (n.data = l.data, n.handleObj = l, a = ((K.event.special[l.origType] || {}).handle || l.handler).apply(s.elem, p), a !== e && (n.result = a, a === !1 && (n.preventDefault(), n.stopPropagation())));
                        return m.postDispatch && m.postDispatch.call(this, n), n.result
                    }
                },
                props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(t, e) {
                        return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(t, n) {
                        var r, i, o, a = n.button,
                            u = n.fromElement;
                        return null == t.pageX && null != n.clientX && (r = t.target.ownerDocument || R, i = r.documentElement, o = r.body, t.pageX = n.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), t.pageY = n.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), !t.relatedTarget && u && (t.relatedTarget = u === t.target ? n.toElement : u), !t.which && a !== e && (t.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), t
                    }
                },
                fix: function(t) {
                    if (t[K.expando]) return t;
                    var e, n, r = t,
                        i = K.event.fixHooks[t.type] || {},
                        o = i.props ? this.props.concat(i.props) : this.props;
                    for (t = K.Event(r), e = o.length; e;) n = o[--e], t[n] = r[n];
                    return t.target || (t.target = r.srcElement || R), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, i.filter ? i.filter(t, r) : t
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        delegateType: "focusin"
                    },
                    blur: {
                        delegateType: "focusout"
                    },
                    beforeunload: {
                        setup: function(t, e, n) {
                            K.isWindow(this) && (this.onbeforeunload = n)
                        },
                        teardown: function(t, e) {
                            this.onbeforeunload === e && (this.onbeforeunload = null)
                        }
                    }
                },
                simulate: function(t, e, n, r) {
                    var i = K.extend(new K.Event, n, {
                        type: t,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    r ? K.event.trigger(i, null, e) : K.event.dispatch.call(e, i), i.isDefaultPrevented() && n.preventDefault()
                }
            }, K.event.handle = K.event.dispatch, K.removeEvent = R.removeEventListener ? function(t, e, n) {
                t.removeEventListener && t.removeEventListener(e, n, !1)
            } : function(t, e, n) {
                var r = "on" + e;
                t.detachEvent && (t[r] === void 0 && (t[r] = null), t.detachEvent(r, n))
            }, K.Event = function(t, e) {
                return this instanceof K.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.returnValue === !1 || t.getPreventDefault && t.getPreventDefault() ? a : o) : this.type = t, e && K.extend(this, e), this.timeStamp = t && t.timeStamp || K.now(), this[K.expando] = !0, void 0) : new K.Event(t, e)
            }, K.Event.prototype = {
                preventDefault: function() {
                    this.isDefaultPrevented = a;
                    var t = this.originalEvent;
                    t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
                },
                stopPropagation: function() {
                    this.isPropagationStopped = a;
                    var t = this.originalEvent;
                    t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    this.isImmediatePropagationStopped = a, this.stopPropagation()
                },
                isDefaultPrevented: o,
                isPropagationStopped: o,
                isImmediatePropagationStopped: o
            }, K.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, function(t, e) {
                K.event.special[t] = {
                    delegateType: e,
                    bindType: e,
                    handle: function(t) {
                        var n, r = this,
                            i = t.relatedTarget,
                            o = t.handleObj;
                        return o.selector, (!i || i !== r && !K.contains(r, i)) && (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
                    }
                }
            }), K.support.submitBubbles || (K.event.special.submit = {
                setup: function() {
                    return K.nodeName(this, "form") ? !1 : (K.event.add(this, "click._submit keypress._submit", function(t) {
                        var n = t.target,
                            r = K.nodeName(n, "input") || K.nodeName(n, "button") ? n.form : e;
                        r && !K._data(r, "_submit_attached") && (K.event.add(r, "submit._submit", function(t) {
                            t._submit_bubble = !0
                        }), K._data(r, "_submit_attached", !0))
                    }), void 0)
                },
                postDispatch: function(t) {
                    t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && K.event.simulate("submit", this.parentNode, t, !0))
                },
                teardown: function() {
                    return K.nodeName(this, "form") ? !1 : (K.event.remove(this, "._submit"), void 0)
                }
            }), K.support.changeBubbles || (K.event.special.change = {
                setup: function() {
                    return Ee.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (K.event.add(this, "propertychange._change", function(t) {
                        "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
                    }), K.event.add(this, "click._change", function(t) {
                        this._just_changed && !t.isTrigger && (this._just_changed = !1), K.event.simulate("change", this, t, !0)
                    })), !1) : (K.event.add(this, "beforeactivate._change", function(t) {
                        var e = t.target;
                        Ee.test(e.nodeName) && !K._data(e, "_change_attached") && (K.event.add(e, "change._change", function(t) {
                            this.parentNode && !t.isSimulated && !t.isTrigger && K.event.simulate("change", this.parentNode, t, !0)
                        }), K._data(e, "_change_attached", !0))
                    }), void 0)
                },
                handle: function(t) {
                    var e = t.target;
                    return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
                },
                teardown: function() {
                    return K.event.remove(this, "._change"), !Ee.test(this.nodeName)
                }
            }), K.support.focusinBubbles || K.each({
                focus: "focusin",
                blur: "focusout"
            }, function(t, e) {
                var n = 0,
                    r = function(t) {
                        K.event.simulate(e, t.target, K.event.fix(t), !0)
                    };
                K.event.special[e] = {
                    setup: function() {
                        0 === n++ && R.addEventListener(t, r, !0)
                    },
                    teardown: function() {
                        0 === --n && R.removeEventListener(t, r, !0)
                    }
                }
            }), K.fn.extend({
                on: function(t, n, r, i, a) {
                    var u, s;
                    if ("object" == typeof t) {
                        "string" != typeof n && (r = r || n, n = e);
                        for (s in t) this.on(s, n, r, t[s], a);
                        return this
                    }
                    if (null == r && null == i ? (i = n, r = n = e) : null == i && ("string" == typeof n ? (i = r, r = e) : (i = r, r = n, n = e)), i === !1) i = o;
                    else if (!i) return this;
                    return 1 === a && (u = i, i = function(t) {
                        return K().off(t), u.apply(this, arguments)
                    }, i.guid = u.guid || (u.guid = K.guid++)), this.each(function() {
                        K.event.add(this, t, i, r, n)
                    })
                },
                one: function(t, e, n, r) {
                    return this.on(t, e, n, r, 1)
                },
                off: function(t, n, r) {
                    var i, a;
                    if (t && t.preventDefault && t.handleObj) return i = t.handleObj, K(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                    if ("object" == typeof t) {
                        for (a in t) this.off(a, n, t[a]);
                        return this
                    }
                    return (n === !1 || "function" == typeof n) && (r = n, n = e), r === !1 && (r = o), this.each(function() {
                        K.event.remove(this, t, r, n)
                    })
                },
                bind: function(t, e, n) {
                    return this.on(t, null, e, n)
                },
                unbind: function(t, e) {
                    return this.off(t, null, e)
                },
                live: function(t, e, n) {
                    return K(this.context).on(t, this.selector, e, n), this
                },
                die: function(t, e) {
                    return K(this.context).off(t, this.selector || "**", e), this
                },
                delegate: function(t, e, n, r) {
                    return this.on(e, t, n, r)
                },
                undelegate: function(t, e, n) {
                    return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
                },
                trigger: function(t, e) {
                    return this.each(function() {
                        K.event.trigger(t, e, this)
                    })
                },
                triggerHandler: function(t, e) {
                    return this[0] ? K.event.trigger(t, e, this[0], !0) : void 0
                },
                toggle: function(t) {
                    var e = arguments,
                        n = t.guid || K.guid++,
                        r = 0,
                        i = function(n) {
                            var i = (K._data(this, "lastToggle" + t.guid) || 0) % r;
                            return K._data(this, "lastToggle" + t.guid, i + 1), n.preventDefault(), e[i].apply(this, arguments) || !1
                        };
                    for (i.guid = n; e.length > r;) e[r++].guid = n;
                    return this.click(i)
                },
                hover: function(t, e) {
                    return this.mouseenter(t).mouseleave(e || t)
                }
            }), K.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
                K.fn[e] = function(t, n) {
                    return null == n && (n = t, t = null), arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
                }, Ae.test(e) && (K.event.fixHooks[e] = K.event.keyHooks), De.test(e) && (K.event.fixHooks[e] = K.event.mouseHooks)
            }),
            function(t, e) {
                function n(t, e, n, r) {
                    n = n || [], e = e || D;
                    var i, o, a, u, s = e.nodeType;
                    if (!t || "string" != typeof t) return n;
                    if (1 !== s && 9 !== s) return [];
                    if (a = M(e), !a && !r && (i = ne.exec(t)))
                        if (u = i[1]) {
                            if (9 === s) {
                                if (o = e.getElementById(u), !o || !o.parentNode) return n;
                                if (o.id === u) return n.push(o), n
                            } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(u)) && _(e, o) && o.id === u) return n.push(o), n
                        } else {
                            if (i[2]) return q.apply(n, O.call(e.getElementsByTagName(t), 0)), n;
                            if ((u = i[3]) && he && e.getElementsByClassName) return q.apply(n, O.call(e.getElementsByClassName(u), 0)), n
                        }
                    return g(t.replace(J, "$1"), e, n, r, a)
                }

                function r(t) {
                    return function(e) {
                        var n = e.nodeName.toLowerCase();
                        return "input" === n && e.type === t
                    }
                }

                function i(t) {
                    return function(e) {
                        var n = e.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && e.type === t
                    }
                }

                function o(t) {
                    return Y(function(e) {
                        return e = +e, Y(function(n, r) {
                            for (var i, o = t([], n.length, e), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                        })
                    })
                }

                function a(t, e, n) {
                    if (t === e) return n;
                    for (var r = t.nextSibling; r;) {
                        if (r === e) return -1;
                        r = r.nextSibling
                    }
                    return 1
                }

                function u(t, e) {
                    var r, i, o, a, u, s, c, l = $[C][t + " "];
                    if (l) return e ? 0 : l.slice(0);
                    for (u = t, s = [], c = x.preFilter; u;) {
                        (!r || (i = Q.exec(u))) && (i && (u = u.slice(i[0].length) || u), s.push(o = [])), r = !1, (i = te.exec(u)) && (o.push(r = new A(i.shift())), u = u.slice(r.length), r.type = i[0].replace(J, " "));
                        for (a in x.filter)(i = ue[a].exec(u)) && (!c[a] || (i = c[a](i))) && (o.push(r = new A(i.shift())), u = u.slice(r.length), r.type = a, r.matches = i);
                        if (!r) break
                    }
                    return e ? u.length : u ? n.error(t) : $(t, s).slice(0)
                }

                function s(t, e, n) {
                    var r = e.dir,
                        i = n && "parentNode" === e.dir,
                        o = j++;
                    return e.first ? function(e, n, o) {
                        for (; e = e[r];)
                            if (i || 1 === e.nodeType) return t(e, n, o)
                    } : function(e, n, a) {
                        if (a) {
                            for (; e = e[r];)
                                if ((i || 1 === e.nodeType) && t(e, n, a)) return e
                        } else
                            for (var u, s = H + " " + o + " ", c = s + v; e = e[r];)
                                if (i || 1 === e.nodeType) {
                                    if ((u = e[C]) === c) return e.sizset;
                                    if ("string" == typeof u && 0 === u.indexOf(s)) {
                                        if (e.sizset) return e
                                    } else {
                                        if (e[C] = c, t(e, n, a)) return e.sizset = !0, e;
                                        e.sizset = !1
                                    }
                                }
                    }
                }

                function c(t) {
                    return t.length > 1 ? function(e, n, r) {
                        for (var i = t.length; i--;)
                            if (!t[i](e, n, r)) return !1;
                        return !0
                    } : t[0]
                }

                function l(t, e, n, r, i) {
                    for (var o, a = [], u = 0, s = t.length, c = null != e; s > u; u++)(o = t[u]) && (!n || n(o, r, i)) && (a.push(o), c && e.push(u));
                    return a
                }

                function f(t, e, n, r, i, o) {
                    return r && !r[C] && (r = f(r)), i && !i[C] && (i = f(i, o)), Y(function(o, a, u, s) {
                        var c, f, h, d = [],
                            g = [],
                            m = a.length,
                            v = o || p(e || "*", u.nodeType ? [u] : u, []),
                            y = !t || !o && e ? v : l(v, d, t, u, s),
                            x = n ? i || (o ? t : m || r) ? [] : a : y;
                        if (n && n(y, x, u, s), r)
                            for (c = l(x, g), r(c, [], u, s), f = c.length; f--;)(h = c[f]) && (x[g[f]] = !(y[g[f]] = h));
                        if (o) {
                            if (i || t) {
                                if (i) {
                                    for (c = [], f = x.length; f--;)(h = x[f]) && c.push(y[f] = h);
                                    i(null, x = [], c, s)
                                }
                                for (f = x.length; f--;)(h = x[f]) && (c = i ? P.call(o, h) : d[f]) > -1 && (o[c] = !(a[c] = h))
                            }
                        } else x = l(x === a ? x.splice(m, x.length) : x), i ? i(null, a, x, s) : q.apply(a, x)
                    })
                }

                function h(t) {
                    for (var e, n, r, i = t.length, o = x.relative[t[0].type], a = o || x.relative[" "], u = o ? 1 : 0, l = s(function(t) {
                            return t === e
                        }, a, !0), d = s(function(t) {
                            return P.call(e, t) > -1
                        }, a, !0), p = [function(t, n, r) {
                            return !o && (r || n !== S) || ((e = n).nodeType ? l(t, n, r) : d(t, n, r))
                        }]; i > u; u++)
                        if (n = x.relative[t[u].type]) p = [s(c(p), n)];
                        else {
                            if (n = x.filter[t[u].type].apply(null, t[u].matches), n[C]) {
                                for (r = ++u; i > r && !x.relative[t[r].type]; r++);
                                return f(u > 1 && c(p), u > 1 && t.slice(0, u - 1).join("").replace(J, "$1"), n, r > u && h(t.slice(u, r)), i > r && h(t = t.slice(r)), i > r && t.join(""))
                            }
                            p.push(n)
                        }
                    return c(p)
                }

                function d(t, e) {
                    var r = e.length > 0,
                        i = t.length > 0,
                        o = function(a, u, s, c, f) {
                            var h, d, p, g = [],
                                m = 0,
                                y = "0",
                                b = a && [],
                                M = null != f,
                                _ = S,
                                w = a || i && x.find.TAG("*", f && u.parentNode || u),
                                k = H += null == _ ? 1 : Math.E;
                            for (M && (S = u !== D && u, v = o.el); null != (h = w[y]); y++) {
                                if (i && h) {
                                    for (d = 0; p = t[d]; d++)
                                        if (p(h, u, s)) {
                                            c.push(h);
                                            break
                                        }
                                    M && (H = k, v = ++o.el)
                                }
                                r && ((h = !p && h) && m--, a && b.push(h))
                            }
                            if (m += y, r && y !== m) {
                                for (d = 0; p = e[d]; d++) p(b, g, u, s);
                                if (a) {
                                    if (m > 0)
                                        for (; y--;) !b[y] && !g[y] && (g[y] = F.call(c));
                                    g = l(g)
                                }
                                q.apply(c, g), M && !a && g.length > 0 && m + e.length > 1 && n.uniqueSort(c)
                            }
                            return M && (H = k, S = _), b
                        };
                    return o.el = 0, r ? Y(o) : o
                }

                function p(t, e, r) {
                    for (var i = 0, o = e.length; o > i; i++) n(t, e[i], r);
                    return r
                }

                function g(t, e, n, r, i) {
                    var o, a, s, c, l, f = u(t);
                    if (f.length, !r && 1 === f.length) {
                        if (a = f[0] = f[0].slice(0), a.length > 2 && "ID" === (s = a[0]).type && 9 === e.nodeType && !i && x.relative[a[1].type]) {
                            if (e = x.find.ID(s.matches[0].replace(ae, ""), e, i)[0], !e) return n;
                            t = t.slice(a.shift().length)
                        }
                        for (o = ue.POS.test(t) ? -1 : a.length - 1; o >= 0 && (s = a[o], !x.relative[c = s.type]); o--)
                            if ((l = x.find[c]) && (r = l(s.matches[0].replace(ae, ""), re.test(a[0].type) && e.parentNode || e, i))) {
                                if (a.splice(o, 1), t = r.length && a.join(""), !t) return q.apply(n, O.call(r, 0)), n;
                                break
                            }
                    }
                    return w(t, f)(r, e, i, n, re.test(t)), n
                }

                function m() {}
                var v, y, x, b, M, _, w, k, T, S, E = !0,
                    N = "undefined",
                    C = ("sizcache" + Math.random()).replace(".", ""),
                    A = String,
                    D = t.document,
                    L = D.documentElement,
                    H = 0,
                    j = 0,
                    F = [].pop,
                    q = [].push,
                    O = [].slice,
                    P = [].indexOf || function(t) {
                        for (var e = 0, n = this.length; n > e; e++)
                            if (this[e] === t) return e;
                        return -1
                    },
                    Y = function(t, e) {
                        return t[C] = null == e || e, t
                    },
                    z = function() {
                        var t = {},
                            e = [];
                        return Y(function(n, r) {
                            return e.push(n) > x.cacheLength && delete t[e.shift()], t[n + " "] = r
                        }, t)
                    },
                    R = z(),
                    $ = z(),
                    B = z(),
                    I = "[\\x20\\t\\r\\n\\f]",
                    W = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
                    U = W.replace("w", "w#"),
                    X = "([*^$|!~]?=)",
                    V = "\\[" + I + "*(" + W + ")" + I + "*(?:" + X + I + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + U + ")|)|)" + I + "*\\]",
                    Z = ":(" + W + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + V + ")|[^:]|\\\\.)*|.*))\\)|)",
                    G = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + I + "*((?:-\\d)?\\d*)" + I + "*\\)|)(?=[^-]|$)",
                    J = RegExp("^" + I + "+|((?:^|[^\\\\])(?:\\\\.)*)" + I + "+$", "g"),
                    Q = RegExp("^" + I + "*," + I + "*"),
                    te = RegExp("^" + I + "*([\\x20\\t\\r\\n\\f>+~])" + I + "*"),
                    ee = RegExp(Z),
                    ne = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
                    re = /[\x20\t\r\n\f]*[+~]/,
                    ie = /h\d/i,
                    oe = /input|select|textarea|button/i,
                    ae = /\\(?!\\)/g,
                    ue = {
                        ID: RegExp("^#(" + W + ")"),
                        CLASS: RegExp("^\\.(" + W + ")"),
                        NAME: RegExp("^\\[name=['\"]?(" + W + ")['\"]?\\]"),
                        TAG: RegExp("^(" + W.replace("w", "w*") + ")"),
                        ATTR: RegExp("^" + V),
                        PSEUDO: RegExp("^" + Z),
                        POS: RegExp(G, "i"),
                        CHILD: RegExp("^:(only|nth|first|last)-child(?:\\(" + I + "*(even|odd|(([+-]|)(\\d*)n|)" + I + "*(?:([+-]|)" + I + "*(\\d+)|))" + I + "*\\)|)", "i"),
                        needsContext: RegExp("^" + I + "*[>+~]|" + G, "i")
                    },
                    se = function(t) {
                        var e = D.createElement("div");
                        try {
                            return t(e)
                        } catch (n) {
                            return !1
                        } finally {
                            e = null
                        }
                    },
                    ce = se(function(t) {
                        return t.appendChild(D.createComment("")), !t.getElementsByTagName("*").length
                    }),
                    le = se(function(t) {
                        return t.innerHTML = "<a href='#'></a>", t.firstChild && typeof t.firstChild.getAttribute !== N && "#" === t.firstChild.getAttribute("href")
                    }),
                    fe = se(function(t) {
                        t.innerHTML = "<select></select>";
                        var e = typeof t.lastChild.getAttribute("multiple");
                        return "boolean" !== e && "string" !== e
                    }),
                    he = se(function(t) {
                        return t.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", t.getElementsByClassName && t.getElementsByClassName("e").length ? (t.lastChild.className = "e", 2 === t.getElementsByClassName("e").length) : !1
                    }),
                    de = se(function(t) {
                        t.id = C + 0, t.innerHTML = "<a name='" + C + "'></a><div name='" + C + "'></div>", L.insertBefore(t, L.firstChild);
                        var e = D.getElementsByName && D.getElementsByName(C).length === 2 + D.getElementsByName(C + 0).length;
                        return y = !D.getElementById(C), L.removeChild(t), e
                    });
                try {
                    O.call(L.childNodes, 0)[0].nodeType
                } catch (pe) {
                    O = function(t) {
                        for (var e, n = []; e = this[t]; t++) n.push(e);
                        return n
                    }
                }
                n.matches = function(t, e) {
                    return n(t, null, null, e)
                }, n.matchesSelector = function(t, e) {
                    return n(e, null, null, [t]).length > 0
                }, b = n.getText = function(t) {
                    var e, n = "",
                        r = 0,
                        i = t.nodeType;
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling) n += b(t)
                        } else if (3 === i || 4 === i) return t.nodeValue
                    } else
                        for (; e = t[r]; r++) n += b(e);
                    return n
                }, M = n.isXML = function(t) {
                    var e = t && (t.ownerDocument || t).documentElement;
                    return e ? "HTML" !== e.nodeName : !1
                }, _ = n.contains = L.contains ? function(t, e) {
                    var n = 9 === t.nodeType ? t.documentElement : t,
                        r = e && e.parentNode;
                    return t === r || !!(r && 1 === r.nodeType && n.contains && n.contains(r))
                } : L.compareDocumentPosition ? function(t, e) {
                    return e && !!(16 & t.compareDocumentPosition(e))
                } : function(t, e) {
                    for (; e = e.parentNode;)
                        if (e === t) return !0;
                    return !1
                }, n.attr = function(t, e) {
                    var n, r = M(t);
                    return r || (e = e.toLowerCase()), (n = x.attrHandle[e]) ? n(t) : r || fe ? t.getAttribute(e) : (n = t.getAttributeNode(e), n ? "boolean" == typeof t[e] ? t[e] ? e : null : n.specified ? n.value : null : null)
                }, x = n.selectors = {
                    cacheLength: 50,
                    createPseudo: Y,
                    match: ue,
                    attrHandle: le ? {} : {
                        href: function(t) {
                            return t.getAttribute("href", 2)
                        },
                        type: function(t) {
                            return t.getAttribute("type")
                        }
                    },
                    find: {
                        ID: y ? function(t, e, n) {
                            if (typeof e.getElementById !== N && !n) {
                                var r = e.getElementById(t);
                                return r && r.parentNode ? [r] : []
                            }
                        } : function(t, n, r) {
                            if (typeof n.getElementById !== N && !r) {
                                var i = n.getElementById(t);
                                return i ? i.id === t || typeof i.getAttributeNode !== N && i.getAttributeNode("id").value === t ? [i] : e : []
                            }
                        },
                        TAG: ce ? function(t, e) {
                            return typeof e.getElementsByTagName !== N ? e.getElementsByTagName(t) : void 0
                        } : function(t, e) {
                            var n = e.getElementsByTagName(t);
                            if ("*" === t) {
                                for (var r, i = [], o = 0; r = n[o]; o++) 1 === r.nodeType && i.push(r);
                                return i
                            }
                            return n
                        },
                        NAME: de && function(t, e) {
                            return typeof e.getElementsByName !== N ? e.getElementsByName(name) : void 0
                        },
                        CLASS: he && function(t, e, n) {
                            return typeof e.getElementsByClassName === N || n ? void 0 : e.getElementsByClassName(t)
                        }
                    },
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(t) {
                            return t[1] = t[1].replace(ae, ""), t[3] = (t[4] || t[5] || "").replace(ae, ""), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                        },
                        CHILD: function(t) {
                            return t[1] = t[1].toLowerCase(), "nth" === t[1] ? (t[2] || n.error(t[0]), t[3] = +(t[3] ? t[4] + (t[5] || 1) : 2 * ("even" === t[2] || "odd" === t[2])), t[4] = +(t[6] + t[7] || "odd" === t[2])) : t[2] && n.error(t[0]), t
                        },
                        PSEUDO: function(t) {
                            var e, n;
                            return ue.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[3] : (e = t[4]) && (ee.test(e) && (n = u(e, !0)) && (n = e.indexOf(")", e.length - n) - e.length) && (e = e.slice(0, n), t[0] = t[0].slice(0, n)), t[2] = e), t.slice(0, 3))
                        }
                    },
                    filter: {
                        ID: y ? function(t) {
                            return t = t.replace(ae, ""),
                                function(e) {
                                    return e.getAttribute("id") === t
                                }
                        } : function(t) {
                            return t = t.replace(ae, ""),
                                function(e) {
                                    var n = typeof e.getAttributeNode !== N && e.getAttributeNode("id");
                                    return n && n.value === t
                                }
                        },
                        TAG: function(t) {
                            return "*" === t ? function() {
                                return !0
                            } : (t = t.replace(ae, "").toLowerCase(), function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            })
                        },
                        CLASS: function(t) {
                            var e = R[C][t + " "];
                            return e || (e = RegExp("(^|" + I + ")" + t + "(" + I + "|$)")) && R(t, function(t) {
                                return e.test(t.className || typeof t.getAttribute !== N && t.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(t, e, r) {
                            return function(i) {
                                var o = n.attr(i, t);
                                return null == o ? "!=" === e : e ? (o += "", "=" === e ? o === r : "!=" === e ? o !== r : "^=" === e ? r && 0 === o.indexOf(r) : "*=" === e ? r && o.indexOf(r) > -1 : "$=" === e ? r && o.substr(o.length - r.length) === r : "~=" === e ? (" " + o + " ").indexOf(r) > -1 : "|=" === e ? o === r || o.substr(0, r.length + 1) === r + "-" : !1) : !0
                            }
                        },
                        CHILD: function(t, e, n, r) {
                            return "nth" === t ? function(t) {
                                var e, i, o = t.parentNode;
                                if (1 === n && 0 === r) return !0;
                                if (o)
                                    for (i = 0, e = o.firstChild; e && (1 !== e.nodeType || (i++, t !== e)); e = e.nextSibling);
                                return i -= r, i === n || 0 === i % n && i / n >= 0
                            } : function(e) {
                                var n = e;
                                switch (t) {
                                    case "only":
                                    case "first":
                                        for (; n = n.previousSibling;)
                                            if (1 === n.nodeType) return !1;
                                        if ("first" === t) return !0;
                                        n = e;
                                    case "last":
                                        for (; n = n.nextSibling;)
                                            if (1 === n.nodeType) return !1;
                                        return !0
                                }
                            }
                        },
                        PSEUDO: function(t, e) {
                            var r, i = x.pseudos[t] || x.setFilters[t.toLowerCase()] || n.error("unsupported pseudo: " + t);
                            return i[C] ? i(e) : i.length > 1 ? (r = [t, t, "", e], x.setFilters.hasOwnProperty(t.toLowerCase()) ? Y(function(t, n) {
                                for (var r, o = i(t, e), a = o.length; a--;) r = P.call(t, o[a]), t[r] = !(n[r] = o[a])
                            }) : function(t) {
                                return i(t, 0, r)
                            }) : i
                        }
                    },
                    pseudos: {
                        not: Y(function(t) {
                            var e = [],
                                n = [],
                                r = w(t.replace(J, "$1"));
                            return r[C] ? Y(function(t, e, n, i) {
                                for (var o, a = r(t, null, i, []), u = t.length; u--;)(o = a[u]) && (t[u] = !(e[u] = o))
                            }) : function(t, i, o) {
                                return e[0] = t, r(e, null, o, n), !n.pop()
                            }
                        }),
                        has: Y(function(t) {
                            return function(e) {
                                return n(t, e).length > 0
                            }
                        }),
                        contains: Y(function(t) {
                            return function(e) {
                                return (e.textContent || e.innerText || b(e)).indexOf(t) > -1
                            }
                        }),
                        enabled: function(t) {
                            return t.disabled === !1
                        },
                        disabled: function(t) {
                            return t.disabled === !0
                        },
                        checked: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && !!t.checked || "option" === e && !!t.selected
                        },
                        selected: function(t) {
                            return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                        },
                        parent: function(t) {
                            return !x.pseudos.empty(t)
                        },
                        empty: function(t) {
                            var e;
                            for (t = t.firstChild; t;) {
                                if (t.nodeName > "@" || 3 === (e = t.nodeType) || 4 === e) return !1;
                                t = t.nextSibling
                            }
                            return !0
                        },
                        header: function(t) {
                            return ie.test(t.nodeName)
                        },
                        text: function(t) {
                            var e, n;
                            return "input" === t.nodeName.toLowerCase() && "text" === (e = t.type) && (null == (n = t.getAttribute("type")) || n.toLowerCase() === e)
                        },
                        radio: r("radio"),
                        checkbox: r("checkbox"),
                        file: r("file"),
                        password: r("password"),
                        image: r("image"),
                        submit: i("submit"),
                        reset: i("reset"),
                        button: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && "button" === t.type || "button" === e
                        },
                        input: function(t) {
                            return oe.test(t.nodeName)
                        },
                        focus: function(t) {
                            var e = t.ownerDocument;
                            return t === e.activeElement && (!e.hasFocus || e.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                        },
                        active: function(t) {
                            return t === t.ownerDocument.activeElement
                        },
                        first: o(function() {
                            return [0]
                        }),
                        last: o(function(t, e) {
                            return [e - 1]
                        }),
                        eq: o(function(t, e, n) {
                            return [0 > n ? n + e : n]
                        }),
                        even: o(function(t, e) {
                            for (var n = 0; e > n; n += 2) t.push(n);
                            return t
                        }),
                        odd: o(function(t, e) {
                            for (var n = 1; e > n; n += 2) t.push(n);
                            return t
                        }),
                        lt: o(function(t, e, n) {
                            for (var r = 0 > n ? n + e : n; --r >= 0;) t.push(r);
                            return t
                        }),
                        gt: o(function(t, e, n) {
                            for (var r = 0 > n ? n + e : n; e > ++r;) t.push(r);
                            return t
                        })
                    }
                }, k = L.compareDocumentPosition ? function(t, e) {
                    return t === e ? (T = !0, 0) : (t.compareDocumentPosition && e.compareDocumentPosition ? 4 & t.compareDocumentPosition(e) : t.compareDocumentPosition) ? -1 : 1
                } : function(t, e) {
                    if (t === e) return T = !0, 0;
                    if (t.sourceIndex && e.sourceIndex) return t.sourceIndex - e.sourceIndex;
                    var n, r, i = [],
                        o = [],
                        u = t.parentNode,
                        s = e.parentNode,
                        c = u;
                    if (u === s) return a(t, e);
                    if (!u) return -1;
                    if (!s) return 1;
                    for (; c;) i.unshift(c), c = c.parentNode;
                    for (c = s; c;) o.unshift(c), c = c.parentNode;
                    n = i.length, r = o.length;
                    for (var l = 0; n > l && r > l; l++)
                        if (i[l] !== o[l]) return a(i[l], o[l]);
                    return l === n ? a(t, o[l], -1) : a(i[l], e, 1)
                }, [0, 0].sort(k), E = !T, n.uniqueSort = function(t) {
                    var e, n = [],
                        r = 1,
                        i = 0;
                    if (T = E, t.sort(k), T) {
                        for (; e = t[r]; r++) e === t[r - 1] && (i = n.push(r));
                        for (; i--;) t.splice(n[i], 1)
                    }
                    return t
                }, n.error = function(t) {
                    throw Error("Syntax error, unrecognized expression: " + t)
                }, w = n.compile = function(t, e) {
                    var n, r = [],
                        i = [],
                        o = B[C][t + " "];
                    if (!o) {
                        for (e || (e = u(t)), n = e.length; n--;) o = h(e[n]), o[C] ? r.push(o) : i.push(o);
                        o = B(t, d(i, r))
                    }
                    return o
                }, D.querySelectorAll && function() {
                    var t, e = g,
                        r = /'|\\/g,
                        i = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                        o = [":focus"],
                        a = [":active"],
                        s = L.matchesSelector || L.mozMatchesSelector || L.webkitMatchesSelector || L.oMatchesSelector || L.msMatchesSelector;
                    se(function(t) {
                        t.innerHTML = "<select><option selected=''></option></select>", t.querySelectorAll("[selected]").length || o.push("\\[" + I + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), t.querySelectorAll(":checked").length || o.push(":checked")
                    }), se(function(t) {
                        t.innerHTML = "<p test=''></p>", t.querySelectorAll("[test^='']").length && o.push("[*^$]=" + I + "*(?:\"\"|'')"), t.innerHTML = "<input type='hidden'/>", t.querySelectorAll(":enabled").length || o.push(":enabled", ":disabled")
                    }), o = RegExp(o.join("|")), g = function(t, n, i, a, s) {
                        if (!a && !s && !o.test(t)) {
                            var c, l, f = !0,
                                h = C,
                                d = n,
                                p = 9 === n.nodeType && t;
                            if (1 === n.nodeType && "object" !== n.nodeName.toLowerCase()) {
                                for (c = u(t), (f = n.getAttribute("id")) ? h = f.replace(r, "\\$&") : n.setAttribute("id", h), h = "[id='" + h + "'] ", l = c.length; l--;) c[l] = h + c[l].join("");
                                d = re.test(t) && n.parentNode || n, p = c.join(",")
                            }
                            if (p) try {
                                return q.apply(i, O.call(d.querySelectorAll(p), 0)), i
                            } catch (g) {} finally {
                                f || n.removeAttribute("id")
                            }
                        }
                        return e(t, n, i, a, s)
                    }, s && (se(function(e) {
                        t = s.call(e, "div");
                        try {
                            s.call(e, "[test!='']:sizzle"), a.push("!=", Z)
                        } catch (n) {}
                    }), a = RegExp(a.join("|")), n.matchesSelector = function(e, r) {
                        if (r = r.replace(i, "='$1']"), !M(e) && !a.test(r) && !o.test(r)) try {
                            var u = s.call(e, r);
                            if (u || t || e.document && 11 !== e.document.nodeType) return u
                        } catch (c) {}
                        return n(r, null, null, [e]).length > 0
                    })
                }(), x.pseudos.nth = x.pseudos.eq, x.filters = m.prototype = x.pseudos, x.setFilters = new m, n.attr = K.attr, K.find = n, K.expr = n.selectors, K.expr[":"] = K.expr.pseudos, K.unique = n.uniqueSort, K.text = n.getText, K.isXMLDoc = n.isXML, K.contains = n.contains
            }(t);
        var je = /Until$/,
            Fe = /^(?:parents|prev(?:Until|All))/,
            qe = /^.[^:#\[\.,]*$/,
            Oe = K.expr.match.needsContext,
            Pe = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        K.fn.extend({
            find: function(t) {
                var e, n, r, i, o, a, u = this;
                if ("string" != typeof t) return K(t).filter(function() {
                    for (e = 0, n = u.length; n > e; e++)
                        if (K.contains(u[e], this)) return !0
                });
                for (a = this.pushStack("", "find", t), e = 0, n = this.length; n > e; e++)
                    if (r = a.length, K.find(t, this[e], a), e > 0)
                        for (i = r; a.length > i; i++)
                            for (o = 0; r > o; o++)
                                if (a[o] === a[i]) {
                                    a.splice(i--, 1);
                                    break
                                }
                return a
            },
            has: function(t) {
                var e, n = K(t, this),
                    r = n.length;
                return this.filter(function() {
                    for (e = 0; r > e; e++)
                        if (K.contains(this, n[e])) return !0
                })
            },
            not: function(t) {
                return this.pushStack(c(this, t, !1), "not", t)
            },
            filter: function(t) {
                return this.pushStack(c(this, t, !0), "filter", t)
            },
            is: function(t) {
                return !!t && ("string" == typeof t ? Oe.test(t) ? K(t, this.context).index(this[0]) >= 0 : K.filter(t, this).length > 0 : this.filter(t).length > 0)
            },
            closest: function(t, e) {
                for (var n, r = 0, i = this.length, o = [], a = Oe.test(t) || "string" != typeof t ? K(t, e || this.context) : 0; i > r; r++)
                    for (n = this[r]; n && n.ownerDocument && n !== e && 11 !== n.nodeType;) {
                        if (a ? a.index(n) > -1 : K.find.matchesSelector(n, t)) {
                            o.push(n);
                            break
                        }
                        n = n.parentNode
                    }
                return o = o.length > 1 ? K.unique(o) : o, this.pushStack(o, "closest", t)
            },
            index: function(t) {
                return t ? "string" == typeof t ? K.inArray(this[0], K(t)) : K.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
            },
            add: function(t, e) {
                var n = "string" == typeof t ? K(t, e) : K.makeArray(t && t.nodeType ? [t] : t),
                    r = K.merge(this.get(), n);
                return this.pushStack(u(n[0]) || u(r[0]) ? r : K.unique(r))
            },
            addBack: function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), K.fn.andSelf = K.fn.addBack, K.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return K.dir(t, "parentNode")
            },
            parentsUntil: function(t, e, n) {
                return K.dir(t, "parentNode", n)
            },
            next: function(t) {
                return s(t, "nextSibling")
            },
            prev: function(t) {
                return s(t, "previousSibling")
            },
            nextAll: function(t) {
                return K.dir(t, "nextSibling")
            },
            prevAll: function(t) {
                return K.dir(t, "previousSibling")
            },
            nextUntil: function(t, e, n) {
                return K.dir(t, "nextSibling", n)
            },
            prevUntil: function(t, e, n) {
                return K.dir(t, "previousSibling", n)
            },
            siblings: function(t) {
                return K.sibling((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return K.sibling(t.firstChild)
            },
            contents: function(t) {
                return K.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : K.merge([], t.childNodes)
            }
        }, function(t, e) {
            K.fn[t] = function(n, r) {
                var i = K.map(this, e, n);
                return je.test(t) || (r = n), r && "string" == typeof r && (i = K.filter(r, i)), i = this.length > 1 && !Pe[t] ? K.unique(i) : i, this.length > 1 && Fe.test(t) && (i = i.reverse()), this.pushStack(i, t, X.call(arguments).join(","))
            }
        }), K.extend({
            filter: function(t, e, n) {
                return n && (t = ":not(" + t + ")"), 1 === e.length ? K.find.matchesSelector(e[0], t) ? [e[0]] : [] : K.find.matches(t, e)
            },
            dir: function(t, n, r) {
                for (var i = [], o = t[n]; o && 9 !== o.nodeType && (r === e || 1 !== o.nodeType || !K(o).is(r));) 1 === o.nodeType && i.push(o), o = o[n];
                return i
            },
            sibling: function(t, e) {
                for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
                return n
            }
        });
        var Ye = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            ze = / jQuery\d+="(?:null|\d+)"/g,
            Re = /^\s+/,
            $e = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Be = /<([\w:]+)/,
            Ie = /<tbody/i,
            We = /<|&#?\w+;/,
            Ue = /<(?:script|style|link)/i,
            Xe = /<(?:script|object|embed|option|style)/i,
            Ve = RegExp("<(?:" + Ye + ")[\\s/>]", "i"),
            Ze = /^(?:checkbox|radio)$/,
            Ge = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Je = /\/(java|ecma)script/i,
            Ke = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
            Qe = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                area: [1, "<map>", "</map>"],
                _default: [0, "", ""]
            },
            tn = l(R),
            en = tn.appendChild(R.createElement("div"));
        Qe.optgroup = Qe.option, Qe.tbody = Qe.tfoot = Qe.colgroup = Qe.caption = Qe.thead, Qe.th = Qe.td, K.support.htmlSerialize || (Qe._default = [1, "X<div>", "</div>"]), K.fn.extend({
                text: function(t) {
                    return K.access(this, function(t) {
                        return t === e ? K.text(this) : this.empty().append((this[0] && this[0].ownerDocument || R).createTextNode(t))
                    }, null, t, arguments.length)
                },
                wrapAll: function(t) {
                    if (K.isFunction(t)) return this.each(function(e) {
                        K(this).wrapAll(t.call(this, e))
                    });
                    if (this[0]) {
                        var e = K(t, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                            for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                            return t
                        }).append(this)
                    }
                    return this
                },
                wrapInner: function(t) {
                    return K.isFunction(t) ? this.each(function(e) {
                        K(this).wrapInner(t.call(this, e))
                    }) : this.each(function() {
                        var e = K(this),
                            n = e.contents();
                        n.length ? n.wrapAll(t) : e.append(t)
                    })
                },
                wrap: function(t) {
                    var e = K.isFunction(t);
                    return this.each(function(n) {
                        K(this).wrapAll(e ? t.call(this, n) : t)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        K.nodeName(this, "body") || K(this).replaceWith(this.childNodes)
                    }).end()
                },
                append: function() {
                    return this.domManip(arguments, !0, function(t) {
                        (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(t)
                    })
                },
                prepend: function() {
                    return this.domManip(arguments, !0, function(t) {
                        (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(t, this.firstChild)
                    })
                },
                before: function() {
                    if (!u(this[0])) return this.domManip(arguments, !1, function(t) {
                        this.parentNode.insertBefore(t, this)
                    });
                    if (arguments.length) {
                        var t = K.clean(arguments);
                        return this.pushStack(K.merge(t, this), "before", this.selector)
                    }
                },
                after: function() {
                    if (!u(this[0])) return this.domManip(arguments, !1, function(t) {
                        this.parentNode.insertBefore(t, this.nextSibling)
                    });
                    if (arguments.length) {
                        var t = K.clean(arguments);
                        return this.pushStack(K.merge(this, t), "after", this.selector)
                    }
                },
                remove: function(t, e) {
                    for (var n, r = 0; null != (n = this[r]); r++)(!t || K.filter(t, [n]).length) && (!e && 1 === n.nodeType && (K.cleanData(n.getElementsByTagName("*")), K.cleanData([n])), n.parentNode && n.parentNode.removeChild(n));
                    return this
                },
                empty: function() {
                    for (var t, e = 0; null != (t = this[e]); e++)
                        for (1 === t.nodeType && K.cleanData(t.getElementsByTagName("*")); t.firstChild;) t.removeChild(t.firstChild);
                    return this
                },
                clone: function(t, e) {
                    return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                        return K.clone(this, t, e)
                    })
                },
                html: function(t) {
                    return K.access(this, function(t) {
                        var n = this[0] || {},
                            r = 0,
                            i = this.length;
                        if (t === e) return 1 === n.nodeType ? n.innerHTML.replace(ze, "") : e;
                        if (!("string" != typeof t || Ue.test(t) || !K.support.htmlSerialize && Ve.test(t) || !K.support.leadingWhitespace && Re.test(t) || Qe[(Be.exec(t) || ["", ""])[1].toLowerCase()])) {
                            t = t.replace($e, "<$1></$2>");
                            try {
                                for (; i > r; r++) n = this[r] || {}, 1 === n.nodeType && (K.cleanData(n.getElementsByTagName("*")), n.innerHTML = t);
                                n = 0
                            } catch (o) {}
                        }
                        n && this.empty().append(t)
                    }, null, t, arguments.length)
                },
                replaceWith: function(t) {
                    return u(this[0]) ? this.length ? this.pushStack(K(K.isFunction(t) ? t() : t), "replaceWith", t) : this : K.isFunction(t) ? this.each(function(e) {
                        var n = K(this),
                            r = n.html();
                        n.replaceWith(t.call(this, e, r))
                    }) : ("string" != typeof t && (t = K(t).detach()), this.each(function() {
                        var e = this.nextSibling,
                            n = this.parentNode;
                        K(this).remove(), e ? K(e).before(t) : K(n).append(t)
                    }))
                },
                detach: function(t) {
                    return this.remove(t, !0)
                },
                domManip: function(t, n, r) {
                    t = [].concat.apply([], t);
                    var i, o, a, u, s = 0,
                        c = t[0],
                        l = [],
                        h = this.length;
                    if (!K.support.checkClone && h > 1 && "string" == typeof c && Ge.test(c)) return this.each(function() {
                        K(this).domManip(t, n, r)
                    });
                    if (K.isFunction(c)) return this.each(function(i) {
                        var o = K(this);
                        t[0] = c.call(this, i, n ? o.html() : e), o.domManip(t, n, r)
                    });
                    if (this[0]) {
                        if (i = K.buildFragment(t, this, l), a = i.fragment, o = a.firstChild, 1 === a.childNodes.length && (a = o), o)
                            for (n = n && K.nodeName(o, "tr"), u = i.cacheable || h - 1; h > s; s++) r.call(n && K.nodeName(this[s], "table") ? f(this[s], "tbody") : this[s], s === u ? a : K.clone(a, !0, !0));
                        a = o = null, l.length && K.each(l, function(t, e) {
                            e.src ? K.ajax ? K.ajax({
                                url: e.src,
                                type: "GET",
                                dataType: "script",
                                async: !1,
                                global: !1,
                                "throws": !0
                            }) : K.error("no ajax") : K.globalEval((e.text || e.textContent || e.innerHTML || "").replace(Ke, "")), e.parentNode && e.parentNode.removeChild(e)
                        })
                    }
                    return this
                }
            }), K.buildFragment = function(t, n, r) {
                var i, o, a, u = t[0];
                return n = n || R, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, 1 === t.length && "string" == typeof u && 512 > u.length && n === R && "<" === u.charAt(0) && !Xe.test(u) && (K.support.checkClone || !Ge.test(u)) && (K.support.html5Clone || !Ve.test(u)) && (o = !0, i = K.fragments[u], a = i !== e), i || (i = n.createDocumentFragment(), K.clean(t, n, i, r), o && (K.fragments[u] = a && i)), {
                    fragment: i,
                    cacheable: o
                }
            }, K.fragments = {}, K.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(t, e) {
                K.fn[t] = function(n) {
                    var r, i = 0,
                        o = [],
                        a = K(n),
                        u = a.length,
                        s = 1 === this.length && this[0].parentNode;
                    if ((null == s || s && 11 === s.nodeType && 1 === s.childNodes.length) && 1 === u) return a[e](this[0]), this;
                    for (; u > i; i++) r = (i > 0 ? this.clone(!0) : this).get(), K(a[i])[e](r), o = o.concat(r);
                    return this.pushStack(o, t, a.selector)
                }
            }), K.extend({
                clone: function(t, e, n) {
                    var r, i, o, a;
                    if (K.support.html5Clone || K.isXMLDoc(t) || !Ve.test("<" + t.nodeName + ">") ? a = t.cloneNode(!0) : (en.innerHTML = t.outerHTML, en.removeChild(a = en.firstChild)), !(K.support.noCloneEvent && K.support.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || K.isXMLDoc(t)))
                        for (d(t, a), r = p(t), i = p(a), o = 0; r[o]; ++o) i[o] && d(r[o], i[o]);
                    if (e && (h(t, a), n))
                        for (r = p(t), i = p(a), o = 0; r[o]; ++o) h(r[o], i[o]);
                    return r = i = null, a
                },
                clean: function(t, e, n, r) {
                    var i, o, a, u, s, c, f, h, d, p, m, v = e === R && tn,
                        y = [];
                    for (e && void 0 !== e.createDocumentFragment || (e = R), i = 0; null != (a = t[i]); i++)
                        if ("number" == typeof a && (a += ""), a) {
                            if ("string" == typeof a)
                                if (We.test(a)) {
                                    for (v = v || l(e), f = e.createElement("div"), v.appendChild(f), a = a.replace($e, "<$1></$2>"), u = (Be.exec(a) || ["", ""])[1].toLowerCase(), s = Qe[u] || Qe._default, c = s[0], f.innerHTML = s[1] + a + s[2]; c--;) f = f.lastChild;
                                    if (!K.support.tbody)
                                        for (h = Ie.test(a), d = "table" !== u || h ? "<table>" !== s[1] || h ? [] : f.childNodes : f.firstChild && f.firstChild.childNodes, o = d.length - 1; o >= 0; --o) K.nodeName(d[o], "tbody") && !d[o].childNodes.length && d[o].parentNode.removeChild(d[o]);
                                    !K.support.leadingWhitespace && Re.test(a) && f.insertBefore(e.createTextNode(Re.exec(a)[0]), f.firstChild), a = f.childNodes, f.parentNode.removeChild(f)
                                } else a = e.createTextNode(a);
                            a.nodeType ? y.push(a) : K.merge(y, a)
                        }
                    if (f && (a = f = v = null), !K.support.appendChecked)
                        for (i = 0; null != (a = y[i]); i++) K.nodeName(a, "input") ? g(a) : a.getElementsByTagName !== void 0 && K.grep(a.getElementsByTagName("input"), g);
                    if (n)
                        for (p = function(t) {
                                return !t.type || Je.test(t.type) ? r ? r.push(t.parentNode ? t.parentNode.removeChild(t) : t) : n.appendChild(t) : void 0
                            }, i = 0; null != (a = y[i]); i++) K.nodeName(a, "script") && p(a) || (n.appendChild(a), a.getElementsByTagName !== void 0 && (m = K.grep(K.merge([], a.getElementsByTagName("script")), p), y.splice.apply(y, [i + 1, 0].concat(m)), i += m.length));
                    return y
                },
                cleanData: function(t, e) {
                    for (var n, r, i, o, a = 0, u = K.expando, s = K.cache, c = K.support.deleteExpando, l = K.event.special; null != (i = t[a]); a++)
                        if ((e || K.acceptData(i)) && (r = i[u], n = r && s[r])) {
                            if (n.events)
                                for (o in n.events) l[o] ? K.event.remove(i, o) : K.removeEvent(i, o, n.handle);
                            s[r] && (delete s[r], c ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, K.deletedIds.push(r))
                        }
                }
            }),
            function() {
                var t, e;
                K.uaMatch = function(t) {
                    t = t.toLowerCase();
                    var e = /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || 0 > t.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
                    return {
                        browser: e[1] || "",
                        version: e[2] || "0"
                    }
                }, t = K.uaMatch(B.userAgent), e = {}, t.browser && (e[t.browser] = !0, e.version = t.version), e.chrome ? e.webkit = !0 : e.webkit && (e.safari = !0), K.browser = e, K.sub = function() {
                    function t(e, n) {
                        return new t.fn.init(e, n)
                    }
                    K.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function(n, r) {
                        return r && r instanceof K && !(r instanceof t) && (r = t(r)), K.fn.init.call(this, n, r, e)
                    }, t.fn.init.prototype = t.fn;
                    var e = t(R);
                    return t
                }
            }();
        var nn, rn, on, an = /alpha\([^)]*\)/i,
            un = /opacity=([^)]*)/,
            sn = /^(top|right|bottom|left)$/,
            cn = /^(none|table(?!-c[ea]).+)/,
            ln = /^margin/,
            fn = RegExp("^(" + Q + ")(.*)$", "i"),
            hn = RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"),
            dn = RegExp("^([-+])=(" + Q + ")", "i"),
            pn = {
                BODY: "block"
            },
            gn = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            mn = {
                letterSpacing: 0,
                fontWeight: 400
            },
            vn = ["Top", "Right", "Bottom", "Left"],
            yn = ["Webkit", "O", "Moz", "ms"],
            xn = K.fn.toggle;
        K.fn.extend({
            css: function(t, n) {
                return K.access(this, function(t, n, r) {
                    return r !== e ? K.style(t, n, r) : K.css(t, n)
                }, t, n, arguments.length > 1)
            },
            show: function() {
                return y(this, !0)
            },
            hide: function() {
                return y(this)
            },
            toggle: function(t, e) {
                var n = "boolean" == typeof t;
                return K.isFunction(t) && K.isFunction(e) ? xn.apply(this, arguments) : this.each(function() {
                    (n ? t : v(this)) ? K(this).show(): K(this).hide()
                })
            }
        }), K.extend({
            cssHooks: {
                opacity: {
                    get: function(t, e) {
                        if (e) {
                            var n = nn(t, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": K.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(t, n, r, i) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var o, a, u, s = K.camelCase(n),
                        c = t.style;
                    if (n = K.cssProps[s] || (K.cssProps[s] = m(c, s)), u = K.cssHooks[n] || K.cssHooks[s], r === e) return u && "get" in u && (o = u.get(t, !1, i)) !== e ? o : c[n];
                    if (a = typeof r, "string" === a && (o = dn.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(K.css(t, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" === a && !K.cssNumber[s] && (r += "px"), u && "set" in u && (r = u.set(t, r, i)) === e))) try {
                        c[n] = r
                    } catch (l) {}
                }
            },
            css: function(t, n, r, i) {
                var o, a, u, s = K.camelCase(n);
                return n = K.cssProps[s] || (K.cssProps[s] = m(t.style, s)), u = K.cssHooks[n] || K.cssHooks[s], u && "get" in u && (o = u.get(t, !0, i)), o === e && (o = nn(t, n)), "normal" === o && n in mn && (o = mn[n]), r || i !== e ? (a = parseFloat(o), r || K.isNumeric(a) ? a || 0 : o) : o
            },
            swap: function(t, e, n) {
                var r, i, o = {};
                for (i in e) o[i] = t.style[i], t.style[i] = e[i];
                r = n.call(t);
                for (i in e) t.style[i] = o[i];
                return r
            }
        }), t.getComputedStyle ? nn = function(e, n) {
            var r, i, o, a, u = t.getComputedStyle(e, null),
                s = e.style;
            return u && (r = u.getPropertyValue(n) || u[n], "" === r && !K.contains(e.ownerDocument, e) && (r = K.style(e, n)), hn.test(r) && ln.test(n) && (i = s.width, o = s.minWidth, a = s.maxWidth, s.minWidth = s.maxWidth = s.width = r, r = u.width, s.width = i, s.minWidth = o, s.maxWidth = a)), r
        } : R.documentElement.currentStyle && (nn = function(t, e) {
            var n, r, i = t.currentStyle && t.currentStyle[e],
                o = t.style;
            return null == i && o && o[e] && (i = o[e]), hn.test(i) && !sn.test(e) && (n = o.left, r = t.runtimeStyle && t.runtimeStyle.left, r && (t.runtimeStyle.left = t.currentStyle.left), o.left = "fontSize" === e ? "1em" : i, i = o.pixelLeft + "px", o.left = n, r && (t.runtimeStyle.left = r)), "" === i ? "auto" : i
        }), K.each(["height", "width"], function(t, e) {
            K.cssHooks[e] = {
                get: function(t, n, r) {
                    return n ? 0 === t.offsetWidth && cn.test(nn(t, "display")) ? K.swap(t, gn, function() {
                        return M(t, e, r)
                    }) : M(t, e, r) : void 0
                },
                set: function(t, n, r) {
                    return x(t, n, r ? b(t, e, r, K.support.boxSizing && "border-box" === K.css(t, "boxSizing")) : 0)
                }
            }
        }), K.support.opacity || (K.cssHooks.opacity = {
            get: function(t, e) {
                return un.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
            },
            set: function(t, e) {
                var n = t.style,
                    r = t.currentStyle,
                    i = K.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                    o = r && r.filter || n.filter || "";
                n.zoom = 1, e >= 1 && "" === K.trim(o.replace(an, "")) && n.removeAttribute && (n.removeAttribute("filter"), r && !r.filter) || (n.filter = an.test(o) ? o.replace(an, i) : o + " " + i)
            }
        }), K(function() {
            K.support.reliableMarginRight || (K.cssHooks.marginRight = {
                get: function(t, e) {
                    return K.swap(t, {
                        display: "inline-block"
                    }, function() {
                        return e ? nn(t, "marginRight") : void 0
                    })
                }
            }), !K.support.pixelPosition && K.fn.position && K.each(["top", "left"], function(t, e) {
                K.cssHooks[e] = {
                    get: function(t, n) {
                        if (n) {
                            var r = nn(t, e);
                            return hn.test(r) ? K(t).position()[e] + "px" : r
                        }
                    }
                }
            })
        }), K.expr && K.expr.filters && (K.expr.filters.hidden = function(t) {
            return 0 === t.offsetWidth && 0 === t.offsetHeight || !K.support.reliableHiddenOffsets && "none" === (t.style && t.style.display || nn(t, "display"))
        }, K.expr.filters.visible = function(t) {
            return !K.expr.filters.hidden(t)
        }), K.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, e) {
            K.cssHooks[t + e] = {
                expand: function(n) {
                    var r, i = "string" == typeof n ? n.split(" ") : [n],
                        o = {};
                    for (r = 0; 4 > r; r++) o[t + vn[r] + e] = i[r] || i[r - 2] || i[0];
                    return o
                }
            }, ln.test(t) || (K.cssHooks[t + e].set = x)
        });
        var bn = /%20/g,
            Mn = /\[\]$/,
            _n = /\r?\n/g,
            wn = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
            kn = /^(?:select|textarea)/i;
        K.fn.extend({
            serialize: function() {
                return K.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    return this.elements ? K.makeArray(this.elements) : this
                }).filter(function() {
                    return this.name && !this.disabled && (this.checked || kn.test(this.nodeName) || wn.test(this.type))
                }).map(function(t, e) {
                    var n = K(this).val();
                    return null == n ? null : K.isArray(n) ? K.map(n, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(_n, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: n.replace(_n, "\r\n")
                    }
                }).get()
            }
        }), K.param = function(t, n) {
            var r, i = [],
                o = function(t, e) {
                    e = K.isFunction(e) ? e() : null == e ? "" : e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                };
            if (n === e && (n = K.ajaxSettings && K.ajaxSettings.traditional), K.isArray(t) || t.jquery && !K.isPlainObject(t)) K.each(t, function() {
                o(this.name, this.value)
            });
            else
                for (r in t) w(r, t[r], n, o);
            return i.join("&").replace(bn, "+")
        };
        var Tn, Sn, En = /#.*$/,
            Nn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Cn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
            An = /^(?:GET|HEAD)$/,
            Dn = /^\/\//,
            Ln = /\?/,
            Hn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            jn = /([?&])_=[^&]*/,
            Fn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            qn = K.fn.load,
            On = {},
            Pn = {},
            Yn = ["*/"] + ["*"];
        try {
            Sn = $.href
        } catch (zn) {
            Sn = R.createElement("a"), Sn.href = "", Sn = Sn.href
        }
        Tn = Fn.exec(Sn.toLowerCase()) || [], K.fn.load = function(t, n, r) {
            if ("string" != typeof t && qn) return qn.apply(this, arguments);
            if (!this.length) return this;
            var i, o, a, u = this,
                s = t.indexOf(" ");
            return s >= 0 && (i = t.slice(s, t.length), t = t.slice(0, s)), K.isFunction(n) ? (r = n, n = e) : n && "object" == typeof n && (o = "POST"), K.ajax({
                url: t,
                type: o,
                dataType: "html",
                data: n,
                complete: function(t, e) {
                    r && u.each(r, a || [t.responseText, e, t])
                }
            }).done(function(t) {
                a = arguments, u.html(i ? K("<div>").append(t.replace(Hn, "")).find(i) : t)
            }), this
        }, K.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(t, e) {
            K.fn[e] = function(t) {
                return this.on(e, t)
            }
        }), K.each(["get", "post"], function(t, n) {
            K[n] = function(t, r, i, o) {
                return K.isFunction(r) && (o = o || i, i = r, r = e), K.ajax({
                    type: n,
                    url: t,
                    data: r,
                    success: i,
                    dataType: o
                })
            }
        }), K.extend({
            getScript: function(t, n) {
                return K.get(t, e, n, "script")
            },
            getJSON: function(t, e, n) {
                return K.get(t, e, n, "json")
            },
            ajaxSetup: function(t, e) {
                return e ? S(t, K.ajaxSettings) : (e = t, t = K.ajaxSettings), S(t, e), t
            },
            ajaxSettings: {
                url: Sn,
                isLocal: Cn.test(Tn[1]),
                global: !0,
                type: "GET",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                processData: !0,
                async: !0,
                accepts: {
                    xml: "application/xml, text/xml",
                    html: "text/html",
                    text: "text/plain",
                    json: "application/json, text/javascript",
                    "*": Yn
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText"
                },
                converters: {
                    "* text": t.String,
                    "text html": !0,
                    "text json": K.parseJSON,
                    "text xml": K.parseXML
                },
                flatOptions: {
                    context: !0,
                    url: !0
                }
            },
            ajaxPrefilter: k(On),
            ajaxTransport: k(Pn),
            ajax: function(t, n) {
                function r(t, n, r, a) {
                    var c, f, y, x, M, w = n;
                    2 !== b && (b = 2, s && clearTimeout(s), u = e, o = a || "", _.readyState = t > 0 ? 4 : 0, r && (x = E(h, _, r)), t >= 200 && 300 > t || 304 === t ? (h.ifModified && (M = _.getResponseHeader("Last-Modified"), M && (K.lastModified[i] = M), M = _.getResponseHeader("Etag"), M && (K.etag[i] = M)), 304 === t ? (w = "notmodified", c = !0) : (c = N(h, x), w = c.state, f = c.data, y = c.error, c = !y)) : (y = w, (!w || t) && (w = "error", 0 > t && (t = 0))), _.status = t, _.statusText = (n || w) + "", c ? g.resolveWith(d, [f, w, _]) : g.rejectWith(d, [_, w, y]), _.statusCode(v), v = e, l && p.trigger("ajax" + (c ? "Success" : "Error"), [_, h, c ? f : y]), m.fireWith(d, [_, w]), l && (p.trigger("ajaxComplete", [_, h]), --K.active || K.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (n = t, t = e), n = n || {};
                var i, o, a, u, s, c, l, f, h = K.ajaxSetup({}, n),
                    d = h.context || h,
                    p = d !== h && (d.nodeType || d instanceof K) ? K(d) : K.event,
                    g = K.Deferred(),
                    m = K.Callbacks("once memory"),
                    v = h.statusCode || {},
                    y = {},
                    x = {},
                    b = 0,
                    M = "canceled",
                    _ = {
                        readyState: 0,
                        setRequestHeader: function(t, e) {
                            if (!b) {
                                var n = t.toLowerCase();
                                t = x[n] = x[n] || t, y[t] = e
                            }
                            return this
                        },
                        getAllResponseHeaders: function() {
                            return 2 === b ? o : null
                        },
                        getResponseHeader: function(t) {
                            var n;
                            if (2 === b) {
                                if (!a)
                                    for (a = {}; n = Nn.exec(o);) a[n[1].toLowerCase()] = n[2];
                                n = a[t.toLowerCase()]
                            }
                            return n === e ? null : n
                        },
                        overrideMimeType: function(t) {
                            return b || (h.mimeType = t), this
                        },
                        abort: function(t) {
                            return t = t || M, u && u.abort(t), r(0, t), this
                        }
                    };
                if (g.promise(_), _.success = _.done, _.error = _.fail, _.complete = m.add, _.statusCode = function(t) {
                        if (t) {
                            var e;
                            if (2 > b)
                                for (e in t) v[e] = [v[e], t[e]];
                            else e = t[_.status], _.always(e)
                        }
                        return this
                    }, h.url = ((t || h.url) + "").replace(En, "").replace(Dn, Tn[1] + "//"), h.dataTypes = K.trim(h.dataType || "*").toLowerCase().split(ee), null == h.crossDomain && (c = Fn.exec(h.url.toLowerCase()), h.crossDomain = !(!c || c[1] === Tn[1] && c[2] === Tn[2] && (c[3] || ("http:" === c[1] ? 80 : 443)) == (Tn[3] || ("http:" === Tn[1] ? 80 : 443)))), h.data && h.processData && "string" != typeof h.data && (h.data = K.param(h.data, h.traditional)), T(On, h, n, _), 2 === b) return _;
                if (l = h.global, h.type = h.type.toUpperCase(), h.hasContent = !An.test(h.type), l && 0 === K.active++ && K.event.trigger("ajaxStart"), !h.hasContent && (h.data && (h.url += (Ln.test(h.url) ? "&" : "?") + h.data, delete h.data), i = h.url, h.cache === !1)) {
                    var w = K.now(),
                        k = h.url.replace(jn, "$1_=" + w);
                    h.url = k + (k === h.url ? (Ln.test(h.url) ? "&" : "?") + "_=" + w : "")
                }(h.data && h.hasContent && h.contentType !== !1 || n.contentType) && _.setRequestHeader("Content-Type", h.contentType), h.ifModified && (i = i || h.url, K.lastModified[i] && _.setRequestHeader("If-Modified-Since", K.lastModified[i]), K.etag[i] && _.setRequestHeader("If-None-Match", K.etag[i])), _.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Yn + "; q=0.01" : "") : h.accepts["*"]);
                for (f in h.headers) _.setRequestHeader(f, h.headers[f]);
                if (!h.beforeSend || h.beforeSend.call(d, _, h) !== !1 && 2 !== b) {
                    M = "abort";
                    for (f in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) _[f](h[f]);
                    if (u = T(Pn, h, n, _)) {
                        _.readyState = 1, l && p.trigger("ajaxSend", [_, h]), h.async && h.timeout > 0 && (s = setTimeout(function() {
                            _.abort("timeout")
                        }, h.timeout));
                        try {
                            b = 1, u.send(y, r)
                        } catch (S) {
                            if (!(2 > b)) throw S;
                            r(-1, S)
                        }
                    } else r(-1, "No Transport");
                    return _
                }
                return _.abort()
            },
            active: 0,
            lastModified: {},
            etag: {}
        });
        var Rn = [],
            $n = /\?/,
            Bn = /(=)\?(?=&|$)|\?\?/,
            In = K.now();
        K.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = Rn.pop() || K.expando + "_" + In++;
                return this[t] = !0, t
            }
        }), K.ajaxPrefilter("json jsonp", function(n, r, i) {
            var o, a, u, s = n.data,
                c = n.url,
                l = n.jsonp !== !1,
                f = l && Bn.test(c),
                h = l && !f && "string" == typeof s && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(s);
            return "jsonp" === n.dataTypes[0] || f || h ? (o = n.jsonpCallback = K.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, a = t[o], f ? n.url = c.replace(Bn, "$1" + o) : h ? n.data = s.replace(Bn, "$1" + o) : l && (n.url += ($n.test(c) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
                return u || K.error(o + " was not called"), u[0]
            }, n.dataTypes[0] = "json", t[o] = function() {
                u = arguments
            }, i.always(function() {
                t[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Rn.push(o)), u && K.isFunction(a) && a(u[0]), u = a = e
            }), "script") : void 0
        }), K.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /javascript|ecmascript/
            },
            converters: {
                "text script": function(t) {
                    return K.globalEval(t), t
                }
            }
        }), K.ajaxPrefilter("script", function(t) {
            t.cache === e && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
        }), K.ajaxTransport("script", function(t) {
            if (t.crossDomain) {
                var n, r = R.head || R.getElementsByTagName("head")[0] || R.documentElement;
                return {
                    send: function(i, o) {
                        n = R.createElement("script"), n.async = "async", t.scriptCharset && (n.charset = t.scriptCharset), n.src = t.url, n.onload = n.onreadystatechange = function(t, i) {
                            (i || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = e, i || o(200, "success"))
                        }, r.insertBefore(n, r.firstChild)
                    },
                    abort: function() {
                        n && n.onload(0, 1)
                    }
                }
            }
        });
        var Wn, Un = t.ActiveXObject ? function() {
                for (var t in Wn) Wn[t](0, 1)
            } : !1,
            Xn = 0;
        K.ajaxSettings.xhr = t.ActiveXObject ? function() {
                return !this.isLocal && C() || A()
            } : C,
            function(t) {
                K.extend(K.support, {
                    ajax: !!t,
                    cors: !!t && "withCredentials" in t
                })
            }(K.ajaxSettings.xhr()), K.support.ajax && K.ajaxTransport(function(n) {
                if (!n.crossDomain || K.support.cors) {
                    var r;
                    return {
                        send: function(i, o) {
                            var a, u, s = n.xhr();
                            if (n.username ? s.open(n.type, n.url, n.async, n.username, n.password) : s.open(n.type, n.url, n.async), n.xhrFields)
                                for (u in n.xhrFields) s[u] = n.xhrFields[u];
                            n.mimeType && s.overrideMimeType && s.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                            try {
                                for (u in i) s.setRequestHeader(u, i[u])
                            } catch (c) {}
                            s.send(n.hasContent && n.data || null), r = function(t, i) {
                                var u, c, l, f, h;
                                try {
                                    if (r && (i || 4 === s.readyState))
                                        if (r = e, a && (s.onreadystatechange = K.noop, Un && delete Wn[a]), i) 4 !== s.readyState && s.abort();
                                        else {
                                            u = s.status, l = s.getAllResponseHeaders(), f = {}, h = s.responseXML, h && h.documentElement && (f.xml = h);
                                            try {
                                                f.text = s.responseText
                                            } catch (d) {}
                                            try {
                                                c = s.statusText
                                            } catch (d) {
                                                c = ""
                                            }
                                            u || !n.isLocal || n.crossDomain ? 1223 === u && (u = 204) : u = f.text ? 200 : 404
                                        }
                                } catch (p) {
                                    i || o(-1, p)
                                }
                                f && o(u, c, f, l)
                            }, n.async ? 4 === s.readyState ? setTimeout(r, 0) : (a = ++Xn, Un && (Wn || (Wn = {}, K(t).unload(Un)), Wn[a] = r), s.onreadystatechange = r) : r()
                        },
                        abort: function() {
                            r && r(0, 1)
                        }
                    }
                }
            });
        var Vn, Zn, Gn = /^(?:toggle|show|hide)$/,
            Jn = RegExp("^(?:([-+])=|)(" + Q + ")([a-z%]*)$", "i"),
            Kn = /queueHooks$/,
            Qn = [F],
            tr = {
                "*": [function(t, e) {
                    var n, r, i = this.createTween(t, e),
                        o = Jn.exec(e),
                        a = i.cur(),
                        u = +a || 0,
                        s = 1,
                        c = 20;
                    if (o) {
                        if (n = +o[2], r = o[3] || (K.cssNumber[t] ? "" : "px"), "px" !== r && u) {
                            u = K.css(i.elem, t, !0) || n || 1;
                            do s = s || ".5", u /= s, K.style(i.elem, t, u + r); while (s !== (s = i.cur() / a) && 1 !== s && --c)
                        }
                        i.unit = r, i.start = u, i.end = o[1] ? u + (o[1] + 1) * n : n
                    }
                    return i
                }]
            };
        K.Animation = K.extend(H, {
            tweener: function(t, e) {
                K.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                for (var n, r = 0, i = t.length; i > r; r++) n = t[r], tr[n] = tr[n] || [], tr[n].unshift(e)
            },
            prefilter: function(t, e) {
                e ? Qn.unshift(t) : Qn.push(t)
            }
        }), K.Tween = q, q.prototype = {
            constructor: q,
            init: function(t, e, n, r, i, o) {
                this.elem = t, this.prop = n, this.easing = i || "swing", this.options = e, this.start = this.now = this.cur(), this.end = r, this.unit = o || (K.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var t = q.propHooks[this.prop];
                return t && t.get ? t.get(this) : q.propHooks._default.get(this)
            },
            run: function(t) {
                var e, n = q.propHooks[this.prop];
                return this.pos = e = this.options.duration ? K.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : q.propHooks._default.set(this), this
            }
        }, q.prototype.init.prototype = q.prototype, q.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = K.css(t.elem, t.prop, !1, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
                },
                set: function(t) {
                    K.fx.step[t.prop] ? K.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[K.cssProps[t.prop]] || K.cssHooks[t.prop]) ? K.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                }
            }
        }, q.propHooks.scrollTop = q.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, K.each(["toggle", "show", "hide"], function(t, e) {
            var n = K.fn[e];
            K.fn[e] = function(r, i, o) {
                return null == r || "boolean" == typeof r || !t && K.isFunction(r) && K.isFunction(i) ? n.apply(this, arguments) : this.animate(O(e, !0), r, i, o)
            }
        }), K.fn.extend({
            fadeTo: function(t, e, n, r) {
                return this.filter(v).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, n, r)
            },
            animate: function(t, e, n, r) {
                var i = K.isEmptyObject(t),
                    o = K.speed(e, n, r),
                    a = function() {
                        var e = H(this, K.extend({}, t), o);
                        i && e.stop(!0)
                    };
                return i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(t, n, r) {
                var i = function(t) {
                    var e = t.stop;
                    delete t.stop, e(r)
                };
                return "string" != typeof t && (r = n, n = t, t = e), n && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                    var e = !0,
                        n = null != t && t + "queueHooks",
                        o = K.timers,
                        a = K._data(this);
                    if (n) a[n] && a[n].stop && i(a[n]);
                    else
                        for (n in a) a[n] && a[n].stop && Kn.test(n) && i(a[n]);
                    for (n = o.length; n--;) o[n].elem === this && (null == t || o[n].queue === t) && (o[n].anim.stop(r), e = !1, o.splice(n, 1));
                    (e || !r) && K.dequeue(this, t)
                })
            }
        }), K.each({
            slideDown: O("show"),
            slideUp: O("hide"),
            slideToggle: O("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            K.fn[t] = function(t, n, r) {
                return this.animate(e, t, n, r)
            }
        }), K.speed = function(t, e, n) {
            var r = t && "object" == typeof t ? K.extend({}, t) : {
                complete: n || !n && e || K.isFunction(t) && t,
                duration: t,
                easing: n && e || e && !K.isFunction(e) && e
            };
            return r.duration = K.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in K.fx.speeds ? K.fx.speeds[r.duration] : K.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                K.isFunction(r.old) && r.old.call(this), r.queue && K.dequeue(this, r.queue)
            }, r
        }, K.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            }
        }, K.timers = [], K.fx = q.prototype.init, K.fx.tick = function() {
            var t, n = K.timers,
                r = 0;
            for (Vn = K.now(); n.length > r; r++) t = n[r], !t() && n[r] === t && n.splice(r--, 1);
            n.length || K.fx.stop(), Vn = e
        }, K.fx.timer = function(t) {
            t() && K.timers.push(t) && !Zn && (Zn = setInterval(K.fx.tick, K.fx.interval))
        }, K.fx.interval = 13, K.fx.stop = function() {
            clearInterval(Zn), Zn = null
        }, K.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, K.fx.step = {}, K.expr && K.expr.filters && (K.expr.filters.animated = function(t) {
            return K.grep(K.timers, function(e) {
                return t === e.elem
            }).length
        });
        var er = /^(?:body|html)$/i;
        K.fn.offset = function(t) {
            if (arguments.length) return t === e ? this : this.each(function(e) {
                K.offset.setOffset(this, t, e)
            });
            var n, r, i, o, a, u, s, c = {
                    top: 0,
                    left: 0
                },
                l = this[0],
                f = l && l.ownerDocument;
            if (f) return (r = f.body) === l ? K.offset.bodyOffset(l) : (n = f.documentElement, K.contains(n, l) ? (l.getBoundingClientRect !== void 0 && (c = l.getBoundingClientRect()), i = P(f), o = n.clientTop || r.clientTop || 0, a = n.clientLeft || r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, s = i.pageXOffset || n.scrollLeft, {
                top: c.top + u - o,
                left: c.left + s - a
            }) : c)
        }, K.offset = {
            bodyOffset: function(t) {
                var e = t.offsetTop,
                    n = t.offsetLeft;
                return K.support.doesNotIncludeMarginInBodyOffset && (e += parseFloat(K.css(t, "marginTop")) || 0, n += parseFloat(K.css(t, "marginLeft")) || 0), {
                    top: e,
                    left: n
                }
            },
            setOffset: function(t, e, n) {
                var r = K.css(t, "position");
                "static" === r && (t.style.position = "relative");
                var i, o, a = K(t),
                    u = a.offset(),
                    s = K.css(t, "top"),
                    c = K.css(t, "left"),
                    l = ("absolute" === r || "fixed" === r) && K.inArray("auto", [s, c]) > -1,
                    f = {},
                    h = {};
                l ? (h = a.position(), i = h.top, o = h.left) : (i = parseFloat(s) || 0, o = parseFloat(c) || 0), K.isFunction(e) && (e = e.call(t, n, u)), null != e.top && (f.top = e.top - u.top + i), null != e.left && (f.left = e.left - u.left + o), "using" in e ? e.using.call(t, f) : a.css(f)
            }
        }, K.fn.extend({
            position: function() {
                if (this[0]) {
                    var t = this[0],
                        e = this.offsetParent(),
                        n = this.offset(),
                        r = er.test(e[0].nodeName) ? {
                            top: 0,
                            left: 0
                        } : e.offset();
                    return n.top -= parseFloat(K.css(t, "marginTop")) || 0, n.left -= parseFloat(K.css(t, "marginLeft")) || 0, r.top += parseFloat(K.css(e[0], "borderTopWidth")) || 0, r.left += parseFloat(K.css(e[0], "borderLeftWidth")) || 0, {
                        top: n.top - r.top,
                        left: n.left - r.left
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent || R.body; t && !er.test(t.nodeName) && "static" === K.css(t, "position");) t = t.offsetParent;
                    return t || R.body
                })
            }
        }), K.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, n) {
            var r = /Y/.test(n);
            K.fn[t] = function(i) {
                return K.access(this, function(t, i, o) {
                    var a = P(t);
                    return o === e ? a ? n in a ? a[n] : a.document.documentElement[i] : t[i] : (a ? a.scrollTo(r ? K(a).scrollLeft() : o, r ? o : K(a).scrollTop()) : t[i] = o, void 0)
                }, t, i, arguments.length, null)
            }
        }), K.each({
            Height: "height",
            Width: "width"
        }, function(t, n) {
            K.each({
                padding: "inner" + t,
                content: n,
                "": "outer" + t
            }, function(r, i) {
                K.fn[i] = function(i, o) {
                    var a = arguments.length && (r || "boolean" != typeof i),
                        u = r || (i === !0 || o === !0 ? "margin" : "border");
                    return K.access(this, function(n, r, i) {
                        var o;
                        return K.isWindow(n) ? n.document.documentElement["client" + t] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + t], o["scroll" + t], n.body["offset" + t], o["offset" + t], o["client" + t])) : i === e ? K.css(n, r, i, u) : K.style(n, r, i, u)
                    }, n, a ? i : e, a, null)
                }
            })
        }), t.jQuery = t.$ = K, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
            return K
        })
    })(window), d3 = function() {
        function t(t) {
            return null != t && !isNaN(t)
        }

        function e(t) {
            return t.length
        }

        function n(t) {
            for (var e = 1; t * e % 1;) e *= 10;
            return e
        }

        function r(t, e) {
            try {
                for (var n in e) Object.defineProperty(t.prototype, n, {
                    value: e[n],
                    enumerable: !1
                })
            } catch (r) {
                t.prototype = e
            }
        }

        function i() {}

        function o() {}

        function a(t, e, n) {
            return function() {
                var r = n.apply(e, arguments);
                return r === e ? t : r
            }
        }

        function u() {}

        function s(t) {
            function e() {
                for (var e, r = n, i = -1, o = r.length; o > ++i;)(e = r[i].on) && e.apply(this, arguments);
                return t
            }
            var n = [],
                r = new i;
            return e.on = function(e, i) {
                var o, a = r.get(e);
                return 2 > arguments.length ? a && a.on : (a && (a.on = null, n = n.slice(0, o = n.indexOf(a)).concat(n.slice(o + 1)), r.remove(e)), i && n.push(r.set(e, {
                    on: i
                })), t)
            }, e
        }

        function c() {
            ca.event.stopPropagation(), ca.event.preventDefault()
        }

        function l() {
            for (var t, e = ca.event; t = e.sourceEvent;) e = t;
            return e
        }

        function f(t, e) {
            function n() {
                t.on(e, null)
            }
            t.on(e, function() {
                c(), n()
            }, !0), setTimeout(n, 0)
        }

        function h(t) {
            for (var e = new u, n = 0, r = arguments.length; r > ++n;) e[arguments[n]] = s(e);
            return e.of = function(n, r) {
                return function(i) {
                    try {
                        var o = i.sourceEvent = ca.event;
                        i.target = t, ca.event = i, e[i.type].apply(n, r)
                    } finally {
                        ca.event = o
                    }
                }
            }, e
        }

        function d(t, e) {
            var n = t.ownerSVGElement || t;
            if (n.createSVGPoint) {
                var r = n.createSVGPoint();
                if (0 > ya && (fa.scrollX || fa.scrollY)) {
                    n = ca.select(la.body).append("svg").style("position", "absolute").style("top", 0).style("left", 0);
                    var i = n[0][0].getScreenCTM();
                    ya = !(i.f || i.e), n.remove()
                }
                return ya ? (r.x = e.pageX, r.y = e.pageY) : (r.x = e.clientX, r.y = e.clientY), r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y]
            }
            var o = t.getBoundingClientRect();
            return [e.clientX - o.left - t.clientLeft, e.clientY - o.top - t.clientTop]
        }

        function p(t) {
            for (var e = -1, n = t.length, r = []; n > ++e;) r.push(t[e]);
            return r
        }

        function g(t) {
            return Array.prototype.slice.call(t)
        }

        function m(t) {
            return Ma(t, Ea), t
        }

        function v(t) {
            return function() {
                return _a(t, this)
            }
        }

        function y(t) {
            return function() {
                return wa(t, this)
            }
        }

        function x(t, e) {
            function n() {
                this.removeAttribute(t)
            }

            function r() {
                this.removeAttributeNS(t.space, t.local)
            }

            function i() {
                this.setAttribute(t, e)
            }

            function o() {
                this.setAttributeNS(t.space, t.local, e)
            }

            function a() {
                var n = e.apply(this, arguments);
                null == n ? this.removeAttribute(t) : this.setAttribute(t, n)
            }

            function u() {
                var n = e.apply(this, arguments);
                null == n ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n)
            }
            return t = ca.ns.qualify(t), null == e ? t.local ? r : n : "function" == typeof e ? t.local ? u : a : t.local ? o : i
        }

        function M(t) {
            return t.trim().replace(/\s+/g, " ")
        }

        function _(t) {
            return RegExp("(?:^|\\s+)" + ca.requote(t) + "(?:\\s+|$)", "g")
        }

        function w(t, e) {
            function n() {
                for (var n = -1; i > ++n;) t[n](this, e)
            }

            function r() {
                for (var n = -1, r = e.apply(this, arguments); i > ++n;) t[n](this, r)
            }
            t = t.trim().split(/\s+/).map(k);
            var i = t.length;
            return "function" == typeof e ? r : n
        }

        function k(t) {
            var e = _(t);
            return function(n, r) {
                if (i = n.classList) return r ? i.add(t) : i.remove(t);
                var i = n.getAttribute("class") || "";
                r ? (e.lastIndex = 0, e.test(i) || n.setAttribute("class", M(i + " " + t))) : n.setAttribute("class", M(i.replace(e, " ")))
            }
        }

        function T(t, e, n) {
            function r() {
                this.style.removeProperty(t)
            }

            function i() {
                this.style.setProperty(t, e, n)
            }

            function o() {
                var r = e.apply(this, arguments);
                null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, n)
            }
            return null == e ? r : "function" == typeof e ? o : i
        }

        function S(t, e) {
            function n() {
                delete this[t]
            }

            function r() {
                this[t] = e
            }

            function i() {
                var n = e.apply(this, arguments);
                null == n ? delete this[t] : this[t] = n
            }
            return null == e ? n : "function" == typeof e ? i : r
        }

        function E(t) {
            return {
                __data__: t
            }
        }

        function N(t) {
            return function() {
                return Sa(this, t)
            }
        }

        function C(t) {
            return arguments.length || (t = ca.ascending),
                function(e, n) {
                    return !e - !n || t(e.__data__, n.__data__)
                }
        }

        function A() {}

        function D(t, e, n) {
            function r() {
                var e = this[a];
                e && (this.removeEventListener(t, e, e.$), delete this[a])
            }

            function i() {
                var i = s(e, xa(arguments));
                r.call(this), this.addEventListener(t, this[a] = i, i.$ = n), i._ = e
            }

            function o() {
                var e, n = RegExp("^__on([^.]+)" + ca.requote(t) + "$");
                for (var r in this)
                    if (e = r.match(n)) {
                        var i = this[r];
                        this.removeEventListener(e[1], i, i.$), delete this[r]
                    }
            }
            var a = "__on" + t,
                u = t.indexOf("."),
                s = L;
            u > 0 && (t = t.substring(0, u));
            var c = Aa.get(t);
            return c && (t = c, s = H), u ? e ? i : r : e ? A : o
        }

        function L(t, e) {
            return function(n) {
                var r = ca.event;
                ca.event = n, e[0] = this.__data__;
                try {
                    t.apply(this, e)
                } finally {
                    ca.event = r
                }
            }
        }

        function H(t, e) {
            var n = L(t, e);
            return function(t) {
                var e = this,
                    r = t.relatedTarget;
                r && (r === e || 8 & r.compareDocumentPosition(e)) || n.call(e, t)
            }
        }

        function j(t, e) {
            for (var n = 0, r = t.length; r > n; n++)
                for (var i, o = t[n], a = 0, u = o.length; u > a; a++)(i = o[a]) && e(i, a, n);
            return t
        }

        function F(t) {
            return Ma(t, Da), t
        }

        function q() {}

        function O(t, e, n) {
            return new P(t, e, n)
        }

        function P(t, e, n) {
            this.h = t, this.s = e, this.l = n
        }

        function Y(t, e, n) {
            function r(t) {
                return t > 360 ? t -= 360 : 0 > t && (t += 360), 60 > t ? o + (a - o) * t / 60 : 180 > t ? a : 240 > t ? o + (a - o) * (240 - t) / 60 : o
            }

            function i(t) {
                return Math.round(255 * r(t))
            }
            var o, a;
            return t = isNaN(t) ? 0 : 0 > (t %= 360) ? t + 360 : t, e = isNaN(e) ? 0 : 0 > e ? 0 : e > 1 ? 1 : e, n = 0 > n ? 0 : n > 1 ? 1 : n, a = .5 >= n ? n * (1 + e) : n + e - n * e, o = 2 * n - a, ne(i(t + 120), i(t), i(t - 120))
        }

        function z(t) {
            return t > 0 ? 1 : 0 > t ? -1 : 0
        }

        function R(t) {
            return Math.acos(Math.max(-1, Math.min(1, t)))
        }

        function $(t) {
            return t > 1 ? Oa / 2 : -1 > t ? -Oa / 2 : Math.asin(t)
        }

        function B(t) {
            return (Math.exp(t) - Math.exp(-t)) / 2
        }

        function I(t) {
            return (Math.exp(t) + Math.exp(-t)) / 2
        }

        function W(t) {
            return (t = Math.sin(t / 2)) * t
        }

        function U(t, e, n) {
            return new X(t, e, n)
        }

        function X(t, e, n) {
            this.h = t, this.c = e, this.l = n
        }

        function V(t, e, n) {
            return isNaN(t) && (t = 0), isNaN(e) && (e = 0), Z(n, Math.cos(t *= Ya) * e, Math.sin(t) * e)
        }

        function Z(t, e, n) {
            return new G(t, e, n)
        }

        function G(t, e, n) {
            this.l = t, this.a = e, this.b = n
        }

        function J(t, e, n) {
            var r = (t + 16) / 116,
                i = r + e / 500,
                o = r - n / 200;
            return i = Q(i) * Ba, r = Q(r) * Ia, o = Q(o) * Wa, ne(ee(3.2404542 * i - 1.5371385 * r - .4985314 * o), ee(-.969266 * i + 1.8760108 * r + .041556 * o), ee(.0556434 * i - .2040259 * r + 1.0572252 * o))
        }

        function K(t, e, n) {
            return t > 0 ? U(Math.atan2(n, e) * za, Math.sqrt(e * e + n * n), t) : U(0 / 0, 0 / 0, t)
        }

        function Q(t) {
            return t > .206893034 ? t * t * t : (t - 4 / 29) / 7.787037
        }

        function te(t) {
            return t > .008856 ? Math.pow(t, 1 / 3) : 7.787037 * t + 4 / 29
        }

        function ee(t) {
            return Math.round(255 * (.00304 >= t ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055))
        }

        function ne(t, e, n) {
            return new re(t, e, n)
        }

        function re(t, e, n) {
            this.r = t, this.g = e, this.b = n
        }

        function ie(t) {
            return 16 > t ? "0" + Math.max(0, t).toString(16) : Math.min(255, t).toString(16)
        }

        function oe(t, e, n) {
            var r, i, o, a = 0,
                u = 0,
                s = 0;
            if (r = /([a-z]+)\((.*)\)/i.exec(t)) switch (i = r[2].split(","), r[1]) {
                case "hsl":
                    return n(parseFloat(i[0]), parseFloat(i[1]) / 100, parseFloat(i[2]) / 100);
                case "rgb":
                    return e(ce(i[0]), ce(i[1]), ce(i[2]))
            }
            return (o = Va.get(t)) ? e(o.r, o.g, o.b) : (null != t && "#" === t.charAt(0) && (4 === t.length ? (a = t.charAt(1), a += a, u = t.charAt(2), u += u, s = t.charAt(3), s += s) : 7 === t.length && (a = t.substring(1, 3), u = t.substring(3, 5), s = t.substring(5, 7)), a = parseInt(a, 16), u = parseInt(u, 16), s = parseInt(s, 16)), e(a, u, s))
        }

        function ae(t, e, n) {
            var r, i, o = Math.min(t /= 255, e /= 255, n /= 255),
                a = Math.max(t, e, n),
                u = a - o,
                s = (a + o) / 2;
            return u ? (i = .5 > s ? u / (a + o) : u / (2 - a - o), r = t == a ? (e - n) / u + (n > e ? 6 : 0) : e == a ? (n - t) / u + 2 : (t - e) / u + 4, r *= 60) : (r = 0 / 0, i = s > 0 && 1 > s ? 0 : r), O(r, i, s)
        }

        function ue(t, e, n) {
            t = se(t), e = se(e), n = se(n);
            var r = te((.4124564 * t + .3575761 * e + .1804375 * n) / Ba),
                i = te((.2126729 * t + .7151522 * e + .072175 * n) / Ia),
                o = te((.0193339 * t + .119192 * e + .9503041 * n) / Wa);
            return Z(116 * i - 16, 500 * (r - i), 200 * (i - o))
        }

        function se(t) {
            return .04045 >= (t /= 255) ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
        }

        function ce(t) {
            var e = parseFloat(t);
            return "%" === t.charAt(t.length - 1) ? Math.round(2.55 * e) : e
        }

        function le(t) {
            return "function" == typeof t ? t : function() {
                return t
            }
        }

        function fe(t) {
            return t
        }

        function he(t) {
            return 1 === t.length ? function(e, n) {
                t(null == e ? n : null)
            } : t
        }

        function de(t, e) {
            function n(t, n, o) {
                3 > arguments.length && (o = n, n = null);
                var a = ca.xhr(t, e, o);
                return a.row = function(t) {
                    return arguments.length ? a.response(null == (n = t) ? r : i(t)) : n
                }, a.row(n)
            }

            function r(t) {
                return n.parse(t.responseText)
            }

            function i(t) {
                return function(e) {
                    return n.parse(e.responseText, t)
                }
            }

            function a(e) {
                return e.map(u).join(t)
            }

            function u(t) {
                return s.test(t) ? '"' + t.replace(/\"/g, '""') + '"' : t
            }
            var s = RegExp('["' + t + "\n]"),
                c = t.charCodeAt(0);
            return n.parse = function(t, e) {
                var r;
                return n.parseRows(t, function(t, n) {
                    if (r) return r(t, n - 1);
                    var i = Function("d", "return {" + t.map(function(t, e) {
                        return JSON.stringify(t) + ": d[" + e + "]"
                    }).join(",") + "}");
                    r = e ? function(t, n) {
                        return e(i(t), n)
                    } : i
                })
            }, n.parseRows = function(t, e) {
                function n() {
                    if (l >= s) return a;
                    if (i) return i = !1, o;
                    var e = l;
                    if (34 === t.charCodeAt(e)) {
                        for (var n = e; s > n++;)
                            if (34 === t.charCodeAt(n)) {
                                if (34 !== t.charCodeAt(n + 1)) break;
                                ++n
                            }
                        l = n + 2;
                        var r = t.charCodeAt(n + 1);
                        return 13 === r ? (i = !0, 10 === t.charCodeAt(n + 2) && ++l) : 10 === r && (i = !0), t.substring(e + 1, n).replace(/""/g, '"')
                    }
                    for (; s > l;) {
                        var r = t.charCodeAt(l++),
                            u = 1;
                        if (10 === r) i = !0;
                        else if (13 === r) i = !0, 10 === t.charCodeAt(l) && (++l, ++u);
                        else if (r !== c) continue;
                        return t.substring(e, l - u)
                    }
                    return t.substring(e)
                }
                for (var r, i, o = {}, a = {}, u = [], s = t.length, l = 0, f = 0;
                    (r = n()) !== a;) {
                    for (var h = []; r !== o && r !== a;) h.push(r), r = n();
                    (!e || (h = e(h, f++))) && u.push(h)
                }
                return u
            }, n.format = function(e) {
                if (Array.isArray(e[0])) return n.formatRows(e);
                var r = new o,
                    i = [];
                return e.forEach(function(t) {
                    for (var e in t) r.has(e) || i.push(r.add(e))
                }), [i.map(u).join(t)].concat(e.map(function(e) {
                    return i.map(function(t) {
                        return u(e[t])
                    }).join(t)
                })).join("\n")
            }, n.formatRows = function(t) {
                return t.map(a).join("\n")
            }, n
        }

        function pe() {
            for (var t, e = Date.now(), n = Qa; n;) t = e - n.then, t >= n.delay && (n.flush = n.callback(t)), n = n.next;
            var r = ge() - e;
            r > 24 ? (isFinite(r) && (clearTimeout(Ga), Ga = setTimeout(pe, r)), Za = 0) : (Za = 1, tu(pe))
        }

        function ge() {
            for (var t = null, e = Qa, n = 1 / 0; e;) e.flush ? (delete Ka[e.callback.id], e = t ? t.next = e.next : Qa = e.next) : (n = Math.min(n, e.then + e.delay), e = (t = e).next);
            return n
        }

        function me(t, e) {
            var n = Math.pow(10, 3 * Math.abs(8 - e));
            return {
                scale: e > 8 ? function(t) {
                    return t / n
                } : function(t) {
                    return t * n
                },
                symbol: t
            }
        }

        function ve(t, e) {
            return e - (t ? Math.ceil(Math.log(t) / Math.LN10) : 1)
        }

        function ye(t) {
            return t + ""
        }

        function xe(t, e) {
            t && lu.hasOwnProperty(t.type) && lu[t.type](t, e)
        }

        function be(t, e, n) {
            var r, i = -1,
                o = t.length - n;
            for (e.lineStart(); o > ++i;) r = t[i], e.point(r[0], r[1]);
            e.lineEnd()
        }

        function Me(t, e) {
            var n = -1,
                r = t.length;
            for (e.polygonStart(); r > ++n;) be(t[n], e, 1);
            e.polygonEnd()
        }

        function _e() {
            function t(t, e) {
                t *= Ya, e = e * Ya / 2 + Oa / 4;
                var n = t - r,
                    a = Math.cos(e),
                    u = Math.sin(e),
                    s = o * u,
                    c = hu,
                    l = du,
                    f = i * a + s * Math.cos(n),
                    h = s * Math.sin(n);
                hu = c * f - l * h, du = l * f + c * h, r = t, i = a, o = u
            }
            var e, n, r, i, o;
            pu.point = function(a, u) {
                pu.point = t, r = (e = a) * Ya, i = Math.cos(u = (n = u) * Ya / 2 + Oa / 4), o = Math.sin(u)
            }, pu.lineEnd = function() {
                t(e, n)
            }
        }

        function we(t) {
            function e(t, e) {
                r > t && (r = t), t > o && (o = t), i > e && (i = e), e > a && (a = e)
            }

            function n() {
                u.point = u.lineEnd = A
            }
            var r, i, o, a, u = {
                point: e,
                lineStart: A,
                lineEnd: A,
                polygonStart: function() {
                    u.lineEnd = n
                },
                polygonEnd: function() {
                    u.point = e
                }
            };
            return function(e) {
                return a = o = -(r = i = 1 / 0), ca.geo.stream(e, t(u)), [
                    [r, i],
                    [o, a]
                ]
            }
        }

        function ke(t, e) {
            if (!gu) {
                ++mu, t *= Ya;
                var n = Math.cos(e *= Ya);
                vu += (n * Math.cos(t) - vu) / mu, yu += (n * Math.sin(t) - yu) / mu, xu += (Math.sin(e) - xu) / mu
            }
        }

        function Te() {
            var t, e;
            gu = 1, Se(), gu = 2;
            var n = bu.point;
            bu.point = function(r, i) {
                n(t = r, e = i)
            }, bu.lineEnd = function() {
                bu.point(t, e), Ee(), bu.lineEnd = Ee
            }
        }

        function Se() {
            function t(t, i) {
                t *= Ya;
                var o = Math.cos(i *= Ya),
                    a = o * Math.cos(t),
                    u = o * Math.sin(t),
                    s = Math.sin(i),
                    c = Math.atan2(Math.sqrt((c = n * s - r * u) * c + (c = r * a - e * s) * c + (c = e * u - n * a) * c), e * a + n * u + r * s);
                mu += c, vu += c * (e + (e = a)), yu += c * (n + (n = u)), xu += c * (r + (r = s))
            }
            var e, n, r;
            gu > 1 || (1 > gu && (gu = 1, mu = vu = yu = xu = 0), bu.point = function(i, o) {
                i *= Ya;
                var a = Math.cos(o *= Ya);
                e = a * Math.cos(i), n = a * Math.sin(i), r = Math.sin(o), bu.point = t
            })
        }

        function Ee() {
            bu.point = ke
        }

        function Ne(t) {
            var e = t[0],
                n = t[1],
                r = Math.cos(n);
            return [r * Math.cos(e), r * Math.sin(e), Math.sin(n)]
        }

        function Ce(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
        }

        function Ae(t, e) {
            return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
        }

        function De(t, e) {
            t[0] += e[0], t[1] += e[1], t[2] += e[2]
        }

        function Le(t, e) {
            return [t[0] * e, t[1] * e, t[2] * e]
        }

        function He(t) {
            var e = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
            t[0] /= e, t[1] /= e, t[2] /= e
        }

        function je() {
            return !0
        }

        function Fe(t) {
            return [Math.atan2(t[1], t[0]), Math.asin(Math.max(-1, Math.min(1, t[2])))]
        }

        function qe(t, e) {
            return Pa > Math.abs(t[0] - e[0]) && Pa > Math.abs(t[1] - e[1])
        }

        function Oe(t, e, n, r, i) {
            var o = [],
                a = [];
            if (t.forEach(function(t) {
                    if (!(0 >= (e = t.length - 1))) {
                        var e, n = t[0],
                            r = t[e];
                        if (qe(n, r)) {
                            i.lineStart();
                            for (var u = 0; e > u; ++u) i.point((n = t[u])[0], n[1]);
                            return i.lineEnd(), void 0
                        }
                        var s = {
                                point: n,
                                points: t,
                                other: null,
                                visited: !1,
                                entry: !0,
                                subject: !0
                            },
                            c = {
                                point: n,
                                points: [n],
                                other: s,
                                visited: !1,
                                entry: !1,
                                subject: !1
                            };
                        s.other = c, o.push(s), a.push(c), s = {
                            point: r,
                            points: [r],
                            other: null,
                            visited: !1,
                            entry: !1,
                            subject: !0
                        }, c = {
                            point: r,
                            points: [r],
                            other: s,
                            visited: !1,
                            entry: !0,
                            subject: !1
                        }, s.other = c, o.push(s), a.push(c)
                    }
                }), a.sort(e), Pe(o), Pe(a), o.length) {
                if (n)
                    for (var u = 1, s = !n(a[0].point), c = a.length; c > u; ++u) a[u].entry = s = !s;
                for (var l, f, h, d = o[0];;) {
                    for (l = d; l.visited;)
                        if ((l = l.next) === d) return;
                    f = l.points, i.lineStart();
                    do {
                        if (l.visited = l.other.visited = !0, l.entry) {
                            if (l.subject)
                                for (var u = 0; f.length > u; u++) i.point((h = f[u])[0], h[1]);
                            else r(l.point, l.next.point, 1, i);
                            l = l.next
                        } else {
                            if (l.subject) {
                                f = l.prev.points;
                                for (var u = f.length; --u >= 0;) i.point((h = f[u])[0], h[1])
                            } else r(l.point, l.prev.point, -1, i);
                            l = l.prev
                        }
                        l = l.other, f = l.points
                    } while (!l.visited);
                    i.lineEnd()
                }
            }
        }

        function Pe(t) {
            if (e = t.length) {
                for (var e, n, r = 0, i = t[0]; e > ++r;) i.next = n = t[r], n.prev = i, i = n;
                i.next = n = t[0], n.prev = i
            }
        }

        function Ye(t, e, n) {
            return function(r) {
                function i(e, n) {
                    t(e, n) && r.point(e, n)
                }

                function o(t, e) {
                    m.point(t, e)
                }

                function a() {
                    v.point = o, m.lineStart()
                }

                function u() {
                    v.point = i, m.lineEnd()
                }

                function s(t, e) {
                    x.point(t, e), g.push([t, e])
                }

                function c() {
                    x.lineStart(), g = []
                }

                function l() {
                    s(g[0][0], g[0][1]), x.lineEnd();
                    var t, e = x.clean(),
                        n = y.buffer(),
                        i = n.length;
                    if (!i) return p = !0, d += $e(g, -1), g = null, void 0;
                    if (g = null, 1 & e) {
                        t = n[0], h += $e(t, 1);
                        var o, i = t.length - 1,
                            a = -1;
                        for (r.lineStart(); i > ++a;) r.point((o = t[a])[0], o[1]);
                        return r.lineEnd(), void 0
                    }
                    i > 1 && 2 & e && n.push(n.pop().concat(n.shift())), f.push(n.filter(ze))
                }
                var f, h, d, p, g, m = e(r),
                    v = {
                        point: i,
                        lineStart: a,
                        lineEnd: u,
                        polygonStart: function() {
                            v.point = s, v.lineStart = c, v.lineEnd = l, p = !1, d = h = 0, f = [], r.polygonStart()
                        },
                        polygonEnd: function() {
                            v.point = i, v.lineStart = a, v.lineEnd = u, f = ca.merge(f), f.length ? Oe(f, Be, null, n, r) : (-Pa > h || p && -Pa > d) && (r.lineStart(), n(null, null, 1, r), r.lineEnd()), r.polygonEnd(), f = null
                        },
                        sphere: function() {
                            r.polygonStart(), r.lineStart(), n(null, null, 1, r), r.lineEnd(), r.polygonEnd()
                        }
                    },
                    y = Re(),
                    x = e(y);
                return v
            }
        }

        function ze(t) {
            return t.length > 1
        }

        function Re() {
            var t, e = [];
            return {
                lineStart: function() {
                    e.push(t = [])
                },
                point: function(e, n) {
                    t.push([e, n])
                },
                lineEnd: A,
                buffer: function() {
                    var n = e;
                    return e = [], t = null, n
                },
                rejoin: function() {
                    e.length > 1 && e.push(e.pop().concat(e.shift()))
                }
            }
        }

        function $e(t, e) {
            if (!(n = t.length)) return 0;
            for (var n, r, i, o = 0, a = 0, u = t[0], s = u[0], c = u[1], l = Math.cos(c), f = Math.atan2(e * Math.sin(s) * l, Math.sin(c)), h = 1 - e * Math.cos(s) * l, d = f; n > ++o;) u = t[o], l = Math.cos(c = u[1]), r = Math.atan2(e * Math.sin(s = u[0]) * l, Math.sin(c)), i = 1 - e * Math.cos(s) * l, Pa > Math.abs(h - 2) && Pa > Math.abs(i - 2) || (Pa > Math.abs(i) || Pa > Math.abs(h) || (Pa > Math.abs(Math.abs(r - f) - Oa) ? i + h > 2 && (a += 4 * (r - f)) : a += Pa > Math.abs(h - 2) ? 4 * (r - d) : ((3 * Oa + r - f) % (2 * Oa) - Oa) * (h + i)), d = f, f = r, h = i);
            return a
        }

        function Be(t, e) {
            return (0 > (t = t.point)[0] ? t[1] - Oa / 2 - Pa : Oa / 2 - t[1]) - (0 > (e = e.point)[0] ? e[1] - Oa / 2 - Pa : Oa / 2 - e[1])
        }

        function Ie(t) {
            var e, n = 0 / 0,
                r = 0 / 0,
                i = 0 / 0;
            return {
                lineStart: function() {
                    t.lineStart(), e = 1
                },
                point: function(o, a) {
                    var u = o > 0 ? Oa : -Oa,
                        s = Math.abs(o - n);
                    Pa > Math.abs(s - Oa) ? (t.point(n, r = (r + a) / 2 > 0 ? Oa / 2 : -Oa / 2), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(u, r), t.point(o, r), e = 0) : i !== u && s >= Oa && (Pa > Math.abs(n - i) && (n -= i * Pa), Pa > Math.abs(o - u) && (o -= u * Pa), r = We(n, r, o, a), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(u, r), e = 0), t.point(n = o, r = a), i = u
                },
                lineEnd: function() {
                    t.lineEnd(), n = r = 0 / 0
                },
                clean: function() {
                    return 2 - e
                }
            }
        }

        function We(t, e, n, r) {
            var i, o, a = Math.sin(t - n);
            return Math.abs(a) > Pa ? Math.atan((Math.sin(e) * (o = Math.cos(r)) * Math.sin(n) - Math.sin(r) * (i = Math.cos(e)) * Math.sin(t)) / (i * o * a)) : (e + r) / 2
        }

        function Ue(t, e, n, r) {
            var i;
            if (null == t) i = n * Oa / 2, r.point(-Oa, i), r.point(0, i), r.point(Oa, i), r.point(Oa, 0), r.point(Oa, -i), r.point(0, -i), r.point(-Oa, -i), r.point(-Oa, 0), r.point(-Oa, i);
            else if (Math.abs(t[0] - e[0]) > Pa) {
                var o = (t[0] < e[0] ? 1 : -1) * Oa;
                i = n * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
            } else r.point(e[0], e[1])
        }

        function Xe(t) {
            function e(t, e) {
                return Math.cos(t) * Math.cos(e) > o
            }

            function n(t) {
                var n, o, s, c, l;
                return {
                    lineStart: function() {
                        c = s = !1, l = 1
                    },
                    point: function(f, h) {
                        var d, p = [f, h],
                            g = e(f, h),
                            m = a ? g ? 0 : i(f, h) : g ? i(f + (0 > f ? Oa : -Oa), h) : 0;
                        if (!n && (c = s = g) && t.lineStart(), g !== s && (d = r(n, p), (qe(n, d) || qe(p, d)) && (p[0] += Pa, p[1] += Pa, g = e(p[0], p[1]))), g !== s) l = 0, g ? (t.lineStart(), d = r(p, n), t.point(d[0], d[1])) : (d = r(n, p), t.point(d[0], d[1]), t.lineEnd()), n = d;
                        else if (u && n && a ^ g) {
                            var v;
                            m & o || !(v = r(p, n, !0)) || (l = 0, a ? (t.lineStart(), t.point(v[0][0], v[0][1]), t.point(v[1][0], v[1][1]), t.lineEnd()) : (t.point(v[1][0], v[1][1]), t.lineEnd(), t.lineStart(), t.point(v[0][0], v[0][1])))
                        }!g || n && qe(n, p) || t.point(p[0], p[1]), n = p, s = g, o = m
                    },
                    lineEnd: function() {
                        s && t.lineEnd(), n = null
                    },
                    clean: function() {
                        return l | (c && s) << 1
                    }
                }
            }

            function r(t, e, n) {
                var r = Ne(t),
                    i = Ne(e),
                    a = [1, 0, 0],
                    u = Ae(r, i),
                    s = Ce(u, u),
                    c = u[0],
                    l = s - c * c;
                if (!l) return !n && t;
                var f = o * s / l,
                    h = -o * c / l,
                    d = Ae(a, u),
                    p = Le(a, f),
                    g = Le(u, h);
                De(p, g);
                var m = d,
                    v = Ce(p, m),
                    y = Ce(m, m),
                    x = v * v - y * (Ce(p, p) - 1);
                if (!(0 > x)) {
                    var b = Math.sqrt(x),
                        M = Le(m, (-v - b) / y);
                    if (De(M, p), M = Fe(M), !n) return M;
                    var _, w = t[0],
                        k = e[0],
                        T = t[1],
                        S = e[1];
                    w > k && (_ = w, w = k, k = _);
                    var E = k - w,
                        N = Pa > Math.abs(E - Oa),
                        C = N || Pa > E;
                    if (!N && T > S && (_ = T, T = S, S = _), C ? N ? T + S > 0 ^ M[1] < (Pa > Math.abs(M[0] - w) ? T : S) : M[1] >= T && S >= M[1] : E > Oa ^ (M[0] >= w && k >= M[0])) {
                        var A = Le(m, (-v + b) / y);
                        return De(A, p), [M, Fe(A)]
                    }
                }
            }

            function i(e, n) {
                var r = a ? t : Oa - t,
                    i = 0;
                return -r > e ? i |= 1 : e > r && (i |= 2), -r > n ? i |= 4 : n > r && (i |= 8), i
            }
            var o = Math.cos(t),
                a = o > 0,
                u = Math.abs(o) > Pa,
                s = un(t, 6 * Ya);
            return Ye(e, n, s)
        }

        function Ve(t, e, n, r) {
            function i(r, i) {
                return Pa > Math.abs(r[0] - t) ? i > 0 ? 0 : 3 : Pa > Math.abs(r[0] - n) ? i > 0 ? 2 : 1 : Pa > Math.abs(r[1] - e) ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
            }

            function o(t, e) {
                return a(t.point, e.point)
            }

            function a(t, e) {
                var n = i(t, 1),
                    r = i(e, 1);
                return n !== r ? n - r : 0 === n ? e[1] - t[1] : 1 === n ? t[0] - e[0] : 2 === n ? t[1] - e[1] : e[0] - t[0]
            }

            function u(i, o) {
                var a = o[0] - i[0],
                    u = o[1] - i[1],
                    s = [0, 1];
                return Pa > Math.abs(a) && Pa > Math.abs(u) ? i[0] >= t && n >= i[0] && i[1] >= e && r >= i[1] : Ze(t - i[0], a, s) && Ze(i[0] - n, -a, s) && Ze(e - i[1], u, s) && Ze(i[1] - r, -u, s) ? (1 > s[1] && (o[0] = i[0] + s[1] * a, o[1] = i[1] + s[1] * u), s[0] > 0 && (i[0] += s[0] * a, i[1] += s[0] * u), !0) : !1
            }
            return function(s) {
                function c(o) {
                    var a = i(o, -1),
                        u = l([0 === a || 3 === a ? t : n, a > 1 ? r : e]);
                    return u
                }

                function l(t) {
                    for (var e = 0, n = x.length, r = t[1], i = 0; n > i; ++i)
                        for (var o = 1, a = x[i], u = a.length, s = a[0]; u > o; ++o) b = a[o], r >= s[1] ? b[1] > r && f(s, b, t) > 0 && ++e : r >= b[1] && 0 > f(s, b, t) && --e, s = b;
                    return 0 !== e
                }

                function f(t, e, n) {
                    return (e[0] - t[0]) * (n[1] - t[1]) - (n[0] - t[0]) * (e[1] - t[1])
                }

                function h(o, u, s, c) {
                    var l = 0,
                        f = 0;
                    if (null == o || (l = i(o, s)) !== (f = i(u, s)) || 0 > a(o, u) ^ s > 0) {
                        do c.point(0 === l || 3 === l ? t : n, l > 1 ? r : e); while ((l = (l + s + 4) % 4) !== f)
                    } else c.point(u[0], u[1])
                }

                function d(i, o) {
                    return i >= t && n >= i && o >= e && r >= o
                }

                function p(t, e) {
                    d(t, e) && s.point(t, e)
                }

                function g() {
                    D.point = v, x && x.push(M = []), N = !0, E = !1, T = S = 0 / 0
                }

                function m() {
                    y && (v(_, w), k && E && A.rejoin(), y.push(A.buffer())), D.point = p, E && s.lineEnd()
                }

                function v(t, e) {
                    t = Math.max(-_u, Math.min(_u, t)), e = Math.max(-_u, Math.min(_u, e));
                    var n = d(t, e);
                    if (x && M.push([t, e]), N) _ = t, w = e, k = n, N = !1, n && (s.lineStart(), s.point(t, e));
                    else if (n && E) s.point(t, e);
                    else {
                        var r = [T, S],
                            i = [t, e];
                        u(r, i) ? (E || (s.lineStart(), s.point(r[0], r[1])), s.point(i[0], i[1]), n || s.lineEnd()) : (s.lineStart(), s.point(t, e))
                    }
                    T = t, S = e, E = n
                }
                var y, x, M, _, w, k, T, S, E, N, C = s,
                    A = Re(),
                    D = {
                        point: p,
                        lineStart: g,
                        lineEnd: m,
                        polygonStart: function() {
                            s = A, y = [], x = []
                        },
                        polygonEnd: function() {
                            s = C, (y = ca.merge(y)).length ? (s.polygonStart(), Oe(y, o, c, h, s), s.polygonEnd()) : l([t, e]) && (s.polygonStart(), s.lineStart(), h(null, null, 1, s), s.lineEnd(), s.polygonEnd()), y = x = M = null
                        }
                    };
                return D
            }
        }

        function Ze(t, e, n) {
            if (Pa > Math.abs(e)) return 0 >= t;
            var r = t / e;
            if (e > 0) {
                if (r > n[1]) return !1;
                r > n[0] && (n[0] = r)
            } else {
                if (n[0] > r) return !1;
                n[1] > r && (n[1] = r)
            }
            return !0
        }

        function Ge(t, e) {
            function n(n, r) {
                return n = t(n, r), e(n[0], n[1])
            }
            return t.invert && e.invert && (n.invert = function(n, r) {
                return n = e.invert(n, r), n && t.invert(n[0], n[1])
            }), n
        }

        function Je(t) {
            function e(e) {
                function r(n, r) {
                    n = t(n, r), e.point(n[0], n[1])
                }

                function o() {
                    l = 0 / 0, g.point = a, e.lineStart()
                }

                function a(r, o) {
                    var a = Ne([r, o]),
                        u = t(r, o);
                    n(l, f, c, h, d, p, l = u[0], f = u[1], c = r, h = a[0], d = a[1], p = a[2], i, e), e.point(l, f)
                }

                function u() {
                    g.point = r, e.lineEnd()
                }

                function s() {
                    var t, r, s, m, v, y, x;
                    o(), g.point = function(e, n) {
                        a(t = e, r = n), s = l, m = f, v = h, y = d, x = p, g.point = a
                    }, g.lineEnd = function() {
                        n(l, f, c, h, d, p, s, m, t, v, y, x, i, e), g.lineEnd = u, u()
                    }
                }
                var c, l, f, h, d, p, g = {
                    point: r,
                    lineStart: o,
                    lineEnd: u,
                    polygonStart: function() {
                        e.polygonStart(), g.lineStart = s
                    },
                    polygonEnd: function() {
                        e.polygonEnd(), g.lineStart = o
                    }
                };
                return g
            }

            function n(e, i, o, a, u, s, c, l, f, h, d, p, g, m) {
                var v = c - e,
                    y = l - i,
                    x = v * v + y * y;
                if (x > 4 * r && g--) {
                    var b = a + h,
                        M = u + d,
                        _ = s + p,
                        w = Math.sqrt(b * b + M * M + _ * _),
                        k = Math.asin(_ /= w),
                        T = Pa > Math.abs(Math.abs(_) - 1) ? (o + f) / 2 : Math.atan2(M, b),
                        S = t(T, k),
                        E = S[0],
                        N = S[1],
                        C = E - e,
                        A = N - i,
                        D = y * C - v * A;
                    (D * D / x > r || Math.abs((v * C + y * A) / x - .5) > .3) && (n(e, i, o, a, u, s, E, N, T, b /= w, M /= w, _, g, m), m.point(E, N), n(E, N, T, b, M, _, c, l, f, h, d, p, g, m))
                }
            }
            var r = .5,
                i = 16;
            return e.precision = function(t) {
                return arguments.length ? (i = (r = t * t) > 0 && 16, e) : Math.sqrt(r)
            }, e
        }

        function Ke(t) {
            return Qe(function() {
                return t
            })()
        }

        function Qe(t) {
            function e(t) {
                return t = a(t[0] * Ya, t[1] * Ya), [t[0] * l + u, s - t[1] * l]
            }

            function n(t) {
                return t = a.invert((t[0] - u) / l, (s - t[1]) / l), t && [t[0] * za, t[1] * za]
            }

            function r() {
                a = Ge(o = nn(g, m, v), i);
                var t = i(d, p);
                return u = f - t[0] * l, s = h + t[1] * l, e
            }
            var i, o, a, u, s, c = Je(function(t, e) {
                    return t = i(t, e), [t[0] * l + u, s - t[1] * l]
                }),
                l = 150,
                f = 480,
                h = 250,
                d = 0,
                p = 0,
                g = 0,
                m = 0,
                v = 0,
                y = Mu,
                x = fe,
                b = null,
                M = null;
            return e.stream = function(t) {
                    return tn(o, y(c(x(t))))
                }, e.clipAngle = function(t) {
                    return arguments.length ? (y = null == t ? (b = t, Mu) : Xe((b = +t) * Ya), e) : b
                }, e.clipExtent = function(t) {
                    return arguments.length ? (M = t, x = null == t ? fe : Ve(t[0][0], t[0][1], t[1][0], t[1][1]), e) : M
                }, e.scale = function(t) {
                    return arguments.length ? (l = +t, r()) : l
                }, e.translate = function(t) {
                    return arguments.length ? (f = +t[0], h = +t[1], r()) : [f, h]
                }, e.center = function(t) {
                    return arguments.length ? (d = t[0] % 360 * Ya, p = t[1] % 360 * Ya, r()) : [d * za, p * za]
                }, e.rotate = function(t) {
                    return arguments.length ? (g = t[0] % 360 * Ya, m = t[1] % 360 * Ya, v = t.length > 2 ? t[2] % 360 * Ya : 0, r()) : [g * za, m * za, v * za]
                }, ca.rebind(e, c, "precision"),
                function() {
                    return i = t.apply(this, arguments), e.invert = i.invert && n, r()
                }
        }

        function tn(t, e) {
            return {
                point: function(n, r) {
                    r = t(n * Ya, r * Ya), n = r[0], e.point(n > Oa ? n - 2 * Oa : -Oa > n ? n + 2 * Oa : n, r[1])
                },
                sphere: function() {
                    e.sphere()
                },
                lineStart: function() {
                    e.lineStart()
                },
                lineEnd: function() {
                    e.lineEnd()
                },
                polygonStart: function() {
                    e.polygonStart()
                },
                polygonEnd: function() {
                    e.polygonEnd()
                }
            }
        }

        function en(t, e) {
            return [t, e]
        }

        function nn(t, e, n) {
            return t ? e || n ? Ge(on(t), an(e, n)) : on(t) : e || n ? an(e, n) : en
        }

        function rn(t) {
            return function(e, n) {
                return e += t, [e > Oa ? e - 2 * Oa : -Oa > e ? e + 2 * Oa : e, n]
            }
        }

        function on(t) {
            var e = rn(t);
            return e.invert = rn(-t), e
        }

        function an(t, e) {
            function n(t, e) {
                var n = Math.cos(e),
                    u = Math.cos(t) * n,
                    s = Math.sin(t) * n,
                    c = Math.sin(e),
                    l = c * r + u * i;
                return [Math.atan2(s * o - l * a, u * r - c * i), Math.asin(Math.max(-1, Math.min(1, l * o + s * a)))]
            }
            var r = Math.cos(t),
                i = Math.sin(t),
                o = Math.cos(e),
                a = Math.sin(e);
            return n.invert = function(t, e) {
                var n = Math.cos(e),
                    u = Math.cos(t) * n,
                    s = Math.sin(t) * n,
                    c = Math.sin(e),
                    l = c * o - s * a;
                return [Math.atan2(s * o + c * a, u * r + l * i), Math.asin(Math.max(-1, Math.min(1, l * r - u * i)))]
            }, n
        }

        function un(t, e) {
            var n = Math.cos(t),
                r = Math.sin(t);
            return function(i, o, a, u) {
                null != i ? (i = sn(n, i), o = sn(n, o), (a > 0 ? o > i : i > o) && (i += 2 * a * Oa)) : (i = t + 2 * a * Oa, o = t);
                for (var s, c = a * e, l = i; a > 0 ? l > o : o > l; l -= c) u.point((s = Fe([n, -r * Math.cos(l), -r * Math.sin(l)]))[0], s[1])
            }
        }

        function sn(t, e) {
            var n = Ne(e);
            n[0] -= t, He(n);
            var r = R(-n[1]);
            return ((0 > -n[2] ? -r : r) + 2 * Math.PI - Pa) % (2 * Math.PI)
        }

        function cn(t, e, n) {
            var r = ca.range(t, e - Pa, n).concat(e);
            return function(t) {
                return r.map(function(e) {
                    return [t, e]
                })
            }
        }

        function ln(t, e, n) {
            var r = ca.range(t, e - Pa, n).concat(e);
            return function(t) {
                return r.map(function(e) {
                    return [e, t]
                })
            }
        }

        function fn(t) {
            return t.source
        }

        function hn(t) {
            return t.target
        }

        function dn(t, e, n, r) {
            var i = Math.cos(e),
                o = Math.sin(e),
                a = Math.cos(r),
                u = Math.sin(r),
                s = i * Math.cos(t),
                c = i * Math.sin(t),
                l = a * Math.cos(n),
                f = a * Math.sin(n),
                h = 2 * Math.asin(Math.sqrt(W(r - e) + i * a * W(n - t))),
                d = 1 / Math.sin(h),
                p = h ? function(t) {
                    var e = Math.sin(t *= h) * d,
                        n = Math.sin(h - t) * d,
                        r = n * s + e * l,
                        i = n * c + e * f,
                        a = n * o + e * u;
                    return [Math.atan2(i, r) * za, Math.atan2(a, Math.sqrt(r * r + i * i)) * za]
                } : function() {
                    return [t * za, e * za]
                };
            return p.distance = h, p
        }

        function pn() {
            function t(t, i) {
                var o = Math.sin(i *= Ya),
                    a = Math.cos(i),
                    u = Math.abs((t *= Ya) - e),
                    s = Math.cos(u);
                wu += Math.atan2(Math.sqrt((u = a * Math.sin(u)) * u + (u = r * o - n * a * s) * u), n * o + r * a * s), e = t, n = o, r = a
            }
            var e, n, r;
            ku.point = function(i, o) {
                e = i * Ya, n = Math.sin(o *= Ya), r = Math.cos(o), ku.point = t
            }, ku.lineEnd = function() {
                ku.point = ku.lineEnd = A
            }
        }

        function gn(t) {
            var e = 0,
                n = Oa / 3,
                r = Qe(t),
                i = r(e, n);
            return i.parallels = function(t) {
                return arguments.length ? r(e = t[0] * Oa / 180, n = t[1] * Oa / 180) : [180 * (e / Oa), 180 * (n / Oa)]
            }, i
        }

        function mn(t, e) {
            function n(t, e) {
                var n = Math.sqrt(o - 2 * i * Math.sin(e)) / i;
                return [n * Math.sin(t *= i), a - n * Math.cos(t)]
            }
            var r = Math.sin(t),
                i = (r + Math.sin(e)) / 2,
                o = 1 + r * (2 * i - r),
                a = Math.sqrt(o) / i;
            return n.invert = function(t, e) {
                var n = a - e;
                return [Math.atan2(t, n) / i, Math.asin((o - (t * t + n * n) * i * i) / (2 * i))]
            }, n
        }

        function vn(t, e) {
            var n = t(e[0]),
                r = t([.5 * (e[0][0] + e[1][0]), e[0][1]]),
                i = t([e[1][0], e[0][1]]),
                o = t(e[1]),
                a = r[1] - n[1],
                u = r[0] - n[0],
                s = i[1] - r[1],
                c = i[0] - r[0],
                l = a / u,
                f = s / c,
                h = .5 * (l * f * (n[1] - i[1]) + f * (n[0] + r[0]) - l * (r[0] + i[0])) / (f - l),
                d = (.5 * (n[0] + r[0]) - h) / l + .5 * (n[1] + r[1]),
                p = o[0] - h,
                g = o[1] - d,
                m = n[0] - h,
                v = n[1] - d,
                y = p * p + g * g,
                x = m * m + v * v,
                b = Math.atan2(g, p),
                M = Math.atan2(v, m);
            return function(e) {
                var n = e[0] - h,
                    r = e[1] - d,
                    i = n * n + r * r,
                    o = Math.atan2(r, n);
                return i > y && x > i && o > b && M > o ? t.invert(e) : void 0
            }
        }

        function yn() {
            function t(t, e) {
                Su += i * t - r * e, r = t, i = e
            }
            var e, n, r, i;
            Eu.point = function(o, a) {
                Eu.point = t, e = r = o, n = i = a
            }, Eu.lineEnd = function() {
                t(e, n)
            }
        }

        function xn() {
            function t(t, e) {
                a.push("M", t, ",", e, o)
            }

            function e(t, e) {
                a.push("M", t, ",", e), u.point = n
            }

            function n(t, e) {
                a.push("L", t, ",", e)
            }

            function r() {
                u.point = t
            }

            function i() {
                a.push("Z")
            }
            var o = Tn(4.5),
                a = [],
                u = {
                    point: t,
                    lineStart: function() {
                        u.point = e
                    },
                    lineEnd: r,
                    polygonStart: function() {
                        u.lineEnd = i
                    },
                    polygonEnd: function() {
                        u.lineEnd = r, u.point = t
                    },
                    pointRadius: function(t) {
                        return o = Tn(t), u
                    },
                    result: function() {
                        if (a.length) {
                            var t = a.join("");
                            return a = [], t
                        }
                    }
                };
            return u
        }

        function bn(t, e) {
            gu || (vu += t, yu += e, ++xu)
        }

        function Mn() {
            function t(t, r) {
                var i = t - e,
                    o = r - n,
                    a = Math.sqrt(i * i + o * o);
                vu += a * (e + t) / 2, yu += a * (n + r) / 2, xu += a, e = t, n = r
            }
            var e, n;
            if (1 !== gu) {
                if (!(1 > gu)) return;
                gu = 1, vu = yu = xu = 0
            }
            Nu.point = function(r, i) {
                Nu.point = t, e = r, n = i
            }
        }

        function _n() {
            Nu.point = bn
        }

        function wn() {
            function t(t, e) {
                var n = i * t - r * e;
                vu += n * (r + t), yu += n * (i + e), xu += 3 * n, r = t, i = e
            }
            var e, n, r, i;
            2 > gu && (gu = 2, vu = yu = xu = 0), Nu.point = function(o, a) {
                Nu.point = t, e = r = o, n = i = a
            }, Nu.lineEnd = function() {
                t(e, n)
            }
        }

        function kn(t) {
            function e(e, n) {
                t.moveTo(e, n), t.arc(e, n, a, 0, 2 * Oa)
            }

            function n(e, n) {
                t.moveTo(e, n), u.point = r
            }

            function r(e, n) {
                t.lineTo(e, n)
            }

            function i() {
                u.point = e
            }

            function o() {
                t.closePath()
            }
            var a = 4.5,
                u = {
                    point: e,
                    lineStart: function() {
                        u.point = n
                    },
                    lineEnd: i,
                    polygonStart: function() {
                        u.lineEnd = o
                    },
                    polygonEnd: function() {
                        u.lineEnd = i, u.point = e
                    },
                    pointRadius: function(t) {
                        return a = t, u
                    },
                    result: A
                };
            return u
        }

        function Tn(t) {
            return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
        }

        function Sn(t) {
            var e = Je(function(e, n) {
                return t([e * za, n * za])
            });
            return function(t) {
                return t = e(t), {
                    point: function(e, n) {
                        t.point(e * Ya, n * Ya)
                    },
                    sphere: function() {
                        t.sphere()
                    },
                    lineStart: function() {
                        t.lineStart()
                    },
                    lineEnd: function() {
                        t.lineEnd()
                    },
                    polygonStart: function() {
                        t.polygonStart()
                    },
                    polygonEnd: function() {
                        t.polygonEnd()
                    }
                }
            }
        }

        function En(t, e) {
            function n(e, n) {
                var r = Math.cos(e),
                    i = Math.cos(n),
                    o = t(r * i);
                return [o * i * Math.sin(e), o * Math.sin(n)]
            }
            return n.invert = function(t, n) {
                var r = Math.sqrt(t * t + n * n),
                    i = e(r),
                    o = Math.sin(i),
                    a = Math.cos(i);
                return [Math.atan2(t * o, r * a), Math.asin(r && n * o / r)]
            }, n
        }

        function Nn(t, e) {
            function n(t, e) {
                var n = Pa > Math.abs(Math.abs(e) - Oa / 2) ? 0 : a / Math.pow(i(e), o);
                return [n * Math.sin(o * t), a - n * Math.cos(o * t)]
            }
            var r = Math.cos(t),
                i = function(t) {
                    return Math.tan(Oa / 4 + t / 2)
                },
                o = t === e ? Math.sin(t) : Math.log(r / Math.cos(e)) / Math.log(i(e) / i(t)),
                a = r * Math.pow(i(t), o) / o;
            return o ? (n.invert = function(t, e) {
                var n = a - e,
                    r = z(o) * Math.sqrt(t * t + n * n);
                return [Math.atan2(t, n) / o, 2 * Math.atan(Math.pow(a / r, 1 / o)) - Oa / 2]
            }, n) : An
        }

        function Cn(t, e) {
            function n(t, e) {
                var n = o - e;
                return [n * Math.sin(i * t), o - n * Math.cos(i * t)]
            }
            var r = Math.cos(t),
                i = t === e ? Math.sin(t) : (r - Math.cos(e)) / (e - t),
                o = r / i + t;
            return Pa > Math.abs(i) ? en : (n.invert = function(t, e) {
                var n = o - e;
                return [Math.atan2(t, n) / i, o - z(i) * Math.sqrt(t * t + n * n)]
            }, n)
        }

        function An(t, e) {
            return [t, Math.log(Math.tan(Oa / 4 + e / 2))]
        }

        function Dn(t) {
            var e, n = Ke(t),
                r = n.scale,
                i = n.translate,
                o = n.clipExtent;
            return n.scale = function() {
                var t = r.apply(n, arguments);
                return t === n ? e ? n.clipExtent(null) : n : t
            }, n.translate = function() {
                var t = i.apply(n, arguments);
                return t === n ? e ? n.clipExtent(null) : n : t
            }, n.clipExtent = function(t) {
                var a = o.apply(n, arguments);
                if (a === n) {
                    if (e = null == t) {
                        var u = Oa * r(),
                            s = i();
                        o([
                            [s[0] - u, s[1] - u],
                            [s[0] + u, s[1] + u]
                        ])
                    }
                } else e && (a = null);
                return a
            }, n.clipExtent(null)
        }

        function Ln(t, e) {
            var n = Math.cos(e) * Math.sin(t);
            return [Math.log((1 + n) / (1 - n)) / 2, Math.atan2(Math.tan(e), Math.cos(t))]
        }

        function Hn(t) {
            function e(e) {
                function a() {
                    c.push("M", o(t(l), u))
                }
                for (var s, c = [], l = [], f = -1, h = e.length, d = le(n), p = le(r); h > ++f;) i.call(this, s = e[f], f) ? l.push([+d.call(this, s, f), +p.call(this, s, f)]) : l.length && (a(), l = []);
                return l.length && a(), c.length ? c.join("") : null
            }
            var n = jn,
                r = Fn,
                i = je,
                o = qn,
                a = o.key,
                u = .7;
            return e.x = function(t) {
                return arguments.length ? (n = t, e) : n
            }, e.y = function(t) {
                return arguments.length ? (r = t, e) : r
            }, e.defined = function(t) {
                return arguments.length ? (i = t, e) : i
            }, e.interpolate = function(t) {
                return arguments.length ? (a = "function" == typeof t ? o = t : (o = ju.get(t) || qn).key, e) : a
            }, e.tension = function(t) {
                return arguments.length ? (u = t, e) : u
            }, e
        }

        function jn(t) {
            return t[0]
        }

        function Fn(t) {
            return t[1]
        }

        function qn(t) {
            return t.join("L")
        }

        function On(t) {
            return qn(t) + "Z"
        }

        function Pn(t) {
            for (var e = 0, n = t.length, r = t[0], i = [r[0], ",", r[1]]; n > ++e;) i.push("V", (r = t[e])[1], "H", r[0]);
            return i.join("")
        }

        function Yn(t) {
            for (var e = 0, n = t.length, r = t[0], i = [r[0], ",", r[1]]; n > ++e;) i.push("H", (r = t[e])[0], "V", r[1]);
            return i.join("")
        }

        function zn(t, e) {
            return 4 > t.length ? qn(t) : t[1] + Bn(t.slice(1, t.length - 1), In(t, e))
        }

        function Rn(t, e) {
            return 3 > t.length ? qn(t) : t[0] + Bn((t.push(t[0]), t), In([t[t.length - 2]].concat(t, [t[1]]), e))
        }

        function $n(t, e) {
            return 3 > t.length ? qn(t) : t[0] + Bn(t, In(t, e))
        }

        function Bn(t, e) {
            if (1 > e.length || t.length != e.length && t.length != e.length + 2) return qn(t);
            var n = t.length != e.length,
                r = "",
                i = t[0],
                o = t[1],
                a = e[0],
                u = a,
                s = 1;
            if (n && (r += "Q" + (o[0] - 2 * a[0] / 3) + "," + (o[1] - 2 * a[1] / 3) + "," + o[0] + "," + o[1], i = t[1], s = 2), e.length > 1) {
                u = e[1], o = t[s], s++, r += "C" + (i[0] + a[0]) + "," + (i[1] + a[1]) + "," + (o[0] - u[0]) + "," + (o[1] - u[1]) + "," + o[0] + "," + o[1];
                for (var c = 2; e.length > c; c++, s++) o = t[s], u = e[c], r += "S" + (o[0] - u[0]) + "," + (o[1] - u[1]) + "," + o[0] + "," + o[1]
            }
            if (n) {
                var l = t[s];
                r += "Q" + (o[0] + 2 * u[0] / 3) + "," + (o[1] + 2 * u[1] / 3) + "," + l[0] + "," + l[1]
            }
            return r
        }

        function In(t, e) {
            for (var n, r = [], i = (1 - e) / 2, o = t[0], a = t[1], u = 1, s = t.length; s > ++u;) n = o, o = a, a = t[u], r.push([i * (a[0] - n[0]), i * (a[1] - n[1])]);
            return r
        }

        function Wn(t) {
            if (3 > t.length) return qn(t);
            var e = 1,
                n = t.length,
                r = t[0],
                i = r[0],
                o = r[1],
                a = [i, i, i, (r = t[1])[0]],
                u = [o, o, o, r[1]],
                s = [i, ",", o];
            for (Gn(s, a, u); n > ++e;) r = t[e], a.shift(), a.push(r[0]), u.shift(), u.push(r[1]), Gn(s, a, u);
            for (e = -1; 2 > ++e;) a.shift(), a.push(r[0]), u.shift(), u.push(r[1]), Gn(s, a, u);
            return s.join("")
        }

        function Un(t) {
            if (4 > t.length) return qn(t);
            for (var e, n = [], r = -1, i = t.length, o = [0], a = [0]; 3 > ++r;) e = t[r], o.push(e[0]), a.push(e[1]);
            for (n.push(Zn(Ou, o) + "," + Zn(Ou, a)), --r; i > ++r;) e = t[r], o.shift(), o.push(e[0]), a.shift(), a.push(e[1]), Gn(n, o, a);
            return n.join("")
        }

        function Xn(t) {
            for (var e, n, r = -1, i = t.length, o = i + 4, a = [], u = []; 4 > ++r;) n = t[r % i], a.push(n[0]), u.push(n[1]);
            for (e = [Zn(Ou, a), ",", Zn(Ou, u)], --r; o > ++r;) n = t[r % i], a.shift(), a.push(n[0]), u.shift(), u.push(n[1]), Gn(e, a, u);
            return e.join("")
        }

        function Vn(t, e) {
            var n = t.length - 1;
            if (n)
                for (var r, i, o = t[0][0], a = t[0][1], u = t[n][0] - o, s = t[n][1] - a, c = -1; n >= ++c;) r = t[c], i = c / n, r[0] = e * r[0] + (1 - e) * (o + i * u), r[1] = e * r[1] + (1 - e) * (a + i * s);
            return Wn(t)
        }

        function Zn(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3]
        }

        function Gn(t, e, n) {
            t.push("C", Zn(Fu, e), ",", Zn(Fu, n), ",", Zn(qu, e), ",", Zn(qu, n), ",", Zn(Ou, e), ",", Zn(Ou, n))
        }

        function Jn(t, e) {
            return (e[1] - t[1]) / (e[0] - t[0])
        }

        function Kn(t) {
            for (var e = 0, n = t.length - 1, r = [], i = t[0], o = t[1], a = r[0] = Jn(i, o); n > ++e;) r[e] = (a + (a = Jn(i = o, o = t[e + 1]))) / 2;
            return r[e] = a, r
        }

        function Qn(t) {
            for (var e, n, r, i, o = [], a = Kn(t), u = -1, s = t.length - 1; s > ++u;) e = Jn(t[u], t[u + 1]), 1e-6 > Math.abs(e) ? a[u] = a[u + 1] = 0 : (n = a[u] / e, r = a[u + 1] / e, i = n * n + r * r, i > 9 && (i = 3 * e / Math.sqrt(i), a[u] = i * n, a[u + 1] = i * r));
            for (u = -1; s >= ++u;) i = (t[Math.min(s, u + 1)][0] - t[Math.max(0, u - 1)][0]) / (6 * (1 + a[u] * a[u])), o.push([i || 0, a[u] * i || 0]);
            return o
        }

        function tr(t) {
            return 3 > t.length ? qn(t) : t[0] + Bn(t, Qn(t))
        }

        function er(t, e, n, r) {
            var i, o, a, u, s, c, l;
            return i = r[t], o = i[0], a = i[1], i = r[e], u = i[0], s = i[1], i = r[n], c = i[0], l = i[1], (l - a) * (u - o) - (s - a) * (c - o) > 0
        }

        function nr(t, e, n) {
            return (n[0] - e[0]) * (t[1] - e[1]) < (n[1] - e[1]) * (t[0] - e[0])
        }

        function rr(t, e, n, r) {
            var i = t[0],
                o = n[0],
                a = e[0] - i,
                u = r[0] - o,
                s = t[1],
                c = n[1],
                l = e[1] - s,
                f = r[1] - c,
                h = (u * (s - c) - f * (i - o)) / (f * a - u * l);
            return [i + h * a, s + h * l]
        }

        function ir(t, e) {
            var n = {
                    list: t.map(function(t, e) {
                        return {
                            index: e,
                            x: t[0],
                            y: t[1]
                        }
                    }).sort(function(t, e) {
                        return t.y < e.y ? -1 : t.y > e.y ? 1 : t.x < e.x ? -1 : t.x > e.x ? 1 : 0
                    }),
                    bottomSite: null
                },
                r = {
                    list: [],
                    leftEnd: null,
                    rightEnd: null,
                    init: function() {
                        r.leftEnd = r.createHalfEdge(null, "l"), r.rightEnd = r.createHalfEdge(null, "l"), r.leftEnd.r = r.rightEnd, r.rightEnd.l = r.leftEnd, r.list.unshift(r.leftEnd, r.rightEnd)
                    },
                    createHalfEdge: function(t, e) {
                        return {
                            edge: t,
                            side: e,
                            vertex: null,
                            l: null,
                            r: null
                        }
                    },
                    insert: function(t, e) {
                        e.l = t, e.r = t.r, t.r.l = e, t.r = e
                    },
                    leftBound: function(t) {
                        var e = r.leftEnd;
                        do e = e.r; while (e != r.rightEnd && i.rightOf(e, t));
                        return e = e.l
                    },
                    del: function(t) {
                        t.l.r = t.r, t.r.l = t.l, t.edge = null
                    },
                    right: function(t) {
                        return t.r
                    },
                    left: function(t) {
                        return t.l
                    },
                    leftRegion: function(t) {
                        return null == t.edge ? n.bottomSite : t.edge.region[t.side]
                    },
                    rightRegion: function(t) {
                        return null == t.edge ? n.bottomSite : t.edge.region[Pu[t.side]]
                    }
                },
                i = {
                    bisect: function(t, e) {
                        var n = {
                                region: {
                                    l: t,
                                    r: e
                                },
                                ep: {
                                    l: null,
                                    r: null
                                }
                            },
                            r = e.x - t.x,
                            i = e.y - t.y,
                            o = r > 0 ? r : -r,
                            a = i > 0 ? i : -i;
                        return n.c = t.x * r + t.y * i + .5 * (r * r + i * i), o > a ? (n.a = 1, n.b = i / r, n.c /= r) : (n.b = 1, n.a = r / i, n.c /= i), n
                    },
                    intersect: function(t, e) {
                        var n = t.edge,
                            r = e.edge;
                        if (!n || !r || n.region.r == r.region.r) return null;
                        var i = n.a * r.b - n.b * r.a;
                        if (1e-10 > Math.abs(i)) return null;
                        var o, a, u = (n.c * r.b - r.c * n.b) / i,
                            s = (r.c * n.a - n.c * r.a) / i,
                            c = n.region.r,
                            l = r.region.r;
                        c.y < l.y || c.y == l.y && c.x < l.x ? (o = t, a = n) : (o = e, a = r);
                        var f = u >= a.region.r.x;
                        return f && "l" === o.side || !f && "r" === o.side ? null : {
                            x: u,
                            y: s
                        }
                    },
                    rightOf: function(t, e) {
                        var n = t.edge,
                            r = n.region.r,
                            i = e.x > r.x;
                        if (i && "l" === t.side) return 1;
                        if (!i && "r" === t.side) return 0;
                        if (1 === n.a) {
                            var o = e.y - r.y,
                                a = e.x - r.x,
                                u = 0,
                                s = 0;
                            if (!i && 0 > n.b || i && n.b >= 0 ? s = u = o >= n.b * a : (s = e.x + e.y * n.b > n.c, 0 > n.b && (s = !s), s || (u = 1)), !u) {
                                var c = r.x - n.region.l.x;
                                s = n.b * (a * a - o * o) < c * o * (1 + 2 * a / c + n.b * n.b), 0 > n.b && (s = !s)
                            }
                        } else {
                            var l = n.c - n.a * e.x,
                                f = e.y - l,
                                h = e.x - r.x,
                                d = l - r.y;
                            s = f * f > h * h + d * d
                        }
                        return "l" === t.side ? s : !s
                    },
                    endPoint: function(t, n, r) {
                        t.ep[n] = r, t.ep[Pu[n]] && e(t)
                    },
                    distance: function(t, e) {
                        var n = t.x - e.x,
                            r = t.y - e.y;
                        return Math.sqrt(n * n + r * r)
                    }
                },
                o = {
                    list: [],
                    insert: function(t, e, n) {
                        t.vertex = e, t.ystar = e.y + n;
                        for (var r = 0, i = o.list, a = i.length; a > r; r++) {
                            var u = i[r];
                            if (!(t.ystar > u.ystar || t.ystar == u.ystar && e.x > u.vertex.x)) break
                        }
                        i.splice(r, 0, t)
                    },
                    del: function(t) {
                        for (var e = 0, n = o.list, r = n.length; r > e && n[e] != t; ++e);
                        n.splice(e, 1)
                    },
                    empty: function() {
                        return 0 === o.list.length
                    },
                    nextEvent: function(t) {
                        for (var e = 0, n = o.list, r = n.length; r > e; ++e)
                            if (n[e] == t) return n[e + 1];
                        return null
                    },
                    min: function() {
                        var t = o.list[0];
                        return {
                            x: t.vertex.x,
                            y: t.ystar
                        }
                    },
                    extractMin: function() {
                        return o.list.shift()
                    }
                };
            r.init(), n.bottomSite = n.list.shift();
            for (var a, u, s, c, l, f, h, d, p, g, m, v, y, x = n.list.shift();;)
                if (o.empty() || (a = o.min()), x && (o.empty() || x.y < a.y || x.y == a.y && x.x < a.x)) u = r.leftBound(x), s = r.right(u), h = r.rightRegion(u), v = i.bisect(h, x), f = r.createHalfEdge(v, "l"), r.insert(u, f), g = i.intersect(u, f), g && (o.del(u), o.insert(u, g, i.distance(g, x))), u = f, f = r.createHalfEdge(v, "r"), r.insert(u, f), g = i.intersect(f, s), g && o.insert(f, g, i.distance(g, x)), x = n.list.shift();
                else {
                    if (o.empty()) break;
                    u = o.extractMin(), c = r.left(u), s = r.right(u), l = r.right(s), h = r.leftRegion(u), d = r.rightRegion(s), m = u.vertex, i.endPoint(u.edge, u.side, m), i.endPoint(s.edge, s.side, m), r.del(u), o.del(s), r.del(s), y = "l", h.y > d.y && (p = h, h = d, d = p, y = "r"), v = i.bisect(h, d), f = r.createHalfEdge(v, y), r.insert(c, f), i.endPoint(v, Pu[y], m), g = i.intersect(c, f), g && (o.del(c), o.insert(c, g, i.distance(g, h))), g = i.intersect(f, l), g && o.insert(f, g, i.distance(g, h))
                }
            for (u = r.right(r.leftEnd); u != r.rightEnd; u = r.right(u)) e(u.edge)
        }

        function or(t) {
            return t.x
        }

        function ar(t) {
            return t.y
        }

        function ur() {
            return {
                leaf: !0,
                nodes: [],
                point: null,
                x: null,
                y: null
            }
        }

        function sr(t, e, n, r, i, o) {
            if (!t(e, n, r, i, o)) {
                var a = .5 * (n + i),
                    u = .5 * (r + o),
                    s = e.nodes;
                s[0] && sr(t, s[0], n, r, a, u), s[1] && sr(t, s[1], a, r, i, u), s[2] && sr(t, s[2], n, u, a, o), s[3] && sr(t, s[3], a, u, i, o)
            }
        }

        function cr(t, e) {
            t = ca.rgb(t), e = ca.rgb(e);
            var n = t.r,
                r = t.g,
                i = t.b,
                o = e.r - n,
                a = e.g - r,
                u = e.b - i;
            return function(t) {
                return "#" + ie(Math.round(n + o * t)) + ie(Math.round(r + a * t)) + ie(Math.round(i + u * t))
            }
        }

        function lr(t) {
            var e = [t.a, t.b],
                n = [t.c, t.d],
                r = hr(e),
                i = fr(e, n),
                o = hr(dr(n, e, -i)) || 0;
            e[0] * n[1] < n[0] * e[1] && (e[0] *= -1, e[1] *= -1, r *= -1, i *= -1), this.rotate = (r ? Math.atan2(e[1], e[0]) : Math.atan2(-n[0], n[1])) * za, this.translate = [t.e, t.f], this.scale = [r, o], this.skew = o ? Math.atan2(i, o) * za : 0
        }

        function fr(t, e) {
            return t[0] * e[0] + t[1] * e[1]
        }

        function hr(t) {
            var e = Math.sqrt(fr(t, t));
            return e && (t[0] /= e, t[1] /= e), e
        }

        function dr(t, e, n) {
            return t[0] += n * e[0], t[1] += n * e[1], t
        }

        function pr(t, e) {
            return e -= t = +t,
                function(n) {
                    return t + e * n
                }
        }

        function gr(t, e) {
            var n, r = [],
                i = [],
                o = ca.transform(t),
                a = ca.transform(e),
                u = o.translate,
                s = a.translate,
                c = o.rotate,
                l = a.rotate,
                f = o.skew,
                h = a.skew,
                d = o.scale,
                p = a.scale;
            return u[0] != s[0] || u[1] != s[1] ? (r.push("translate(", null, ",", null, ")"), i.push({
                    i: 1,
                    x: pr(u[0], s[0])
                }, {
                    i: 3,
                    x: pr(u[1], s[1])
                })) : s[0] || s[1] ? r.push("translate(" + s + ")") : r.push(""), c != l ? (c - l > 180 ? l += 360 : l - c > 180 && (c += 360), i.push({
                    i: r.push(r.pop() + "rotate(", null, ")") - 2,
                    x: pr(c, l)
                })) : l && r.push(r.pop() + "rotate(" + l + ")"), f != h ? i.push({
                    i: r.push(r.pop() + "skewX(", null, ")") - 2,
                    x: pr(f, h)
                }) : h && r.push(r.pop() + "skewX(" + h + ")"), d[0] != p[0] || d[1] != p[1] ? (n = r.push(r.pop() + "scale(", null, ",", null, ")"), i.push({
                    i: n - 4,
                    x: pr(d[0], p[0])
                }, {
                    i: n - 2,
                    x: pr(d[1], p[1])
                })) : (1 != p[0] || 1 != p[1]) && r.push(r.pop() + "scale(" + p + ")"), n = i.length,
                function(t) {
                    for (var e, o = -1; n > ++o;) r[(e = i[o]).i] = e.x(t);
                    return r.join("")
                }
        }

        function mr(t, e) {
            var n, r = {},
                i = {};
            for (n in t) n in e ? r[n] = xr(n)(t[n], e[n]) : i[n] = t[n];
            for (n in e) n in t || (i[n] = e[n]);
            return function(t) {
                for (n in r) i[n] = r[n](t);
                return i
            }
        }

        function vr(t, e) {
            var n, r, i, o, a, u = 0,
                s = 0,
                c = [],
                l = [];
            for (t += "", e += "", zu.lastIndex = 0, r = 0; n = zu.exec(e); ++r) n.index && c.push(e.substring(u, s = n.index)), l.push({
                i: c.length,
                x: n[0]
            }), c.push(null), u = zu.lastIndex;
            for (e.length > u && c.push(e.substring(u)), r = 0, o = l.length;
                (n = zu.exec(t)) && o > r; ++r)
                if (a = l[r], a.x == n[0]) {
                    if (a.i)
                        if (null == c[a.i + 1])
                            for (c[a.i - 1] += a.x, c.splice(a.i, 1), i = r + 1; o > i; ++i) l[i].i--;
                        else
                            for (c[a.i - 1] += a.x + c[a.i + 1], c.splice(a.i, 2), i = r + 1; o > i; ++i) l[i].i -= 2;
                    else if (null == c[a.i + 1]) c[a.i] = a.x;
                    else
                        for (c[a.i] = a.x + c[a.i + 1], c.splice(a.i + 1, 1), i = r + 1; o > i; ++i) l[i].i--;
                    l.splice(r, 1), o--, r--
                } else a.x = pr(parseFloat(n[0]), parseFloat(a.x));
            for (; o > r;) a = l.pop(), null == c[a.i + 1] ? c[a.i] = a.x : (c[a.i] = a.x + c[a.i + 1], c.splice(a.i + 1, 1)), o--;
            return 1 === c.length ? null == c[0] ? l[0].x : function() {
                return e
            } : function(t) {
                for (r = 0; o > r; ++r) c[(a = l[r]).i] = a.x(t);
                return c.join("")
            }
        }

        function yr(t, e) {
            for (var n, r = ca.interpolators.length; --r >= 0 && !(n = ca.interpolators[r](t, e)););
            return n
        }

        function xr(t) {
            return "transform" == t ? gr : yr
        }

        function br(t, e) {
            var n, r = [],
                i = [],
                o = t.length,
                a = e.length,
                u = Math.min(t.length, e.length);
            for (n = 0; u > n; ++n) r.push(yr(t[n], e[n]));
            for (; o > n; ++n) i[n] = t[n];
            for (; a > n; ++n) i[n] = e[n];
            return function(t) {
                for (n = 0; u > n; ++n) i[n] = r[n](t);
                return i
            }
        }

        function Mr(t) {
            return function(e) {
                return 0 >= e ? 0 : e >= 1 ? 1 : t(e)
            }
        }

        function _r(t) {
            return function(e) {
                return 1 - t(1 - e)
            }
        }

        function wr(t) {
            return function(e) {
                return .5 * (.5 > e ? t(2 * e) : 2 - t(2 - 2 * e))
            }
        }

        function kr(t) {
            return t * t
        }

        function Tr(t) {
            return t * t * t
        }

        function Sr(t) {
            if (0 >= t) return 0;
            if (t >= 1) return 1;
            var e = t * t,
                n = e * t;
            return 4 * (.5 > t ? n : 3 * (t - e) + n - .75)
        }

        function Er(t) {
            return function(e) {
                return Math.pow(e, t)
            }
        }

        function Nr(t) {
            return 1 - Math.cos(t * Oa / 2)
        }

        function Cr(t) {
            return Math.pow(2, 10 * (t - 1))
        }

        function Ar(t) {
            return 1 - Math.sqrt(1 - t * t)
        }

        function Dr(t, e) {
            var n;
            return 2 > arguments.length && (e = .45), arguments.length ? n = e / (2 * Oa) * Math.asin(1 / t) : (t = 1, n = e / 4),
                function(r) {
                    return 1 + t * Math.pow(2, 10 * -r) * Math.sin(2 * (r - n) * Oa / e)
                }
        }

        function Lr(t) {
            return t || (t = 1.70158),
                function(e) {
                    return e * e * ((t + 1) * e - t)
                }
        }

        function Hr(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }

        function jr(t, e) {
            t = ca.hcl(t), e = ca.hcl(e);
            var n = t.h,
                r = t.c,
                i = t.l,
                o = e.h - n,
                a = e.c - r,
                u = e.l - i;
            return isNaN(a) && (a = 0, r = isNaN(r) ? e.c : r), isNaN(o) ? (o = 0, n = isNaN(n) ? e.h : n) : o > 180 ? o -= 360 : -180 > o && (o += 360),
                function(t) {
                    return V(n + o * t, r + a * t, i + u * t) + ""
                }
        }

        function Fr(t, e) {
            t = ca.hsl(t), e = ca.hsl(e);
            var n = t.h,
                r = t.s,
                i = t.l,
                o = e.h - n,
                a = e.s - r,
                u = e.l - i;
            return isNaN(a) && (a = 0, r = isNaN(r) ? e.s : r), isNaN(o) ? (o = 0, n = isNaN(n) ? e.h : n) : o > 180 ? o -= 360 : -180 > o && (o += 360),
                function(t) {
                    return Y(n + o * t, r + a * t, i + u * t) + ""
                }
        }

        function qr(t, e) {
            t = ca.lab(t), e = ca.lab(e);
            var n = t.l,
                r = t.a,
                i = t.b,
                o = e.l - n,
                a = e.a - r,
                u = e.b - i;
            return function(t) {
                return J(n + o * t, r + a * t, i + u * t) + ""
            }
        }

        function Or(t, e) {
            return e -= t,
                function(n) {
                    return Math.round(t + e * n)
                }
        }

        function Pr(t, e) {
            return e = e - (t = +t) ? 1 / (e - t) : 0,
                function(n) {
                    return (n - t) * e
                }
        }

        function Yr(t, e) {
            return e = e - (t = +t) ? 1 / (e - t) : 0,
                function(n) {
                    return Math.max(0, Math.min(1, (n - t) * e))
                }
        }

        function zr(t) {
            for (var e = t.source, n = t.target, r = $r(e, n), i = [e]; e !== r;) e = e.parent, i.push(e);
            for (var o = i.length; n !== r;) i.splice(o, 0, n), n = n.parent;
            return i
        }

        function Rr(t) {
            for (var e = [], n = t.parent; null != n;) e.push(t), t = n, n = n.parent;
            return e.push(t), e
        }

        function $r(t, e) {
            if (t === e) return t;
            for (var n = Rr(t), r = Rr(e), i = n.pop(), o = r.pop(), a = null; i === o;) a = i, i = n.pop(), o = r.pop();
            return a
        }

        function Br(t) {
            t.fixed |= 2
        }

        function Ir(t) {
            t.fixed &= -7
        }

        function Wr(t) {
            t.fixed |= 4, t.px = t.x, t.py = t.y
        }

        function Ur(t) {
            t.fixed &= -5
        }

        function Xr(t, e, n) {
            var r = 0,
                i = 0;
            if (t.charge = 0, !t.leaf)
                for (var o, a = t.nodes, u = a.length, s = -1; u > ++s;) o = a[s], null != o && (Xr(o, e, n), t.charge += o.charge, r += o.charge * o.cx, i += o.charge * o.cy);
            if (t.point) {
                t.leaf || (t.point.x += Math.random() - .5, t.point.y += Math.random() - .5);
                var c = e * n[t.point.index];
                t.charge += t.pointCharge = c, r += c * t.point.x, i += c * t.point.y
            }
            t.cx = r / t.charge, t.cy = i / t.charge
        }

        function Vr(t, e) {
            return ca.rebind(t, e, "sort", "children", "value"), t.nodes = t, t.links = Kr, t
        }

        function Zr(t) {
            return t.children
        }

        function Gr(t) {
            return t.value
        }

        function Jr(t, e) {
            return e.value - t.value
        }

        function Kr(t) {
            return ca.merge(t.map(function(t) {
                return (t.children || []).map(function(e) {
                    return {
                        source: t,
                        target: e
                    }
                })
            }))
        }

        function Qr(t) {
            return t.x
        }

        function ti(t) {
            return t.y
        }

        function ei(t, e, n) {
            t.y0 = e, t.y = n
        }

        function ni(t) {
            return ca.range(t.length)
        }

        function ri(t) {
            for (var e = -1, n = t[0].length, r = []; n > ++e;) r[e] = 0;
            return r
        }

        function ii(t) {
            for (var e, n = 1, r = 0, i = t[0][1], o = t.length; o > n; ++n)(e = t[n][1]) > i && (r = n, i = e);
            return r
        }

        function oi(t) {
            return t.reduce(ai, 0)
        }

        function ai(t, e) {
            return t + e[1]
        }

        function ui(t, e) {
            return si(t, Math.ceil(Math.log(e.length) / Math.LN2 + 1))
        }

        function si(t, e) {
            for (var n = -1, r = +t[0], i = (t[1] - r) / e, o = []; e >= ++n;) o[n] = i * n + r;
            return o
        }

        function ci(t) {
            return [ca.min(t), ca.max(t)]
        }

        function li(t, e) {
            return t.parent == e.parent ? 1 : 2
        }

        function fi(t) {
            var e = t.children;
            return e && e.length ? e[0] : t._tree.thread
        }

        function hi(t) {
            var e, n = t.children;
            return n && (e = n.length) ? n[e - 1] : t._tree.thread
        }

        function di(t, e) {
            var n = t.children;
            if (n && (i = n.length))
                for (var r, i, o = -1; i > ++o;) e(r = di(n[o], e), t) > 0 && (t = r);
            return t
        }

        function pi(t, e) {
            return t.x - e.x
        }

        function gi(t, e) {
            return e.x - t.x
        }

        function mi(t, e) {
            return t.depth - e.depth
        }

        function vi(t, e) {
            function n(t, r) {
                var i = t.children;
                if (i && (a = i.length))
                    for (var o, a, u = null, s = -1; a > ++s;) o = i[s], n(o, u), u = o;
                e(t, r)
            }
            n(t, null)
        }

        function yi(t) {
            for (var e, n = 0, r = 0, i = t.children, o = i.length; --o >= 0;) e = i[o]._tree, e.prelim += n, e.mod += n, n += e.shift + (r += e.change)
        }

        function xi(t, e, n) {
            t = t._tree, e = e._tree;
            var r = n / (e.number - t.number);
            t.change += r, e.change -= r, e.shift += n, e.prelim += n, e.mod += n
        }

        function bi(t, e, n) {
            return t._tree.ancestor.parent == e.parent ? t._tree.ancestor : n
        }

        function Mi(t, e) {
            return t.value - e.value
        }

        function _i(t, e) {
            var n = t._pack_next;
            t._pack_next = e, e._pack_prev = t, e._pack_next = n, n._pack_prev = e
        }

        function wi(t, e) {
            t._pack_next = e, e._pack_prev = t
        }

        function ki(t, e) {
            var n = e.x - t.x,
                r = e.y - t.y,
                i = t.r + e.r;
            return i * i - n * n - r * r > .001
        }

        function Ti(t) {
            function e(t) {
                l = Math.min(t.x - t.r, l), f = Math.max(t.x + t.r, f), h = Math.min(t.y - t.r, h), d = Math.max(t.y + t.r, d)
            }
            if ((n = t.children) && (c = n.length)) {
                var n, r, i, o, a, u, s, c, l = 1 / 0,
                    f = -1 / 0,
                    h = 1 / 0,
                    d = -1 / 0;
                if (n.forEach(Si), r = n[0], r.x = -r.r, r.y = 0, e(r), c > 1 && (i = n[1], i.x = i.r, i.y = 0, e(i), c > 2))
                    for (o = n[2], Ci(r, i, o), e(o), _i(r, o), r._pack_prev = o, _i(o, i), i = r._pack_next, a = 3; c > a; a++) {
                        Ci(r, i, o = n[a]);
                        var p = 0,
                            g = 1,
                            m = 1;
                        for (u = i._pack_next; u !== i; u = u._pack_next, g++)
                            if (ki(u, o)) {
                                p = 1;
                                break
                            }
                        if (1 == p)
                            for (s = r._pack_prev; s !== u._pack_prev && !ki(s, o); s = s._pack_prev, m++);
                        p ? (m > g || g == m && i.r < r.r ? wi(r, i = u) : wi(r = s, i), a--) : (_i(r, o), i = o, e(o))
                    }
                var v = (l + f) / 2,
                    y = (h + d) / 2,
                    x = 0;
                for (a = 0; c > a; a++) o = n[a], o.x -= v, o.y -= y, x = Math.max(x, o.r + Math.sqrt(o.x * o.x + o.y * o.y));
                t.r = x, n.forEach(Ei)
            }
        }

        function Si(t) {
            t._pack_next = t._pack_prev = t
        }

        function Ei(t) {
            delete t._pack_next, delete t._pack_prev
        }

        function Ni(t, e, n, r) {
            var i = t.children;
            if (t.x = e += r * t.x, t.y = n += r * t.y, t.r *= r, i)
                for (var o = -1, a = i.length; a > ++o;) Ni(i[o], e, n, r)
        }

        function Ci(t, e, n) {
            var r = t.r + n.r,
                i = e.x - t.x,
                o = e.y - t.y;
            if (r && (i || o)) {
                var a = e.r + n.r,
                    u = i * i + o * o;
                a *= a, r *= r;
                var s = .5 + (r - a) / (2 * u),
                    c = Math.sqrt(Math.max(0, 2 * a * (r + u) - (r -= u) * r - a * a)) / (2 * u);
                n.x = t.x + s * i + c * o, n.y = t.y + s * o - c * i
            } else n.x = t.x + r, n.y = t.y
        }

        function Ai(t) {
            return 1 + ca.max(t, function(t) {
                return t.y
            })
        }

        function Di(t) {
            return t.reduce(function(t, e) {
                return t + e.x
            }, 0) / t.length
        }

        function Li(t) {
            var e = t.children;
            return e && e.length ? Li(e[0]) : t
        }

        function Hi(t) {
            var e, n = t.children;
            return n && (e = n.length) ? Hi(n[e - 1]) : t
        }

        function ji(t) {
            return {
                x: t.x,
                y: t.y,
                dx: t.dx,
                dy: t.dy
            }
        }

        function Fi(t, e) {
            var n = t.x + e[3],
                r = t.y + e[0],
                i = t.dx - e[1] - e[3],
                o = t.dy - e[0] - e[2];
            return 0 > i && (n += i / 2, i = 0), 0 > o && (r += o / 2, o = 0), {
                x: n,
                y: r,
                dx: i,
                dy: o
            }
        }

        function qi(t) {
            var e = t[0],
                n = t[t.length - 1];
            return n > e ? [e, n] : [n, e]
        }

        function Oi(t) {
            return t.rangeExtent ? t.rangeExtent() : qi(t.range())
        }

        function Pi(t, e, n, r) {
            var i = n(t[0], t[1]),
                o = r(e[0], e[1]);
            return function(t) {
                return o(i(t))
            }
        }

        function Yi(t, e) {
            var n, r = 0,
                i = t.length - 1,
                o = t[r],
                a = t[i];
            return o > a && (n = r, r = i, i = n, n = o, o = a, a = n), (e = e(a - o)) && (t[r] = e.floor(o), t[i] = e.ceil(a)), t
        }

        function zi(t, e, n, r) {
            var i = [],
                o = [],
                a = 0,
                u = Math.min(t.length, e.length) - 1;
            for (t[u] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); u >= ++a;) i.push(n(t[a - 1], t[a])), o.push(r(e[a - 1], e[a]));
            return function(e) {
                var n = ca.bisect(t, e, 1, u) - 1;
                return o[n](i[n](e))
            }
        }

        function Ri(t, e, n, r) {
            function i() {
                var i = Math.min(t.length, e.length) > 2 ? zi : Pi,
                    s = r ? Yr : Pr;
                return a = i(t, e, s, n), u = i(e, t, s, yr), o
            }

            function o(t) {
                return a(t)
            }
            var a, u;
            return o.invert = function(t) {
                return u(t)
            }, o.domain = function(e) {
                return arguments.length ? (t = e.map(Number), i()) : t
            }, o.range = function(t) {
                return arguments.length ? (e = t, i()) : e
            }, o.rangeRound = function(t) {
                return o.range(t).interpolate(Or)
            }, o.clamp = function(t) {
                return arguments.length ? (r = t, i()) : r
            }, o.interpolate = function(t) {
                return arguments.length ? (n = t, i()) : n
            }, o.ticks = function(e) {
                return Wi(t, e)
            }, o.tickFormat = function(e, n) {
                return Ui(t, e, n)
            }, o.nice = function() {
                return Yi(t, Bi), i()
            }, o.copy = function() {
                return Ri(t, e, n, r)
            }, i()
        }

        function $i(t, e) {
            return ca.rebind(t, e, "range", "rangeRound", "interpolate", "clamp")
        }

        function Bi(t) {
            return t = Math.pow(10, Math.round(Math.log(t) / Math.LN10) - 1), t && {
                floor: function(e) {
                    return Math.floor(e / t) * t
                },
                ceil: function(e) {
                    return Math.ceil(e / t) * t
                }
            }
        }

        function Ii(t, e) {
            var n = qi(t),
                r = n[1] - n[0],
                i = Math.pow(10, Math.floor(Math.log(r / e) / Math.LN10)),
                o = e / r * i;
            return .15 >= o ? i *= 10 : .35 >= o ? i *= 5 : .75 >= o && (i *= 2), n[0] = Math.ceil(n[0] / i) * i, n[1] = Math.floor(n[1] / i) * i + .5 * i, n[2] = i, n
        }

        function Wi(t, e) {
            return ca.range.apply(ca, Ii(t, e))
        }

        function Ui(t, e, n) {
            var r = -Math.floor(Math.log(Ii(t, e)[2]) / Math.LN10 + .01);
            return ca.format(n ? n.replace(ou, function(t, e, n, i, o, a, u, s, c, l) {
                return [e, n, i, o, a, u, s, c || "." + (r - 2 * ("%" === l)), l].join("")
            }) : ",." + r + "f")
        }

        function Xi(t, e, n, r) {
            function i(e) {
                return t(n(e))
            }
            return i.invert = function(e) {
                return r(t.invert(e))
            }, i.domain = function(e) {
                return arguments.length ? (0 > e[0] ? (n = Gi, r = Ji) : (n = Vi, r = Zi), t.domain(e.map(n)), i) : t.domain().map(r)
            }, i.base = function(t) {
                return arguments.length ? (e = +t, i) : e
            }, i.nice = function() {
                return t.domain(Yi(t.domain(), Ki(e))), i
            }, i.ticks = function() {
                var i = qi(t.domain()),
                    o = [];
                if (i.every(isFinite)) {
                    var a = Math.log(e),
                        u = Math.floor(i[0] / a),
                        s = Math.ceil(i[1] / a),
                        c = r(i[0]),
                        l = r(i[1]),
                        f = e % 1 ? 2 : e;
                    if (n === Gi)
                        for (o.push(-Math.pow(e, -u)); s > u++;)
                            for (var h = f - 1; h > 0; h--) o.push(-Math.pow(e, -u) * h);
                    else {
                        for (; s > u; u++)
                            for (var h = 1; f > h; h++) o.push(Math.pow(e, u) * h);
                        o.push(Math.pow(e, u))
                    }
                    for (u = 0; c > o[u]; u++);
                    for (s = o.length; o[s - 1] > l; s--);
                    o = o.slice(u, s)
                }
                return o
            }, i.tickFormat = function(t, o) {
                if (2 > arguments.length && (o = Zu), !arguments.length) return o;
                var a, u = Math.log(e),
                    s = Math.max(.1, t / i.ticks().length),
                    c = n === Gi ? (a = -1e-12, Math.floor) : (a = 1e-12, Math.ceil);
                return function(t) {
                    return s >= t / r(u * c(n(t) / u + a)) ? o(t) : ""
                }
            }, i.copy = function() {
                return Xi(t.copy(), e, n, r)
            }, $i(i, t)
        }

        function Vi(t) {
            return Math.log(0 > t ? 0 : t)
        }

        function Zi(t) {
            return Math.exp(t)
        }

        function Gi(t) {
            return -Math.log(t > 0 ? 0 : -t)
        }

        function Ji(t) {
            return -Math.exp(-t)
        }

        function Ki(t) {
            t = Math.log(t);
            var e = {
                floor: function(e) {
                    return Math.floor(e / t) * t
                },
                ceil: function(e) {
                    return Math.ceil(e / t) * t
                }
            };
            return function() {
                return e
            }
        }

        function Qi(t, e) {
            function n(e) {
                return t(r(e))
            }
            var r = to(e),
                i = to(1 / e);
            return n.invert = function(e) {
                return i(t.invert(e))
            }, n.domain = function(e) {
                return arguments.length ? (t.domain(e.map(r)), n) : t.domain().map(i)
            }, n.ticks = function(t) {
                return Wi(n.domain(), t)
            }, n.tickFormat = function(t, e) {
                return Ui(n.domain(), t, e)
            }, n.nice = function() {
                return n.domain(Yi(n.domain(), Bi))
            }, n.exponent = function(t) {
                if (!arguments.length) return e;
                var o = n.domain();
                return r = to(e = t), i = to(1 / e), n.domain(o)
            }, n.copy = function() {
                return Qi(t.copy(), e)
            }, $i(n, t)
        }

        function to(t) {
            return function(e) {
                return 0 > e ? -Math.pow(-e, t) : Math.pow(e, t)
            }
        }

        function eo(t, e) {
            function n(e) {
                return a[((o.get(e) || o.set(e, t.push(e))) - 1) % a.length]
            }

            function r(e, n) {
                return ca.range(t.length).map(function(t) {
                    return e + n * t
                })
            }
            var o, a, u;
            return n.domain = function(r) {
                if (!arguments.length) return t;
                t = [], o = new i;
                for (var a, u = -1, s = r.length; s > ++u;) o.has(a = r[u]) || o.set(a, t.push(a));
                return n[e.t].apply(n, e.a)
            }, n.range = function(t) {
                return arguments.length ? (a = t, u = 0, e = {
                    t: "range",
                    a: arguments
                }, n) : a
            }, n.rangePoints = function(i, o) {
                2 > arguments.length && (o = 0);
                var s = i[0],
                    c = i[1],
                    l = (c - s) / (Math.max(1, t.length - 1) + o);
                return a = r(2 > t.length ? (s + c) / 2 : s + l * o / 2, l), u = 0, e = {
                    t: "rangePoints",
                    a: arguments
                }, n
            }, n.rangeBands = function(i, o, s) {
                2 > arguments.length && (o = 0), 3 > arguments.length && (s = o);
                var c = i[1] < i[0],
                    l = i[c - 0],
                    f = i[1 - c],
                    h = (f - l) / (t.length - o + 2 * s);
                return a = r(l + h * s, h), c && a.reverse(), u = h * (1 - o), e = {
                    t: "rangeBands",
                    a: arguments
                }, n
            }, n.rangeRoundBands = function(i, o, s) {
                2 > arguments.length && (o = 0), 3 > arguments.length && (s = o);
                var c = i[1] < i[0],
                    l = i[c - 0],
                    f = i[1 - c],
                    h = Math.floor((f - l) / (t.length - o + 2 * s)),
                    d = f - l - (t.length - o) * h;
                return a = r(l + Math.round(d / 2), h), c && a.reverse(), u = Math.round(h * (1 - o)), e = {
                    t: "rangeRoundBands",
                    a: arguments
                }, n
            }, n.rangeBand = function() {
                return u
            }, n.rangeExtent = function() {
                return qi(e.a[0])
            }, n.copy = function() {
                return eo(t, e)
            }, n.domain(t)
        }

        function no(t, e) {
            function n() {
                var n = 0,
                    o = e.length;
                for (i = []; o > ++n;) i[n - 1] = ca.quantile(t, n / o);
                return r
            }

            function r(t) {
                return isNaN(t = +t) ? 0 / 0 : e[ca.bisect(i, t)]
            }
            var i;
            return r.domain = function(e) {
                return arguments.length ? (t = e.filter(function(t) {
                    return !isNaN(t)
                }).sort(ca.ascending), n()) : t
            }, r.range = function(t) {
                return arguments.length ? (e = t, n()) : e
            }, r.quantiles = function() {
                return i
            }, r.copy = function() {
                return no(t, e)
            }, n()
        }

        function ro(t, e, n) {
            function r(e) {
                return n[Math.max(0, Math.min(a, Math.floor(o * (e - t))))]
            }

            function i() {
                return o = n.length / (e - t), a = n.length - 1, r
            }
            var o, a;
            return r.domain = function(n) {
                return arguments.length ? (t = +n[0], e = +n[n.length - 1], i()) : [t, e]
            }, r.range = function(t) {
                return arguments.length ? (n = t, i()) : n
            }, r.copy = function() {
                return ro(t, e, n)
            }, i()
        }

        function io(t, e) {
            function n(n) {
                return e[ca.bisect(t, n)]
            }
            return n.domain = function(e) {
                return arguments.length ? (t = e, n) : t
            }, n.range = function(t) {
                return arguments.length ? (e = t, n) : e
            }, n.copy = function() {
                return io(t, e)
            }, n
        }

        function oo(t) {
            function e(t) {
                return +t
            }
            return e.invert = e, e.domain = e.range = function(n) {
                return arguments.length ? (t = n.map(e), e) : t
            }, e.ticks = function(e) {
                return Wi(t, e)
            }, e.tickFormat = function(e, n) {
                return Ui(t, e, n)
            }, e.copy = function() {
                return oo(t)
            }, e
        }

        function ao(t) {
            return t.innerRadius
        }

        function uo(t) {
            return t.outerRadius
        }

        function so(t) {
            return t.startAngle
        }

        function co(t) {
            return t.endAngle
        }

        function lo(t) {
            for (var e, n, r, i = -1, o = t.length; o > ++i;) e = t[i], n = e[0], r = e[1] + ts, e[0] = n * Math.cos(r), e[1] = n * Math.sin(r);
            return t
        }

        function fo(t) {
            function e(e) {
                function s() {
                    g.push("M", u(t(v), f), l, c(t(m.reverse()), f), "Z")
                }
                for (var h, d, p, g = [], m = [], v = [], y = -1, x = e.length, b = le(n), M = le(i), _ = n === r ? function() {
                        return d
                    } : le(r), w = i === o ? function() {
                        return p
                    } : le(o); x > ++y;) a.call(this, h = e[y], y) ? (m.push([d = +b.call(this, h, y), p = +M.call(this, h, y)]), v.push([+_.call(this, h, y), +w.call(this, h, y)])) : m.length && (s(), m = [], v = []);
                return m.length && s(), g.length ? g.join("") : null
            }
            var n = jn,
                r = jn,
                i = 0,
                o = Fn,
                a = je,
                u = qn,
                s = u.key,
                c = u,
                l = "L",
                f = .7;
            return e.x = function(t) {
                return arguments.length ? (n = r = t, e) : r
            }, e.x0 = function(t) {
                return arguments.length ? (n = t, e) : n
            }, e.x1 = function(t) {
                return arguments.length ? (r = t, e) : r
            }, e.y = function(t) {
                return arguments.length ? (i = o = t, e) : o
            }, e.y0 = function(t) {
                return arguments.length ? (i = t, e) : i
            }, e.y1 = function(t) {
                return arguments.length ? (o = t, e) : o
            }, e.defined = function(t) {
                return arguments.length ? (a = t, e) : a
            }, e.interpolate = function(t) {
                return arguments.length ? (s = "function" == typeof t ? u = t : (u = ju.get(t) || qn).key, c = u.reverse || u, l = u.closed ? "M" : "L", e) : s
            }, e.tension = function(t) {
                return arguments.length ? (f = t, e) : f
            }, e
        }

        function ho(t) {
            return t.radius
        }

        function po(t) {
            return [t.x, t.y]
        }

        function go(t) {
            return function() {
                var e = t.apply(this, arguments),
                    n = e[0],
                    r = e[1] + ts;
                return [n * Math.cos(r), n * Math.sin(r)]
            }
        }

        function mo() {
            return 64
        }

        function vo() {
            return "circle"
        }

        function yo(t) {
            var e = Math.sqrt(t / Oa);
            return "M0," + e + "A" + e + "," + e + " 0 1,1 0," + -e + "A" + e + "," + e + " 0 1,1 0," + e + "Z"
        }

        function xo(t, e) {
            return Ma(t, as), t.id = e, t
        }

        function bo(t, e, n, r) {
            var i = t.id;
            return j(t, "function" == typeof n ? function(t, o, a) {
                t.__transition__[i].tween.set(e, r(n.call(t, t.__data__, o, a)))
            } : (n = r(n), function(t) {
                t.__transition__[i].tween.set(e, n)
            }))
        }

        function Mo(t) {
            return null == t && (t = ""),
                function() {
                    this.textContent = t
                }
        }

        function _o(t, e, n, r) {
            var o = t.__transition__ || (t.__transition__ = {
                    active: 0,
                    count: 0
                }),
                a = o[n];
            if (!a) {
                var u = r.time;
                return a = o[n] = {
                    tween: new i,
                    event: ca.dispatch("start", "end"),
                    time: u,
                    ease: r.ease,
                    delay: r.delay,
                    duration: r.duration
                }, ++o.count, ca.timer(function(r) {
                    function i(r) {
                        return o.active > n ? c() : (o.active = n, h.start.call(t, l, e), a.tween.forEach(function(n, r) {
                            (r = r.call(t, l, e)) && g.push(r)
                        }), s(r) || ca.timer(s, 0, u), 1)
                    }

                    function s(r) {
                        if (o.active !== n) return c();
                        for (var i = (r - d) / p, a = f(i), u = g.length; u > 0;) g[--u].call(t, a);
                        return i >= 1 ? (c(), h.end.call(t, l, e), 1) : void 0
                    }

                    function c() {
                        return --o.count ? delete o[n] : delete t.__transition__, 1
                    }
                    var l = t.__data__,
                        f = a.ease,
                        h = a.event,
                        d = a.delay,
                        p = a.duration,
                        g = [];
                    return r >= d ? i(r) : ca.timer(i, d, u), 1
                }, 0, u), a
            }
        }

        function wo(t, e) {
            t.attr("transform", function(t) {
                return "translate(" + e(t) + ",0)"
            })
        }

        function ko(t, e) {
            t.attr("transform", function(t) {
                return "translate(0," + e(t) + ")"
            })
        }

        function To(t, e, n) {
            if (r = [], n && e.length > 1) {
                for (var r, i, o, a = qi(t.domain()), u = -1, s = e.length, c = (e[1] - e[0]) / ++n; s > ++u;)
                    for (i = n; --i > 0;)(o = +e[u] - i * c) >= a[0] && r.push(o);
                for (--u, i = 0; n > ++i && (o = +e[u] + i * c) < a[1];) r.push(o)
            }
            return r
        }

        function So() {
            this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
        }

        function Eo(t, e, n) {
            function r(e) {
                var n = t(e),
                    r = o(n, 1);
                return r - e > e - n ? n : r
            }

            function i(n) {
                return e(n = t(new ds(n - 1)), 1), n
            }

            function o(t, n) {
                return e(t = new ds(+t), n), t
            }

            function a(t, r, o) {
                var a = i(t),
                    u = [];
                if (o > 1)
                    for (; r > a;) n(a) % o || u.push(new Date(+a)), e(a, 1);
                else
                    for (; r > a;) u.push(new Date(+a)), e(a, 1);
                return u
            }

            function u(t, e, n) {
                try {
                    ds = So;
                    var r = new So;
                    return r._ = t, a(r, e, n)
                } finally {
                    ds = Date
                }
            }
            t.floor = t, t.round = r, t.ceil = i, t.offset = o, t.range = a;
            var s = t.utc = No(t);
            return s.floor = s, s.round = No(r), s.ceil = No(i), s.offset = No(o), s.range = u, t
        }

        function No(t) {
            return function(e, n) {
                try {
                    ds = So;
                    var r = new So;
                    return r._ = e, t(r, n)._
                } finally {
                    ds = Date
                }
            }
        }

        function Co(t, e, n, r) {
            for (var i, o, a = 0, u = e.length, s = n.length; u > a;) {
                if (r >= s) return -1;
                if (i = e.charCodeAt(a++), 37 === i) {
                    if (o = Ds[e.charAt(a++)], !o || 0 > (r = o(t, n, r))) return -1
                } else if (i != n.charCodeAt(r++)) return -1
            }
            return r
        }

        function Ao(t) {
            return RegExp("^(?:" + t.map(ca.requote).join("|") + ")", "i")
        }

        function Do(t) {
            for (var e = new i, n = -1, r = t.length; r > ++n;) e.set(t[n].toLowerCase(), n);
            return e
        }

        function Lo(t, e, n) {
            t += "";
            var r = t.length;
            return n > r ? Array(n - r + 1).join(e) + t : t
        }

        function Ho(t, e, n) {
            ks.lastIndex = 0;
            var r = ks.exec(e.substring(n));
            return r ? n += r[0].length : -1
        }

        function jo(t, e, n) {
            ws.lastIndex = 0;
            var r = ws.exec(e.substring(n));
            return r ? n += r[0].length : -1
        }

        function Fo(t, e, n) {
            Es.lastIndex = 0;
            var r = Es.exec(e.substring(n));
            return r ? (t.m = Ns.get(r[0].toLowerCase()), n += r[0].length) : -1
        }

        function qo(t, e, n) {
            Ts.lastIndex = 0;
            var r = Ts.exec(e.substring(n));
            return r ? (t.m = Ss.get(r[0].toLowerCase()), n += r[0].length) : -1
        }

        function Oo(t, e, n) {
            return Co(t, "" + As.c, e, n)
        }

        function Po(t, e, n) {
            return Co(t, "" + As.x, e, n)
        }

        function Yo(t, e, n) {
            return Co(t, "" + As.X, e, n)
        }

        function zo(t, e, n) {
            Ls.lastIndex = 0;
            var r = Ls.exec(e.substring(n, n + 4));
            return r ? (t.y = +r[0], n += r[0].length) : -1
        }

        function Ro(t, e, n) {
            Ls.lastIndex = 0;
            var r = Ls.exec(e.substring(n, n + 2));
            return r ? (t.y = $o(+r[0]), n += r[0].length) : -1
        }

        function $o(t) {
            return t + (t > 68 ? 1900 : 2e3)
        }

        function Bo(t, e, n) {
            Ls.lastIndex = 0;
            var r = Ls.exec(e.substring(n, n + 2));
            return r ? (t.m = r[0] - 1, n += r[0].length) : -1
        }

        function Io(t, e, n) {
            Ls.lastIndex = 0;
            var r = Ls.exec(e.substring(n, n + 2));
            return r ? (t.d = +r[0], n += r[0].length) : -1
        }

        function Wo(t, e, n) {
            Ls.lastIndex = 0;
            var r = Ls.exec(e.substring(n, n + 2));
            return r ? (t.H = +r[0], n += r[0].length) : -1
        }

        function Uo(t, e, n) {
            Ls.lastIndex = 0;
            var r = Ls.exec(e.substring(n, n + 2));
            return r ? (t.M = +r[0], n += r[0].length) : -1
        }

        function Xo(t, e, n) {
            Ls.lastIndex = 0;
            var r = Ls.exec(e.substring(n, n + 2));
            return r ? (t.S = +r[0], n += r[0].length) : -1
        }

        function Vo(t, e, n) {
            Ls.lastIndex = 0;
            var r = Ls.exec(e.substring(n, n + 3));
            return r ? (t.L = +r[0], n += r[0].length) : -1
        }

        function Zo(t, e, n) {
            var r = Hs.get(e.substring(n, n += 2).toLowerCase());
            return null == r ? -1 : (t.p = r, n)
        }

        function Go(t) {
            var e = t.getTimezoneOffset(),
                n = e > 0 ? "-" : "+",
                r = ~~(Math.abs(e) / 60),
                i = Math.abs(e) % 60;
            return n + Lo(r, "0", 2) + Lo(i, "0", 2)
        }

        function Jo(t) {
            return t.toISOString()
        }

        function Ko(t, e, n) {
            function r(e) {
                return t(e)
            }
            return r.invert = function(e) {
                return Qo(t.invert(e))
            }, r.domain = function(e) {
                return arguments.length ? (t.domain(e), r) : t.domain().map(Qo)
            }, r.nice = function(t) {
                return r.domain(Yi(r.domain(), function() {
                    return t
                }))
            }, r.ticks = function(n, i) {
                var o = qi(r.domain());
                if ("function" != typeof n) {
                    var a = o[1] - o[0],
                        u = a / n,
                        s = ca.bisect(Fs, u);
                    if (s == Fs.length) return e.year(o, n);
                    if (!s) return t.ticks(n).map(Qo);
                    Math.log(u / Fs[s - 1]) < Math.log(Fs[s] / u) && --s, n = e[s], i = n[1], n = n[0].range
                }
                return n(o[0], new Date(+o[1] + 1), i)
            }, r.tickFormat = function() {
                return n
            }, r.copy = function() {
                return Ko(t.copy(), e, n)
            }, $i(r, t)
        }

        function Qo(t) {
            return new Date(t)
        }

        function ta(t) {
            return function(e) {
                for (var n = t.length - 1, r = t[n]; !r[1](e);) r = t[--n];
                return r[0](e)
            }
        }

        function ea(t) {
            var e = new Date(t, 0, 1);
            return e.setFullYear(t), e
        }

        function na(t) {
            var e = t.getFullYear(),
                n = ea(e),
                r = ea(e + 1);
            return e + (t - n) / (r - n)
        }

        function ra(t) {
            var e = new Date(Date.UTC(t, 0, 1));
            return e.setUTCFullYear(t), e
        }

        function ia(t) {
            var e = t.getUTCFullYear(),
                n = ra(e),
                r = ra(e + 1);
            return e + (t - n) / (r - n)
        }

        function oa(t) {
            return t.responseText
        }

        function aa(t) {
            return JSON.parse(t.responseText)
        }

        function ua(t) {
            var e = la.createRange();
            return e.selectNode(la.body), e.createContextualFragment(t.responseText)
        }

        function sa(t) {
            return t.responseXML
        }
        var ca = {
            version: "3.1.6"
        };
        Date.now || (Date.now = function() {
            return +new Date
        });
        var la = document,
            fa = window;
        try {
            la.createElement("div").style.setProperty("opacity", 0, "")
        } catch (ha) {
            var da = fa.CSSStyleDeclaration.prototype,
                pa = da.setProperty;
            da.setProperty = function(t, e, n) {
                pa.call(this, t, e + "", n)
            }
        }
        ca.ascending = function(t, e) {
            return e > t ? -1 : t > e ? 1 : t >= e ? 0 : 0 / 0
        }, ca.descending = function(t, e) {
            return t > e ? -1 : e > t ? 1 : e >= t ? 0 : 0 / 0
        }, ca.min = function(t, e) {
            var n, r, i = -1,
                o = t.length;
            if (1 === arguments.length) {
                for (; o > ++i && (null == (n = t[i]) || n != n);) n = void 0;
                for (; o > ++i;) null != (r = t[i]) && n > r && (n = r)
            } else {
                for (; o > ++i && (null == (n = e.call(t, t[i], i)) || n != n);) n = void 0;
                for (; o > ++i;) null != (r = e.call(t, t[i], i)) && n > r && (n = r)
            }
            return n
        }, ca.max = function(t, e) {
            var n, r, i = -1,
                o = t.length;
            if (1 === arguments.length) {
                for (; o > ++i && (null == (n = t[i]) || n != n);) n = void 0;
                for (; o > ++i;) null != (r = t[i]) && r > n && (n = r)
            } else {
                for (; o > ++i && (null == (n = e.call(t, t[i], i)) || n != n);) n = void 0;
                for (; o > ++i;) null != (r = e.call(t, t[i], i)) && r > n && (n = r)
            }
            return n
        }, ca.extent = function(t, e) {
            var n, r, i, o = -1,
                a = t.length;
            if (1 === arguments.length) {
                for (; a > ++o && (null == (n = i = t[o]) || n != n);) n = i = void 0;
                for (; a > ++o;) null != (r = t[o]) && (n > r && (n = r), r > i && (i = r))
            } else {
                for (; a > ++o && (null == (n = i = e.call(t, t[o], o)) || n != n);) n = void 0;
                for (; a > ++o;) null != (r = e.call(t, t[o], o)) && (n > r && (n = r), r > i && (i = r))
            }
            return [n, i]
        }, ca.sum = function(t, e) {
            var n, r = 0,
                i = t.length,
                o = -1;
            if (1 === arguments.length)
                for (; i > ++o;) isNaN(n = +t[o]) || (r += n);
            else
                for (; i > ++o;) isNaN(n = +e.call(t, t[o], o)) || (r += n);
            return r
        }, ca.mean = function(e, n) {
            var r, i = e.length,
                o = 0,
                a = -1,
                u = 0;
            if (1 === arguments.length)
                for (; i > ++a;) t(r = e[a]) && (o += (r - o) / ++u);
            else
                for (; i > ++a;) t(r = n.call(e, e[a], a)) && (o += (r - o) / ++u);
            return u ? o : void 0
        }, ca.quantile = function(t, e) {
            var n = (t.length - 1) * e + 1,
                r = Math.floor(n),
                i = +t[r - 1],
                o = n - r;
            return o ? i + o * (t[r] - i) : i
        }, ca.median = function(e, n) {
            return arguments.length > 1 && (e = e.map(n)), e = e.filter(t), e.length ? ca.quantile(e.sort(ca.ascending), .5) : void 0
        }, ca.bisector = function(t) {
            return {
                left: function(e, n, r, i) {
                    for (3 > arguments.length && (r = 0), 4 > arguments.length && (i = e.length); i > r;) {
                        var o = r + i >>> 1;
                        n > t.call(e, e[o], o) ? r = o + 1 : i = o
                    }
                    return r
                },
                right: function(e, n, r, i) {
                    for (3 > arguments.length && (r = 0), 4 > arguments.length && (i = e.length); i > r;) {
                        var o = r + i >>> 1;
                        t.call(e, e[o], o) > n ? i = o : r = o + 1
                    }
                    return r
                }
            }
        };
        var ga = ca.bisector(function(t) {
            return t
        });
        ca.bisectLeft = ga.left, ca.bisect = ca.bisectRight = ga.right, ca.shuffle = function(t) {
            for (var e, n, r = t.length; r;) n = 0 | Math.random() * r--, e = t[r], t[r] = t[n], t[n] = e;
            return t
        }, ca.permute = function(t, e) {
            for (var n = [], r = -1, i = e.length; i > ++r;) n[r] = t[e[r]];
            return n
        }, ca.zip = function() {
            if (!(i = arguments.length)) return [];
            for (var t = -1, n = ca.min(arguments, e), r = Array(n); n > ++t;)
                for (var i, o = -1, a = r[t] = Array(i); i > ++o;) a[o] = arguments[o][t];
            return r
        }, ca.transpose = function(t) {
            return ca.zip.apply(ca, t)
        }, ca.keys = function(t) {
            var e = [];
            for (var n in t) e.push(n);
            return e
        }, ca.values = function(t) {
            var e = [];
            for (var n in t) e.push(t[n]);
            return e
        }, ca.entries = function(t) {
            var e = [];
            for (var n in t) e.push({
                key: n,
                value: t[n]
            });
            return e
        }, ca.merge = function(t) {
            return Array.prototype.concat.apply([], t)
        }, ca.range = function(t, e, r) {
            if (3 > arguments.length && (r = 1, 2 > arguments.length && (e = t, t = 0)), 1 / 0 === (e - t) / r) throw Error("infinite range");
            var i, o = [],
                a = n(Math.abs(r)),
                u = -1;
            if (t *= a, e *= a, r *= a, 0 > r)
                for (;
                    (i = t + r * ++u) > e;) o.push(i / a);
            else
                for (; e > (i = t + r * ++u);) o.push(i / a);
            return o
        }, ca.map = function(t) {
            var e = new i;
            for (var n in t) e.set(n, t[n]);
            return e
        }, r(i, {
            has: function(t) {
                return ma + t in this
            },
            get: function(t) {
                return this[ma + t]
            },
            set: function(t, e) {
                return this[ma + t] = e
            },
            remove: function(t) {
                return t = ma + t, t in this && delete this[t]
            },
            keys: function() {
                var t = [];
                return this.forEach(function(e) {
                    t.push(e)
                }), t
            },
            values: function() {
                var t = [];
                return this.forEach(function(e, n) {
                    t.push(n)
                }), t
            },
            entries: function() {
                var t = [];
                return this.forEach(function(e, n) {
                    t.push({
                        key: e,
                        value: n
                    })
                }), t
            },
            forEach: function(t) {
                for (var e in this) e.charCodeAt(0) === va && t.call(this, e.substring(1), this[e])
            }
        });
        var ma = "\0",
            va = ma.charCodeAt(0);
        ca.nest = function() {
            function t(e, u, s) {
                if (s >= a.length) return r ? r.call(o, u) : n ? u.sort(n) : u;
                for (var c, l, f, h, d = -1, p = u.length, g = a[s++], m = new i; p > ++d;)(h = m.get(c = g(l = u[d]))) ? h.push(l) : m.set(c, [l]);
                return e ? (l = e(), f = function(n, r) {
                    l.set(n, t(e, r, s))
                }) : (l = {}, f = function(n, r) {
                    l[n] = t(e, r, s)
                }), m.forEach(f), l
            }

            function e(t, n) {
                if (n >= a.length) return t;
                var r = [],
                    i = u[n++];
                return t.forEach(function(t, i) {
                    r.push({
                        key: t,
                        values: e(i, n)
                    })
                }), i ? r.sort(function(t, e) {
                    return i(t.key, e.key)
                }) : r
            }
            var n, r, o = {},
                a = [],
                u = [];
            return o.map = function(e, n) {
                return t(n, e, 0)
            }, o.entries = function(n) {
                return e(t(ca.map, n, 0), 0)
            }, o.key = function(t) {
                return a.push(t), o
            }, o.sortKeys = function(t) {
                return u[a.length - 1] = t, o
            }, o.sortValues = function(t) {
                return n = t, o
            }, o.rollup = function(t) {
                return r = t, o
            }, o
        }, ca.set = function(t) {
            var e = new o;
            if (t)
                for (var n = 0; t.length > n; n++) e.add(t[n]);
            return e
        }, r(o, {
            has: function(t) {
                return ma + t in this
            },
            add: function(t) {
                return this[ma + t] = !0, t
            },
            remove: function(t) {
                return t = ma + t, t in this && delete this[t]
            },
            values: function() {
                var t = [];
                return this.forEach(function(e) {
                    t.push(e)
                }), t
            },
            forEach: function(t) {
                for (var e in this) e.charCodeAt(0) === va && t.call(this, e.substring(1))
            }
        }), ca.behavior = {}, ca.rebind = function(t, e) {
            for (var n, r = 1, i = arguments.length; i > ++r;) t[n = arguments[r]] = a(t, e, e[n]);
            return t
        }, ca.dispatch = function() {
            for (var t = new u, e = -1, n = arguments.length; n > ++e;) t[arguments[e]] = s(t);
            return t
        }, u.prototype.on = function(t, e) {
            var n = t.indexOf("."),
                r = "";
            if (n >= 0 && (r = t.substring(n + 1), t = t.substring(0, n)), t) return 2 > arguments.length ? this[t].on(r) : this[t].on(r, e);
            if (2 === arguments.length) {
                if (null == e)
                    for (t in this) this.hasOwnProperty(t) && this[t].on(r, null);
                return this
            }
        }, ca.event = null, ca.mouse = function(t) {
            return d(t, l())
        };
        var ya = /WebKit/.test(fa.navigator.userAgent) ? -1 : 0,
            xa = g;
        try {
            xa(la.documentElement.childNodes)[0].nodeType
        } catch (ba) {
            xa = p
        }
        var Ma = [].__proto__ ? function(t, e) {
            t.__proto__ = e
        } : function(t, e) {
            for (var n in e) t[n] = e[n]
        };
        ca.touches = function(t, e) {
            return 2 > arguments.length && (e = l().touches), e ? xa(e).map(function(e) {
                var n = d(t, e);
                return n.identifier = e.identifier, n
            }) : []
        }, ca.behavior.drag = function() {
            function t() {
                this.on("mousedown.drag", e).on("touchstart.drag", e)
            }

            function e() {
                function t() {
                    var t = a.parentNode;
                    return null != l ? ca.touches(t).filter(function(t) {
                        return t.identifier === l
                    })[0] : ca.mouse(t)
                }

                function e() {
                    if (!a.parentNode) return i();
                    var e = t(),
                        n = e[0] - h[0],
                        r = e[1] - h[1];
                    d |= n | r, h = e, c(), u({
                        type: "drag",
                        x: e[0] + o[0],
                        y: e[1] + o[1],
                        dx: n,
                        dy: r
                    })
                }

                function i() {
                    u({
                        type: "dragend"
                    }), d && (c(), ca.event.target === s && f(p, "click")), p.on(null != l ? "touchmove.drag-" + l : "mousemove.drag", null).on(null != l ? "touchend.drag-" + l : "mouseup.drag", null)
                }
                var o, a = this,
                    u = n.of(a, arguments),
                    s = ca.event.target,
                    l = ca.event.touches ? ca.event.changedTouches[0].identifier : null,
                    h = t(),
                    d = 0,
                    p = ca.select(fa).on(null != l ? "touchmove.drag-" + l : "mousemove.drag", e).on(null != l ? "touchend.drag-" + l : "mouseup.drag", i, !0);
                r ? (o = r.apply(a, arguments), o = [o.x - h[0], o.y - h[1]]) : o = [0, 0], null == l && c(), u({
                    type: "dragstart"
                })
            }
            var n = h(t, "drag", "dragstart", "dragend"),
                r = null;
            return t.origin = function(e) {
                return arguments.length ? (r = e, t) : r
            }, ca.rebind(t, n, "on")
        };
        var _a = function(t, e) {
                return e.querySelector(t)
            },
            wa = function(t, e) {
                return e.querySelectorAll(t)
            },
            ka = la.documentElement,
            Ta = ka.matchesSelector || ka.webkitMatchesSelector || ka.mozMatchesSelector || ka.msMatchesSelector || ka.oMatchesSelector,
            Sa = function(t, e) {
                return Ta.call(t, e)
            };
        "function" == typeof Sizzle && (_a = function(t, e) {
            return Sizzle(t, e)[0] || null
        }, wa = function(t, e) {
            return Sizzle.uniqueSort(Sizzle(t, e))
        }, Sa = Sizzle.matchesSelector), ca.selection = function() {
            return La
        };
        var Ea = ca.selection.prototype = [];
        Ea.select = function(t) {
            var e, n, r, i, o = [];
            "function" != typeof t && (t = v(t));
            for (var a = -1, u = this.length; u > ++a;) {
                o.push(e = []), e.parentNode = (r = this[a]).parentNode;
                for (var s = -1, c = r.length; c > ++s;)(i = r[s]) ? (e.push(n = t.call(i, i.__data__, s)), n && "__data__" in i && (n.__data__ = i.__data__)) : e.push(null)
            }
            return m(o)
        }, Ea.selectAll = function(t) {
            var e, n, r = [];
            "function" != typeof t && (t = y(t));
            for (var i = -1, o = this.length; o > ++i;)
                for (var a = this[i], u = -1, s = a.length; s > ++u;)(n = a[u]) && (r.push(e = xa(t.call(n, n.__data__, u))), e.parentNode = n);
            return m(r)
        };
        var Na = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        };
        ca.ns = {
            prefix: Na,
            qualify: function(t) {
                var e = t.indexOf(":"),
                    n = t;
                return e >= 0 && (n = t.substring(0, e), t = t.substring(e + 1)), Na.hasOwnProperty(n) ? {
                    space: Na[n],
                    local: t
                } : t
            }
        }, Ea.attr = function(t, e) {
            if (2 > arguments.length) {
                if ("string" == typeof t) {
                    var n = this.node();
                    return t = ca.ns.qualify(t), t.local ? n.getAttributeNS(t.space, t.local) : n.getAttribute(t)
                }
                for (e in t) this.each(x(e, t[e]));
                return this
            }
            return this.each(x(t, e))
        }, ca.requote = function(t) {
            return t.replace(Ca, "\\$&")
        };
        var Ca = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
        Ea.classed = function(t, e) {
            if (2 > arguments.length) {
                if ("string" == typeof t) {
                    var n = this.node(),
                        r = (t = t.trim().split(/^|\s+/g)).length,
                        i = -1;
                    if (e = n.classList) {
                        for (; r > ++i;)
                            if (!e.contains(t[i])) return !1
                    } else
                        for (e = n.getAttribute("class"); r > ++i;)
                            if (!_(t[i]).test(e)) return !1; return !0
                }
                for (e in t) this.each(w(e, t[e]));
                return this
            }
            return this.each(w(t, e))
        }, Ea.style = function(t, e, n) {
            var r = arguments.length;
            if (3 > r) {
                if ("string" != typeof t) {
                    2 > r && (e = "");
                    for (n in t) this.each(T(n, t[n], e));
                    return this
                }
                if (2 > r) return fa.getComputedStyle(this.node(), null).getPropertyValue(t);
                n = ""
            }
            return this.each(T(t, e, n))
        }, Ea.property = function(t, e) {
            if (2 > arguments.length) {
                if ("string" == typeof t) return this.node()[t];
                for (e in t) this.each(S(e, t[e]));
                return this
            }
            return this.each(S(t, e))
        }, Ea.text = function(t) {
            return arguments.length ? this.each("function" == typeof t ? function() {
                var e = t.apply(this, arguments);
                this.textContent = null == e ? "" : e
            } : null == t ? function() {
                this.textContent = ""
            } : function() {
                this.textContent = t
            }) : this.node().textContent
        }, Ea.html = function(t) {
            return arguments.length ? this.each("function" == typeof t ? function() {
                var e = t.apply(this, arguments);
                this.innerHTML = null == e ? "" : e
            } : null == t ? function() {
                this.innerHTML = ""
            } : function() {
                this.innerHTML = t
            }) : this.node().innerHTML
        }, Ea.append = function(t) {
            function e() {
                return this.appendChild(la.createElementNS(this.namespaceURI, t))
            }

            function n() {
                return this.appendChild(la.createElementNS(t.space, t.local))
            }
            return t = ca.ns.qualify(t), this.select(t.local ? n : e)
        }, Ea.insert = function(t, e) {
            function n(n, r) {
                return this.insertBefore(la.createElementNS(this.namespaceURI, t), e.call(this, n, r))
            }

            function r(n, r) {
                return this.insertBefore(la.createElementNS(t.space, t.local), e.call(this, n, r))
            }
            return t = ca.ns.qualify(t), "function" != typeof e && (e = v(e)), this.select(t.local ? r : n)
        }, Ea.remove = function() {
            return this.each(function() {
                var t = this.parentNode;
                t && t.removeChild(this)
            })
        }, Ea.data = function(t, e) {
            function n(t, n) {
                var r, o, a, u = t.length,
                    f = n.length,
                    h = Math.min(u, f),
                    d = Array(f),
                    p = Array(f),
                    g = Array(u);
                if (e) {
                    var m, v = new i,
                        y = new i,
                        x = [];
                    for (r = -1; u > ++r;) m = e.call(o = t[r], o.__data__, r), v.has(m) ? g[r] = o : v.set(m, o), x.push(m);
                    for (r = -1; f > ++r;) m = e.call(n, a = n[r], r), (o = v.get(m)) ? (d[r] = o, o.__data__ = a) : y.has(m) || (p[r] = E(a)), y.set(m, a), v.remove(m);
                    for (r = -1; u > ++r;) v.has(x[r]) && (g[r] = t[r])
                } else {
                    for (r = -1; h > ++r;) o = t[r], a = n[r], o ? (o.__data__ = a, d[r] = o) : p[r] = E(a);
                    for (; f > r; ++r) p[r] = E(n[r]);
                    for (; u > r; ++r) g[r] = t[r]
                }
                p.update = d, p.parentNode = d.parentNode = g.parentNode = t.parentNode, s.push(p), c.push(d), l.push(g)
            }
            var r, o, a = -1,
                u = this.length;
            if (!arguments.length) {
                for (t = Array(u = (r = this[0]).length); u > ++a;)(o = r[a]) && (t[a] = o.__data__);
                return t
            }
            var s = F([]),
                c = m([]),
                l = m([]);
            if ("function" == typeof t)
                for (; u > ++a;) n(r = this[a], t.call(r, r.parentNode.__data__, a));
            else
                for (; u > ++a;) n(r = this[a], t);
            return c.enter = function() {
                return s
            }, c.exit = function() {
                return l
            }, c
        }, Ea.datum = function(t) {
            return arguments.length ? this.property("__data__", t) : this.property("__data__")
        }, Ea.filter = function(t) {
            var e, n, r, i = [];
            "function" != typeof t && (t = N(t));
            for (var o = 0, a = this.length; a > o; o++) {
                i.push(e = []), e.parentNode = (n = this[o]).parentNode;
                for (var u = 0, s = n.length; s > u; u++)(r = n[u]) && t.call(r, r.__data__, u) && e.push(r)
            }
            return m(i)
        }, Ea.order = function() {
            for (var t = -1, e = this.length; e > ++t;)
                for (var n, r = this[t], i = r.length - 1, o = r[i]; --i >= 0;)(n = r[i]) && (o && o !== n.nextSibling && o.parentNode.insertBefore(n, o), o = n);
            return this
        }, Ea.sort = function(t) {
            t = C.apply(this, arguments);
            for (var e = -1, n = this.length; n > ++e;) this[e].sort(t);
            return this.order()
        }, Ea.on = function(t, e, n) {
            var r = arguments.length;
            if (3 > r) {
                if ("string" != typeof t) {
                    2 > r && (e = !1);
                    for (n in t) this.each(D(n, t[n], e));
                    return this
                }
                if (2 > r) return (r = this.node()["__on" + t]) && r._;
                n = !1
            }
            return this.each(D(t, e, n))
        };
        var Aa = ca.map({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        });
        Aa.forEach(function(t) {
            "on" + t in la && Aa.remove(t)
        }), Ea.each = function(t) {
            return j(this, function(e, n, r) {
                t.call(e, e.__data__, n, r)
            })
        }, Ea.call = function(t) {
            var e = xa(arguments);
            return t.apply(e[0] = this, e), this
        }, Ea.empty = function() {
            return !this.node()
        }, Ea.node = function() {
            for (var t = 0, e = this.length; e > t; t++)
                for (var n = this[t], r = 0, i = n.length; i > r; r++) {
                    var o = n[r];
                    if (o) return o
                }
            return null
        };
        var Da = [];
        ca.selection.enter = F, ca.selection.enter.prototype = Da, Da.append = Ea.append, Da.insert = Ea.insert, Da.empty = Ea.empty, Da.node = Ea.node, Da.select = function(t) {
            for (var e, n, r, i, o, a = [], u = -1, s = this.length; s > ++u;) {
                r = (i = this[u]).update, a.push(e = []), e.parentNode = i.parentNode;
                for (var c = -1, l = i.length; l > ++c;)(o = i[c]) ? (e.push(r[c] = n = t.call(i.parentNode, o.__data__, c)), n.__data__ = o.__data__) : e.push(null)
            }
            return m(a)
        }, Ea.transition = function() {
            var t, e, n = rs || ++us,
                r = [],
                i = Object.create(ss);
            i.time = Date.now();
            for (var o = -1, a = this.length; a > ++o;) {
                r.push(t = []);
                for (var u = this[o], s = -1, c = u.length; c > ++s;)(e = u[s]) && _o(e, s, n, i), t.push(e)
            }
            return xo(r, n)
        }, ca.select = function(t) {
            var e = ["string" == typeof t ? _a(t, la) : t];
            return e.parentNode = ka, m([e])
        }, ca.selectAll = function(t) {
            var e = xa("string" == typeof t ? wa(t, la) : t);
            return e.parentNode = ka, m([e])
        };
        var La = ca.select(ka);
        ca.behavior.zoom = function() {
            function t() {
                this.on("mousedown.zoom", u).on("mousemove.zoom", l).on(Fa + ".zoom", s).on("dblclick.zoom", d).on("touchstart.zoom", p).on("touchmove.zoom", g).on("touchend.zoom", p)
            }

            function e(t) {
                return [(t[0] - w[0]) / k, (t[1] - w[1]) / k]
            }

            function n(t) {
                return [t[0] * k + w[0], t[1] * k + w[1]]
            }

            function r(t) {
                k = Math.max(T[0], Math.min(T[1], t))
            }

            function i(t, e) {
                e = n(e), w[0] += t[0] - e[0], w[1] += t[1] - e[1]
            }

            function o() {
                x && x.domain(y.range().map(function(t) {
                    return (t - w[0]) / k
                }).map(y.invert)), M && M.domain(b.range().map(function(t) {
                    return (t - w[1]) / k
                }).map(b.invert))
            }

            function a(t) {
                o(), ca.event.preventDefault(), t({
                    type: "zoom",
                    scale: k,
                    translate: w
                })
            }

            function u() {
                function t() {
                    s = 1, i(ca.mouse(r), h), a(o)
                }

                function n() {
                    s && c(), l.on("mousemove.zoom", null).on("mouseup.zoom", null), s && ca.event.target === u && f(l, "click.zoom")
                }
                var r = this,
                    o = S.of(r, arguments),
                    u = ca.event.target,
                    s = 0,
                    l = ca.select(fa).on("mousemove.zoom", t).on("mouseup.zoom", n),
                    h = e(ca.mouse(r));
                fa.focus(), c()
            }

            function s() {
                m || (m = e(ca.mouse(this))), r(Math.pow(2, .002 * Ha()) * k), i(ca.mouse(this), m), a(S.of(this, arguments))
            }

            function l() {
                m = null
            }

            function d() {
                var t = ca.mouse(this),
                    n = e(t),
                    o = Math.log(k) / Math.LN2;
                r(Math.pow(2, ca.event.shiftKey ? Math.ceil(o) - 1 : Math.floor(o) + 1)), i(t, n), a(S.of(this, arguments))
            }

            function p() {
                var t = ca.touches(this),
                    n = Date.now();
                if (v = k, m = {}, t.forEach(function(t) {
                        m[t.identifier] = e(t)
                    }), c(), 1 === t.length) {
                    if (500 > n - _) {
                        var o = t[0],
                            u = e(t[0]);
                        r(2 * k), i(o, u), a(S.of(this, arguments))
                    }
                    _ = n
                }
            }

            function g() {
                var t = ca.touches(this),
                    e = t[0],
                    n = m[e.identifier];
                if (o = t[1]) {
                    var o, u = m[o.identifier];
                    e = [(e[0] + o[0]) / 2, (e[1] + o[1]) / 2], n = [(n[0] + u[0]) / 2, (n[1] + u[1]) / 2], r(ca.event.scale * v)
                }
                i(e, n), _ = null, a(S.of(this, arguments))
            }
            var m, v, y, x, b, M, _, w = [0, 0],
                k = 1,
                T = ja,
                S = h(t, "zoom");
            return t.translate = function(e) {
                return arguments.length ? (w = e.map(Number), o(), t) : w
            }, t.scale = function(e) {
                return arguments.length ? (k = +e, o(), t) : k
            }, t.scaleExtent = function(e) {
                return arguments.length ? (T = null == e ? ja : e.map(Number), t) : T
            }, t.x = function(e) {
                return arguments.length ? (x = e, y = e.copy(), w = [0, 0], k = 1, t) : x
            }, t.y = function(e) {
                return arguments.length ? (M = e, b = e.copy(), w = [0, 0], k = 1, t) : M
            }, ca.rebind(t, S, "on")
        };
        var Ha, ja = [0, 1 / 0],
            Fa = "onwheel" in la ? (Ha = function() {
                return -ca.event.deltaY * (ca.event.deltaMode ? 120 : 1)
            }, "wheel") : "onmousewheel" in la ? (Ha = function() {
                return ca.event.wheelDelta
            }, "mousewheel") : (Ha = function() {
                return -ca.event.detail
            }, "MozMousePixelScroll");
        q.prototype.toString = function() {
            return this.rgb() + ""
        }, ca.hsl = function(t, e, n) {
            return 1 === arguments.length ? t instanceof P ? O(t.h, t.s, t.l) : oe("" + t, ae, O) : O(+t, +e, +n)
        };
        var qa = P.prototype = new q;
        qa.brighter = function(t) {
            return t = Math.pow(.7, arguments.length ? t : 1), O(this.h, this.s, this.l / t)
        }, qa.darker = function(t) {
            return t = Math.pow(.7, arguments.length ? t : 1), O(this.h, this.s, t * this.l)
        }, qa.rgb = function() {
            return Y(this.h, this.s, this.l)
        };
        var Oa = Math.PI,
            Pa = 1e-6,
            Ya = Oa / 180,
            za = 180 / Oa;
        ca.hcl = function(t, e, n) {
            return 1 === arguments.length ? t instanceof X ? U(t.h, t.c, t.l) : t instanceof G ? K(t.l, t.a, t.b) : K((t = ue((t = ca.rgb(t)).r, t.g, t.b)).l, t.a, t.b) : U(+t, +e, +n)
        };
        var Ra = X.prototype = new q;
        Ra.brighter = function(t) {
            return U(this.h, this.c, Math.min(100, this.l + $a * (arguments.length ? t : 1)))
        }, Ra.darker = function(t) {
            return U(this.h, this.c, Math.max(0, this.l - $a * (arguments.length ? t : 1)))
        }, Ra.rgb = function() {
            return V(this.h, this.c, this.l).rgb()
        }, ca.lab = function(t, e, n) {
            return 1 === arguments.length ? t instanceof G ? Z(t.l, t.a, t.b) : t instanceof X ? V(t.l, t.c, t.h) : ue((t = ca.rgb(t)).r, t.g, t.b) : Z(+t, +e, +n)
        };
        var $a = 18,
            Ba = .95047,
            Ia = 1,
            Wa = 1.08883,
            Ua = G.prototype = new q;
        Ua.brighter = function(t) {
            return Z(Math.min(100, this.l + $a * (arguments.length ? t : 1)), this.a, this.b)
        }, Ua.darker = function(t) {
            return Z(Math.max(0, this.l - $a * (arguments.length ? t : 1)), this.a, this.b)
        }, Ua.rgb = function() {
            return J(this.l, this.a, this.b)
        }, ca.rgb = function(t, e, n) {
            return 1 === arguments.length ? t instanceof re ? ne(t.r, t.g, t.b) : oe("" + t, ne, Y) : ne(~~t, ~~e, ~~n)
        };
        var Xa = re.prototype = new q;
        Xa.brighter = function(t) {
            t = Math.pow(.7, arguments.length ? t : 1);
            var e = this.r,
                n = this.g,
                r = this.b,
                i = 30;
            return e || n || r ? (e && i > e && (e = i), n && i > n && (n = i), r && i > r && (r = i), ne(Math.min(255, Math.floor(e / t)), Math.min(255, Math.floor(n / t)), Math.min(255, Math.floor(r / t)))) : ne(i, i, i)
        }, Xa.darker = function(t) {
            return t = Math.pow(.7, arguments.length ? t : 1), ne(Math.floor(t * this.r), Math.floor(t * this.g), Math.floor(t * this.b))
        }, Xa.hsl = function() {
            return ae(this.r, this.g, this.b)
        }, Xa.toString = function() {
            return "#" + ie(this.r) + ie(this.g) + ie(this.b)
        };
        var Va = ca.map({
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkgrey: "#a9a9a9",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkslategrey: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            grey: "#808080",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgray: "#d3d3d3",
            lightgreen: "#90ee90",
            lightgrey: "#d3d3d3",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370db",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#db7093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32"
        });
        Va.forEach(function(t, e) {
            Va.set(t, oe(e, ne, Y))
        }), ca.functor = le, ca.xhr = function(t, e, n) {
            function r() {
                var t = s.status;
                !t && s.responseText || t >= 200 && 300 > t || 304 === t ? o.load.call(i, u.call(i, s)) : o.error.call(i, s)
            }
            var i = {},
                o = ca.dispatch("progress", "load", "error"),
                a = {},
                u = fe,
                s = new(fa.XDomainRequest && /^(http(s)?:)?\/\//.test(t) ? XDomainRequest : XMLHttpRequest);
            return "onload" in s ? s.onload = s.onerror = r : s.onreadystatechange = function() {
                s.readyState > 3 && r()
            }, s.onprogress = function(t) {
                var e = ca.event;
                ca.event = t;
                try {
                    o.progress.call(i, s)
                } finally {
                    ca.event = e
                }
            }, i.header = function(t, e) {
                return t = (t + "").toLowerCase(), 2 > arguments.length ? a[t] : (null == e ? delete a[t] : a[t] = e + "", i)
            }, i.mimeType = function(t) {
                return arguments.length ? (e = null == t ? null : t + "", i) : e
            }, i.response = function(t) {
                return u = t, i
            }, ["get", "post"].forEach(function(t) {
                i[t] = function() {
                    return i.send.apply(i, [t].concat(xa(arguments)))
                }
            }), i.send = function(n, r, o) {
                if (2 === arguments.length && "function" == typeof r && (o = r, r = null), s.open(n, t, !0), null == e || "accept" in a || (a.accept = e + ",*/*"), s.setRequestHeader)
                    for (var u in a) s.setRequestHeader(u, a[u]);
                return null != e && s.overrideMimeType && s.overrideMimeType(e), null != o && i.on("error", o).on("load", function(t) {
                    o(null, t)
                }), s.send(null == r ? null : r), i
            }, i.abort = function() {
                return s.abort(), i
            }, ca.rebind(i, o, "on"), 2 === arguments.length && "function" == typeof e && (n = e, e = null), null == n ? i : i.get(he(n))
        }, ca.csv = de(",", "text/csv"), ca.tsv = de("	", "text/tab-separated-values");
        var Za, Ga, Ja = 0,
            Ka = {},
            Qa = null;
        ca.timer = function(t, e, n) {
            if (3 > arguments.length) {
                if (2 > arguments.length) e = 0;
                else if (!isFinite(e)) return;
                n = Date.now()
            }
            var r = Ka[t.id];
            r && r.callback === t ? (r.then = n, r.delay = e) : Ka[t.id = ++Ja] = Qa = {
                callback: t,
                then: n,
                delay: e,
                next: Qa
            }, Za || (Ga = clearTimeout(Ga), Za = 1, tu(pe))
        }, ca.timer.flush = function() {
            for (var t, e = Date.now(), n = Qa; n;) t = e - n.then, n.delay || (n.flush = n.callback(t)), n = n.next;
            ge()
        };
        var tu = fa.requestAnimationFrame || fa.webkitRequestAnimationFrame || fa.mozRequestAnimationFrame || fa.oRequestAnimationFrame || fa.msRequestAnimationFrame || function(t) {
                setTimeout(t, 17)
            },
            eu = ".",
            nu = ",",
            ru = [3, 3],
            iu = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(me);
        ca.formatPrefix = function(t, e) {
            var n = 0;
            return t && (0 > t && (t *= -1), e && (t = ca.round(t, ve(t, e))), n = 1 + Math.floor(1e-12 + Math.log(t) / Math.LN10), n = Math.max(-24, Math.min(24, 3 * Math.floor((0 >= n ? n + 1 : n - 1) / 3)))), iu[8 + n / 3]
        }, ca.round = function(t, e) {
            return e ? Math.round(t * (e = Math.pow(10, e))) / e : Math.round(t)
        }, ca.format = function(t) {
            var e = ou.exec(t),
                n = e[1] || " ",
                r = e[2] || ">",
                i = e[3] || "",
                o = e[4] || "",
                a = e[5],
                u = +e[6],
                s = e[7],
                c = e[8],
                l = e[9],
                f = 1,
                h = "",
                d = !1;
            switch (c && (c = +c.substring(1)), (a || "0" === n && "=" === r) && (a = n = "0", r = "=", s && (u -= Math.floor((u - 1) / 4))), l) {
                case "n":
                    s = !0, l = "g";
                    break;
                case "%":
                    f = 100, h = "%", l = "f";
                    break;
                case "p":
                    f = 100, h = "%", l = "r";
                    break;
                case "b":
                case "o":
                case "x":
                case "X":
                    o && (o = "0" + l.toLowerCase());
                case "c":
                case "d":
                    d = !0, c = 0;
                    break;
                case "s":
                    f = -1, l = "r"
            }
            "#" === o && (o = ""), "r" != l || c || (l = "g"), null != c && ("g" == l ? c = Math.max(1, Math.min(21, c)) : ("e" == l || "f" == l) && (c = Math.max(0, Math.min(20, c)))), l = au.get(l) || ye;
            var p = a && s;
            return function(t) {
                if (d && t % 1) return "";
                var e = 0 > t || 0 === t && 0 > 1 / t ? (t = -t, "-") : i;
                if (0 > f) {
                    var g = ca.formatPrefix(t, c);
                    t = g.scale(t), h = g.symbol
                } else t *= f;
                t = l(t, c), !a && s && (t = uu(t));
                var m = o.length + t.length + (p ? 0 : e.length),
                    v = u > m ? Array(m = u - m + 1).join(n) : "";
                return p && (t = uu(v + t)), eu && t.replace(".", eu), e += o, ("<" === r ? e + t + v : ">" === r ? v + e + t : "^" === r ? v.substring(0, m >>= 1) + e + t + v.substring(m) : e + (p ? t : v + t)) + h
            }
        };
        var ou = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
            au = ca.map({
                b: function(t) {
                    return t.toString(2)
                },
                c: function(t) {
                    return String.fromCharCode(t)
                },
                o: function(t) {
                    return t.toString(8)
                },
                x: function(t) {
                    return t.toString(16)
                },
                X: function(t) {
                    return t.toString(16).toUpperCase()
                },
                g: function(t, e) {
                    return t.toPrecision(e)
                },
                e: function(t, e) {
                    return t.toExponential(e)
                },
                f: function(t, e) {
                    return t.toFixed(e)
                },
                r: function(t, e) {
                    return (t = ca.round(t, ve(t, e))).toFixed(Math.max(0, Math.min(20, ve(t * (1 + 1e-15), e))))
                }
            }),
            uu = fe;
        if (ru) {
            var su = ru.length;
            uu = function(t) {
                for (var e = t.lastIndexOf("."), n = e >= 0 ? "." + t.substring(e + 1) : (e = t.length, ""), r = [], i = 0, o = ru[0]; e > 0 && o > 0;) r.push(t.substring(e -= o, e + o)), o = ru[i = (i + 1) % su];
                return r.reverse().join(nu || "") + n
            }
        }
        ca.geo = {}, ca.geo.stream = function(t, e) {
            t && cu.hasOwnProperty(t.type) ? cu[t.type](t, e) : xe(t, e)
        };
        var cu = {
                Feature: function(t, e) {
                    xe(t.geometry, e)
                },
                FeatureCollection: function(t, e) {
                    for (var n = t.features, r = -1, i = n.length; i > ++r;) xe(n[r].geometry, e)
                }
            },
            lu = {
                Sphere: function(t, e) {
                    e.sphere()
                },
                Point: function(t, e) {
                    var n = t.coordinates;
                    e.point(n[0], n[1])
                },
                MultiPoint: function(t, e) {
                    for (var n, r = t.coordinates, i = -1, o = r.length; o > ++i;) n = r[i], e.point(n[0], n[1])
                },
                LineString: function(t, e) {
                    be(t.coordinates, e, 0)
                },
                MultiLineString: function(t, e) {
                    for (var n = t.coordinates, r = -1, i = n.length; i > ++r;) be(n[r], e, 0)
                },
                Polygon: function(t, e) {
                    Me(t.coordinates, e)
                },
                MultiPolygon: function(t, e) {
                    for (var n = t.coordinates, r = -1, i = n.length; i > ++r;) Me(n[r], e)
                },
                GeometryCollection: function(t, e) {
                    for (var n = t.geometries, r = -1, i = n.length; i > ++r;) xe(n[r], e)
                }
            };
        ca.geo.area = function(t) {
            return fu = 0, ca.geo.stream(t, pu), fu
        };
        var fu, hu, du, pu = {
            sphere: function() {
                fu += 4 * Oa
            },
            point: A,
            lineStart: A,
            lineEnd: A,
            polygonStart: function() {
                hu = 1, du = 0, pu.lineStart = _e
            },
            polygonEnd: function() {
                var t = 2 * Math.atan2(du, hu);
                fu += 0 > t ? 4 * Oa + t : t, pu.lineStart = pu.lineEnd = pu.point = A
            }
        };
        ca.geo.bounds = we(fe), ca.geo.centroid = function(t) {
            gu = mu = vu = yu = xu = 0, ca.geo.stream(t, bu);
            var e;
            return mu && Math.abs(e = Math.sqrt(vu * vu + yu * yu + xu * xu)) > Pa ? [Math.atan2(yu, vu) * za, Math.asin(Math.max(-1, Math.min(1, xu / e))) * za] : void 0
        };
        var gu, mu, vu, yu, xu, bu = {
                sphere: function() {
                    2 > gu && (gu = 2, mu = vu = yu = xu = 0)
                },
                point: ke,
                lineStart: Se,
                lineEnd: Ee,
                polygonStart: function() {
                    2 > gu && (gu = 2, mu = vu = yu = xu = 0), bu.lineStart = Te
                },
                polygonEnd: function() {
                    bu.lineStart = Se
                }
            },
            Mu = Ye(je, Ie, Ue),
            _u = 1e9;
        ca.geo.projection = Ke, ca.geo.projectionMutator = Qe, (ca.geo.equirectangular = function() {
            return Ke(en)
        }).raw = en.invert = en, ca.geo.rotation = function(t) {
            function e(e) {
                return e = t(e[0] * Ya, e[1] * Ya), e[0] *= za, e[1] *= za, e
            }
            return t = nn(t[0] % 360 * Ya, t[1] * Ya, t.length > 2 ? t[2] * Ya : 0), e.invert = function(e) {
                return e = t.invert(e[0] * Ya, e[1] * Ya), e[0] *= za, e[1] *= za, e
            }, e
        }, ca.geo.circle = function() {
            function t() {
                var t = "function" == typeof r ? r.apply(this, arguments) : r,
                    e = nn(-t[0] * Ya, -t[1] * Ya, 0).invert,
                    i = [];
                return n(null, null, 1, {
                    point: function(t, n) {
                        i.push(t = e(t, n)), t[0] *= za, t[1] *= za
                    }
                }), {
                    type: "Polygon",
                    coordinates: [i]
                }
            }
            var e, n, r = [0, 0],
                i = 6;
            return t.origin = function(e) {
                return arguments.length ? (r = e, t) : r
            }, t.angle = function(r) {
                return arguments.length ? (n = un((e = +r) * Ya, i * Ya), t) : e
            }, t.precision = function(r) {
                return arguments.length ? (n = un(e * Ya, (i = +r) * Ya), t) : i
            }, t.angle(90)
        }, ca.geo.distance = function(t, e) {
            var n, r = (e[0] - t[0]) * Ya,
                i = t[1] * Ya,
                o = e[1] * Ya,
                a = Math.sin(r),
                u = Math.cos(r),
                s = Math.sin(i),
                c = Math.cos(i),
                l = Math.sin(o),
                f = Math.cos(o);
            return Math.atan2(Math.sqrt((n = f * a) * n + (n = c * l - s * f * u) * n), s * l + c * f * u)
        }, ca.geo.graticule = function() {
            function t() {
                return {
                    type: "MultiLineString",
                    coordinates: e()
                }
            }

            function e() {
                return ca.range(Math.ceil(o / m) * m, i, m).map(h).concat(ca.range(Math.ceil(c / v) * v, s, v).map(d)).concat(ca.range(Math.ceil(r / p) * p, n, p).filter(function(t) {
                    return Math.abs(t % m) > Pa
                }).map(l)).concat(ca.range(Math.ceil(u / g) * g, a, g).filter(function(t) {
                    return Math.abs(t % v) > Pa
                }).map(f))
            }
            var n, r, i, o, a, u, s, c, l, f, h, d, p = 10,
                g = p,
                m = 90,
                v = 360,
                y = 2.5;
            return t.lines = function() {
                return e().map(function(t) {
                    return {
                        type: "LineString",
                        coordinates: t
                    }
                })
            }, t.outline = function() {
                return {
                    type: "Polygon",
                    coordinates: [h(o).concat(d(s).slice(1), h(i).reverse().slice(1), d(c).reverse().slice(1))]
                }
            }, t.extent = function(e) {
                return arguments.length ? t.majorExtent(e).minorExtent(e) : t.minorExtent()
            }, t.majorExtent = function(e) {
                return arguments.length ? (o = +e[0][0], i = +e[1][0], c = +e[0][1], s = +e[1][1], o > i && (e = o, o = i, i = e), c > s && (e = c, c = s, s = e), t.precision(y)) : [
                    [o, c],
                    [i, s]
                ]
            }, t.minorExtent = function(e) {
                return arguments.length ? (r = +e[0][0], n = +e[1][0], u = +e[0][1], a = +e[1][1], r > n && (e = r, r = n, n = e), u > a && (e = u, u = a, a = e), t.precision(y)) : [
                    [r, u],
                    [n, a]
                ]
            }, t.step = function(e) {
                return arguments.length ? t.majorStep(e).minorStep(e) : t.minorStep()
            }, t.majorStep = function(e) {
                return arguments.length ? (m = +e[0], v = +e[1], t) : [m, v]
            }, t.minorStep = function(e) {
                return arguments.length ? (p = +e[0], g = +e[1], t) : [p, g]
            }, t.precision = function(e) {
                return arguments.length ? (y = +e, l = cn(u, a, 90), f = ln(r, n, y), h = cn(c, s, 90), d = ln(o, i, y), t) : y
            }, t.majorExtent([
                [-180, -90 + Pa],
                [180, 90 - Pa]
            ]).minorExtent([
                [-180, -80 - Pa],
                [180, 80 + Pa]
            ])
        }, ca.geo.greatArc = function() {
            function t() {
                return {
                    type: "LineString",
                    coordinates: [e || r.apply(this, arguments), n || i.apply(this, arguments)]
                }
            }
            var e, n, r = fn,
                i = hn;
            return t.distance = function() {
                return ca.geo.distance(e || r.apply(this, arguments), n || i.apply(this, arguments))
            }, t.source = function(n) {
                return arguments.length ? (r = n, e = "function" == typeof n ? null : n, t) : r
            }, t.target = function(e) {
                return arguments.length ? (i = e, n = "function" == typeof e ? null : e, t) : i
            }, t.precision = function() {
                return arguments.length ? t : 0
            }, t
        }, ca.geo.interpolate = function(t, e) {
            return dn(t[0] * Ya, t[1] * Ya, e[0] * Ya, e[1] * Ya)
        }, ca.geo.length = function(t) {
            return wu = 0, ca.geo.stream(t, ku), wu
        };
        var wu, ku = {
            sphere: A,
            point: A,
            lineStart: pn,
            lineEnd: A,
            polygonStart: A,
            polygonEnd: A
        };
        (ca.geo.conicEqualArea = function() {
            return gn(mn)
        }).raw = mn, ca.geo.albersUsa = function() {
            function t(t) {
                return e(t)(t)
            }

            function e(t) {
                var e = t[0],
                    n = t[1];
                return n > 50 ? a : -140 > e ? u : 21 > n ? s : o
            }
            var n, r, i, o = ca.geo.conicEqualArea().rotate([98, 0]).center([0, 38]).parallels([29.5, 45.5]),
                a = ca.geo.conicEqualArea().rotate([160, 0]).center([0, 60]).parallels([55, 65]),
                u = ca.geo.conicEqualArea().rotate([160, 0]).center([0, 20]).parallels([8, 18]),
                s = ca.geo.conicEqualArea().rotate([60, 0]).center([0, 10]).parallels([8, 18]);
            return t.invert = function(t) {
                return n(t) || r(t) || i(t) || o.invert(t)
            }, t.scale = function(e) {
                return arguments.length ? (o.scale(e), a.scale(.6 * e), u.scale(e), s.scale(1.5 * e), t.translate(o.translate())) : o.scale()
            }, t.translate = function(e) {
                if (!arguments.length) return o.translate();
                var c = o.scale(),
                    l = e[0],
                    f = e[1];
                return o.translate(e), a.translate([l - .4 * c, f + .17 * c]), u.translate([l - .19 * c, f + .2 * c]), s.translate([l + .58 * c, f + .43 * c]), n = vn(a, [
                    [-180, 50],
                    [-130, 72]
                ]), r = vn(u, [
                    [-164, 18],
                    [-154, 24]
                ]), i = vn(s, [
                    [-67.5, 17.5],
                    [-65, 19]
                ]), t
            }, t.scale(1e3)
        };
        var Tu, Su, Eu = {
                point: A,
                lineStart: A,
                lineEnd: A,
                polygonStart: function() {
                    Su = 0, Eu.lineStart = yn
                },
                polygonEnd: function() {
                    Eu.lineStart = Eu.lineEnd = Eu.point = A, Tu += Math.abs(Su / 2)
                }
            },
            Nu = {
                point: bn,
                lineStart: Mn,
                lineEnd: _n,
                polygonStart: function() {
                    Nu.lineStart = wn
                },
                polygonEnd: function() {
                    Nu.point = bn, Nu.lineStart = Mn, Nu.lineEnd = _n
                }
            };
        ca.geo.path = function() {
            function t(t) {
                return t && ca.geo.stream(t, r(i.pointRadius("function" == typeof o ? +o.apply(this, arguments) : o))), i.result()
            }
            var e, n, r, i, o = 4.5;
            return t.area = function(t) {
                return Tu = 0, ca.geo.stream(t, r(Eu)), Tu
            }, t.centroid = function(t) {
                return gu = vu = yu = xu = 0, ca.geo.stream(t, r(Nu)), xu ? [vu / xu, yu / xu] : void 0
            }, t.bounds = function(t) {
                return we(r)(t)
            }, t.projection = function(n) {
                return arguments.length ? (r = (e = n) ? n.stream || Sn(n) : fe, t) : e
            }, t.context = function(e) {
                return arguments.length ? (i = null == (n = e) ? new xn : new kn(e), t) : n
            }, t.pointRadius = function(e) {
                return arguments.length ? (o = "function" == typeof e ? e : +e, t) : o
            }, t.projection(ca.geo.albersUsa()).context(null)
        }, ca.geo.albers = function() {
            return ca.geo.conicEqualArea().parallels([29.5, 45.5]).rotate([98, 0]).center([0, 38]).scale(1e3)
        };
        var Cu = En(function(t) {
            return Math.sqrt(2 / (1 + t))
        }, function(t) {
            return 2 * Math.asin(t / 2)
        });
        (ca.geo.azimuthalEqualArea = function() {
            return Ke(Cu)
        }).raw = Cu;
        var Au = En(function(t) {
            var e = Math.acos(t);
            return e && e / Math.sin(e)
        }, fe);
        (ca.geo.azimuthalEquidistant = function() {
            return Ke(Au)
        }).raw = Au, (ca.geo.conicConformal = function() {
            return gn(Nn)
        }).raw = Nn, (ca.geo.conicEquidistant = function() {
            return gn(Cn)
        }).raw = Cn;
        var Du = En(function(t) {
            return 1 / t
        }, Math.atan);
        (ca.geo.gnomonic = function() {
            return Ke(Du)
        }).raw = Du, An.invert = function(t, e) {
            return [t, 2 * Math.atan(Math.exp(e)) - Oa / 2]
        }, (ca.geo.mercator = function() {
            return Dn(An)
        }).raw = An;
        var Lu = En(function() {
            return 1
        }, Math.asin);
        (ca.geo.orthographic = function() {
            return Ke(Lu)
        }).raw = Lu;
        var Hu = En(function(t) {
            return 1 / (1 + t)
        }, function(t) {
            return 2 * Math.atan(t)
        });
        (ca.geo.stereographic = function() {
            return Ke(Hu)
        }).raw = Hu, Ln.invert = function(t, e) {
            return [Math.atan2(B(t), Math.cos(e)), $(Math.sin(e) / I(t))]
        }, (ca.geo.transverseMercator = function() {
            return Dn(Ln)
        }).raw = Ln, ca.geom = {}, ca.svg = {}, ca.svg.line = function() {
            return Hn(fe)
        };
        var ju = ca.map({
            linear: qn,
            "linear-closed": On,
            "step-before": Pn,
            "step-after": Yn,
            basis: Wn,
            "basis-open": Un,
            "basis-closed": Xn,
            bundle: Vn,
            cardinal: $n,
            "cardinal-open": zn,
            "cardinal-closed": Rn,
            monotone: tr
        });
        ju.forEach(function(t, e) {
            e.key = t, e.closed = /-closed$/.test(t)
        });
        var Fu = [0, 2 / 3, 1 / 3, 0],
            qu = [0, 1 / 3, 2 / 3, 0],
            Ou = [0, 1 / 6, 2 / 3, 1 / 6];
        ca.geom.hull = function(t) {
            function e(t) {
                if (3 > t.length) return [];
                var e, i, o, a, u, s, c, l, f, h, d, p, g = le(n),
                    m = le(r),
                    v = t.length,
                    y = v - 1,
                    x = [],
                    b = [],
                    M = 0;
                if (g === jn && r === Fn) e = t;
                else
                    for (o = 0, e = []; v > o; ++o) e.push([+g.call(this, i = t[o], o), +m.call(this, i, o)]);
                for (o = 1; v > o; ++o)(e[o][1] < e[M][1] || e[o][1] == e[M][1] && e[o][0] < e[M][0]) && (M = o);
                for (o = 0; v > o; ++o) o !== M && (s = e[o][1] - e[M][1], u = e[o][0] - e[M][0], x.push({
                    angle: Math.atan2(s, u),
                    index: o
                }));
                for (x.sort(function(t, e) {
                        return t.angle - e.angle
                    }), d = x[0].angle, h = x[0].index, f = 0, o = 1; y > o; ++o) {
                    if (a = x[o].index, d == x[o].angle) {
                        if (u = e[h][0] - e[M][0], s = e[h][1] - e[M][1], c = e[a][0] - e[M][0], l = e[a][1] - e[M][1], u * u + s * s >= c * c + l * l) {
                            x[o].index = -1;
                            continue
                        }
                        x[f].index = -1
                    }
                    d = x[o].angle, f = o, h = a
                }
                for (b.push(M), o = 0, a = 0; 2 > o; ++a) x[a].index > -1 && (b.push(x[a].index), o++);
                for (p = b.length; y > a; ++a)
                    if (!(0 > x[a].index)) {
                        for (; !er(b[p - 2], b[p - 1], x[a].index, e);) --p;
                        b[p++] = x[a].index
                    }
                var _ = [];
                for (o = p - 1; o >= 0; --o) _.push(t[b[o]]);
                return _
            }
            var n = jn,
                r = Fn;
            return arguments.length ? e(t) : (e.x = function(t) {
                return arguments.length ? (n = t, e) : n
            }, e.y = function(t) {
                return arguments.length ? (r = t, e) : r
            }, e)
        }, ca.geom.polygon = function(t) {
            return t.area = function() {
                for (var e = 0, n = t.length, r = t[n - 1][1] * t[0][0] - t[n - 1][0] * t[0][1]; n > ++e;) r += t[e - 1][1] * t[e][0] - t[e - 1][0] * t[e][1];
                return .5 * r
            }, t.centroid = function(e) {
                var n, r, i = -1,
                    o = t.length,
                    a = 0,
                    u = 0,
                    s = t[o - 1];
                for (arguments.length || (e = -1 / (6 * t.area())); o > ++i;) n = s, s = t[i], r = n[0] * s[1] - s[0] * n[1], a += (n[0] + s[0]) * r, u += (n[1] + s[1]) * r;
                return [a * e, u * e]
            }, t.clip = function(e) {
                for (var n, r, i, o, a, u, s = -1, c = t.length, l = t[c - 1]; c > ++s;) {
                    for (n = e.slice(), e.length = 0, o = t[s], a = n[(i = n.length) - 1], r = -1; i > ++r;) u = n[r], nr(u, l, o) ? (nr(a, l, o) || e.push(rr(a, u, l, o)), e.push(u)) : nr(a, l, o) && e.push(rr(a, u, l, o)), a = u;
                    l = o
                }
                return e
            }, t
        }, ca.geom.delaunay = function(t) {
            var e = t.map(function() {
                    return []
                }),
                n = [];
            return ir(t, function(n) {
                e[n.region.l.index].push(t[n.region.r.index])
            }), e.forEach(function(e, r) {
                var i = t[r],
                    o = i[0],
                    a = i[1];
                e.forEach(function(t) {
                    t.angle = Math.atan2(t[0] - o, t[1] - a)
                }), e.sort(function(t, e) {
                    return t.angle - e.angle
                });
                for (var u = 0, s = e.length - 1; s > u; u++) n.push([i, e[u], e[u + 1]])
            }), n
        }, ca.geom.voronoi = function(t) {
            function e(t) {
                var e, r, a, u = t.map(function() {
                        return []
                    }),
                    s = le(i),
                    c = le(o),
                    l = t.length,
                    f = 1e6;
                if (s === jn && c === Fn) e = t;
                else
                    for (e = [], a = 0; l > a; ++a) e.push([+s.call(this, r = t[a], a), +c.call(this, r, a)]);
                if (ir(e, function(t) {
                        var e, n, r, i, o, a;
                        1 === t.a && t.b >= 0 ? (e = t.ep.r, n = t.ep.l) : (e = t.ep.l, n = t.ep.r), 1 === t.a ? (o = e ? e.y : -f, r = t.c - t.b * o, a = n ? n.y : f, i = t.c - t.b * a) : (r = e ? e.x : -f, o = t.c - t.a * r, i = n ? n.x : f, a = t.c - t.a * i);
                        var s = [r, o],
                            c = [i, a];
                        u[t.region.l.index].push(s, c), u[t.region.r.index].push(s, c)
                    }), u = u.map(function(t, n) {
                        var r = e[n][0],
                            i = e[n][1],
                            o = t.map(function(t) {
                                return Math.atan2(t[0] - r, t[1] - i)
                            }),
                            a = ca.range(t.length).sort(function(t, e) {
                                return o[t] - o[e]
                            });
                        return a.filter(function(t, e) {
                            return !e || o[t] - o[a[e - 1]] > Pa
                        }).map(function(e) {
                            return t[e]
                        })
                    }), u.forEach(function(t, n) {
                        var r = t.length;
                        if (!r) return t.push([-f, -f], [-f, f], [f, f], [f, -f]);
                        if (!(r > 2)) {
                            var i = e[n],
                                o = t[0],
                                a = t[1],
                                u = i[0],
                                s = i[1],
                                c = o[0],
                                l = o[1],
                                h = a[0],
                                d = a[1],
                                p = Math.abs(h - c),
                                g = d - l;
                            if (Pa > Math.abs(g)) {
                                var m = l > s ? -f : f;
                                t.push([-f, m], [f, m])
                            } else if (Pa > p) {
                                var v = c > u ? -f : f;
                                t.push([v, -f], [v, f])
                            } else {
                                var m = (c - u) * (d - l) > (h - c) * (l - s) ? f : -f,
                                    y = Math.abs(g) - p;
                                Pa > Math.abs(y) ? t.push([0 > g ? m : -m, m]) : (y > 0 && (m *= -1), t.push([-f, m], [f, m]))
                            }
                        }
                    }), n)
                    for (a = 0; l > a; ++a) n(u[a]);
                for (a = 0; l > a; ++a) u[a].point = t[a];
                return u
            }
            var n, r = null,
                i = jn,
                o = Fn;
            return arguments.length ? e(t) : (e.x = function(t) {
                return arguments.length ? (i = t, e) : i
            }, e.y = function(t) {
                return arguments.length ? (o = t, e) : o
            }, e.size = function(t) {
                return arguments.length ? (null == t ? n = null : (r = [+t[0], +t[1]], n = ca.geom.polygon([
                    [0, 0],
                    [0, r[1]], r, [r[0], 0]
                ]).clip), e) : r
            }, e.links = function(t) {
                var e, n, r, a = t.map(function() {
                        return []
                    }),
                    u = [],
                    s = le(i),
                    c = le(o),
                    l = t.length;
                if (s === jn && c === Fn) e = t;
                else
                    for (r = 0; l > r; ++r) e.push([+s.call(this, n = t[r], r), +c.call(this, n, r)]);
                return ir(e, function(e) {
                    var n = e.region.l.index,
                        r = e.region.r.index;
                    a[n][r] || (a[n][r] = a[r][n] = !0, u.push({
                        source: t[n],
                        target: t[r]
                    }))
                }), u
            }, e.triangles = function(t) {
                if (i === jn && o === Fn) return ca.geom.delaunay(t);
                var e, n, r, a, u, s = le(i),
                    c = le(o);
                for (a = 0, e = [], u = t.length; u > a; ++a) n = [+s.call(this, r = t[a], a), +c.call(this, r, a)], n.data = r, e.push(n);
                return ca.geom.delaunay(e).map(function(t) {
                    return t.map(function(t) {
                        return t.data
                    })
                })
            }, e)
        };
        var Pu = {
            l: "r",
            r: "l"
        };
        ca.geom.quadtree = function(t, e, n, r, i) {
            function o(t) {
                function o(t, e, n, r, i, o, a, u) {
                    if (!isNaN(n) && !isNaN(r))
                        if (t.leaf) {
                            var s = t.x,
                                l = t.y;
                            if (null != s)
                                if (.01 > Math.abs(s - n) + Math.abs(l - r)) c(t, e, n, r, i, o, a, u);
                                else {
                                    var f = t.point;
                                    t.x = t.y = t.point = null, c(t, f, s, l, i, o, a, u), c(t, e, n, r, i, o, a, u)
                                } else t.x = n, t.y = r, t.point = e
                        } else c(t, e, n, r, i, o, a, u)
                }

                function c(t, e, n, r, i, a, u, s) {
                    var c = .5 * (i + u),
                        l = .5 * (a + s),
                        f = n >= c,
                        h = r >= l,
                        d = (h << 1) + f;
                    t.leaf = !1, t = t.nodes[d] || (t.nodes[d] = ur()), f ? i = c : u = c, h ? a = l : s = l, o(t, e, n, r, i, a, u, s)
                }
                var l, f, h, d, p, g, m, v, y, x = le(u),
                    b = le(s);
                if (null != e) g = e, m = n, v = r, y = i;
                else if (v = y = -(g = m = 1 / 0), f = [], h = [], p = t.length, a)
                    for (d = 0; p > d; ++d) l = t[d], g > l.x && (g = l.x), m > l.y && (m = l.y), l.x > v && (v = l.x), l.y > y && (y = l.y), f.push(l.x), h.push(l.y);
                else
                    for (d = 0; p > d; ++d) {
                        var M = +x(l = t[d], d),
                            _ = +b(l, d);
                        g > M && (g = M), m > _ && (m = _), M > v && (v = M), _ > y && (y = _), f.push(M), h.push(_)
                    }
                var w = v - g,
                    k = y - m;
                w > k ? y = m + w : v = g + k;
                var T = ur();
                if (T.add = function(t) {
                        o(T, t, +x(t, ++d), +b(t, d), g, m, v, y)
                    }, T.visit = function(t) {
                        sr(t, T, g, m, v, y)
                    }, d = -1, null == e) {
                    for (; p > ++d;) o(T, t[d], f[d], h[d], g, m, v, y);
                    --d
                } else t.forEach(T.add);
                return f = h = t = l = null, T
            }
            var a, u = jn,
                s = Fn;
            return (a = arguments.length) ? (u = or, s = ar, 3 === a && (i = n, r = e, n = e = 0), o(t)) : (o.x = function(t) {
                return arguments.length ? (u = t, o) : u
            }, o.y = function(t) {
                return arguments.length ? (s = t, o) : s
            }, o.size = function(t) {
                return arguments.length ? (null == t ? e = n = r = i = null : (e = n = 0, r = +t[0], i = +t[1]), o) : null == e ? null : [r, i]
            }, o)
        }, ca.interpolateRgb = cr, ca.transform = function(t) {
            var e = la.createElementNS(ca.ns.prefix.svg, "g");
            return (ca.transform = function(t) {
                e.setAttribute("transform", t);
                var n = e.transform.baseVal.consolidate();
                return new lr(n ? n.matrix : Yu)
            })(t)
        }, lr.prototype.toString = function() {
            return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
        };
        var Yu = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: 0,
            f: 0
        };
        ca.interpolateNumber = pr, ca.interpolateTransform = gr, ca.interpolateObject = mr, ca.interpolateString = vr;
        var zu = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
        ca.interpolate = yr, ca.interpolators = [function(t, e) {
            var n = typeof e;
            return ("string" === n || n !== typeof t ? Va.has(e) || /^(#|rgb\(|hsl\()/.test(e) ? cr : vr : e instanceof q ? cr : "object" === n ? Array.isArray(e) ? br : mr : pr)(t, e)
        }], ca.interpolateArray = br;
        var Ru = function() {
                return fe
            },
            $u = ca.map({
                linear: Ru,
                poly: Er,
                quad: function() {
                    return kr
                },
                cubic: function() {
                    return Tr
                },
                sin: function() {
                    return Nr
                },
                exp: function() {
                    return Cr
                },
                circle: function() {
                    return Ar
                },
                elastic: Dr,
                back: Lr,
                bounce: function() {
                    return Hr
                }
            }),
            Bu = ca.map({
                "in": fe,
                out: _r,
                "in-out": wr,
                "out-in": function(t) {
                    return wr(_r(t))
                }
            });
        ca.ease = function(t) {
            var e = t.indexOf("-"),
                n = e >= 0 ? t.substring(0, e) : t,
                r = e >= 0 ? t.substring(e + 1) : "in";
            return n = $u.get(n) || Ru, r = Bu.get(r) || fe, Mr(r(n.apply(null, Array.prototype.slice.call(arguments, 1))))
        }, ca.interpolateHcl = jr, ca.interpolateHsl = Fr, ca.interpolateLab = qr, ca.interpolateRound = Or, ca.layout = {}, ca.layout.bundle = function() {
            return function(t) {
                for (var e = [], n = -1, r = t.length; r > ++n;) e.push(zr(t[n]));
                return e
            }
        }, ca.layout.chord = function() {
            function t() {
                var t, c, f, h, d, p = {},
                    g = [],
                    m = ca.range(o),
                    v = [];
                for (n = [], r = [], t = 0, h = -1; o > ++h;) {
                    for (c = 0, d = -1; o > ++d;) c += i[h][d];
                    g.push(c), v.push(ca.range(o)), t += c
                }
                for (a && m.sort(function(t, e) {
                        return a(g[t], g[e])
                    }), u && v.forEach(function(t, e) {
                        t.sort(function(t, n) {
                            return u(i[e][t], i[e][n])
                        })
                    }), t = (2 * Oa - l * o) / t, c = 0, h = -1; o > ++h;) {
                    for (f = c, d = -1; o > ++d;) {
                        var y = m[h],
                            x = v[y][d],
                            b = i[y][x],
                            M = c,
                            _ = c += b * t;
                        p[y + "-" + x] = {
                            index: y,
                            subindex: x,
                            startAngle: M,
                            endAngle: _,
                            value: b
                        }
                    }
                    r[y] = {
                        index: y,
                        startAngle: f,
                        endAngle: c,
                        value: (c - f) / t
                    }, c += l
                }
                for (h = -1; o > ++h;)
                    for (d = h - 1; o > ++d;) {
                        var w = p[h + "-" + d],
                            k = p[d + "-" + h];
                        (w.value || k.value) && n.push(w.value < k.value ? {
                            source: k,
                            target: w
                        } : {
                            source: w,
                            target: k
                        })
                    }
                s && e()
            }

            function e() {
                n.sort(function(t, e) {
                    return s((t.source.value + t.target.value) / 2, (e.source.value + e.target.value) / 2)
                })
            }
            var n, r, i, o, a, u, s, c = {},
                l = 0;
            return c.matrix = function(t) {
                return arguments.length ? (o = (i = t) && i.length, n = r = null, c) : i
            }, c.padding = function(t) {
                return arguments.length ? (l = t, n = r = null, c) : l
            }, c.sortGroups = function(t) {
                return arguments.length ? (a = t, n = r = null, c) : a
            }, c.sortSubgroups = function(t) {
                return arguments.length ? (u = t, n = null, c) : u
            }, c.sortChords = function(t) {
                return arguments.length ? (s = t, n && e(), c) : s
            }, c.chords = function() {
                return n || t(), n
            }, c.groups = function() {
                return r || t(), r
            }, c
        }, ca.layout.force = function() {
            function t(t) {
                return function(e, n, r, i) {
                    if (e.point !== t) {
                        var o = e.cx - t.x,
                            a = e.cy - t.y,
                            u = 1 / Math.sqrt(o * o + a * a);
                        if (g > (i - n) * u) {
                            var s = e.charge * u * u;
                            return t.px -= o * s, t.py -= a * s, !0
                        }
                        if (e.point && isFinite(u)) {
                            var s = e.pointCharge * u * u;
                            t.px -= o * s, t.py -= a * s
                        }
                    }
                    return !e.charge
                }
            }

            function e(t) {
                t.px = ca.event.x, t.py = ca.event.y, u.resume()
            }
            var n, r, i, o, a, u = {},
                s = ca.dispatch("start", "tick", "end"),
                c = [1, 1],
                l = .9,
                f = Iu,
                h = Wu,
                d = -30,
                p = .1,
                g = .8,
                m = [],
                v = [];
            return u.tick = function() {
                if (.005 > (r *= .99)) return s.end({
                    type: "end",
                    alpha: r = 0
                }), !0;
                var e, n, u, f, h, g, y, x, b, M = m.length,
                    _ = v.length;
                for (n = 0; _ > n; ++n) u = v[n], f = u.source, h = u.target, x = h.x - f.x, b = h.y - f.y, (g = x * x + b * b) && (g = r * o[n] * ((g = Math.sqrt(g)) - i[n]) / g, x *= g, b *= g, h.x -= x * (y = f.weight / (h.weight + f.weight)), h.y -= b * y, f.x += x * (y = 1 - y), f.y += b * y);
                if ((y = r * p) && (x = c[0] / 2, b = c[1] / 2, n = -1, y))
                    for (; M > ++n;) u = m[n], u.x += (x - u.x) * y, u.y += (b - u.y) * y;
                if (d)
                    for (Xr(e = ca.geom.quadtree(m), r, a), n = -1; M > ++n;)(u = m[n]).fixed || e.visit(t(u));
                for (n = -1; M > ++n;) u = m[n], u.fixed ? (u.x = u.px, u.y = u.py) : (u.x -= (u.px - (u.px = u.x)) * l, u.y -= (u.py - (u.py = u.y)) * l);
                s.tick({
                    type: "tick",
                    alpha: r
                })
            }, u.nodes = function(t) {
                return arguments.length ? (m = t, u) : m
            }, u.links = function(t) {
                return arguments.length ? (v = t, u) : v
            }, u.size = function(t) {
                return arguments.length ? (c = t, u) : c
            }, u.linkDistance = function(t) {
                return arguments.length ? (f = "function" == typeof t ? t : +t, u) : f
            }, u.distance = u.linkDistance, u.linkStrength = function(t) {
                return arguments.length ? (h = "function" == typeof t ? t : +t, u) : h
            }, u.friction = function(t) {
                return arguments.length ? (l = +t, u) : l
            }, u.charge = function(t) {
                return arguments.length ? (d = "function" == typeof t ? t : +t, u) : d
            }, u.gravity = function(t) {
                return arguments.length ? (p = +t, u) : p
            }, u.theta = function(t) {
                return arguments.length ? (g = +t, u) : g
            }, u.alpha = function(t) {
                return arguments.length ? (t = +t, r ? r = t > 0 ? t : 0 : t > 0 && (s.start({
                    type: "start",
                    alpha: r = t
                }), ca.timer(u.tick)), u) : r
            }, u.start = function() {
                function t(t, r) {
                    for (var i, o = e(n), a = -1, u = o.length; u > ++a;)
                        if (!isNaN(i = o[a][t])) return i;
                    return Math.random() * r
                }

                function e() {
                    if (!s) {
                        for (s = [], r = 0; p > r; ++r) s[r] = [];
                        for (r = 0; g > r; ++r) {
                            var t = v[r];
                            s[t.source.index].push(t.target), s[t.target.index].push(t.source)
                        }
                    }
                    return s[n]
                }
                var n, r, s, l, p = m.length,
                    g = v.length,
                    y = c[0],
                    x = c[1];
                for (n = 0; p > n; ++n)(l = m[n]).index = n, l.weight = 0;
                for (n = 0; g > n; ++n) l = v[n], "number" == typeof l.source && (l.source = m[l.source]), "number" == typeof l.target && (l.target = m[l.target]), ++l.source.weight, ++l.target.weight;
                for (n = 0; p > n; ++n) l = m[n], isNaN(l.x) && (l.x = t("x", y)), isNaN(l.y) && (l.y = t("y", x)), isNaN(l.px) && (l.px = l.x), isNaN(l.py) && (l.py = l.y);
                if (i = [], "function" == typeof f)
                    for (n = 0; g > n; ++n) i[n] = +f.call(this, v[n], n);
                else
                    for (n = 0; g > n; ++n) i[n] = f;
                if (o = [], "function" == typeof h)
                    for (n = 0; g > n; ++n) o[n] = +h.call(this, v[n], n);
                else
                    for (n = 0; g > n; ++n) o[n] = h;
                if (a = [], "function" == typeof d)
                    for (n = 0; p > n; ++n) a[n] = +d.call(this, m[n], n);
                else
                    for (n = 0; p > n; ++n) a[n] = d;
                return u.resume()
            }, u.resume = function() {
                return u.alpha(.1)
            }, u.stop = function() {
                return u.alpha(0)
            }, u.drag = function() {
                return n || (n = ca.behavior.drag().origin(fe).on("dragstart.force", Br).on("drag.force", e).on("dragend.force", Ir)), arguments.length ? (this.on("mouseover.force", Wr).on("mouseout.force", Ur).call(n), void 0) : n
            }, ca.rebind(u, s, "on")
        };
        var Iu = 20,
            Wu = 1;
        ca.layout.hierarchy = function() {
            function t(e, a, u) {
                var s = i.call(n, e, a);
                if (e.depth = a, u.push(e), s && (c = s.length)) {
                    for (var c, l, f = -1, h = e.children = [], d = 0, p = a + 1; c > ++f;) l = t(s[f], p, u), l.parent = e, h.push(l), d += l.value;
                    r && h.sort(r), o && (e.value = d)
                } else o && (e.value = +o.call(n, e, a) || 0);
                return e
            }

            function e(t, r) {
                var i = t.children,
                    a = 0;
                if (i && (u = i.length))
                    for (var u, s = -1, c = r + 1; u > ++s;) a += e(i[s], c);
                else o && (a = +o.call(n, t, r) || 0);
                return o && (t.value = a), a
            }

            function n(e) {
                var n = [];
                return t(e, 0, n), n
            }
            var r = Jr,
                i = Zr,
                o = Gr;
            return n.sort = function(t) {
                return arguments.length ? (r = t, n) : r
            }, n.children = function(t) {
                return arguments.length ? (i = t, n) : i
            }, n.value = function(t) {
                return arguments.length ? (o = t, n) : o
            }, n.revalue = function(t) {
                return e(t, 0), t
            }, n
        }, ca.layout.partition = function() {
            function t(e, n, r, i) {
                var o = e.children;
                if (e.x = n, e.y = e.depth * i, e.dx = r, e.dy = i, o && (a = o.length)) {
                    var a, u, s, c = -1;
                    for (r = e.value ? r / e.value : 0; a > ++c;) t(u = o[c], n, s = u.value * r, i), n += s
                }
            }

            function e(t) {
                var n = t.children,
                    r = 0;
                if (n && (i = n.length))
                    for (var i, o = -1; i > ++o;) r = Math.max(r, e(n[o]));
                return 1 + r
            }

            function n(n, o) {
                var a = r.call(this, n, o);
                return t(a[0], 0, i[0], i[1] / e(a[0])), a
            }
            var r = ca.layout.hierarchy(),
                i = [1, 1];
            return n.size = function(t) {
                return arguments.length ? (i = t, n) : i
            }, Vr(n, r)
        }, ca.layout.pie = function() {
            function t(o) {
                var a = o.map(function(n, r) {
                        return +e.call(t, n, r)
                    }),
                    u = +("function" == typeof r ? r.apply(this, arguments) : r),
                    s = (("function" == typeof i ? i.apply(this, arguments) : i) - u) / ca.sum(a),
                    c = ca.range(o.length);
                null != n && c.sort(n === Uu ? function(t, e) {
                    return a[e] - a[t]
                } : function(t, e) {
                    return n(o[t], o[e])
                });
                var l = [];
                return c.forEach(function(t) {
                    var e;
                    l[t] = {
                        data: o[t],
                        value: e = a[t],
                        startAngle: u,
                        endAngle: u += e * s
                    }
                }), l
            }
            var e = Number,
                n = Uu,
                r = 0,
                i = 2 * Oa;
            return t.value = function(n) {
                return arguments.length ? (e = n, t) : e
            }, t.sort = function(e) {
                return arguments.length ? (n = e, t) : n
            }, t.startAngle = function(e) {
                return arguments.length ? (r = e, t) : r
            }, t.endAngle = function(e) {
                return arguments.length ? (i = e, t) : i
            }, t
        };
        var Uu = {};
        ca.layout.stack = function() {
            function t(u, s) {
                var c = u.map(function(n, r) {
                        return e.call(t, n, r)
                    }),
                    l = c.map(function(e) {
                        return e.map(function(e, n) {
                            return [o.call(t, e, n), a.call(t, e, n)]
                        })
                    }),
                    f = n.call(t, l, s);
                c = ca.permute(c, f), l = ca.permute(l, f);
                var h, d, p, g = r.call(t, l, s),
                    m = c.length,
                    v = c[0].length;
                for (d = 0; v > d; ++d)
                    for (i.call(t, c[0][d], p = g[d], l[0][d][1]), h = 1; m > h; ++h) i.call(t, c[h][d], p += l[h - 1][d][1], l[h][d][1]);
                return u
            }
            var e = fe,
                n = ni,
                r = ri,
                i = ei,
                o = Qr,
                a = ti;
            return t.values = function(n) {
                return arguments.length ? (e = n, t) : e
            }, t.order = function(e) {
                return arguments.length ? (n = "function" == typeof e ? e : Xu.get(e) || ni, t) : n
            }, t.offset = function(e) {
                return arguments.length ? (r = "function" == typeof e ? e : Vu.get(e) || ri, t) : r
            }, t.x = function(e) {
                return arguments.length ? (o = e, t) : o
            }, t.y = function(e) {
                return arguments.length ? (a = e, t) : a
            }, t.out = function(e) {
                return arguments.length ? (i = e, t) : i
            }, t
        };
        var Xu = ca.map({
                "inside-out": function(t) {
                    var e, n, r = t.length,
                        i = t.map(ii),
                        o = t.map(oi),
                        a = ca.range(r).sort(function(t, e) {
                            return i[t] - i[e]
                        }),
                        u = 0,
                        s = 0,
                        c = [],
                        l = [];
                    for (e = 0; r > e; ++e) n = a[e], s > u ? (u += o[n], c.push(n)) : (s += o[n], l.push(n));
                    return l.reverse().concat(c)
                },
                reverse: function(t) {
                    return ca.range(t.length).reverse()
                },
                "default": ni
            }),
            Vu = ca.map({
                silhouette: function(t) {
                    var e, n, r, i = t.length,
                        o = t[0].length,
                        a = [],
                        u = 0,
                        s = [];
                    for (n = 0; o > n; ++n) {
                        for (e = 0, r = 0; i > e; e++) r += t[e][n][1];
                        r > u && (u = r), a.push(r)
                    }
                    for (n = 0; o > n; ++n) s[n] = (u - a[n]) / 2;
                    return s
                },
                wiggle: function(t) {
                    var e, n, r, i, o, a, u, s, c, l = t.length,
                        f = t[0],
                        h = f.length,
                        d = [];
                    for (d[0] = s = c = 0, n = 1; h > n; ++n) {
                        for (e = 0, i = 0; l > e; ++e) i += t[e][n][1];
                        for (e = 0, o = 0, u = f[n][0] - f[n - 1][0]; l > e; ++e) {
                            for (r = 0, a = (t[e][n][1] - t[e][n - 1][1]) / (2 * u); e > r; ++r) a += (t[r][n][1] - t[r][n - 1][1]) / u;
                            o += a * t[e][n][1]
                        }
                        d[n] = s -= i ? o / i * u : 0, c > s && (c = s)
                    }
                    for (n = 0; h > n; ++n) d[n] -= c;
                    return d
                },
                expand: function(t) {
                    var e, n, r, i = t.length,
                        o = t[0].length,
                        a = 1 / i,
                        u = [];
                    for (n = 0; o > n; ++n) {
                        for (e = 0, r = 0; i > e; e++) r += t[e][n][1];
                        if (r)
                            for (e = 0; i > e; e++) t[e][n][1] /= r;
                        else
                            for (e = 0; i > e; e++) t[e][n][1] = a
                    }
                    for (n = 0; o > n; ++n) u[n] = 0;
                    return u
                },
                zero: ri
            });
        ca.layout.histogram = function() {
            function t(t, o) {
                for (var a, u, s = [], c = t.map(n, this), l = r.call(this, c, o), f = i.call(this, l, c, o), o = -1, h = c.length, d = f.length - 1, p = e ? 1 : 1 / h; d > ++o;) a = s[o] = [], a.dx = f[o + 1] - (a.x = f[o]), a.y = 0;
                if (d > 0)
                    for (o = -1; h > ++o;) u = c[o], u >= l[0] && l[1] >= u && (a = s[ca.bisect(f, u, 1, d) - 1], a.y += p, a.push(t[o]));
                return s
            }
            var e = !0,
                n = Number,
                r = ci,
                i = ui;
            return t.value = function(e) {
                return arguments.length ? (n = e, t) : n
            }, t.range = function(e) {
                return arguments.length ? (r = le(e), t) : r
            }, t.bins = function(e) {
                return arguments.length ? (i = "number" == typeof e ? function(t) {
                    return si(t, e)
                } : le(e), t) : i
            }, t.frequency = function(n) {
                return arguments.length ? (e = !!n, t) : e
            }, t
        }, ca.layout.tree = function() {
            function t(t, i) {
                function o(t, e) {
                    var r = t.children,
                        i = t._tree;
                    if (r && (a = r.length)) {
                        for (var a, s, c, l = r[0], f = l, h = -1; a > ++h;) c = r[h], o(c, s), f = u(c, s, f), s = c;
                        yi(t);
                        var d = .5 * (l._tree.prelim + c._tree.prelim);
                        e ? (i.prelim = e._tree.prelim + n(t, e), i.mod = i.prelim - d) : i.prelim = d
                    } else e && (i.prelim = e._tree.prelim + n(t, e))
                }

                function a(t, e) {
                    t.x = t._tree.prelim + e;
                    var n = t.children;
                    if (n && (r = n.length)) {
                        var r, i = -1;
                        for (e += t._tree.mod; r > ++i;) a(n[i], e)
                    }
                }

                function u(t, e, r) {
                    if (e) {
                        for (var i, o = t, a = t, u = e, s = t.parent.children[0], c = o._tree.mod, l = a._tree.mod, f = u._tree.mod, h = s._tree.mod; u = hi(u), o = fi(o), u && o;) s = fi(s), a = hi(a), a._tree.ancestor = t, i = u._tree.prelim + f - o._tree.prelim - c + n(u, o), i > 0 && (xi(bi(u, t, r), t, i), c += i, l += i), f += u._tree.mod, c += o._tree.mod, h += s._tree.mod, l += a._tree.mod;
                        u && !hi(a) && (a._tree.thread = u, a._tree.mod += f - l), o && !fi(s) && (s._tree.thread = o, s._tree.mod += c - h, r = t)
                    }
                    return r
                }
                var s = e.call(this, t, i),
                    c = s[0];
                vi(c, function(t, e) {
                    t._tree = {
                        ancestor: t,
                        prelim: 0,
                        mod: 0,
                        change: 0,
                        shift: 0,
                        number: e ? e._tree.number + 1 : 0
                    }
                }), o(c), a(c, -c._tree.prelim);
                var l = di(c, gi),
                    f = di(c, pi),
                    h = di(c, mi),
                    d = l.x - n(l, f) / 2,
                    p = f.x + n(f, l) / 2,
                    g = h.depth || 1;
                return vi(c, function(t) {
                    t.x = (t.x - d) / (p - d) * r[0], t.y = t.depth / g * r[1], delete t._tree
                }), s
            }
            var e = ca.layout.hierarchy().sort(null).value(null),
                n = li,
                r = [1, 1];
            return t.separation = function(e) {
                return arguments.length ? (n = e, t) : n
            }, t.size = function(e) {
                return arguments.length ? (r = e, t) : r
            }, Vr(t, e)
        }, ca.layout.pack = function() {
            function t(t, i) {
                var o = e.call(this, t, i),
                    a = o[0];
                a.x = 0, a.y = 0, vi(a, function(t) {
                    t.r = Math.sqrt(t.value)
                }), vi(a, Ti);
                var u = r[0],
                    s = r[1],
                    c = Math.max(2 * a.r / u, 2 * a.r / s);
                if (n > 0) {
                    var l = n * c / 2;
                    vi(a, function(t) {
                        t.r += l
                    }), vi(a, Ti), vi(a, function(t) {
                        t.r -= l
                    }), c = Math.max(2 * a.r / u, 2 * a.r / s)
                }
                return Ni(a, u / 2, s / 2, 1 / c), o
            }
            var e = ca.layout.hierarchy().sort(Mi),
                n = 0,
                r = [1, 1];
            return t.size = function(e) {
                return arguments.length ? (r = e, t) : r
            }, t.padding = function(e) {
                return arguments.length ? (n = +e, t) : n
            }, Vr(t, e)
        }, ca.layout.cluster = function() {
            function t(t, i) {
                var o, a = e.call(this, t, i),
                    u = a[0],
                    s = 0;
                vi(u, function(t) {
                    var e = t.children;
                    e && e.length ? (t.x = Di(e), t.y = Ai(e)) : (t.x = o ? s += n(t, o) : 0, t.y = 0, o = t)
                });
                var c = Li(u),
                    l = Hi(u),
                    f = c.x - n(c, l) / 2,
                    h = l.x + n(l, c) / 2;
                return vi(u, function(t) {
                    t.x = (t.x - f) / (h - f) * r[0], t.y = (1 - (u.y ? t.y / u.y : 1)) * r[1]
                }), a
            }
            var e = ca.layout.hierarchy().sort(null).value(null),
                n = li,
                r = [1, 1];
            return t.separation = function(e) {
                return arguments.length ? (n = e, t) : n
            }, t.size = function(e) {
                return arguments.length ? (r = e, t) : r
            }, Vr(t, e)
        }, ca.layout.treemap = function() {
            function t(t, e) {
                for (var n, r, i = -1, o = t.length; o > ++i;) r = (n = t[i]).value * (0 > e ? 0 : e), n.area = isNaN(r) || 0 >= r ? 0 : r
            }

            function e(n) {
                var o = n.children;
                if (o && o.length) {
                    var a, u, s, c = f(n),
                        l = [],
                        h = o.slice(),
                        p = 1 / 0,
                        g = "slice" === d ? c.dx : "dice" === d ? c.dy : "slice-dice" === d ? 1 & n.depth ? c.dy : c.dx : Math.min(c.dx, c.dy);
                    for (t(h, c.dx * c.dy / n.value), l.area = 0;
                        (s = h.length) > 0;) l.push(a = h[s - 1]), l.area += a.area, "squarify" !== d || p >= (u = r(l, g)) ? (h.pop(), p = u) : (l.area -= l.pop().area, i(l, g, c, !1), g = Math.min(c.dx, c.dy), l.length = l.area = 0, p = 1 / 0);
                    l.length && (i(l, g, c, !0), l.length = l.area = 0), o.forEach(e)
                }
            }

            function n(e) {
                var r = e.children;
                if (r && r.length) {
                    var o, a = f(e),
                        u = r.slice(),
                        s = [];
                    for (t(u, a.dx * a.dy / e.value), s.area = 0; o = u.pop();) s.push(o), s.area += o.area, null != o.z && (i(s, o.z ? a.dx : a.dy, a, !u.length), s.length = s.area = 0);
                    r.forEach(n)
                }
            }

            function r(t, e) {
                for (var n, r = t.area, i = 0, o = 1 / 0, a = -1, u = t.length; u > ++a;)(n = t[a].area) && (o > n && (o = n), n > i && (i = n));
                return r *= r, e *= e, r ? Math.max(e * i * p / r, r / (e * o * p)) : 1 / 0
            }

            function i(t, e, n, r) {
                var i, o = -1,
                    a = t.length,
                    u = n.x,
                    c = n.y,
                    l = e ? s(t.area / e) : 0;
                if (e == n.dx) {
                    for ((r || l > n.dy) && (l = n.dy); a > ++o;) i = t[o], i.x = u, i.y = c, i.dy = l, u += i.dx = Math.min(n.x + n.dx - u, l ? s(i.area / l) : 0);
                    i.z = !0, i.dx += n.x + n.dx - u, n.y += l, n.dy -= l
                } else {
                    for ((r || l > n.dx) && (l = n.dx); a > ++o;) i = t[o], i.x = u, i.y = c, i.dx = l, c += i.dy = Math.min(n.y + n.dy - c, l ? s(i.area / l) : 0);
                    i.z = !1, i.dy += n.y + n.dy - c, n.x += l, n.dx -= l
                }
            }

            function o(r) {
                var i = a || u(r),
                    o = i[0];
                return o.x = 0, o.y = 0, o.dx = c[0], o.dy = c[1], a && u.revalue(o), t([o], o.dx * o.dy / o.value), (a ? n : e)(o), h && (a = i), i
            }
            var a, u = ca.layout.hierarchy(),
                s = Math.round,
                c = [1, 1],
                l = null,
                f = ji,
                h = !1,
                d = "squarify",
                p = .5 * (1 + Math.sqrt(5));
            return o.size = function(t) {
                return arguments.length ? (c = t, o) : c
            }, o.padding = function(t) {
                function e(e) {
                    var n = t.call(o, e, e.depth);
                    return null == n ? ji(e) : Fi(e, "number" == typeof n ? [n, n, n, n] : n)
                }

                function n(e) {
                    return Fi(e, t)
                }
                if (!arguments.length) return l;
                var r;
                return f = null == (l = t) ? ji : "function" == (r = typeof t) ? e : "number" === r ? (t = [t, t, t, t], n) : n, o
            }, o.round = function(t) {
                return arguments.length ? (s = t ? Math.round : Number, o) : s != Number
            }, o.sticky = function(t) {
                return arguments.length ? (h = t, a = null, o) : h
            }, o.ratio = function(t) {
                return arguments.length ? (p = t, o) : p
            }, o.mode = function(t) {
                return arguments.length ? (d = t + "", o) : d
            }, Vr(o, u)
        }, ca.random = {
            normal: function(t, e) {
                var n = arguments.length;
                return 2 > n && (e = 1), 1 > n && (t = 0),
                    function() {
                        var n, r, i;
                        do n = 2 * Math.random() - 1, r = 2 * Math.random() - 1, i = n * n + r * r; while (!i || i > 1);
                        return t + e * n * Math.sqrt(-2 * Math.log(i) / i)
                    }
            },
            logNormal: function() {
                var t = ca.random.normal.apply(ca, arguments);
                return function() {
                    return Math.exp(t())
                }
            },
            irwinHall: function(t) {
                return function() {
                    for (var e = 0, n = 0; t > n; n++) e += Math.random();
                    return e / t
                }
            }
        }, ca.scale = {}, ca.scale.linear = function() {
            return Ri([0, 1], [0, 1], yr, !1)
        }, ca.scale.log = function() {
            return Xi(ca.scale.linear().domain([0, Math.LN10]), 10, Vi, Zi)
        };
        var Zu = ca.format(".0e");
        ca.scale.pow = function() {
            return Qi(ca.scale.linear(), 1)
        }, ca.scale.sqrt = function() {
            return ca.scale.pow().exponent(.5)
        }, ca.scale.ordinal = function() {
            return eo([], {
                t: "range",
                a: [
                    []
                ]
            })
        }, ca.scale.category10 = function() {
            return ca.scale.ordinal().range(Gu)
        }, ca.scale.category20 = function() {
            return ca.scale.ordinal().range(Ju)
        }, ca.scale.category20b = function() {
            return ca.scale.ordinal().range(Ku)
        }, ca.scale.category20c = function() {
            return ca.scale.ordinal().range(Qu)
        };
        var Gu = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
            Ju = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"],
            Ku = ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"],
            Qu = ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"];
        ca.scale.quantile = function() {
            return no([], [])
        }, ca.scale.quantize = function() {
            return ro(0, 1, [0, 1])
        }, ca.scale.threshold = function() {
            return io([.5], [0, 1])
        }, ca.scale.identity = function() {
            return oo([0, 1])
        }, ca.svg.arc = function() {
            function t() {
                var t = e.apply(this, arguments),
                    o = n.apply(this, arguments),
                    a = r.apply(this, arguments) + ts,
                    u = i.apply(this, arguments) + ts,
                    s = (a > u && (s = a, a = u, u = s), u - a),
                    c = Oa > s ? "0" : "1",
                    l = Math.cos(a),
                    f = Math.sin(a),
                    h = Math.cos(u),
                    d = Math.sin(u);
                return s >= es ? t ? "M0," + o + "A" + o + "," + o + " 0 1,1 0," + -o + "A" + o + "," + o + " 0 1,1 0," + o + "M0," + t + "A" + t + "," + t + " 0 1,0 0," + -t + "A" + t + "," + t + " 0 1,0 0," + t + "Z" : "M0," + o + "A" + o + "," + o + " 0 1,1 0," + -o + "A" + o + "," + o + " 0 1,1 0," + o + "Z" : t ? "M" + o * l + "," + o * f + "A" + o + "," + o + " 0 " + c + ",1 " + o * h + "," + o * d + "L" + t * h + "," + t * d + "A" + t + "," + t + " 0 " + c + ",0 " + t * l + "," + t * f + "Z" : "M" + o * l + "," + o * f + "A" + o + "," + o + " 0 " + c + ",1 " + o * h + "," + o * d + "L0,0" + "Z"
            }
            var e = ao,
                n = uo,
                r = so,
                i = co;
            return t.innerRadius = function(n) {
                return arguments.length ? (e = le(n), t) : e
            }, t.outerRadius = function(e) {
                return arguments.length ? (n = le(e), t) : n
            }, t.startAngle = function(e) {
                return arguments.length ? (r = le(e), t) : r
            }, t.endAngle = function(e) {
                return arguments.length ? (i = le(e), t) : i
            }, t.centroid = function() {
                var t = (e.apply(this, arguments) + n.apply(this, arguments)) / 2,
                    o = (r.apply(this, arguments) + i.apply(this, arguments)) / 2 + ts;
                return [Math.cos(o) * t, Math.sin(o) * t]
            }, t
        };
        var ts = -Oa / 2,
            es = 2 * Oa - 1e-6;
        ca.svg.line.radial = function() {
            var t = Hn(lo);
            return t.radius = t.x, delete t.x, t.angle = t.y, delete t.y, t
        }, Pn.reverse = Yn, Yn.reverse = Pn, ca.svg.area = function() {
            return fo(fe)
        }, ca.svg.area.radial = function() {
            var t = fo(lo);
            return t.radius = t.x, delete t.x, t.innerRadius = t.x0, delete t.x0, t.outerRadius = t.x1, delete t.x1, t.angle = t.y, delete t.y, t.startAngle = t.y0, delete t.y0, t.endAngle = t.y1, delete t.y1, t
        }, ca.svg.chord = function() {
            function t(t, u) {
                var s = e(this, o, t, u),
                    c = e(this, a, t, u);
                return "M" + s.p0 + r(s.r, s.p1, s.a1 - s.a0) + (n(s, c) ? i(s.r, s.p1, s.r, s.p0) : i(s.r, s.p1, c.r, c.p0) + r(c.r, c.p1, c.a1 - c.a0) + i(c.r, c.p1, s.r, s.p0)) + "Z"
            }

            function e(t, e, n, r) {
                var i = e.call(t, n, r),
                    o = u.call(t, i, r),
                    a = s.call(t, i, r) + ts,
                    l = c.call(t, i, r) + ts;
                return {
                    r: o,
                    a0: a,
                    a1: l,
                    p0: [o * Math.cos(a), o * Math.sin(a)],
                    p1: [o * Math.cos(l), o * Math.sin(l)]
                }
            }

            function n(t, e) {
                return t.a0 == e.a0 && t.a1 == e.a1
            }

            function r(t, e, n) {
                return "A" + t + "," + t + " 0 " + +(n > Oa) + ",1 " + e
            }

            function i(t, e, n, r) {
                return "Q 0,0 " + r
            }
            var o = fn,
                a = hn,
                u = ho,
                s = so,
                c = co;
            return t.radius = function(e) {
                return arguments.length ? (u = le(e), t) : u
            }, t.source = function(e) {
                return arguments.length ? (o = le(e), t) : o
            }, t.target = function(e) {
                return arguments.length ? (a = le(e), t) : a
            }, t.startAngle = function(e) {
                return arguments.length ? (s = le(e), t) : s
            }, t.endAngle = function(e) {
                return arguments.length ? (c = le(e), t) : c
            }, t
        }, ca.svg.diagonal = function() {
            function t(t, i) {
                var o = e.call(this, t, i),
                    a = n.call(this, t, i),
                    u = (o.y + a.y) / 2,
                    s = [o, {
                        x: o.x,
                        y: u
                    }, {
                        x: a.x,
                        y: u
                    }, a];
                return s = s.map(r), "M" + s[0] + "C" + s[1] + " " + s[2] + " " + s[3]
            }
            var e = fn,
                n = hn,
                r = po;
            return t.source = function(n) {
                return arguments.length ? (e = le(n), t) : e
            }, t.target = function(e) {
                return arguments.length ? (n = le(e), t) : n
            }, t.projection = function(e) {
                return arguments.length ? (r = e, t) : r
            }, t
        }, ca.svg.diagonal.radial = function() {
            var t = ca.svg.diagonal(),
                e = po,
                n = t.projection;
            return t.projection = function(t) {
                return arguments.length ? n(go(e = t)) : e
            }, t
        }, ca.svg.symbol = function() {
            function t(t, r) {
                return (ns.get(e.call(this, t, r)) || yo)(n.call(this, t, r))
            }
            var e = vo,
                n = mo;
            return t.type = function(n) {
                return arguments.length ? (e = le(n), t) : e
            }, t.size = function(e) {
                return arguments.length ? (n = le(e), t) : n
            }, t
        };
        var ns = ca.map({
            circle: yo,
            cross: function(t) {
                var e = Math.sqrt(t / 5) / 2;
                return "M" + -3 * e + "," + -e + "H" + -e + "V" + -3 * e + "H" + e + "V" + -e + "H" + 3 * e + "V" + e + "H" + e + "V" + 3 * e + "H" + -e + "V" + e + "H" + -3 * e + "Z"
            },
            diamond: function(t) {
                var e = Math.sqrt(t / (2 * os)),
                    n = e * os;
                return "M0," + -e + "L" + n + ",0" + " 0," + e + " " + -n + ",0" + "Z"
            },
            square: function(t) {
                var e = Math.sqrt(t) / 2;
                return "M" + -e + "," + -e + "L" + e + "," + -e + " " + e + "," + e + " " + -e + "," + e + "Z"
            },
            "triangle-down": function(t) {
                var e = Math.sqrt(t / is),
                    n = e * is / 2;
                return "M0," + n + "L" + e + "," + -n + " " + -e + "," + -n + "Z"
            },
            "triangle-up": function(t) {
                var e = Math.sqrt(t / is),
                    n = e * is / 2;
                return "M0," + -n + "L" + e + "," + n + " " + -e + "," + n + "Z"
            }
        });
        ca.svg.symbolTypes = ns.keys();
        var rs, is = Math.sqrt(3),
            os = Math.tan(30 * Ya),
            as = [],
            us = 0,
            ss = {
                ease: Sr,
                delay: 0,
                duration: 250
            };
        as.call = Ea.call, as.empty = Ea.empty, as.node = Ea.node, ca.transition = function(t) {
            return arguments.length ? rs ? t.transition() : t : La.transition()
        }, ca.transition.prototype = as, as.select = function(t) {
            var e, n, r, i = this.id,
                o = [];
            "function" != typeof t && (t = v(t));
            for (var a = -1, u = this.length; u > ++a;) {
                o.push(e = []);
                for (var s = this[a], c = -1, l = s.length; l > ++c;)(r = s[c]) && (n = t.call(r, r.__data__, c)) ? ("__data__" in r && (n.__data__ = r.__data__), _o(n, c, i, r.__transition__[i]), e.push(n)) : e.push(null)
            }
            return xo(o, i)
        }, as.selectAll = function(t) {
            var e, n, r, i, o, a = this.id,
                u = [];
            "function" != typeof t && (t = y(t));
            for (var s = -1, c = this.length; c > ++s;)
                for (var l = this[s], f = -1, h = l.length; h > ++f;)
                    if (r = l[f]) {
                        o = r.__transition__[a], n = t.call(r, r.__data__, f), u.push(e = []);
                        for (var d = -1, p = n.length; p > ++d;) _o(i = n[d], d, a, o), e.push(i)
                    }
            return xo(u, a)
        }, as.filter = function(t) {
            var e, n, r, i = [];
            "function" != typeof t && (t = N(t));
            for (var o = 0, a = this.length; a > o; o++) {
                i.push(e = []);
                for (var n = this[o], u = 0, s = n.length; s > u; u++)(r = n[u]) && t.call(r, r.__data__, u) && e.push(r)
            }
            return xo(i, this.id, this.time).ease(this.ease())
        }, as.tween = function(t, e) {
            var n = this.id;
            return 2 > arguments.length ? this.node().__transition__[n].tween.get(t) : j(this, null == e ? function(e) {
                e.__transition__[n].tween.remove(t)
            } : function(r) {
                r.__transition__[n].tween.set(t, e)
            })
        }, as.attr = function(t, e) {
            function n() {
                this.removeAttribute(u)
            }

            function r() {
                this.removeAttributeNS(u.space, u.local)
            }

            function i(t) {
                return null == t ? n : (t += "", function() {
                    var e, n = this.getAttribute(u);
                    return n !== t && (e = a(n, t), function(t) {
                        this.setAttribute(u, e(t))
                    })
                })
            }

            function o(t) {
                return null == t ? r : (t += "", function() {
                    var e, n = this.getAttributeNS(u.space, u.local);
                    return n !== t && (e = a(n, t), function(t) {
                        this.setAttributeNS(u.space, u.local, e(t))
                    })
                })
            }
            if (2 > arguments.length) {
                for (e in t) this.attr(e, t[e]);
                return this
            }
            var a = xr(t),
                u = ca.ns.qualify(t);
            return bo(this, "attr." + t, e, u.local ? o : i)
        }, as.attrTween = function(t, e) {
            function n(t, n) {
                var r = e.call(this, t, n, this.getAttribute(i));
                return r && function(t) {
                    this.setAttribute(i, r(t))
                }
            }

            function r(t, n) {
                var r = e.call(this, t, n, this.getAttributeNS(i.space, i.local));
                return r && function(t) {
                    this.setAttributeNS(i.space, i.local, r(t))
                }
            }
            var i = ca.ns.qualify(t);
            return this.tween("attr." + t, i.local ? r : n)
        }, as.style = function(t, e, n) {
            function r() {
                this.style.removeProperty(t)
            }

            function i(e) {
                return null == e ? r : (e += "", function() {
                    var r, i = fa.getComputedStyle(this, null).getPropertyValue(t);
                    return i !== e && (r = a(i, e), function(e) {
                        this.style.setProperty(t, r(e), n)
                    })
                })
            }
            var o = arguments.length;
            if (3 > o) {
                if ("string" != typeof t) {
                    2 > o && (e = "");
                    for (n in t) this.style(n, t[n], e);
                    return this
                }
                n = ""
            }
            var a = xr(t);
            return bo(this, "style." + t, e, i)
        }, as.styleTween = function(t, e, n) {
            function r(r, i) {
                var o = e.call(this, r, i, fa.getComputedStyle(this, null).getPropertyValue(t));
                return o && function(e) {
                    this.style.setProperty(t, o(e), n)
                }
            }
            return 3 > arguments.length && (n = ""), this.tween("style." + t, r)
        }, as.text = function(t) {
            return bo(this, "text", t, Mo)
        }, as.remove = function() {
            return this.each("end.transition", function() {
                var t;
                !this.__transition__ && (t = this.parentNode) && t.removeChild(this)
            })
        }, as.ease = function(t) {
            var e = this.id;
            return 1 > arguments.length ? this.node().__transition__[e].ease : ("function" != typeof t && (t = ca.ease.apply(ca, arguments)), j(this, function(n) {
                n.__transition__[e].ease = t
            }))
        }, as.delay = function(t) {
            var e = this.id;
            return j(this, "function" == typeof t ? function(n, r, i) {
                n.__transition__[e].delay = 0 | t.call(n, n.__data__, r, i)
            } : (t |= 0, function(n) {
                n.__transition__[e].delay = t
            }))
        }, as.duration = function(t) {
            var e = this.id;
            return j(this, "function" == typeof t ? function(n, r, i) {
                n.__transition__[e].duration = Math.max(1, 0 | t.call(n, n.__data__, r, i))
            } : (t = Math.max(1, 0 | t), function(n) {
                n.__transition__[e].duration = t
            }))
        }, as.each = function(t, e) {
            var n = this.id;
            if (2 > arguments.length) {
                var r = ss,
                    i = rs;
                rs = n, j(this, function(e, r, i) {
                    ss = e.__transition__[n], t.call(e, e.__data__, r, i)
                }), ss = r, rs = i
            } else j(this, function(r) {
                r.__transition__[n].event.on(t, e)
            });
            return this
        }, as.transition = function() {
            for (var t, e, n, r, i = this.id, o = ++us, a = [], u = 0, s = this.length; s > u; u++) {
                a.push(t = []);
                for (var e = this[u], c = 0, l = e.length; l > c; c++)(n = e[c]) && (r = Object.create(n.__transition__[i]), r.delay += r.duration, _o(n, c, o, r)), t.push(n)
            }
            return xo(a, o)
        }, ca.svg.axis = function() {
            function t(t) {
                t.each(function() {
                    var t, f = ca.select(this),
                        h = null == c ? n.ticks ? n.ticks.apply(n, s) : n.domain() : c,
                        d = null == e ? n.tickFormat ? n.tickFormat.apply(n, s) : String : e,
                        p = To(n, h, l),
                        g = f.selectAll(".tick.minor").data(p, String),
                        m = g.enter().insert("line", ".tick").attr("class", "tick minor").style("opacity", 1e-6),
                        v = ca.transition(g.exit()).style("opacity", 1e-6).remove(),
                        y = ca.transition(g).style("opacity", 1),
                        x = f.selectAll(".tick.major").data(h, String),
                        b = x.enter().insert("g", "path").attr("class", "tick major").style("opacity", 1e-6),
                        M = ca.transition(x.exit()).style("opacity", 1e-6).remove(),
                        _ = ca.transition(x).style("opacity", 1),
                        w = Oi(n),
                        k = f.selectAll(".domain").data([0]),
                        T = (k.enter().append("path").attr("class", "domain"), ca.transition(k)),
                        S = n.copy(),
                        E = this.__chart__ || S;
                    this.__chart__ = S, b.append("line"), b.append("text");
                    var N = b.select("line"),
                        C = _.select("line"),
                        A = x.select("text").text(d),
                        D = b.select("text"),
                        L = _.select("text");
                    switch (r) {
                        case "bottom":
                            t = wo, m.attr("y2", o), y.attr("x2", 0).attr("y2", o), N.attr("y2", i), D.attr("y", Math.max(i, 0) + u), C.attr("x2", 0).attr("y2", i), L.attr("x", 0).attr("y", Math.max(i, 0) + u), A.attr("dy", ".71em").style("text-anchor", "middle"), T.attr("d", "M" + w[0] + "," + a + "V0H" + w[1] + "V" + a);
                            break;
                        case "top":
                            t = wo, m.attr("y2", -o), y.attr("x2", 0).attr("y2", -o), N.attr("y2", -i), D.attr("y", -(Math.max(i, 0) + u)), C.attr("x2", 0).attr("y2", -i), L.attr("x", 0).attr("y", -(Math.max(i, 0) + u)), A.attr("dy", "0em").style("text-anchor", "middle"), T.attr("d", "M" + w[0] + "," + -a + "V0H" + w[1] + "V" + -a);
                            break;
                        case "left":
                            t = ko, m.attr("x2", -o), y.attr("x2", -o).attr("y2", 0), N.attr("x2", -i), D.attr("x", -(Math.max(i, 0) + u)), C.attr("x2", -i).attr("y2", 0), L.attr("x", -(Math.max(i, 0) + u)).attr("y", 0), A.attr("dy", ".32em").style("text-anchor", "end"), T.attr("d", "M" + -a + "," + w[0] + "H0V" + w[1] + "H" + -a);
                            break;
                        case "right":
                            t = ko, m.attr("x2", o), y.attr("x2", o).attr("y2", 0), N.attr("x2", i), D.attr("x", Math.max(i, 0) + u), C.attr("x2", i).attr("y2", 0), L.attr("x", Math.max(i, 0) + u).attr("y", 0), A.attr("dy", ".32em").style("text-anchor", "start"), T.attr("d", "M" + a + "," + w[0] + "H0V" + w[1] + "H" + a)
                    }
                    if (n.ticks) b.call(t, E), _.call(t, S), M.call(t, S), m.call(t, E), y.call(t, S), v.call(t, S);
                    else {
                        var H = S.rangeBand() / 2,
                            j = function(t) {
                                return S(t) + H
                            };
                        b.call(t, j), _.call(t, j)
                    }
                })
            }
            var e, n = ca.scale.linear(),
                r = cs,
                i = 6,
                o = 6,
                a = 6,
                u = 3,
                s = [10],
                c = null,
                l = 0;
            return t.scale = function(e) {
                return arguments.length ? (n = e, t) : n
            }, t.orient = function(e) {
                return arguments.length ? (r = e in ls ? e + "" : cs, t) : r
            }, t.ticks = function() {
                return arguments.length ? (s = arguments, t) : s
            }, t.tickValues = function(e) {
                return arguments.length ? (c = e, t) : c
            }, t.tickFormat = function(n) {
                return arguments.length ? (e = n, t) : e
            }, t.tickSize = function(e, n) {
                if (!arguments.length) return i;
                var r = arguments.length - 1;
                return i = +e, o = r > 1 ? +n : i, a = r > 0 ? +arguments[r] : i, t
            }, t.tickPadding = function(e) {
                return arguments.length ? (u = +e, t) : u
            }, t.tickSubdivide = function(e) {
                return arguments.length ? (l = +e, t) : l
            }, t
        };
        var cs = "bottom",
            ls = {
                top: 1,
                right: 1,
                bottom: 1,
                left: 1
            };
        ca.svg.brush = function() {
            function t(o) {
                o.each(function() {
                    var o, a = ca.select(this),
                        c = a.selectAll(".background").data([0]),
                        f = a.selectAll(".extent").data([0]),
                        h = a.selectAll(".resize").data(l, String);
                    a.style("pointer-events", "all").on("mousedown.brush", i).on("touchstart.brush", i), c.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), f.enter().append("rect").attr("class", "extent").style("cursor", "move"), h.enter().append("g").attr("class", function(t) {
                        return "resize " + t
                    }).style("cursor", function(t) {
                        return fs[t]
                    }).append("rect").attr("x", function(t) {
                        return /[ew]$/.test(t) ? -3 : null
                    }).attr("y", function(t) {
                        return /^[ns]/.test(t) ? -3 : null
                    }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), h.style("display", t.empty() ? "none" : null), h.exit().remove(), u && (o = Oi(u), c.attr("x", o[0]).attr("width", o[1] - o[0]), n(a)), s && (o = Oi(s), c.attr("y", o[0]).attr("height", o[1] - o[0]), r(a)), e(a)
                })
            }

            function e(t) {
                t.selectAll(".resize").attr("transform", function(t) {
                    return "translate(" + f[+/e$/.test(t)][0] + "," + f[+/^s/.test(t)][1] + ")"
                })
            }

            function n(t) {
                t.select(".extent").attr("x", f[0][0]), t.selectAll(".extent,.n>rect,.s>rect").attr("width", f[1][0] - f[0][0])
            }

            function r(t) {
                t.select(".extent").attr("y", f[0][1]), t.selectAll(".extent,.e>rect,.w>rect").attr("height", f[1][1] - f[0][1])
            }

            function i() {
                function i() {
                    var t = ca.event.changedTouches;
                    return t ? ca.touches(y, t)[0] : ca.mouse(y)
                }

                function l() {
                    32 == ca.event.keyCode && (T || (m = null, S[0] -= f[1][0], S[1] -= f[1][1], T = 2), c())
                }

                function h() {
                    32 == ca.event.keyCode && 2 == T && (S[0] += f[1][0], S[1] += f[1][1], T = 0, c())
                }

                function d() {
                    var t = i(),
                        o = !1;
                    v && (t[0] += v[0], t[1] += v[1]), T || (ca.event.altKey ? (m || (m = [(f[0][0] + f[1][0]) / 2, (f[0][1] + f[1][1]) / 2]), S[0] = f[+(t[0] < m[0])][0], S[1] = f[+(t[1] < m[1])][1]) : m = null), w && p(t, u, 0) && (n(M), o = !0), k && p(t, s, 1) && (r(M), o = !0), o && (e(M), b({
                        type: "brush",
                        mode: T ? "move" : "resize"
                    }))
                }

                function p(t, e, n) {
                    var r, i, a = Oi(e),
                        u = a[0],
                        s = a[1],
                        c = S[n],
                        l = f[1][n] - f[0][n];
                    return T && (u -= c, s -= l + c), r = Math.max(u, Math.min(s, t[n])), T ? i = (r += c) + l : (m && (c = Math.max(u, Math.min(s, 2 * m[n] - r))), r > c ? (i = r, r = c) : i = c), f[0][n] !== r || f[1][n] !== i ? (o = null, f[0][n] = r, f[1][n] = i, !0) : void 0
                }

                function g() {
                    d(), M.style("pointer-events", "all").selectAll(".resize").style("display", t.empty() ? "none" : null), ca.select("body").style("cursor", null), E.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), b({
                        type: "brushend"
                    }), c()
                }
                var m, v, y = this,
                    x = ca.select(ca.event.target),
                    b = a.of(y, arguments),
                    M = ca.select(y),
                    _ = x.datum(),
                    w = !/^(n|s)$/.test(_) && u,
                    k = !/^(e|w)$/.test(_) && s,
                    T = x.classed("extent"),
                    S = i(),
                    E = ca.select(fa).on("mousemove.brush", d).on("mouseup.brush", g).on("touchmove.brush", d).on("touchend.brush", g).on("keydown.brush", l).on("keyup.brush", h);
                if (T) S[0] = f[0][0] - S[0], S[1] = f[0][1] - S[1];
                else if (_) {
                    var N = +/w$/.test(_),
                        C = +/^n/.test(_);
                    v = [f[1 - N][0] - S[0], f[1 - C][1] - S[1]], S[0] = f[N][0], S[1] = f[C][1]
                } else ca.event.altKey && (m = S.slice());
                M.style("pointer-events", "none").selectAll(".resize").style("display", null), ca.select("body").style("cursor", x.style("cursor")), b({
                    type: "brushstart"
                }), d(), c()
            }
            var o, a = h(t, "brushstart", "brush", "brushend"),
                u = null,
                s = null,
                l = hs[0],
                f = [
                    [0, 0],
                    [0, 0]
                ];
            return t.x = function(e) {
                return arguments.length ? (u = e, l = hs[!u << 1 | !s], t) : u
            }, t.y = function(e) {
                return arguments.length ? (s = e, l = hs[!u << 1 | !s], t) : s
            }, t.extent = function(e) {
                var n, r, i, a, c;
                return arguments.length ? (o = [
                    [0, 0],
                    [0, 0]
                ], u && (n = e[0], r = e[1], s && (n = n[0], r = r[0]), o[0][0] = n, o[1][0] = r, u.invert && (n = u(n), r = u(r)), n > r && (c = n, n = r, r = c), f[0][0] = 0 | n, f[1][0] = 0 | r), s && (i = e[0], a = e[1], u && (i = i[1], a = a[1]), o[0][1] = i, o[1][1] = a, s.invert && (i = s(i), a = s(a)), i > a && (c = i, i = a, a = c), f[0][1] = 0 | i, f[1][1] = 0 | a), t) : (e = o || f, u && (n = e[0][0], r = e[1][0], o || (n = f[0][0], r = f[1][0], u.invert && (n = u.invert(n), r = u.invert(r)), n > r && (c = n, n = r, r = c))), s && (i = e[0][1], a = e[1][1], o || (i = f[0][1], a = f[1][1], s.invert && (i = s.invert(i), a = s.invert(a)), i > a && (c = i, i = a, a = c))), u && s ? [
                    [n, i],
                    [r, a]
                ] : u ? [n, r] : s && [i, a])
            }, t.clear = function() {
                return o = null, f[0][0] = f[0][1] = f[1][0] = f[1][1] = 0, t
            }, t.empty = function() {
                return u && f[0][0] === f[1][0] || s && f[0][1] === f[1][1]
            }, ca.rebind(t, a, "on")
        };
        var fs = {
                n: "ns-resize",
                e: "ew-resize",
                s: "ns-resize",
                w: "ew-resize",
                nw: "nwse-resize",
                ne: "nesw-resize",
                se: "nwse-resize",
                sw: "nesw-resize"
            },
            hs = [
                ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
                ["e", "w"],
                ["n", "s"],
                []
            ];
        ca.time = {};
        var ds = Date,
            ps = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        So.prototype = {
            getDate: function() {
                return this._.getUTCDate()
            },
            getDay: function() {
                return this._.getUTCDay()
            },
            getFullYear: function() {
                return this._.getUTCFullYear()
            },
            getHours: function() {
                return this._.getUTCHours()
            },
            getMilliseconds: function() {
                return this._.getUTCMilliseconds()
            },
            getMinutes: function() {
                return this._.getUTCMinutes()
            },
            getMonth: function() {
                return this._.getUTCMonth()
            },
            getSeconds: function() {
                return this._.getUTCSeconds()
            },
            getTime: function() {
                return this._.getTime()
            },
            getTimezoneOffset: function() {
                return 0
            },
            valueOf: function() {
                return this._.valueOf()
            },
            setDate: function() {
                gs.setUTCDate.apply(this._, arguments)
            },
            setDay: function() {
                gs.setUTCDay.apply(this._, arguments)
            },
            setFullYear: function() {
                gs.setUTCFullYear.apply(this._, arguments)
            },
            setHours: function() {
                gs.setUTCHours.apply(this._, arguments)
            },
            setMilliseconds: function() {
                gs.setUTCMilliseconds.apply(this._, arguments)
            },
            setMinutes: function() {
                gs.setUTCMinutes.apply(this._, arguments)
            },
            setMonth: function() {
                gs.setUTCMonth.apply(this._, arguments)
            },
            setSeconds: function() {
                gs.setUTCSeconds.apply(this._, arguments)
            },
            setTime: function() {
                gs.setTime.apply(this._, arguments)
            }
        };
        var gs = Date.prototype,
            ms = "%a %b %e %X %Y",
            vs = "%m/%d/%Y",
            ys = "%H:%M:%S",
            xs = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            bs = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            Ms = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            _s = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        ca.time.year = Eo(function(t) {
            return t = ca.time.day(t), t.setMonth(0, 1), t
        }, function(t, e) {
            t.setFullYear(t.getFullYear() + e)
        }, function(t) {
            return t.getFullYear()
        }), ca.time.years = ca.time.year.range, ca.time.years.utc = ca.time.year.utc.range, ca.time.day = Eo(function(t) {
            var e = new ds(1970, 0);
            return e.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), e
        }, function(t, e) {
            t.setDate(t.getDate() + e)
        }, function(t) {
            return t.getDate() - 1
        }), ca.time.days = ca.time.day.range, ca.time.days.utc = ca.time.day.utc.range, ca.time.dayOfYear = function(t) {
            var e = ca.time.year(t);
            return Math.floor((t - e - 6e4 * (t.getTimezoneOffset() - e.getTimezoneOffset())) / 864e5)
        }, ps.forEach(function(t, e) {
            t = t.toLowerCase(), e = 7 - e;
            var n = ca.time[t] = Eo(function(t) {
                return (t = ca.time.day(t)).setDate(t.getDate() - (t.getDay() + e) % 7), t
            }, function(t, e) {
                t.setDate(t.getDate() + 7 * Math.floor(e))
            }, function(t) {
                var n = ca.time.year(t).getDay();
                return Math.floor((ca.time.dayOfYear(t) + (n + e) % 7) / 7) - (n !== e)
            });
            ca.time[t + "s"] = n.range, ca.time[t + "s"].utc = n.utc.range, ca.time[t + "OfYear"] = function(t) {
                var n = ca.time.year(t).getDay();
                return Math.floor((ca.time.dayOfYear(t) + (n + e) % 7) / 7)
            }
        }), ca.time.week = ca.time.sunday, ca.time.weeks = ca.time.sunday.range, ca.time.weeks.utc = ca.time.sunday.utc.range, ca.time.weekOfYear = ca.time.sundayOfYear, ca.time.format = function(t) {
            function e(e) {
                for (var r, i, o, a = [], u = -1, s = 0; n > ++u;) 37 === t.charCodeAt(u) && (a.push(t.substring(s, u)), null != (i = Cs[r = t.charAt(++u)]) && (r = t.charAt(++u)), (o = As[r]) && (r = o(e, null == i ? "e" === r ? " " : "0" : i)), a.push(r), s = u + 1);
                return a.push(t.substring(s, u)), a.join("")
            }
            var n = t.length;
            return e.parse = function(e) {
                var n = {
                        y: 1900,
                        m: 0,
                        d: 1,
                        H: 0,
                        M: 0,
                        S: 0,
                        L: 0
                    },
                    r = Co(n, t, e, 0);
                if (r != e.length) return null;
                "p" in n && (n.H = n.H % 12 + 12 * n.p);
                var i = new ds;
                return i.setFullYear(n.y, n.m, n.d), i.setHours(n.H, n.M, n.S, n.L), i
            }, e.toString = function() {
                return t
            }, e
        };
        var ws = Ao(xs),
            ks = Ao(bs),
            Ts = Ao(Ms),
            Ss = Do(Ms),
            Es = Ao(_s),
            Ns = Do(_s),
            Cs = {
                "-": "",
                _: " ",
                0: "0"
            },
            As = {
                a: function(t) {
                    return bs[t.getDay()]
                },
                A: function(t) {
                    return xs[t.getDay()]
                },
                b: function(t) {
                    return _s[t.getMonth()]
                },
                B: function(t) {
                    return Ms[t.getMonth()]
                },
                c: ca.time.format(ms),
                d: function(t, e) {
                    return Lo(t.getDate(), e, 2)
                },
                e: function(t, e) {
                    return Lo(t.getDate(), e, 2)
                },
                H: function(t, e) {
                    return Lo(t.getHours(), e, 2)
                },
                I: function(t, e) {
                    return Lo(t.getHours() % 12 || 12, e, 2)
                },
                j: function(t, e) {
                    return Lo(1 + ca.time.dayOfYear(t), e, 3)
                },
                L: function(t, e) {
                    return Lo(t.getMilliseconds(), e, 3)
                },
                m: function(t, e) {
                    return Lo(t.getMonth() + 1, e, 2)
                },
                M: function(t, e) {
                    return Lo(t.getMinutes(), e, 2)
                },
                p: function(t) {
                    return t.getHours() >= 12 ? "PM" : "AM"
                },
                S: function(t, e) {
                    return Lo(t.getSeconds(), e, 2)
                },
                U: function(t, e) {
                    return Lo(ca.time.sundayOfYear(t), e, 2)
                },
                w: function(t) {
                    return t.getDay()
                },
                W: function(t, e) {
                    return Lo(ca.time.mondayOfYear(t), e, 2)
                },
                x: ca.time.format(vs),
                X: ca.time.format(ys),
                y: function(t, e) {
                    return Lo(t.getFullYear() % 100, e, 2)
                },
                Y: function(t, e) {
                    return Lo(t.getFullYear() % 1e4, e, 4)
                },
                Z: Go,
                "%": function() {
                    return "%"
                }
            },
            Ds = {
                a: Ho,
                A: jo,
                b: Fo,
                B: qo,
                c: Oo,
                d: Io,
                e: Io,
                H: Wo,
                I: Wo,
                L: Vo,
                m: Bo,
                M: Uo,
                p: Zo,
                S: Xo,
                x: Po,
                X: Yo,
                y: Ro,
                Y: zo
            },
            Ls = /^\s*\d+/,
            Hs = ca.map({
                am: 0,
                pm: 1
            });
        ca.time.format.utc = function(t) {
            function e(t) {
                try {
                    ds = So;
                    var e = new ds;
                    return e._ = t, n(e)
                } finally {
                    ds = Date
                }
            }
            var n = ca.time.format(t);
            return e.parse = function(t) {
                try {
                    ds = So;
                    var e = n.parse(t);
                    return e && e._
                } finally {
                    ds = Date
                }
            }, e.toString = n.toString, e
        };
        var js = ca.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
        ca.time.format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? Jo : js, Jo.parse = function(t) {
            var e = new Date(t);
            return isNaN(e) ? null : e
        }, Jo.toString = js.toString, ca.time.second = Eo(function(t) {
            return new ds(1e3 * Math.floor(t / 1e3))
        }, function(t, e) {
            t.setTime(t.getTime() + 1e3 * Math.floor(e))
        }, function(t) {
            return t.getSeconds()
        }), ca.time.seconds = ca.time.second.range, ca.time.seconds.utc = ca.time.second.utc.range, ca.time.minute = Eo(function(t) {
            return new ds(6e4 * Math.floor(t / 6e4))
        }, function(t, e) {
            t.setTime(t.getTime() + 6e4 * Math.floor(e))
        }, function(t) {
            return t.getMinutes()
        }), ca.time.minutes = ca.time.minute.range, ca.time.minutes.utc = ca.time.minute.utc.range, ca.time.hour = Eo(function(t) {
            var e = t.getTimezoneOffset() / 60;
            return new ds(36e5 * (Math.floor(t / 36e5 - e) + e))
        }, function(t, e) {
            t.setTime(t.getTime() + 36e5 * Math.floor(e))
        }, function(t) {
            return t.getHours()
        }), ca.time.hours = ca.time.hour.range, ca.time.hours.utc = ca.time.hour.utc.range, ca.time.month = Eo(function(t) {
            return t = ca.time.day(t), t.setDate(1), t
        }, function(t, e) {
            t.setMonth(t.getMonth() + e)
        }, function(t) {
            return t.getMonth()
        }), ca.time.months = ca.time.month.range, ca.time.months.utc = ca.time.month.utc.range;
        var Fs = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
            qs = [
                [ca.time.second, 1],
                [ca.time.second, 5],
                [ca.time.second, 15],
                [ca.time.second, 30],
                [ca.time.minute, 1],
                [ca.time.minute, 5],
                [ca.time.minute, 15],
                [ca.time.minute, 30],
                [ca.time.hour, 1],
                [ca.time.hour, 3],
                [ca.time.hour, 6],
                [ca.time.hour, 12],
                [ca.time.day, 1],
                [ca.time.day, 2],
                [ca.time.week, 1],
                [ca.time.month, 1],
                [ca.time.month, 3],
                [ca.time.year, 1]
            ],
            Os = [
                [ca.time.format("%Y"), je],
                [ca.time.format("%B"), function(t) {
                    return t.getMonth()
                }],
                [ca.time.format("%b %d"), function(t) {
                    return 1 != t.getDate()
                }],
                [ca.time.format("%a %d"), function(t) {
                    return t.getDay() && 1 != t.getDate()
                }],
                [ca.time.format("%I %p"), function(t) {
                    return t.getHours()
                }],
                [ca.time.format("%I:%M"), function(t) {
                    return t.getMinutes()
                }],
                [ca.time.format(":%S"), function(t) {
                    return t.getSeconds()
                }],
                [ca.time.format(".%L"), function(t) {
                    return t.getMilliseconds()
                }]
            ],
            Ps = ca.scale.linear(),
            Ys = ta(Os);
        qs.year = function(t, e) {
            return Ps.domain(t.map(na)).ticks(e).map(ea)
        }, ca.time.scale = function() {
            return Ko(ca.scale.linear(), qs, Ys)
        };
        var zs = qs.map(function(t) {
                return [t[0].utc, t[1]]
            }),
            Rs = [
                [ca.time.format.utc("%Y"), je],
                [ca.time.format.utc("%B"), function(t) {
                    return t.getUTCMonth()
                }],
                [ca.time.format.utc("%b %d"), function(t) {
                    return 1 != t.getUTCDate()
                }],
                [ca.time.format.utc("%a %d"), function(t) {
                    return t.getUTCDay() && 1 != t.getUTCDate()
                }],
                [ca.time.format.utc("%I %p"), function(t) {
                    return t.getUTCHours()
                }],
                [ca.time.format.utc("%I:%M"), function(t) {
                    return t.getUTCMinutes()
                }],
                [ca.time.format.utc(":%S"), function(t) {
                    return t.getUTCSeconds()
                }],
                [ca.time.format.utc(".%L"), function(t) {
                    return t.getUTCMilliseconds()
                }]
            ],
            $s = ta(Rs);
        return zs.year = function(t, e) {
            return Ps.domain(t.map(ia)).ticks(e).map(ra)
        }, ca.time.scale.utc = function() {
            return Ko(ca.scale.linear(), zs, $s)
        }, ca.text = function() {
            return ca.xhr.apply(ca, arguments).response(oa)
        }, ca.json = function(t, e) {
            return ca.xhr(t, "application/json", e).response(aa)
        }, ca.html = function(t, e) {
            return ca.xhr(t, "text/html", e).response(ua)
        }, ca.xml = function() {
            return ca.xhr.apply(ca, arguments).response(sa)
        }, ca
    }(),
    function(t) {
        function e(t, e) {
            return function(n) {
                return s(t.call(this, n), e)
            }
        }

        function n(t) {
            return function(e) {
                return this.lang().ordinal(t.call(this, e))
            }
        }

        function r() {}

        function i(t) {
            a(this, t)
        }

        function o(t) {
            var e = this._data = {},
                n = t.years || t.year || t.y || 0,
                r = t.months || t.month || t.M || 0,
                i = t.weeks || t.week || t.w || 0,
                o = t.days || t.day || t.d || 0,
                a = t.hours || t.hour || t.h || 0,
                s = t.minutes || t.minute || t.m || 0,
                c = t.seconds || t.second || t.s || 0,
                l = t.milliseconds || t.millisecond || t.ms || 0;
            this._milliseconds = l + 1e3 * c + 6e4 * s + 36e5 * a, this._days = o + 7 * i, this._months = r + 12 * n, e.milliseconds = l % 1e3, c += u(l / 1e3), e.seconds = c % 60, s += u(c / 60), e.minutes = s % 60, a += u(s / 60), e.hours = a % 24, o += u(a / 24), o += 7 * i, e.days = o % 30, r += u(o / 30), e.months = r % 12, n += u(r / 12), e.years = n
        }

        function a(t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            return t
        }

        function u(t) {
            return 0 > t ? Math.ceil(t) : Math.floor(t)
        }

        function s(t, e) {
            for (var n = t + ""; e > n.length;) n = "0" + n;
            return n
        }

        function c(t, e, n) {
            var r, i = e._milliseconds,
                o = e._days,
                a = e._months;
            i && t._d.setTime(+t + i * n), o && t.date(t.date() + o * n), a && (r = t.date(), t.date(1).month(t.month() + a * n).date(Math.min(r, t.daysInMonth())))
        }

        function l(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }

        function f(t, e) {
            var n, r = Math.min(t.length, e.length),
                i = Math.abs(t.length - e.length),
                o = 0;
            for (n = 0; r > n; n++) ~~t[n] !== ~~e[n] && o++;
            return o + i
        }

        function h(t, e) {
            return e.abbr = t, F[t] || (F[t] = new r), F[t].set(e), F[t]
        }

        function d(t) {
            return t ? (!F[t] && q && require("./lang/" + t), F[t]) : D.fn._lang
        }

        function p(t) {
            return t.match(/\[.*\]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
        }

        function g(t) {
            var e, n, r = t.match(P);
            for (e = 0, n = r.length; n > e; e++) r[e] = ie[r[e]] ? ie[r[e]] : p(r[e]);
            return function(i) {
                var o = "";
                for (e = 0; n > e; e++) o += "function" == typeof r[e].call ? r[e].call(i, t) : r[e];
                return o
            }
        }

        function m(t, e) {
            function n(e) {
                return t.lang().longDateFormat(e) || e
            }
            for (var r = 5; r-- && Y.test(e);) e = e.replace(Y, n);
            return ee[e] || (ee[e] = g(e)), ee[e](t)
        }

        function v(t) {
            switch (t) {
                case "DDDD":
                    return $;
                case "YYYY":
                    return B;
                case "YYYYY":
                    return I;
                case "S":
                case "SS":
                case "SSS":
                case "DDD":
                    return R;
                case "MMM":
                case "MMMM":
                case "dd":
                case "ddd":
                case "dddd":
                case "a":
                case "A":
                    return W;
                case "X":
                    return V;
                case "Z":
                case "ZZ":
                    return U;
                case "T":
                    return X;
                case "MM":
                case "DD":
                case "YY":
                case "HH":
                case "hh":
                case "mm":
                case "ss":
                case "M":
                case "D":
                case "d":
                case "H":
                case "h":
                case "m":
                case "s":
                    return z;
                default:
                    return RegExp(t.replace("\\", ""))
            }
        }

        function y(t, e, n) {
            var r, i = n._a;
            switch (t) {
                case "M":
                case "MM":
                    i[1] = null == e ? 0 : ~~e - 1;
                    break;
                case "MMM":
                case "MMMM":
                    r = d(n._l).monthsParse(e), null != r ? i[1] = r : n._isValid = !1;
                    break;
                case "D":
                case "DD":
                case "DDD":
                case "DDDD":
                    null != e && (i[2] = ~~e);
                    break;
                case "YY":
                    i[0] = ~~e + (~~e > 68 ? 1900 : 2e3);
                    break;
                case "YYYY":
                case "YYYYY":
                    i[0] = ~~e;
                    break;
                case "a":
                case "A":
                    n._isPm = "pm" === (e + "").toLowerCase();
                    break;
                case "H":
                case "HH":
                case "h":
                case "hh":
                    i[3] = ~~e;
                    break;
                case "m":
                case "mm":
                    i[4] = ~~e;
                    break;
                case "s":
                case "ss":
                    i[5] = ~~e;
                    break;
                case "S":
                case "SS":
                case "SSS":
                    i[6] = ~~(1e3 * ("0." + e));
                    break;
                case "X":
                    n._d = new Date(1e3 * parseFloat(e));
                    break;
                case "Z":
                case "ZZ":
                    n._useUTC = !0, r = (e + "").match(K), r && r[1] && (n._tzh = ~~r[1]), r && r[2] && (n._tzm = ~~r[2]), r && "+" === r[0] && (n._tzh = -n._tzh, n._tzm = -n._tzm)
            }
            null == e && (n._isValid = !1)
        }

        function x(t) {
            var e, n, r = [];
            if (!t._d) {
                for (e = 0; 7 > e; e++) t._a[e] = r[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                r[3] += t._tzh || 0, r[4] += t._tzm || 0, n = new Date(0), t._useUTC ? (n.setUTCFullYear(r[0], r[1], r[2]), n.setUTCHours(r[3], r[4], r[5], r[6])) : (n.setFullYear(r[0], r[1], r[2]), n.setHours(r[3], r[4], r[5], r[6])), t._d = n
            }
        }

        function b(t) {
            var e, n, r = t._f.match(P),
                i = t._i;
            for (t._a = [], e = 0; r.length > e; e++) n = (v(r[e]).exec(i) || [])[0], n && (i = i.slice(i.indexOf(n) + n.length)), ie[r[e]] && y(r[e], n, t);
            t._isPm && 12 > t._a[3] && (t._a[3] += 12), t._isPm === !1 && 12 === t._a[3] && (t._a[3] = 0), x(t)
        }

        function M(t) {
            for (var e, n, r, o, u = 99; t._f.length;) {
                if (e = a({}, t), e._f = t._f.pop(), b(e), n = new i(e), n.isValid()) {
                    r = n;
                    break
                }
                o = f(e._a, n.toArray()), u > o && (u = o, r = n)
            }
            a(t, r)
        }

        function _(t) {
            var e, n = t._i;
            if (Z.exec(n)) {
                for (t._f = "YYYY-MM-DDT", e = 0; 4 > e; e++)
                    if (J[e][1].exec(n)) {
                        t._f += J[e][0];
                        break
                    }
                U.exec(n) && (t._f += " Z"), b(t)
            } else t._d = new Date(n)
        }

        function w(e) {
            var n = e._i,
                r = O.exec(n);
            n === t ? e._d = new Date : r ? e._d = new Date(+r[1]) : "string" == typeof n ? _(e) : l(n) ? (e._a = n.slice(0), x(e)) : e._d = n instanceof Date ? new Date(+n) : new Date(n)
        }

        function k(t, e, n, r, i) {
            return i.relativeTime(e || 1, !!n, t, r)
        }

        function T(t, e, n) {
            var r = j(Math.abs(t) / 1e3),
                i = j(r / 60),
                o = j(i / 60),
                a = j(o / 24),
                u = j(a / 365),
                s = 45 > r && ["s", r] || 1 === i && ["m"] || 45 > i && ["mm", i] || 1 === o && ["h"] || 22 > o && ["hh", o] || 1 === a && ["d"] || 25 >= a && ["dd", a] || 45 >= a && ["M"] || 345 > a && ["MM", j(a / 30)] || 1 === u && ["y"] || ["yy", u];
            return s[2] = e, s[3] = t > 0, s[4] = n, k.apply({}, s)
        }

        function S(t, e, n) {
            var r = n - e,
                i = n - t.day();
            return i > r && (i -= 7), r - 7 > i && (i += 7), Math.ceil(D(t).add("d", i).dayOfYear() / 7)
        }

        function E(t) {
            var e = t._i,
                n = t._f;
            return null === e || "" === e ? null : ("string" == typeof e && (t._i = e = d().preparse(e)), D.isMoment(e) ? (t = a({}, e), t._d = new Date(+e._d)) : n ? l(n) ? M(t) : b(t) : w(t), new i(t))
        }

        function N(t, e) {
            D.fn[t] = D.fn[t + "s"] = function(t) {
                var n = this._isUTC ? "UTC" : "";
                return null != t ? (this._d["set" + n + e](t), this) : this._d["get" + n + e]()
            }
        }

        function C(t) {
            D.duration.fn[t] = function() {
                return this._data[t]
            }
        }

        function A(t, e) {
            D.duration.fn["as" + t] = function() {
                return +this / e
            }
        }
        for (var D, L, H = "2.0.0", j = Math.round, F = {}, q = "undefined" != typeof module && module.exports, O = /^\/?Date\((\-?\d+)/i, P = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, Y = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, z = /\d\d?/, R = /\d{1,3}/, $ = /\d{3}/, B = /\d{1,4}/, I = /[+\-]?\d{1,6}/, W = /[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i, U = /Z|[\+\-]\d\d:?\d\d/i, X = /T/i, V = /[\+\-]?\d+(\.\d{1,3})?/, Z = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, G = "YYYY-MM-DDTHH:mm:ssZ", J = [
                ["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
                ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
                ["HH:mm", /(T| )\d\d:\d\d/],
                ["HH", /(T| )\d\d/]
            ], K = /([\+\-]|\d\d)/gi, Q = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"), te = {
                Milliseconds: 1,
                Seconds: 1e3,
                Minutes: 6e4,
                Hours: 36e5,
                Days: 864e5,
                Months: 2592e6,
                Years: 31536e6
            }, ee = {}, ne = "DDD w W M D d".split(" "), re = "M D H h m s w W".split(" "), ie = {
                M: function() {
                    return this.month() + 1
                },
                MMM: function(t) {
                    return this.lang().monthsShort(this, t)
                },
                MMMM: function(t) {
                    return this.lang().months(this, t)
                },
                D: function() {
                    return this.date()
                },
                DDD: function() {
                    return this.dayOfYear()
                },
                d: function() {
                    return this.day()
                },
                dd: function(t) {
                    return this.lang().weekdaysMin(this, t)
                },
                ddd: function(t) {
                    return this.lang().weekdaysShort(this, t)
                },
                dddd: function(t) {
                    return this.lang().weekdays(this, t)
                },
                w: function() {
                    return this.week()
                },
                W: function() {
                    return this.isoWeek()
                },
                YY: function() {
                    return s(this.year() % 100, 2)
                },
                YYYY: function() {
                    return s(this.year(), 4)
                },
                YYYYY: function() {
                    return s(this.year(), 5)
                },
                a: function() {
                    return this.lang().meridiem(this.hours(), this.minutes(), !0)
                },
                A: function() {
                    return this.lang().meridiem(this.hours(), this.minutes(), !1)
                },
                H: function() {
                    return this.hours()
                },
                h: function() {
                    return this.hours() % 12 || 12
                },
                m: function() {
                    return this.minutes()
                },
                s: function() {
                    return this.seconds()
                },
                S: function() {
                    return ~~(this.milliseconds() / 100)
                },
                SS: function() {
                    return s(~~(this.milliseconds() / 10), 2)
                },
                SSS: function() {
                    return s(this.milliseconds(), 3)
                },
                Z: function() {
                    var t = -this.zone(),
                        e = "+";
                    return 0 > t && (t = -t, e = "-"), e + s(~~(t / 60), 2) + ":" + s(~~t % 60, 2)
                },
                ZZ: function() {
                    var t = -this.zone(),
                        e = "+";
                    return 0 > t && (t = -t, e = "-"), e + s(~~(10 * t / 6), 4)
                },
                X: function() {
                    return this.unix()
                }
            }; ne.length;) L = ne.pop(), ie[L + "o"] = n(ie[L]);
        for (; re.length;) L = re.pop(), ie[L + L] = e(ie[L], 2);
        for (ie.DDDD = e(ie.DDD, 3), r.prototype = {
                set: function(t) {
                    var e, n;
                    for (n in t) e = t[n], "function" == typeof e ? this[n] = e : this["_" + n] = e
                },
                _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                months: function(t) {
                    return this._months[t.month()]
                },
                _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
                monthsShort: function(t) {
                    return this._monthsShort[t.month()]
                },
                monthsParse: function(t) {
                    var e, n, r;
                    for (this._monthsParse || (this._monthsParse = []), e = 0; 12 > e; e++)
                        if (this._monthsParse[e] || (n = D([2e3, e]), r = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[e] = RegExp(r.replace(".", ""), "i")), this._monthsParse[e].test(t)) return e
                },
                _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                weekdays: function(t) {
                    return this._weekdays[t.day()]
                },
                _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
                weekdaysShort: function(t) {
                    return this._weekdaysShort[t.day()]
                },
                _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
                weekdaysMin: function(t) {
                    return this._weekdaysMin[t.day()]
                },
                _longDateFormat: {
                    LT: "h:mm A",
                    L: "MM/DD/YYYY",
                    LL: "MMMM D YYYY",
                    LLL: "MMMM D YYYY LT",
                    LLLL: "dddd, MMMM D YYYY LT"
                },
                longDateFormat: function(t) {
                    var e = this._longDateFormat[t];
                    return !e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(t) {
                        return t.slice(1)
                    }), this._longDateFormat[t] = e), e
                },
                meridiem: function(t, e, n) {
                    return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
                },
                _calendar: {
                    sameDay: "[Today at] LT",
                    nextDay: "[Tomorrow at] LT",
                    nextWeek: "dddd [at] LT",
                    lastDay: "[Yesterday at] LT",
                    lastWeek: "[last] dddd [at] LT",
                    sameElse: "L"
                },
                calendar: function(t, e) {
                    var n = this._calendar[t];
                    return "function" == typeof n ? n.apply(e) : n
                },
                _relativeTime: {
                    future: "in %s",
                    past: "%s ago",
                    s: "a few seconds",
                    m: "a minute",
                    mm: "%d minutes",
                    h: "an hour",
                    hh: "%d hours",
                    d: "a day",
                    dd: "%d days",
                    M: "a month",
                    MM: "%d months",
                    y: "a year",
                    yy: "%d years"
                },
                relativeTime: function(t, e, n, r) {
                    var i = this._relativeTime[n];
                    return "function" == typeof i ? i(t, e, n, r) : i.replace(/%d/i, t)
                },
                pastFuture: function(t, e) {
                    var n = this._relativeTime[t > 0 ? "future" : "past"];
                    return "function" == typeof n ? n(e) : n.replace(/%s/i, e)
                },
                ordinal: function(t) {
                    return this._ordinal.replace("%d", t)
                },
                _ordinal: "%d",
                preparse: function(t) {
                    return t
                },
                postformat: function(t) {
                    return t
                },
                week: function(t) {
                    return S(t, this._week.dow, this._week.doy)
                },
                _week: {
                    dow: 0,
                    doy: 6
                }
            }, D = function(t, e, n) {
                return E({
                    _i: t,
                    _f: e,
                    _l: n,
                    _isUTC: !1
                })
            }, D.utc = function(t, e, n) {
                return E({
                    _useUTC: !0,
                    _isUTC: !0,
                    _l: n,
                    _i: t,
                    _f: e
                })
            }, D.unix = function(t) {
                return D(1e3 * t)
            }, D.duration = function(t, e) {
                var n, r = D.isDuration(t),
                    i = "number" == typeof t,
                    a = r ? t._data : i ? {} : t;
                return i && (e ? a[e] = t : a.milliseconds = t), n = new o(a), r && t.hasOwnProperty("_lang") && (n._lang = t._lang), n
            }, D.version = H, D.defaultFormat = G, D.lang = function(t, e) {
                return t ? (e ? h(t, e) : F[t] || d(t), D.duration.fn._lang = D.fn._lang = d(t), void 0) : D.fn._lang._abbr
            }, D.langData = function(t) {
                return t && t._lang && t._lang._abbr && (t = t._lang._abbr), d(t)
            }, D.isMoment = function(t) {
                return t instanceof i
            }, D.isDuration = function(t) {
                return t instanceof o
            }, D.fn = i.prototype = {
                clone: function() {
                    return D(this)
                },
                valueOf: function() {
                    return +this._d
                },
                unix: function() {
                    return Math.floor(+this._d / 1e3)
                },
                toString: function() {
                    return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                },
                toDate: function() {
                    return this._d
                },
                toJSON: function() {
                    return D.utc(this).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
                },
                toArray: function() {
                    var t = this;
                    return [t.year(), t.month(), t.date(), t.hours(), t.minutes(), t.seconds(), t.milliseconds()]
                },
                isValid: function() {
                    return null == this._isValid && (this._isValid = this._a ? !f(this._a, (this._isUTC ? D.utc(this._a) : D(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
                },
                utc: function() {
                    return this._isUTC = !0, this
                },
                local: function() {
                    return this._isUTC = !1, this
                },
                format: function(t) {
                    var e = m(this, t || D.defaultFormat);
                    return this.lang().postformat(e)
                },
                add: function(t, e) {
                    var n;
                    return n = "string" == typeof t ? D.duration(+e, t) : D.duration(t, e), c(this, n, 1), this
                },
                subtract: function(t, e) {
                    var n;
                    return n = "string" == typeof t ? D.duration(+e, t) : D.duration(t, e), c(this, n, -1), this
                },
                diff: function(t, e, n) {
                    var r, i, o = this._isUTC ? D(t).utc() : D(t).local(),
                        a = 6e4 * (this.zone() - o.zone());
                    return e && (e = e.replace(/s$/, "")), "year" === e || "month" === e ? (r = 432e5 * (this.daysInMonth() + o.daysInMonth()), i = 12 * (this.year() - o.year()) + (this.month() - o.month()), i += (this - D(this).startOf("month") - (o - D(o).startOf("month"))) / r, "year" === e && (i /= 12)) : (r = this - o - a, i = "second" === e ? r / 1e3 : "minute" === e ? r / 6e4 : "hour" === e ? r / 36e5 : "day" === e ? r / 864e5 : "week" === e ? r / 6048e5 : r), n ? i : u(i)
                },
                from: function(t, e) {
                    return D.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!e)
                },
                fromNow: function(t) {
                    return this.from(D(), t)
                },
                calendar: function() {
                    var t = this.diff(D().startOf("day"), "days", !0),
                        e = -6 > t ? "sameElse" : -1 > t ? "lastWeek" : 0 > t ? "lastDay" : 1 > t ? "sameDay" : 2 > t ? "nextDay" : 7 > t ? "nextWeek" : "sameElse";
                    return this.format(this.lang().calendar(e, this))
                },
                isLeapYear: function() {
                    var t = this.year();
                    return 0 === t % 4 && 0 !== t % 100 || 0 === t % 400
                },
                isDST: function() {
                    return this.zone() < D([this.year()]).zone() || this.zone() < D([this.year(), 5]).zone()
                },
                day: function(t) {
                    var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                    return null == t ? e : this.add({
                        d: t - e
                    })
                },
                startOf: function(t) {
                    switch (t = t.replace(/s$/, "")) {
                        case "year":
                            this.month(0);
                        case "month":
                            this.date(1);
                        case "week":
                        case "day":
                            this.hours(0);
                        case "hour":
                            this.minutes(0);
                        case "minute":
                            this.seconds(0);
                        case "second":
                            this.milliseconds(0)
                    }
                    return "week" === t && this.day(0), this
                },
                endOf: function(t) {
                    return this.startOf(t).add(t.replace(/s?$/, "s"), 1).subtract("ms", 1)
                },
                isAfter: function(t, e) {
                    return e = e !== void 0 ? e : "millisecond", +this.clone().startOf(e) > +D(t).startOf(e)
                },
                isBefore: function(t, e) {
                    return e = e !== void 0 ? e : "millisecond", +this.clone().startOf(e) < +D(t).startOf(e)
                },
                isSame: function(t, e) {
                    return e = e !== void 0 ? e : "millisecond", +this.clone().startOf(e) === +D(t).startOf(e)
                },
                zone: function() {
                    return this._isUTC ? 0 : this._d.getTimezoneOffset()
                },
                daysInMonth: function() {
                    return D.utc([this.year(), this.month() + 1, 0]).date()
                },
                dayOfYear: function(t) {
                    var e = j((D(this).startOf("day") - D(this).startOf("year")) / 864e5) + 1;
                    return null == t ? e : this.add("d", t - e)
                },
                isoWeek: function(t) {
                    var e = S(this, 1, 4);
                    return null == t ? e : this.add("d", 7 * (t - e))
                },
                week: function(t) {
                    var e = this.lang().week(this);
                    return null == t ? e : this.add("d", 7 * (t - e))
                },
                lang: function(e) {
                    return e === t ? this._lang : (this._lang = d(e), this)
                }
            }, L = 0; Q.length > L; L++) N(Q[L].toLowerCase().replace(/s$/, ""), Q[L]);
        N("year", "FullYear"), D.fn.days = D.fn.day, D.fn.weeks = D.fn.week, D.fn.isoWeeks = D.fn.isoWeek, D.duration.fn = o.prototype = {
            weeks: function() {
                return u(this.days() / 7)
            },
            valueOf: function() {
                return this._milliseconds + 864e5 * this._days + 2592e6 * this._months
            },
            humanize: function(t) {
                var e = +this,
                    n = T(e, !t, this.lang());
                return t && (n = this.lang().pastFuture(e, n)), this.lang().postformat(n)
            },
            lang: D.fn.lang
        };
        for (L in te) te.hasOwnProperty(L) && (A(L, te[L]), C(L.toLowerCase()));
        A("Weeks", 6048e5), D.lang("en", {
            ordinal: function(t) {
                var e = t % 10,
                    n = 1 === ~~(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
                return t + n
            }
        }), q && (module.exports = D), "undefined" == typeof ender && (this.moment = D), "function" == typeof define && define.amd && define("moment", [], function() {
            return D
        })
    }.call(this), $(document).ready(function() {
        if ("undefined" != typeof addthis && (addthis.init(), window.onload = function() {
                $(".addthis_toolbox").show()
            }), !document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")) {
            var t = "Oh no - this application won't work in your web browser. Sorry, please try again in";
            return t += " a modern browser like ", t += " <a href='http://windows.microsoft.com/en-GB/internet-explorer/download-ie'>Internet Explorer 9/10</a>, ", t += " <a href='http://www.google.com/chrome'>Chrome</a>,", t += " <a href='http://www.mozilla.org/en-US/firefox/new/'>Firefox</a>,", t += " or <a href='https://www.apple.com/safari/'>Safari</a>.", $("#vis").html(t), $(".about").hide(), !1
        }
        $(".control").show();
        var e = 1993,
            n = 2012,
            r = n,
            i = "E0";
        $("#year").data("year", n), showYear(n);
        var o = {
                top: 30,
                right: 110,
                bottom: 20,
                left: 30
            },
            a = parseInt(d3.select(".container").style("width").replace("px", "")),
            u = 600,
            s = d3.select("#vis").append("svg").attr("width", a + o.left + o.right).attr("height", u + o.top + o.bottom),
            c = d3.select("#vis").append("div").attr("class", "tooltip fade top in").html('<div class="tooltip-arrow"></div><div class="tooltip-inner">HELLO WORLD</div></div>').style("opacity", 0);
        d3.json("E0.json", function(t, l) {
            function f(t) {
                $(".option").off(), $(".ranking").off(), $(".previous, .next").off();
                var e = $("#year").data("year"),
                    n = $("#league").val();
                n = "E0", getYearForFile(e) + "-" + n + ".json";
                var f = l[getYearForFile(e)],
                    d = f.results,
                    p = f.games,
                    g = "points" === $(".ranking.active").data("ranking"),
                    m = d.length,
                    v = "E0" === n ? 38 : 46,
                    y = d3.max([v, d3.max(d, function(t) {
                        return t.points.length
                    })]),
                    b = d3.max(d, function(t) {
                        return d3.max(t.points)
                    });
                x = d3.scale.linear().domain([0, y]).range([o.left, a - o.right]), y_points = d3.scale.linear().domain([0, b]).range([u - 20, o.top]), y_position = d3.scale.linear().domain([m, 0]).range([u - 20, o.top]);
                var M = d3.svg.axis().scale(x).orient("bottom").tickValues(d3.range(1, y + 1)),
                    _ = d3.svg.axis().orient("left");
                g ? (_.scale(y_points), _.ticks(20)) : (_.scale(y_position), _.tickValues(d3.range(0, m)), _.tickFormat(function(t) {
                    return t + 1
                })), _.tickSize(6, 3, 0);
                var w = s.selectAll("g.x.axis").data([1]),
                    k = s.selectAll("g.y.axis").data([1]);
                w.enter().append("g").attr("class", "x axis").attr("transform", "translate(0," + (u - 20) + ")").append("text").attr("x", a / 2).attr("dy", "3em").text("Games played"), k.enter().append("g").attr("class", "y axis").attr("transform", "translate(" + o.left + ",0)").append("text").attr("class", "yAxisLabel").attr("y", 0).attr("dy", "1em").style("text-anchor", "middle"), s.select(".x.axis").call(M), s.select(".y.axis").transition().duration(1e3).call(_), s.select(".y.axis").select("text.yAxisLabel").text(function() {
                    return g ? "Points" : "Position"
                });
                var T = d3.svg.line().x(function(t, e) {
                        return x(e + 1)
                    }).y(function(t) {
                        return g ? y_points(t || 0) : y_position(t || 0)
                    }),
                    S = function(t) {
                        var e = d3.scale.quantile().domain([0, 1]).range(d3.range(1, y + 1));
                        return function(n) {
                            return T(t.slice(0, e(n)))
                        }
                    },
                    E = s.selectAll("g.team").data(d, function(t) {
                        return t.code
                    }),
                    N = E.enter().append("g").attr("class", function(t) {
                        return "team " + t.code
                    });
                N.append("path").attr("class", function(t) {
                    return "outer " + t.code
                }).attr("data-team", function(t) {
                    return t.code
                }), N.append("path").attr("class", function(t) {
                    return "inner " + t.code
                }).attr("data-team", function(t) {
                    return t.code
                }), N.append("rect").attr("class", function(t) {
                    return t.code + " legendbox"
                }).attr("x", a - o.right + o.left - 20).attr("y", function(t) {
                    return t.position[t.position.length - 1] !== void 0 ? y_position(t.position[t.position.length - 1]) - 10 : -1e4
                }).attr("rx", 4).attr("ry", 4).attr("width", o.right + 5).attr("height", 20), N.append("text").attr("class", function(t) {
                    return t.code + " legend"
                }).attr("x", a - o.left - o.right + 50).attr("y", function(t) {
                    return t.position[t.position.length - 1] !== void 0 ? y_position(t.position[t.position.length - 1]) + 3 : -1e4
                }).attr("opacity", 0).attr("dy", ".2em").text(function(t) {
                    return t.name
                });
                var C = E.selectAll("circle.match").data(function(t) {
                    for (var e = [], n = 0; t.points.length > n; n++) {
                        var r = {
                            points: t.points[n],
                            position: t.position[n],
                            id: t.games[n],
                            gameno: n,
                            thisteam: t.name,
                            code: t.code
                        };
                        e.push(r)
                    }
                    return e
                });
                E.selectAll("circle.match").transition().duration(300).attr("cx", function(t, e) {
                    return x(e + 1)
                }).attr("cy", function(t) {
                    return g ? y_points(t.points) : t.position !== void 0 ? y_position(t.position) : -1e3
                }).attr("opacity", .8), C.enter().append("circle").attr("class", function(t) {
                    return t.code + " match"
                }).attr("opacity", 0).attr("r", 2.5).attr("cx", function(t, e) {
                    return x(e + 1)
                }).attr("cy", function(t) {
                    return g ? y_points(t.points) : t.position !== void 0 ? y_position(t.position) : -1e3
                });
                var A = E.select("path.outer"),
                    D = E.select("path.inner"),
                    L = E.select("text.legend"),
                    H = E.select("rect.legendbox");
                t ? (A.transition().duration(1e3).attrTween("d", function(t) {
                    return g ? S(t.points) : S(t.position)
                }).each("end", function() {
                    d3.select(this).on("mouseover", function(t) {
                        highlightPath(t.code)
                    }).on("mouseout", function(t) {
                        unHighlightPath(t.code)
                    })
                }), D.transition().duration(1e3).attrTween("d", function(t) {
                    return g ? S(t.points) : S(t.position)
                }).each("end", function() {
                    d3.select(this).on("mouseover", function(t) {
                        highlightPath(t.code)
                    }).on("mouseout", function(t) {
                        unHighlightPath(t.code)
                    })
                })) : (A.on("mouseover", null).on("mouseout", null).transition().duration(1e3).attr("d", function(t) {
                    return g ? T(t.points) : T(t.position)
                }).attr("class", function(t) {
                    return "outer " + t.code
                }).each("end", function() {
                    d3.select(this).on("mouseover", function(t) {
                        highlightPath(t.code)
                    }).on("mouseout", function(t) {
                        unHighlightPath(t.code)
                    })
                }), D.on("mouseover", null).on("mouseout", null).transition().duration(1e3).attr("d", function(t) {
                    return g ? T(t.points) : T(t.position)
                }).attr("class", function(t) {
                    return "inner " + t.code
                }).each("end", function() {
                    d3.select(this).on("mouseover", function(t) {
                        highlightPath(t.code)
                    }).on("mouseout", function(t) {
                        unHighlightPath(t.code)
                    })
                })), E.selectAll("circle.match").on("mouseover", null).on("mouseout", null).transition().duration(function(e, n) {
                    return t ? n * (2e3 / y) : 1e3
                }).attr("cx", function(t, e) {
                    return x(e + 1)
                }).attr("cy", function(t) {
                    return g ? y_points(t.points) : t.position !== void 0 ? y_position(t.position) : -1e3
                }).attr("opacity", .8).each("end", function() {
                    d3.select(this).on("mouseover", function(t) {
                        if (highlightPath(t.code), -1 == t.id) var e = "Start of season";
                        else {
                            var n = p[t.id],
                                e = "<strong>" + t.thisteam + ": Game " + (t.gameno + 1) + "</strong><br/>";
                            e += moment(n.date).format("dddd D MMMM YYYY") + "<br/>";
                            var r = t.thisteam === n.hometeam;
                            e += n.FTHG === n.FTAG ? "Drew with " : n.FTHG > n.FTAG ? r ? "Beat " : "Lost to " : r ? "Lost to " : "Beat ", e += r ? n.awayteam : n.hometeam, e += " " + n.FTHG + "-" + n.FTAG + "<br/>"
                        }
                        if (t.gameno + 1 === y) {
                            var i = parseInt(t.position) + 1;
                            e += "Ended season " + ordinal_suffix_of(i), e += "<br/>with " + t.points + " points"
                        } else e += t.points + " points", t.position !== void 0 && (e += ", position " + (t.position + 1));
                        d3.select(".tooltip-inner").html(e);
                        var o = d3.select(this).attr("cx") - $(".tooltip").outerWidth() / 2,
                            a = d3.select(this).attr("cy") - $(".tooltip").outerHeight();
                        c.transition().duration(100).style("opacity", .9), c.style("left", o + "px").style("top", a + "px")
                    }).on("mouseout", function(t) {
                        unHighlightPath(t.code), d3.select(".tooltip").transition().duration(100).style("opacity", 1e-6)
                    })
                }), C.exit().remove(), L.on("mouseover", null).on("mouseout", null).transition().duration(1e3).attr("y", function(t) {
                    return t.position[t.position.length - 1] !== void 0 ? y_position(t.position[t.position.length - 1]) + 3 : -1e4
                }).attr("opacity", .9).each("end", function() {
                    d3.select(this).on("mouseover", function(t) {
                        highlightPath(t.code)
                    }).on("mouseout", function(t) {
                        unHighlightPath(t.code)
                    })
                }), H.on("mouseover", null).on("mouseout", null).transition().duration(1e3).attr("y", function(t) {
                    return t.position[t.position.length - 1] !== void 0 ? y_position(t.position[t.position.length - 1]) - 10 : -1e4
                }).attr("opacity", .3).each("end", function() {
                    d3.select(this).on("mouseover", function(t) {
                        highlightPath(t.code)
                    }).on("mouseout", function(t) {
                        unHighlightPath(t.code)
                    })
                }), E.exit().transition().duration(1e3).attr("transform", function(t) {
                    var e = t.position[t.position.length - 1],
                        r = e > 10 || "E0" === n ? 1.5 * u : -1e3;
                    return "translate(0," + r + ")"
                }), E.exit().transition().delay(1e3).remove(), setTimeout(function() {
                    h()
                }, 1100), r = e, i = n
            }

            function h() {
                $(".option").off(), $(".ranking").off(), $(".previous, .next").off(), $(".option").on("change", function() {
                    f(!0)
                }), $(".ranking").click(function(t) {
                    t.preventDefault(), $(".ranking").removeClass("active"), $(this).addClass("active"), f(!1)
                }), $(".previous, .next").click(function(t) {
                    if (t.preventDefault(), $(this).hasClass("previous")) {
                        var r = $("#year").data("year") - 1;
                        e > r ? r = e : null
                    } else {
                        var r = $("#year").data("year") + 1;
                        r > n ? r = n : null
                    }
                    r === n ? $("#next").fadeTo(500, 0) : r === e ? $("#prev").fadeTo(500, 0) : ($("#next").fadeTo(500, 1), $("#prev").fadeTo(500, 1)), $("#year").data("year", r), showYear(), f(!1)
                })
            }
            f(!0)
        })
    });