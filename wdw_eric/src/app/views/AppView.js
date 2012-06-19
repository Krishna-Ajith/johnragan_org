
define( function( require ) {
	
	var Backbone    = require('Backbone')
	  , Attraction  = require('Attraction')
	  , Attractions = require('Attractions')
	  , ListView    = require('AttractionsListView');
	
	var AppView = Backbone.View.extend({
		
		el: '#app-container',

        initialize: function() {
        	this.attractions = new Attractions( Attractions.createMocks() );
        	this.listView = new ListView( this.attractions );
        }
	});
	return AppView;
});