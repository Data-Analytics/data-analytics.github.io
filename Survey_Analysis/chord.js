var insights = [ {'question': 'Are you happy with your sex life?', 
                  'insight': '50% of respondents from metros are very happy with their sex life', 
                  'year': 2013, 'category': 'Metros' },
                 {'question': 'At what age did you have your first sexual encounter?', 
                  'insight': '72% of respondents from metros had their first sex between 18 to 25 years of their age',
                  'year': 2013, 'category': 'Metros'},
                 {'question': 'What is your favorite position? [MOST FAVOURITE]',
                  'insight': '59% respondent from towns prefer Man on top.',
                  'year':2013, 'category':'Towns',
                 },
                 {'question':'Are women as enthusiastic about sex as men are?',
                  'insight': '65% women respondent from towns are as enthusiastic about sex as men are',
                  'year':2013, 'category':'Towns',
                 },
                 {'question':'Do you expect your husband to be virgin?',
                  'insight': '74% women respondent expects their husband to be virgin',
                  'year':2013, 'category':'Gender',
                 },
                 {'question':'Do you expect your wife to be virgin?',
                  'insight': '77% male respondent expects their wife to be virgin' ,
                  'year':2013, 'category': 'Gender',
                 },
                 {'question': 'Do you give oral sex to your partner?',
                  'insight': '28% respondent from age group 26-35 always prefer oral sex with partner',
                  'year':2013, 'category': 'Age',
                 },
                 {'question': 'Do you make sure that your partner has an orgasm?',
                  'insight': '46% respondent makes sure that their partner has an orgasm',
                  'year':2013, 'category': 'Age',
                 },
                 {'question': 'What do you think of using condoms?',
                  'insight': '55% unmarried respondent considers condom a must use',
                  'year':2013, 'category':'Marital status',
                 },
                 {'question': 'What have you tried? [MULTIPLE RESPONSES POSSIBLE]',
                  'insight': '60% unmarried respondent have tried oral sex',
                  'year':2013, 'category': 'Marital status',
                 },
               ];

var width = 520,
    height = 520,
    outerRadius = Math.min(width, height) / 2 - 10,
    innerRadius = outerRadius - 24;

var formatPercent = d3.format(".1%");

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var layout = d3.layout.chord()
    .padding(.04)
    .sortSubgroups(d3.descending)
    .sortChords(d3.ascending);

var path = d3.svg.chord()
    .radius(innerRadius);

d3.csv("data.csv", function(data) {
  d3.csv("category.csv", function(category){
    d3.csv("answers.csv",function(answers){

    categories = _.uniq(_.pluck(category,"Category"));
    questions = _.uniq(_.pluck(data,"Questions"));
    years = _.uniq(_.pluck(data,"Year"));

    function drawChord(cat,q,year){

        d3.select("#questionHeading").text(q);

        d3.selectAll("svg").remove();

        var svg = d3.select("#chart").append("svg")
            .attr("width", width+200)
            .attr("height", height+200)
            .attr("preserveAspectRatio", "none")
          .append("g")
            .attr("id", "circle")
            .attr("transform", "translate(" + (width+200) / 2 + "," + (height+200) / 2 + ")");

        svg.append("circle")
            .attr("r", outerRadius);

        m = getMatrix(data,category,answers,categories,questions,cat,q,year);
        cities = m[0];
        matrix = m[1];
        totalSectors = m[2];
        tots = m[3];

      var insight_obj = _.findWhere(insights,{'question': q, 'year': Number(year), 'category': cat});
      

    if (_.size(_.compact(_.flatten(matrix))) == 0) {
      d3.select("#insights").append('h4').append('p').attr('class', 'text-warning').text('No Matching Data Found For Selection');
    }else {
      var totSum =  _.reduce(_.pluck(totalSectors,"value"),function(a,b){return parseInt(a)+parseInt(b)})

        
          layout.matrix(matrix);

          function mouseover(d, i) {
            chord.classed("fade1", function(p) {
              return p.source.index != i
                  && p.target.index != i;
            });
          }

          var group = svg.selectAll(".group")
              .data(layout.groups)
            .enter().append("g")
              .attr("class", "group")
              .attr("data-title",function(d,i){
                  return cities[i].name+":"+tots[i].value.toFixed(2)+"%";
             })
              .on("mouseover", mouseover);

            var groupPath = group.append("path")
                .attr("id", function(d, i) { return "group" + i; })
                .attr("d", arc)
                .style("fill", function(d, i) { return cities[i].color; });
                
              var groupText = group.append("foreignObject")
                .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
                .attr("dy", ".35em")
                .attr("width", 80)
                .attr("height", 80)
                .attr("text-anchor", function(d) {
                  return d.angle > Math.PI ? "start" : null;
                })
                .attr("transform", function(d) {
                  return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                      + "translate(" + (innerRadius + 32) + ")";
                })
                .append("xhtml:body")
                .append("p")

                .text(function(d,i) { return cities[i].name; });

          // Add the chords.
          var chord = svg.selectAll(".chord")
              .data(layout.chords)
            .enter().append("path")
              .attr("class", "chord")
              .style("fill", function(d) { return cities[d.source.index].color; })
              .style("stroke", function(d) { return cities[d.source.index].color; })
              .attr("d", path)
              .attr("data-title",function(d) {
                    t = _.filter(totalSectors,function(row){
                        return row["name"] == cities[d.target.index].name;
                    });
                    tot = (d.source.value/t[0].value)*100;
                    return cities[d.target.index].name
                        + " -> " + cities[d.source.index].name
                        + ": " + parseInt(d.source.value)
                        + ", " + tot.toFixed(2) + "%";

              });

        $(".group, .chord").tooltip({container: 'body', html: true, placement:'top'});
      }
    }

    function fillDropdown(id,list,filter,i){

      var filterDict = Object();
      filter = filter.forEach(function(val){
          filterDict[val] = 1;
      });

      $(id).each(function(){
        $(this).css('text-transform', 'capitalize');
        var s = "";
        list.forEach(function(q,index){
          if (q in filterDict){
            if(i){
              var str = "<option value="+q+">"+q.toLowerCase()+"</option>";
            } else {
              var str = "<option value="+index+">"+q.toLowerCase()+"</option>";
            }
            s = s+ str;
          }
        });
        $(this).html(s);
      });
    }

    var y = "2013";
    ques = _.uniq(_.pluck(_.filter(data,function(d){
              return d["Year"] == y;
    }),"Questions"));

    fillDropdown("#questions",questions,ques,false);
    fillDropdown("#year",years,years,true);
    fillDropdown("#categories",categories,categories,false);

    $("#year").val(y);
    
    d3.select('#pre_def_insight').selectAll('button').data(insights)
        .enter().append('button')
            .attr('class', 'btn btn-link pre-insight')
            .style('padding', '1px')
            .property('value', function(d) {return d['year']+'|||'+d['question']+'|||'+d['category'];})
            .text(function(d, i){ return ''+(i+1);})
            .on('click', function(e){
                          var btn_obj = d3.select(this);
                           var filter = btn_obj.property('value').split('|||');
                          d3.select('#pre_def_insight_val').property('value', this.value);
                          $("#year").val(filter[0]);
                          $("#year").trigger('change');
                          $("#questions").val(_.indexOf(questions, filter[1]));
                          $("#categories").val(_.indexOf(categories, filter[2]));
                          $("form").trigger("change");
                         });

    $("form").on("change",function(e,param1,param2,param3){
      d3.select('button.pre-insight').classed('active', function(d){ return (d==d3.select('#pre_def_insight_val').property('value')) ? true : false;})
      var q = questions[$("#questions").val()];
      var metro = categories[$("#categories").val()];
      var year = $("#year").val();

      drawChord(metro,q,year);
    });

    $("#year").on("change",function(){
      var year = this.value;
      ques = _.uniq(_.pluck(_.filter(data,function(d){
          return d["Year"] == year;
      }),"Questions"));
    
      fillDropdown("#questions",questions,ques,false);
    });

    $("form").trigger("change");

    });
  });
});

