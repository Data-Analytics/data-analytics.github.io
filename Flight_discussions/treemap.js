var width = 960,
    height = 500;

var svg = d3.select(".treemap").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("xmlns", 'http://www.w3.org/2000/svg')
        .attr("xlink", 'http://www.w3.org/1999/xlink')
        .attr("version", '1.1');
 
function onRender() {   

     var group_by = document.getElementById("options_view").value,
         reply = document.getElementById("reply").value;
     console.log(group_by,reply)     
     d3.select('.treemap').select("svg")
       .remove();

    var svg = d3.select(".treemap").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("xmlns", 'http://www.w3.org/2000/svg')
        .attr("xlink", 'http://www.w3.org/1999/xlink')
        .attr("version", '1.1');
        

    
    d3.csv("data.csv", function(datas_csv) {
    
         datas_csv.forEach(function(o) {
		  
		  o.sentiment_score	= Math.abs(o.sentiment_score)
          o.is_reply = parseInt(o.is_reply);
          o.Reservations_Upgrades = parseInt(o.Reservations_Upgrades);
          o.Reservations_Frequent_Flyer = parseInt(o.Reservations_Frequent_Flyer);
          o.Reservations_seats = parseInt(o.Reservations_seats);
          o.Pre_Booking_price = parseInt(o.Pre_Booking_price);
          o.Pre_Booking_connectivity = parseInt(o.Pre_Booking_connectivity);
          o.Check_in_security = parseInt(o.Check_in_security);
          o.Check_in_checkin = parseInt(o.Check_in_checkin);
          o.In_Flight_meal = parseInt(o.In_Flight_meal);
          o.In_Flight_Entertainment = parseInt(o.In_Flight_Entertainment);
          o.In_Flight_crew = parseInt(o.In_Flight_crew);
          o.Post_Flight_baggage = parseInt(o.Post_Flight_baggage);
          o.Post_Flight_delay = parseInt(o.Post_Flight_delay);	
		  
          });
		  
	  var treemap = d3.layout.treemap()
        .padding(0.5)
        .size([width, height])
        .sticky(true)
        .value(function(d) {return d.sentiment_score;})
        .children(function(d) {return d.values;});
          
           var points = [];
                $('#options_view :selected').each(function(i, selected){
                    points[i] = $(selected).val();
                });
			
            var reply = document.getElementById("reply").value;
			
			if (reply ==0)
			{
				var reply_list = [0]
			}
			else if (reply ==1)
			{
				var reply_list = [1]
			} 
			else
			{
			var reply_list = [0,1]	
			}
			
			_.each(datas_csv, function(d, i) {
			total = 0;
			_.each(points, function(e, j) {
			total = total+d[points[j]]
			});
			datas_csv[i]['filter_column'] = total
			});
 
			console.log(datas_csv);
			
			data_csv=[];
			_.each(datas_csv, function(d) { if(_.contains(reply_list, d.is_reply)) { data_csv.push(d);}});     
		    data_csv = _.filter(data_csv, function(datas){ return datas['filter_column'] =='1'; }) 
		
        data_root = {"key":"treemap"};
        
        var nest = d3.nest()
        .key(function(d) { return  d['data_type']; })
        .entries(data_csv);
        
    data_root["values"] = nest

  var cell = svg.data([data_root]).selectAll("g")
      .data(treemap.nodes)
    .enter().append("rect")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.dx; })
      .attr("height", function(d) { return d.dy; })
      .attr("data-title",function(d) { if (d.data_type=='positive') { return  '<p>User ID : '+d.User_ID+'</p><br/><p> sentiment_score : '+d.sentiment_score+'</p>' ; } else if (d.data_type='negative') { return  '<p>User ID : '+d.User_ID+'</p><br/><p> sentiment_score : -'+d.sentiment_score+'</p>' ; } })
      .attr("sub_link",function(d) { return d.User_ID+d.type ;})
      .attr("fill", function(d) { if (d.data_type=='positive') { return '#70FF00'} else if (d.data_type='negative') { return '#FF0000' } else { return '#F0FF00' }} )
      .style("stroke", '#fff')
      .style("stroke-width", 0.5);        

      $("rect").tooltip({container: '.treemap', html: true, placement:'top'});
      
    var lastsearch = '';
    var $box = {};
    
    function add_search(search, chart) {
      var $chart = $(chart);
      $(search).on('keypress, change, keyup', function() {
        var search = $(this).val();
        if (lastsearch != search) {
          lastsearch = search;
          var re = new RegExp(search, "i");
          $('rect', $chart).each(function(){
              $(this).css('opacity', re.test($(this).attr("sub_link")) ? '1.0': '0.1');
          });
        }
      });
    }

    add_search('.search', '.treemap');
    
        
        });

      }