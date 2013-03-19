chrome.extension.onMessage.addListener(function(request, sender, sendMessage) {
    if (request.method == "getSelection") {
        sendMessage({
            "text": window.getSelection().toString(),
            "url": window.location.toString(),
            "title": document.title,
        });
    }
});
