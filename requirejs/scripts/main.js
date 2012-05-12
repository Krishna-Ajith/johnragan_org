define(["./shirt", "./logger", "./alerts", "./jquery", "alertsv2"], function (shirt, logger, alerts, $, alertsv2) {

	return {
		sayShirtColor : function() {
	        alert("Shirt color is: " + shirt.color + " and title is as follows: " + $('title').text());
			logger.logTheShirt();
			logger.alertv2a2();
	    },
		alert2Out : function() {
			alert2();
		}
	};
});