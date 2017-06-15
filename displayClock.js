var clocks = [];
var questions = ["O'clock", "Quarter past", "Half past", "Quarter to"]
console.log(questions);

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

function displayClocks() {
    for (var i = 0; i < clocks.length; i++) {
        document.getElementById("clockImages").appendChild(clocks[i].srcImg);
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
//    var answerClock = getClockByAnswer(s);


    //console.log("Clicked: " + clickedClock.clockId)
    console.log("Clicked: " + clickedClock.minute)
    console.log("Clicked: " + clickedClock.minute / 15)

    if (questions[clickedClock.minute / 15] == answer) {
        ans.innerHTML = "You must be a time lord!!";
        filterAllImages("grayscale(100%)");
        document.getElementById(clickedClock.clockId).setAttribute("style", "filter: none");
    } else {
        ans.innerHTML = "Try again";
        filterAllImages("grayscale(100%)");
  //      document.getElementById(s).setAttribute("style", "filter: none");
    }

    if (document.getElementById("resetBtn") == null) {
        console.log("reset null")
        displayReset();
    } else {
        console.log("reset not null")
    }


    //    alert(x.id)
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
}

function filterAllImages(s) {
    var elements = document.getElementsByTagName("img");
    for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute("style", "filter: " + s);
        elements[i].setAttribute("style", "-webkit-filter: " + s); /* Safari 6.0 - 9.0 */
    }
}



createClockCollection();
//printClockCollection();
setQuestion();
displayClocks();


/*
function displayImage() {
    alert("displayimg");
    var newImg = document.createElement("img");
    newImg.setAttribute("src", "clock.jpg");
    newImg.setAttribute("id", "01");
    console.log(newImg.id)
    document.body.appendChild(newImg);
}
*/



