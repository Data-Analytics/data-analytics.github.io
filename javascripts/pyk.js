/*! ====================================================== *
Copyright (c) 2015, Pykih Software LLP
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* ====================================================== */

var PykCharts = {};
PykCharts.assets = "../pykih-charts/assets/";
PykCharts.export_menu_status = 0;

PykCharts['boolean'] = function(d) {
    var false_values = ['0','f',"false",'n','no','',0,"0.00","0.0",0.0,0.00];
    var false_keywords = [undefined,null,NaN];
    if(false_keywords.indexOf(d) !== -1) {
        return false;
    }
    value = d.toLocaleString();
    value = value.toLowerCase();
    return (false_values.indexOf(value) > -1)? false : true;
};

PykCharts.getEvent = function () {
  try {
    return d3.event || event;
  } catch (e) {
    return event;
  }
}

PykCharts.Configuration = function (options){
    var that = this,
        options_selector = options.selector;

    var configuration = {
        liveData: function (chart) {
            var frequency = options.real_time_charts_refresh_frequency,
                interval;
            if(PykCharts['boolean'](frequency)) {
                clearInterval(options.interval);
                options.interval = setInterval(chart.refresh,frequency*1000);
            }
            return this;
        },
        emptyDiv: function (id) {
            d3.select(id).append("div")
                .style("clear","both");

            return this;
        },
        storeInitialDivHeight : function () {
            var height = parseFloat(d3.select(options.selector).style("height"));
            if(height) {
                options.original_div_height = parseFloat(d3.select(options.selector).style("height"));
            } else {
                options.original_div_height = "auto";
            }
            return this;
        },
        appendUnits: function (text) {
            text = PykCharts.numberFormat(text);
            var label,prefix,suffix;
                prefix = options.units_prefix,
                suffix = options.units_suffix;
                if(prefix) {
                    label = prefix + " " + text;
                    if(suffix) {
                        label += " " + suffix;
                    }
                } else if(suffix) {
                    label = text + " " + suffix;
                } else {
                    label = text;
                }
            return label;
        },
        title: function (width) {
            if(PykCharts['boolean'](options.title_text) && options.title_size) {
            var chart_width = options.chart_width;
            if(width) {
                chart_width = width;
            }
            var div_width = PykCharts['boolean'](options.export_enable) ? 0.9*chart_width : chart_width;
                that.titleDiv = d3.select(options.selector)
                    .append("div")
                        .attr("id","title")
                        .style({
                            "width": (div_width) + "px",
                            "text-align":"left",
                            "float":"left"
                        })
                        .html("<span style='pointer-events:none;font-size:" +
                        options.title_size+
                        "vw;color:" +
                        options.title_color+
                        ";font-weight:" +
                        options.title_weight+
                        ";padding-left:1px;font-family:" +
                        options.title_family
                        + "'>" +
                        options.title_text +
                        "</span>");
            }
            return this;
        },
        subtitle: function (width) {
            if(PykCharts['boolean'](options.subtitle_text) && options.subtitle_size) {
                var chart_width = options.chart_width;
                if(width) {
                    chart_width = width;
                }
                that.subtitleDiv = d3.select(options.selector)
                    .append("div")
                        .attr("id","sub-title")
                        .style({
                            "width": chart_width + "px",
                            "text-align": "left"
                        })
                        .html("<span style='pointer-events:none;font-size:" +
                        options.subtitle_size+"vw;color:" +
                        options.subtitle_color +
                        ";font-weight:" +
                        options.subtitle_weight+";padding-left:1px;font-family:" +
                        options.subtitle_family + "'>"+
                        options.subtitle_text + "</span>");
            }
            return this;
        },
        createFooter: function (width) {
            var chart_width = options.chart_width;
            if(width) {
                chart_width = width;
            }
            d3.select(options.selector).append("table")
                .attr({
                    "id" : "footer",
                    "width": chart_width + "px"
                })
                .style("background", options.bg);
            return this;
        },
        lastUpdatedAt: function (a) {
            if(PykCharts['boolean'](options.real_time_charts_refresh_frequency) && PykCharts['boolean'](options.real_time_charts_last_updated_at_enable)) {
                var currentdate = new Date();
                var date = currentdate.getDate() + "/"+(currentdate.getMonth()+1)
                        + "/" + currentdate.getFullYear() + " "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
                if(a === "liveData"){
                    document.querySelectorAll(options.selector+" #lastUpdatedAt").innerHTML = "<span style='pointer-events:none;'>Last Updated At: </span><span style='pointer-events:none;'>"+ date +"</span>";
                } else {
                    d3.select(options.selector+" #footer")
                        .append("tr")
                        .attr("class","PykCharts-credits")
                        .html("<td colspan=2 style='text-align:right' id='lastUpdatedAt'><span style='pointer-events:none;'>Last Updated At: </span><span style='pointer-events:none;'>"+ date +"</span></tr>")
                }
            }
            return this;
        },
        checkChangeInData: function (data, compare_data) { // this function checks if the data in json has been changed
            var key1 = Object.keys(compare_data[0]),
                key2 = Object.keys(data[0]),
                changed = false,
                data_length = data.length,
                key1_length = key1.length;

            if(key1.length === key2.length && compare_data.length === data.length) {
                for(var i=0;i<data_length;i++) {
                    for(var j=0;j<key1_length;j++){
                        if(typeof data[i][key2[j]] !== "object" && typeof compare_data[i][key1[j]] !== "object") {
                            if(data[i][key2[j]] !== compare_data[i][key1[j]] || key1[j] !== key2[j]) {
                                changed = true;
                                break;
                            }
                        } else {
                            if(!(options.k.__proto__._isEqual(data[i][key2[j]],compare_data[i][key1[j]])) || key1[j] !== key2[j]) {
                                changed = true;
                                break;
                            }
                        }
                    }
                }
            } else {
                changed = true;
            }
            that.compare_data = data;
            return [that.compare_data, changed];
        },
        credits: function () {
            if(PykCharts['boolean'](options.credit_my_site_name) || PykCharts['boolean'](options.credit_my_site_url)) {
                var enable = true;

                if(options.credit_my_site_name === "") {
                    options.credit_my_site_name = options.credit_my_site_url;
                }
                if(options.credit_my_site_url === "") {
                    enable = false;
                }

                d3.select(options.selector+" #footer").append("tr")
                    .attr({
                        "class" : "PykCharts-credits",
                        "id" : "credit-datasource"
                    })
                    .append("td")
                    .style("text-align","left")
                    .html("<span style='pointer-events:none;'>Credits: </span><a href='" +  options.credit_my_site_url + "' target='_blank' onclick='return " + enable +"'>"+  options.credit_my_site_name +"</a>");

            }
            return this;
        },
        dataSource: function () {
            if( (PykCharts['boolean'](options.data_source_name) || PykCharts['boolean'](options.data_source_url))) {
                var enable = true;
                if(options.data_source_name === "") {
                    options.data_source_name =options.data_source_url;
                }
                if(options.data_source_url === "") {
                    enable = false;
                }
                var data_source_content = "<span style='pointer-events:none;'>Source: </span><a href='" + options.data_source_url + "' target='_blank' onclick='return " + enable +"'>"+ options.data_source_name +"</a></tr>";

                if(d3.selectAll(options.selector+" #footer").length) {
                    d3.select(options.selector+" table #credit-datasource")
                        .style({
                            "background" : options.bg,
                            "text-align" : "right"
                        })
                        .append("td")
                        .html(data_source_content);
                }
                else {
                    d3.select(options.selector).append("table")
                        .attr({
                            "id" : "footer",
                            "class" : "PykCharts-credits",
                            "width" : options.chart_width + "px"
                        })
                        .style({
                            "background" : options.bg,
                            "text-align" : "right"
                        })
                        .append("tr")
                        .append("td")
                        .html(data_source_content);
                }
            }
            return this;
        },
        makeMainDiv: function (selection,i) {
            var d = d3.select(selection).append("div")
                .attr({
                    "id" : "chart-container-"+i,
                    "class" : "main-div"
                })
                .style("width",options.chart_width + "px");

            if(PykCharts['boolean'](options.panels_enable)){
                d.style({
                    "float": "left",
                    "width": "auto"
                });
            }
            return this;
        },
        tooltip: function (d,selection,i,flag) {
            if((PykCharts['boolean'](options.tooltip_enable) || options.axis_x_data_format === "string" || options.axis_y_data_format === "string" || PykCharts['boolean'](options.annotation_enable)) && options.mode === "default") {
                var id;
                if(selection !== undefined){
                    var selector = options.selector.substr(1,options.selector.length);
                        id = "tooltip-svg-container-" + i + "-pyk-tooltip"+selector;
                } else {
                    id = "pyk-tooltip";
                }
                PykCharts.Configuration.tooltipp = d3.select("body")
                        .append("div")
                        .attr({
                            "id" : id,
                            "class" : "pyk-tooltip"
                        });

            } else if (PykCharts['boolean'](options.tooltip_enable)) {
                    PykCharts.Configuration.tooltipp = d3.select("body")
                        .append("div")
                        .attr({
                            "id" : "pyk-tooltip",
                            "class" : "pyk-tooltip"
                        });
            }
            return this;
        },
        dateConversion: function (d) {
            d = new Date(d);
            var time_zone = d.getTimezoneOffset();
            d = new Date(d.getTime() + (time_zone * 60 * 1000));
            return d;
        },
        loading: function () {
            d3.select(options.selector).style("height",options.chart_height);
            var loading_content = options.loading_type === "image" ? "<img src=" + options.loading_source + ">" : options.loading_source;
            d3.select(options.selector).html("<div id='chart-loader'>" + loading_content + "</div>");
            var initial_height_div = parseFloat(d3.select(options.selector).style("height"));
            d3.select(options.selector + " #chart-loader").style({"visibility":"visible","padding-left":(options.chart_width/2) +"px","padding-top":(initial_height_div/2) + "px"});
            return this;
        },
        remove_loading_bar: function (id) {
            var loading = document.querySelector(options.selector+" #chart-loader"),height;
            if(loading) {
                loading.parentNode.removeChild(loading);
            }
            document.getElementById(id).style.height = options.original_div_height;
            return this;
        },
        dataFromPykQuery : function (data) {
            if (PykCharts.boolean(options.interactive_enable)) {
                options.data = data;
            }
        },
        totalColors: function (tc) {
            var n = parseInt(tc, 10)
            if (n > 2 && n < 10) {
                that.total_colors = n;
                return this;
            };
            that.total_colors = 9;
            return this;
        },
        colorType: function (ct) {
            if (ct === "color") {
                that.legends = "no";
            };
            return this;
        },
        resize: function (svg,width) {
            var chart_width = options.chart_width;
            if(PykCharts["boolean"](options.panels_enable) && width) {
                chart_width = width;
            }

            var aspect = (chart_width/options.chart_height),
                targetWidth = !isNaN(parseFloat(d3.select(options.selector).style("width"))) ? parseFloat(d3.select(options.selector).style("width")) : 0,
                a = d3.selectAll(options.selector + " #footer"),
                b = d3.selectAll(options.selector + " .main-div"),
                title_div_width;

            if(targetWidth > chart_width || targetWidth === 0) {
                targetWidth = chart_width;
            }
            if(PykCharts['boolean'](svg)) {
                svg.attr({
                    "width" : targetWidth,
                    "height" : (targetWidth / aspect)
                });
                d3.selectAll(options.selector + ' .main-div')
                    .style("width", targetWidth+"px");
            }
            if(PykCharts['boolean'](options.title_text)) {
                if(PykCharts['boolean'](options.export_enable)) {
                    title_div_width = 0.9*targetWidth;
                    d3.select(options.selector + " #title").style("width",title_div_width + "px");
                }
            }
            if(PykCharts['boolean'](options.subtitle_text)) {
                title_div_width = 0.9*targetWidth;
                d3.select(options.selector + " #sub-title").style("width", title_div_width + "px");
            }
            if(PykCharts['boolean'](options.export_enable)) {
                div_size = targetWidth
                div_float ="none"
                div_left = targetWidth-16;
                if(PykCharts['boolean'](options.title_text) && options.title_size && options.mode === "default") {
                    div_size = 0.1*targetWidth;
                    div_float ="left";
                    div_left = 0;
                }

                d3.select(options.selector + " #export").style({
                    "width": div_size + "px",
                    "left":div_left + "px",
                     "float":div_float
                });

                d3.select(options.selector + " .dropdown-multipleConatiner-export")
                        .style("left",(targetWidth - 80)+"px");
            }

            if(a) {
                a.attr("width",targetWidth);
            }

            if(b && !(PykCharts['boolean'](options.panels_enable))) {
                var select = document.querySelector(options.selector + " .main-div");
                if(select) {
                    select.style.width = targetWidth;
                }
            }
        },
        __proto__: {
            _downloadDataURI : function(t) {
                function isPlainObject(t) {
                   return "object" != typeof t || t.nodeType || null != t && t === t.window ? !1 : t.constructor && !t.constructor.prototype.hasOwnProperty("isPrototypeOf") ? !1 : !0
                }
                if (t) {
                    isPlainObject(t) || (t = {
                        data: t
                    }), t.filename || (t.filename = "download." + t.data.split(",")[0].split(";")[0].substring(5).split("/")[1]), t.url || (t.url = "http://download-data-uri.appspot.com/");
                    var e = (d3.select("body").append("form").attr("id", "export-form").attr("method", "post").attr("action", t.url).style("display", "none").html("<input type='hidden' name='filename' value='" + t.filename + "'/><input type='hidden' name='data' value='" + t.data + "'/>"), document.getElementById("export-form"));
                    e.submit(), e.parentNode.removeChild(e)
                }
            },
            _xmlToJson : function(xml,flag) {
                var obj = [],
                    element_node,
                    data_point,
                    key_of_data_point,
                    value_of_data_point,
                    element_object,
                    root_len = xml.firstChild.childElementCount,
                    i , j, increment_counter, condition_checking;

                if (flag == 0) {
                    i = flag;
                    condition_checking = root_len;
                    increment_counter = 1;
                }
                else if (flag == 1) {
                    i = flag;
                    condition_checking = ((root_len*2)+1);
                    increment_counter = 2;
                }

                for (; i<condition_checking ; i+=increment_counter) {
                    element_node = xml.firstChild.childNodes[i];
                    element_object = {};

                    for(j=0, element_len=element_node.childElementCount ; j<element_len ; j++) {
                        data_point = element_node.children.item(j);
                        key_of_data_point = data_point.nodeName;
                        value_of_data_point = data_point.textContent;
                        element_object[key_of_data_point] = value_of_data_point;
                    }
                    obj.push(element_object);
                }

                return obj;
            },
            _domainBandwidth: function (domain_array, count, type) {
                addFactor = 0;
                if(type === "time") {
                    var a = domain_array[0],
                        b = domain_array[1], new_array = [];
                    padding = (b - a) * 0.1;
                    switch( count ) {
                        case 0: new_array[0] = a - (padding + addFactor);
                        break;
                        case 1:  new_array[1] = b + (padding + addFactor);
                        break;
                        case 2:
                            new_array[0] = a - (padding + addFactor);
                            new_array[1] = b + (padding + addFactor);
                            break;
                    }
                    return [options.k.dateConversion(new_array[0]),options.k.dateConversion(new_array[1])];
                }else {
                    padding = (domain_array[1] - domain_array[0]) * 0.1;
                    switch( count ) {
                        case 0: domain_array[0] -= (padding + addFactor);
                        break;
                        case 1: domain_array[1] = parseFloat(domain_array[1],10) + (padding + addFactor);
                        break;
                        case 2:
                            domain_array[0] -= (padding + addFactor);
                            domain_array[1] = parseFloat(domain_array[1],10) + (padding + addFactor);
                            break;
                    }
                    return domain_array;
                }
            },
            _radiusCalculation: function (radius_percent,type) {
                var min_value;
                if(type === "percentageBar") {
                    min_value = options.chart_height;
                } else if(type === "spiderweb") {
                    min_value = d3.min([(options.chart_width - options.legendsGroup_width),(options.chart_height-options.legendsGroup_height-20)])
                } else if(type !== undefined) {
                    min_value = options.chart_width;
                } else {
                    min_value = d3.min([options.chart_width,options.chart_height]);
                }
                return (min_value*radius_percent)/200;
            },
            _getHighestParentsAttribute: function(id,styleAttribute) {
                var element = document.querySelector(id),value;
                searchFunction(element);
                function searchFunction(element) {
                    if(element.tagName.toLowerCase() === "body") {
                        value = null;
                        return;
                    }
                    value = element.style[styleAttribute];
                    if(!value) {
                        value = d3.select(element).style(styleAttribute);
                    }
                    if(value) {
                        return;
                    } else {
                        searchFunction(element.parentNode)
                    }
                }
                return value;
            },
            _groupBy: function (chart,arr) {
                var gd = []
                , i
                , obj
                , dimensions = {
                    "oned": ["name"],
                    "line": ["x","name"],
                    "area": ["x","name"],
                    "bar": ["y","group"],
                    "column": ["x","group"],
                    "scatterplot": ["x","y","name","group"],
                    "pulse": ["x","y","name","group"],
                    "spiderweb": ["x","group"],
                    "waterfall": ["x","y"],
                    "simple2x2": ["group"]
                  }
                , charts = {
                    "oned": {
                        "dimension": "name",
                        "fact": "weight"
                    },
                    "line": {
                      "dimension": "x",
                      "fact": "y",
                      "name": "name"
                    },
                    "area": {
                      "dimension": "x",
                      "fact": "y",
                      "name": "name"
                    },
                    "bar": {
                      "dimension": "y",
                      "fact": "x",
                      "name": "group"
                    },
                    "column": {
                      "dimension": "x",
                      "fact": "y",
                      "name": "group"
                    },
                    "scatterplot": {
                      "dimension": "x",
                      "fact": "y",
                      "weight": "weight",
                      "name": "name",
                      "group": "group"
                    },
                    "pulse": {
                      "dimension": "y",
                      "fact": "x",
                      "weight": "weight",
                      "name": "name",
                      "group": "group"
                    },
                    "spiderweb": {
                      "dimension": "x",
                      "fact": "y",
                      "name": "name",
                      "weight": "weight"
                    },
                    "waterfall": {
                        "dimension": "y",
                        "fact": "x",
                        "name": "group"
                    },
                    "simple2x2": {
                      "dimension": "group",
                      "fact": "weight"
                    }
                },
                properties = dimensions[chart],
                groups = [];
                var len = arr.length;
                for(var i = 0; i<len; i+=1){
                    var obj = arr[i];
                    if(groups.length == 0){
                        groups.push([obj]);
                    }
                    else{
                        var equalGroup = false,
                            glen = groups.length;
                        for(var a = 0;a<glen;a+=1){
                            var group = groups[a],
                            equal = true,
                            firstElement = group[0];
                            properties.forEach(function(property){
                                if(firstElement[property] !== obj[property]){
                                    equal = false;
                                }
                            });
                            if(equal){
                                equalGroup = group;
                            }
                        }
                        equalGroup ? equalGroup.push(obj) : groups.push([obj]);
                    }
                }

                for(i in groups) {
                    if (groups[i].constructor === Array) {
                        obj = {};
                        var grp = groups[i],
                            chart_name = charts[chart],
                            values_charts_chart = [],
                            obj_with_omitted_properties = {},
                            f = {};
                        obj[chart_name.dimension] = grp[0][chart_name.dimension];
                        if (chart_name.name) {
                            obj[chart_name.name] = grp[0][chart_name.name];
                        }
                        if (chart_name.weight) {
                            obj[chart_name.weight] = d3.sum(grp, function (d) { return d[charts[chart].weight]; });
                            if(chart === "spiderweb") {
                                obj[chart_name.fact] = d3.sum(grp, function (d) { return d[charts[chart].fact]; });
                            } else {
                                obj[chart_name.fact] = grp[0][chart_name.fact];
                            }
                        } else {
                            obj[chart_name.fact] = d3.sum(grp, function (d) { return d[charts[chart].fact]; });
                        }
                        if (chart_name.group) {
                            obj[chart_name.group] = grp[0][chart_name.group];
                        }

                        for (var key in charts[chart]) {
                            values_charts_chart.push(charts[chart][key]);
                        }
                        for (var key in grp[0]) {
                            var flag = 0;
                            for (var i=0 ; i<values_charts_chart.length ; i++) {
                                if (key === values_charts_chart[i]) {
                                    flag = 1;
                                    break;
                                }
                            }
                            if (flag === 0) {
                                obj_with_omitted_properties[key] = grp[0][key];
                            }
                        }
                        for (var key in obj) {
                            f[key] = obj[key];
                        }
                        for (var key in obj_with_omitted_properties) {
                            f[key] = obj_with_omitted_properties[key];
                        }
                        gd.push(f);
                    }
                };
                return gd;
            },
            _sortData: function (data, column_to_be_sorted, group_column_name, options,notApplicable) {
                if(!PykCharts['boolean'](options.data_sort_enable) && !notApplicable) {
                    data.sort(function(a,b) {
                        if (a[group_column_name] > b[group_column_name]) {
                            return 1;
                        }
                        else if (a[group_column_name] < b[group_column_name]) {
                            return -1;
                        }
                    });
                } else if (PykCharts['boolean'](options.data_sort_enable)) {
                    switch (options.data_sort_type) {
                        case "numerically":
                            data.sort(function (a,b) {
                                return ((options.data_sort_order === "descending") ? (b[column_to_be_sorted] - a[column_to_be_sorted]) : (a[column_to_be_sorted] - b[column_to_be_sorted]));
                            });
                            break;
                        case "alphabetically":
                            data.sort(function (a,b) {
                                if (a[column_to_be_sorted] < b[column_to_be_sorted]) {
                                    return (options.data_sort_order === "descending") ? 1 : -1;
                                }
                                else if (a[column_to_be_sorted] > b[column_to_be_sorted]) {
                                    return (options.data_sort_order === "descending") ? -1 : 1;
                                }
                                else if (a[group_column_name] < b[group_column_name]) {
                                    return (options.data_sort_order === "descending") ? 1 : -1;
                                }
                                else if (a[group_column_name] > b[group_column_name]) {
                                    return (options.data_sort_order === "descending") ? -1 : 1;
                                }
                                return 0;
                            });
                            break;
                        case "date":
                            data.sort(function (a,b) {
                                if (new Date(a[column_to_be_sorted]) < new Date(b[column_to_be_sorted])) {
                                    return (options.data_sort_order === "descending") ? 1 : -1;
                                }
                                else if (new Date(a[column_to_be_sorted]) > new Date(b[column_to_be_sorted])) {
                                    return (options.data_sort_order === "descending") ? -1 : 1;
                                }
                                else if (a[group_column_name] < b[group_column_name]) {
                                    return (options.data_sort_order === "descending") ? 1 : -1;
                                }
                                else if (a[group_column_name] > b[group_column_name]) {
                                    return (options.data_sort_order === "descending") ? -1 : 1;
                                }
                                return 0;
                            });
                            break;
                    }
                }
                return data;
            },
            _unique : function (data,parameter) {
                var n = {},r=[];
                    // if(parameter) {
                    //     for(var i = 0,len=data.length; i < len; i++) {

                    //     }
                    // }

                    for(var i = 0,len=data.length; i < len; i++)
                    {
                        if(parameter) {
                            data[i] = data[i][parameter];
                        }

                        if (!n[data[i]])
                        {
                            n[data[i]] = true;
                            r.push(data[i]);
                        }
                    }
                    return r;
            },
            _ready: function (fn) {
                function completed() {
                    document.removeEventListener( "DOMContentLoaded", completed, false );
                    window.removeEventListener( "load", completed, false );
                }

                if ( document.addEventListener ) {
                    document.addEventListener( "DOMContentLoaded", completed, false );
                    window.addEventListener( "load", completed, false );
                    fn;
                } else if ( document.attachEvent ) { // if IE event model is used
                    document.attachEvent("onreadystatechange", function(){
                        if ( document.readyState === "complete" ) {
                            document.detachEvent( "onreadystatechange", arguments.callee );
                            fn;
                        }
                    });
                }
                return this;
            },
            _colourBrightness: function (bg,element){
                var r,g,b,a=1,brightness,
                    colour = bg;

                if (colour.match(/^rgba/)) {
                    colour = colour.match(/rgba\(([^)]+)\)/)[1];
                    colour = colour.split(/ *, */).map(Number);
                    r = colour[0];
                    g = colour[1];
                    b = colour[2];
                    a = colour[3];
                }
                else if (colour.match(/^rgb/)) {
                    colour = colour.match(/rgb\(([^)]+)\)/)[1];
                    colour = colour.split(/ *, */).map(Number);
                    r = colour[0];
                    g = colour[1];
                    b = colour[2];
                } else if ('#' == colour[0] && 7 == colour.length) {
                    r = parseInt(colour.slice(1, 3), 16);
                    g = parseInt(colour.slice(3, 5), 16);
                    b = parseInt(colour.slice(5, 7), 16);
                } else if ('#' == colour[0] && 4 == colour.length) {
                    r = parseInt(colour[1] + colour[1], 16);
                    g = parseInt(colour[2] + colour[2], 16);
                    b = parseInt(colour[3] + colour[3], 16);
                } else {

                }
                brightness = (r * 299 + g * 587 + b * 114) / 1000;
                if (brightness < 125 && a > 0.5) {
                     if(element) {
                        d3.selectAll(element).classed({'light': false, 'dark': true});
                    } else {
                        return "dark";
                    }
                }
                else if (brightness < 125 && a <= 0.5) {
                    if(element) {
                        d3.selectAll(element).classed({'light': true, 'dark': false});
                    } else {
                        return "light";
                    }
                }
                else {
                    if(element) {
                        d3.selectAll(element).classed({'light': true, 'dark': false});
                    } else {
                        return "light";
                    }
                }
            },
            _isNumber: function (n) {
                return (!isNaN(parseFloat(n)) && isFinite(n));
            },
            _where: function (list, key_value_pairs_to_be_searched) {
                var list_length = list.length,
                    data_result = [];
                if(typeof list === "object") {
                    for (var z in list) {
                        var flag = 0,
                            no_of_keys = 0;
                        for (var key in key_value_pairs_to_be_searched) {
                            if (list[z].hasOwnProperty(key) && list[z][key] === key_value_pairs_to_be_searched[key]) {
                                flag += 1;
                            }
                            else {
                                flag = 0;
                            }
                            no_of_keys += 1;
                        }
                        if (flag === no_of_keys) {
                            data_result.push(list[z]);
                        }
                    }
                } else {
                    for (var z=0 ; z<list_length ; z++) {
                        var flag = 0,
                            no_of_keys = 0;
                        for (var key in key_value_pairs_to_be_searched) {
                            if (list[z].hasOwnProperty(key) && list[z][key] === key_value_pairs_to_be_searched[key]) {
                                flag += 1;
                            }
                            else {
                                flag = 0;
                            }
                            no_of_keys += 1;
                        }
                        if (flag === no_of_keys) {
                            data_result.push(list[z]);
                        }
                    }
                }
                return data_result;
            },
            _isEqual : function(a, b) {
                var eq = function(a, b, aStack, bStack) {
                    if (a === b) return a !== 0 || 1 / a === 1 / b;
                    if (a == null || b == null) return a === b;
                    var className = toString.call(a);
                    if (className !== toString.call(b)) return false;
                    switch (className) {
                      case '[object RegExp]':
                      case '[object String]':
                        return '' + a === '' + b;
                      case '[object Number]':
                        if (+a !== +a) return +b !== +b;
                        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
                      case '[object Date]':
                      case '[object Boolean]':
                        return +a === +b;
                    }
                    if (typeof a != 'object' || typeof b != 'object') return false;
                    var length = aStack.length;
                    while (length--) {
                      if (aStack[length] === a) return bStack[length] === b;
                    }
                    var aCtor = a.constructor, bCtor = b.constructor;
                    if (
                      aCtor !== bCtor &&
                      'constructor' in a && 'constructor' in b &&
                      !(isFunction(aCtor) && aCtor instanceof aCtor &&
                        isFunction(bCtor) && bCtor instanceof bCtor)
                    ) {
                      return false;
                    }
                    aStack.push(a);
                    bStack.push(b);
                    var size, result;
                    if (className === '[object Array]') {
                      size = a.length;
                      result = size === b.length;
                      if (result) {
                        while (size--) {
                          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
                        }
                      }
                    } else {
                      var keys = Object.getOwnPropertyNames(a), key;
                      size = keys.length;
                      result = Object.getOwnPropertyNames(b).length === size;
                      if (result) {
                        while (size--) {
                          key = keys[size];
                          if (!(result = hasOwnProperty.call(b, key) && eq(a[key], b[key], aStack, bStack))) break;
                        }
                      }
                    }
                    aStack.pop();
                    bStack.pop();
                    return result;
                  };
                var isFunction = function(obj) {
                    return typeof obj == 'function' || false;
                };
                return eq(a, b, [], []);
            },
            _offset:  function (elem) {
                var strundefined = typeof undefined;
                var docElem, win,
                    box = { top: 0, left: 0 },
                    doc = elem && elem.ownerDocument;
                if ( !doc ) {
                    return;
                }
                docElem = doc.documentElement;
                if ( typeof elem.getBoundingClientRect !== strundefined ) {
                    box = elem.getBoundingClientRect();
                }
                win=(doc != null && doc === doc.window) ? doc : doc.nodeType === 9 && doc.defaultView;
                return {
                    top: box.top + win.pageYOffset - docElem.clientTop,
                    left: box.left + win.pageXOffset - docElem.clientLeft
                };
            }
        },
        backgroundColor: function (options) {
            d3.select(options.selector).style({"background-color":options.background_color,"position":"relative"})
            var bg,child1;
            bgColor(options.selector);

            function bgColor(child) {
                child1 = child;
                bg  = d3.select(child).style("background-color");
                if (bg === "transparent" || bg === "rgba(0, 0, 0, 0)") {
                    if(d3.select(child)[0][0].parentNode.tagName === undefined || d3.select(child)[0][0].parentNode.tagName.toLowerCase() === "body") {
                        options.k.__proto__._colourBrightness("rgb(255,255,255)",d3.select(child)[0]);
                    } else {
                        return bgColor(d3.select(child)[0][0].parentNode);
                    }
                } else {
                    return options.k.__proto__._colourBrightness(bg,d3.selectAll(child)[0]);
                }
            }
            if (d3.select(child1)[0][0].classList.contains("light")) {
                options.img = PykCharts.assets+"img/download.png";
            } else {
                options.img = PykCharts.assets+"img/download-light.png";
            }

            return this;
        },
        dataSourceFormatIdentification: function (data,chart,executeFunction) {
            if (typeof data === "object") {
                chart.data = data;
                chart[executeFunction](chart.data);
            } else {
                var dot_index = data.lastIndexOf('.'),
                len = data.length - dot_index,
                cache_avoidance_value = Math.floor((Math.random() * 100) + 1);

                if (data.constructor == Array) {
                    chart.data = data;
                    chart[executeFunction](chart.data);
                }
                else {
                    var format = data.substr(dot_index+1,len);
                    if (data.indexOf("<root>") != -1) {
                        var xml_data_converted_from_string,
                            json_data_converted_from_xml;

                        if (window.DOMParser) {
                            parser = new DOMParser();
                            xml_data_converted_from_string = parser.parseFromString(data,"text/xml");
                        } else { // Internet Explorer
                            xml_data_converted_from_string = new ActiveXObject("Microsoft.XMLDOM");
                            xml_data_converted_from_string.async = false;
                            xml_data_converted_from_string.loadXML(data);
                        }

                        json_data_converted_from_xml = options.k.__proto__._xmlToJson(xml_data_converted_from_string,0);
                        chart[executeFunction](json_data_converted_from_xml);
                    }
                    else if(data.indexOf("{")!= -1) {
                        chart.data = JSON.parse(data);
                        chart[executeFunction](chart.data);
                    } else if (data.indexOf(",")!= -1) {
                        chart.data = d3.csv.parse(data);
                        chart[executeFunction](chart.data);
                    } else if (format === "json") {
                        d3.json(data+"?"+cache_avoidance_value,chart[executeFunction]);
                    } else if(format === "csv") {
                        d3.csv(data+"?"+cache_avoidance_value,chart[executeFunction]);
                    } else if (format === "xml") {
                        d3.xml(data+"?"+cache_avoidance_value, function(data) {
                            var json_data_converted_from_xml;
                            json_data_converted_from_xml = options.k.__proto__._xmlToJson(data,1);
                            chart[executeFunction](json_data_converted_from_xml);
                        });
                    }
                }
            }
        },
        export: function(chart,svgId,chart_name,panels_enable,containers,chart_width) {
            if(PykCharts['boolean'](options.export_enable)) {
                var chart_width = options.chart_width;
                if(PykCharts['boolean'](panels_enable) && chart_width) {
                    chart_width = chart_width;
                }

                var id = "export",
                div_size = chart_width,
                div_float ="none",
                div_left = chart_width-16;

                d3.select(options.selector)
                        .append("div")
                        .style("left",chart_width - 80 + "px")
                        .attr("class","dropdown-multipleConatiner-export")

                if(PykCharts['boolean'](panels_enable)) {
                    var containers_length = containers.length;
                    for(var i = 0; i < containers_length; i++) {
                        d3.select(options.selector + " .dropdown-multipleConatiner-export")
                            .append("span")
                            .attr("id",chart_name + i)
                            .on("mouseover",function () {
                                d3.select(this).style("background-color","#E0E0E1");
                            })
                            .on("mouseout",function() {
                                d3.select(this).style('background-color',"#fff")
                            })
                            .style({
                                "margin-bottom" : "3px",
                                "cursor" : "pointer"
                            })
                            .html("Panel " + (i+1) + "<br>");
                    }
                } else {
                    d3.select(options.selector + " .dropdown-multipleConatiner-export")
                        .append("span")
                        .attr("id","span")
                        .on("mouseover",function () {
                            d3.select(this).style("background-color","#E0E0E1");
                        })
                        .on("mouseout",function() {
                            d3.select(this).style('background-color',"#fff")
                        })
                        .style({
                                "margin-bottom" : "3px",
                                "cursor" : "pointer"
                        })
                        .html("Export as SVG" + "<br>");
                }

                if(PykCharts['boolean'](options.title_text) && options.title_size  && options.mode === "default") {
                    div_size = 0.1*chart_width;
                    div_float ="left";
                    div_left = 0;
                }

                var export_div = d3.select(chart.selector)
                    .append("div")
                    .attr("id",id)
                    .style({
                        "width":div_size + "px",
                        "left":div_left+"px",
                        "float":div_float,
                        'text-align':'right'
                    })

                setTimeout(function () {
                    export_div.html("<img title='Export to SVG' src='"+options.img+"' style='left:"+div_left+"px;margin-bottom:3px;cursor:pointer;'/>");
                },options.transition_duration*1000);

            }
            return this;
        },
        exportSVG: function (chart,svgId,chart_name,panels_enable,containers,add_extra_width,add_extra_height) {
            if(PykCharts['boolean'](options.export_enable)) {
                if(!add_extra_width) {
                    add_extra_width = 0;
                }
                if(!add_extra_height) {
                    add_extra_height = 0;
                }

                var id = "export";
                var canvas_id = chart_name+"canvas";
                var canvas = document.createElement("canvas");
                canvas.setAttribute('id', canvas_id);
                var get_canvas = document.getElementById(canvas_id);
                paper.setup(get_canvas);
                var project = new paper.Project();
                project._view._viewSize.width = chart.chart_width + add_extra_width;
                project._view._viewSize.height = chart.chart_height +  add_extra_height;

                var name = chart_name + ".svg";
                d3.select(chart.selector + " #"+id).on("click",function () {
                    PykCharts.export_menu_status = 1;
                    d3.select(options.selector + " .dropdown-multipleConatiner-export").style("visibility", "visible");
                });

                if(!PykCharts['boolean'](panels_enable)) {
                    d3.selectAll(chart.selector + " #span").on("click",function () {
                        d3.select(options.selector + " .dropdown-multipleConatiner-export").style("visibility", "hidden");
                        chart.k.processSVG(document.querySelector(options.selector +" "+svgId),chart_name);
                        project.importSVG(document.querySelector(options.selector +" "+svgId));
                        var svg = project.exportSVG({ asString: true });
                        options.k.__proto__._downloadDataURI({
                            data: 'data:image/svg+xml;base64,' + btoa(svg),
                            filename: name
                        });
                        project.clear();
                    });
                } else {
                    var containers_length = containers.length;
                    for(var i = 0; i<containers_length; i++) {
                        d3.selectAll(chart.selector + " #"+chart_name + i).on("click",function () {
                            d3.select(options.selector + " .dropdown-multipleConatiner-export").style("visibility", "hidden");
                            var id = this.id.substring(this.id.length-1,this.id.length);
                            chart.k.processSVG(document.querySelector(options.selector + " #" +svgId + id),chart_name);
                            project.importSVG(document.querySelector(options.selector + " #" +svgId + id));
                            var svg = project.exportSVG({ asString: true });;
                            options.k.__proto__._downloadDataURI({
                                data: 'data:image/svg+xml;base64,' + btoa(svg),
                                filename: name
                            });
                            project.clear();
                        });
                    }
                }
            }
            return this;
        },
        shadeColorConversion: function (color, data_length) {
            var r,g,b, division,array = [], increment_ratio = (150/data_length),color_value,color_validation;

            color = d3.rgb(color);
            color_validation = "rgb(" + color.r + "," + color.g + "," + color.b +")"
            color_value = options.k.__proto__._colourBrightness(color_validation);
            if(color_value === "light") {
                inc = -1;
            } else {
                inc = 1;
            }
            var magnitude = Math.sqrt((color.r*color.r) + (color.g*color.g)) + Math.sqrt((color.r*color.r) + (color.b*color.b)) +  Math.sqrt((color.g*color.g) + (color.b*color.b))
            for(i = 0; Math.abs(i) < data_length; i += inc) {
                var rgb_color = {
                    "r":parseInt((color.r+(i*increment_ratio)),10),
                    "g":parseInt((color.g+(i*increment_ratio)),10),
                    "b":parseInt((color.b+(i*increment_ratio)),10)
                }
                var hex_color = "rgb(" + rgb_color.r + "," + rgb_color.g + "," + rgb_color.b +")"
                array.push(hex_color);
            }
            if(inc === -1) {
                array.reverse();
            }
            return array;
        },
        processSVG: function (svg,svgId) {
            var x = svg.querySelectorAll("text"),
                x_length = x.length;
            for (var i = 0; i < x_length; i++) {
                if(x[i].hasAttribute("dy")) {
                    var attr_value = x[i].getAttribute("dy"),
                        attr_length = attr_value.length;
                    if(attr_value.substring(attr_length-2,attr_length) == "em") {
                        var font_size, value;
                        if(x[i].hasAttribute('font-size')) {
                            font_size = x[i].getAttribute('font-size');
                            value = parseFloat(font_size)*parseFloat(attr_value);

                        } else {
                            value = 12*parseFloat(attr_value);
                        }
                        x[i].setAttribute("dy", value);
                    }
                }
            }
            return this;
        },
        errorHandling: function(error_msg,error_code,err_url) {
            console.error('%c[Error - Pykih Charts] ', 'color: red;font-weight:bold;font-size:14px', " at "+options.selector+".(Invalid value for attribute \""+error_msg+"\")  Visit https://github.com/pykih/PykCharts.js/wiki/Errors#error_"+error_code);
            return;
        },
        warningHandling: function(error_msg,error_code,err_url) {
            console.warn('%c[Warning - Pykih Charts] ', 'color: #F8C325;font-weight:bold;font-size:14px', " at "+options.selector+".(Invalid value for attribute \""+error_msg+"\")  Visit https://github.com/pykih/PykCharts.js/wiki/Warnings#warning_"+error_code);
            return;
        },
        validator: function () {
            var validator = {
                validatingSelector: function (selector) {
                    if(selector.charAt(0) === "#") {
                        selector = selector.substring(1,selector.length);
                    }
                    try {
                        if(!document.getElementById(selector)) {
                            options.stop = true;
                            throw "selector";
                        }
                    }
                    catch (err) {
                        options.k.errorHandling(err,"1");
                    }
                    return this;
                },
                validatingDataType: function (attr_value,config_name,default_value,name) {
                    try {
                        if(!options.k.__proto__._isNumber(attr_value)) {
                            if(name) {
                                options[name] = default_value;
                            } else {
                                options[config_name] = default_value;
                            }
                            throw config_name;
                        } else {
                            options[config_name] = parseFloat(attr_value);
                        }
                    }
                    catch (err) {
                        options.k.warningHandling(err,"1");
                    }
                    return this;
                },
                validatingChartMode: function (mode,config_name,default_value) {
                    try {
                        if(mode === "default" || mode === "infographics") {
                        } else {
                            options[config_name] = default_value;
                            throw "mode";
                        }
                    }
                    catch (err) {
                        options.k.warningHandling(err,"2");
                    }
                    return this;
                },
                validatingAxisDataFormat: function (axis_data_format,config_name) {
                    if(axis_data_format) {
                        try {
                            if(axis_data_format === "number" || axis_data_format === "string" || axis_data_format === "time") {
                            } else {
                                options.stop = true;
                                throw config_name;
                            }
                        }
                        catch (err) {

                            options.k.errorHandling(err,"9");
                        }
                    }
                    return this;
                },
                validatingColorMode: function (color_mode,config_name,default_value,chart_type) {
                    if(color_mode) {
                        try {
                            if(chart_type === "oneDimensionalCharts") {
                                if(color_mode === "color" || color_mode === "shade") {
                                } else {
                                    options[config_name] = default_value;
                                    throw "color_mode";
                                }
                            } else {
                                if(color_mode === "color" || color_mode === "saturation") {
                                } else {
                                    options[config_name] = default_value;
                                    throw "color_mode";
                                }
                            }
                        }
                        catch (err) {
                            options.k.warningHandling(err,"3");
                        }
                    }
                    return this;
                },
                validatingYAxisPointerPosition: function (axis_pointer_position,config_name,default_value) {
                        try {
                            if(axis_pointer_position === "left" || axis_pointer_position === "right" ) {
                            } else {
                                options[config_name] = default_value;
                                throw config_name;
                            }
                        }
                        catch (err) {
                            options.k.warningHandling(err,"7");
                        }
                    return this;
                },
                validatingXAxisPointerPosition: function (axis_pointer_position,config_name,default_value) {
                        try {
                            if(axis_pointer_position === "top" || axis_pointer_position === "bottom") {
                            } else {
                                options[config_name] = default_value;
                                throw config_name;
                            }
                        }
                        catch (err) {
                            options.k.warningHandling(err,"7");
                        }
                    return this;
                },
                validatingBorderBetweenChartElementsStyle: function (border_between_chart_elements_style,config_name) {
                        try {
                            if(border_between_chart_elements_style === "1,3" || border_between_chart_elements_style === "5,5" || border_between_chart_elements_style === "0") {
                            } else {
                                throw config_name;
                            }
                        }
                        catch (err) {
                            options.k.errorHandling(err,"#7");
                        }
                    return this;
                },
                validatingLegendsPosition: function (legends_display,config_name,default_value) {
                        try {
                            if(legends_display === "horizontal" || legends_display === "vertical") {
                            } else {
                                options[config_name] = default_value;
                                throw config_name;
                            }
                        }
                        catch (err) {
                            options.k.warningHandling(err,"13");
                        }
                    return this;
                },
                isArray: function (value,config_name) {
                        try {
                            if(!(value.constructor === Array)) {
                                throw config_name;
                            }
                        }
                        catch (err) {
                            options.stop = true;
                            options.k.errorHandling(err,"4");
                        }
                    return this;
                },
                validatingTimeScaleDataType: function (axis_time_value_datatype,config_name) {
                    if(axis_time_value_datatype) {
                        try {
                            if(axis_time_value_datatype === "date" || axis_time_value_datatype === "year" || axis_time_value_datatype === "month" || axis_time_value_datatype === "hours" || axis_time_value_datatype === "minutes") {
                            } else {
                                options.stop = true;
                                throw config_name;
                            }
                        }
                        catch (err) {
                            options.k.errorHandling(err,"5");
                        }
                    }
                    return this;
                },
                validatingTooltipMode: function (tooltip_mode,config_name,default_value) {
                    if(tooltip_mode) {
                        try {
                            if(tooltip_mode === "fixed" || tooltip_mode === "moving") {
                            } else {
                                options[config_name] = default_value;
                                throw config_name;
                            }
                        }
                        catch (err) {
                            options.k.warningHandling(err,"14");
                        }
                    }
                    return this;
                },
                validatingFontWeight: function (font_weight,config_name,default_value,name) {
                    try {
                        if(font_weight === "bold" || font_weight === "normal") {
                        } else {
                            if(name) {
                                options[name] = default_value;
                            } else {
                                options[config_name] = default_value;
                            }

                            throw config_name;
                        }
                    }
                    catch (err) {
                        options.k.warningHandling(err,"5");
                    }
                    return this;
                },
                validatingColor: function (color,config_name,default_value,name) {
                    if(color) {
                        try {
                            var checked;
                            if(typeof color != "string" ) {

                                throw config_name;
                            }

                            if(color.charAt(0)!= "#" && color.substring(0,3).toLowerCase() !="rgb" && color.toLowerCase()!= "transparent") {
                                checked = $c.name2hex(color) ;
                                if(checked === "Invalid Color Name") {
                                    throw config_name;
                                }
                            } else if (color.charAt(0) === "#") {
                                checked = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
                                if(!checked) {
                                    throw config_name;
                                }
                            }
                        }
                        catch (err) {
                            if(name) {
                                options[name] = default_value;
                            } else {
                                options[config_name] = default_value;
                            }
                            options.k.warningHandling(err,"4");
                        }
                    }
                    return this;
                },
                validatingDataMode : function (mode,config_name,default_value,name) {
                    try {
                        if(mode === "absolute" || mode === "percentage") {
                        } else {
                            options[config_name] = default_value;
                            throw config_name;
                        }
                    }
                    catch (err) {
                        options.k.warningHandling(err,"16");
                    }
                    return this;
                },
                validatingLegendsMode : function (mode,config_name,default_value,name) {
                    try {
                        if(mode === "default" || mode === "interactive") {
                        } else {
                            options[config_name] = default_value;
                            throw config_name;
                        }
                    }
                    catch (err) {
                        options.k.warningHandling(err,"17");
                    }
                    return this;
                },
                validatingJSON : function (data) { // note: this method method cannot be used for chaining as it return fasle and not this;
                    if(!data) {
                        try {
                            options.stop = true;
                            throw "Data is not in the valid JSON format";
                        }
                        catch (err) {
                            console.error('%c[Error - Pykih Charts] ', 'color: red;font-weight:bold;font-size:14px', " at "+ options.selector+".(\""+err+"\")  Visit www.pykcharts.com/errors#error_2");
                        }
                    }
                    return (options.stop) ? false : true;
                }
            };
            return validator;
        }
    };
    return configuration;
};
var configuration = PykCharts.Configuration;
configuration.mouseEvent = function (options) {
    var that = this;
    that.tooltip = configuration.tooltipp;
    var action = {
        tooltipPosition: function (d) {
            if(PykCharts['boolean'](options.tooltip_enable) || PykCharts['boolean'](options.annotation_enable) || options.axis_x_data_format === "string" || options.axis_y_data_format === "string") {
                that.tooltip
                    .style({
                        "display" : "block",
                        "top" : (PykCharts.getEvent().pageY - 20) + "px",
                        "left" : (PykCharts.getEvent().pageX + 30) + "px"
                    });
                return that.tooltip;
            }

        },
        tooltipTextShow: function (d,panels_enable,type,group_index,axis_tooltip) {
            var selector = options.selector.substr(1,options.selector.length)
            if(PykCharts['boolean'](options.tooltip_enable) || PykCharts['boolean'](options.annotation_enable) || options.axis_x_data_format === "string" || options.axis_y_data_format === "string") {
                if(panels_enable === "yes" && type === "multilineChart") {
                    d3.selectAll("#tooltip-svg-container-"+group_index +"-pyk-tooltip"+selector).html(d);
                } else {
                    that.tooltip.html(d);
                }
                return this;
            }
        },
        tooltipHide: function (d,panels_enable,type,axis_tooltip) {
            if(PykCharts['boolean'](options.tooltip_enable) || PykCharts['boolean'](options.annotation_enable) || options.axis_x_data_format === "string" || options.axis_y_data_format === "string") {
                if(panels_enable === "yes" && type === "multilineChart") {
                    return d3.selectAll(".pyk-tooltip").style("display","none");
                }
                else {
                    return that.tooltip.style("display", "none");
                }
            }
        },
        axisHighlightShow: function (active_tick,axisHighlight,domain,a) {
            var curr_tick,prev_tick,axis_pointer_color,selection,axis_data_length,active_tick_length,domain_length;
            if(PykCharts['boolean'](options.axis_onhover_highlight_enable)/* && options.mode === "default"*/){
                if(axisHighlight === options.selector + " .y.axis" && a == undefined){
                    selection = axisHighlight+" .tick text";
                    axis_pointer_color = options.axis_y_pointer_color;
                    axis_data_length = d3.selectAll(selection)[0].length;
                    active_tick_length = active_tick.length;

                    d3.selectAll(selection)
                        .style("fill","#bbb")
                        .style("font-weight","normal");

                    for(var b=0;b < axis_data_length;b++) {
                        for(var c=0;c < active_tick_length;c++) {
                            if(d3.selectAll(selection)[0][b].__data__ === active_tick[c]) {
                                d3.select(d3.selectAll(selection)[0][b])
                                    .style("fill",axis_pointer_color)
                                    .style("font-weight","bold");
                            }
                        }
                    }
                }
                else {
                    if(axisHighlight === options.selector + " .x.axis") {
                        selection = axisHighlight+" .tick text";
                        axis_pointer_color = options.axis_x_pointer_color;
                    } else if(axisHighlight === options.selector + " .axis-text" && a === "column") {
                        selection = axisHighlight;
                        axis_pointer_color = options.axis_x_pointer_color;
                    } else if(axisHighlight === options.selector + " .axis-text" && a === "bar") {
                        selection = axisHighlight;
                        axis_pointer_color = options.axis_y_pointer_color;
                    } else if(axisHighlight === options.selector + " .y.axis" && a == "waterfall") {
                        selection = axisHighlight+" .tick text";
                        axis_pointer_color = options.axis_y_pointer_color;
                    } else if(axisHighlight === options.selector + " .y.axis" && a === "bar") {
                        selection = axisHighlight+" .tick text";
                        axis_pointer_color = options.axis_x_pointer_color;
                    }

                    if(prev_tick !== undefined) {
                        d3.select(d3.selectAll(selection)[0][prev_tick])
                            .style({
                                "fill" : axis_pointer_color,
                                "font-weight" : "normal"
                            });
                    }

                    axis_data_length = d3.selectAll(selection)[0].length;

                    var len = domain.length;
                    if(options.axis_x_data_format === "number"/* && a === undefined*/) {
                        for(var curr_tick=0 ; curr_tick<axis_data_length ; curr_tick++) {
                            if(d3.selectAll(selection)[0][curr_tick].__data__ == active_tick) {
                                break;
                            }
                        }
                    } else {
                        for(curr_tick = 0;curr_tick < len;curr_tick++) {
                            if(domain[curr_tick] === active_tick) {
                                break;
                            }
                        }
                    }
                    prev_tick = curr_tick;
                    d3.selectAll(selection)
                        .style("fill","#bbb");
                    d3.select(d3.selectAll(selection)[0][curr_tick])
                        .style({
                            "fill" : axis_pointer_color,
                            "font-weight" : "bold"
                        });
                }
            }
            return this;
        },
        axisHighlightHide: function (axisHighlight,a) {
            var fill_color,selection,font_weight;
            if(PykCharts['boolean'](options.axis_onhover_highlight_enable)/* && options.mode === "default"*/){
                if(axisHighlight === options.selector + " .y.axis") {
                    selection = axisHighlight+" .tick text";
                    fill_color = options.axis_y_pointer_color;
                    font_weight = options.axis_y_pointer_weight;
                } else if(axisHighlight === options.selector + " .x.axis") {
                    selection = axisHighlight+" .tick text";
                    fill_color = options.axis_x_pointer_color;
                    font_weight = options.axis_x_pointer_weight;
                } else if(axisHighlight === options.selector + " .axis-text" && a === "column") {
                    selection = axisHighlight;
                    fill_color = options.axis_x_pointer_color;
                    font_weight = options.axis_x_pointer_weight;
                } else if(axisHighlight === options.selector + " .axis-text" && a === "bar") {
                    selection = axisHighlight;
                    fill_color = options.axis_y_pointer_color;
                    font_weight = options.axis_y_pointer_weight;
                }
                d3.selectAll(selection)
                    .style({
                        "fill" : fill_color,
                        "font-weight" : font_weight
                    });
            }

            return this;
        },
        highlight: function (selectedclass, that, has_svg_element_as_container) {
            var t = d3.select(that);
            d3.selectAll(selectedclass)
                .attr("fill-opacity", function(d,i) {
                    return (d.children && has_svg_element_as_container) ? 0 : 0.5;
                });
            t.attr("fill-opacity",1);
            return this;
        },
        highlightHide: function (selectedclass) {
            d3.selectAll(selectedclass)
                .attr("fill-opacity",function (d,i) {
                    return d3.select(this).attr("data-fill-opacity");
                });
            return this;
        },
        highlightGroup: function (selectedclass, that, element) {
            var t = d3.select(that);

            var group = d3.selectAll(selectedclass);

                group.selectAll(element)
                    .attr("fill-opacity",.5)

            t.selectAll(element).attr("fill-opacity",1);

            return this;
        },
        highlightGroupHide : function (selectedclass,element) {
            d3.selectAll(selectedclass+" "+element)
                .attr("fill-opacity",function (d,i) {
                    return d3.select(this).attr("data-fill-opacity");
                });
            return this;
        }
    };
    return action;
};

