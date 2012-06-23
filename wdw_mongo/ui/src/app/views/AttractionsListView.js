define(['Backbone', 'Templates', 'popover', 'AttractionView'], 
function( Backbone, Templates, popover, AttractionView )
{
    var AttractionsListView = Backbone.View.extend({
        initialize : function(attractions){
			this.attractions = this.options.collection;
			this.el = this.options.el;
			
			this.attractions.bind('reset remove', this.render, this);
			this.attractions.bind('add',   this.add,   this);
        },

        render : function(){
			this.$el.empty();
			this.attractions.each( this.add, this );
			
            $('.summary_popover').popover({ html : true });

            return this;
        },
		
		add: function(attraction) {
			this.$el.append( new AttractionView({
				'model': attraction
			}).render().el );
		}
    });

    return AttractionsListView;
});