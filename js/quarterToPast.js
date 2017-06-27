﻿var clocks = [];
var clocksToDisplay = [];
var questions = ["O'clock", "Quarter past", "Half past", "Quarter to"]
var currentQuestion = ""
var answerClock = new Clock();

function createClockCollection() {
    var j = 0;
    for (var i = 0; i < 48; i++) {
        if (((i * 15) % 60) == 0) {
            j++;
        }

        var hr = numberAsString(j);
        var min = numberAsString((i * 15) % 60);

        var s = "clock" + hr + min;
        var tmpClock = new Clock(s, hr, min, "../_img/" + s + ".png");
        clocks[i] = tmpClock;
    }
}

function printClockCollection() {
    for (var i = 0; i < clocks.length; i++) {
        console.log(clocks[i].clockId);
        console.log(clocks[i].hour);
        console.log(clocks[i].minute);
        console.log(clocks[i].imgPath);
    }
}

function getClock(searchMinute, searchHour) {
    for (var i = 0; i < clocks.length; i++) {
        if ((clocks[i].minute == searchMinute) && (clocks[i].hour == searchHour)) {
            return clocks[i];
        }
    }
}

function mouseOver(obj) {
    //document.getElementById("demo").style.color = "red";
    //alert("Over: " + obj.id)
    //obj.height = obj.height * 1.5;
}

function mouseOut(obj) {
    //document.getElementById("demo").style.color = "black";
    //alert("Out: " + obj.id)
    //obj.height = obj.height / 1.5;
}

function displayClocks() {
    var numberClocksToDisplay = 4;
    for (var i = 0; i < numberClocksToDisplay; i++) {
        clocksToDisplay[i] = getClock((i * 15) % 60, getRandomIntInclusive(1, 12));
        //Attach Images To Clock
        var newImg = document.createElement("img");
        $(newImg).attr("id", clocksToDisplay[i].clockId);
        $(newImg).attr("src", clocksToDisplay[i].imgPath);
        $(newImg).attr("class", "clockImage");
        clocksToDisplay[i].srcImgElement = newImg;
    }

    //Randomise display of clocks
    clocksToDisplay = shuffle(clocksToDisplay);

    for (var i = 0; i < clocksToDisplay.length; i++) {

        clocksToDisplay[i].srcImgElement.addEventListener("click", function () { submitAnswer(this.id) });

      //  $(".clockImage").on("click", onMouseClick(this.id));

        clocksToDisplay[i].srcImgElement.addEventListener("mouseover", function () { mouseOver(this) });
        clocksToDisplay[i].srcImgElement.addEventListener("mouseout", function () { mouseOut(this) });

        $("#clockImages").append(clocksToDisplay[i].srcImgElement);
        if (clocksToDisplay[i].minute == timeAsNumber(currentQuestion)) {
            answerClock = clocksToDisplay[i];
            //console.log("Answer clock set: " + answerClock.minute)
        }
    }
}

function setQuestion () {
    var i = getRandomIntInclusive(0, 3)
    currentQuestion = questions[i];
    $("#questionSection").append(currentQuestion);
}

function getClockByID(cId) {
    for (var i = 0; i < clocks.length; i++) {
        if (clocks[i].clockId == cId) {
            return clocks[i];
        }
    }
}

function submitAnswer(s) {
    if (document.getElementById("ansID") == null) {
        var ans = document.createElement("p");
        $(ans).attr("id", "ansID");
        $("#answerSection").append(ans);
    } else {
        return true;
    }

    var clickedClock = getClockByID(s);

    filterClockImages("grayscale(100%)");
    $("#" + answerClock.clockId).attr("style", "filter: none");

    if (document.getElementById("resetBtn") == null) {
        displayReset();
    } 

    if (clickedClock == answerClock) {
        ans.innerHTML = correctMsg[getRandomIntInclusive(0, correctMsg.length - 1)];
    } else {
        ans.innerHTML = incorrectMsg[getRandomIntInclusive(0, incorrectMsg.length - 1)];
    }

}

function displayReset() {
    var resetBtn = document.createElement("img");
    $(resetBtn).attr("id", "resetBtn");
    $(resetBtn).attr("src", "../images/playAgain.png");
    $(resetBtn).attr("class", "resetImage");
    resetBtn.addEventListener("click", function () { resetGame() });
    $("#answerSection").append(resetBtn);
}

function resetGame() {
    console.log("reset clicked");
    //remove reset button and answer text
    $("#answerSection").empty();
    //resetBtn.parentNode.removeChild(resetBtn);
    //$("#ansID").remove();

    //remove clock images
    filterClockImages("none");
    $("#clockImages").empty();

    //remove question
    $("#questionSection").empty();

    //clear question
    currentQuestion = "";

    //clear answer
    answerClock = {};

    //clear display clocks
    clocksToDisplay.length = 0;

    //Start new game
    setupGame();
}

function filterClockImages(s) {
    //var elements = document.getElementsByTagName("img");
    var elements = document.getElementsByClassName("clockImage")
    for (var i = 0; i < elements.length; i++) {
        $(elements[i]).attr("style", "filter: " + s);
        $(elements[i]).attr("style", "-webkit-filter: " + s); /* Safari 6.0 - 9.0 */
        //elements[i].setAttribute("style", "filter: " + s);
        //elements[i].setAttribute("style", "-webkit-filter: " + s); /* Safari 6.0 - 9.0 */
    }
}


$(document).ready(function () {
    //Add event handlers
});

function onMouseClick(evt) {
    alert("clicked");
}

function setupGame() {
    console.log("Starting new game");
    setQuestion();
    displayClocks();
}

createClockCollection();
//printClockCollection();
setupGame();
