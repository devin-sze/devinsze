
var maxDist = 0;


function naive2() {
    maxDist = 0;
    softReset();
    naive2Caller(true, null);
    
    var naive2TimeHelp = setInterval(function() {
        var colors = generateColor(color1, color2, maxDist+3);
        naive2Caller(false, colors);
        clearInterval(naive2TimeHelp);
        return;
    }, 500);
}

function naive2Caller(preRun, colors) {
    var path1 = new PathStore(startIndex);
    var path2 = new PathStore(finishIndex);
    var traversed = new Set();
    var queue1 = [];
    var queueSet1 = new Set(); //only tracks the index, and not the number
    addToQueue(path1, traversed, queue1, queueSet1, startIndex, 0, -1);

    var queue2 = [];
    var queueSet2 = new Set(); //only tracks the index, and not the number
    addToQueue(path2, traversed, queue2, queueSet2, finishIndex, 0, -1);

    naive2Helper(path1, path2, traversed, queue1, queueSet1, queue2, queueSet2, colors, preRun, true, 0);

}



function naive2Helper(path1, path2, traversed, queue1, queueSet1, queue2, queueSet2, colors, preRun, fromStart, currDist) {

    maxDist = Math.max(maxDist, currDist);

    if (fromStart) {
        var queue = queue1;
        var queueSet = queueSet1;
        var path = path1;
    } else {
        var queue = queue2;
        var queueSet = queueSet2;
        var path = path2;
    }

    var dist = currDist;
    var hasFinish = false;
    while (dist == currDist && queue.length > 0 && queue[0][1] == dist) {
        var ar = queue.shift();
        var i = ar[0];
        dist = ar[1];
        queueSet.delete(i);

        if (!preRun) {
            updateColor(squares[i], colors[dist]);
        }

        if (traversed.has(i)) {
            hasFinish = true;
            
            if (!preRun) {
                setPath(path1.pathToStart(i));
                setPath(path2.pathToStart(i));
            }
            return;
        }
        traversed.add(i);

        addToQueue(path, traversed, queue, queueSet, getNorth(i), dist+1, i);
        addToQueue(path, traversed, queue, queueSet, getEast(i), dist+1, i);
        addToQueue(path, traversed, queue, queueSet, getSouth(i), dist+1, i);
        addToQueue(path, traversed, queue, queueSet, getWest(i), dist+1, i);
    }
    if (queue.length == 0) {
        graphFail();
        return;
    }

    if (hasFinish) {
        return;
    }

    if (preRun) {
        if (fromStart) {
            naive2Helper(path1, path2, traversed, queue1, queueSet1, queue2, queueSet2, colors, preRun, !fromStart, currDist);
        } else {
            naive2Helper(path1, path2, traversed, queue1, queueSet1, queue2, queueSet2, colors, preRun, !fromStart, currDist+1);
        }
    } else {
        var naive2HelperTimer = setInterval(function() {
            if (fromStart) {
                naive2Helper(path1, path2, traversed, queue1, queueSet1, queue2, queueSet2, colors, preRun, !fromStart, currDist);
            } else {
                naive2Helper(path1, path2, traversed, queue1, queueSet1, queue2, queueSet2, colors, preRun, !fromStart, currDist+1);
            }
            clearInterval(naive2HelperTimer);
        }, 20);
    }
}
