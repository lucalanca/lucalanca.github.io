/**
 * Module Description
 *
 * @author Author Name
 * @date 2013-01-01
 */

require([
	// Require the modules
	'jquery',
	//'modules/module',
	'stickyKit'
	
], function ($, module) {
	'use strict';

	$('.stick-in-parent').stick_in_parent(); // jshint ignore:line
	console.log(module);
});
