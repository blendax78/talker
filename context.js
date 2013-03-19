// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {
  if (info.menuItemId == "radio1" || info.menuItemId == "radio2") {
    console.log("radio item " + info.menuItemId +
                " was clicked (previous checked state was "  +
                info.wasChecked + ")");
  } else if (info.menuItemId == "checkbox1" || info.menuItemId == "checkbox2") {
    console.log(JSON.stringify(info));
    console.log("checkbox item " + info.menuItemId +
                " was clicked, state is now: " + info.checked +
                " (previous state was " + info.wasChecked + ")");

  } else {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
  }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {

  // Create a parent item and two children.
  chrome.contextMenus.create({"title": "Talker", "id": "parent"});

  var contexts = ["page","link","editable","image","video",
                  "audio"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Speak '" + context + "'";
    chrome.contextMenus.create({"title": title, "contexts":[context],
                                        "id": "context" + context,
                                        "parentId":"parent"});
    console.log("'" + context + "' item:" + "context"+context);
  }
  chrome.contextMenus.create({"title": 'Speak Selection', "contexts":["selection"],
                              "id":"contextselection"});

});