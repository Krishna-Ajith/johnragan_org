
// If an existing library that you need to use isn't implemented as an 
// AMD module, you can load it as one by simply wrapping it in an AMD 
// module.
define( [ 'loader' ], function( Loader ) {
    return Loader.Backbone;
});
