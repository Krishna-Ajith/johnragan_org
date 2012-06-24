define( function( require )
{
	var attractionsTpl = require('text!app/templates/attractions.tpl'),
	attractionTpl = require('text!app/templates/attraction.tpl'),
	attractionActionsModalTpl = require('text!app/templates/attractionActionsModal.tpl'),
	
	attractionPartialTpl = require('text!app/templates/partials/attractionPartial.tpl'),
	attractionActionsAddEditPartialTpl = require('text!app/templates/partials/attractionActionsAddEditPartial.tpl'),
	
	Handlebars = require('Handlebars');
	
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