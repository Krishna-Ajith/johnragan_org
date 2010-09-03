function show_map(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var accuracy = position.coords.accuracy;
  alert("latitude is: " + latitude);
  alert("longitude is: " + longitude);
  alert("accuracy is: " + accuracy);
}

function handle_error(err) {
  if (err.code == 1) {
    alert("user said no!");
  } else if (err.code == 2) {
    alert("network or positioning satellites cannot be contacted");
  } else if (err.code == 3) {
    alert("the system timed out");
  } if (err.code == 4) {
    alert("an unknown error occurred");
  }
}

function basicGeo() {
  if (Modernizr.geolocation) {
    navigator.geolocation.getCurrentPosition(show_map, handle_error, 
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 20000}); // properties for last parameter are optional
    //alert("it is supported");
  } else {
  // no native support; maybe try Gears?
  }
}