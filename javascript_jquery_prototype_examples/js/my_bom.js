function startThingsUp() {
	setupUserAgent();
	setupFeatureSniffing();
	setupWindowLocation();
	setupSwitchToNewPage();
	setupReloadPage();
	setupHistory();
	setupScreenInfo();
	setupDisplayWindow();
	setupInterval();
}

function setupUserAgent() {
	var el = document.getElementById('userAgent');
	el.innerHTML = window.navigator.userAgent;
}

function setupFeatureSniffing() {
	var el = document.getElementById('feature_sniffing');
	if (typeof window.addEventListener == 'function') {
		el.innerHTML = 'feature is supported';
	} else {
		el.innerHTML = 'feature is not supported';
	}
}

function setupWindowLocation() {
	var el = document.getElementById("window_location");
	el.innerHTML = window.location.href;
}

function setupSwitchToNewPage() {
	var el = document.getElementById('relocate');
	el.onclick = function() {
		window.location.href = "http://www.cnn.com"
		return false;
	}
}

function setupReloadPage() {
	var el = document.getElementById('reload');
	el.onclick = function() {
		location.reload();
		return false;
	}
}

function setupHistory() {
	var el = document.getElementById('history_length');
	el.innerHTML = history.length;

	var el = document.getElementById('history_forward');
	el.onclick = function() {
		history.forward();
		return false;
	}
	
	var el = document.getElementById('history_backward');
	el.onclick = function() {
		history.go(-1);
		return false;
	}
}

function setupScreenInfo() {	
	var el = document.getElementById("color_depth");
	el.innerHTML = window.screen.colorDepth;
	
	var el = document.getElementById("width");
	el.innerHTML = screen.width;
	
	var el = document.getElementById("avail_width");
	el.innerHTML = screen.availWidth;
	
	var el = document.getElementById("height");
	el.innerHTML = screen.height;
	
	var el = document.getElementById("avail_height");
	el.innerHTML = screen.availHeight;
}

function closePopup() {
	gWin.close();
}

function setupDisplayWindow() {
	var el = document.getElementById('popup');
	el.onclick = function() {
		gWin = window.open('http://www.cnn.com', 'cnn', 'width=300, height=300, resizable=yes, status=yes');
		setTimeout(closePopup, 5000);
		return false;
	}
}

function boo() {
	alert('boo!');
}

function setupInterval() {
	var start = document.getElementById("start_interval");
	start.onclick = function() {
		gInterval = setInterval(boo, 10000);
		return false;
	}
	
	var stop = document.getElementById("stop_interval");
	stop.onclick = function() {
		clearInterval(gInterval);
		return false;
	}
}