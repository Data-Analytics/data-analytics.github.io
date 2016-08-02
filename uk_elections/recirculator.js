(function() {
  var numItems = 6

  var selections = d3.selectAll('.bbg-recirculator')

  var topic = 'graphics';
  if(window.location.pathname.split('/')[2] === 'feature' || window.location.pathname.split('/')[1] === 'features') {
    topic = 'features';
  }

  var template = _.template('\
    <style>\
    .bbg-recirculator {\
      margin: 32px auto !important;\
      max-width: 1160px;\
    }\
    .index-page__item {\
      padding: .5rem 1.25rem 1.25rem;\
    }\
    .label-and-timestamp{\
      margin-top: 5px;\
    }\
    @media screen and (min-width: 63.75em) and (max-width: 79.9375em) {\
      .bbg-recirculator {\
        margin: 32px auto !important;\
        width: 62rem;\
      }\
    }\
    @media screen and (max-width: 47.4375em) and (min-width: 40.4376em){\
      .index-page__item:first-child {\
        height: 33.125rem;\
        width: 100%;\
      }\
    }\
    @media screen and (max-width: 40.4375em) and (min-width: 0){\
      .index-page__item:first-child {\
        height: 29.125rem;\
        width: 100%;\
      }\
    }\
    </style>\
    <div class="label-and-timestamp">\
      <time class="published-at" datetime="<%= publishedAt %>"><%= d3.time.format("%b %d, %Y")(new Date(publishedAt)) %></time>\
    </div>\
    <h2 class="index-page__headline">\
      <a href="<%= url %>" data-resource-type="interactive" data-resource-id="<%= id %>" class="index-page__headline-link"><%= headline %></a>\
    </h2>\
    <div class="index-page__image-container share-arrow">\
      <a href="<%= url %>" data-resource-type="interactive" data-resource-id="<%= id %>" class="index-page__image-link">\
        <div class="index-page__image" style="background-image:url(<%= attachments.image[metadata.thumbnail].images["488x-1"].url[0] %>)" alt=""></div>\
      </a>\
    </div>\
  ')

    var link   = document.createElement('link')
    link.type  = 'text/css'
    link.rel   = 'stylesheet'
    link.href  = '//www.bloomberg.com/graphics/assets/css/application.css'
    document.head.insertBefore(link, document.head.firstChild)


  if (!isTerminal && selections.size() > 0) {
    d3.json('//www.bloomberg.com/api/topics/' + topic, function(error, data) {
      if (error) {
        throw(error)
      }

    var items = d3.shuffle(data.items).filter(function(d) {
      return d.url !== location.href && d.credits.hasOwnProperty('author') && d.metadata && d.metadata.thumbnail
    }).slice(0, numItems)

      var el = selections
        .selectAll('.link')
        .data(items)
        .enter()
          .append('li')
          .attr('class', 'index-page__item type-interactive site-bbiz')
          .html(template)
    })
  }

})()
