var playerPos;              //index of the player position
var nearRadius = 15;        //default for how far a player can see around them
var visible = [];           //unnecessary

// adds an event listener that will respond to all keypresses
// keydown, keyup, keypress
document.addEventListener("keydown", control)

// dictionary wtih the radius of visibility for each difficulty
var nearRadiusDict = {
    "easy": 0,
    "medium": 15,
    "hard": 12,
    "impossible": 5
};

//dictionary of whether or not each of the squares are actually walkable
var walkableDict = {
    "board": true,
    "possible": true,
    "possible_edge": true,
    "anchor": true,

    "border": false,
    "corner": false,
    "start": false,
    "finish": false,
    "wall": false,      
    
    "player": false
}


// places the player right next to the starting point
function placePlayer() {
    playerPos = startClosest
    updateID(playerPos, "player")
}

// controls the movement of the player
// only registers & post-processes movement if the movement caused any change
function control(e) {    
    winLose();

    let action = false;

    if (e.keyCode === 39 || e.keyCode === 68 || e === "right") {
        action = moveRight();
    } else if (e.keyCode === 37 || e.keyCode === 65 || e === "left") {
        action = moveLeft();
    } else if (e.keyCode === 38 || e.keyCode === 87 || e === "up") {
        action = moveUp();
    } else if (e.keyCode === 40 || e.keyCode === 83 || e === "down") {
        action = moveDown();
    } else {
        return;
    }

    if (action) { //only if there is action will there be post-processing
        winLose();
    
        erasePrevNear();
        near(playerPos, nearRadius);
        colorOnlyBoard();
        answerPointer();
    }
}

// moves the player to the RIGHT, LEFT, UP, or DOWN square
// returns true if there was substantive change
// returns false otherwise
function moveRight() {
    let newPlayerPos = playerPos + 1
    if (walkable(newPlayerPos) || getID(newPlayerPos) == "finish") {
        updateID(playerPos, "board")
        updateID(newPlayerPos, "player")
        playerPos = newPlayerPos

        moveGridBack(-1 * element_width, 0)
        return true;
    }
    return false;
}
function moveLeft() {
    let newPlayerPos = playerPos - 1
    if (walkable(newPlayerPos) || getID(newPlayerPos) == "finish") {
        updateID(playerPos, "board")
        updateID(newPlayerPos, "player")
        playerPos = newPlayerPos

        moveGridBack(element_width, 0);
        return true;
    }
    return false;
}
function moveUp() {
    let newPlayerPos = playerPos - width
    if (walkable(newPlayerPos) || getID(newPlayerPos) == "finish") {
        updateID(playerPos, "board")
        updateID(newPlayerPos, "player")
        playerPos = newPlayerPos

        moveGridBack(0, element_width)
        return true;
    }
    return false;
}
function moveDown() {
    let newPlayerPos = playerPos + width
    if (walkable(newPlayerPos) || getID(newPlayerPos) == "finish") {
        updateID(playerPos, "board")
        updateID(newPlayerPos, "player")
        playerPos = newPlayerPos

        moveGridBack(0, -1 * element_width)
        return true;
    }
    return false;
}

// erases the "possible" and "possible_edge" squares and resets them to be "board"
function erasePrevNear() {
    let index = 0;
    for (let i = 0; i <board.length; i++) {
        index = board[i]
        if (squares[index].id == "possible" || squares[index].id == "possible_edge") {
            updateID(index, "board");
        }
    }
}

// sets the squares within a certain radius to be visible
// centered around the index with radius iter
function near(index, iter) {
    if (iter == 0) {
        return;
    } else if (iter == 1) {
        if (getID(index - 1) == "board") {
            squares[index - 1].id = "possible_edge"
            near(index - 1, iter - 1)
        }
        if (getID(index + 1) == "board") {
            squares[index + 1].id = "possible_edge"
            near(index + 1, iter - 1)
        }
        if (getID(index - width) == "board") {
            squares[index - width].id = "possible_edge"
            near(index - width, iter - 1)
        }
        if (getID(index + width) == "board") {
            squares[index + width].id = "possible_edge"
            near(index + width, iter - 1)
        }
    } else {
        if (walkable(index - 1)) {
            squares[index - 1].id = "possible"
            near(index - 1, iter - 1)
        }
        if (walkable(index + 1)) {
            squares[index + 1].id = "possible"
            near(index + 1, iter - 1)
        }
        if (walkable(index - width)) {
            squares[index - width].id = "possible"
            near(index - width, iter - 1)
        }
        if (walkable(index + width)) {
            squares[index + width].id = "possible"
            near(index + width, iter - 1)
        }
    }
}

// determines whether the square at the specified index is walkable
function walkable(index) {
    try {
        return walkableDict[squares[index].id]
    } catch(err) {
        return false
    }
}

// if finish is off the screen, create a pointer to it
function answerPointer() {

    let finishPos = document.getElementById("finish_Pos_Calc")
    let finishPosT = parseInt(finishPos.style.top);
    let finishPosL = parseInt(finishPos.style.left);


    let finish_pointer = document.getElementById("finish_pointer")

    let top_bottom = null;
    let left_right = null;

    if (finishPosT < 0) {
        top_bottom = "top";
    } else if (finishPosT > parseInt(screenHeight) - element_width) {
        top_bottom = "bottom";
    }

    if (finishPosL < 0) {
        left_right = "left";
    } else if (finishPosL > parseInt(screenWidth) - element_width) {
        left_right = "right";
    }


    if (top_bottom == null && left_right == null) {
        finish_pointer.style.opacity = 0;
        return;
    } else {
        finish_pointer.style.opacity = 1;
    }
    
    if (top_bottom == "top") {
        finish_pointer.style.top = "0px";
        if (left_right == "left") { //top left
            finish_pointer.style.left = "0px";
            finish_pointer.style.transform = "rotate(135deg)";
        } else if (left_right == "right") { //top right
            finish_pointer.style.left = parseInt(screenWidth) - element_width + "px";
            finish_pointer.style.transform = "rotate(225deg)";
        } else { // top
            finish_pointer.style.left = finishPosL + "px";
            finish_pointer.style.transform = "rotate(180deg)";
        }
    } else if (top_bottom == "bottom") {
        finish_pointer.style.top = parseInt(screenHeight) - element_width + "px"
        if (left_right == "left") { //bottom left
            finish_pointer.style.left = "0px";
            finish_pointer.style.transform = "rotate(45deg)";
        } else if (left_right == "right") { //bottom right
            finish_pointer.style.left = parseInt(screenWidth) - element_width + "px";
            finish_pointer.style.transform = "rotate(-45deg)";
        } else { //bottom
            finish_pointer.style.left = finishPosL + "px";
            finish_pointer.style.transform = "rotate(0deg)";   
        }
    } else {
        if (left_right == "left") { //left
            finish_pointer.style.top = finishPosT + "px";
            finish_pointer.style.left = "0px";
            finish_pointer.style.transform = "rotate(90deg)";
        } else if (left_right == "right") { //right
            finish_pointer.style.top = finishPosT + "px";
            finish_pointer.style.left = parseInt(screenWidth) - element_width + "px";
            finish_pointer.style.transform = "rotate(-90deg)";
        } else {
            console.log("CODE ERROR");
        }
    }
    return;
}

