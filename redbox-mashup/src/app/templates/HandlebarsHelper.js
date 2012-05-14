define( [ 'Handlebars' ], function(  Handlebars ) 
{
	/*
	 * Registers a handlebar Helper method which handles the formatting
	 * of an individual Tweet Date.
	 * 
	 */
	Handlebars.registerHelper( 'dateFormatter', function( time )
	{
		var tweet_date = new Date( time ), 
			user_date  = new Date(),
			diff = Math.floor( ( user_date - tweet_date ) / 1000 );
		 
		if ( diff <= 1 ) 		return "just now"; 
		if ( diff < 20 ) 		return diff + " seconds ago"; 
		if ( diff < 40 ) 		return "half a minute ago"; 
		if ( diff < 60 ) 		return "less than a minute ago"; 
		if ( diff <= 90 ) 		return "one minute ago"; 
		if ( diff <= 3540 ) 	return Math.round( diff / 60 ) + " minutes ago"; 
		if ( diff <= 5400 ) 	return "1 hour ago"; 
		if ( diff <= 86400 ) 	return Math.round( diff / 3600 ) + " hours ago"; 
		if ( diff <= 129600 ) 	return "1 day ago"; 
		if ( diff < 604800 ) 	return Math.round( diff / 86400 ) + " days ago"; 
		if ( diff <= 777600 ) 	return "1 week ago"; 
		
		return "on " + time; 
	});
	
	/*
	 * Registers a handlebar Helper method which handles the formatting
	 * of an individual Tweet. Any plain text link matches are converted
	 * to anchor tags.
	 * 
	 */
	Handlebars.registerHelper( 'markup', function( text )
	{
		var protocol = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
			scheme   = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

		text = text.replace( protocol, '<a href="$1" target="_blank">$1</a>');
		text = text.replace( scheme,   '$1<a href="http://$2" target="_blank">$2</a>' );

		return new Handlebars.SafeString( text );
	});
})