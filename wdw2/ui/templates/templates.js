define( function( require )
{
	var Handlebars  = require('Handlebars')
	  , attractionTpl = require('text!tpl/attraction.tpl')
	  , attractionsTpl = require('text!tpl/attractions.tpl');
	
	/*
	 * Defines a centralized module from which all templates within 
	 * the application are accessed and compiled.
	 */
	return {
		attractionTemplate: function() {
			return Handlebars.compile( attractionTpl );
		},
		attractionsTemplate: function() {
			return Handlebars.compile( attractionsTpl );
		}
	}
});