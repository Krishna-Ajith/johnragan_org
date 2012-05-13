
define( [ 'Underscore', 'Backbone', 'Tweet', 'Handlebars', 'text!app/config/twitter.search.url.config' ], 

function( _, Backbone, Tweet, Handlebars, config )
{
	/*
	 * Defines the Tweets Collection which is used to manage a collection
	 * of Tweet Model instances. All Tweets are loaded via the current query 
	 * property value against the underlying service.
	 */
	var Tweets = Backbone.Collection.extend (
	{
		/*
		 * Defines the Model Class to which the Tweets collection is bound.
		 */
		model: Tweet,
		
		/*
		 * Defines the Service URI from which Tweets Collections are populated.
		 */
        service: Handlebars.compile( config ),
        
        /*
         * The initialize method accepts and optional query with which the 
         * underlying service will be invoked, the results of which will 
         * be used to populate this collection.
         * 
         * @param query An optional twitter username or topic to be loaded.
         */
		// JPR - How doo options get passed in?
		initialize: function( options ) 
		{
			if ( options ) {
				this.query    = options.query    || Tweets.DEFAULT_QUERY;
				this.pageSize = options.pageSize || Tweets.DEFAULT_PAGE_SIZE;
			}
		},
	
		/*
		 * Provides an override of the url property so as to invoke the 
		 * compiled service URI template against the current query.
		 */
		url: function() 
		{
		    return this.service({
		        'query'   : this.query, 
		        'results' : this.pageSize 
		    });
		},
	
		/*
		 * When the underlying service request returns, we parse out the 
		 * collection results in the parse method.
		 * 
		 * @param The JSON data returned by the Twitter search query.
		 */
		parse: function( data ) 
		{
			return data.results;
		},
		
		/*
		 * The update method allows for updating the collection with data 
		 * loaded from a new query. 
		 * 
		 * @param The twitter username or topic which is to be loaded.
		 * @param An optional boolean which, when true, specifies that 
		 *        the existing collection items are to be removed.
		 */
		update: function( query, reset )
		{
			this.query = query;
			this.reset().fetch();
		},
		
		/*
		 * Defines a "sort" comparator function which, given two models, 
		 * returns -1 if the first model should come before the second, 
		 * 0 if they are of the same date, and 1 if the first model should 
		 * come after the second.
		 * 
		 * Note: The comparator method is automatically invoked by Backbone
		 * which adding Models to the collection.
		 * 
		 * @see http://documentcloud.github.com/backbone/#Collection-comparator
		 */
		comparator: function( tweet1, tweet2 )
		{
			var tweet1Time = new Date( tweet1.get( 'created_at' ) ).getTime(),
				tweet2Time = new Date( tweet2.get( 'created_at' ) ).getTime();
			
			if ( tweet1Time > tweet2Time ) {
				return -1;
			} 
			return tweet2Time > tweet1Time ? 1 : 0;
		}
	},{
		/*
		 * @static
		 * 
		 * Defines the default query to be used when initially invoking the
		 * underlying service. 
		 */
		DEFAULT_QUERY: 'Epcot',
		
		/*
		 * @static
		 * 
		 * Defines the default query page-size to be used when invoking the
		 * underlying service.
		 */
		DEFAULT_PAGE_SIZE: 40
	});
	return Tweets;
});