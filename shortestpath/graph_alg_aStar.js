
//https://en.wikipedia.org/wiki/A*_search_algorithm

var aStarCommplte = false;
var aStarDist = 0;
var aStarDistMap;

function aStar() {
    softReset();
    aStarCaller(true, null);

    while (true) {
        if (aStarCommplte) {
            var colors = generateColor(color1, color2, aStarDist+3);
            aStarCaller(false, colors);
            return;
        }
    }
}


// will set up the data structures for aStar and call aStarHelper
function aStarCaller(preRun, colors) {
    var openSet = new PriorityQueue(); //set of all the indecies that
    openSet.enqueue(startIndex, aStarHeuristic(startIndex, finishIndex));

    var cameFrom = new Map(); //map from current index to index it came from

    var gScore = new Map(); //cost of cheapest path from start to n
    gScore.set(startIndex, 0);

    var fScore = new Map(); //cost of cheapest (estimated) path through n to finish
    fScore.set(startIndex, aStarHeuristic(startIndex, finishIndex));

    if (!openSet.isEmpty()) {
        return aStarHelper(openSet, cameFrom, gScore, fScore, preRun, colors);
    }
}

// contains the actual algorithm for aStar
function aStarHelper(openSet, cameFrom, gScore, fScore, preRun, colors) {

    var current = openSet.front().element;
    if (current == finishIndex) {
        distanceMap(cameFrom);
        if (!preRun) {
            draw_Path(cameFrom, finishIndex);
        }
        aStarCommplte = true;
        return "AT GOAL";
    }

    if (!preRun && !squares[current].classList.contains("Wall")) {
        updateColor(squares[current], colors[aStarDistMap.get(current)], "");
    }
    
    openSet.dequeue();

    var neighbors = getNeighbors(current);
    for (let i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        var tenative_gScore = gScore.get(current) + 1;

        if (!gScore.has(neighbor) || tenative_gScore < gScore.get(neighbor)) {
            cameFrom.set(neighbor, current)
            gScore.set(neighbor, tenative_gScore);
            fScore.set(neighbor, tenative_gScore + aStarHeuristic(neighbor, finishIndex));

            if (!openSet.contains(neighbor)) {
                openSet.enqueue(neighbor, fScore.get(neighbor));
            }
        }
    }

    if (!preRun && !openSet.isEmpty()) {
        var aStarTimer = setInterval(function() {
            let retVal = aStarHelper(openSet, cameFrom, gScore, fScore, preRun, colors);
            clearInterval(aStarTimer);
            return retVal;
        }, 5);
    } else if (preRun && !openSet.isEmpty()) {
        return aStarHelper(openSet, cameFrom, gScore, fScore, preRun, colors);
    } else {       
        distanceMap(cameFrom, true, current);
        graphFail();
        aStarCommplte = true;
        return "Failure";
    }
}


function aStarHeuristic(i, j) {
    let iCord = getCord(i);
    let jCord = getCord(j);
    return Math.sqrt(Math.pow(iCord[0] - jCord[0], 2) + Math.pow(iCord[1] - jCord[1], 2));
}






function draw_Path(cameFrom, dest) {
    var total_path = [];
    var keys = getKeysFromMap(cameFrom);

    total_path.push(dest);
    while (keys.has(dest)) {
        dest = cameFrom.get(dest);
        total_path.push(dest);
    }

    for (let i = 0; i < total_path.length; i++) {
        if (total_path[i] != -1) {
            updateColor(squares[total_path[i]], "purple", "-", true, false);
        }        
    }
    return;
}


function getKeysFromMap(thisMap) {
    var thisSet = new Set();
    for (let entry of thisMap.keys()) {
        thisSet.add(entry);
    }
    return thisSet;
}









function distanceMap(cameFrom, failure=false, endIndex) {
    var path = new PathStore(startIndex);
    for (let value of cameFrom) {
        let dest = value[1];
        let source = value[0];
        path.addNext(source, dest);
    }

    aStarDistMap = path.distToStart();
    if (!failure) {
        aStarDist = path.pathToStart(finishIndex).length;
    } else {
        aStarDist = path.pathToStart(endIndex).length;
    }
}






