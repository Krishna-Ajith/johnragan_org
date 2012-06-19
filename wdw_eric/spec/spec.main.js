require.config( {
	baseUrl: '../src',
    paths: { 
    	specs        : '../spec'
	  , loader       : '../vendor/loader'
	  , text         : '../vendor/require/plugins/text'
	  , order        : '../vendor/require/plugins/order'
	  , $            : '../vendor/zepto/zepto'
	   , _           : '../vendor/lodash/lodash'
	  , Backbone     : '../vendor/backbone/backbone'
	  , Handlebars   : '../vendor/handlebars/handlebars'
	  , EventBroker  : 'lib/utils/EventBroker'
	  , Loader       : 'lib/controls/ProgressIndicator'
	  , AppHelper    : 'lib/helpers/AppHelper'
	  , AppRouter    : 'app/routers/AppRouter'
	  , tpl          : 'app/templates'
	  , Templates    : 'app/templates/Templates'
	  , AppView      : 'app/views/AppView'
	  //%module%
    }
});
	
// Add specs below...
require([
	'$' 
    , 'specs/app/AppSpec',
    , 'specs/app/views/AppViewSpec'
	//%spec%
], 
function($) {
	$( function() {
		var env = jasmine.getEnv();
	    env.addReporter( new jasmine.BootstrapReporter() );
	    env.execute();
	});
});