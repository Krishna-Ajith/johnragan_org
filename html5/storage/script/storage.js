function basicStorage() {
//  if (window.addEventListener) {
//    window.addEventListener("storage", handle_storage, false);
//  } else {
//    window.attachEvent("onstorage", handle_storage);
//  };
  
  if (Modernizr.localstorage) {
    var countStr = localStorage["countStr"];
    if (countStr == null) {
      countStr = "0";
    }
    alert("count is " + countStr);
    var count = parseInt(countStr) + 1;
    localStorage["countStr"] = count;
  } else {
    //alert("it is not supported");
  }
}

//function handle_storage(e) {
//  if (!e) { e = window.event; }
//  alert("event info for key: " + e.key + ", oldValue: " + e.oldValue + ", newValue: " + e.newValue);
//}

function clearIt() {
  localStorage.removeItem("countStr");
}