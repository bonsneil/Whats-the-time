var msgArray;
var dataLoaded = false;

$(document).ready(function () {
    //Disable caching so always gets latest json
    $.ajaxSetup({ cache: false });

    // when the document is ready go and get the messages
    $.getJSON('contactDatabase.json', function (cMsgJSON) {
        console.log(cMsgJSON);
        msgArray = cMsgJSON.messages;
        console.log(msgArray);
        dataLoaded = true;

        //Display the form after the data is loaded
        displayForm();
    });
});



function displayForm() {
    displaySelect();
//    var userNameLabel = $("<label for="userName">Name:</label>")
    var userNameInputPara = $("<p></p>");
    var userNameLabel = $("<label>Name:</label>", {for:"userName"});
    var userNameInput = $("<input>", { class:"contact", id:"userName", type:"text", name:"userName", value:"", required:"true"})
    userNameInputPara.append(userNameLabel);
    userNameInputPara.append(userNameInput);
    $("#displayFormArea").append(userNameInputPara);

    var userEmailInputPara = $("<p></p>");
    var userEmailLabel = $("<label>Email:</label>", { for: "userEmail" });
    var userEmailInput = $("<input>", { class: "contact", id: "userEmail", type: "email", name: "userEmail", value: "", required: "true" })
    userEmailInputPara.append(userEmailLabel);
    userEmailInputPara.append(userEmailInput);
    $("#displayFormArea").append(userEmailInputPara);

    var userMessageInputPara = $("<p></p>");
    var userMessageLabel = $("<label>Message:</label>", { for: "userMessage" });
    var userMessageInput = $("<textarea>", { class: "contact textarea", id: "userMessage", rows:"15", cols:"50", name: "userMessage", required: "true" })
    userMessageInputPara.append(userMessageLabel);
    userMessageInputPara.append(userMessageInput);
    $("#displayFormArea").append(userMessageInputPara);

    updateSelection();
}

function displayMsg(msgToDisplay) {
    $("#userName").val(msgToDisplay.userName);
    $("#userEmail").val(msgToDisplay.userEmail);
    $("#userMessage").val(msgToDisplay.userMessage);
}

function updateSelection() {
    //console.log($("#msgSelect").val());
    //console.log($("#msgSelect option:selected").text());
    var x = $("#msgSelect").val();
    displayMsg(msgArray[x]);
}


function displaySelect() {    
    var msgSelect = $("<select></select>", {id: "msgSelect"});

    /*
    for (var i = 0; i < msgArray.length; i++){
        console.log(msgArray[i].userEmail);
        msgSelect.append($("<option>", { value: i, text: msgArray[i].userEmail }));
    }
    */
    $.each(msgArray, function (i, value) {
        console.log(msgArray[i].userEmail);
        msgSelect.append($("<option>", { value: i, text: msgArray[i].userEmail }));
    });

    $("#messageDisplayArea").append(msgSelect);

    $("#msgSelect").change(function () {
        updateSelection();
    });
}

function displayTable() {

}
