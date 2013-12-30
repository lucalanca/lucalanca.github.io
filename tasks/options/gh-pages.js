/**
 * Watching for changes
 */
'use strict';

var config = require('../config');

module.exports = {
	options: {
		base: 'dist/',
		add: true,
		repo: 'https://github.com/lucalanca/init.git'
	},
	src: ['**/*']
};


	
