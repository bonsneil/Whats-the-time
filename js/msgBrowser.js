var msgArray;
var dataLoaded = false;

var formDisplayButton = $("<input>", { class: "formDisplay", id: "formDisplayBtn", type: "submit", name: "formDisplayBtn", value: "formDisplay" })
$("#contact_body").prepend(formDisplayButton);
$("#formDisplayBtn").on("click", function () { switchViewToForm() });

var tableDisplayButton = $("<input>", { class: "formDisplay", id: "tableDisplayBtn", type: "submit", name: "tableDisplayBtn", value: "tableDisplay" })
$("#contact_body").prepend(tableDisplayButton);
$("#tableDisplayBtn").on("click", function () { switchViewToTable() });


function switchViewToForm() {
    $("#messageDisplayArea").empty();
    displayForm();
}

function switchViewToTable() {
    $("#messageDisplayArea").empty();
    displayTable();
}

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
    if (!dataLoaded) {
         return;
    }
    displaySelect();
//    var userNameLabel = $("<label for="userName">Name:</label>")

    var formDisplayArea = $("<div>", { class: 'form_settings', id: 'displayFormArea' });
    $("#messageDisplayArea").append(formDisplayArea);

    var userNameInputPara = $("<p></p>");
    var userNameLabel = $("<label>Name:</label>", {for:"userName"});
    var userNameInput = $("<input>", { class:"contact", id:"userName", type:"text", name:"userName", value:""})
    userNameInputPara.append(userNameLabel);
    userNameInputPara.append(userNameInput);
    $("#displayFormArea").append(userNameInputPara);

    var userEmailInputPara = $("<p></p>");
    var userEmailLabel = $("<label>Email:</label>", { for: "userEmail" });
    var userEmailInput = $("<input>", { class: "contact", id: "userEmail", type: "email", name: "userEmail", value: ""})
    userEmailInputPara.append(userEmailLabel);
    userEmailInputPara.append(userEmailInput);
    $("#displayFormArea").append(userEmailInputPara);

    var userMessageInputPara = $("<p></p>");
    var userMessageLabel = $("<label>Message:</label>", { for: "userMessage" });
    var userMessageInput = $("<textarea>", { class: "contact textarea", id: "userMessage", rows:"15", cols:"50", name: "userMessage"})
    userMessageInputPara.append(userMessageLabel);
    userMessageInputPara.append(userMessageInput);
    $("#displayFormArea").append(userMessageInputPara);

    var userDateInputPara = $("<p></p>");
    var userDateLabel = $("<label>Date:</label>", { for: "userDate" });
    var userDateInput = $("<input>", { class: "contact", id: "userDate", type: "text", name: "userDate", value: ""})
    userDateInputPara.append(userDateLabel);
    userDateInputPara.append(userDateInput);
    $("#displayFormArea").append(userDateInputPara);

    updateSelection();
}

function displayMsg(msgToDisplay) {
    $("#userName").val(msgToDisplay.userName);
    $("#userEmail").val(msgToDisplay.userEmail);
    $("#userMessage").val(msgToDisplay.userMessage);



    //var d = new Date(msgToDisplay.dateSubmitted);
    //$("#userDate").val(d.toDateString);


    var d = new Date(parseInt(msgToDisplay.userDate));
    console.log(d);
    console.log(d.getTime());
    console.log(d.getTime());
    $("#userDate").val(d.toDateString());


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
        msgSelect.append($("<option>", { value: i, text: i + ": " + msgArray[i].userEmail }));
    });

    $("#messageDisplayArea").prepend(msgSelect);

    $("#msgSelect").change(function () {
        updateSelection();
    });
}

function searchFunction() {
    console.log("executing search");
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("msgTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    // Only searches first column
    for (i = 0; i < tr.length; i++) {
        console.log(tr[i].getElementsByTagName("td")[0]);
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function displayTable() {
    var tableDisplayArea = $("<div>", { class: 'tableSettings', id: 'tableDisplayArea' });
    $("#messageDisplayArea").append(tableDisplayArea);


//    <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names..">

    var searchInputPara = $("<p></p>");
    var searchInputLabel = $("<label>Name:</label>", {for:"searchInput"});
    var searchInput = $("<input>", {class:"contact", id:"searchInput", type:"text", placeholder:"Search table data by name..."})
    searchInputPara.append(searchInputLabel);
    searchInputPara.append(searchInput);
    $("#messageDisplayArea").prepend(searchInputPara);

    $("#searchInput").keyup(function () {
        searchFunction();
    });


    var msgTable = $("<table>", { id: "msgTable" });
    var msgTableRow = $("<tr>");
    var msgTableHeader1 = $("<th>", { text: "Name" })
    var msgTableHeader2 = $("<th>", { text: "Email" })
    var msgTableHeader3 = $("<th>", { text: "Message" })
    var msgTableHeader4 = $("<th>", { text: "Date" })

    msgTableRow.append(msgTableHeader1);
    msgTableRow.append(msgTableHeader2);
    msgTableRow.append(msgTableHeader3);
    msgTableRow.append(msgTableHeader4);
    msgTable.append(msgTableRow);
    $("#tableDisplayArea").append(msgTable);



    $.each(msgArray, function (i, value) {
        var msgTableRow = $("<tr>");
        var d = new Date(parseInt(msgArray[i].userDate));

        var msgTableCell1 = $("<td>", { text: msgArray[i].userName, style: "width:150px" });
        var msgTableCell2 = $("<td>", { text: msgArray[i].userEmail, style: "width:150px" });
        var msgTableCell3 = $("<td>", { text: msgArray[i].userMessage, style: "width:150px" });
        var msgTableCell4 = $("<td>", { text: d.toDateString(), style: "width:100px" });

        msgTableRow.append(msgTableCell1);
        msgTableRow.append(msgTableCell2);
        msgTableRow.append(msgTableCell3);
        msgTableRow.append(msgTableCell4);
        msgTable.append(msgTableRow);
    });
}

function displayAccordian() {

}

function displayTabs() {

}
