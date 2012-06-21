define([
	'Backbone',
	'Handlebars'
], function(Backbone, Handlebars) {

	var Attraction = Backbone.Model.extend({
		idAttribute: '_id',
		
	    defaults: {
	      fp: "FP"
	    }
	
	    , validate: function( attributes ){
	        if( 1==2 ){
	            return "1 cannot equal 2";
	        }
	    }
	
		url: function() {
			return 'api/attractions?id=' + this.get('_id');
		},
	
	    , initialize: function() {

	    }
	});
	
	return Attraction;
});