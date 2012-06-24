define( function( require )
{
	var attractionViewTpl = require('text!app/templates/regular/attractionView.tpl'),
	attractionEditTpl = require('text!app/templates/regular/attractionEdit.tpl'),
	attractionActionsModalTpl = require('text!app/templates/regular/attractionActionsModal.tpl'),
	attractionPartialTpl = require('text!app/templates/partials/attractionPartial.tpl'),
	attractionActionsAddEditPartialTpl = require('text!app/templates/partials/attractionActionsAddEditPartial.tpl'),
	
	Handlebars = require('Handlebars')
	
	attractionViewPrecompiled = Handlebars.compile( attractionViewTpl ),
	attractionEditPrecompiled = Handlebars.compile( attractionEditTpl ),
	attractionActionsModalPrecompiled = Handlebars.compile( attractionActionsModalTpl ),
	attractionPartialPrecompiled = Handlebars.compile( attractionPartialTpl ),
	attractionActionsAddEditPartialPrecompiled = Handlebars.compile( attractionActionsAddEditPartialTpl );
	
	return {
		attractionView: function() {
			return attractionViewPrecompiled;
		},
		attractionEdit: function() {
		  return attractionEditPrecompiled;
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