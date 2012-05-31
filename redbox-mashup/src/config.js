// JPR - This seems to repeat what is main.js, but does not add require
/*
 * Defines all external 3rd-party libraries and application specific 
 * module dependencies. This configuration is shared by both the app
 * as well as the spec runner.
 */
var require = {
	paths : {
	    vendor            : '../vendor/',
	    loader        	  : '../vendor/loader',
    	text       		    : '../vendor/require/text',
    	order      		    : '../vendor/require/order',
	    jQuery         	  : '../vendor/jquery/jquery',
	    Underscore    	  : '../vendor/underscore/underscore',
	    Backbone      	  : '../vendor/backbone/backbone',
	    Handlebars        : '../vendor/handlebars/handlebars',
	    Application   	  : 'app/App',
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
};
