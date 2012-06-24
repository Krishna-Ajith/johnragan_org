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
	  
	  $('#new_attraction_options').find(':checked').each(function() {
       $(this).removeAttr('checked');
    });
    
    $('#new_attraction_wait').val( $('#new_attraction_wait').prop('defaultSelected') );
	}
	
	var createAttraction = function() {
	  /*// Get the value of the task		
    value = this.$newTaskInput.val();
      	
    // Create the new task (but how does it show up - a monitored event?)
    this.tasks.create({
      'text' : value
    });*/
    
    this.attractions.create({
      'list_item_photo_url' : "data/images/mk/attractions/space-mountain-240.jpeg",
    	'name' : "Allie Mountain",
    	'summary' : "Launch past the flashing lights of your space station into the soaring darkness of space! This classic Dark Ride dips and swerves as it rockets through the blackest reaches of the galaxy. Check the monitors as you exit for a glimpse of yourself in flight!",
    	'rating' : 9,
    	'wait' : "Busy",
    	'intensity' : 8,
    	'height' : "44",
    	'FP' : "FP",
    	'pal_mickey' : "Pal Mickey",
    	'rider_swap' : "Rider Swap",
    	'wheelchair' : "Wheelchair"
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