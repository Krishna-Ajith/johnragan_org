define( function( require )
{
	var attractionsTpl = require('text!../src/templates/attractions.tpl');
	/*
	 * Defines a centralized module from which all templates within 
	 * the application are accessed and compiled.
	 */
	return {
		attractionsTemplate: function() {
			return Handlebars.compile( attractionsTpl );
		}
	}
});