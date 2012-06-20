define( function( require )
{
	var attractionsTpl = require('text!app/templates/attractions.tpl');
	var attractionTpl = require('text!app/templates/attraction.tpl');
	var attractionPartialTpl = require('text!app/templates/attractionPartial.tpl');
	var Handlebars = require('Handlebars');
	/*
	 * Defines a centralized module from which all templates within 
	 * the application are accessed and compiled.
	 */
	return {
		attractionsTemplate: function() {
			return Handlebars.compile( attractionsTpl );
		},
		attractionTemplate: function() {
			return Handlebars.compile( attractionTpl );
		},
		attractionPartialTemplate: function() {
			return Handlebars.compile( attractionPartialTpl );
		}
	}
});