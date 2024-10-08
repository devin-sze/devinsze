
var startIndex = -1;
var finishIndex = -1;


document.addEventListener("mouseup", forceMouseUp);





function debug() {
    let x = parseInt(this.innerHTML);
    console.log("N", getNorth(x), "  S", getSouth(x), "  E", getEast(x), "  W", getWest(x));
}


function forceMouseUp() {
    timer = setInterval(function() {
        mouseDown = false;
        clearInterval(timer);
    }, 150)
}


var mouseDown = false;
var startSelect = false;
var finishSelect = false;

function mousedown() {
    if (!startSelect && !finishSelect) {
        mouseDown = true;
    }
}
function mouseout() {
    if (!startSelect && !finishSelect) {
        makeWall(this);
    }
}
function mouseup() {
    console.log("!");
    if (!startSelect && !finishSelect) {
        makeWall(this);
        mouseDown = false;

    } else if (startSelect) {
        if (startIndex != -1) {
            console.log(startIndex);
            removeGrid(squares[startIndex]);
        }
        
        startIndex = parseInt(this.innerHTML);
        startSelect = false;
        setStartGrid(this);
        updateCursorColor(standard_cursor_color);

    } else if (finishSelect) {
        if (finishIndex != -1) {
            removeGrid(squares[finishIndex]);
        }

        finishIndex = parseInt(this.innerHTML);
        finishSelect = false;
        setFinishGrid(this);
        updateCursorColor(standard_cursor_color);
    }
}

function makeWall(thisDiv) {
    if (mouseDown) {
        if (!thisDiv.classList.contains("Wall")) {
            return setWallGrid(thisDiv);
        } else {
            return removeGrid(thisDiv);
        }
    }
}

function setStart() {
    startSelect = true;
    finishSelect = false;
    updateCursorColor(start_cursor_color);
    if (dropped) {
        controlDropdown();
    }
}
function setFinish() {
    startSelect = false;
    finishSelect = true;
    updateCursorColor(finish_cursor_color);
    if (dropped) {
        controlDropdown();
    }
}

