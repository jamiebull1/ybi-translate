/**
 * 
 */

var title = chrome.i18n.getMessage("extOptionsTitle");
var heading = chrome.i18n.getMessage("extOptionsHeading");
var langs = ['af', 'sq', 'ar', 'az', 'eu', 'bn', 'be', 'bg', 'ca', 'zh_CN', 'zh_TW', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'tl', 'fi', 'fr', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'iw', 'hi', 'hu', 'is', 'id', 'ga', 'it', 'ja', 'kn', 'ko', 'la', 'lv', 'lt', 'mk', 'ms', 'mt', 'no', 'fa', 'pl', 'pt', 'ro', 'ru', 'sr', 'sk', 'sl', 'es', 'sw', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy', 'yi'];

// Saves options to chrome.storage
function save_options() {
  var targetLanguage = document.getElementById('target').value;
  chrome.storage.sync.set({
    "targetLanguage": targetLanguage
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	document.getElementById('title').textContent = title;
	document.getElementById('heading').textContent = heading;
	langs.forEach(function(lang) {
		var msg_name = "extLang_" + lang;
		var localised_lang = chrome.i18n.getMessage(msg_name);
    	document.getElementById(lang).text=localised_lang;
	});

  	chrome.storage.sync.get("targetLanguage", function(items) {
	// Use default value targetLanguage = 'en' if none present
  	if (!items.targetLanguage) { items.targetLanguage = "en"; }
    	document.getElementById('target').value = items.targetLanguage;
  	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);