$(document).ready(function(){
	// switch 
	$('.switch').css('background', 'url("../images/switchf.png")');
	$('.onOff').css('display','none');
	$('.on, .off').css('text-indent','-10000px');
	
	$('input[name=onOff]').change(function() {
		var button = $(this).val();
		
		if(button == 'off'){ $('.switch').css('background-position', 'right'); }
        if(button == 'on'){ $('.switch').css('background-position', 'left'); }  
 
	});
	
	// expand the new slide section
	$('#new-slide').css('display',"none");
	$('#add-slide').click(function() {
		 $('#new-slide').slideToggle("slow");
    	return false;
	});
	
	// draw a grid on the expaned section

	// selection buttons
	$('.selector').css({
		'background': 'url("../images/selectorsf.png")',
		'backgroundRepeat': 'no-repeat',
		'backgroundPosition': 'top left'
	
	});
	$('.select').css('display','none');
	$('.top, .btm').css('text-indent','10px');
	
	$('input[name=ticker-select]').change(function() {
		var button = $(this).val();
		
		if(button == 'top'){ $('.selector').css('background-position', 'top left'); }
        if(button == 'btm'){ $('.selector').css('background-position', 'bottom left'); }  
 
	});

	
	/*$('#add-slide').click(function() {
		if( $('#new-slide').height()==0)
		 $('#new-slide').animate({height:'100%'});
		else
		 $('#new-slide').animate({height:'0px'});
	});*/
});