function getMatrix(data,category,answers,categories,questions,selectedCat,q,year) {

	var sectors = Array();
	var responses = Array();
	var responseVals = Array();
	var matrix = Array();


	category.forEach(function(obj){
		if(obj["Category"]==selectedCat){
			sectors.push(obj["Sector"]);
		}
	});

	var a = [];

	data.forEach(function(obj){
		if((obj["Questions"]==q) && (obj["Year"]==year)){

			a.push(obj["Answers"]);
			qs = _.filter(answers,function(d,i){
				return (d["Answers"] == obj["Answers"]) && (d["Year"]==year);
			});
			a1 = sectors.map(function(val){
					return qs[0][val];
				});
			responses.push(obj["Response"]);
			var vals = Array();
			sectors.forEach(function(sector,index){
				var i = parseFloat(obj[sector]) || 0;
				vals.push(i*a1[index]/100);
			});
            responseVals.push(vals);

		}
	});
	a = _.uniq(a)[0];
	q = _.filter(answers,function(d,i){
		return ((d["Answers"] == a) && (d["Year"]==year));
	});
	a1 = sectors.map(function(val){
		return parseInt(q[0][val]) || 0;
	});

	var t = {"name":"Total","value":q[0]["Total"]};
	totalSectors = sectors.map(function(val,i){
		var d = Object();
		d["name"] = val;
		d["value"] = a1[i];
		return d;
	});

	var test = {};
	sectors.forEach(function(val){
		test[val] = 1;
	});
	if ("Total" in test){
		
	} else {
		totalSectors.splice(0,0,t);
	}

	nodes = responses.concat(sectors);
	zeroes = Array.apply(null, new Array(responses.length)).map(Number.prototype.valueOf,0)

	var pcs1 = [];
	var tots = _.reduce(responseVals.map(function(d){
		return _.reduce(d,function(a,b){return a+b});
	}),function(a,b){return a+b})

	nodes.forEach(function(node,index){
		if(index<responses.length){
			r = responseVals[index];
			var pcs = {}
			pcs["name"] = nodes[index]
			pcs["value"] = _.reduce(r,function(a,b){return a+b});
			pcs["value"] = (100 * pcs["value"]/tots) || 0;
			pcs1.push(pcs);
			matrix.push(zeroes.concat(r));
		} else{
			sectorVal = responseVals.map(function(obj){
				return obj[index-responseVals.length]
			});
			var pcs = {}
			pcs["name"] = node
			pcs["value"] = _.reduce(sectorVal,function(a,b){return a+b});
            pcs["value"] = (100 * pcs["value"]/_.reduce(a1,function(a,b){return a+b})) || 0;
			pcs1.push(pcs);
			zeros = Array.apply(null, new Array(nodes.length-responseVals.length)).map(Number.prototype.valueOf,0)
			matrix.push(sectorVal.concat(zeros));
		}

	});

	var colorResponses = ['#00441b','#006d2c','#238b45','#41ab5d','#41ae76','#66c2a4','#99d8c9','#ccece6','#e5f5f9','#f7fcfd'];
    
	nodes = nodes.map(function(val,index){
		if (index < responses.length){
			return {name:val,color:colorResponses[index]}
		} else{
			return {name:val,color:"#014636"}
		}
	});

	return [nodes,matrix,totalSectors,pcs1];

}

