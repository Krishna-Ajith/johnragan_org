$(function() {
	$('#click_bind_target').bind('click', function() { 
		$('#p_to_update').addClass('highlight');
	});
	
	$('#click_self_target').bind('click', function() {           
		$(this).addClass('highlight');     // Matches the entity that the event fired for
	});
	
	$('#multi_target_div span.multi_target').click(function() {           
		$('body').removeClass();           
	    if (this.id == 'red') {                
	    	$('body').addClass('red');           
	    } else if (this.id == 'blue') {                
	        $('body').addClass('blue');           
	    }          
	    $('#multi_target_div span.multi_target').removeClass('highlight');          
	    $(this).addClass('highlight');      
	});
	
	$('#toggle_target').toggle(function() {           
	     $('#toggle_para').addClass('red');      
	},
	function() {           
	     $('#toggle_para').removeClass('red');      
	});
	
	$('#toggle_target2').click(function() {           
	     $('#toggle_para2').toggleClass('red');      
	});
	
	$('#hover_target').hover(
    	function() { $(this).addClass('red'); }, 
     	function() { $(this).removeClass('red');      
	});
	
	$('#event_target').click(function(event) {           
	     if (event.target == this) {             
	     	$('#event_target').toggleClass('red');           
	     }      
	});
	
	$('#propagation_target').click(function(event) {                      
    	$('#propagation_target').toggleClass('red');           
    	stopPropagation();
	});
	
	var toggleSwitcher = function() {          
	     $('#switcher_target').toggleClass('red');    
	};      
	$('#toggler').click(toggleSwitcher);
	$('#toggler_remover').click(function() {           
	     $('#toggler').unbind('click', toggleSwitcher);  // omitting the second parameter would have removed all handlers for this event on this entity
	});
	
	$('#one_time_clicker').one('click', function() { $('#one_time_target').toggleClass('red'); } );
	
	$('#trigger').click(
		function() {		
			$('#one_time_clicker').trigger('click'); // or .click() as a shortcut
		}
	);
});