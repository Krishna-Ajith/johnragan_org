define(['Backbone', 'Templates', 'popover'], function( Backbone, Templates, Popover )
{
	var AttractionView = Backbone.View.extend({
    	
    template: Templates.attractionTemplate(),
    	
    initialize : function(){
      this.attraction = this.options.model;
			if (this.options.el) {
				this.el = this.options.el;
			}
			
			Handlebars.registerPartial("attractionPartial", Templates.attractionPartialTemplate());
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