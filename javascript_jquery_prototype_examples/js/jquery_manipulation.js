$(function() {
	$('#attr_getter').click( function() {
		alert($('#attr_getter').attr('id'));
	});
	
	$('#attr_setter').click( function() {
		$('#attr_setter').attr({'some_attr': 'new_value'})
		alert($('#attr_setter').attr('some_attr'));
	});
	
	$('#each_example li').each(function(index) {
		$(this).attr({
			'rel': 'external',
			'id': 'wikilink-' + index
		});
		$(this).click(function() {
			alert($(this).attr('id'));
		});
	});
	
	$('<li>Dynamic Insertion</li>').insertAfter('#insert_after_example li');
	
	$('#insert_after_example2 li').after('<li>Dynamic Insertion</li>');	
	
	$('<li>Dynamic Insertion</li>').insertBefore('#insert_before_example li');
	
	$('#insert_before_example2 li').before('<li>Dynamic Insertion</li>');	
	
	$('<a href="http://www.cnn.com">Go to CNN</a>').prependTo('#prependTo p');
	
	$('#prepend p').prepend('<a href="http://www.cnn.com">Go to CNN</a>');
	
	$('<a href="http://www.cnn.com">Go to CNN</a>').appendTo('#appendTo p');
	
	$('#append p').append('<a href="http://www.cnn.com">Go to CNN</a>');
	
	$('li.footnote').insertAfter('#last_li');
	
	$('#wrap').wrap('<div class="red"></div>');
	
	$('#deep_clone').clone().insertAfter('#deep_clone');
	
	$('#shallow_clone').clone(false).insertAfter('#shallow_clone');
	
	$('.odd').remove()
	
	$('#emptying').empty();
	$('#emptying').append("<p>new paragraph</p>");
	
	$('#html_example').html("<b>have a nice day</b>");
	$('#text_example').text("<b>have a nice day</b>");
});