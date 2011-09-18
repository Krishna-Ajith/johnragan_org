$(function() {
	$("#set_to_blue").css('color','blue')
	
	$("#set_multi").css({'color': 'red', 'text-transform': 'uppercase'})
	
	$("#getter").click(function() {
		var $multi_para = $("#set_multi");
		var color = $multi_para.css('color'); 
		alert(color); 
		} 
	);
	
	$('#font_enlarger').click(function() {
		var $speech = $('#speech');
		var currentSize = $speech.css('fontSize');
		var num = parseFloat(currentSize, 10);
		var unit = currentSize.slice(-2);
		num *= 1.4;
		$speech.css('fontSize', num + unit);
	});	
	
	$('#speech_show p:eq(1)').hide();
	$('span#more').click(function() {
		$('#speech_show p:eq(1)').show('slow');
		$(this).hide('slow');
	});
	$('#speech_show p:eq(1)').click(function() {
		$('span#more').show('fast');
		$(this).hide('fast');
	});
	
	$('#speech-fade p:eq(1)').hide();
	$('span#more-fade').click(function() {
		$('#speech-fade p:eq(1)').fadeIn('slow'); // options are slow (.6 seconds), normal (.4), and fast (.2)
		$(this).fadeOut('slow'); // can specify millis, without quotes, as hide(850);
	});
	$('#speech-fade p:eq(1)').click(function() {
		$('span#more-fade').fadeIn('fast'); // empty is basically instantaneous
		$(this).fadeOut('fast');
	});
	
	$('#speech-slide p:eq(1)').hide();
	$('span#more-slide').click(function() {
		$('#speech-slide p:eq(1)').slideDown('slow'); // options are slow (.6 seconds), normal (.4), and fast (.2)
		$(this).slideUp('slow'); // can specify millis, without quotes, as hide(850);
	});
	$('#speech-slide p:eq(1)').click(function() {
		$('span#more-slide').slideDown('fast'); // empty is basically instantaneous
		$(this).slideUp('fast');
	});
	
	$('#more-custom').click(function() {
		$('#speech-custom p:eq(1)').animate({left: 1000, height: 0, opacity: 0}, 'normal');
	});
	
	$('#more-queued').click(function() {
		$('#speech-queued p:eq(1)')
			.fadeTo('slow',0.5)
			.fadeTo('slow',1.0)
			.slideUp('slow')
			.slideDown('slow', function() {
				$(this).css('backgroundColor','#f00');
			});
	});
	
	$('#speech-multiple p:eq(3)').css('backgroundColor', '#fcf').hide();
	$('#speech-multiple p:eq(2)').css('backgroundColor', '#cff').click(function() {
		$(this).slideUp('slow').next().slideDown('slow');
	});
	
	$('#speech-callback p:eq(3)')
			.css('backgroundColor', '#fcf')
			.hide();
	$('#speech-callback p:eq(2)')
		.css('backgroundColor', '#cff')
		.click(function() {
			var $thisPara = $(this);
			$thisPara.next().slideDown('slow',function() {
				$thisPara.slideUp('slow');
			});
		}
	);
});