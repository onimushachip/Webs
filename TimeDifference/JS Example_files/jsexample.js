   var input;
   var pattern = /^([0-9]{1,2}(am|pm){0,1}-[0-9]{1,2}(am|pm){0,1})$/; //am-pm standard
   var pattern2 = /^([0-9]{1,2}:[0-9]{1,2}(am|pm){0,1}-[0-9]{1,2}:[0-9]{1,2}(am|pm){0,1})$/; //Military Time
   var startPM = false;
   var endPM = false;
   var startAM = false;
   var endAM = false;
   var errorInput = false;
   var errorDifference = false;
   var amCheck = /am/;
   var pmCheck = /pm/;
   var start = "";
   var end = "";
   var startMinute = 0;
   var endMinute = 0;
   var startDurationMinute = 0;
   var endDurationMinute = 0;
   var differenceHour = 0;
   var differenceMinute = 0;
   // var startStandardized;
   // var startMinuteStandardized;
   // var endStandardized;
   // var endMinuteStandarized;

function processTime() {
   // actual processing code goes here

  	input = document.getElementById("date").value;


   if (pattern.test(input)) {
	   	// alert("Valid input");
	   	getInput();
	input = "";   
	}
	else if (pattern2.test(input)) {
		// alert("Valid input");
		getInput();
	}
	else {
   	alert("Invalid Input");
   }


 	processInput();

 	if (errorInput) {
 		alert("Input out of range");
 	}
 	else if (errorDifference) {
 		alert("First time later than second");
 	}
 	else {
   place = document.getElementById("result");
   place.innerHTML = "Standardized Version: Start: " + Math.trunc(startDurationMinute / 60) + ":" + (startDurationMinute % 60) + 
   					" End: " + Math.trunc(endDurationMinute / 60) + ":" + (endDurationMinute % 60);
   differencePlace = document.getElementById("difference");
   differencePlace.innerHTML = "Difference: " + Math.trunc(differenceHour) + " Hour(s) " + differenceMinute + " Minute(s)";
	}

   //Reset all variables
   start = "";
   end = "";
   startPM = false;
   endPM = false;
   startAM = false;
   endAM = false;
   startMinute = 0;
   endMinute = 0;
   startDurationMinute = 0;
   endDurationMinute = 0;
   differenceHour = 0;
   differenceMinute = 0;
   errorInput = false;
   errorDifference = false;

}

function getInput () {
   	var first = true;
	   	var startMinutePart = false; 
	   	var endMinutePart = false;
	   	for (var i = 0; i < input.length; i++) {
	   		if (input.charAt(i) == '-') {
	   			first = false;
	   		}
	   		else {
		   		if (first) {
		   			if (input.charAt(i) == ':') {
		   				startMinutePart = true;
		   			}
		   			else {
		   				if (startMinutePart == true) {
		   					startMinute = startMinute + input.charAt(i);
		   				}
		   				if (startMinutePart == false) {
		   					start = start + input.charAt(i);
		   				}
		   			}
		   		}
		   		if (!first) {
		   			if (input.charAt(i) == ':') {
		   				endMinutePart = true;
		   			}
		   			else
		   				if (endMinutePart == true) {
		   					endMinute = endMinute + input.charAt(i);
		   				}
		   				if (endMinute == false) {
		   					end = end + input.charAt(i);	
		   				}
		   		}
		   	}	
	   }	
}

function processInput () {
	// endAMPM = true;
	if (amCheck.test(start)) {
		start = start.substring(0,start.length-2);
		if (parseInt(start) > 11) {
			errorInput = true;
		}
		startAM = true;
	}
	if (pmCheck.test(start)) {
		start = start.substring(0,start.length-2);	
		startDurationMinute += 12 * 60;
		startPM = true;
	}
	if (amCheck.test(end)) {
		end = end.substring(0,end.length-2);
		if (parseInt(end) > 11) {
			errorInput = true;
		}
		endAM = true;
	} 
	if (pmCheck.test(end)) {
		end = end.substring(0,end.length-2);
		endDurationMinute += 12 * 60;
		endPM = true;
	}
	//Check to see if AM PM part follows the minute input
	if (amCheck.test(startMinute)) {
		startMinute = startMinute.substring(0,startMinute.length-2);
		startAM = true;
	}
	if (pmCheck.test(startMinute)) {
		startMinute = startMinute.substring(0,startMinute.length-2);	
		startDurationMinute += 12 * 60;
		startPM = true;
	}
	if (amCheck.test(endMinute)) {
		endMinute = endMinute.substring(0,endMinute.length-2);
		endAM = true;
	} 
	if (pmCheck.test(endMinute)) {
		endMinute = endMinute.substring(0,endMinute.length-2);
		endDurationMinute += 12 * 60;
		endPM = true;
	}
	if ((startPM == true) && (endPM == false) && (endAM == false)) {
		endDurationMinute += 12 * 60;

	}
	if ((startPM == false) && (startAM == false) && (endPM == true)) {
		startDurationMinute += 12 * 60;
	}
	console.log(startPM);
	console.log(endPM);
	console.log(startAM);
	console.log(endAM);

	startDurationMinute += (parseInt(start) * 60) + parseInt(startMinute);
	endDurationMinute += (parseInt(end) * 60) + parseInt(endMinute); 
	differenceHour += (endDurationMinute - startDurationMinute) / 60;
	differenceMinute += (endDurationMinute - startDurationMinute) % 60;
	if ((startDurationMinute > 1440) ||(endDurationMinute > 1440)) {
		errorInput = true;
	}
	if ((differenceHour < 0) ||(differenceMinute < 0)) {
		errorDifference = true;
	}
}


	document.write("hello");
window.onload = function() {
  	thebutton = document.getElementById("process");
  	thebutton.onclick = processTime;
}
