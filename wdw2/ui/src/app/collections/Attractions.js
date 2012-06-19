define( ['Underscore', 'Backbone', 'Attraction'], function( _, backbone, Attraction ) {
	// here I am just returning the extended object directly, as oppossed to
	// assigning it to a variable, if for no other reason then to try and help
	// illustrate that the names given are completely arbitrary. So, for exmaple
	// we can require this collection and name it whatever we want in main.js
	return Backbone.Collection.extend({
	    model: Attraction
	}, {
		// define a static factory method for creating some mocks
		// in backbone.js any static methods are defined after the
		// instance object. So, for example, in Backbone, it's always
		// var Something = Backbone.SomeAPI.extend({
		//   ... instance properties and methods	
		// }, {
		//   ... static/class properties and methods	
		// }, )
		createMocks: function(){
			return [
				new Attraction({
				  list_item_photo_url: "data/images/mk/attractions/space-mountain-240.jpeg"
				  , name : "Splash Mountain"
				  , summary: "Launch past the flashing lights of your space station into the soaring darkness of space! This classic Dark Ride dips and swerves as it rockets through the blackest reaches of the galaxy. Check the monitors as you exit for a glimpse of yourself in flight!"
				  , rating : "9"
				  , wait : "Busy"
				  , intensity : "8"
				  , height : "44"
				  , FP : "FP"
				  , pal_mickey : "Pal Mickey"
				  , rider_swap : "Rider Swap"
				  , wheelchair : "Wheelchair"
				}),
				new Attraction({
				  list_item_photo_url: "data/images/mk/attractions/AL_PHILH_240.jpeg"
				  , name : "Mickey's Philharmagic"
				  , summary: "In this dazzling and innovative 3D movie, Mickey Mouse and Donald Duck sweep you into the scenes from classic Disney films as Donald chases the Sorcerer's hat that starts all the trouble!"
				  , rating : "7"
				  , wait : "Idle"
				  , intensity : "3"
				  , height : "None"
				  , FP : "FP"
				  , pal_mickey : "Pal Mickey"
				  , rider_swap : ""
				  , wheelchair : "Wheelchair"
				})
			];
		}
	});
});
