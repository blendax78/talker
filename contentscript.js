chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSelection") {
        sendResponse({
            "text": window.getSelection().toString(),
            "url": window.location.toString(),
            "title": document.title,
        });
    }
});
