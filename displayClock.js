//displayImage();

//document.body.appendChild(newImg);


document.getElementById("question").innerHTML = "Quarter Past";

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

for (var i = 0; i < 4; i++) {
    var s = "clock0" + i;
    var newImg = document.createElement("img");
    newImg.setAttribute("id", s);
    newImg.setAttribute("src", s + ".png");
    newImg.setAttribute("class", "clockImage");
    //newImg.setAttribute("onclick", "printName(this.id)");
    newImg.addEventListener("click", function () { submitAnswer(this.id) });
    console.log(newImg.id);
    document.getElementById("clocks").appendChild(newImg);
}

//dim var clickedClock = document.getElementByID("clock02");

//console.log clickedClock.id;

function testClick() {
    alert("Clicked")
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


