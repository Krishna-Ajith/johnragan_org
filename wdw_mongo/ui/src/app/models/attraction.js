define(['Backbone'], function(Backbone) {

	var Attraction = Backbone.Model.extend({
		idAttribute: '_id',
	
	    /*validate: function( attributes ){
	        if( 1==2 ){
	            return "1 cannot equal 2";
	        }
	    },*/
	
		url: function() {
			return 'api/attractions?id=' + this.get('_id');
		},
	});
	
	return Attraction;
});