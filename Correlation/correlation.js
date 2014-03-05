window.onload=function(){

  var load_all = function(){
    d3.csv('data.csv', function(data){
  
      var label_col_full = Object.keys(data[0]);
      var label_row = [];
      var rows = [];
      var row = [];
      for(var i = 0; i < data.length; i++){
        label_row.push(data[i][label_col_full[0]]);
        row = [];
        for(var j = 1; j < label_col_full.length; j++){
          row.push(parseFloat(data[i][label_col_full[j]]));
        }
        rows.push(row);
      }
      d3.select("svg").remove();
        main(rows, label_col_full.slice(1), label_row);
    });
  };
  
  load_all(); 

};

var main = function(corr, label_col, label_row){

  var transition_time = 1500;

  var body = d3.select('#chart');

  var svg = body.append('svg')
    .attr('width', 960)
    .attr('height', 400);

  var sort_process = d3.select("select#sort_func")[0][0].value;
  d3.select("select#sort_func").on("change", function() {
      sort_process = this.value;
      reorder_matrix(last_k, last_what);
  });


  var row = corr;
  var col = d3.transpose(corr);

  var indexify = function(mat){
      var res = [];
      for(var i = 0; i < mat.length; i++){
          for(var j = 0; j < mat[0].length; j++){
              res.push({i:i, j:j, val:mat[i][j]});
          }
      }
      return res;
  };

  var corr_data = indexify(corr);
  var order_col = d3.range(label_col.length + 1);
  var order_row = d3.range(label_row.length + 1);

  var color = d3.scale.linear()
      .domain([-1,0,1])
      .range(['red','yellow','green']);

  var scale = d3.scale.linear()
      .domain([0, d3.min([50, d3.max([label_col.length, label_row.length, 4])])])
      .range([0,  540]);

  
  var left_label_space = 170;
  var up_label_space = 80;


  var matrix = svg.append('g')
      .attr('class','matrix')
      .attr('transform', 'translate(' + (left_label_space + 10) + ',' + (up_label_space + 10) + ')');

  var pixel = matrix.selectAll('rect.pixel').data(corr_data);

  // as of now, data not changable, only sortable
  pixel.enter()
      .append('rect')
          .attr('class', 'pixel')
          .attr('width', scale(0.9))
          .attr('height', scale(0.9))
          .attr('rx', scale(0.2))
          .attr('data-title',function(d){ return "<p class='left'>"+label_row[d.i]+'<br/>'+label_col[d.j]+'<br/>rate :'+d.val+'</p>'; })
          .style('stroke',function(d){ return d3.rgb(color(d.val)).darker();})
          .style('fill',function(d){ return color(d.val);});
    
    $("rect").tooltip({container: 'body', html: true, placement:'top'});  
  tick_col = svg.append('g')
      .attr('class','ticks')
      .attr('transform', 'translate(' + (left_label_space + 10) + ',' + (up_label_space) + ')')
      .selectAll('text.tick')
      .data(label_col);

  tick_col.enter()
      .append('text')
          .attr('class','tick')
          .style('text-anchor', 'start')
          .attr('transform', function(d, i){return 'rotate(270 ' + scale(order_col[i] + 0.7) + ',0)';})
          .attr('font-size', scale(0.8))
          .text(function(d){ return d; })
          .on('click', function(d, i){reorder_matrix(i, 'col');});

  tick_row = svg.append('g')
      .attr('class','ticks')
      .attr('transform', 'translate(' + (left_label_space) + ',' + (up_label_space + 10) + ')')
      .selectAll('text.tick')
      .data(label_row);

  tick_row.enter()
      .append('text')
          .attr('class','tick')
          .style('text-anchor', 'end')
          .attr('font-size', scale(0.8))
          .text(function(d){ return d; })
          .on('click', function(d, i){reorder_matrix(i, 'row');});


  var refresh_order = function(){
      tick_col.transition()
          .duration(transition_time)
              .attr('transform', function(d, i){return 'rotate(270 ' + scale(order_col[i] + 0.7) + ',0)';})
              .attr('x', function(d, i){return scale(order_col[i] + 0.7);});

      tick_row.transition()
          .duration(transition_time)
              .attr('y', function(d, i){return scale(order_row[i] + 0.7);});

      pixel.transition()
          .duration(transition_time)
              .attr('y', function(d){return scale(order_row[d.i]);})
              .attr('x', function(d){return scale(order_col[d.j]);});
  };

  refresh_order();

  var last_k = 0;
  var last_what = 'col';
  var reorder_matrix = function(k, what){
      last_k = k;
      last_what = what;
      var order = [];
      var vec = [];
      var labels = [];
      var vecs = [];
      if(what === 'row'){  //yes, we are sorting counterpart
          vec = row[k];
          vecs = row;
          labels = label_col;  //test is if it ok
      } else if ( what === 'col' ) {
          vec = col[k];
          vecs = col;
          labels = label_row;
      }
      var indices = d3.range(vec.length);
      switch (sort_process) {
        case "value":
          indices = indices.sort(function(a,b){return vec[b] - vec[a];});
          break;
        case "abs_value":
          indices = indices.sort(function(a,b){return Math.abs(vec[b]) - Math.abs(vec[a]);});
          break;
        case "original":
          break;
        case "alphabetic":
          indices = indices.sort(function(a,b){return Number(labels[a] > labels[b]) - 0.5;});
          break;
        case "similarity":
          // Ugly, but sometimes we want to sort the coordinate we have clicked
          // Also, as of now with no normalization etc
          indices = d3.range(vecs.length);
          indices = indices.sort(function(a,b){
            var s = 0;
            for(var i = 0; i < vec.length; i++){
              s += (vecs[b][i] - vecs[a][i]) * vec[i];
            }
            return s;
          });
          if(what === 'col' || true){
              order_col = reverse_permutation(indices);
          } //not else if!
          if ( what === 'row' || true) {
              order_row = reverse_permutation(indices);
          }
          refresh_order();
          return undefined;
      }
      if(what === 'row' || true){
          order_col = reverse_permutation(indices);
      } //not else if!
      if ( what === 'col' || true) {
          order_row = reverse_permutation(indices);
      }
      refresh_order();
  };

  var reverse_permutation = function(vec){
      var res = [];
      for(var i = 0; i < vec.length; i++){
          res[vec[i]] = i;
      }
      return res;
  };

};