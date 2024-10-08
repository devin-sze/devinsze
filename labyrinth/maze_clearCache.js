
// resets all parameters to default values if a new game is called
function clearCache() {
    resetBoard()
    
    //answer
    askShowAnswer_pressed = false;

    //autoMove
    autoPos = 0;
    speed = 1000;
    lose = false;
    autoMoveIndex = 0;

    //legend
    showLegendTF = false;

    //playerMove
    visible = []

    //worldGen
    squares = []
    messyAnchors = []
    anchors = []
    answer = []
    board = []
    
    start = 0
    finish = 0
    startClosest = 0;
    finishClosest = 0;
    
    heuristicMax = 110;
    //anchorProximity = 10 //5; //was 10
    
    stopper = 0;
    step = 0;
    dx = 0;
    dy = 0;
    squarei = 0;
    squarej = 0;

    document.addEventListener("keyup", control)

    colorDict["answer"] = "#011638";
    enableOnClicks()


}

// clears the board after a new game is called
function resetBoard() {
    let grid_div = document.getElementsByClassName("grid_div")
    let grid_div_len = grid_div.length;
    for (let i = 0; i < grid_div_len; i++) {
        grid_div[0].remove()
    }
}

// enables the showLegend and showAnswer buttons
function enableOnClicks() {
    document.getElementById("showLegend").onclick = showLegend;
    document.getElementById("showAnswer").onclick = askShowAnswer;
}

// disable the showLegend and showAnswer buttons
function disableOnClicks() {
    document.getElementById("showLegend").onclick = null;
    document.getElementById("showAnswer").onclick = null;
}
