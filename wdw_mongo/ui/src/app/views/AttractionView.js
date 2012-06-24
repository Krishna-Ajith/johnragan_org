define(['Backbone', 'Templates', 'popover'], function( Backbone, Templates, Popover )
{
	var AttractionView = Backbone.View.extend({
    	
    template: Templates.attraction(),
    	
    initialize : function(){
      this.attraction = this.options.model;
			if (this.options.el) {
				this.el = this.options.el;
			}
			
			Handlebars.registerPartial("attractionPartial", Templates.attractionPartial());
    },
		
		render : function(){
      this.$el.html( this.template({
        'attraction' : this.attraction.toJSON()
      }));

      return this;
    }
  });

  return AttractionView;
});