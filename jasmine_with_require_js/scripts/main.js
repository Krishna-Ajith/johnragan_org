require(
	[
		"jasmine-1.1.0/jasmine",
		"jasmine-1.1.0/jasmine-html",
		"spec/SpecHelper",
		"spec/PlayerSpec",
		"spec/PlayerSpec2",
		"src/Player",
		"src/Song"
	], 
	function(jasmineModule) {
		(function() {
	      var jasmineEnv = jasmine.getEnv();
	      jasmineEnv.updateInterval = 1000;

	      var htmlReporter = new jasmine.HtmlReporter();

	      jasmineEnv.addReporter(htmlReporter);

	      jasmineEnv.specFilter = function(spec) {
	        return htmlReporter.specFilter(spec);
	      };

	      var currentWindowOnload = window.onload;

	      window.onload = function() {
	        if (currentWindowOnload) {
	          currentWindowOnload();
	        }
	        execJasmine();
	      };

	      function execJasmine() {
	        jasmineEnv.execute();
	      }

	    })();
});