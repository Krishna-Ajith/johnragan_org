define ( [
	'order!../vendor/jquery/1.7.1/jquery.min',
	'order!../vendor/handlebars/1.0.beta.5/handlebars',
	'order!../vendor/underscore/1.3.1/underscore-min', 
	'order!../vendor/backbone/0.9.1/backbone-min',
	'order!../vendor/twitter/bootstrap.min'
], 
function ()
{
	Backbone.setDomLibrary( $ );

    return {
        _ : _.noConflict(),
        $ : jQuery,
        Backbone : Backbone.noConflict(),
        Handlebars : Handlebars
    };
});

