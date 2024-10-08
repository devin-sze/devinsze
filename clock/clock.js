
function clockMain() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        changeMode();
    }
    generateTimes();
    doTime();
}

function generateTimes() {
    generateTime("hr0", 2);
    generateTime("hr1", 9);
    generateTime("min0", 5);
    generateTime("min1", 9);
    generateTime("sec0", 5);
    generateTime("sec1", 9);
}

function generateTime(id, max) {
    let holder = document.getElementById(id);
    for (let i = 0; i <= max; i++) {
        square = document.createElement('div');
        square.innerHTML = i;
        square.id = "dig";
        if (i == 0) {
            square.className = "top";   
        } else if (i == max) {
            square.className = "bottom";
        }
        holder.appendChild(square);
        
    }
}

var currMode = "light";

function changeMode() {
    if (currMode == "dark") {
        currMode = "light";
        document.getElementById("bodyBackDark").style.backgroundImage = "none";
        document.getElementById("bottom_right").style.color = "black";
        document.getElementById("github").style.filter = "invert(0) contrast(1) drop-shadow(2px 2px 2px #424750de) drop-shadow(-2px -2px 2px #f1f1f18f)";
        document.getElementById("mode").style.backgroundImage = "url('sun.png')";
    } else {
        currMode = "dark";
        document.getElementById("bodyBackDark").style.backgroundImage = "linear-gradient(-45deg, #2d3036, #757a85)";
        document.getElementById("bottom_right").style.color = "#b8b8b8";
        document.getElementById("github").style.filter = "invert(1) contrast(1) drop-shadow(2px 2px 2px #191a1be7) drop-shadow(-2px -2px 2px #f1f1f18f)";


        
        document.getElementById("mode").style.backgroundImage = "url('moon.png')";
    }
}
