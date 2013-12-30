/**
 * RequireJS configuration
 */
require.config({

	// Initialize the application with the main application file
	deps: ['stickyKit', 'main'],

	paths: {
		jquery: '../components/jquery/jquery.min',
		stickyKit: '../components/sticky-kit/jquery.sticky-kit'
		// More additional paths here
	},

	shim: {
		// If you need to shim anything, put it here
        "stickyKit": ["jquery"]
   
	},

	// Prevent caching issues, by adding an additional URL argument
	urlArgs: 'bust=' + (new Date()).getDate()

});
