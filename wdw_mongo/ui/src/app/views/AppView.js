define([
	'Backbone', 'Attractions', 'AttractionsListView', 'modal', 'transition', 
	'AttractionActionsModalView'
], function( 
	Backbone, Attractions, AttractionsListView, modal, transition, 
	AttractionActionsModalView
) {
  
	var createAttractionActionsModelView_ = function() {
		this.attractionActionsModalView = new AttractionActionsModalView( { 
			'el' : '#attractionActionsModal'
		} ).render();
	},
	
	createAttractionsListView_ = function() {
		this.attractions = new Attractions();
		this.attractionsListView = new AttractionsListView( { 
			'collection' : this.attractions,
			'el' : '#attractions_list_container'
		} );
		this.attractions.fetch();
	},
	
	AppView = Backbone.View.extend({
		
		el: '#app-container',
		
		events: {
			'click #remove-attractions' : 'removeAttractions'
		},

    initialize: function() {
			createAttractionActionsModelView_();
			createAttractionsListView_();
    },

		removeAttractions: function() {
			this.attractions.removeAttractions();
			
      return false;
    }
	});
	
	return AppView;
});