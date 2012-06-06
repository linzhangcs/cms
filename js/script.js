$(document).ready(function(){
	// disable when the switch is on off
	$('.switch').css('background', 'url("../images/switchf.png")');
	$('.onOff').css('display','none');
	$('.on, .off').css('text-indent','-10000px');
	
	$('input[name=onOff]').change(function() {
		var button = $(this).val();
		
		if(button == 'off'){ 
			$('.switch').css('background-position', 'right'); 
			// disable all inputs
			$('#start-date, #end-date, #start-time, #end-time, #ticker-select, #ticker-pos').attr('disabled', 'disabled');
		}
        if(button == 'on'){ 
        	$('.switch').css('background-position', 'left'); 
        	//$('#start-date, #end-date').css('background-position','left'); 
        	// remove disable sitting from input elements
        	$('#start-date, #end-date, #start-time, #end-time, #ticker-select, #ticker-pos').removeAttr('disabled');
        }  
	});
	// expand the new slide section
	$('#new-slide').css('display',"none");
	$('#add-slide').click(function() {
		 $('#new-slide').slideToggle("slow");
    	return false;
	});

	// radio switch buttons
	$('.ticker-selector, .info-selector, .title-selector, .text-selector').css({
		'background': 'url("../images/selectorsf.png")',
		'backgroundRepeat': 'no-repeat',
		'backgroundPosition': '25% 5%',
	});
		//title and text radio switch buttons
	$('.title-selector, .text-selector').css({
		'background': 'url("../images/selectorsf.png")',
		'backgroundRepeat': 'no-repeat',
		'backgroundPosition': '0% 5%',
	});
	$('.select, .info-select, .title-select, .text-select').css('display','none');
	$('.top, .btm').css('text-indent','-10000px');

	
	$('input[name=ticker-select]').change(function() {
		var button = $(this).val();
		
		if(button == 'top'){ $('.ticker-selector').css('background-position', '25% 5%'); }
        if(button == 'btm'){ $('.ticker-selector').css('background-position', '25% 100%'); }  
 
	});

	$('input[name=info-panel-select]').change(function() {
		var button = $(this).val();
		
		if(button == 'top'){ $('.info-selector').css('background-position', '25% 5%'); }
        if(button == 'btm'){ $('.info-selector').css('background-position', '25% 100%'); }  
 
	});
	
	$('input[name=title-select]').change(function() {
		var button = $(this).val();
		
		if(button == 'top'){ $('.title-selector').css('background-position', '0% 5%'); }
        if(button == 'btm'){ $('.title-selector').css('background-position', '0% 100%'); }  
 
	});
	
	$('input[name=text-select]').change(function() {
		var button = $(this).val();
		
		if(button == 'top'){ $('.text-selector').css('background-position', '0% 5%'); }
        if(button == 'btm'){ $('.text-selector').css('background-position', '0% 100%'); }  
 
	});
	
	/*$('#add-slide').click(function() {
		if( $('#new-slide').height()==0)
		 $('#new-slide').animate({height:'100%'});
		else
		 $('#new-slide').animate({height:'0px'});
	});*/
});

//Datepicker and Colorpicker
$(function(){
	var format = {
            dateFormat: 'MM d, yy'
        };
	
	// Datepicker
	$('#start-date, #end-date').datepicker(format);
	// Timepicker
	$('#start-time, #end-time').timepicker();
	//hover states on the static widgets
	$('#dialog_link, ul#icons li').hover(
		function() { $(this).addClass('ui-state-hover'); },
		function() { $(this).removeClass('ui-state-hover'); }
		);
	
	// Colorpicker
	$('input#color-picker').miniColors({});
});
