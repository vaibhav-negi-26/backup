
/**
* Before calling this method we should have to pass seats array in sorted order.
* 
* In buslayout response seats Object has lower (zindex=0) and upper (zindex =1) we have to call this function upper seats array and lower seats array different calls.
*/

var generateLayout = function(seats, zIndex){
    var busLayoutHtmlTmpl = '';// This variable is used for seat layout template 
    var maxNoOfColumns =0; // maximun no of columns out of all available rows;
  
  /*
  * finding path way logic start from here
  */
  
    var missingPathWayRowNO =-1; 
    var missingPathWayRowNOTmp=0
    var isfirtRow=true;
    var isDriverSeat=true;
    var rowSeatValues= [];
    var columnSeatValues= [];
    _.each(seats,function(columnSeats,rowIndex){
      if(isfirtRow) {
        missingPathWayRowNOTmp=rowIndex;
        isfirtRow=false;
      }else {
        if(parseInt(missingPathWayRowNOTmp)+1!=rowIndex) {
          missingPathWayRowNO=parseInt(missingPathWayRowNOTmp)+1;
        }else {
          missingPathWayRowNOTmp=parseInt(missingPathWayRowNOTmp)+1;
        }
      }
      maxNoOfColumns = columnSeats.length >maxNoOfColumns?columnSeats.length:maxNoOfColumns;
    });
  
  /*
  * finding path way logic end from here
  */
  
  
  /*
  * Loop for unique rows and culumn and keeping in array for display we are using this array
  */
    _.each(seats,function(columnSeats,rowIndex){
      _.each(columnSeats,function(seat,columnIndex){
        if($.inArray(row, rowSeatValues) === -1){    		     
          rowSeatValues.push(row);
        }
        if($.inArray(column,columnSeatValues) === -1){       		     
      columnSeatValues.push(column);
        }
      });
    });
  
                      
  /*
  * To display seat layout in the form of matrix for that creating empty matrix with the help of unique rows and columns
  */
    var seatLayOutMax=new Array();
    var count = 0;
    _.each(rowSeatValues,function(row,columnIndex){ 
      seatLayOutMax[row] = new Array() ;
      _.each(columnSeatValues,function(seat,columnIndex){  
        seatLayOutMax[row][seat]="";
      }); 
    }); 
  
  
                          
  /*
  * Asigning seat object to matrix
  */
    _.each(rowSeats,function(columnSeats,rowIndex){
      _.each(columnSeats,function(seat,columnIndex){
        seatLayOutMax[seat.row][seat.column] = seat
      });
    });
  
                  
  /*
  * seat display html logic 
  */
  
    var pathComparision = 0;
    _.each(seatLayOutMax,function(row,index){	        	
      busLayoutHtmlTmpl += '<tr>';        		
      if (zIndex == 0 && isDriverSeat){
        busLayoutHtmlTmpl += '<td><div class="seat-sprite driver-seat"></div></td>'; //this block is for dispaly driver seat
      } else {
        busLayoutHtmlTmpl += '<td><div></div></td>'; //giving empty speace not driver 
      }
      isDriverSeat=false;
      _.each(row,function(col,ind){
      var seat = col;
      pathComparision = seat.row;
      if(seat!=""){
          var l = seat.length;
          var w = seat.width;
          if (l == 1 && w == 1){
              busLayoutHtmlTmpl += '<td><div></div></td>'; // Here have to show Seater/Semi Sleeper
          } else if (l == 1 && w == 2) {					
          busLayoutHtmlTmpl += '<td><div></div></td>'; // Here have to show Vertical Sleeper
          } else if (l == 2 && w == 1){
             if(rowSeatValues.length==1){ //if row size one in case sleeps we are changing seat to vartical
                busLayoutHtmlTmpl += '<td rowspan="2"><div></div></td>'; // Here have to show Vertical Sleeper
             }else{
            busLayoutHtmlTmpl += '<td><div></div></td>'; // Here have to show Horizontal Sleeper
             }
          } else {
               //l = 2 && w = 2 or other combo will never happen
          }    				
          busLayoutHtmlTmpl+='</td>';
      }else{
        busLayoutHtmlTmpl+='<td></td>';
      }
        });
        busLayoutHtmlTmpl += '</tr>';
        if(missingPathWayRowNO == parseInt(pathComparision)+1){
          busLayoutHtmlTmpl += '<tr><td><div></div></td><td></td></tr>';  // this is paht way
        }	        	
    });	        	
    isDriverSeat = false;
    return busLayoutHtmlTmpl;
  }