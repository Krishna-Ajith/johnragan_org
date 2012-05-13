
define( [ 'jQuery', 'Underscore', 'Backbone', 'Tweets', 'TweetListView', 'LoadStatusView', 'ApplicationRouter', 'TweetsHelper' ], 

function( $, _, Backbone, Tweets, TweetListView, LoadStatusView, ApplicationRouter, TweetsHelper )
{
	/*
	 * Defines the top-level ApplicationView which is responsible for 
	 * initializing all dependent sub-views and managing the top-level 
	 * Application View State.
	 */
	var ApplicationView = Backbone.View.extend (
	{
		/*
		 * Defines a reference to the top-level application containing 
		 * element, that is, the #app-container div.
		 */
		el: '#app-container',
		
		/*
		 * Defines mappings of top-level DOM elements to their corresponding
		 * ApplicationView handlers.
		 */	
		events: {
			'click    #category-list li a' : 'setRoute',
			'keypress #search-input'       : 'search'
		},
		
		/*
		 * Defines the constructor function which initializes this View.
		 * Initialization begins by instantiating the Tweets Collection, 
		 * and TweetListView, passing the Tweets Collection by reference 
		 * to the TweetListView instance. Bindings are added to the list
		 * of categories which, when clicked, facilitate the loading of 
		 * a specific Twitter category. 
		 * 
		 * The ApplicationRouter is then initialized to begin monitoring
		 * routes within the application and, an initial route is loaded 
		 * if their is a matched Route within the initial URL, otherwise, 
		 * the first category list item is used as the default Tweet 
		 * Category.
		 */
		initialize: function()
		{
		    this.tweets         = new Tweets();
		    this.tweetsListView = new TweetListView( this.tweets );
		    this.loader         = new LoadStatusView( this.tweets );
		    
		    this.$title = this.$( 'h2' );
		    
		    if ( !this.initializeRouter() ) {
		    	this.search( 'epcot' );
		    }
		    $('.dropdown-toggle').dropdown()
		},

		/*
		 * Initializes the Appliation Router, binding any query changes to
		 * this view's 'update' method. After instantiated of the router,
		 * we invoked router.start which, in turn, invokes History.start, 
		 * passing the result as the return value.
		 */
		initializeRouter: function()
		{
			this.router = new ApplicationRouter();
			this.router.bindQuery( this.update, this );
			
			return this.router.start( false );
		},
		
		/*
		 * The update method updates the Tweets Collection with the current 
		 * Tweet Category (resolved by the ApplicationRouter). In addition, 
		 * the view is then updated to reflect the current Tweet Category, 
		 * which includes updating the Window object's title as well as the 
		 * application title.
		 */
		update: function( path, id )
		{
		    var title = '@' + id;
		    
			this.tweets.update( id );
			this.$title.text( title );
			
			document.title = title + ' - Latest Tweets';
		},
		
		/*
		 * When a specific Tweet category is selected by the User (either 
		 * via a click or tap gesture), the 'setRoute' method is invoked 
		 * which then explictly invokes the ApplicationRouter to navigate
		 * to the URL of the selected Category's URL (defined in the anchor 
		 * tag of the particular category). 
		 * 
		 * We explicitly invoke the routes here rather than using default
		 * route handling of the anchor so as to support both HTML5 Routes 
		 * (PushState ) as well as falling back to Hash Routes on older 
		 * Browsers.
		 */
		setRoute: function( evt )
		{
			evt.preventDefault();
			
            var url = $( evt.target ).attr( 'href' );
            this.router.navigate( url, true );
		},
		
		/*
		 * Initiates a Twitter Search based on either user based input or
		 * an explicit call programmatically.
		 *  
		 * @param evt Either a jQuery Event object triggered from the search
		 *        input, or, a string on which the query is to be based, the
		 *        later being called programmatically while the former being
		 *        called as a result of user input.
		 */
		search: function( evt )
		{
			var $search, 
			    value, 
			    valid,
			    attr = { 'placeholder' : 'Hmm, invalid search...'};
				
			if ( TweetsHelper.isEnterEvent( evt ) )
			{
				evt.preventDefault();

				$search = $( evt.currentTarget );
				
				value = $search.val();
				valid = value.match( /^[a-zA-Z0-9_]{1,15}$/ );
				
				if ( valid ) {
					attr.placeholder = 'Search Twitter'
					this.router.triggerSearch( value );
				}
				$search.attr( attr ).val('').blur();
			}
			else if ( _.isString( evt ) )
			{
				this.router.triggerSearch( evt );
			}
		},
		
		/*
		 * Provides a convenience method for binding a method to this object 
		 * as the bindings context.
		 */
		bind: function( method )
		{
			return _.bind( this[ method ], this );
		}
	});
	return ApplicationView;
});