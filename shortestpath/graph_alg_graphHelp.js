
//get all neighbors that are valid boards
function getNeighbors(x) {
    var neighbors = [];
    var functions = [getNorth, getEast, getSouth, getWest];
    for (let i = 0; i < functions.length; i++) {
        let f = functions[i];
        if (f(x) != -1) {
            neighbors.push(f(x));
        }
    }
    return neighbors;
}

//returns the neighbors of x assuming it is a wall
function getNorth(x) {
    if (x < width || isWall(x - width)) {
        return -1;
    }
    return x - width;
}
function getSouth(x) {
    if (x >= width * (height-1) || isWall(x + width)) {
        return -1;
    }
    return x + width;
}
function getEast(x) {
    if ((x + 1) % width == 0 || isWall(x + 1)) {
        return -1;
    }
    return x + 1;
}
function getWest(x) {
    if (x % width == 0 || isWall(x - 1)) {
        return -1;
    }
    return x - 1;
}
//origin is top left
function getCord(x) {
    return [x % width, Math.floor(x/width)];
}
function isWall(x) {
    return squares[x].classList.contains("Wall");
}

function graphFail() {
    document.getElementById("failure").style.bottom = "0px";
    document.getElementById("failure").style.opacity = "1"; 
}
function hideFailure() {
    document.getElementById("failure").style.bottom = "-45px";
    document.getElementById("failure").style.opacity = "0";
}



function addToQueue(path, traversed, queue, queueSet, x, dist, prev) {
    if (x != -1 && !traversed.has(x) && !queueSet.has(x) && !squares[x].classList.contains("Wall")) {
        queueSet.add(x);
        queue.push([x, dist, prev]);
        path.addNext(x, prev);
    }
}

function setPath(pathList) {
    for (let i = 0; i < pathList.length; i++) {
        if (pathList[i] != -1) {
            updateColor(squares[pathList[i]], "white", true);
        }
    }
}

