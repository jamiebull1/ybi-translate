/**
 * 
 */
// Saves options to chrome.storage
function save_options() {
  var targetLanguage = document.getElementById('target').value;
  alert("Saving " + targetLanguage + " as default target language");
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
  // Use default value targetLanguage = 'en'
  chrome.storage.sync.get("targetLanguage", function(items) {
//  	alert("Restoring");
    document.getElementById('target').value = items.targetLanguage;
//	alert("Got " + items.targetLanguage + " from storage");
    
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);