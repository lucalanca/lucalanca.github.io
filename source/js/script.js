$(function() {
	var h = $(document).height();
	console.log(h);
	$(window).resize(function() {
		var d = $(document).height();
		var w = $(window).height();
		$('footer').css({position : 'relative',bottom : '0'});
		if(w > d){
			// $('footer').css({position : 'relative',bottom : '0'});
		}
		console.log("w:"+w);
		console.log("d:"+d);
	});
});