
define( [ 'jQuery', 'Backbone' ], function( $, Backbone ) 
{
	/*
	 * Defines the LoadStatusView which is responsible for displaying the 
	 * tweets loading / progress and results status within the application.
	 */
	var LoadStatusView = Backbone.View.extend (
	{
		/*
		 * Defines a reference to the loader containing element; a <div>.
		 */
		el: '#loader',
		
		/*
		 * Defines the constructor function which initializes the LoaderView.
		 * 
		 * The LoaderView simply binds to the underlying Tweets collection's
		 * 'reset' event, toggling the display state of the loader element
		 * accordingly.
		 * 
		 */
		initialize: function( movies )
		{ 
			this.movies = movies;
			this.movies.bind( 'reset', this.render, this );
			this.isShowing   = false;
			this.$status = $( '#status' );
			this.$status.hide();
		},
		
		/*
		 * The 'all' method is typically invoked when the underlying Tweets
		 * Collection is reset, at which point the old list of Tweets is
		 * removed from the DOM and replaced with the new Tweets in the
		 * collection.
		 * 
		 */
		render: function()
		{
			this.$el[ this.isShowing ? 'hide' : 'show' ]();

			this.isShowing = !this.isShowing;
			
			this.$status[ !this.isShowing && this.movies.length == 0 ? 'show' : 'hide' ]();
			
			return this;
		},		
	});
	return LoadStatusView;
});