var clocks = [];
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
        newImg.setAttribute("id", clocksToDisplay[i].clockId);
        console.log("Path: " + clocksToDisplay[i].imgPath)
        newImg.setAttribute("src", clocksToDisplay[i].imgPath);
        newImg.setAttribute("class", "clockImage");
        clocksToDisplay[i].srcImgElement = newImg;
    }

    //Randomise display of clocks
    clocksToDisplay = shuffle(clocksToDisplay);

    for (var i = 0; i < clocksToDisplay.length; i++) {

        clocksToDisplay[i].srcImgElement.addEventListener("click", function () { submitAnswer(this.id) });
        clocksToDisplay[i].srcImgElement.addEventListener("mouseover", function () { mouseOver(this) });
        clocksToDisplay[i].srcImgElement.addEventListener("mouseout", function () { mouseOut(this) });

        document.getElementById("clockImages").appendChild(clocksToDisplay[i].srcImgElement);
      
    }
}

function setDigitalClockQuestion() {

    var i = getRandomIntInclusive(0, clocksToDisplay.length-1)
    answerClock = clocksToDisplay[i];
    document.getElementById("questionSection").innerHTML = answerClock.hour + ":" + answerClock.minute;
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
        var ans = document.createElement("div");
        ans.setAttribute("id", "ansID");
        document.getElementById("answerSection").appendChild(ans);
    } else {
        return true;
    }

    var clickedClock = getClockByID(s);

    filterClockImages("grayscale(100%)");
    document.getElementById(answerClock.clockId).setAttribute("style", "filter: none");


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
    console.log("displayreset");
    var resetBtn = document.createElement("img");
    resetBtn.setAttribute("id", "resetBtn");
    resetBtn.setAttribute("src", "../images/playAgain.png");
    resetBtn.setAttribute("class", "resetImage");
    resetBtn.addEventListener("click", function () { resetGame() });
    console.log(resetBtn.id);
    //document.body.appendChild(resetBtn);
    console.log("Display image")
    document.getElementById("answerSection").appendChild(resetBtn);

}

function resetGame() {
    console.log("reset clicked");
    resetBtn.parentNode.removeChild(resetBtn);
    document.getElementById("ansID").parentNode.removeChild(document.getElementById("ansID"));
    filterClockImages("none");
    location.reload();
}

function filterClockImages(s) {
    //var elements = document.getElementsByTagName("img");
    var elements = document.getElementsByClassName("clockImage")
    for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute("style", "filter: " + s);
        elements[i].setAttribute("style", "-webkit-filter: " + s); /* Safari 6.0 - 9.0 */
    }
}


//TODO: Convert to initialise, check for null, delete and create
createClockCollection();
printClockCollection();
displayClocks();
setDigitalClockQuestion();

