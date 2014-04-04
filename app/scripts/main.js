$.fn.redraw = function(){
  $(this).each(function(){
    var redraw = this.offsetHeight;
  });
  return this;
};

$(function() {
  $('.gallery-container').photosetGrid({
    // Set the gutter between columns and rows
    gutter: '5px',
    highresLinks: true,
    onComplete: function (elem) {
      $(elem).removeClass('loading');
    }
  });
});