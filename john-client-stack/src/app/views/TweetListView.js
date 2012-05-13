
define( [ 'jQuery', 'Underscore', 'Backbone', 'Tweets', 'TweetView' ], 

function( $, _, Backbone, Tweets, TweetView ) 
{
	/*
	 * Defines the TweetListView which is responsible for managing the list
	 * of Tweets. The TweetListView binds to a Tweets collection, updating
	 * itself to reflect the current items in the Tweets Collection.
	 * 
	 */
	var TweetListView = Backbone.View.extend (
	{
		/*
		 * Defines a reference to the tweets list containing element; an 
		 * unordered list which is defined in the DOM.
		 * 
		 */
		el: '#tweets-list',
		
		/*
		 * Defines the constructor function which initializes the TweetListView.
		 * 
		 * The TweetListView constructor accepts and optional Tweets collection
		 * and, adds appropriate bindings to allow for automatically reflecting
		 * the current state of the collection. If the Tweets collection contains
		 * a value for it's 'query' property, the collection will have it's fetch
		 * method invoked so as to load the initial list of Tweets and render them
		 * via the TweetListView.
		 */
		initialize: function( tweets )
		{
            this.tweets = tweets || new Tweets();
			this.tweets.bind( 'reset', this.reset, this );
			this.tweets.bind( 'add',   this.add,   this );
			
			if ( this.tweets.query )
			{
				this.tweets.fetch();
			}
		},
		
		/*
		 * Adds a new TweetView instance to this TweetListView, rendering
		 * the Tweet to the DOM.
		 * 
		 * @param Tweet Model instance which is to be added to the DOM.
		 */
		add: function( tweet )
		{
			var tweetView = new TweetView ( { 
				'model' : tweet 
			});
			this.$el.append( tweetView.render().el );
		},
		
		/*
		 * The 'all' method is typically invoked when the underlying Tweets
		 * Collection is reset, at which point the old list of Tweets is
		 * removed from the DOM and replaced with the new Tweets in the
		 * collection.
		 */
		reset: function()
		{
			this.$el.empty();
			this.tweets.each( _.bind( this.add, this ) );
		},		
	});
	return TweetListView;
})
