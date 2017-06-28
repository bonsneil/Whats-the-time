
$(document).ready(function () {
    // when the document is ready go and get the messages
    console.log("ready");
    $.getJSON('messages.json', function (msgJSON) {
        console.log(msgJSON);
    });

    $.getJSON('contactDatabase.json', function (cMsgJSON) {
        console.log(cMsgJSON);
    });

});
