
const height = 40;          // number of squares from top to bottom
const width = 60;           // number of squares from left to right
const element_width = 15;   // size of each square (in px)
const numAnchors = 9;       // number of anchors (used in world generation)
const anchorProximity = 10  // minimum proximity demanded between anchors
var heuristicMax = 110;     // maximum heuristic value required for the graph to be considered valid

var squares = []            // list of all squares in gameplay
var board = []              // list of indecies (of squares) that can be traversed (the Player can walk over)
var answer = []             // list of indecies (of squares) that show the path from start to finish
var messyAnchors = []       // list of TEMPORARY indecies (of squares) that are generated that satisfy the heuristicMax
var anchors = []            // ordered list of FINALIZED indecies (of squares) that are to be included within the answer list

var start = 0               // index of start square
var finish = 0              // index of finish square
var startClosest = 0;       // index of board closest to start
var finishClosest = 0;      // index of board closest to finish

var gridDisplay = document.querySelector('.grid')       // query that contains all the squares in gameplay




                            //used primarily in connectTwoPoints
var squarei = 0;            // temp var, index of starting point in anchor connection
var squarej = 0;            // temp var, index of ending point in anchor connection
var step = 0;               // temp var, number of squares required to connect squarei and squarej
var stopper = 0;            // temp var, number of attempts to connect squarei and squarej
var dx = 0;                 // temp var, dx between squarei and squarej
var dy = 0;                 // temp var, dy between squarei and squarej



//calls a new game
function newGame() {   
    gridDisplay = document.querySelector('.grid')
    generateMaster()
}

// generate the entire playing board from the start to finish
// calls the sequential functions necessary for the board generation
function generateMaster() {
    createBoard()
    highlightBorder()           //in maze_color.js

    generateSolution()
    randomHalls()

    placePlayer()
    near(startClosest, nearRadius)
    color()
}


// creates the grid of size width*height
// defaults all divs to have id "wall"
// defaults all divs to have classname "grid_div"
// pushes all divs to gridDisplay query
// pushes all divs to squares list
function createBoard() {
    for (let i=0; i < width*height; i++) {
        square = document.createElement('div')
        square.id = "wall"
        square.className = "grid_div";
        gridDisplay.appendChild(square)
        squares.push(square)
    }
}

// generates a single unique solution (start-anchor-finish)
// 
function generateSolution() {
    chooseStart()           // choose 1 border index to be start
    setStartClosest()       // sets startClosest to be interior index closest to start

    while (true) {
        let tf1 = anchorsMain()
        let tf2 = chooseFinish()

        board = board.concat(anchors)
        
        
        if (tf1 && tf2) { // if there are no errors in solution generation, end        
            return;
        } else { // else, reset the board
            console.log("reset")

            
            for (let i = 0; i < width*height; i++) {
                let thisID = getID(i)
                // if it's the "finish", replace it with the border
                if (thisID == "finish") {
                    updateID(i, "border")
                } else if (thisID !== "border" && thisID !== "start" && thisID !== "corner") { // else if it's non-border, replace with default wall
                    updateID(i, "wall")
                }
            }
            
            // reset the arrays
            messyAnchors = []
            anchors = []
            answer = []
            board = []
        }
    }
}



/* Anchor Generation and Solution Generation */



// randomly chooses a non-corner border to be the start point
// set *start* to be start index
function chooseStart() {
    var randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].id == "border") {
        squares[randomNumber].id = "start";
        start = randomNumber;
        return true;
    } else {
        chooseStart()
    }
}


// sets startClosest to be interior index closest to start
function setStartClosest() {
    if (start < width) { //top row
        startClosest = start + width
    } else if (start % width == 0) { //left col
        startClosest = start + 1
    } else if (start % width == width-1) { // right col
        startClosest = start - 1
    } else if (start > (height-1) * width) { //bottom row
        startClosest = start - width
    } else {
        console.log("ERROR")
    }
}
// sets finishClosest to be interior index closest to start
function setFinishClosest() {
    if (finish < width) { //top row
        finishClosest = finish + width
    } else if (finish % width == 0) { //left col
        finishClosest = finish + 1
    } else if (finish % width == width-1) { // right col
        finishClosest = finish - 1
    } else if (finish > (height-1) * width) { //bottom row
        finishClosest = finish - width
    } else {
        console.log("ERROR")
    }
}

// cycles through the anchor generation until the anchors are lower than the heuristicMax
function anchorsMain() {
    while (true) {
        chooseAnchors(numAnchors)
        orderAnchors()
        if (heuristic() < heuristicMax) {
            console.log(heuristic())
            return connectAnchorPoints()
        } else {
            deleteAnchors()
        }
    }
}

