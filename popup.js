/*
--Taken from Catch Extension
    First we use executeScript to put the our script on the page. All the
    script (content_script.js) does is add a listener for sendRequest; we
    need this in order to communicate between our popup and the page we want
    the text from.

    One that's set up, we run chrome.tabs.getSelected with a callback that
    sends the request for the selection to the current tab, itself with a
    callback that runs setupNoteForm().

*/

document.addEventListener('DOMContentLoaded', function () {
  if (typeof(chrome.extension.lastError) == "undefined") {
      getSel();
  } else {
      var p = ["<p>This extension cannot be used in ",
          "chrome:// or file:// locations.</p>"].join("");
      $("body").append($(p));
  }

  chrome.tabs.executeScript(null, {"file": "contentscript.js"}, wrap);
  function getSel() {
      function cb(note) { setupNoteForm(note, userdata); };
      chrome.tabs.getSelected(null, function (tab) {
          chrome.tabs.sendRequest(tab.id, {"method": "getSelection"}, speak);
      });
  }

  function wrap() {
      if (typeof(chrome.extension.lastError) == "undefined") {
          getSel();
      } else {
          var p = ["<p>This extension cannot be used in ",
              "chrome:// or file:// locations.</p>"].join("");
          $("body").append($(p));
      }
  }

  function speak(textObj) {
    chrome.tts.speak(textObj.text);
    $('#stopBtn').click(function(e){
      console.log(e);
      chrome.tts.stop();
    });
  }

});


