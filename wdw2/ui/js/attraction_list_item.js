AttractionListItemView = Backbone.View.extend({
    initialize: function() {
        this.render();
    }
    , render: function() {
        var variables = { 
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
        };
        var template = _.template( $("#attraction_list_item_template").html(), variables );
        this.$el.html( template );
    }
    /*, events: {
        "click input[type=button]": "doSearch"
    }
    , doSearch: function(event) {
        alert( "Search for " + $("#search_input").val() );
    }*/
});

var attraction_view = new AttractionListItemView({el : $("#attraction_list_item_container")});


// This part must be done to allow the popover to take place
$('.summary_popover').popover({ html : true });