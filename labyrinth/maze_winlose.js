
// determines if it's a win or a lose or none
// if it is a win or lose, then the game ends
function winLose() {
    if (isWin()) {
        endGame("Yah, you beat the computer!!")
    } else if (isLose()) {
        endGame("The Computer Beat You :(") 
    } else {
        return false
    }
}

// determines if the game is a win or a loss
function isWin() {
    return playerPos == finish;
}
// determines if the game is a win or a loss
function isLose() {
    return lose;
}

// calls all the functions when the game has ended
function endGame(endGameText) {
    lockMovement()
    clearInterval(timerTickInterval);
    helper_hideLegend()
    helper_hideShowAnswer()
    //showAnswer()
    disableOnClicks()
    document.getElementById("win_lose_indicator").style.display = "block";
    document.getElementById("win_lose_indicator").innerHTML = endGameText;
    centerGamePlay()
    showAnswer(false)
    askStartOver()
}

// prevents all movement
// removes the event listener, so keypresses have no effect
// hides the HUD-control
function lockMovement() {
    document.removeEventListener("keydown", control) //prevent WASD movement
    document.getElementById("control").style.display = "none"; //hide controller movement
    //autoMoveIndex = Infinity //prevent the automover from moving
}

// presents the opportunity to start the game over after a 800ms delay
function askStartOver() {
    let askStartOver = setInterval(function() {
        
        document.getElementById("start_game").innerHTML = "Try Again?";
        document.getElementById("start_game").style.display = "block";
        clearInterval(askStartOver)
    }, 800)
}

