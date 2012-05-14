
/*
 * Initializes the application by instantiating the top-level 
 * ApplicationView once the document has been loaded. 
 */
define( [ 'jQuery', 'ApplicationView' ], function( $, ApplicationView ) 
{
	// JPR - This simply says execute this once the DOM is loaded (standard jQuery)
	$( function() {
		var application = new ApplicationView();
	});
})

