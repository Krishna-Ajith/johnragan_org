define(['Backbone', 'Templates', 'popover', 'AttractionView'], function( Backbone, Templates, Popover, AttractionView )
{
	//Handlebars.registerPartial("attractionPartial", Templates.attractionPartialTemplate());
	
	//var htmlOutput = function(template, attractions) {
		//html = template({
        //    'myAttractions' : attractions.toJSON()
        //});
		//
		//return html;
	//}
	
    var AttractionsListView = Backbone.View.extend({
    	
    	//template: Templates.attractionsTemplate(),
    	
        initialize : function(attractions){
        	this.attractions = this.options.model;
        },

		//output : function() {
		//	return htmlOutput(this.attractions);
		//},
        
        render : function(){
			this.$el.empty();
			this.attractions.each( this.add, this );
			
            $('.summary_popover').popover({ html : true });
            return this;
        },
		
		add: function(attraction) {
			this.$el.append( new AttractionView({
				model: attraction
			}).render().el );
		}
    });
    return AttractionsListView;
});