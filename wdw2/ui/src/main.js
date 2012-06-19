require.config( {
	paths : {
		text : '../vendors/require/plugins/text',
		$ : '../vendors/jquery/1.7.2/jquery.min',
		_ : '../vendors/underscore/underscore',
		Backbone : '../vendors/backbone/backbone',
		Handlebars : '../vendors/handlebars/handlebars',
		Templates : 'app/templates/templates',
		
		tooltip : '../vendors/bootstrap/assets/js/bootstrap-tooltip',
	    popover : '../vendors/bootstrap/assets/js/bootstrap-popover',
		transition : '../vendors/bootstrap/assets/js/bootstrap-transition',
	    alert : '../vendors/bootstrap/assets/js/bootstrap-alert',
	    modal : '../vendors/bootstrap/assets/js/bootstrap-modal',
	    dropdown : '../vendors/bootstrap/assets/js/bootstrap-dropdown',
	    scrollspy : '../vendors/bootstrap/assets/js/bootstrap-scrollspy',
	    tab : '../vendors/bootstrap/assets/js/bootstrap-tab',
	    button : '../vendors/bootstrap/assets/js/bootstrap-button',
	    collapse : '../vendors/bootstrap/assets/js/bootstrap-collapse',
	    carousel : '../vendors/bootstrap/assets/js/bootstrap-carousel',
	    typeahead : '../vendors/bootstrap/assets/js/bootstrap-typeahead',
	
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
		    'tooltip' : ['$'],
			'popover' : ['$', 'tooltip'],
			'transtion' : ['$'],
			'alert' : ['$'],
			'modal' : ['$'],
			'dropdown' : ['$'],
			'scrollspy' : ['$'],
			'tab' : ['$'],
			'button' : ['$'],
			'collapse' : ['$'],
			'carousel' : ['$'],
			'typeahead' : ['$']
		 }
});

require( ['$', 'AppView'], function( $, AppView ){
	// instantiate the AppView instance once the document is ready using jQueries
	// ready function $()
	$(function(){
		this.app = new AppView();
	})
} );