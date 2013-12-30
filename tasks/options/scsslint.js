/**
 * Watching for changes
 */
'use strict';

var config = require('../config');

module.exports = {
	allFiles: [ 'scss/**/*.scss'],
	options: {
		config: 'scsslint-config.yml',
		reporterOutput: 'scss-lint-report.xml'
	}
};


	

	// 'gh-pages': {
	// 	options: {
	// 		base: 'dist',
	// 		add: true,
	// 		repo: 'https://github.com/lucalanca/init.git'
	// 	},
	// 	src: ['**']
	// }