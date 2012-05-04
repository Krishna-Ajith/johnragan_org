require(
	[
		"scripts/jasmine-1.1.0/jasmine.js",
		"scripts/jasmine-1.1.0/jasmine-html.js",
		"scripts/spec/SpecHelper.js",
		"scripts/spec/PlayerSpec.js",
		"scripts/spec/PlayerSpec2.js",
		"scripts/src/Player.js",
		"scripts/src/Song.js"
	], 
	function(util) {
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