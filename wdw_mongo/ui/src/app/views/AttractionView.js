define(['Backbone', 'Templates', 'popover', 'Ajax'], function( Backbone, Templates, Popover, Ajax )
{
	var toggleViewAndRender = function(theView) {
	  theView.isView = !theView.isView;
		theView.render();
	},
	
	jsonEditIds = function() {
	  
	  return {'attraction' : {   
			"attraction_title_id" : "edit_attraction_title", 
			"attraction_summary_id" : "edit_attraction_summary", 
			"attraction_photo_url_id" : "edit_attraction_photo_url", 
			"attraction_rating_id" : "edit_attraction_rating", 
			"attraction_wait_id" : "edit_attraction_wait", 
			"attraction_intensity_id" : "edit_attraction_intensity", 
			"attraction_height_id" : "edit_attraction_height", 
			"inlineCheckboxes1_id" : "edit_inlineCheckboxes1", 
			"attraction_options1_id" : "edit_attraction_options1", 
			"attraction_fpCheckbox_id" : "edit_attraction_fpCheckbox", 
			"attraction_palMickey_id" : "edit_attraction_palMickey", 
			"inlineCheckboxes2_id" : "edit_inlineCheckboxes2", 
			"attraction_options2_id" : "edit_attraction_options2", 
			"attraction_rideswap_id" : "edit_attraction_rideswap", 
			"attraction_wheelchair_id" : "edit_attraction_wheelchair"
			}}; 
	}, 
	
	AttractionView = Backbone.View.extend({
    	
    viewTemplate_: Templates.attractionView(),
    editTemplate_: Templates.attractionEdit(),
    
    isView: true,
    
    events: {
			'dblclick'  : 'editAttraction',
		  'doubleTap' : 'editAttraction',
		  'click .attr-btn-cancel' : 'cancelAttraction',
		  'click .attr-btn-delete' : 'deleteAttraction',
		  'click .attr-btn-save' : 'saveAttraction',
		  'tap .attr-btn-cancel' : 'cancelAttraction',
		  'tap .attr-btn-delete' : 'deleteAttraction',
		  'tap .attr-btn-save' : 'saveAttraction'
	  },
    	
    initialize : function(){
      this.attraction = this.options.model;
			if (this.options.el) {
				this.el = this.options.el;
			}
			this.parent = this.options.parent;
			
			Handlebars.registerPartial("attractionPartial", Templates.attractionPartial());
			Handlebars.registerPartial("attractionAddPartial", Templates.attractionAddPartial());
    },
		
		render : function(){
		
		  if (this.isView) {
        this.$el.html( this.viewTemplate_({   
		      'attraction' : this.attraction.toJSON()
		    }));
	    } else {
		    this.$el.html(this.editTemplate_(jsonEditIds()));
	    }

      return this;
    },
    
    editAttraction: function() {
      if (this.parent.synchronizeEdit()) {    
			toggleViewAndRender(this);
			
			Ajax.setTargetValue(this.attraction, "name", "#edit_attraction_title");
			Ajax.setTargetValue(this.attraction, "summary", "#edit_attraction_summary");
			Ajax.setTargetValue(this.attraction, "list_item_photo_url", "#edit_attraction_photo_url");
			Ajax.setTargetValue(this.attraction, "height", "#edit_attraction_height");
			Ajax.setTargetValue(this.attraction, "rating", "#edit_attraction_rating");
			Ajax.setTargetValue(this.attraction, "intensity", "#edit_attraction_intensity");
			Ajax.setTargetValue(this.attraction, "wait", "#edit_attraction_wait");
  	  
  	  Ajax.setCheckboxIfSet(this.attraction, "FP", "#edit_attraction_fpCheckbox");
  	  Ajax.setCheckboxIfSet(this.attraction, "pal_mickey", "#edit_attraction_palMickey");
  	  Ajax.setCheckboxIfSet(this.attraction, "rider_swap", "#edit_attraction_wheelchair");
  	  Ajax.setCheckboxIfSet(this.attraction, "wheelchair", "#edit_attraction_wait");
	    }
		},
		
		cancelAttraction: function() {
		  toggleViewAndRender(this);
		  this.parent.releaseEdit();
		},
		
		deleteAttraction: function() {
			this.model.destroy();
			this.parent.releaseEdit();
		},
		
		saveAttraction: function() {
		  this.model.save({
				'list_item_photo_url' : $("#edit_attraction_photo_url").val(),
      	'name' : $("#edit_attraction_title").val(),
      	'summary' : $("#edit_attraction_summary").val(),
      	'rating' : $("#edit_attraction_rating").val(),
      	'wait' : $('#edit_attraction_wait option:selected').val(),
      	'intensity' : $("#edit_attraction_intensity").val(),
      	'height' : $("#edit_attraction_height").val(),
      	'FP' : Ajax.isChecked("#edit_attraction_fpCheckbox") ? "FP" : "",
      	'pal_mickey' : Ajax.isChecked("#edit_attraction_palMickey") ? "Pal Mickey" : "",
      	'rider_swap' : Ajax.isChecked("#edit_attraction_rideswap") ? "Rider Swap" : "",
      	'wheelchair' : Ajax.isChecked("#edit_attraction_wheelchair") ? "Wheelchair" : ""
			});
					  
			toggleViewAndRender(this);
			this.parent.releaseEdit();
			$('.summary_popover').popover({ html : true });
		}
  });

  return AttractionView;
});