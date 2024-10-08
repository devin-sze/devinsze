
var maxDist = 0;

function naive() {
    softReset();
    maxDist = 0;
    var path = new PathStore(startIndex);
    naiveCaller(path, startIndex, true, null);
    

    var naiveTimeHelp = setInterval(function() {
        var colors = generateColor(color1, color2, maxDist+3);
        naiveCaller(path, startIndex, false, colors);
        clearInterval(naiveTimeHelp);
        return;
    }, 500);
}


function naiveCaller(path, x, preRun, colors) {
    var traversed = new Set();
    var queueSet = new Set(); //only tracks the index, and not the number
    var queue = [];

    addToQueue(path, traversed, queue, queueSet, x, 0, -1);
    naiveHelper(path, traversed, queueSet, queue, colors, 0, preRun);
}

function naiveHelper(path, traversed, queueSet, queue, colors, currDist, preRun) {
    maxDist = Math.max(maxDist, currDist);
    var dist = currDist;
    var hasFinish = false;

    while (dist == currDist && queue.length > 0 && queue[0][1] == dist) {
        var ar = queue.shift();
        var i = ar[0];
        dist = ar[1];
        queueSet.delete(i);

        if (i == finishIndex) {
            hasFinish = true;
        }

        if (!preRun) {
            updateColor(squares[i], colors[dist]);
        }
        traversed.add(i);
        
        addToQueue(path, traversed, queue, queueSet, getNorth(i), dist+1, i);
        addToQueue(path, traversed, queue, queueSet, getEast(i), dist+1, i);
        addToQueue(path, traversed, queue, queueSet, getSouth(i), dist+1, i);
        addToQueue(path, traversed, queue, queueSet, getWest(i), dist+1, i);
    }


    if (hasFinish) {
        path.pathToStart(finishIndex);
        if (!preRun) {
            let pathList = path.pathToStart(finishIndex);
            setPath(pathList);
        }
        return;
    }


    if (preRun) {
        if (queue.length > 0) {
            Math.max(naiveHelper(path, traversed, queueSet, queue, colors, currDist+1, preRun), currDist);
        }
    } else {
        var naiveHelperTimer = setInterval(function() {
            if (queue.length > 0) {
                Math.max(naiveHelper(path, traversed, queueSet, queue, colors, currDist+1, preRun), currDist);
            } else {
                graphFail();
            }
            clearInterval(naiveHelperTimer);
        }, 25);
    }
}




