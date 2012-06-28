define(['Backbone', 'Templates', 'Ajax'], function( Backbone, Templates, Ajax )
{
	var createAttraction_ = function() {  
    this.attractions.create({
      'list_item_photo_url' : $("#new_attraction_photo_url").val(),
    	'name' : $("#new_attraction_title").val(),
    	'summary' : $("#new_attraction_summary").val(),
    	'rating' : $("#new_attraction_rating").val(),
    	'wait' : $('#new_attraction_wait option:selected').val(),
    	'intensity' : $("#new_attraction_intensity").val(),
    	'height' : $("#new_attraction_height").val(),
    	'FP' : Ajax.isChecked("#new_attraction_fpCheckbox") ? "FP" : "",
    	'pal_mickey' : Ajax.isChecked("#new_attraction_palMickey") ? "Pal Mickey" : "",
    	'rider_swap' : Ajax.isChecked("#new_attraction_rideswap") ? "Rider Swap" : "",
    	'wheelchair' : Ajax.isChecked("#new_attraction_wheelchair") ? "Wheelchair" : ""
    });
	},
	
	AttractionModalView = Backbone.View.extend({
	  events: {
			'click #save_new_attraction' : 'addAttraction',
			'click #cancel_new_attraction' : 'cancelAttraction'
		},
    	
    template: Templates.attractionModal(),
    	
    initialize : function(){
			if (this.options.el) {
				this.el = this.options.el;
			}
			
			Handlebars.registerPartial("attractionAddPartial", Templates.attractionAddPartial());
    },

		render : function(){
      this.$el.html( this.template(
        {
			"attraction_title_id" : "new_attraction_title", 
			"attraction_summary_id" : "new_attraction_summary", 
			"attraction_photo_url_id" : "new_attraction_photo_url", 
			"attraction_rating_id" : "new_attraction_rating", 
			"attraction_wait_id" : "new_attraction_wait", 
			"attraction_intensity_id" : "new_attraction_intensity", 
			"attraction_height_id" : "new_attraction_height", 
			"inlineCheckboxes1_id" : "new_inlineCheckboxes1", 
			"attraction_options1_id" : "new_attraction_options1", 
			"attraction_fpCheckbox_id" : "new_attraction_fpCheckbox", 
			"attraction_palMickey_id" : "new_attraction_palMickey", 
			"inlineCheckboxes2_id" : "new_inlineCheckboxes2", 
			"attraction_options2_id" : "new_attraction_options2", 
			"attraction_rideswap_id" : "new_attraction_rideswap", 
			"attraction_wheelchair_id" : "new_attraction_wheelchair"
		}
		  ));
            
		  return this;
    },
    
    addAttraction: function() {  	  
      createAttraction_();
      Ajax.resetFormFields();
      		
      return false;
      
    },
    
    cancelAttraction: function() {
      Ajax.resetFormFields();
      
      return false;
    }
  });

  return AttractionModalView;
});