// recurisvely selects random anchor points where the maze solution must go through
// pushes them to messyAnchors
function chooseAnchors(num) {
    if (num == 0) {
        return;
    }
    let randomNumber = Math.floor(Math.random() * squares.length)
    if (restrictAnchors(randomNumber)) {
        squares[randomNumber].id = "anchor"
        messyAnchors.push(randomNumber);
        chooseAnchors(num - 1)
    } else {
        chooseAnchors(num)
    }
}

// determines if square at chosen index (i) is a valid anchor
// considers the id of the square
// considers the proximity of the potential anchor to the other anchor points
function restrictAnchors(i) {
    // ensure square is wall (interior)
    if (squares[i].id !== "wall") {
        return false
    }
    
    // ensure surroundings are walls/borders
    let tf1 = squares[i+1].id == "wall" || squares[i+1].id == "border"
    let tf2 = squares[i-1].id == "wall" || squares[i-1].id == "border"
    let tf3 = squares[i+width].id == "wall" || squares[i+width].id == "border"
    let tf4 = squares[i-width].id == "wall" || squares[i-width].id == "border"
    if (!(tf1 && tf2 && tf3 && tf4)) {
        return false
    }

    // ensure  distance between itself and other anchors are greater than anchorProximity
    for (let j = 0; j < messyAnchors.length; j++) {
        if (calculateDistance(messyAnchors[j], i) < anchorProximity) {
            return false
        }
    }

    return true
}

// orders messyAnchors list to try and minimize heuristic
// pushes result to anchors list (will need to reset later if heuristic is not met)
// creates a winding path, starting at the start index
// the next anchor is the one that is closest to the current anchor
function orderAnchors() {
    anchors = []
    let prevAnchor = start
    var usedIndex = []

    for (let i = 0; i < numAnchors; i++) {
        let startDist = []
        // calculate all anchor distances with regard to 
        for (let j = 0; j < numAnchors; j++) {
            startDist.push(calculateDistance(messyAnchors[j], prevAnchor))
        }
        // this value was already used, set to infinity to disregard
        for (let j = 0; j < usedIndex.length; j++) {
            startDist[usedIndex[j]] = Infinity
        }

        smallestIndex = startDist.indexOf(Math.min(...startDist))
        usedIndex.push(smallestIndex) //record that the index is already used

        prevAnchor = messyAnchors[smallestIndex]
        anchors.push(prevAnchor)
    }
}

// resets the anchor points and prepares for a new set to be generated
function deleteAnchors() {
    while (anchors.length > 0) {
        updateID(anchors.pop(), "wall")
    }
    messyAnchors = []
}

// calculates the sum of the distance between all anchor points based on the order of anchors
function heuristic() {
    let total = calculateDistance(startClosest, anchors[0])
    for (let i = 0; i < numAnchors - 1; i++) {
        total += calculateDistance(anchors[i], anchors[i+1])
    }
    return total
}

// connects 2 points (anchor-anchor), (start-anchor)
// return true if all points connected successfully
// returns false if 2 points were unconnected
function connectAnchorPoints() {
    if (!connectTwoPoints(startClosest, anchors[0])) {      //if unable to connect startIndex and 1st anchor, return false
        return false
    }
    
    for (let i = 0; i < numAnchors - 1; i++) {
        if (!connectTwoPoints(anchors[i], anchors[i+1])) {  //if unable to connect subsequent anchor points, return false
            return false
        }
    }
    return true
}

