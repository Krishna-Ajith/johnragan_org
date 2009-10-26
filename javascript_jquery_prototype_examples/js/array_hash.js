function startThingsUp() {
	setupFuncRewriteFunc();
}

function setupFuncRewriteFunc() {
	var el = document.getElementById('rewrite');
	el.onclick = function() {
		var obj = {
     		name: "Tree Frog",
     		size: "small",
     		color: ['green', 'red'],
     		toes: "pobbly"
		};

		var hash = $H(obj);
		var result = hash.findAll( function(pair) { return pair.key.length == 4; } );
		alert(result);
		alert("1");
		var ints=$R(1,6);
		alert("2");
		alert(ints.map(  function(value) { return value; }  ));
		alert("3");
		return false;
	}
} 