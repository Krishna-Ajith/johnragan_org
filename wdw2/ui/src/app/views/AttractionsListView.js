define(['Backbone', 'Templates', 'popover', 'AttractionView'], function( Backbone, Templates, Popover, AttractionView )
{
    var AttractionsListView = Backbone.View.extend({
    	
    	template: Templates.attractionsTemplate(),
    	
        initialize : function(attractions){
        	this.attractions = this.options.model;
            this.render();
        },
        
        render : function(){
			/*Handlebars.registerPartial("attractionPartial", require('text!app/templates/attraction.tpl'));
            this.$el.html( this.template({
                'myAttractions' : this.attractions.toJSON()
            }));*/
			var len = this.attractions.length;
			var html = "";
			for(var i=0; i<len; i++) {
				html += new AttractionView( {model: this.attractions.at(i), el: '#'} ).output();
			}
			this.$el.html( html );
			
            $('.summary_popover').popover({ html : true });
            return this;
        }
    });
    return AttractionsListView;
});