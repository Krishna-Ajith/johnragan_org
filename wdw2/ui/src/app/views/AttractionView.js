define(['Backbone', 'Templates', 'popover'], function( Backbone, Templates, Popover )
{
    var AttractionView = Backbone.View.extend({
    	
    	//el: '#attraction_container',
    	
    	template: Templates.attractionTemplate(),
    	
        initialize : function(attraction){
        	this.attraction = this.options.model;
            this.render();
        },
        
        render : function(){
            this.$el.html( this.template({
                'attraction' : this.attraction.toJSON()
            }));
            $('.summary_popover').popover({ html : true });
            return this;
        },

		output : function() {
			return this.template({
                'attraction' : this.attraction.toJSON()
            });
		}
    });
    return AttractionView;
});