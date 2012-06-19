
// Define our dependencies by specifying an alias 'name' as a key
// and the path of the dependency as the value. Typically, the aliases
// are the exact same name as the values exported from a library or
// module
require.config({
	paths : {
	    text         		: '../vendor/require/plugins/text'
	  , $            		: '../vendor/jquery/1.7.2/jquery.min'
	  , _            		: '../vendor/lodash/1.3.3/lodash.min'
	  , Backbone     		: '../vendor/backbone/0.9.2/backbone.min'
	  , Handlebars   		: '../vendor/handlebars/1.0.5/handlebars'
	  , popover             : '../vendor/bootstrap/2.0.4/plugins/bootstrap-popover'
	  , tooltip             : '../vendor/bootstrap/2.0.4/plugins/bootstrap-tooltip'
	  , tpl          		: 'app/templates'
	  , Templates    		: 'app/templates/Templates'
	  , AppView				: 'app/views/AppView'
	  , Attraction   		: 'app/models/Attraction'
	  , Attractions         : 'app/collections/Attractions'
	  , AttractionsListView : 'app/views/AttractionsListView'
   }, 
   // Define libraries which are to have their globals removed from 
   // the window object and made available as modules via require/define
   shim: {
		'$': {
	        exports: '$'
	    }, 
		'_': {
	        exports: '_'
	    }, 
	    'Handlebars' : {
	    	exports: 'Handlebars'
	    },
	    'Backbone': {
	    	// define dependencies needed by the shim (if any) ...
	        deps: ['_', '$'],
	        exports: 'Backbone'
	    },
	    // add bootstrap dependencies here 
	    'tooltip' : ['$'],
		'popover' : ['$', 'tooltip'],
	 }
});

// Initialize the app with an initial require call, whereby we simply require
// jQuery and the AppView, and instantiate the AppView instance once the document
// has been loaded.
require( ['$', 'AppView'], function( $, AppView ){
	// instantiate the AppView instance once the document is ready using jQueries
	// ready function $()
	$(function(){
		this.app = new AppView();
	})
} );