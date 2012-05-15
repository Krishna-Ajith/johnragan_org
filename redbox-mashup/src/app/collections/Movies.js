
define( [ 'Underscore', 'Backbone', 'Movie', 'Handlebars', 'vendor/xml_to_json.js', 'text!app/config/movie.search.url.config' ], 

function( _, Backbone, Movie, Handlebars, xmltojson, config )
{
	// http://api.netflix.com/catalog/titles/autocomplete?oauth_consumer_key=jyuz5gs3j28h4aavnykhkm3e&term=warrior
	
	/*
	 * Defines the Tweets Collection which is used to manage a collection
	 * of Tweet Model instances. All Tweets are loaded via the current query 
	 * property value against the underlying service.
	 */
	var Movies = Backbone.Collection.extend (
	{
		/*
		 * Defines the Model Class to which the Tweets collection is bound.
		 */
		model: Movie,
		
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
				this.query    = options.query    || Movies.DEFAULT_QUERY;
				this.pageSize = options.pageSize || Movies.DEFAULT_PAGE_SIZE;
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
		comparator: function( movie1, movie2 )
		{
			var movie1Time = new Date( movie1.get( 'created_at' ) ).getTime(),
				movie2Time = new Date( movie2.get( 'created_at' ) ).getTime();
			
			if ( movie1Time > movie2Time ) {
				return -1;
			} 
			return movie2Time > movie1Time ? 1 : 0;
		}
	},{
		/*
		 * @static
		 * 
		 * Defines the default query to be used when initially invoking the
		 * underlying service. 
		 */
		DEFAULT_QUERY: 'Warrior',
		
		/*
		 * @static
		 * 
		 * Defines the default query page-size to be used when invoking the
		 * underlying service.
		 */
		DEFAULT_PAGE_SIZE: 40
	});
	return Movies;
});