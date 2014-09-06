/*jslint browser: true */
/*global require: true, requirejs: true, $: true */

(function(){
    'use strict';

    /*
      This is how you should require a component:
      make sure `mycomponent` in the require-config situated in layout/layout.jade
     */

      require(['project'], function () {
          console.log('mycomponent is loaded');
      });


})();

