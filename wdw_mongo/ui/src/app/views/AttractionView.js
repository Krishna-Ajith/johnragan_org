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
    },
		
		render : function(){
		  var template = this.isView ? this.viewTemplate_ : this.editTemplate_;
      this.$el.html( template({
        'attraction' : this.attraction.toJSON()
      }));

      return this;
    },
    
    editAttraction: function() {
      var FP = this.attraction.get("FP"),
      pal_mickey = this.attraction.get("pal_mickey"),
      rider_swap = this.attraction.get("rider_swap"),
      wheelchair = this.attraction.get("wheelchair");
      
			this.isView = !this.isView;
			this.render();
			
			$(".new_attraction_title").val(this.attraction.get("name"));
  	  $(".new_attraction_summary").val(this.attraction.get("summary"));
  	  $(".new_attraction_photo_url").val(this.attraction.get("list_item_photo_url"));
  	  $(".new_attraction_height").val(this.attraction.get("height"));
  	  $(".new_attraction_rating").val(this.attraction.get("rating"));
  	  $(".new_attraction_intensity").val(this.attraction.get("intensity"));
  	  
  	  if (FP) {
  	    $(".new_attraction_fpCheckbox").attr('checked', true);
  	  }
  	  if (pal_mickey) {
  	    $(".new_attraction_palMickey").attr('checked', true);
  	  }
  	  if (rider_swap) {
  	    $(".new_attraction_rideswap").attr('checked', true);
  	  }
  	  if (wheelchair) {
  	    $(".new_attraction_wheelchair").attr('checked', true);
  	  }

  	  $(".new_attraction_wait").val(this.attraction.get("wait"));
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
				'list_item_photo_url' : $(".new_attraction_photo_url").val(),
      	'name' : "Space Mountain Mickey", //$(".new_attraction_title").val(),
      	'summary' : $(".new_attraction_summary").val(),
      	'rating' : $(".new_attraction_rating").val(),
      	'wait' : $('.new_attraction_wait option:selected').val(),
      	'intensity' : $(".new_attraction_intensity").val(),
      	'height' : $(".new_attraction_height").val(),
      	'FP' : Ajax.isChecked(".new_attraction_fpCheckbox") ? "FP" : "",
      	'pal_mickey' : Ajax.isChecked(".new_attraction_palMickey") ? "Pal Mickey" : "",
      	'rider_swap' : Ajax.isChecked(".new_attraction_rideswap") ? "Rider Swap" : "",
      	'wheelchair' : Ajax.isChecked(".new_attraction_wheelchair") ? "Wheelchair" : ""
			});
		  
			this.isView = !this.isView;
			Ajax.resetFormFields();
			this.render();
		}
  });

  return AttractionView;
});