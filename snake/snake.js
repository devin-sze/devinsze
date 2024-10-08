/*document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    
    const height = 30
    const width = 40

    let squares = []
    let snakes = [] //index of squares
    let score = 0

    let apple = 0 //index of the apple
    let current_action = "right"

    let remainingSquares = (height-2) * (width-2)


    //create a playing board
    function createBoard() {
        for (let i=0; i < width*height; i++) {
            square = document.createElement('div')
            square.id = "board"
            // square.innerHTML = i
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        highlightBorder()
        makeSnake()
        placeApple()
        color()
    }
    createBoard()

    // place the Snake onto the board
    function makeSnake() {
        let startIndex = width * Math.floor((height/2)) + Math.floor((width/4))
        let snakeLength = 5

        for (let i = 0; i < snakeLength; i++) {
            snakes.push(startIndex + i)
            squares[snakes[i]].id = "snake"
        }
        squares[snakes[snakeLength - 1]].id = "snake head"
        remainingSquares -= snakeLength
    }

    // creates the apple
    function placeApple() {
        // checkForGameOver()
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].id == "board") {
            squares[randomNumber].id = "apple"
            apple = randomNumber
            remainingSquares -= 1
        } else {
            placeApple()
        }
    }

    // set the background color of the html 
    function color() {
        for (let i=0; i < width*height; i++) {
            let square = squares[i]

            if (square.id == "board") {
                square.style.backgroundColor = "#EEEEEE"
            } else if (square.id == "apple") {
                square.style.backgroundColor = "#FDB515"
            } else if (square.id == "snake") {
                square.style.backgroundColor = "#3B7EA1"
            } else if (square.id == "snake head") {
                square.style.backgroundColor = "#3B7EA1"
            } else if (square.id == "border") {
                square.style.backgroundColor = "#003262"
            }
        }
    }

    function highlightBorder() {
        for (let i = 0; i < width*height; i++) {
            if (isBorder(i)) {
                squares[i].id = "border"
            }
        }
    }

    function isBorder(i) {
        if (i < width) { //top row
            return true
        } else if (i % width == 0) { //left col
            return true
        } else if (i % width == width-1) { // right col
            return true
        } else if (i > (height-1) * width) { //bottom row
            return true
        }
        return false
    }

    

    let movement = setInterval(function() {
        if (current_action === "right") {
            moveRight()
        } else if (current_action === "left") {
            moveLeft()
        } else if (current_action === "up") {
            moveUp()
        } else if (current_action === "down") {
            moveDown()
        }
        color()

        checkForWin()
        checkForGameOver()
    }, 180); //change to 200?
    
    


    document.addEventListener("keyup", control)
    //assign keycodes
    function control(e) {       
        
        //current_action = e.keyCode

        let input = ""

        if (e.keyCode === 39 || e.keyCode === 68) {
            input = "right"
        } else if (e.keyCode === 37 || e.keyCode === 65) {
            input = "left"
        } else if (e.keyCode === 38 || e.keyCode === 87) {
            input = "up"
        } else if (e.keyCode === 40 || e.keyCode === 83) {
            input = "down"
        }

        if (input === "right" && current_action !== "left") {
            current_action = "right"
        } else if (input === "left" && current_action !== "right") {
            current_action = "left"
        } else if (input === "up" && current_action !== "down") {
            current_action = "up"
        } else if (input === "down" && current_action !== "up") {
            current_action = "down"
        }



        
        // console.log(current_action)
    }



    function moveRight() {
        removeOldHead()

        let oldHeadIndex = snakes[snakes.length - 1]
        let newHeadIndex = oldHeadIndex + 1
        snakes[snakes.length] = newHeadIndex
        updateID(newHeadIndex, "snake head")

        removeOldTail()
    }
    function moveLeft() {
        removeOldHead()

        let oldHeadIndex = snakes[snakes.length - 1]
        let newHeadIndex = oldHeadIndex - 1
        snakes[snakes.length] = newHeadIndex
        updateID(newHeadIndex, "snake head")

        removeOldTail()
    }
    function moveUp() {
        removeOldHead()

        let oldHeadIndex = snakes[snakes.length - 1]
        let newHeadIndex = oldHeadIndex - width
        snakes[snakes.length] = newHeadIndex
        updateID(newHeadIndex, "snake head")

        removeOldTail()
    }
    function moveDown() {
        removeOldHead()

        let oldHeadIndex = snakes[snakes.length - 1]
        let newHeadIndex = oldHeadIndex + width
        snakes[snakes.length] = newHeadIndex
        updateID(newHeadIndex, "snake head")

        removeOldTail()
    }
    
    
    function removeOldTail() {
        if (!atApple()) { //only remove tail if we are NOT at the apple
            let oldTailIndex = snakes[0]
            if (squares[oldTailIndex].id != "snake head") {
                updateID(oldTailIndex, "board")
            }
            snakes.shift() // remove old "tail" (0th element)
        } else if (spaceRemains()) {
            placeApple()
        }
        
    }
    function removeOldHead() {
        let oldHeadIndex = snakes[snakes.length - 1] //updates the new 
        updateID(oldHeadIndex, "snake")
    }

    // updates the ID of a the square at a specific index
    function updateID(index, ID) {
        squares[index].id = ID
    }

    // true if snake head at apple, false if snake head not at apple
    function atApple() {
        return parseInt(apple) === parseInt(snakes[snakes.length - 1])
    }

    function isFailure() {
        // crosses self
        snakeHead = snakes[snakes.length - 1]
        let selfCross = snakes.slice(0, snakes.length - 1).includes(snakeHead)

        let borderCross = isBorder(snakeHead)

        return selfCross || borderCross
    }

    function checkForGameOver() {
        if (isFailure()) {
            updateID(snakes[snakes.length - 1], "border")
            color()
            clearInterval(movement)
            console.log("Game Over")
            document.getElementById("start").innerHTML = "Play Again"
            document.getElementById("home").style.display = "block"
        }
    }

    function spaceRemains() {
        return snakes.length !== (height-2)*(width-2)
    }
    
    function checkForWin() {
        if (!spaceRemains()) {
            clearInterval(movement);
            console.log("You Won!")
        }
    }
})*/
function newGame() {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    
    const height = 30
    const width = 40

    let squares = []
    let snakes = [] //index of squares
    let score = 0

    let apple = 0 //index of the apple
    let current_action = "right"

    let remainingSquares = (height-2) * (width-2)

    document.getElementById("home").style.display = "none"
    document.getElementById("gridback").style.display = "block"
    document.getElementById("background_text").innerHTML = ""

    setTimeout(function() {
        deleteBoard()
        createBoard()
    }, 200);

    // deletes previous board
    function deleteBoard() {
        let x = document.getElementsByClassName("grid_div")
        let x_len = x.length
        for (let i = 0; i<x_len; i++) {
            x[0].remove()
        }
    }

    //create a playing board
    function createBoard() {
        
        
        for (let i=0; i < width*height; i++) {
            square = document.createElement('div')
            square.id = "board"
            square.className = "grid_div";
            // square.innerHTML = i
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        highlightBorder()
        makeSnake()
        placeApple()
        color()
    }
    

    // place the Snake onto the board
    function makeSnake() {
        let startIndex = width * Math.floor((height/2)) + Math.floor((width/4))
        let snakeLength = 5

        for (let i = 0; i < snakeLength; i++) {
            snakes.push(startIndex + i)
            squares[snakes[i]].id = "snake"
        }
        squares[snakes[snakeLength - 1]].id = "snake head"
        remainingSquares -= snakeLength
    }

    // creates the apple
    function placeApple() {
        // checkForGameOver()
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].id == "board") {
            squares[randomNumber].id = "apple"
            apple = randomNumber
            remainingSquares -= 1

            /*document.body.style.backgroundImage = "url('meme01.jpg')"
            setTimeout(function(){
                document.body.style.backgroundImage = "none"
            }, 1000)*/
        } else {
            placeApple()
        }
    }

    function updateScore() {
        document.getElementById("score").innerHTML = score;
    }

    // set the background color of the html 
    function color() {
        for (let i=0; i < width*height; i++) {
            let square = squares[i]

            if (square.id == "board") {
                square.style.backgroundColor = "#EEEEEE"
            } else if (square.id == "apple") {
                square.style.backgroundColor = "#FDB515"
            } else if (square.id == "snake") {
                square.style.backgroundColor = "#3B7EA1"
            } else if (square.id == "snake head") {
                square.style.backgroundColor = "#306a8a"
            } else if (square.id == "border") {
                square.style.backgroundColor = "none"
            } else if (square.id == "failure") {
                square.style.backgroundColor = "#46535E" //SET THIS TO EQUAL WHATEVER BACKGROUND COLOR IS EVENTUALLY CHOSEN
            }
        }
    }

    function highlightBorder() {
        for (let i = 0; i < width*height; i++) {
            if (isBorder(i)) {
                squares[i].id = "border"
            }
        }
    }

    function isBorder(i) {
        if (i < width) { //top row
            return true
        } else if (i % width == 0) { //left col
            return true
        } else if (i % width == width-1) { // right col
            return true
        } else if (i > (height-1) * width) { //bottom row
            return true
        }
        return false
    }

    

    let movement = setInterval(function() {
        
        addBackgroundText(randomWord())


        if (current_action === "right") {
            moveRight()
        } else if (current_action === "left") {
            moveLeft()
        } else if (current_action === "up") {
            moveUp()
        } else if (current_action === "down") {
            moveDown()
        }
        color()

        checkForWin()
        checkForGameOver()
    }, 200); //change to 200?
    
    


    document.addEventListener("keyup", control)
    //assign keycodes

    function control(e) {    
        
        //current_action = e.keyCode

        let input = ""

        if (e.keyCode === 39 || e.keyCode === 68) {
            input = "right"
            if (input === "right" && current_action !== "left") {
                current_action = "right"
            }
        } else if (e.keyCode === 37 || e.keyCode === 65) {
            input = "left"
            if (input === "left" && current_action !== "right") {
                current_action = "left"
            }
        } else if (e.keyCode === 38 || e.keyCode === 87) {
            input = "up"
            if (input === "up" && current_action !== "down") {
                current_action = "up"
            }
        } else if (e.keyCode === 40 || e.keyCode === 83) {
            input = "down"
            if (input === "down" && current_action !== "up") {
                current_action = "down"
            }
        }

        /*if (input === "right" && current_action !== "left") {
            current_action = "right"
        } else if (input === "left" && current_action !== "right") {
            current_action = "left"
        } else if (input === "up" && current_action !== "down") {
            current_action = "up"
        } else if (input === "down" && current_action !== "up") {
            current_action = "down"
        }*/



        
        // console.log(current_action)
    }

    function randomWord() {
        let randNum = Math.floor(Math.random() * 5)
        if (randNum < 1) {
            return "blep "
        } else if (randNum < 2) {
            return "hek "
        } else if (randNum < 3) {
            return "hisssss "
        } else if (randNum < 4) {
            return "rawr "
        } else {
            return "bleh "
        }

    }
    
    function addBackgroundText(text) {
        document.getElementById("background_text").innerHTML += text
    }



    function moveRight() {
        removeOldHead()

        let oldHeadIndex = snakes[snakes.length - 1]
        let newHeadIndex = oldHeadIndex + 1
        snakes[snakes.length] = newHeadIndex
        updateID(newHeadIndex, "snake head")

        removeOldTail()
    }
    function moveLeft() {
        removeOldHead()

        let oldHeadIndex = snakes[snakes.length - 1]
        let newHeadIndex = oldHeadIndex - 1
        snakes[snakes.length] = newHeadIndex
        updateID(newHeadIndex, "snake head")

        removeOldTail()
    }
    function moveUp() {
        removeOldHead()

        let oldHeadIndex = snakes[snakes.length - 1]
        let newHeadIndex = oldHeadIndex - width
        snakes[snakes.length] = newHeadIndex
        updateID(newHeadIndex, "snake head")

        removeOldTail()
    }
    function moveDown() {
        removeOldHead()

        let oldHeadIndex = snakes[snakes.length - 1]
        let newHeadIndex = oldHeadIndex + width
        snakes[snakes.length] = newHeadIndex
        updateID(newHeadIndex, "snake head")

        removeOldTail()
    }
    
    
    function removeOldTail() {
        if (!atApple()) { //only remove tail if we are NOT at the apple
            let oldTailIndex = snakes[0]
            if (squares[oldTailIndex].id != "snake head") {
                updateID(oldTailIndex, "board")
            }
            snakes.shift() // remove old "tail" (0th element)
        } else if (spaceRemains()) {
            placeApple()
            score += 10
            updateScore()
            addBackgroundText("CHOMP ")
        }
        
    }
    function removeOldHead() {
        let oldHeadIndex = snakes[snakes.length - 1] //updates the new 
        updateID(oldHeadIndex, "snake")
    }

    // updates the ID of a the square at a specific index
    function updateID(index, ID) {
        squares[index].id = ID
    }

    // true if snake head at apple, false if snake head not at apple
    function atApple() {
        return parseInt(apple) === parseInt(snakes[snakes.length - 1])
    }

    function isFailure() {
        // crosses self
        snakeHead = snakes[snakes.length - 1]
        let selfCross = snakes.slice(0, snakes.length - 1).includes(snakeHead)

        let borderCross = isBorder(snakeHead)

        return selfCross || borderCross
    }

    function checkForGameOver() {
        if (isFailure()) {
            addBackgroundText("BONK")
            updateID(snakes[snakes.length - 1], "failure")
            color()
            clearInterval(movement)
            console.log("Game Over")
            document.getElementById("start").innerHTML = "Play Again"
            document.getElementById("home").style.display = "block"            
        }
    }

    function spaceRemains() {
        return snakes.length !== (height-2)*(width-2)
    }
    
    function checkForWin() {
        if (!spaceRemains()) {
            addBackgroundText("FOOD COMAAAA")
            clearInterval(movement);
            console.log("You Won!")
        }
    }
}


function reload() {
    location.reload(true)
}

var keys = {};
window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }
    },
false);
window.addEventListener('keyup',
    function(e){
        keys[e.keyCode] = false;
    },
false);