var clocks = [];
var clocksToDisplay = [];
var questions = ["O'clock", "Quarter past", "Half past", "Quarter to"]
var answerClock = new Clock();

function createClockCollection() {
    var j = 0;
    for (var i = 0; i < 48; i++) {
        if (((i * 15) % 60) == 0) {
            j++;
        }
        var hr = j;
        if (hr < 10) {
            hr = "0" + hr;
        }
        var min = (i * 15) % 60;
        if (min == 0) {
            min = "00";
        }
        var s = "clock" + hr + min;
        var tmpClock = new Clock(s, hr, min, "_img/" + s + ".png");
        clocks[i] = tmpClock;
        var newImg = document.createElement("img");
        newImg.setAttribute("id", clocks[i].clockId);
        newImg.setAttribute("src", clocks[i].imgPath);
        newImg.setAttribute("class", "clockImage");
        //newImg.addEventListener("click", function () { submitAnswer(this.id) });
        clocks[i].srcImgElement = newImg;
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
    alert("Over: " + obj.id)
}

function mouseOut(obj) {
    //document.getElementById("demo").style.color = "black";
    alert("Out: " + obj.id)
}

function displayClocks() {
    var numberClocksToDisplay = 4;
    for (var i = 0; i < numberClocksToDisplay; i++) {
        clocksToDisplay[i] = getClock((i * 15) % 60, getRandomIntInclusive(1, 12));
    }

    //Randomise display of clocks
    clocksToDisplay = shuffle(clocksToDisplay);

    for (var i = 0; i < clocksToDisplay.length; i++) {

        clocksToDisplay[i].srcImgElement.addEventListener("click", function () { submitAnswer(this.id) });
        //clocksToDisplay[i].srcImgElement.addEventListener("mouseover", function () { mouseOver(this) });
        //clocksToDisplay[i].srcImgElement.addEventListener("mouseout", function () { mouseOut(this) });

        document.getElementById("clockImages").appendChild(clocksToDisplay[i].srcImgElement);
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
        var ans = document.createElement("div");
        ans.setAttribute("id", "ansID");
        document.getElementById("answerSection").appendChild(ans);
    } else {
        return true;
    }

    var answer = document.getElementById("questionSection").innerHTML;
    var clickedClock = getClockByID(s);

    filterClockImages("grayscale(100%)");
    document.getElementById(answerClock.clockId).setAttribute("style", "filter: none");


    if (document.getElementById("resetBtn") == null) {
        displayReset();
    } 

    if (clickedClock == answerClock) {
        ans.innerHTML = "You must be a time lord!!";
    } else {
        ans.innerHTML = "Try again ";
    }

}

function displayReset() {
    console.log("displayreset");
    var resetBtn = document.createElement("img");
    resetBtn.setAttribute("id", "resetBtn");
    resetBtn.setAttribute("src", "images/playAgain.png");
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
setQuestion();
createClockCollection();
printClockCollection();
displayClocks();

