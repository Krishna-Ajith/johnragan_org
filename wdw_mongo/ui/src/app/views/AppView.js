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
      /*// Get the value of the task		
      value = this.$newTaskInput.val();
        	
      // Create the new task (but how does it show up - a monitored event?)
      this.tasks.create({
        'text' : value
      });*/
        	
      resetFormFields();
      
      console.log("have a nice day");  		
      return false;
      
    },
    
    cancelAttraction: function() {
      resetFormFields();
      
      return false;
    }
	});
	
	return AppView;
});