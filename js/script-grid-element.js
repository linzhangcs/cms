// SlideElementnm                                                                                                                                                                                                                          
function SlideElement(type, xPos, yPos, width, height, container){
	// Need position(x,y), size(width, height) for each element
	
	this.type = type;
	this.xPos = xPos;
	this.yPos = yPos;
	this.width = width;
	this.height = height;
	this.container = container;
	this.innerItems = "";
	
	switch(type)
	{
	   case "auction": 
	       this.innerItems = "<select name=\"typeSelection\" id=\"typeSelection\"><option value=\"Auction\">Auction</option><option value=\"Blog\">Blog</option><option value=\"Bonds\">Bonds</option></select>";
	       break;
	   default:
	       this.innterItems = "";
	}

}

SlideElement.prototype.getType = function(){
	console.log(this.type);
	return this.type;
};

SlideElement.prototype.setType = function(newType){
	this.type = newType;
	console.log("The type is set to " + this.type);
};

SlideElement.prototype.updatePos = function(newXPos, newYPos){
    this.xPos = newXPos;
    this.yPos = newYPos;
    console.log("This element has updated its pos to xPos"+ this.xPos +" yPos " + this.yPos);
};

SlideElement.prototype.updateSize = function(newWidth, newHeight){
    this.width = newWidth;
    this.height = newHeight;
    console.log("This element has updated its size to width"+ this.width +" height " + this.height);
};

SlideElement.prototype.updateContainer = function(newContainer){
    this.container = newContainer;
    console.log("This element has updated its container element to " + this.container);
};

