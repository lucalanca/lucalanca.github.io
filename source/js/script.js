$(function() {
  lazyLoading();
});

lazyLoading = function(){
  var loading = $(".loading");
  if(loading.size() > 0) {
    $(loading).next().hide();
  }  
};
    

$(window).load( function(){
  var loading = $(".loading");
  if(loading.size() > 0) {
    $(loading).fadeOut(function(){
      $(loading).next().fadeIn();
      console.log('fully loaded');
      $('.gallery').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 499,
        itemMargin: 0,
        animationLoop: false,
        smoothHeight: true,
        video: true,
        slideshow: false,
      });
    });
    
    
  }  
}); 

