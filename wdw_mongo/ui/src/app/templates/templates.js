define( function( require )
{
	var attractionTpl = require('text!app/templates/regular/attraction.tpl'),
	attractionActionsModalTpl = require('text!app/templates/regular/attractionActionsModal.tpl'),
	attractionPartialTpl = require('text!app/templates/partials/attractionPartial.tpl'),
	attractionActionsAddEditPartialTpl = require('text!app/templates/partials/attractionActionsAddEditPartial.tpl'),
	
	Handlebars = require('Handlebars')
	
	attractionPrecompiled = Handlebars.compile( attractionTpl ),
	attractionActionsModalPrecompiled = Handlebars.compile( attractionActionsModalTpl ),
	attractionPartialPrecompiled = Handlebars.compile( attractionPartialTpl ),
	attractionActionsAddEditPartialPrecompiled = Handlebars.compile( attractionActionsAddEditPartialTpl );
	
	return {
		attraction: function() {
			return attractionPrecompiled;
		},
		attractionActionsModal: function() {
			return attractionActionsModalPrecompiled;
		},
		attractionPartial: function() {
			return attractionPartialPrecompiled;
		},
		attractionActionsAddEditPartial: function() {
			return attractionActionsAddEditPartialPrecompiled;
		}
	}
});