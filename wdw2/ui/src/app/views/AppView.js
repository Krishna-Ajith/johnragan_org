define( function( require ) {
	
	var Backbone    = require('Backbone')
	  , Attractions = require('Attractions')
	  , Attraction = require('Attraction')
	  , AttractionsListView = require('AttractionsListView')
	  , AttractionView = require('AttractionView');
	
	var AppView = Backbone.View.extend({
		
		el: '#app-container',

        initialize: function() {
        	this.attractions = new Attractions( Attractions.createMocks() );
        	this.attractionsListView = new AttractionsListView( this.attractions );

			this.attraction = Attractions.createMocks()[0];
        	this.attractionView = new AttractionView( this.attraction );
        }
	});
	return AppView;
});