SlideElement.prototype.toString = function(thisElement){
    for(var property in thisElement)
    {   
        if ( typeof(thisElement[property]) !== "function")
        {
            console.log(property + " : " + thisElement[property]);
        } 
    }
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
	
	// function for adding grid 
	var makeGrid = function(cols, rows){
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
				row.append(col);
				console.log("a col added" + j);
			}
			tableGrid.append(row);
			console.log("a row added" + i);
		}
		$("#slide-bg").append(tableGrid);
	};
	
	// set up the initial gird
	makeGrid(4, 4);
	
		// function that returns the current user input grid size
		var getInputGridSize = function(){

		var inputWidth =  $('input[name=width]').val();
		var inputHeight =  $('input[name=height]').val();
		// set the width and height value to 4 as the initinal value
		var width = inputWidth ? inputWidth : '4';
		var height = inputHeight ? inputHeight : '4';
		
		var size = new Array(width, height);
		return size;
	};
	
	
		// function that returns the current number of rows and cols in the grid
		var getGridSize = function(){
		var gridSize = new Array();
		// nummber of cols
		gridSize[0] = $('#grid-table').find('tr')[0].cells.length;
		// number of rows
		gridSize[1] = $('#grid-table').find('tr').length;
		return gridSize;
	};

	// function that updates the grid when there are user updates
	var adjustGrid = function(gridTable, deltaCol, deltaRow){
		// the current grid size for adding col
		var size = getGridSize();
		
		// update the changes in Width input
		if(deltaCol != 0)
		{	
			var numberOfRow = parseInt(size[1]);
			console.log("numberOfRow"+numberOfRow);
			var numberOfCol = parseInt(size[0]);
							
			for(var i = 0; i < numberOfRow; i++)
			{
				var thisRow = $('tr:eq('+i+')');
				
				if(deltaCol > 0)
				{
					for(var j = 0; j < deltaCol; j++)
					{
						var colNum = numberOfRow+j;
						var addCol = $('<td></td>').addClass('gridCells');
						addCol.attr("id","Row"+i+"Col"+colNum);
						thisRow.append(addCol);
					}

				}
				else
				{
					var colNum = numberOfCol-1;
					for(var j = deltaCol; j < 0; j++)
					{
						var thisCol = 'td:eq('+colNum+')';
						
						var thisRow = gridTable.find('tr:eq('+i+')');
						var thisCell = thisRow.find(thisCol);
						thisCell.remove();
						colNum --;	
					}
					
				}
				
			}
			updateGrid();
            updateGridElement(gridTable);
			
		}
		// update the changes in Height input
		if(deltaRow != 0)
		{
			var numberOfRow = parseInt(size[1]);
			var numberOfCol = parseInt(size[0]);
			
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
					
					for(var j = 0; j < numberOfCol; j++)
					{
						var col = $("<td></td>").addClass("gridCells");
						col.attr("id", "Row"+numberOfRow+i+"Col"+j);
						col.css({
							width: 100/numberOfCol + "%", 
						});
						row.append(col);
						//console.log("a col added" + j);
					}
					gridTable.append(row);
					//console.log("a row added" + i);
				} 
				
			}
			else
			{
				var rowNum = numberOfRow-1;
				for(var i = deltaRow; i < 0; i++)
				{
					var thisRow = gridTable.find('tr:eq('+rowNum+')');
					thisRow.remove();
					rowNum --;
				}
				
			}
			updateGrid();
			updateGridElement(gridTable);
		}
		
		return;
	};
	
	
	
	// helper function that adjust the grid cells
	var updateGrid = function(){
		var currentSize = getGridSize();			
		// rows' width and height
		$('tr').css({height: 100/currentSize[1]+'%', width: 100+'%'}); 
		$('td').css({width: 100/currentSize[0]+'%'});
	};
	
	// helper function that adjust existing slide_element 
	
	var updateGridElement = function(table){
	
	   var elemSize = getElementSize(table);
	   $('.slide-element').each(function(i){
    	   $(this).css("width", elemSize[0]);
    	   $(this).css("height", elemSize[1]);
	   });
    };
	
	$('input[name=width], input[name=height]').change(function(e) {
		// disable submitting on press enter key
		if ( e.which == 13 ) e.preventDefault();
			
			// [width, height] - [cols, rows]
			var inputSize = getInputGridSize();
			var currentSize = getGridSize();
			
			var deltaCol = parseInt(inputSize[0]) - parseInt(currentSize[0]);
			var deltaRow = parseInt(inputSize[1]) - parseInt(currentSize[1]);
			console.log("input size: "+ deltaRow + deltaCol);

			var table = $('#grid-table');
			
			// updating the grid
			adjustGrid(table, deltaCol, deltaRow);
			getElementSize(table);
			//updateauctionGrid();
			//console.log(getGridSize());
			
	});
	
	var getElementSize = function(table){
		//var gridHeight = $('#grid-table').height();
		//var gridWidth = $('#grid-table').width();
		
		var gridHeight = $(table).height();
		var gridWidth = $(table).width();
		
		var input = getGridSize();
		
		var elemSize = new Array();
		if(gridWidth != 0 && gridHeight != 0)
		{
			elemSize = [(gridWidth/input[0])*0.93, (gridHeight/input[1])*0.85]
			return elemSize;

		}
		else
		{
			console.log('Something Wrong - Do not have a grid table.');
		}
	};
	
	var totalElemCounter = 0;
	// when the a td is click and it doesn't have an element inside, add a new element. 
	 $("body").delegate("td", "click", function(){
      	var elemCounter = 0; 
		var colIndex = $(this).parent().children().index($(this));
		var rowIndex = $(this).parent().parent().children().index($(this).parent());
		//alert('Row: ' + rowIndex + ', Column: ' + colIndex);
		//alert($(this).children().length);
		
		if($(this).children().length === 0)
		{	
			var size = getElementSize("#grid-table");
			var element = new SlideElement("auction", $(this).position().left, $(this).position().top, $(this).width(), $(this).height(), $(this).attr('id'));
				elemCounter ++; 
				totalElemCounter ++;
			element.getType();
			element.toString(element);
			var elemDiv = $("<div></div>").addClass("slide-element");
			elemDiv.attr('id', "elem" + totalElemCounter);

			//elemDiv.css({'width': size[0], 'height': size[1]});
			elemDiv.css({'width': size[0] +'px', 'height': size[1] +'px', 'opacity': 0.9});
			
			$(this).append(elemDiv);
		}
		// Function that returns the size of the current grid element size
		var gridElementSize = function(table){
		      var elemSize = new Array();
              var gridSize = getGridSize();
              
              elemSize[0]= $(table).width()/gridSize[0]; 
		      elemSizes[1]= $(table).height()/gridSize[1];
		      return elemSize;
		};
		
		// Draggable & Resizable Starts
		//var size = getInpuGridSize();
		var updateDragGrid = function (){
			var size = getGridSize();
			var moveSize = new Array();
		
			moveSize.width = $('#slide-bg').width()/size[0];
			moveSize.height = $('#slide-bg').height()/size[1];
			console.log("The Draggable grid size: "+moveSize.width + ", " + moveSize.height);
			return moveSize;
		};
		
		var size = getGridSize();
			var gridWidth;
			var gridHeight;
		
			gridWidth = $('#slide-bg').width()/size[0];
			gridHeight = $('#slide-bg').height()/size[1];
			
		$('#slide-bg').droppable({
   			tolerance: 'fit'
		});
        var moveSize = updateDragGrid();
		$('.slide-element').draggable({
		containment: $('#slide-bg'),
    	revert: 'invalid',
        drag: function(){
            //var offset = $(this).offset();
            var offset = $(this).position();
            var xPos = offset.left;
            var yPos = offset.top;
            console.log('x: ' + xPos);
            console.log('y: ' + yPos);
        },
    	stop: function(){
        	$(this).draggable('option','revert','invalid');
        	//var finalOffset = $(this).offset();
            var finalOffset = $(this).position();
            var finalxPos = finalOffset.left;
            var finalyPos = finalOffset.top;

    		console.log('Final X: ' + finalxPos);
   			console.log('Final X: ' + finalyPos);
    	},
    	//grid: [gridWidth, gridHeight]
    	
    	grid: [moveSize.width, moveSize.height]
	});
	
	$('.slide-element').droppable({
    	greedy: true,
    	tolerance: 'touch',
    	drop: function(event,ui){
        ui.draggable.draggable('option','revert',true);
    	}
	});
	// Testing droppable
	$('.gridCells').droppable({
		accept:'.slide-element',
		 /*over : function(){
            $(this).animate({
                             'border-color' : '#0f0'
                            }, 500);
        	 $('.slide-element').draggable('option','containment',$(this));
        }*/
	});
	
	$('.slide-element').resizable({
		grid: [gridWidth, gridHeight],
		containment: $('#slide-bg')
	});
	
	//$('.slide-element').resizable();
	// Draggable & Resizable Ends
		console.log('Row: ' + rowIndex + ', Column: ' + colIndex);
		console.log("Width: " + $(this).width() + "Height: " + $(this).height());
    });
    
	// expand the new slide section
	$('#new-slide').css('display',"none");
	$('#add-slide, #label-slides').click(function() {
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


