// JPR - This seems to repeat what is config.js, but also adds require
/*
 * Defines all external 3rd-party libraries and application specific module 
 * dependencies. This configuration is shared by both the appas well as the
 * spec runner.
 */
// JPR - it looks to me with all the directory subnesting and so forth, you can specify the
// js file (without the .js extension) in this array, and then in later calls to 'define',
// refer to them by their handles on the left instead of the full path on right.  Correct?
require.config( {
	paths : {
	    loader        	  : '../vendor/loader',
    	text       		    : '../vendor/require/text',
    	order      		    : '../vendor/require/order',
	    jQuery         	  : '../vendor/jquery/jquery',
	    Underscore    	  : '../vendor/underscore/underscore',
	    Backbone      	  : '../vendor/backbone/backbone',
	    Handlebars        : '../vendor/handlebars/handlebars',
	    Movie 	  		    : 'app/models/Movie',
	    Movies            : 'app/collections/Movies',
	    MovieListView 	  : 'app/views/MovieListView',
	    MovieView 	      : 'app/views/MovieView',
	    ApplicationView   : 'app/views/ApplicationView',
	    LoadStatusView    : 'app/views/LoadStatusView',
	    ApplicationRouter : 'app/routers/ApplicationRouter',
	    MoviesHelper      : 'app/helpers/MoviesHelper',
	    MovieTemplate     : 'app/templates/movie.tpl'
	}
});

/*
 * Initializes the bootstrap loaders which ensure that all module dependencies
 * are properly loaded before the Application is initialized. Note that the
 * first argument passed to the require call is 'order!loader' - this simply
 * means that the RequireJS order plugin is being used to ensure proper load
 * order.
 */
// JPR - I do not see 'order!loader' below as stated above; except in loader.js
// JPR - So loader will load what is in loader.js, we get the HandlerbarsHelper
// and then we get the node App.js, which itself includes jQuery and includes it itself.  However,
// none of the other items in the config above are included
require( [ 'loader', 'app/templates/HandlebarsHelper', 'app/App' ] );