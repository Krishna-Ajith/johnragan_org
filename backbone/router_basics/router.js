AppRouter = Backbone.Router.extend({
    routes: {
        "/posts/:id": "getPost",
        "/download/*path": "downloadFile",
        "/:route/:action": "loadView",
        "*actions": "defaultRoute" // matches http://example.com/#anything-here
    }
    , getPost: function(id) {
      alert("Get post number " + id);
    }
    , downloadFile: function(path){
        alert(path);
    }
    , loadView: function(route, action) {
      alert(route + "_" + action);
    }
    , defaultRoute: function(actions){
        alert(actions);
    }
});

var app_router = new AppRouter();
Backbone.history.start();