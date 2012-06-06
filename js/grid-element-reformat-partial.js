// SlideElement
function SlideElement(type){
	this.type = type;
}

SlideElement.prototype.getType = function(){
	console.log(this.type);
};

SlideElement.prototype.setType = function(newType){
	this.type = newType;
	console.log("The type is set to " + this.type);
};


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
        	// remove disable sitting from input elements
        	$('#start-date, #end-date, #start-time, #end-time, #ticker-select, #ticker-pos').removeAttr('disabled');
        }  
	});
		
	// adding the grid
	var makeGrid = function(cols, rows){
		// clean and remove all element from the slide background
		// $('.col, .row, #grid-table').remove();
		$('.col, .row').remove();
		var tableGrid = $("<table></table>").addClass("tablePosition");
		tableGrid.attr("id", "grid-table");
		for(var i = 0; i < rows; i++){
			var row = $("<tr></tr>").addClass("gridRows");
			row.css({
				width: 100+"%",
				height: 100/rows + "%"
			});
			for(var j = 0; j < cols; j++){
				var col = $("<td></td>").addClass("gridCells");
				col.attr("id", "Row"+i+"Col"+j);
				col.css({
					width: 100/cols + "%", 
				});
				//row.append(col.text("someText"));
				row.append(col);
				console.log("a col added" + j);
			}
			tableGrid.append(row);
			console.log("a row added" + i);
		}
		$("#slide-bg").append(tableGrid);
	};
	
		// get the current user input grid size
		var getInputGridSize = function(){
		
		var inputWidth =  $('input[name=width]').val();
		var inputHeight =  $('input[name=height]').val();
		var width = inputWidth ? inputWidth : '4';
		var height = inputHeight ? inputHeight : '4';

		//console.log(width);
		//alert(height);
		
		var size = new Array(width, height);
		return size;
	};
	
	makeGrid(4, 4);
	
	// grid reformat helper functions
	var adjustGrid = function(gridTable, deltaRow, deltaCol){
		// check the grid size width and height
		var size = getInputGridSize(); 
		// if the deltaRow and deltaCol is positive - add the rows
		// else subtract the rows
		if(deltaRow > 0)
		{
			for(var i = 0; i < deltaRow; i++)
			{
				var row = $("<tr></tr>").addClass("gridRows");
				row.css
				({
					width: 100+"%",
					//height: 100/rows + "%"
				});
				for(var j = 0; j < size[0]; j++)
				{
					var col = $("<td></td>").addClass("gridCells");
					col.attr("id", "Row"+size[1]+i+"Col"+j);
					col.css({
						width: 100/size[0] + "%", 
					});
					//row.append(col.text("someText"));
					row.append(col);
					console.log("a col added" + j);
				}
				gridTable.append(row);
				console.log("a row added" + i);
			} 
			
		}
		else if (deltaRow < 0)
		{
			var numberRow = gridTable.attr('rows').length-1;
			var counter = deltaRow;
			while(counter < 0)
			{
				
				$('tr:eq('+numberRow+')').remove();
				console.log("number of rows: "+gridTable.attr('rows').length);
				counter ++;
				numberRow --;
			}
			
		}		// if the deltaRow and deltaCol is negative
		
		
	};
	var table = $('#grid-table');
	adjustGrid(table, -2, 0);
	
	//var inputWidth = $('input[name=width]');
	//var inputHeight = $('input[name=height]');
	
	$('input[name=width], input[name=height]').change(function(e) {
		// disable submitting on press enter key
		if ( e.which == 13 ) e.preventDefault();
			
			var size = getInputGridSize();
			console.log("input size: "+ size[0] + size[1]);
			//adjustGrid();
			makeGrid(size[0], size[1]);
			
	});
	
	// when the a td is click and it doesn't have an element inside, add a new element. 
	 $("body").delegate("td", "click", function(){
      	
      	var elemCounter = 0; 
		var colIndex = $(this).parent().children().index($(this));
		var rowIndex = $(this).parent().parent().children().index($(this).parent());
		//alert('Row: ' + rowIndex + ', Column: ' + colIndex);
		//alert($(this).children().length);
		
		if($(this).children().length === 0)
		{
			var element = new SlideElement("Auction");
				elemCounter ++; 
			element.getType();
			var elemDiv = $("<div></div>").addClass("slide-element");
			elemDiv.attr('id', "elem" + elemCounter);
			elemDiv.css({'width':97 +'%', 'height': 98 +'%'});

			$(this).append(elemDiv);
		}
		
		// Draggable & Resizable Starts
		
		var size = getInputGridSize();
		var gridWidth;
		var gridHeight;
		gridWidth = $('#slide-bg').width()/size[0];
		gridHeight = $('#slide-bg').height()/size[1];
		
		$('#slide-bg').droppable({
   		tolerance: 'fit'
	});

	$('.slide-element').draggable({
    	revert: 'invalid',
    	stop: function(){
        	$(this).draggable('option','revert','invalid');
    	},
    	grid: [gridWidth, gridHeight]
    	//grid: [5,5]
	});
	
	$('.slide-element').droppable({
    	greedy: true,
    	tolerance: 'touch',
    	drop: function(event,ui){
        ui.draggable.draggable('option','revert',true);
    	}
	});
	
	$('.slide-element').resizable({
		grid: [gridWidth, gridHeight],
		containment: '#slide-bg'
	});
	
	// Draggable & Resizable Ends
		console.log('Row: ' + rowIndex + ', Column: ' + colIndex);
		console.log("Width: " + $(this).width() + "Height: " + $(this).height());
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


