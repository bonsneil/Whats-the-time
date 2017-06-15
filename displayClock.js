//displayImage();

//document.body.appendChild(newImg);

var clocks = [];
//var clock00 = new Clock;

function createClockCollection() {
    for (var i = 0; i < 4; i++) {
        var s = "clock0" + i;
        var tmpClock = new Clock(s, 2, i * 15, s + ".png");
        clocks[i] = tmpClock;
        var newImg = document.createElement("img");
        newImg.setAttribute("id", clocks[i].clockId);
        newImg.setAttribute("src", clocks[i].imgPath);
        newImg.setAttribute("class", "clockImage");
        newImg.addEventListener("click", function () { submitAnswer(this.id) });
        clocks[i].srcImg = newImg;
        //console.log(newImg.id);
        //console.log(clocks[i].srcImg.id);

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

function submitAnswer(s) {
    //alert(s);
    //alert(document.getElementById(s).id);

    if (document.getElementById("ansID") == null) {
        console.log("null")
        var ans = document.createElement("p");
        ans.setAttribute("id", "ansID");
        document.body.appendChild(ans);
    } else {
        console.log("not null")
        return true;
        ans = document.getElementById("ansID");
    }

    if (s == "clock00") {
        ans.innerText = "Try again";
        document.getElementById(s).setAttribute("style", "filter: grayscale(100%)");
    } else if (s == "clock01") {
        ans.innerText = "You must be a time lord!!";
        filterAllImages("grayscale(100%)");
        document.getElementById(s).setAttribute("style", "filter: none");
    } else if (s == "clock02") {
        ans.innerText = "Try again";
        document.getElementById(s).setAttribute("style", "filter: grayscale(100%)");
    } else if (s == "clock03") {
        ans.innerText = "Try again";
        document.getElementById(s).setAttribute("style", "filter: grayscale(100%)");
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
    document.body.appendChild(resetBtn);
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



//Set the question
document.getElementById("question").innerHTML = "Quarter Past";


createClockCollection();
printClockCollection();
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



