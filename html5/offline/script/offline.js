function basicStorage() {
  if (Modernizr.localstorage) {
    var countStr = localStorage["countStr"];
    if (countStr == null) {
      countStr = "0";
    }
    alert("count is " + countStr);
    var count = parseInt(countStr) + 1;
    localStorage["countStr"] = count;
  } else {
    alert("it is not supported");
  }
}

function clearIt() {
  localStorage.removeItem("countStr");
}