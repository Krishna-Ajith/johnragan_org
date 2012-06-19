define([
	'order!Underscore', 
	'order!Backbone',
	'order!Handlebars',
	'order!Templates',
	'order!models/attraction',
	'order!views/attractionsListView'
], function(Underscore, backbone, Handlebars, templates, Attraction, AttractionsListView) {

var spaceMountainAttraction = new Attraction({
  list_item_photo_url: "images/mk/attractions/space-mountain-240.jpeg"
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
});

var philharmagicAttraction = new Attraction({
  list_item_photo_url: "images/mk/attractions/AL_PHILH_240.jpeg"
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
});

var Attractions = Backbone.Collection.extend({
    model: Attraction
});

var myAttractions = new Attractions([ spaceMountainAttraction, philharmagicAttraction]);

var AttractionsListView = Backbone.View.extend({
  initialize: function() {
    console.log(this.collection3);
  },
  setCollection: function(collection) {
    this.collection2 = collection;
  }, 
  render: function(){
    console.log(this.collection3);
    console.log(myAttractions);
    console.log(this.collections3 == myAttractions);
    var template = templates.attractionsTemplate();
    $(this.el).html(template({myAttractions: myAttractions.toJSON()}));
    return this;  
  }
});
    
var myAttractionsView = new AttractionsListView({el : $("#attractions_list_container"), collection3 : myAttractions});
myAttractionsView.setCollection(myAttractions);
myAttractionsView.render();
//var myAttractionsView = new AttractionsListView({el : $("#attractions_list_container"), attractionsList : myAttractions });

// This part must be done to allow the popover to take place
$('.summary_popover').popover({ html : true });

});