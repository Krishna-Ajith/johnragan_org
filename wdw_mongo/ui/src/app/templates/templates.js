define( function( require )
{
	var attractionViewTpl = require('text!app/templates/regular/attractionView.tpl'),
	attractionEditTpl = require('text!app/templates/regular/attractionEdit.tpl'),
	attractionModalTpl = require('text!app/templates/regular/attractionModal.tpl'),
	attractionPartialTpl = require('text!app/templates/partials/attractionPartial.tpl'),
	attractionAddPartialTpl = require('text!app/templates/partials/attractionAddPartial.tpl'),
	
	Handlebars = require('Handlebars')
	
	attractionViewPrecompiled = Handlebars.compile( attractionViewTpl ),
	attractionEditPrecompiled = Handlebars.compile( attractionEditTpl ),
	attractionModalPrecompiled = Handlebars.compile( attractionModalTpl ),
	attractionPartialPrecompiled = Handlebars.compile( attractionPartialTpl ),
	attractionAddPartialPrecompiled = Handlebars.compile( attractionAddPartialTpl );
	
	return {
		attractionView: function() {
			return attractionViewPrecompiled;
		},
		attractionEdit: function() {
		  return attractionEditPrecompiled;
		},
		attractionModal: function() {
			return attractionModalPrecompiled;
		},
		attractionPartial: function() {
			return attractionPartialPrecompiled;
		},
		attractionAddPartial: function() {
			return attractionAddPartialPrecompiled;
		}
	}
});