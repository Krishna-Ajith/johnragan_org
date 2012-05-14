define( [ 'Backbone', 'Handlebars', 'text!app/templates/movie.tpl' ], 

function( Backbone, Handlebars, template ) 
{
	/*
	 * Defines the TweetView which is responsible for managing a single Tweet
	 * Model in the DOM.
	 */
	var MovieView = Backbone.View.extend (
	{
		/*
		 * Defines the type of element which is to be created by the View when 
		 * a new TweetView instance is instantiated. This element simply serves
		 * as the wrapper element of an an individual Tweet. The template property
		 * then creates the specific Tweet View.
		 */
		// JPR - This is backbone sepecific.  If not specified,new instances would be a div.  Not sure
		// why this is defined in the single instance view as opposed to collections.
		tagName: "li",

		/*
		 * Defines the template which is used to create new Tweet views.
		 * The template is defined under: app/templates/tweet.handlerbars.tpl
		 */
		template: Handlebars.compile( template ),
		
		/*
		 * Defines the constructor function which initializes a new TweetView.
		 * 
		 * The TweetView constructor initializes by binding to it's associated
		 * Tweet Model instance's 'change' and 'destroy' method so as to ensure
		 * the Models current state is reflected within this view.
		 */
		initialize: function()
		{
			this.model.bind( 'change',  this.render, this );
			this.model.bind( 'destroy', this.remove, this );
		},

		/*
		 * Renders this TweetView instance to the DOM via it's model's underlying 
		 * JSON object representation.
		 */
		render: function()
		{
			this.$el.html( this.template( this.model.toJSON() ) );
			
			return this;
		},

		/*
		 * Removes this TweetView instance from the DOM.s
		 */
		remove: function()
		{
			this.$el.remove();
		}
	});
	return MovieView;
})
