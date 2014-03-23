/**
 * 
 */
var API = 'https://www.googleapis.com/language/translate/v2?';
var API_KEY = "AIzaSyAkVsXAEIcnilWTDg-32iYDjhvP07tH1lc";

function translateRequest(selection) {
	chrome.storage.sync.get("targetLanguage", function(stored){
		// Build the URL
		chrome.storage.local.clear();
		if(selection){
			var apiAndKey = API + "key=" + API_KEY;
			var options = "&format=text";
			var query = "&q=" + encodeURIComponent(selection);
			var targetLanguage = stored.targetLanguage;
			if (!targetLanguage){
				targetLanguage = "en";
			}
			var target = "&target=" + targetLanguage;
			var url = apiAndKey + target + options + query;
			// Make the request
			var xmlhttp;
			xmlhttp=new XMLHttpRequest();
			xmlhttp.open("GET", url, false);
			xmlhttp.send();
			response = JSON.parse(xmlhttp.responseText);
			// Show the result
			alert(selection + ":\n\n" + response.data.translations[0].translatedText);
		} else {
			alert("No text selected.");
		}	
	});
}

function onRequest(info, tab) {
   	var selection = info.selectionText;
	translateRequest(selection);
};

chrome.contextMenus.create({title:"Translate '%s'", contexts: ["all"],
	"onclick": onRequest});

var funcToInject = function() {
    var selection = window.getSelection();
    return (selection.rangeCount > 0) ? selection.toString() : '';
};

var jsCodeStr = ';(' + funcToInject + ')();';

chrome.commands.onCommand.addListener(function(cmd) {
    if (cmd === 'translate-selection') {
        chrome.tabs.executeScript({
            code: jsCodeStr,
            allFrames: true
        }, function(selection) {
        	selection.forEach(function(frameSelectedText) {
        		if(frameSelectedText.length > 0) {
		            translateRequest(frameSelectedText);			
        		}
        	});
        });
    }
});