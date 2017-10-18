var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
	var xmlHttp;

	if (window.ActiveXObject) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch(e) {
			xmlHttp = false;
		}
	}
	else {
		try {
			xmlHttp = new XMLHttpRequest;
			// alert("xml created successfully");
		}
		catch(e) {
			xmlHttp = false;
		}
	}

	if (!xmlHttp) {
		alert("Cannot create an XML object!");
	}
	else {
		return xmlHttp;
	}
}

function process() {
	if(xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
		instrument = encodeURIComponent(document.getElementById("userInput").value);
		xmlHttp.open("GET", "instruments.php?instrument=" + instrument, true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
	}
	else {
		setTimeout('process()', 1000);
	}
}

function handleServerResponse() {
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			xmlResponse = xmlHttp.responseXML;
			xmlDocumentElement = xmlResponse.documentElement;
			message = xmlDocumentElement.firstChild.data;
			document.getElementById("response").innerHTML = '<span style="color:red"' + message + '</span>';
		}
		else {
			alert('Something went wrong...');
		}
	}
}