// takes 2 indecies and creates a randomized path between them
// makes 500 attempts to connect them. If unable to, returns false
function connectTwoPoints(i, j){
    squarei = i;
    squarej = j;
    updateID(squarei, "board")

    dx = xCord(squarej) - xCord(squarei) //neg-L || pos-R
    dy = yCord(squarej) - yCord(squarei) //neg-up || pos-down

    stopper = 0;

    var steps = Math.abs(dx) + Math.abs(dy)
    step = 0
    while (step !== steps) {
        let dir = Math.floor(Math.random()*2)
        if (stopper > 500) {
            console.log("failure")
            return false;
        }
        stopper++

        if (dir == 0) {
            if (dx < 0) { //left
                if (generateLeft(squarei)) {             
                    connectHelp("L", 1)
                } else if (dy == 0) {
                    // if dy != 0, this means that the dy will run eventually
                    if (generateRight(squarei)) {
                        connectHelp("R", -1)
                    } else {
                        dir = Math.floor(Math.random()*2)
                        if (dir == 0) {
                            if (generateUp(squarei)) {
                                connectHelp("U", -1)
                            } else if (generateDown(squarei)) {
                                connectHelp("D", -1)
                            }
                        } else {
                            if (generateDown(squarei)) {
                                connectHelp("D", -1)
                            } else if (generateUp(squarei)) {
                                connectHelp("U", -1)
                            }
                        }
                        stopper++
                    }
                }
            } else if (dx > 0) { //right
                if (generateRight(squarei)) {
                    connectHelp("R", 1)
                } else if (dy == 0) {
                    // if dy != 0, this means that the dy will run eventually
                    if (generateLeft(squarei)) {
                        connectHelp("L", -1)
                    } else {
                        dir = Math.floor(Math.random()*2)
                        if (dir == 0) {
                            if (generateUp(squarei)) {
                                connectHelp("U", -1)
                            } else if (generateDown(squarei)) {
                                connectHelp("D", -1)
                            }
                        } else {
                            if (generateDown(squarei)) {
                                connectHelp("D", -1)
                            } else if (generateUp(squarei)) {
                                connectHelp("U", -1)
                            }
                        }
                        stopper++
                    }
                }
            }
        } else {
            if (dy < 0) { //up
                if (generateUp(squarei)) {
                    connectHelp("U", +1)
                } else if (dx == 0) {
                    // if dx != 0, this means that the dx will run eventually
                    if (generateDown(squarei)) {
                        connectHelp("D", -1)
                    } else {
                        dir = Math.floor(Math.random()*2)
                        if (dir == 0) {
                            if (generateLeft(squarei)) {
                                connectHelp("L", -1)
                            } else if (generateRight(squarei)) {
                                connectHelp("R", -1)
                            }
                        } else {
                            if (generateRight(squarei)) {
                                connectHelp("R", -1)
                            } else if (generateLeft(squarei)) {
                                connectHelp("L", -1)
                            }
                        }
                        stopper++
                    }
                }
            } else if (dy > 0) { //down
                let t = generateDown(squarei)
                if (t) {
                    connectHelp("D", 1)
                } else if (dx == 0) {
                    // if dx != 0, this means that the dx will run eventually
                    if (generateUp(squarei)) {
                        connectHelp("U", -1)
                    } else {
                        dir = Math.floor(Math.random()*2)
                        if (dir == 0) {
                            if (generateLeft(squarei)) {
                                connectHelp("L", -1)
                            } else if (generateRight(squarei)) {
                                connectHelp("R", -1)
                            }
                        } else {
                            if (generateRight(squarei)) {
                                connectHelp("R", -1)
                            } else if (generateLeft(squarei)) {
                                connectHelp("L", -1)
                            }
                        }
                        stopper++
                    }
                }
            }
        }
    }
    return true
}

// updates the position in the direction the player moves (L, R, U, D)
// pushes the new index to answer and board
// xIncrement: left (+1), right (-1)
//             (+1) move left from curr
//             (-1) move right from curr
// yIncrement: up (+width), down (-width)
//             (+1) move up from curr
//             (-1) move down from curr
// stp: (+1), (-1)
//              (+1) we're going closer to squarej
//              (-1) we're going farther from squarej

function connectHelp(increment, stp) {    
    answer.push(squarei)
    board.push(squarei)

    if (increment == "L") {
        dx += 1
        squarei -= 1
    } else if (increment == "R") {
        dx -= 1
        squarei += 1
    } else if (increment == "U") {
        dy += 1
        squarei -= width
    } else if (increment == "D") {
        dy -= 1
        squarei += width
    }
    step += stp
}

