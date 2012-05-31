
define( [ 'jQuery', 'Underscore' ], function( $, _ )
{
	// cache initial values via the module's closure...
	var _root      = '/' + window.location.pathname.split( '/' )[1] + '/',
		_hasLogger = typeof console !== 'undefined',
		_slice     = Array.prototype.slice;
	
	/*
	 * The helper module provides a generic, all static utility API 
	 * which contains convenience methods used within the Tweets 
	 * Application.
	 * 
	 */
    var MoviesHelper =
    {
    	/*
    	 * Wraps the native console.log method for compatibility with 
    	 * older browsers.
    	 * 
    	 */
    	log: function()
    	{
    		if ( _hasLogger ) {
    			console.log( _slice.call( arguments ) );
    		}
    	},
    	
    	/*
    	 * Returns the root URI path component of the applicaiton; 
    	 * e.g. /tablet/
    	 * 
    	 */
    	rootURIPath: function()
    	{
    		return _root;
    	},
    	
    	/*
    	 * Determines if the specified argument is an event and if 
    	 * the event is an enter key event.
    	 * 
    	 */
    	isEnterEvent: function( evt )
    	{
    		return evt && evt.keyCode === 13;
    	}
    }
    return MoviesHelper;
});