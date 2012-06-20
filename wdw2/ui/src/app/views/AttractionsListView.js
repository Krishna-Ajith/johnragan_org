define(['Backbone', 'Templates', 'popover', 'AttractionView'], function( Backbone, Templates, Popover, AttractionView )
{
	var htmlOutput = function(attractions) {
		var len = attractions.length;
		var html = "";
		for(var i=0; i<len; i++) {
			html += new AttractionView( {model: attractions.at(i), el: '#'} ).output();
		}
		
		return html;
	}
	
    var AttractionsListView = Backbone.View.extend({
    	
    	template: Templates.attractionsTemplate(),
    	
        initialize : function(attractions){
        	this.attractions = this.options.model;
        },

		output : function() {
			return htmlOutput(this.attractions);
		},
        
        render : function(){
			Handlebars.registerPartial("attractionPartial", Templates.attractionPartialTemplate());
            this.$el.html( this.template({
                'myAttractions' : this.attractions.toJSON()
            }));

			//this.$el.html( htmlOutput(this.attractions) );
			
            $('.summary_popover').popover({ html : true });
            return this;
        }
    });
    return AttractionsListView;
});