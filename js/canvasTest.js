var fourColumns = [];
var clocks = [];
var clocksToDisplay = [];



function createClockCollection() {
    var j = 0;
    for (var i = 0; i < 48; i++) {
        if (((i * 15) % 60) == 0) {
            j++;
        }

        var hr = numberAsString(j);
        var min = numberAsString((i * 15) % 60);

        var s = "clock" + hr + min;
        var tmpClock = new DigitalClock(s, hr, min);
        clocks[i] = tmpClock;
    }
}



// create a canvas to work with
var canvas = document.createElement('canvas');
document.getElementById("gameArea").appendChild(canvas);

// style canvas
canvas.width = 960;
canvas.height = 640;
canvas.setAttribute("style", "border: 1px solid black;");
//canvas.width = 958;
//canvas.height = 638;

// get 2D context
var ctx = canvas.getContext('2d');


createClockCollection();
fourColumnCanvas();
drawClocks();



function drawClocks() {
    for (var i = 0; i < 4; i++) {
        drawClock(fourColumns[i], canvas.height / 2, clocks[i]);
    }

}

function drawClock(x, y, digitalClockObj) {
    console.log(digitalClockObj.hour + " :" + digitalClockObj.minute)
    drawRectangleWithBorder(x - digitalClockObj.width / 2, y - digitalClockObj.height / 2, digitalClockObj.width, digitalClockObj.height);
    drawText(x, y, digitalClockObj.hour + " :" + digitalClockObj.minute);
}


function drawText(x, y, msg) {
    console.log(msg);
    ctx.fillStyle = "#FF8C00"; //Orange
    ctx.font = "30px Arial";
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

function drawRectangleWithBorder(x, y, w, h){
    ctx.rect(x, y, w, h);
    ctx.fillStyle = "#8ED6FF"; //Light blue
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
}




function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + Math.floor(mousePos.x) + ', ' + Math.floor(mousePos.y);
    var mouseElement = document.getElementById("mouseXY");
    mouseElement.innerText = message;
    //writeMessage(canvas, message);
}, false);