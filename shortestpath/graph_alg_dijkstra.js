
var dijkstraCount = 0;


function dijkstra() {
    dijkstraCount = 0;
    softReset();
    dijkstraCaller(true, null);

    var dijkstraHelp = setInterval(function() {
        var colorss = generateColor(color1, color2, dijkstraCount);
        dijkstraCaller(false, colorss);
        clearInterval(dijkstraHelp);
    }, 500);
}

function dijkstraCaller(preRun, colors) {
    var dist = new PriorityQueue();
    var prev = new Map();
    var vertexSet = new Set();
    for (let i = 0; i < squares.length; i++) {
        if (!isWall(i)) {
            dist.enqueue(i, Infinity);
            prev.set(i, -1);
        }
    }
    dist.enqueue(startIndex, 0);    
    dijkstraHelper(vertexSet, dist, prev, preRun, colors, 0);
}


function dijkstraHelper(vertexSet, dist, prev, preRun, colors, i) {
    dijkstraCount += 1;
    if (dist.isEmpty()) {
        if (!preRun) {
            graphFail();
        }
        return; //"failure";
    }
    var u = dist.dequeue();
    var current = u.element;
    var priority = u.priority;

    if (priority == Infinity) {
        if (!preRun) {
            graphFail();
        }
        return; // "failure";
    } else if (!preRun) {
        updateColor(squares[current], colors[i]);
    }
    
    vertexSet.add(current);

    if (current == finishIndex) {
        if (!preRun) {
            draw_Path(prev, finishIndex);
        }
        return; // "failure";
    }

    var neighbors = getNeighbors(current);
    
    for (let neighbor of neighbors) {
        if (!vertexSet.has(neighbor)) {
            var alt = priority + 1;
            if (alt < dist.getPriority(neighbor)) {
                dist.enqueue(neighbor, alt);
                prev.set(neighbor, current);
            }
        }
    }

    if (preRun) {
        dijkstraHelper(vertexSet, dist, prev, preRun, colors, i+1);
    } else {
        var dijkstraTimer = setInterval(function() {
            dijkstraHelper(vertexSet, dist, prev, preRun, colors, i+1);
            clearInterval(dijkstraTimer);
        }, 3);
    }
}