configuration.fillChart = function (options,theme,config) {
    var that = this;
    var fillchart = {
        selectColor: function (d) {
            theme = new PykCharts.Configuration.Theme({});
            if(options.color_mode === "color") {
                if(d.name.toLowerCase() === options.highlight.toLowerCase()) {
                    return options.highlight_color;
                } else if (options.chart_color.length && options.chart_color[0]){
                    return options.chart_color[0];
                } else {
                    return theme.stylesheet.chart_color
                }
            } else {
                return d.color;
            }
        },
        colorChart: function (d) {
            if(d.name === options.highlight) {
                return theme.stylesheet.highlight_color;
            } else{
                return theme.stylesheet.chart_color;
            }
        },
        colorPieW: function (d) {
            if(d.color) {
                return d.color;
            } else if(options.chart_color.length) {
                return options.color;
            }
            else return options.chart_color[0];
        },
        colorPieMS: function (d,chart_type) {
            if(chart_type !== "lineChart" && chart_type !== "areaChart" && d.name.toLowerCase() === options.highlight.toLowerCase()) {
                return options.highlight_color;
            } else if(options.color_mode === "saturation") {
                return options.saturation_color;
            } else if(options.color_mode === "color") {
                return d.color;
            }
        },
        colorGroup: function (d) {
            if(options.color_mode === "saturation") {
                return options.saturation_color;
            } else if(options.color_mode === "color") {
                return d.color;
            }
        },
        colorLegends: function (d) {
            if(options.color_mode === "saturation") {
                return options.saturation_color;
            } else if(options.color_mode === "color" && d) {
                return d;
            } else if(options.color_mode === "color"){
                return options.chart_color;
            } else {
                return options.chart_color[0];
            } return options.chart_color;
        }
    }
    return fillchart;
};

