'use strict';

var resultsBar = d3.select('#results-bar');
var map = d3.select('#map');
var parties = d3.select('#parties');
var stream = d3.select('#stream');
var constituency = d3.select('#constituency');
var search = d3.select('#search');

resultsBarView(resultsBar)
mapCartogramView(map)
partiesView(parties)
streamView(stream)
searchView(search)

var cv = constituencyView(constituency)

dispatch.on('ready.selectedCView', selectConstituency)
dispatch.on('dataChange.selectedCView', renderConstituency)
dispatch.on('stateChange.selectedCView', selectConstituency)

function renderConstituency() {
  var c = state.selected.constituencies.singleValue()
  if (c) {
    cv.render()
  }
}

function selectConstituency() {
  var c = state.selected.constituencies.singleValue()

  if (c) {
    c = data.idx.constituencyById[c]
    cv.constituency(c).render()

    d3.selectAll('.uk-election-graphic').style('z-index',0)
    d3.select('#constituency').style('min-height', function() {
      var parent = d3.select(d3.selectAll('#constituency').node().parentElement)
      return parent.style('height')
    })
    .style('z-index',1)

    constituency.style('opacity',1)
  }else{

    d3.selectAll('.uk-election-graphic').style('z-index',0)
    d3.select('#constituency').style('z-index',-1)
    constituency.style('opacity',0)
  }
}

var tabs = d3.selectAll('.home-tabs div').data([2015, 2010])

tabs.on('click', function(d) {
  state.setBundle(d)
})

dispatch.on('ready.home-tabs', function() {
  tabs.classed('active', function(d) {
    return d == data.id
  })
})

d3.selectAll('#twitter-widget-0').style({
  margin: '0 auto',
  display: 'block'
})


electionApp();

window.onresize = _.debounce(function(){
  d3.selectAll('#twitter-widget-0').style({
    margin: '0 auto',
    display: 'block'
  })
},250)

