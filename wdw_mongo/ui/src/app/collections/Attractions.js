define( ['Backbone', 'Attraction'], function( Backbone, Attraction ) {
	return Backbone.Collection.extend({
		url: 'api/attractions',
		
	    model: Attraction,
	
		removeAttractions: function() {
        	this.each( function( attraction ) {
				attraction.destroy();
        	});
        	return false;
        },
	});
});
