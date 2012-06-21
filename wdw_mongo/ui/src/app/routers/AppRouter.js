
define( function( require )
{
	var Backbone  = require('Backbone')
	  , AppHelper = require('AppHelper');
	
	/*
	 * Defines the Application specific Router implementation which is 
	 * responsible for managing all URI routing within the application. 
	 * 
	 * The AppRouter allows for resolving hash based URIs or real URIs 
	 * (when HTML5 PushState is available in the UA) to specific view 
routers	 * states within a single page application.
	 * 
	 * Initialize the router from a top-level initialization context
	 * as follows:
	 * 
	 *  if ( !AppRouter.start() ) {
	 * 	      AppRouter.navigate("#view/home", {trigger: true});
	 *  }
	 */
    var AppRouter = Backbone.Router.extend (
    {
    	/*
    	 * Defines the routes which the application must resolve to a
    	 * specific state.
    	 */
        routes : {
            'view/:page' : 'viewChange'
        },
        
        /*
         * Initializes the ApplicationRouter. Initialization resolves an initial
         * route to that which is matched within the initial application URL.
         * 
         * @param pushState A boolean which, when true, indicated that the HTML5
         * PushState API is to be used if available.
         */
        start: function( pushState )
        {
			return Backbone.history.start({ 
				'root'      : AppHelper.rootURIPath(),
				'pushState' : pushState
			});	
        }
    })
    return new AppRouter();
})