configuration.border = function (options) {
    var that = this;
    var border = {
        width: function () {
            return options.border_between_chart_elements_thickness +"px";
        },
        color: function () {
            return options.border_between_chart_elements_color;
        },
        style: function () {
            return options.border_between_chart_elements_style;
        }
    };
    return border;
};


configuration.transition = function (options) {
    var that = this;
    var transition = {
        duration: function() {
            if(options.mode === "default" && PykCharts['boolean'](options.transition_duration)) {
                return options.transition_duration * 1000;
            } else {
                return 0;
            }
        }
    };
    return transition;
};

configuration.renderBrush = function (options,xScale,group,height) {
    function resizeHandle (d) {
        var e = +(d == "e"), x = e ? 1 : -1, y = height / 3;
        return ("M" + (0.5 * x) + "," + y
                + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
                + "V" + (2 * y - 6)
                + "A6,6 0 0 " + e + " " + (0.5 * x) + "," + (2 * y)
                + "Z"
                + "M" + (2.5 * x) + "," + (y + 8)
                + "V" + (2 * y - 8)
                + "M" + (4.5 * x) + "," + (y + 8)
                + "V" + (2 * y - 8));

    }

    options.make_brush = d3.svg.brush().x(xScale)
           .on("brushend", brushend)

    var brush = group.append("g")
        .attr("class", "brush")
        .call(options.make_brush);

    brush.selectAll("rect")
      .attr("height",height)
      .attr("fill","blue")
      .attr("fill-opacity",0.3);
    brush.selectAll(".resize").append("path").attr("d", resizeHandle)
            .attr("fill","#4C7190")
            .attr("stroke","#4C7190")
            .attr("stroke-width","1.5px");

    function brushend() {
        options.brush_extent = d3.event.target.extent();
        min = options.brush_extent[0];
        max = options.brush_extent[1];
        options.onBrush(xScale(min),xScale(max));
        console.log(xScale(min),xScale(max))
        return options.brush_extent;
    }
};

