
define( [ 'Backbone', 'Underscore', 'MoviesHelper' ], function( Backbone, _, MoviesHelper )
{
	/*
	 * Defines the ApplicationRouter class which is responsible for managing 
	 * URI routing within the application. 
	 * 
	 * The ApplicationRouter allows for resolving hash based URIs or real URIs 
	 * (when HTML5 PushState is available in the client UA) to specific view 
	 * states within a single page application.
	 * 
	 */
    var ApplicationRouter = Backbone.Router.extend (
    {
    	/*
    	 * Defines the routes which the application must resolve to a specific 
    	 * state.
    	 */
        routes : {
            'tweets/*path/:query' : 'query'
        },
        
        /*
         * Initializes the ApplicationRouter. Initialization resolves an initial 
         * route to that which is matched within the initial applicaiton URL.
         * 
         * @param pushState A boolean which, when true, indicated that the HTML5 
         *        PushState API should be used if available.
         */
        start: function( pushState )
        {
			return Backbone.history.start( { 
				'root'      : MoviesHelper.rootURIPath(),
				'pushState' : pushState
			});	
        },
        
        /*
         * Provides a convenience method which allows clients to bind to the 
         * 'route:query' route when the route has been matched.
         */
        bindQuery: function( callback, scope )
        {
        	this.on( "route:query", _.bind( callback, scope ) );
        },
        
        /*
         * Provides a convenience method which allows clients to bind to the 
         * 'route:query' route when the route has been matched.
         */
        triggerSearch: function( query )
        {
        	this.navigate( 'tweets/search/' + query, true );
        },
        
        /*
         * Defines a default handler for the 'route:query' Route which simply 
         * logs the path and id of the given route to the console.
         */
        query : function( path, id )
        {
			MoviesHelper.log( 'Route Matched: ' + path + '/' + id );
        }
    })
    return ApplicationRouter;
});