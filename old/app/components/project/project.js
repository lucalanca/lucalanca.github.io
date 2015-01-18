define(['jquery', 'waypoints'], function($){
  'use strict';
  var $project = $('.project')
  $project.waypoint(function (direction) {
    $(this).addClass('js-is-within-viewport');
  }, { offset: '60%' });

  $('.center-project').click(function (evt) {
    $(this).closest('.project').toggleClass('js-is-focused-image');
    evt.preventDefault();
    return false;
  })
});
