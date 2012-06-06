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
	
	/*// adding the grid the using a table
	var makeAGrid = function(cols, rows){
		var tableGrid = $("<table></table>").addClass("tablePosition");
		for(var i = 0; i < rows; i++){
			var row = $("<tr></tr>").addClass("gridRows");
			for(var j = 0; j < cols; j++){
				var col = $("<td></td>").addClass("gridCells");
				row.append(col);
				console.log("a col added" + j);
			}
			tableGrid.append(row);
			console.log("a row added" + i);
		}
		$("#grid").append(tableGrid);
		
	};
	makeAGrid(4, 4);*/
	
	// add columns in the grid
	$('input[name=width]').change(function(e) {
		// disable submitting on press enter key
		if ( e.which == 13 ) e.preventDefault();
		
		var input = $(this).val();
		var numofCols = input - 1;
		var counter = numofCols;
		// the % of width of the cols
		var colWidth = 100/input;
		// clear all columns for redraw
		$('.col').remove();
		// generate the columns
		while(counter > 0){
			var left = (counter-1)*colWidth;
			// debugging 
			console.log("The width:" + colWidth);
			console.log("The left:" + left);
			console.log("The counter:" + counter);
			//make new grid col
			var thisCol = $('<div />', {
			class: 'grid-col'+counter,
			width: colWidth+'%',
			});
			thisCol.css({left:left+'%'});
			thisCol.addClass('col');
			$('#setup').prepend(thisCol);
			counter = counter-1;
		}
	});
	
	// add rows in the grid
	$('input[name=height]').change(function(e) {
		// disable submitting on press enter key
		if ( e.which == 13 ) e.preventDefault();
		
		var input = $(this).val();
		var numofRows = input - 1;
		var counter = numofRows;
		// the % of width of the rows
		var rowHeight = 100/input;
		// clear all columns for redraw
		$('.row').remove();
		// generate the columns
		while(counter > 0){
			var top = (counter-1)*rowHeight;
			// debugging 
			console.log("heigh input:" + input);
			console.log("The width:" + rowHeight);
			console.log("The counter:" + counter);
			//make new grid col
			var thisRow = $('<div />', {
			class: 'grid-row'+counter,
			height: rowHeight+'%',
			});
			thisRow.css({top:top+'%'});
			thisRow.addClass('row');
			$('#setup').prepend(thisRow);
			counter = counter-1;
		}
	});
	
	// expand the new slide section
	$('#new-slide').css('display',"none");
	$('#add-slide, #label-slides').click(function() {
		console.log("toggling");
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

	// change css when disable inputs
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
	
});

//Datepicker and Colorpicker plugins
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
