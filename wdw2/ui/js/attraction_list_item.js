Attraction = Backbone.Model.extend({
    defaults: {
      fp: "FP"
    }
    , validate: function( attributes ){
        if( 1==2 ){
            return "1 cannot equal 2";
        }
    }
    , initialize: function() {
      
    }
});

var attraction = new Attraction({
  list_item_photo_url: "../images/mk/attractions/space-mountain-240.jpeg"
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

AttractionListItemView = Backbone.View.extend({
    initialize: function() {
        this.render();
    }
    , render: function() {
        var template = Handlebars.compile( $("#attraction_list_item_template").html() );
        this.$el.html( template(attraction.toJSON()) );
    }
});

var attraction_view = new AttractionListItemView({el : $("#attraction_list_item_container")});

// This part must be done to allow the popover to take place
$('.summary_popover').popover({ html : true });