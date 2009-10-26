$(function() {
	$('div .para1').addClass('highlight');
	
	$('p[h5]').addClass('highlight');
	
	$('p[h6]*="bar"').addClass('red');
	
	$('a[title]').addClass('title_link');
	
	$('a[href^="pdf:"]').addClass('title_link_green');
	
	$('p:contains("magic")').addClass('blue');
	
	$('#unique li:odd').addClass('green');
	
	$('#black_sheep').parent().children().addClass('highlight');
	
	$('#filter li').filter(':odd').addClass('red');
	
	$('#equal li:eq(2)').addClass('highlight').next().addClass('blue');
	
	$('#siblings li:contains("3")').siblings().addClass('green').end().addClass('red');
});