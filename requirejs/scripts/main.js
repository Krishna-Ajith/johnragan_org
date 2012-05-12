define(["./shirt", "./logger", "./alerts", "./jquery"], function (shirt, logger, alerts, $) {

	return {
		sayShirtColor : function() {
	        alert("Shirt color is: " + shirt.color + " and title is as follows: " + $('title').text());
			alert2();
			logger.logTheShirt();
	    },
		alert2Out : function() {
			alert2();
		}
	};
});