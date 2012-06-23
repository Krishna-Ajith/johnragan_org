define( function( require )
{
	var attractionsTpl = require('text!app/templates/attractions.tpl');
	var attractionTpl = require('text!app/templates/attraction.tpl');
	var attractionActionsModalTpl = require('text!app/templates/attractionActionsModal.tpl');
	
	var attractionPartialTpl = require('text!app/templates/partials/attractionPartial.tpl');
	var attractionActionsAddEditPartialTpl = require('text!app/templates/partials/attractionActionsAddEditPartial.tpl');
	
	var Handlebars = require('Handlebars');
	
	return {
		attractionsTemplate: function() {
			return Handlebars.compile( attractionsTpl );
		},
		attractionTemplate: function() {
			return Handlebars.compile( attractionTpl );
		},
		attractionActionsModal: function() {
			return Handlebars.compile( attractionActionsModalTpl );
		},
		attractionPartialTemplate: function() {
			return Handlebars.compile( attractionPartialTpl );
		},
		attractionActionsAddEditPartialTemplate: function() {
			return Handlebars.compile( attractionActionsAddEditPartialTpl );
		}
	}
});