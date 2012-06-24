define(['Backbone', 'Templates', 'Ajax'], function( Backbone, Templates, Ajax )
{
	var isChecked_ = function(id) {
	  
	  return $(id).is(':checked')
	},
	
	createAttraction_ = function() {  
    this.attractions.create({
      'list_item_photo_url' : $(".new_attraction_photo_url").val(),
    	'name' : $(".new_attraction_title").val(),
    	'summary' : $(".new_attraction_summary").val(),
    	'rating' : $(".new_attraction_rating").val(),
    	'wait' : $('.new_attraction_wait option:selected').val(),
    	'intensity' : $(".new_attraction_intensity").val(),
    	'height' : $(".id_attraction_height").val(),
    	'FP' : isChecked_(".attraction_fpCheckbox") ? "FP" : "",
    	'pal_mickey' : isChecked_(".attraction_palMickey") ? "Pal Mickey" : "",
    	'rider_swap' : isChecked_(".attraction_rideswap") ? "Rider Swap" : "",
    	'wheelchair' : isChecked_(".attraction_wheelchair") ? "Wheelchair" : ""
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
        {}
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