define(["shirt", "alerts"], function (shirt) {
    return {
        logTheShirt: function () {
            console.log("color: " + shirt.color + ", size: " + shirt.size);
        },
		alertv1a2 : function() {
			alert2();
		}
    };
});