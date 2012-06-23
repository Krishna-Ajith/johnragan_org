define(['Backbone', 'Templates'], function( Backbone, Templates )
{
	var AttractionActionsModalView = Backbone.View.extend({
    	
    	template: Templates.attractionActionsModal(),
    	
        initialize : function(){
			if (this.options.el) {
				this.el = this.options.el;
			}
        },

		render : function(){
			Handlebars.registerPartial("attractionActionsAddEditPartial", Templates.attractionActionsAddEditPartialTemplate());
			
            this.$el.html( this.template({
            }));
            return this;
        }
    });
    return AttractionActionsModalView;
});