
var colorDict = {
    "border": "#011638",            //outer border
    "corner": "#011638",            //outer border, corner
    "start": "rgb(22, 161, 22)",    //outer border, start square
    "finish": "rgb(255, 30, 30)",   //outer border, finish square

    "wall": "#011638",              //inner border, default
    "anchor": "#011638",            //walkable
    "board": "#011638",             //walkable
    "possible": "#E8E9ED",          //walkable, near player
    "possible_edge": "#758093",     //walkable, half-near player
    "player": "#ff5ca0"             //walkable, player


    //"answer": "#011638",            //disp
    //"auto": "orange",

    
};



// set the background color of all squares in the grid 
function color() {
    for (let i=0; i < width*height; i++) {
        let square = squares[i]
        try {
            var color = colorDict[square.id];
            square.style.backgroundColor = color;
        } catch (err) {
            //console.log("color error")
        }
    }
}

// sets the background color of ONLY the board
// ie, sets background color of ONLY walkable squares
function colorOnlyBoard() {
    for (let i=0; i < board.length; i++) {
        let square = squares[board[i]];
        try {
            var color = colorDict[square.id];
            square.style.backgroundColor = color;
        } catch (err) {
            //console.log("color error")
        }
    }
}


// if it is on the border (regular border or corner), set their ids
function highlightBorder() {
    for (let i = 0; i < width*height; i++) {
        if (isBorder(i)) {
            squares[i].id = "border"
            if (isCorner(i)) {
                squares[i].id = "corner"
            }
        }
    }
}

//determines if a square is on the border
function isBorder(i) {
    if (i < width) { //top row
        return true
    } else if (i % width == 0) { //left col
        return true
    } else if (i % width == width-1) { // right col
        return true
    } else if (i > (height-1) * width) { //bottom row
        return true
    }
    return false
}

// determines if a square is a corner
function isCorner(i){
    return i == 0 || i == (width - 1) || i == (width*(height-1)) || i == (width * height - 1);
}
// sets the corners to be their respective classes
// purpose is for them to be curved
function addCornerClass() {
    squares[0].classList.add("corner_TL")
    squares[width - 1].classList.add("corner_TR")
    squares[width*(height-1)].classList.add("corner_BL")
    squares[width * height - 1].classList.add("corner_BR")
}

// the finish square will pulse slightly every second
function pulseFinish() {
    return;
    if (isLose() || isWin()) {
        return;
    }
    let finishSquare = squares[finish];
    let finishColor = colorDict["finish"];
    if (finishSquare.style.backgroundColor == finishColor) {
        finishSquare.style.backgroundColor = "#ff876e";
    } else {
        finishSquare.style.backgroundColor = finishColor;
    }
    setTimeout(arguments.callee, 1000); //arguments.callee will call pulseFinish() after 1000 ms
}

