
function setAlgorithm(currClass) {

    if (startIndex == -1 || finishIndex == -1) {
        return;
    }
    


    var algs = document.getElementById("algorithm_container").children;

    for (let i = 0; i < algs.length; i++) {
        alg = algs[i];
        alg.classList.remove("selectAlgorithm");
    }
    document.getElementById(currClass).classList.add("selectAlgorithm");

    if (dropped) {
        controlDropdown();
    }
    
    if (currClass == "alg_naive") {
        naive();
    } else if (currClass == "alg_aStar") {
        aStar();
    } else if (currClass == "alg_dijkstra") {
        dijkstra();
    } else if (currClass == "alg_naive2") {
        naive2();
    }
}



function setStartGrid(square) {
    removeGridClass(square);
    updateColor(square, start_color);
    removeBorder(square);
    square.classList.add("Start");
}
function setFinishGrid(square) {
    removeGridClass(square);
    updateColor(square, finish_color);
    removeBorder(square);
    square.classList.add("Finish");
}
function setWallGrid(square) {
    removeGridClass(square);
    updateColor(square, grey_color);
    removeBorder(square);
    square.classList.add("Wall");
}

function removeGrid(square) {
    removeGridClass(square);
    updateColor(square, blank_color);
    removeBorder(square);
}






function removeGridClass(square) {
    var gridClass = ["Start", "Finish", "Wall"];
    for (let thisClass of gridClass) {
        if (square.classList.contains(thisClass)) {
            square.classList.remove(thisClass);
        }
    }
}