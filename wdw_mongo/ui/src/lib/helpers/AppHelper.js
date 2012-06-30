/*
 * Copyright (c) 2012 Wireless Matrix Inc., All Rights Reserved
 */
define(['$','_'], function( $, _ )
{
	var _root = location.protocol + '//' + window.location.hostname,
	    _path = '/' + window.location.pathname.split( '/' )[1] + '/';
	
	/*
	 * The helper module provides a generic, all static utility API which 
	 * contains convenience methods used within the Tweets Application.
	 */
    var helper =
    {    
    	/*
    	 * Returns the root URI path component of the application; e.g. /tablet/
    	 */
    	rootURI: function(port) {
    		return !port ? _root : _root + ':' + location.port;
    	},
    		
    	/*
    	 * Returns the root URI path component of the application; e.g. /tablet/
    	 */
    	rootURIPath: function() {
    		return _path;
    	},
    	
		/*
		 * Determines if the given string is empty, that is if it 
		 * is null or only contains whitespace charachters alone.
		 */
		isWhitespace: function( source ) {
			return /^\s*$/.test( source );
		},
		
    	/*
    	 * Determines if the specified argument is an event and if the event is
    	 * an enter key event.
    	 */
    	isEnterEvent: function( evt ) {
    		return evt && evt.keyCode === 13;
    	},
		
    	/*
    	 * Determines if the specified argument is an event and if the event is
    	 * an enter key event or a click/tap gesture.
    	 */ 	
    	isSubmitGesture: function( evt ) {
    		return this.isEnterEvent( evt ) || evt.type === 'click' || evt.type === 'tap';
    	}
    };
    return helper;
});