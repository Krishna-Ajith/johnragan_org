define(['Backbone', 'Templates', 'popover'], function( Backbone, Templates, Popover )
{
    var AttractionsListView = Backbone.View.extend({
    	
    	el: '#attractions_list_container',
    	
    	template: Templates.attractionsTemplate(),
    	
        initialize : function(attractions){
        	this.attractions = attractions;
            this.render();
        },
        
        render : function(){
            this.$el.html( this.template({
                'myAttractions' : this.attractions.toJSON()
            }));
            $('.summary_popover').popover({ html : true });
            return this;
        }
    });
    return AttractionsListView;
});