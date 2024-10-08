
var firstGame = true;           

const speedDict = {
    "easy": 4000,
    "medium": 1000,
    "hard": 400,
    "impossible": 200
};

// the function the runs when a new game starts
function onLoad(diff) {
    
    // remove start menu
    document.getElementById("start_game").style.display = "none";
    document.getElementById("choose_difficulty").style.display = "none";
    document.getElementById("difficulty_wrapper").style.display = 'none';
    document.getElementById("description").style.display = 'none';
    document.getElementById("win_lose_indicator").style.display = 'none';
    document.getElementById("finish_pointer").style.opacity = 0;

    if (firstGame) {
        firstGame = false;
    } else {
        clearCache();
    }

    document.getElementById("timer").style.display = 'block';
    document.getElementById("control").style.display = "flex";
    document.getElementById("showAnswer").style.display = 'block';
    document.getElementById("showLegend").style.display = 'block';

    speed = speedDict[diff];
    nearRadius = nearRadiusDict[diff];

    if (diff == "easy") {
        colorDict["board"] = "#E8E9ED";
        colorDict["possible_edge"] = "#E8E9ED";
    } else {
        colorDict["board"] = "#011638";
        colorDict["possible_edge"] = "#758093";
    }
    
    newGame()
    addCornerClass()
    screenSize()
    
    autoMove()
    answerPointer()
    pulseFinish()
}

// shows the difficulty when New Game/Try Again is selected
function showDifficulty() {
    let diff = setInterval(function() {
        document.getElementById("choose_difficulty").style.display = "block";
        document.getElementById("difficulty_wrapper").style.display = "flex";
        clearInterval(diff)
    }, 150)
}
