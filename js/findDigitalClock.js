// create a canvas to work with
var canvas = document.createElement('canvas');
document.getElementById("gameArea").appendChild(canvas);

// style canvas
canvas.width = 960;
canvas.height = 640;
canvas.setAttribute("style", "border: 1px solid black;");

// get 2D context
var ctx = canvas.getContext('2d');





// Global variables
var fourColumns = [];
var clocks = [];
var clocksToDisplay = [];

var answerClock = new Clock();
var answerClockImageLoaded = false;
var answerClockImage = new Image();
var answerSubmitted = false;

var resetButton = { x: canvas.width / 2 - 75, y: canvas.height / 2 + 100, width: 150, height: 100 }
var resetButtonImageLoaded = false;
var resetButtonImage = new Image();

var map = { x: 30, y: 50, width: 200, height: 200, color: "maroon" };


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
    }
}

function drawDigitalClocks() {
    for (var i = 0; i < 4; i++) {
        drawClockFrame(clocksToDisplay[i]);
    }
    // Run loop again to make appear on top
    for (var i = 0; i < 4; i++) {
        drawClockText(clocksToDisplay[i]);
    }
}

function drawClockFrame(digitalClockObj) {
    ctx.rect(digitalClockObj.x, digitalClockObj.y, digitalClockObj.width, digitalClockObj.height);
    ctx.fillStyle = "#8ED6FF"; //Light blue
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function drawClockText(digitalClockObj) {
    //centre of box
    xCentre = digitalClockObj.x + digitalClockObj.width * 0.5;
    yCentre = digitalClockObj.y + digitalClockObj.height * 0.5 + 15; //Arial all caps at 40 px is height 30 px, halved is 15
    ctx.fillStyle = "#FF8C00"; //Orange
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(digitalClockObj.hour + ":" + digitalClockObj.minute, xCentre, yCentre);
}

function fourColumnCanvas() {
    var colSpacing = canvas.width / 5
    for (var i = 0; i < 4; i++) {
        fourColumns[i] = Math.floor((i * colSpacing) + colSpacing);
    }
    console.log(fourColumns);
}


function getClock(searchMinute, searchHour) {
    for (var i = 0; i < clocks.length; i++) {
        if ((clocks[i].minute == searchMinute) && (clocks[i].hour == searchHour)) {
            return clocks[i];
        }
    }
}
function createGameClocks() {
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

    //Randomise game clocks
    clocksToDisplay = shuffle(clocksToDisplay);

    //assign x and y positions to game clocks
    for (var i = 0; i < numberClocksToDisplay; i++) {
        clocksToDisplay[i].x = fourColumns[i] - clocksToDisplay[i].width * .5;
        clocksToDisplay[i].y = canvas.height * .5;
    }
}

function setDigitalClockQuestion() {
    var i = getRandomIntInclusive(0, clocksToDisplay.length - 1)
    answerClock = clocksToDisplay[i];
}


function drawAnalogueClock() {
    answerClockImage.src = answerClock.imgPath;

    // ensures image has loaded before attempting to draw
    answerClockImage.onload = function () {
        answerClockImageLoaded = true;
    }

    if (answerClockImageLoaded) {
        ctx.drawImage(answerClockImage, canvas.width / 2 - 100, 50, 200, 200);
        return;
    }

}



// place holders for mouse x,y position
var mouseX = 0;
var mouseY = 0;


// update mouse position
canvas.onmousemove = function (e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
}


// detect mouse clicks
canvas.onclick = function (e) {
    // Check if a clock is clicked
    if (resetButtonImageLoaded) {
        console.log(resetButton)
        var collision = contains(resetButton, mouseX, mouseY);
        if (collision) {
            resetGame();
            return;
        }
    }

    for (var i = 0; i < clocksToDisplay.length; i++) {
        var collision = contains(clocksToDisplay[i], mouseX, mouseY);
        if (collision) {
            submitAnswer(clocksToDisplay[i]);
            return;
        }
    }
}

function resetGame() {
    resetButtonImageLoaded = false;
    console.log("reset clicked");
    location.reload();
}


function drawResetButton() {
    resetButtonImage.src = "../images/playAgain.png";

    // ensures image has loaded before attempting to draw
    resetButtonImage.onload = function () {
        resetButtonImageLoaded = true;
    }

    if (resetButtonImageLoaded) {
        ctx.drawImage(resetButtonImage, resetButton.x, resetButton.y, resetButton.width, resetButton.height);
        return;
    }

}


function submitAnswer(clickedClock){
    if (answerSubmitted) {
        return;
    }
    answerSubmitted = true;
    drawResetButton();

    if (clickedClock == answerClock) {
        alert(correctMsg[getRandomIntInclusive(0, correctMsg.length - 1)]);
    } else {
        alert(incorrectMsg[getRandomIntInclusive(0, incorrectMsg.length - 1)]);
    }
}


// test for collision between a target object and a point
function contains(target, x, y) {
    return (x >= target.x &&
        x <= target.x + target.width &&
        y >= target.y &&
        y <= target.y + target.height
    );
}

console.log("findDigitalClock()")
createClockCollection();
printClockCollection();
fourColumnCanvas();
createGameClocks();
printClockCollection();
setDigitalClockQuestion();

// loop
setInterval(onTimerTick, 33);

// render loop
function onTimerTick() {
    // clear the canvas
    //canvas.width = canvas.width;
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    //ctx.restore();

    drawAnalogueClock();
    drawDigitalClocks();
    if (answerSubmitted) {
        drawResetButton();
    }

    // see if a collision happened
    //var collision = contains(map, mouseX, mouseY);
    //var color = collision ? map.color : "black";
    //var collision = contains(player, mouseX, mouseY);
    //var color = collision ? player.color : color;

    // render text
    ctx.fillStyle = "black";
    ctx.font = "18px sans-serif";
    ctx.fillText("(" + mouseX + "," + mouseY + ")", 60, 20);

    // render square    
    //context.fillStyle = color;
    //context.fillRect(box.x, box.y, box.width, box.height);
}
