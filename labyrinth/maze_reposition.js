
var screenWidth = window.innerWidth;//screen.availWidth;
var screenHeight = window.innerHeight;//screen.availHeight;

window.addEventListener("resize", screenSize); //listener event that will recenter gameplay when window size changes


// updates the screen size
// then, centers the game depending on whether or not the game is active
function screenSize() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    if (isWin() || isLose()) {
        centerGamePlay()
    } else {
        document.getElementById("gameplay").style.left = "0px";
        document.getElementById("gameplay").style.top = "0px";
        centerGame();
    }
}

// centers the game such that the player position is in the center of the screen
function centerGame() {
    calcPlayerFinishPos();
    centerPlayerPos();
    answerPointer();
}

// calculates and places the calcPlayer & finishPos divs so that they are right above their respective values
// NOTE: independent of prior calcPlayer and finish_Pos_Calc positions
function calcPlayerFinishPos() {
    // left and top positions of the gameplay div
    let gameplayL = parseInt(document.getElementById("gameplay").style.left);
    let gameplayT = parseInt(document.getElementById("gameplay").style.top);

    // left and top positions of calcPlayer 
    let calcPlayL = gameplayL + (xCord(playerPos) * element_width)
    let calcPlayT = gameplayT + (yCord(playerPos) * element_width)

    calcPlayer = document.getElementById("calcPlayer")
    calcPlayer.style.left = calcPlayL + "px";
    calcPlayer.style.top = calcPlayT + "px";

    // left and top positions of calcFinishPos
    let calcFinishPosL = gameplayL + (xCord(finish) * element_width);
    let calcFinishPosT = gameplayT + (yCord(finish) * element_width);


    let calcFinishPos = document.getElementById("finish_Pos_Calc")
    calcFinishPos.style.left = calcFinishPosL + "px";
    calcFinishPos.style.top = calcFinishPosT + "px";    
}

// calculates and centers the game such that the player is directly in the center of the screen
// more precisely, the top left of the player position will be in the center of the screen
function centerPlayerPos() {
    let screenWidthMid = screenWidth/2;
    let screenHeightMid = screenHeight/2;

    // the left and top position of gameplay (the entire grid of squares)
    let gameplay = document.getElementById("gameplay")
    let gameplayL = parseInt(gameplay.style.left)
    let gameplayT = parseInt(gameplay.style.top)

    // the left and top position of the player position (this value is calculated in calcPlayerFinishPos)
    let calcPlayer = document.getElementById("calcPlayer")
    let calcPlayerL = parseInt(calcPlayer.style.left)
    let calcPlayerT = parseInt(calcPlayer.style.top)

    // the left and top position of the player position (this value is calculated in calcPlayerFinishPos)
    let finishPos = document.getElementById("finish_Pos_Calc")
    let finishPosL = parseInt(finishPos.style.left)
    let finishPosT = parseInt(finishPos.style.top)

    // the positive distance to the bottom and right the grid should be moved in order to center the player
    let deltaL = screenWidthMid - (calcPlayerL - gameplayL);
    let deltaT = screenHeightMid - (calcPlayerT - gameplayT);    

    gameplay.style.left = deltaL + "px";
    gameplay.style.top = deltaT + "px";
    
    finishPos.style.left = finishPosL + deltaL + "px";
    finishPos.style.top = finishPosT + deltaT + "px";

    console.log(finishPos);
}

// moves the entire grid (including gameplay and finihs_Pos_Calc) down and right by dx dy
function moveGridBack(dx, dy) {
    let gameplay = document.getElementById("gameplay")
    let gameplayL = parseInt(gameplay.style.left)
    let gameplayT = parseInt(gameplay.style.top)

    gameplay.style.left = gameplayL+parseInt(dx)+"px";
    gameplay.style.top = gameplayT+parseInt(dy)+"px";

    let finishPos = document.getElementById("finish_Pos_Calc")
    let finishPosL = parseInt(finishPos.style.left)
    let finishPosT = parseInt(finishPos.style.top)

    finishPos.style.left = finishPosL+parseInt(dx)+"px";
    finishPos.style.top = finishPosT+parseInt(dy)+"px";

}

// game is over, moves the entire grid such that the center of the gameplay is perfectly in the center of the screen
function centerGamePlay() {
    document.getElementById("gameplay").style.left = (screenWidth - (width * element_width))/2 + "px";
    document.getElementById("gameplay").style.top = (screenHeight - (height * element_width))/2 + "px";

    calcPlayerFinishPos()
    answerPointer();
}

