/**
 * 
 */
var API = 'https://www.googleapis.com/language/translate/v2?';
var API_KEY = "AIzaSyAkVsXAEIcnilWTDg-32iYDjhvP07tH1lc";

function buildURL(selection){
	var api_and_key = API + "key=" + API_KEY;
	var options = "&target=en&format=text";
	var query = "&q=" + encodeURIComponent(selection);
	var url = api_and_key + options + query;
	return url;
}

function translateRequest(selection) {
	var query = buildURL(selection);
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", query, false);
	xmlhttp.send();
	response = JSON.parse(xmlhttp.responseText);
	return response.data.translations[0].translatedText;
}

function onRequest(info, tab) {
   	var selection = info.selectionText;
   	alert(selection + ":\n\n" + translateRequest(selection));
};

chrome.contextMenus.create({title:"Translate '%s'", contexts: ["all"], "onclick": onRequest});

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
            alert(selection[0] + ":\n\n" + translateRequest(selection[0]));
        });
    }
});