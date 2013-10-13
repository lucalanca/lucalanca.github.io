/*global define */
define(['naver'], function () {
    'use strict';

    console.log('naver is defined');
    $('nav').naver({
	    animated: true,
	    label: false
	});

    return '\'Allo \'Allo!';
});