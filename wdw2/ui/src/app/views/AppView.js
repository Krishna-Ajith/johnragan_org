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
        	this.attractionsListView = new AttractionsListView( {model: this.attractions, el: '#attractions_list_container'} ).render();

			this.attraction = Attractions.createMocks()[0];
        	this.attractionView = new AttractionView( {model: this.attraction, el: '#attraction_container'} ).render();
        }
	});
	return AppView;
});