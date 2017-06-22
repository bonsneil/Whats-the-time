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
        drawClockFrame(fourColumns[i], canvas.height / 2, clocksToDisplay[i]);
    }
    // Run loop again to make appear on top
    for (var i = 0; i < 4; i++) {
        drawClockText(fourColumns[i], canvas.height / 2, clocksToDisplay[i]);
    }
}

function drawClockFrame(x, y, digitalClockObj) {
//    console.log("x: " + x + ", y: " + y);
//    console.log(digitalClockObj.hour + " :" + digitalClockObj.minute)
    drawRectangleWithBorder(x - digitalClockObj.widthDigital / 2, y - digitalClockObj.heightDigital / 2, digitalClockObj.widthDigital, digitalClockObj.heightDigital);
}

function drawClockText(x, y, digitalClockObj) {
    drawText(x, y + 15, digitalClockObj.hour + ":" + digitalClockObj.minute);
}

function drawRectangleWithBorder(x, y, w, h) {
    ctx.rect(x, y, w, h);
    ctx.fillStyle = "#8ED6FF"; //Light blue
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function drawText(x, y, msg) {
    ctx.fillStyle = "#FF8C00"; //Orange
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(msg, x, y);
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
}

function setDigitalClockQuestion() {

    var i = getRandomIntInclusive(0, clocksToDisplay.length - 1)
    answerClock = clocksToDisplay[i];
    //document.getElementById("questionSection").innerHTML = answerClock.hour + ":" + answerClock.minute;
}


function drawAnalogueClock() {



    var img = new Image();
    //img.src = "../_img/clock1100.png";
    img.src = answerClock.imgPath;

    img.onload = function () {
        ctx.drawImage(img, canvas.width / 2 - 100, 50, 200, 200);
    }

//    ctx.addHitRegion({ id: "analogueClock" });


    /*
    var newImg = document.createElement("img");
    newImg.setAttribute("id", answerClock.clockId + "x");
    console.log("Path: " + answerClock.imgPath);
    newImg.setAttribute("src", answerClock.imgPath);
    newImg.setAttribute("class", "clockImage");
    document.body.appendChild(newImg)

    var img = document.getElementById(answerClock.clockId + "x")
    ctx.drawImage(img, 50, 50);

    */

}



function onClick(e) {
   /*
    var offsetX = 0, offsetY = 0

    offsetX = canvas.offsetLeft
    offsetY = canvas.offsetTop
    console.log("offsetLeft: " + canvas.offsetLeft)
    console.log("offsetTop: " + canvas.offsetTop)
    x = e.pageX;
    y = e.pageY;
    console.log(x + ", " + y)
    x = e.pageX - offsetX;
    y = e.pageY - offsetY;
    console.log(x + ", " + y)
    */

    //TODO: Recursive up tree adding padding and margin and height if || or padding and margin if inside

    var offsetX = 0, offsetY = 0
    rectObject = canvas.getBoundingClientRect();


    //offsetX = (document.body.clientWidth - canvas.width) / 2
    offsetX = rectObject.top;
    x = e.pageX - offsetX;
    
    //header == 180, main padding == 10, main margin == -140
    //offsetY = 180 + 10 - 140 + 176
    offsetY = rectObject.left;
    y = e.pageY - offsetY;
    console.log(x + ", " + y)


    console.log(rectObject)
}

canvas.addEventListener("click", onClick, false);

console.log("findDigitalClock()")
createClockCollection();
printClockCollection();
fourColumnCanvas();
createGameClocks();
setDigitalClockQuestion();
drawDigitalClocks();
drawAnalogueClock();