// tries to generate a hall down
function generateDown(i) {
    let t0 = getID(i + width)
    let t1 = getID(i + width + 1)
    let t2 = getID(i + width - 1)
    let t3 = getID(i + (width * 2))

    let t0_c = t0 == "anchor" || t0 == "wall" 
    let t1_c = t1 == "anchor" || t1 == "wall" || t1 == "border"
    let t2_c = t2 == "anchor" || t2 == "wall" || t2 == "border"
    let t3_c = t3 == "anchor" || t3 == "wall" || t3 == "border"

    if (t0_c && t1_c && t2_c && t3_c) {
        updateID(i + width, "board")
        return true
    }
    return false
}
// tries to generate a hall up
function generateUp(i) {
    let t0 = getID(i - width)
    let t1 = getID(i - width + 1)
    let t2 = getID(i - width - 1)
    let t3 = getID(i - (width * 2))

    let t0_c = t0 == "anchor" || t0 == "wall" 
    let t1_c = t1 == "anchor" || t1 == "wall" || t1 == "border"
    let t2_c = t2 == "anchor" || t2 == "wall" || t2 == "border"
    let t3_c = t3 == "anchor" || t3 == "wall" || t3 == "border"

    if (t0_c && t1_c && t2_c && t3_c) {
        updateID(i - width, "board")
        return true
    }
    return false
}
// tries to generate a hall left
function generateLeft(i) {
    let t0 = getID(i - 1)
    let t1 = getID(i - 1 + width)
    let t2 = getID(i - 1 - width)
    let t3 = getID(i - 2)

    let t0_c = t0 == "anchor" || t0 == "wall" 
    let t1_c = t1 == "anchor" || t1 == "wall" || t1 == "border"
    let t2_c = t2 == "anchor" || t2 == "wall" || t2 == "border"
    let t3_c = t3 == "anchor" || t3 == "wall" || t3 == "border"
    
    if (t0_c && t1_c && t2_c && t3_c) {
        updateID(i - 1, "board")
        return true
    }
    return false
}
// tries to generate a hall right
function generateRight(i) {
    let t0 = getID(i + 1)
    let t1 = getID(i + 1 + width)
    let t2 = getID(i + 1 - width)
    let t3 = getID(i + 2)

    let t0_c = t0 == "anchor" || t0 == "wall" 
    let t1_c = t1 == "anchor" || t1 == "wall" || t1 == "border"
    let t2_c = t2 == "anchor" || t2 == "wall" || t2 == "border"
    let t3_c = t3 == "anchor" || t3 == "wall" || t3 == "border"

    if (t0_c && t1_c && t2_c && t3_c) {
        updateID(i + 1, "board")
        return true
    }
    return false
}

// chooses the finishing point that's the closest to the final anchor point
// chooses the point that is vertically or horizontally closest to the final anchor point
function chooseFinish() {
    let lastAnchor = anchors[numAnchors - 1]

    var op1 = xCord(lastAnchor) //top
    var op2 = yCord(lastAnchor)*width //left
    var op3 = width*height - (width - op1) //bottom
    var op4 = (yCord(lastAnchor)+1)*width - 1 //right
    op = [op1, op2, op3, op4]

    d1 = calculateDistance(lastAnchor, op1)
    d2 = calculateDistance(lastAnchor, op2)
    d3 = calculateDistance(lastAnchor, op3)
    d4 = calculateDistance(lastAnchor, op4)
    let d = [d1, d2, d3, d4]

    let closestFinishIndex = d.indexOf(Math.min(...d))
    finish = op[closestFinishIndex]

    updateID(finish, "finish")
    setFinishClosest()

    updateID(finish, "border")
    board.push(lastAnchor)
    let ret = connectTwoPoints(lastAnchor, finishClosest)
    
    updateID(finish, "finish")
    answer.push(finishClosest)
    board.push(finishClosest)
    return ret
}



/* Random Deadend Generation */



// generates all hallways
function randomHalls() {
    let iter = Math.floor(width*height/3);
    
    for (let j = 0; j < iter; j++) {
        let rand = Math.floor(Math.random() * board.length)
        oneRandomHalls(board[rand])
    }
}

// generats a singular hallway starting at index i
function oneRandomHalls(i) { 
    let iter = Math.floor(Math.sqrt(width*height))

    for (let j = 0; j < iter; j++) {
        let success = false

        let ranDir = Math.random() * 4
        if (ranDir < 1) {
            success = generateDown(i)
            if (success) {
                i = i+width;
                board.push(i)
            }
        } else if (ranDir < 2) {
            success = generateUp(i)
            if (success) {
                i = i - width;
                board.push(i)
            }
        } else if (ranDir < 3) {
            success = generateLeft(i)
            if (success) {
                i = i - 1;
                board.push(i)
            }
        } else {
            success = generateRight(i)
            if (success) {
                i = i + 1;
                board.push(i)
            }
        }
    }
}



/* Distance Helper Functions */



// caluclates the distance between 2 given indecies (num1, num2)
function calculateDistance(num1, num2) {      
    let dx = xCord(num1) - xCord(num2)
    let dy = yCord(num1) - yCord(num2)
    return Math.sqrt(dx**2 + dy**2)
}
// calculates the x-cordinate of an index (origin at top left)
function xCord(num) {
    return num % width;
}
// calculates the y-cordinate of an index (origin at top left)
function yCord(num) {
    return Math.floor(num/width);
}



/* Generic Helper Functions */



// updates the ID of a the square at a specific index
function updateID(index, ID) {
    try {
        squares[index].id = ID
    } catch(err) {
        console.log("update ID error")
    }
}
function updateHTML(index, text) {
    try {
        squares[index].innerHTML = text;
    } catch (err) {
        console.log("update HTML error")
    }
}
function getID(index) {
    try {
        return squares[index].id
    } catch(err) {
        return "border"
    }
}

