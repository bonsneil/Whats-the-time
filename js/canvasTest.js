// create a canvas to work with
var canvas = document.createElement('canvas');
document.getElementById("gameArea").appendChild(canvas);
//document.body.appendChild(canvas);

// style canvas
canvas.width = 960;
canvas.height = 640;
canvas.setAttribute("style", "border: 1px solid black;");
//canvas.width = 958;
//canvas.height = 638;

// get 2D context
var ctx = canvas.getContext('2d');



function drawText(x, y, msg) {
    console.log(msg);
    ctx.fillStyle = "#FF8C00"; //Orange
    ctx.font = "30px Arial";
   // ctx.textAlign = "center"; 
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
    ctx.fillStyle = "#8ED6FF"; //Light blue
    ctx.fillRect(x, y, w, h);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, w, h);
}



var newDiv = document.createElement("div");
//drawText(10, 10, "Hello world")


// setup some basic squares to use for our example
var map = { x: 30, y: 50, width: 200, height: 200, color: "maroon" };
var player = { x: 0, y: 0, width: 25, height: 25, color: "silver" };

// center player on map
player.x = map.x + (map.width - player.width) * .5;
player.y = map.y + (map.height - player.height) * .5;

// draw map
function drawMap() {
    ctx.fillStyle = map.color;
    ctx.fillRect(map.x, map.y, map.width, map.height);
}

// draw player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
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
    var collision = contains(player, mouseX, mouseY);
    if (collision) {
        alert("Player clicked");
        return;
    }

    var collision = contains(map, mouseX, mouseY);
    if (collision) {
        alert("Map clicked");
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


// loop
setInterval(onTimerTick, 33);

// render loop
function onTimerTick() {
    // clear the canvas
    canvas.width = canvas.width;
    drawMap();
    drawPlayer();

    // see if a collision happened
    var collision = contains(map, mouseX, mouseY);
    var color = collision ? map.color : "black";
    var collision = contains(player, mouseX, mouseY);
    var color = collision ? player.color : color;

    // render text
    ctx.fillStyle = color;
    ctx.font = "18px sans-serif";
    ctx.fillText(" Mouse (" + mouseX + "," + mouseY + ")", 10, 20);

    // render square    
    //context.fillStyle = color;
    //context.fillRect(box.x, box.y, box.width, box.height);
}
