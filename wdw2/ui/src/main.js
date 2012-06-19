require.config( {
	paths : {
		text : '../vendors/require/plugins/text',
		Handlebars : '../vendors/handlebars/handlebars',
		Underscore : '../vendors/underscore/underscore',
		Backbone : '../vendors/backbone/backbone',
		Templates : 'app/templates/templates',
		Attraction : 'app/models/attraction',
		Attractions : 'app/collections/Attractions',
		AttractionsListView : 'app/views/AttractionsListView',
		AppView : 'app/views/AppView'
	}
});

require( ['AppView'], function( AppView ){
	// instantiate the AppView instance once the document is ready using jQueries
	// ready function $()
	$(function(){
		this.app = new AppView();
	})
} );