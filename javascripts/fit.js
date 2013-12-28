/*  Shrinks text size of all <text> elements after a <rect>
    to the <rect> size.

    Example:
        fitText('.treemap');
*/
(function(window, undefined) {

var fit = window.fit = {};

fit.text = function(selector, minScale) {
    if (typeof minScale == 'undefined') { minScale = 0; }
    $('rect', selector).each(function() {
        var $this = $(this);
        var width = +$this.attr('width') - 2;
        var height = +$this.attr('height') - 2;
        var text = $this.next();
        if (!text.get().length) {
            return;
        }
        var bbox = text.get(0).getBBox();
        var scale = 1;
        if (bbox.width > scale * width) {
            scale = scale * width / bbox.width;
        }
        if (scale * bbox.height > height) {
            scale = scale * height / bbox.height;
        }
        var oldFontSize = text.attr('font-size');
        var fontSize = oldFontSize ?
            oldFontSize.replace(/[\d\.]+/, function($0) { return scale * $0; }) :
            (100 * scale) + '%';

        if (scale < minScale) {
            text.hide();
        } else {
            text.attr('font-size', fontSize);
        }
    });
};

})(window);