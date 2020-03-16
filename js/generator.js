var globalSeat;
var globalBusId;
var bookedSeats=[];
checkZ=function(object,busid){
    globalSeat=object;
    globalBusId=busid;
    bookedSeats=[];
    var zIndexes=[];
    for (var key in object) {
        var seat = new Seat(object[key]);
        if ($.inArray(seat.getZIndex(), zIndexes) === -1) {
            zIndexes.push(seat.getZIndex());
        }
    }
    var str;
    if(zIndexes.length>1){
        str=generateSeats2(object,busid);
    }else{
        str=generateSeats(object,busid);
    }
    return str;
}


generateSeats=function(object,busid){
    //alert('Inside');
    var seats=[];
    var zIndexes=[];
    var maxCol=0;
    var maxRow=0;
    for (var key in object) {
        var seat=new Seat(object[key]);
        seats.push(seat);  
        if(seat.getColumn()>maxCol){
            maxCol=seat.getColumn();
        }
        if(seat.getRow()>maxRow){
            maxRow=seat.getRow();
        }
        
        if($.inArray(seat.getZIndex(), zIndexes)===-1){
        zIndexes.push(seat.getZIndex());
        }
    }
    seats.sort(function(a,b){
        return a.getId()-b.getId();
    });
    //alert('Rows = '+(maxRow+1)+'\nColumns = '+(maxCol+1));
    var busLayoutHtmlTmpl='<table class="table table-condensed">';
    for(i=0;i<=maxRow;++i){
        var row=new Array(maxCol);
        //row.length=maxCol;
        var adder=0;
        for(j=0;j<seats.length;++j){
            if(parseInt(seats[j].getRow())==i){
                row[seats[j].getColumn()]=seats[j]; 
            }
        }
        //console.log(row);
        ///////////Putting Data///////////
        //var row=$('<tr/>');
        busLayoutHtmlTmpl+="<tr>";
        for(j=0;j<=maxCol;++j){
            var seat=row[j];
            if(seat!=null){
                var l = seat.getLength();
                var w = seat.getWidth();
                //console.log('Id = '+seat.data.id+'\n');
                var classes="";
                var clickevt='onclick="bookSeat(\''+String(seat.getId())+'\')"';
                if (l == 1 && w == 1){
                    if(seat.isAvailable()){
                        
                            clickevt='onclick="addelement(\''+seat.getId()+busid+'\','+seat.getTotalFareWithTaxes()+','+seat.getOperatorServiceChargeAbsolute()+','+seat.isAc()+','+seat.isAvailable()+','+seat.isLadiesSeat()+')"';
                
                        //}else{
                            if(seat.isLadiesSeat()){
                                classes+="seat-female ";
                            }else{
                                classes+="seat-avail ";
                            }   
                    }else{
                        if(seat.isLadiesSeat()){
                            classes+="seat-occupied-female ";
                        }else{
                            classes+="seat-occupied ";
                        } 
                        
                            
                        
                    }
                    classes+="extra ";
                    busLayoutHtmlTmpl += '<td><div selected=false id="'+seat.getId()+busid+'" class="'+classes+'" title="Seat No. '+seat.getId()+'" '+clickevt+' ></div></td>';
                    //busLayoutHtmlTmpl += '<td><div class=""></div></td>'; // Here have to show Seater/Semi Sleeper
                } else if (l == 1 && w == 2) {
                    if(seat.isAvailable()){
                        
                        
                            classes+="vertical-seat-avail ";
                            clickevt='onclick="addelement(\''+seat.getId()+busid+'\','+seat.getTotalFareWithTaxes()+','+seat.getOperatorServiceChargeAbsolute()+','+seat.isAc()+','+seat.isAvailable()+','+seat.isLadiesSeat()+')"';
                
                    }else{
                        
                            classes+="vertical-seat-occupied ";
                        
                    }		
                    classes+="extra ";			
                busLayoutHtmlTmpl += '<td ><div selected=false  id="'+seat.getId()+busid+'" class="'+classes+'" title="Seat No. '+seat.getId()+'" '+clickevt+' ></div></td>'; // Here have to show Vertical Sleeper
                } else if (l == 2 && w == 1){
                   //if(row.length==1){ //if row size one in case sleeps we are changing seat to vartical
                    if(seat.isAvailable()){
                        if(seat.isLadiesSeat()){
                            classes+="horizontal-seat-female ";
                        }else{
                            classes+="horizontal-seat-avail ";
                        }
                            //classes+="horizontal-seat-avail ";
                            clickevt='onclick="addelement(\''+seat.getId()+busid+'\','+seat.getTotalFareWithTaxes()+','+seat.getOperatorServiceChargeAbsolute()+','+seat.isAc()+','+seat.isAvailable()+','+seat.isLadiesSeat()+')"';
                
                    }else{
                        
                            classes+="horizontal-seat-occupied ";
                       
                    }	
                    classes+="extra ";
                      busLayoutHtmlTmpl += '<td><div id="'+seat.getId()+busid+'" class="'+classes+'" title="Seat No. '+seat.getId()+'" '+clickevt+' ></div></td>'; // Here have to show Vertical Sleeper
//                   
                } else {
                     //l = 2 && w = 2 or other combo will never happen
                }    				
                busLayoutHtmlTmpl+='</td>';
            }else{
              busLayoutHtmlTmpl+='<td><div></div></td>';
            }
        }
        busLayoutHtmlTmpl+"</tr>";
        //console.log('Row '+i+' = '+row);
    }
    busLayoutHtmlTmpl+="</table>";
    return busLayoutHtmlTmpl;

}

