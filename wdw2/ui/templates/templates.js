define( function( require )
{
	//var Handlebars  = require('handlebars'),
	  var attractionTpl = require('text!../templates/attraction.tpl');
	  attractionsTpl = require('text!../templates/attractions.tpl');
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