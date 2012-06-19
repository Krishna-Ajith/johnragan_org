define( [ 'Handlebars' ], function(  Handlebars ) 
{
	Handlebars.registerHelper( 'ratingFormatter', function( rating )
	{ 
		if ( rating <= 4 ) 		return "badge-success"; 
		if ( rating <= 7 ) 		return "badge-info"; 
		
		return "badge-important"; 
	});
	
	Handlebars.registerHelper( 'waitFormatter', function( wait )
	{ 
		if ( wait == "Idle" ) 		return "badge-success"; 
		
		return "badge-important"; 
	});
})