generateSeats2=function(object,busid){
    var seats=[];
    var zIndexes=[];
    var maxCol=0;
    var maxRow=0;
    var upper=[];
    var lower=[];
    var upperRowIndex=[];
    var lowerRowIndex=[];
    for (var key in object) {
        var seat=new Seat(object[key]);
        seats.push(seat);  
        if(seat.getColumn()>maxCol){
            maxCol=seat.getColumn();
        }
        if(seat.getRow()>maxRow){
            maxRow=seat.getRow();
        }
        if($.inArray(seat.getZIndex(), zIndexes)===-1){
        zIndexes.push(seat.getZIndex());
        }
        if(seat.getZIndex()===0){
            lower.push(seat);
            if($.inArray(seat.getRow(), lowerRowIndex)===-1){
                lowerRowIndex.push(seat.getRow());
            }
        }else{
            if($.inArray(seat.getRow(), upperRowIndex)===-1){
                upperRowIndex.push(seat.getRow());
            }
            upper.push(seat);
        }
    }
//    lower.sort(function(a,b){
//        return a.getId()-b.getId();
//    });
//    upper.sort(function(a,b){
//        return a.getId()-b.getId();
//    });
    //console.log(lower);
    //console.log(upper);
    var busLayoutHtmlTmpl='<table class="table">';
    var busLayoutHtmlTmpl2='<table class="table">';
    lowerRowIndex.sort();
    for(i=0;i<lowerRowIndex.length;++i){
        var row=new Array(maxCol);
        var adder=0;
        for(j=0;j<lower.length;++j){
            if(parseInt(lower[j].getRow())===lowerRowIndex[i]){
                row[lower[j].getColumn()]=lower[j]; 
                //row[adder]=lower[j];
                //adder+=1;
            }
        }
        ///////Putting data/////////////
        busLayoutHtmlTmpl+="<tr>";
        for(j=0;j<=maxCol;++j){
            var seat=row[j];
            if(seat!=null){
                var l = seat.getLength();
                var w = seat.getWidth();
                //console.log('Id = '+seat.data.id+'\n');
                var classes="";
                var clickevt='onclick="bookSeat(\''+String(seat.getId())+'\')"';
                if (l == 1 && w == 1){
                    if(seat.isAvailable()){
                        
                            clickevt='onclick="addelement(\''+seat.getId()+busid+'\','+seat.getTotalFareWithTaxes()+','+seat.getOperatorServiceChargeAbsolute()+','+seat.isAc()+','+seat.isAvailable()+','+seat.isLadiesSeat()+')"';
                
                        //}else{
                            //classes+="seat-avail ";
                            if(seat.isLadiesSeat()){
                                classes+="seat-female ";
                            }else{
                                classes+="seat-avail ";
                            } 
                            
                    }else{
                        
                            classes+="seat-occupied ";
                        
                    }
                    classes+="extra ";
                    busLayoutHtmlTmpl += '<td><div selected=false id="'+seat.getId()+busid+'" class="'+classes+'" title="Seat No. '+seat.getId()+'" '+clickevt+' ></div></td>';
                    //busLayoutHtmlTmpl += '<td><div class=""></div></td>'; // Here have to show Seater/Semi Sleeper
                } else if (l == 1 && w == 2) {
                    if(seat.isAvailable()){
                        
                            classes+="vertical-seat-avail ";
                            clickevt='onclick="addelement(\''+seat.getId()+busid+'\','+seat.getTotalFareWithTaxes()+','+seat.getOperatorServiceChargeAbsolute()+','+seat.isAc()+','+seat.isAvailable()+','+seat.isLadiesSeat()+')"';
                
                    }else{
                        
                            classes+="vertical-seat-occupied ";
                        
                    }		
                    classes+="extra ";			
                busLayoutHtmlTmpl += '<td><div selected=false id="'+seat.getId()+busid+'" class="'+classes+'" title="Seat No. '+seat.getId()+'" '+clickevt+' ></div></td>'; // Here have to show Vertical Sleeper
                } else if (l == 2 && w == 1){
                   //if(row.length==1){ //if row size one in case sleeps we are changing seat to vartical
                    if(seat.isAvailable()){
                        clickevt='onclick="addelement(\''+seat.getId()+busid+'\','+seat.getTotalFareWithTaxes()+','+seat.getOperatorServiceChargeAbsolute()+','+seat.isAc()+','+seat.isAvailable()+','+seat.isLadiesSeat()+')"';
                
                            //classes+="horizontal-seat-avail ";
                            if(seat.isLadiesSeat()){
                                classes+="horizontal-seat-female ";
                            }else{
                                classes+="horizontal-seat-avail ";
                            }
                    }else{
                        
                            classes+="horizontal-seat-occupied ";
                       
                    }	
                    classes+="extra ";
                      busLayoutHtmlTmpl += '<td><div selected=false id="'+seat.getId()+busid+'" class="'+classes+'" title="Seat No. '+seat.getId()+'" '+clickevt+' ></div></td>'; // Here have to show Vertical Sleeper
//                   
                } else {
                     //l = 2 && w = 2 or other combo will never happen
                }    				
                busLayoutHtmlTmpl+='</td>';
            }else{
              busLayoutHtmlTmpl+='<td><div></div></td>';
            }
        }
        
    
    busLayoutHtmlTmpl+="</tr>";
        ///Putting Data End//
        //console.log('Row L '+i+' = '+row);
    }
    busLayoutHtmlTmpl+="</table>";
    //////////////////////////////////////Table2///////////////////////////
    //var busLayoutHtmlTmpl2='<table class="table table-condensed">';
    upperRowIndex.sort();
    for(i=0;i<upperRowIndex.length;++i){
        var row=new Array(maxCol);
        var adder=0;
        for(j=0;j<upper.length;++j){
            if(parseInt(upper[j].getRow())===upperRowIndex[i]){
                row[upper[j].getColumn()]=upper[j]; 
                //row[adder]=lower[j];
                //adder+=1;
            }
        }
        ///////Putting data/////////////
        busLayoutHtmlTmpl2+="<tr>";
        for(j=0;j<=maxCol;++j){
            var seat=row[j];
            if(seat!=null){
                var l = seat.getLength();
                var w = seat.getWidth();
                //console.log('Id = '+seat.data.id+'\n');
                var classes="";
                var clickevt='onclick="bookSeat(\''+String(seat.getId())+'\')"';
                if (l == 1 && w == 1){
                    if(seat.isAvailable()){
                        
                            clickevt='onclick="addelement(\''+seat.getId()+busid+'\','+seat.getTotalFareWithTaxes()+','+seat.getOperatorServiceChargeAbsolute()+','+seat.isAc()+','+seat.isAvailable()+','+seat.isLadiesSeat()+')"';
                
                        //}else{
                            //classes+="seat-avail ";
                            if(seat.isLadiesSeat()){
                                classes+="seat-female ";
                            }else{
                                classes+="seat-avail ";
                            } 
                            
                    }else{
                        
                            classes+="seat-occupied ";
                        
                    }
                    classes+="extra ";
                    busLayoutHtmlTmpl2 += '<td><div selected=false id="'+seat.getId()+busid+'" class="'+classes+'" title="Seat No. '+seat.getId()+'" '+clickevt+' ></div></td>';
                    //busLayoutHtmlTmpl += '<td><div class=""></div></td>'; // Here have to show Seater/Semi Sleeper
                } else if (l == 1 && w == 2) {
                    if(seat.isAvailable()){
                        
                            classes+="vertical-seat-avail ";
                            clickevt='onclick="addelement(\''+seat.getId()+busid+'\','+seat.getTotalFareWithTaxes()+','+seat.getOperatorServiceChargeAbsolute()+','+seat.isAc()+','+seat.isAvailable()+','+seat.isLadiesSeat()+')"';
                
                    }else{
                        
                            classes+="vertical-seat-occupied ";
                        
                    }		
                    classes+="extra ";			
                busLayoutHtmlTmpl2 += '<td><div selected=false id="'+seat.getId()+busid+'" class="'+classes+'" title="Seat No. '+seat.getId()+'" '+clickevt+' ></div></td>'; // Here have to show Vertical Sleeper
                } else if (l == 2 && w == 1){
                   //if(row.length==1){ //if row size one in case sleeps we are changing seat to vartical
                    if(seat.isAvailable()){
                        clickevt='onclick="addelement(\''+seat.getId()+busid+'\','+seat.getTotalFareWithTaxes()+','+seat.getOperatorServiceChargeAbsolute()+','+seat.isAc()+','+seat.isAvailable()+','+seat.isLadiesSeat()+')"';
                
                            //classes+="horizontal-seat-avail ";
                            if(seat.isLadiesSeat()){
                                classes+="horizontal-seat-female ";
                            }else{
                                classes+="horizontal-seat-avail ";
                            }
                    }else{
                        
                            classes+="horizontal-seat-occupied ";
                       
                    }	
                    classes+="extra ";
                      busLayoutHtmlTmpl2 += '<td><div selected=false id="'+seat.getId()+busid+'" class="'+classes+'" title="Seat No. '+seat.getId()+'" '+clickevt+' ></div></td>'; // Here have to show Vertical Sleeper
//                   
                } else {
                     //l = 2 && w = 2 or other combo will never happen
                }    				
                busLayoutHtmlTmpl2+='</td>';
            }else{
              busLayoutHtmlTmpl2+='<td><div></div></td>';
            }
        }
        
    
    busLayoutHtmlTmpl2+="</tr>";
        ///Putting Data End//
        //console.log('Row L '+i+' = '+row);
    }
    busLayoutHtmlTmpl2+="</table>";
    ///////////////////////////////////////////////////////////////////////
    var div1=$('<div/>',{class:"col-md-11 row table-responsive"});
    var upperZ=$('<div/>',{class:"upper extra col-md-1"});
    var upperC=$('<div/>',{class:"row vcenter"});
    div1.append(busLayoutHtmlTmpl2);
    upperC.append(upperZ,div1);
    var div2=$('<div/>',{class:"col-md-11 row table-responsive"});
    var lowerZ=$('<div/>',{class:"lower extra col-md-1"});
    var lowerC=$('<div/>',{class:"row vcenter"});
    div2.append(busLayoutHtmlTmpl);
    lowerC.append(lowerZ,div2);
    var div3=$('<div/>',{class:"container"});
    div3.append(upperC,lowerC);
    return div3;
}

