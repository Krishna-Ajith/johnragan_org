require.config( {
	paths : {
		text : '../vendors/require/plugins/text',
		$ : '../vendors/jquery/1.7.2/jquery.min',
		_ : '../vendors/underscore/underscore',
		Backbone : '../vendors/backbone/backbone',
		Handlebars : '../vendors/handlebars/handlebars',
		Templates : 'app/templates/templates',
		Attraction : 'app/models/attraction',
		Attractions : 'app/collections/Attractions',
		AttractionsListView : 'app/views/AttractionsListView',
		AppView : 'app/views/AppView'
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
		    //'tooltip' : ['$'],
			//'popover' : ['$', 'tooltip'],
		 }
});

require( ['$', 'AppView'], function( $, AppView ){
	// instantiate the AppView instance once the document is ready using jQueries
	// ready function $()
	$(function(){
		this.app = new AppView();
	})
} );