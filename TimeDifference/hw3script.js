/* CS 315
 * Lam Nguyen
 */
   var input;
   var pattern = /^([0-9]{1,2}(am|pm){0,1}-[0-9]{1,2}(am|pm){0,1})$/; //am-pm standard
   var pattern2 = /^([0-9]{1,2}:[0-9]{1,2}(am|pm){0,1}-[0-9]{1,2}:[0-9]{1,2}(am|pm){0,1})$/; //Military Time
   var startPM = false; //Check if start time has PM in it
   var endPM = false; //Check if end time has PM in it
   var startAM = false; //Check if start time has AM in it
   var endAM = false; //Check if end time has AM in it
   var errorInput = false; //Report if the input is unacceptable
   var errorDifference = false; //Report if the input has hours or minutes out of range
   var amCheck = /am/; //Pattern to detect AM PM in input
   var pmCheck = /pm/; //Pattern to detect AM PM in input
   var start = ""; //Initial Start hours
   var end = ""; //Initial End hours
   var startMinute = 0; //Initial Start Minutes
   var endMinute = 0; //Initial End Minutes
   var startDurationMinute = 0; //Convert Start time to minutes for calculation
   var endDurationMinute = 0; //Convert End time to minutes for calculation
   var differenceHour = 0; //The difference in hour of Start and End times
   var differenceMinute = 0; //The difference in minute of Start and End times


function processTime() {

  	input = document.getElementById("time").value;

  	//Checking if input matches the valid format patterns
   if (pattern.test(input)) {
	   	getInput();
	input = "";   
	}
	else if (pattern2.test(input)) {
		getInput();
	}
	else {
   	alert("Invalid Input");
   	errorInput = true;
   }

 	processInput();

 	if (errorInput) {
 		alert("Input out of range");
 	}
 	else if (errorDifference) {
 		alert("First time later than second");
 	}
 	else {
 	//Printing the result in standardized format	
   place = document.getElementById("result");
   place.innerHTML = "Standardized Version: Start: " + Math.trunc(startDurationMinute / 60) + ":" + formatMinute(startDurationMinute % 60) + 
   					" End: " + Math.trunc(endDurationMinute / 60) + ":" + formatMinute(endDurationMinute % 60);
   differencePlace = document.getElementById("difference");
   differencePlace.innerHTML = "Difference: " + Math.trunc(differenceHour) + " Hour(s) " + differenceMinute + " Minute(s)";
	}

   //Reset all variables for the next input
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

//Filtering Hour part and Minute part from Start and End
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

//Parsing int from input to process
function processInput () {
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

	//Convert Start and End times to minutes and calculate differences
	startDurationMinute += (parseInt(start) * 60) + parseInt(startMinute);
	endDurationMinute += (parseInt(end) * 60) + parseInt(endMinute); 
	differenceHour += (endDurationMinute - startDurationMinute) / 60;
	differenceMinute += (endDurationMinute - startDurationMinute) % 60;

	//Check if hours get out of range
	if ((startDurationMinute > 1440) ||(endDurationMinute > 1440)) {
		errorInput = true;
	}
	//Check if Minutes get out of range
	if ((parseInt(startMinute)) > 60 || (parseInt(endMinute)) >60 ) {
		errorInput = true;
	}
	//Check if Start is later than End
	if ((differenceHour < 0) ||(differenceMinute < 0)) {
		errorDifference = true;
	}
}

function formatMinute(n){
    return n > 9 ? "" + n: "0" + n;
}

window.onload = function() {
  	thebutton = document.getElementById("process");
  	thebutton.onclick = processTime;
}
