/* provides a simplified node.js server for purposes of serving the example */
var express = require( __dirname + '/build/node_modules/express' ),
	app     = express.createServer(),
	env     = process.argv[2],
	port    = process.argv[3];

app.settings.env = env == 'prod' ? 'production' : 'development';

app.configure( function() 
{
	app.use( express.logger( { format: ':method :url' } ) );
});
app.configure( 'development', function() 
{
	app.use( express.static( __dirname + '/' ) );
});
app.configure( 'production', function() 
{
	app.use( express.static( __dirname + '/deploy/' ) );
});
app.listen( port || 3000 );

console.log( 'Server started in %s mode. Listening on port %d.', app.settings.env, app.address().port );