function bookSeat(seatid){
 //   alert('Booked ' +seatid);
}

function addelement(sno, fare, opservicecharge, ladiesseat, actype,ladyseat) {
    //alert('Seat Fare . '+sno);
    globalBusId=String(globalBusId);
    sno=sno.replace(globalBusId,"");
    var seat;
    for (var key in globalSeat) {
        seat = new Seat(globalSeat[key]);
        if(seat.getId()==sno){
            //console.log('Seat Found');
            break;
            //alert(globalSeat[key]);
        }
    }
    sno=sno+globalBusId;
    var l = seat.getLength();
    var w = seat.getWidth();
    //alert(sno+','+typeof(sno)+','+fare);
    //console.log(sno);
    //sno=String(sno);
    //sno=seat.getId();
    var attr=$('#'+sno).attr('selected');
    if (l == 1 && w == 1) {
        //alert('inside');
        
        //$('#'+sno).removeClass('seat-avail');
        //alert
        if(!attr){
            //Seat Unselected
            // var index = bookedSeats.indexOf(sno);
            // if(index!=-1){
            //     bookedSeats.splice(index, 1);
            // }
            removeSeat(sno);
            $('#'+sno).removeClass('seat-selected');
            $('#'+sno).attr('selected',true);
            
        }else{
            //Seat Selected
            //bookedSeats.push(sno);
            if(addSeat(sno)){
            $('#'+sno).addClass('seat-selected');
            $('#'+sno).attr('selected',false);
            }
        }
        
    } else if (l == 1 && w == 2) {
        //var attr=$('#'+sno).attr('selected');
        if(!attr){
            //Seat Unselected
            removeSeat(sno);
            $('#'+sno).removeClass('horizontal-seat-selected');
            $('#'+sno).attr('selected',true);
        }else{
            //Seat Selected
            if(addSeat(sno)){
            $('#'+sno).addClass('horizontal-seat-selected');
            $('#'+sno).attr('selected',false);
            }
        }
    } else if (l == 2 && w == 1) {
        //var attr=$('#'+sno).attr('selected');
        if(!attr){
            //Seat Unnselected
            removeSeat(sno);
            $('#'+sno).removeClass('horizontal-seat-selected');
            $('#'+sno).attr('selected',true);
        }else{
            //Seat Selected
            if(addSeat(sno)){
            $('#'+sno).addClass('horizontal-seat-selected');
            $('#'+sno).attr('selected',false);
            }
        }
    } else {
        //l = 2 && w = 2 or other combo will never happen
    }
    // for(i=0;i<bookedSeats.length;++i){
    //     if(bookedSeats[i].indexOf(globalBusId)!=-1){
    //         console.log(String(bookedSeats[i].replace(globalBusId)));
    //     }
    // }
    console.log(bookedSeats);
    
}

