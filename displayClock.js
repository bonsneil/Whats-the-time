var clocks = [];
var clocksToDisplay = [];
var questions = ["O'clock", "Quarter past", "Half past", "Quarter to"]
var answerClock = new Clock();

function createClockCollection() {
    for (var i = 0; i < 4; i++) {
        var s = "clock0" + i;
        var tmpClock = new Clock(s, 2, (i * 15) % 60, s + ".png");
        clocks[i] = tmpClock;
        var newImg = document.createElement("img");
        newImg.setAttribute("id", clocks[i].clockId);
        newImg.setAttribute("src", clocks[i].imgPath);
        newImg.setAttribute("class", "clockImage");
        newImg.addEventListener("click", function () { submitAnswer(this.id) });
        clocks[i].srcImg = newImg;
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

function displayClocks() {
    for (var i = 0; i < 4; i++) {
        clocksToDisplay[i] = getClock((i * 15) % 60, 2);
        //clocksToDisplay[i] = getClock((i * 15) % 60, getRandomIntInclusive(1, 12));
    }

    //TODO: Randomise display of clocks
    for (var i = 0; i < clocksToDisplay.length; i++) {
        document.getElementById("clockImages").appendChild(clocksToDisplay[i].srcImg);
        if (clocksToDisplay[i].minute == timeAsNumber(document.getElementById("questionSection").innerHTML)) {
            answerClock = clocksToDisplay[i];
            console.log("Answer clock set: " + answerClock.minute)
        }
    }
}

function timeAsNumber(timeString) {
    switch (timeString) {
        case "O'clock":
            return 0;
            break;
        case "Quarter past":
            return 15;
            break;
        case "Half past":
            return 30;
            break;
        case "Quarter to":
            return 45;
            break;
    }    
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setQuestion () {
    var i = getRandomIntInclusive(0, 3)
    document.getElementById("questionSection").innerHTML = questions[i];
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
        //console.log("null")
        var ans = document.createElement("div");
        ans.setAttribute("id", "ansID");
        document.getElementById("answerSection").appendChild(ans);
        //document.body.appendChild(ans);
    } else {
        //console.log("not null")
        return true;
        //ans = document.getElementById("ansID");
    }

    var answer = document.getElementById("questionSection").innerHTML;
    var clickedClock = getClockByID(s);

    filterAllImages("grayscale(100%)");
    document.getElementById(answerClock.clockId).setAttribute("style", "filter: none");

    if (clickedClock == answerClock) {
        ans.innerHTML = "You must be a time lord!!";
    } else {
        ans.innerHTML = "Try again ";
    }
    
    if (document.getElementById("resetBtn") == null) {
        console.log("reset null")
        displayReset();
    } else {
        console.log("reset not null")
    }

    //TODO: Reset button generates new question
}

function displayReset() {
    console.log("displayreset");
    var resetBtn = document.createElement("img");
    resetBtn.setAttribute("id", "resetBtn");
    resetBtn.setAttribute("src", "resetBtn.jpg");
    resetBtn.setAttribute("class", "resetImage");
    resetBtn.addEventListener("click", function () { resetGame() });
    console.log(resetBtn.id);
    //document.body.appendChild(resetBtn);
    console.log("Display image")
    document.getElementById("answerSection").appendChild(resetBtn);
    //var s = document.createElement("div");
    //s.setAttribute("display", "inline");
    //s.setAttribute("class", "answerSection");
    //s.innerHTML = "Play again?"
    //console.log("Display s")
    //document.getElementById("answerSection").appendChild(s);
}

function resetGame() {
    console.log("reset clicked");
    resetBtn.parentNode.removeChild(resetBtn);
    document.getElementById("ansID").parentNode.removeChild(document.getElementById("ansID"));
    filterAllImages("none");
    location.reload();
}

function filterAllImages(s) {
    var elements = document.getElementsByTagName("img");
    for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute("style", "filter: " + s);
        elements[i].setAttribute("style", "-webkit-filter: " + s); /* Safari 6.0 - 9.0 */
    }
}


//TODO: Convert to initialise, check for null, delete and create
setQuestion();
createClockCollection();
//printClockCollection();
displayClocks();

