function startThingsUp() {
	setupCallbacks();
	setupSelfInvoke();
	setupFuncInvokeFunc();
	setupFuncRewriteFunc();
}
	
function invoke_and_add(a,b) { return a() + b(); }

function one() { return 1; }

function two() { return 2; }

function multiplyByTwo(a, b, c, callback) {
     var i, ar = [];
     for (i = 0; i < 3; i++) {
          ar[i] = callback(arguments[i] * 2);
     }
     return ar;
}


function setupCallbacks() {
	var el = document.getElementById('callback');
	el.innerHTML = invoke_and_add(one, two);
	
	var el = document.getElementById('callback-anon');
	el.innerHTML = invoke_and_add(function() { return 1; }, function() { return 2; });
	
	var el = document.getElementById('callback-arg');
	el.innerHTML = multiplyByTwo(1, 2, 3, function (a) { return a + 1; });
}

function setupSelfInvoke() {
	var el = document.getElementById('self-invoke');
	el.onclick = function() {
		( function(name) {
          	alert( 'Hello ' + name + '!');
     	  }
		)('dude');
		return false;
	}
} 

function a() {
     alert("A!");
     return function() {
          alert('B!');
     }
}

function setupFuncInvokeFunc() {
	var el = document.getElementById('func-return-func');
	el.onclick = function() {
		var c = a(); c();
		return false;
	}
}

function d() {
     alert("A!");
     d = function() {
          alert('B!');
     };
}

function setupFuncRewriteFunc() {
	var el = document.getElementById('rewrite');
	el.onclick = function() {
		d();
		return false;
	}
}  