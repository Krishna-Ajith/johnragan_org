require.config({
    baseUrl: "scripts",
    paths: {
        "shirt": "src/shirt",
        "logger": "src/logger",
        "alerts": "src/alerts",
        "jquery": "src/jquery",
        "alertsv2": "src/alertsv2",
    },
    waitSeconds: 15,
    locale: "en-en"
});
define("foo", ["shirt", "logger", "alerts", "jquery", "alertsv2"], function (shirt, logger, alerts, $, alertsv2) {
  
	return {
		sayShirtColor : function() {
	        alert("Shirt color is: " + shirt.color + " and title is as follows: " + $('title').text())
	        alert4();
			logger.logTheShirt();
			logger.alertv1a2();
	    }
	};
});