configuration.Theme = function(){
    var that = this;
    that.stylesheet = {
        "mode": "default",
        "selector": "",
        "interactive_enable": "no",
        "click_enable": "no",

        "chart_height": 430,
        "chart_width": 600,
        "chart_margin_top": 35,
        "chart_margin_right": 50,
        "chart_margin_bottom": 35,
        "chart_margin_left": 50,

        "title_text": "",
        "title_size": 2,
        "title_color": "#1D1D1D",
        "title_weight": "bold",
        "title_family": "'Helvetica Neue',Helvetica,Arial,sans-serif",

        "subtitle_size": 1,
        "subtitle_color": "black",
        "subtitle_weight": "normal",
        "subtitle_family": "'Helvetica Neue',Helvetica,Arial,sans-serif",

        "highlight": "",
        "highlight_color": "#08306b",
        "background_color": "transparent",
        "chart_color": ["#255AEE"],
        "saturation_color": "#255AEE",

        "border_between_chart_elements_thickness": 1,
        "border_between_chart_elements_color": "white",
        "border_between_chart_elements_style": "solid",

        "legends_enable": "yes",
        "legends_display": "horizontal",
        "legends_text_size": 11,
        "legends_text_color": "#1D1D1D",
        "legends_text_weight": "normal",
        "legends_text_family": "'Helvetica Neue',Helvetica,Arial,sans-serif",

        "label_size": 11,
        "label_color": "white",
        "label_weight": "normal",
        "label_family": "'Helvetica Neue',Helvetica,Arial,sans-serif",

        "pointer_overflow_enable": "yes",
        "pointer_thickness": 1,
        "pointer_weight": "normal",
        "pointer_size": 11,
        "pointer_color": "#1D1D1D",
        "pointer_family": "'Helvetica Neue',Helvetica,Arial,sans-serif",

        "export_enable": "no",

        "color_mode": "color",

        "axis_x_pointer_size": 11,
        "axis_x_pointer_family": "'Helvetica Neue',Helvetica,Arial,sans-serif",
        "axis_x_pointer_weight": "normal",
        "axis_x_pointer_color": "#1D1D1D",

        "axis_x_enable": "yes",

        "axis_x_title": "",
        "axis_x_title_size": 14,
        "axis_x_title_color": "#1D1D1D",
        "axis_x_title_weight": "bold",
        "axis_x_title_family": "'Helvetica Neue',Helvetica,Arial,sans-serif",

        "axis_x_position": "bottom",
        "axis_x_pointer_position": "bottom", //axis orient
        "axis_x_line_color": "#1D1D1D",
        "axis_x_no_of_axis_value": 5,
        "axis_x_pointer_length": 5,
        "axis_x_pointer_padding": 6,
        "axis_x_pointer_values": [],
        "axis_x_outer_pointer_length": 0,
        "axis_x_time_value_datatype":"",
        "axis_x_time_value_interval":0,
        "axisHighlight_x_data_format": "string",

        "loading_source": "<div class='PykCharts-loading'>loading...</div>",
        "loading_type": "css",

        "tooltip_enable": "yes",
        "tooltip_mode": "moving",

        "credit_my_site_name": "PykCharts",
        "credit_my_site_url": "http://www.pykcharts.com/",
        "chart_onhover_highlight_enable": "yes",
        "units_prefix": false,
        "units_suffix":false
    };

    that.functionality = {
        "real_time_charts_refresh_frequency": 0,
        "real_time_charts_last_updated_at_enable": "yes",
        "transition_duration": 0
    };

    that.oneDimensionalCharts = {
        "clubdata_enable": "yes",
        "clubdata_text": "Others",
        "clubdata_maximum_nodes": 5,
        "shade_color": "#255AEE",
        "pie_radius_percent": 70,
        "donut_radius_percent": 70,
        "donut_inner_radius_percent": 40,
        "donut_show_total_at_center": "yes",
        "donut_show_total_at_center_size": 24,
        "donut_show_total_at_center_color": "#1D1D1D",
        "donut_show_total_at_center_weight": "bold",
        "donut_show_total_at_center_family":"'Helvetica Neue',Helvetica,Arial,sans-serif",

        "funnel_rect_width": 100,
        "funnel_rect_height": 100,

        "percent_column_rect_width": 20,
        "percent_row_rect_height": 10,
    };

    that.otherCharts = {
        "pictograph_show_all_images": "yes",
        "pictograph_total_count_enable": "yes",
        "pictograph_current_count_enable": "yes",
        "pictograph_image_per_line": 3,
        "pictograph_image_width": 79,
        "pictograph_image_height": 66,
        "pictograph_current_count_size": 64,
        "pictograph_current_count_color": "#255aee",
        "pictograph_current_count_weight": "normal",
        "pictograph_current_count_family": "'Helvetica Neue',Helvetica,Arial,sans-serif",
        "pictograph_total_count_size": 64,
        "pictograph_total_count_color": "grey",
        "pictograph_total_count_weight": "normal",
        "pictograph_total_count_family": "'Helvetica Neue',Helvetica,Arial,sans-serif",
        "pictograph_units_per_image_text_size": 24,
        "pictograph_units_per_image_text_color": "grey",
        "pictograph_units_per_image_text_weight": "normal",
        "pictograph_units_per_image_text_family": "'Helvetica Neue',Helvetica,Arial,sans-serif"
    };

    that.multiDimensionalCharts = {

        "chart_grid_x_enable": "yes",
        "chart_grid_y_enable": "yes",
        "chart_grid_color":"#ddd",

        "axis_onhover_highlight_enable": "yes",

        "axis_y_pointer_size": 11,
        "axis_y_pointer_family": "'Helvetica Neue',Helvetica,Arial,sans-serif",
        "axis_y_pointer_weight": "normal",
        "axis_y_pointer_color": "#1D1D1D",
        "axis_y_enable": "yes",

        "axis_y_title": "",
        "axis_y_title_size": 14,
        "axis_y_title_color": "#1D1D1D",
        "axis_y_title_weight": "bold",
        "axis_y_title_family": "'Helvetica Neue',Helvetica,Arial,sans-serif",

        "axis_y_position": "left",
        "axis_y_pointer_position": "left",
        "axis_y_line_color": "#1D1D1D",
        "axis_y_no_of_axis_value": 5,
        "axis_y_pointer_length": 5,
        "axis_y_pointer_padding": 6,
        "axis_y_pointer_values": [],
        "axis_y_outer_pointer_length": 0,
        "axis_y_time_value_datatype":"",
        "axis_y_time_value_interval":0,
        "axis_y_data_format": "number",
        "variable_circle_size_enable": "yes",

        "crosshair_enable": "yes",
        "zoom_enable": "no",
        "zoom_level": 3,

        "spiderweb_outer_radius_percent": 100,

        "scatterplot_radius": 20,
        "scatterplot_pointer_enable": "no",

        "curvy_lines_enable": "no",

        "annotation_enable": "no",
        "annotation_view_mode": "onload", // "onload" / "onclick"

        "annotation_background_color" : "#C2CBCF", /*"#EEEEEE"*/
        "annotation_font_color" : "black",
        "legends_mode":"default", // or interactive
        "expand_group": "yes",
        "data_mode_enable" : "no",
        "data_mode_legends_color" : "black",
        "data_mode_default" : "percentage",
        "connecting_lines_color" : "#ddd",
        "connecting_lines_style": "solid",
        "text_between_steps_color": "#aaa",
        "text_between_steps_family": "'Helvetica Neue',Helvetica,Arial,sans-serif",
        "text_between_steps_size": 10,
        "text_between_steps_weight" : "normal",
        "data_mode_enable" : "no",
        "data_mode_legends_color" : "black",
        "data_mode_default" : "percentage",
        "connecting_lines_color" : "#ddd",
        "connecting_lines_style": "solid",

        "data_sort_enable": "yes",
        "data_sort_type": "alphabetically", // sort type --- "alphabetically" / "numerically" / "date"
        "data_sort_order": "ascending", // sort order --- "descending" / "ascending"
        "calculate_total": "yes",
        "axis_y_background_color": "transparent"
    };

    that.treeCharts = {
        "zoom_enable": "no",
        "nodeRadius": 4.5
    };

    that.mapsTheme = {
        "total_no_of_colors": 3,
        "palette_color": "Blue-1",

        "tooltip_position_top": 0,
        "tooltip_position_left": 0,

        "timeline_duration": 1,
        "timeline_margin_top": 5,
        "timeline_margin_right": 25,
        "timeline_margin_bottom": 25,
        "timeline_margin_left": 45,

        "label_enable": "no",
        "click_enable": "yes",

        "chart_onhover_effect": "shadow"
    };
    return that;
}
