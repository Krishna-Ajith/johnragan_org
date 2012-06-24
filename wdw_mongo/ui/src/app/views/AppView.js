define([
	'Backbone', 'Attractions', 'AttractionsListView', 'modal', 'transition', 
	'AttractionActionsModalView'
], function( 
	Backbone, Attractions, AttractionsListView, modal, transition, 
	AttractionActionsModalView
) {	
	var createAttractionActionsModelView = function() {
		this.attractionActionsModalView = new AttractionActionsModalView( { 
			'el' : '#attractionActionsModal'
		} ).render();
	}
	
	var createAttractionsListView = function() {
		this.attractions = new Attractions();
		this.attractionsListView = new AttractionsListView( { 
			'collection' : this.attractions,
			'el' : '#attractions_list_container'
		} );
		this.attractions.fetch();
	}
	
	var resetFormFields = function() {	  
	  $("#new_attraction_title").val('');
	  $("#new_attraction_summary").val('');
	  $("#new_attraction_photo_url").val('');
	  $("#id_attraction_height").val('');
	  $("#new_attraction_rating").val('5');
	  $("#new_attraction_intensity").val('5');
	  
	  $('#new_attraction_options1').find(':checked').each(function() {
       $(this).removeAttr('checked');
    });
    $('#new_attraction_options2').find(':checked').each(function() {
       $(this).removeAttr('checked');
    });
    
    $('#new_attraction_wait').val( $('#new_attraction_wait').prop('defaultSelected') );
	}
	
	var isChecked = function(id) {
	  
	  return $(id).is(':checked')
	}
	
	var createAttraction = function() {  
    this.attractions.create({
      'list_item_photo_url' : $("#new_attraction_photo_url").val(),
    	'name' : $("#new_attraction_title").val(),
    	'summary' : $("#new_attraction_summary").val(),
    	'rating' : $("#new_attraction_rating").val(),
    	'wait' : $('#new_attraction_wait option:selected').val(),
    	'intensity' : $("#new_attraction_intensity").val(),
    	'height' : $("#id_attraction_height").val(),
    	'FP' : isChecked("#attraction_fpCheckbox") ? "FP" : "",
    	'pal_mickey' : isChecked("#attraction_palMickey") ? "Pal Mickey" : "",
    	'rider_swap' : isChecked("#attraction_rideswap") ? "Rider Swap" : "",
    	'wheelchair' : isChecked("#attraction_wheelchair") ? "Wheelchair" : ""
    });
	}
	
	var AppView = Backbone.View.extend({
		
		el: '#app-container',
		
		events: {
			'click #remove-attractions' : 'removeAttractions',
			'click #save_new_attraction' : 'addAttraction',
			'click #cancel_new_attraction' : 'cancelAttraction'
		},

    initialize: function() {
			createAttractionActionsModelView();
			createAttractionsListView();
    },

		removeAttractions: function() {
			this.attractions.removeAttractions();
			
      return false;
    },

		addAttraction: function() {  	  
      createAttraction();
      resetFormFields();
      		
      return false;
      
    },
    
    cancelAttraction: function() {
      resetFormFields();
      
      return false;
    }
	});
	
	return AppView;
});