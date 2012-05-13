// dependencies ...
var requirejs = require( 'requirejs' ),
    wrench    = require( 'wrench' ),
    path      = require( 'path' ),
    fs        = require( 'fs' );
   
// defines the RequireJS build optomization tool configurations ...
var config = {
    baseUrl        : 'src',
    appDir         : path.normalize( '../' ),
    dir            : path.normalize( '../deploy' ),
    mainConfigFile : path.normalize( '../src/main.js' ),
    optimizeCss    : 'standard',
    modules        : [ {'name': 'main'} ],
    fileExclusionRegExp : /(^\.|app.js|build|deploy|spec|todos)/
};

console.log( 'Building Application for production...' );

// kicks-off the build...
requirejs.optimize( config, function( result ) 
{
	var artifacts = ( 'README.md,build.txt,/src/app,vendor/backbone,vendor/handlebars,vendor/jquery,vendor/underscore,' +
	                  'vendor/loader.js,vendor/require/order.js,vendor/require/text.js,/vendor/jasmine,/vendor/sinon' ).split(',');
    
    console.log( 'Removing unused artifacts...' );
    
	artifacts.forEach( function( file ) 
	{
		try {
			file = path.normalize( config.dir + file );
			fs.statSync( file ).isFile() ? fs.unlinkSync( file ) : wrench.rmdirSyncRecursive( file, true );
		} 
		catch(err){
		}
	});
	console.log( 'Build complete' );
});