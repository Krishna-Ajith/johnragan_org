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
	
	var AppView = Backbone.View.extend({
		
		el: '#app-container',
		
		events: {
			'click #remove-attractions' : 'removeAttractions',
			//'click #add-attraction' : 'addAttraction'
		},

        initialize: function() {
			createAttractionActionsModelView();
			createAttractionsListView();
        },

		removeAttractions: function() {
			this.attractions.removeAttractions();
			
        	return false;
        },

		addAttraction : function() {
			console.log("this is me, adding an attraction");
			
			return false;
		}
	});
	
	return AppView;
});