
define( ['Backbone'], function( Backbone ) 
{
	var Attraction = Backbone.Model.extend({
	    defaults: {
	      fp: "FP"
	    }
	    , validate: function( attributes ){
	        if( 1==2 ){
	            return "1 cannot equal 2";
	        }
	    }
	    , initialize: function() {
	      
	    }
	});
	return Attraction;
});