require.config({
    baseUrl: "scripts",
    paths: {
        "shirt": "src/shirt",
        "logger": "src/logger",
        "alerts": "src/alerts",
        "jquery": "src/jquery"
    },
    waitSeconds: 15,
    locale: "en-en"
});
define("foo", ["shirt", "logger", "alerts", "jquery"], function (shirt, logger, alerts, $) {
  
	return {
		sayShirtColor : function() {
	        alert("Shirt color is: " + shirt.color + " and title is as follows: " + $('title').text());
	        //alert4();
			logger.logTheShirt();
			logger.alertv1a2();
			alert("made it here");
	    }
	};
});