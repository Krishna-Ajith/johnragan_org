define(['Backbone', 'Templates', 'popover'], function( Backbone, Templates, Popover )
{
	var AttractionView = Backbone.View.extend({
    	
    viewTemplate_: Templates.attractionView(),
    editTemplate_: Templates.attractionEdit(),
    
    isView: true,
    
    events: {
			'dblclick'  : 'editAttraction',
		  'doubleTap' : 'editAttraction',
		  'click .attr-btn-cancel' : 'editAttraction',
		  'click .attr-btn-delete' : 'deleteAttraction',
		  'click .attr-btn-save' : 'saveAttraction',
		  'tap .attr-btn-cancel' : 'editAttraction',
		  'tap .attr-btn-delete' : 'deleteAttraction',
		  'tap .attr-btn-save' : 'saveAttraction'
	  },
    	
    initialize : function(){
      this.attraction = this.options.model;
			if (this.options.el) {
				this.el = this.options.el;
			}
			
			Handlebars.registerPartial("attractionPartial", Templates.attractionPartial());
    },
		
		render : function(){
		  var template = this.isView ? this.viewTemplate_ : this.editTemplate_;
      this.$el.html( template({
        'attraction' : this.attraction.toJSON()
      }));

      return this;
    },
    
    editAttraction: function() {
			this.isView = !this.isView;
			this.render();
		},
		
		deleteAttraction: function() {
			this.model.destroy();
		},
		
		saveAttraction: function() {
			this.isView = !this.isView;
			this.render();
		}
  });

  return AttractionView;
});