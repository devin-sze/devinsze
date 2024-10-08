
function reset() {
    for (let square of squares) {
        removeGrid(square);
    }
    startIndex = -1;
    finishIndex = -1;
    hideFailure();
    if (dropped) {
        controlDropdown();
    }
}

// if wall, start, finish, doesn't overwrite
function softReset() {
    for (let square of squares) {
        if (!square.classList.contains("Wall") && !square.classList.contains("Start") && !square.classList.contains("Finish")) {
            removeGrid(square);
        } else if (square.classList.contains("Start") || square.classList.contains("Finish")) {
            square.style.border = "solid 0px white";
        }
    }
    hideFailure();
}

function random() {
    if (dropped) {
        controlDropdown();
    }
    reset();
    for (let square of squares) {
        if (Math.random() > 0.7) {
            setWallGrid(square);
        }
    }
}




