function clear_button_action() {	
	var request = new Ajax.Updater(
	  "beerprice",
	  "priceupdater.fragment",
	  {
	    //onSuccess: parseData,
	    //onFailure: showFailure2,
	    method: 'get'
	  }	
	);
}

function parseData(transport) {
  //alert("Executing parseData begin.");
  var response = transport.responseText;
  var jsonObj=eval("(" + response + ")");
  //alert("price is " + jsonobj.price);
  $('beerprice').innerHTML = jsonObj.price;
  //alert(response);
  //$('beerprice').innerHTML = response;
  //alert("Executing parseData end.");
}

function showFailure2(transport) {
  alert("There was an AJAX failure");
}

function showException(transport) {
  alert("there was a javascript exception.");
}