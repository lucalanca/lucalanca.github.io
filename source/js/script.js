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


  $('#auth').click(function(e){
    auth(true);
  });
});

function auth(redirect = false){
  var statesdemo = {
      state0: {
        title: 'Authentication',
        html:'<label>password <input type="password" name="password" value=""></label>',
        buttons: { Next: 1 },
        focus: "input[name='password']",
        submit:function(e,v,m,f){ 
          console.log(f);
          if(f.password === 'vicepresident'){
            window.location = 'thesis-admin.html';
          }
          e.preventDefault();
        }
      }
    };

    $.prompt(statesdemo);
    
    e.preventDefault();
    e.stopPropagation();
    return false;
}

