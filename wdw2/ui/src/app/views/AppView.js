define( function( require ) {
	
	var Underscore = require('_'),
	  Backbone    = require('Backbone')
	  , Attraction  = require('Attraction')
	  , Attractions = require('Attractions')
	  , AttractionsListView = require('AttractionsListView');
	
	var AppView = Backbone.View.extend({
		
		el: '#app-container',

        initialize: function() {
        	this.attractions = new Attractions( Attractions.createMocks() );
        	this.attractionsListView = new AttractionsListView( this.attractions );
        }
	});
	return AppView;
});