define([
	'Backbone', 'Attractions', 'AttractionsListView', 'modal', 'transition', 
	'AttractionModalView'
], function( 
	Backbone, Attractions, AttractionsListView, modal, transition, 
	AttractionModalView
) {
  var removeAttractions_ = function() {
		this.attractions.removeAttractions();
		
    return false;
  }
  
	var createAttractionModelView_ = function() {
		this.attractionModalView = new AttractionModalView( { 
			'el' : '#attractionModal'
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
			createAttractionModelView_();
			createAttractionsListView_();
    },
    
    removeAttractions: function() {
  		removeAttractions_();

      return false;
    }
	});
	
	return AppView;
});