function addSeat(seatid){
    if(bookedSeats.length<6){
        bookedSeats.push(seatid.replace(globalBusId,""));
        return true;
    }
    else{
        return false;
    }
    //console.log('Seat Booked '+seatid);
}

function removeSeat(seatid){
    var index = bookedSeats.indexOf(seatid.replace(globalBusId,""));
    if(index!=-1){
        bookedSeats.splice(index, 1);
    }
}

function getBookedSeats(){
    var seatsArray=[];
    for(i=0;i<bookedSeats.length;++i){
        //var seat;
        for (var key in globalSeat) {
            //seat = new Seat(globalSeat[key]);
            if(globalSeat[key].id==bookedSeats[i]){
                //console.log('Seat Found');
                seatsArray.push(globalSeat[key]);
                break;
                //alert(globalSeat[key]);
            }
        }
    }
    return seatsArray;
}

//The Seat Class

function Seat(data){
    this.data=data;
    this.getId=function(){
        return this.data.id;
    }
    this.getRow=function(){
        return this.data.row;
    }
    this.getColumn=function(){
        return this.data.column;
    }
    this.getLength=function(){
        return this.data.length;
    }
    this.getWidth=function(){
        return this.data.width;
    }
    this.isAvailable=function(){
        return this.data.available;
    }
    this.getFare=function(){
        return this.data.fare;
    }
    this.isAc=function(){
        return this.data.ac;
    }
    this.isLadiesSeat=function(){
        return this.data.ladiesSeat;
    }
    this.getBookedBy=function(){
        return this.data.bookedBy;
    }
    this.getZIndex=function(){
        return this.data.zIndex;
    }
    this.isSleeper=function(){
        return this.data.sleeper;
    }
    this.getTotalFareWithTaxes=function(){
        return this.data.totalFareWithTaxes;
    }
    this.getOperatorServiceChargeAbsolute=function(){
        this.data.operatorServiceChargeAbsolute;
    }
}