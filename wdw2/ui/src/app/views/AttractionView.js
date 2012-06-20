define(['Backbone', 'Templates', 'popover'], function( Backbone, Templates, Popover )
{
	var htmlOutput = function(template, attraction) {
		return template({
            'attraction' : attraction.toJSON()
        });
	}
	
    var AttractionView = Backbone.View.extend({
    	
    	template: Templates.attractionTemplate(),
    	
        initialize : function(attraction){
        	this.attraction = this.options.model;
        },

		output : function() {
			return htmlOutput(this.template, this.attraction);
		},
		
		render : function(){
			Handlebars.registerPartial("attractionPartial", Templates.attractionPartialTemplate());
            this.$el.html( this.template({
                'attraction' : this.attraction.toJSON()
            }));
            $('.summary_popover').popover({ html : true });
            return this;
        }
    });
    return AttractionView;
});