define(['Backbone', 'Templates', 'popover', 'Ajax'], function( Backbone, Templates, Popover, Ajax )
{
	var AttractionView = Backbone.View.extend({
    	
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
			
			Handlebars.registerPartial("attractionPartial", Templates.attractionPartial());
			Handlebars.registerPartial("attractionAddPartial", Templates.attractionAddPartial());
    },
		
		render : function(){
		
		if (this.isView) {
      this.$el.html( this.viewTemplate_({   
		'attraction' : this.attraction.toJSON()
		}));
	} else {
		this.$el.html(this.editTemplate_({'attraction' : {   
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
			}})
		);
	}

      return this;
    },
    
    editAttraction: function() {
      var FP = this.attraction.get("FP"),
      pal_mickey = this.attraction.get("pal_mickey"),
      rider_swap = this.attraction.get("rider_swap"),
      wheelchair = this.attraction.get("wheelchair");
      
			this.isView = !this.isView;
			this.render();
			
			$("#edit_attraction_title").val(this.attraction.get("name"));
  	  $("#edit_attraction_summary").val(this.attraction.get("summary"));
  	  $("#edit_attraction_photo_url").val(this.attraction.get("list_item_photo_url"));
  	  $("#edit_attraction_height").val(this.attraction.get("height"));
  	  $("#edit_attraction_rating").val(this.attraction.get("rating"));
  	  $("#edit_attraction_intensity").val(this.attraction.get("intensity"));
  	  
  	  if (FP) {
  	    $("#edit_attraction_fpCheckbox").attr('checked', true);
  	  }
  	  if (pal_mickey) {
  	    $("#edit_attraction_palMickey").attr('checked', true);
  	  }
  	  if (rider_swap) {
  	    $("#edit_attraction_rideswap").attr('checked', true);
  	  }
  	  if (wheelchair) {
  	    $("#edit_attraction_wheelchair").attr('checked', true);
  	  }

  	  $("#edit_attraction_wait").val(this.attraction.get("wait"));
		},
		
		cancelAttraction: function() {
		  this.isView = !this.isView;
		  Ajax.resetFormFields();
		  this.render();
		},
		
		deleteAttraction: function() {
			this.model.destroy();
			Ajax.resetFormFields();
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
		  
			this.isView = !this.isView;
			Ajax.resetFormFields();
			this.render();
		}
  });

  return AttractionView;
});