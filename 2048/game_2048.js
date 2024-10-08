document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score = 0


    //create a playing board
    function createBoard() {
        for (let i=0; i < width*width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
        color()
    }
    createBoard()

    //genreate a number randomly
    function generate() {
        checkForGameOver()
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            let randValue = Math.random()

            if (randValue > 0.66) {
                squares[randomNumber].innerHTML = 4
            } else {
                squares[randomNumber].innerHTML = 2
            }
        } else {
            generate()
        }
    }

    // set the background color of the html 
    function color() {
        for (let i=0; i < width*width; i++) {
            let num = parseInt(squares[i].innerHTML)

            

            if (num == 0) {
                squares[i].style.backgroundColor = "#cdc1b4"
            } else if (num == 2) {
                squares[i].style.backgroundColor = "#eee4da"
            } else if (num == 4) {
                squares[i].style.backgroundColor = "#eee1c9"
            } else if (num == 8) {
                squares[i].style.backgroundColor = "#f3b27a"
            } else if (num == 16) {
                squares[i].style.backgroundColor = "#f69764"
            } else if (num == 32) {
                squares[i].style.backgroundColor = "#f77b5f"
            } else if (num == 64) {
                squares[i].style.backgroundColor = "#f75d3b"
            } else if (num == 128) {
                squares[i].style.backgroundColor = "#edce73"
            } else if (num == 256) {
                squares[i].style.backgroundColor = "#edcb64"
            } else if (num == 512) {
                squares[i].style.backgroundColor = "#edc651"
            } else if (num == 1024) {
                squares[i].style.backgroundColor = "#eec644"
            } else if (num == 2048) {
                squares[i].style.backgroundColor = "#ecc330"
            }


            if (num == 0) {
                squares[i].style.color = "#cdc1b4"
            } else if (num <= 4) {
                squares[i].style.color = "#6b6661"
            } else {
                squares[i].style.color = "white"
            }
        }
    }
    
    function arrayMatch(a1, a2) {
        if (a1.length !== a2.length) {
            return 0
        } else {
            for (let i = 0; i < a1.length; i++) {
                if (a1[i] !== a2[i]) {
                    return 0
                }
            }
            return 1
        }
    }

    
    //swipe right
    function moveRight() {
        let numOldRows = 0
        for (let i=0; i < width*width; i+=4) {
            let totalOne = squares[i].innerHTML //extracts HTML value
            let totalTwo = squares[i+1].innerHTML
            let totalThree = squares[i+2].innerHTML
            let totalFour = squares[i+3].innerHTML

            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)] //makes the values into ints
            let filteredRow = row.filter(num => num) //array of nonzero values
            let missing = width - filteredRow.length //length of zero-ed values
            let zeros = Array(missing).fill(0) //array of zero-values
            let newRow = zeros.concat(filteredRow) //zero(s) on left, value(s) on right

            squares[i].innerHTML = newRow[0] //sets new values
            squares[i+1].innerHTML = newRow[1]
            squares[i+2].innerHTML = newRow[2]
            squares[i+3].innerHTML = newRow[3]

            numOldRows += arrayMatch(row, newRow)
        }

        return numOldRows !== width //if false: moveRight did nothing. if true, moveRight moved at least 1 thing
    }

    //swipe left
    function moveLeft() {
        let numOldRows = 0
        for (let i=0; i < width*width; i+=4) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+1].innerHTML
            let totalThree = squares[i+2].innerHTML
            let totalFour = squares[i+3].innerHTML

            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            let filteredRow = row.filter(num => num)
            let missing = width - filteredRow.length
            let zeros = Array(missing).fill(0)
            let newRow = filteredRow.concat(zeros)

            squares[i].innerHTML = newRow[0]
            squares[i+1].innerHTML = newRow[1]
            squares[i+2].innerHTML = newRow[2]
            squares[i+3].innerHTML = newRow[3]

            numOldRows += arrayMatch(row, newRow)
        }

        return numOldRows !== width //if false: moveLeft did nothing. if true, moveLeft moved at least 1 thing
    }

    //swipe down
    function moveDown() {
        let numOldColumns = 0
        for (let i=0; i<width; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (2*width)].innerHTML
            let totalFour = squares[i + (3*width)].innerHTML

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            let filteredColumn = column.filter(num => num)
            let missing = width - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+(width*2)].innerHTML = newColumn[2]
            squares[i+(width*3)].innerHTML = newColumn[3]

            numOldColumns += arrayMatch(column, newColumn)
        }
        return numOldColumns !== width //if false: moveDown did nothing. if true, moveDown moved at least 1 thing
    }

    //swipe up
    function moveUp() {
        let numOldColumns = 0
        for (let i=0; i<width; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (2*width)].innerHTML
            let totalFour = squares[i + (3*width)].innerHTML

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            let filteredColumn = column.filter(num => num)
            let missing = width - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]

            numOldColumns += arrayMatch(column, newColumn)
        }
        return numOldColumns !== width //if false: moveUp did nothing. if true, moveUp moved at least 1 thing
    }




    //combine Rows
    function combineRow() {
        let numCombine = 0
        for (let i=0; i<width*width-1; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML && parseInt(squares[i].innerHTML) !== 0) {
                let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combineTotal
                squares[i+1].innerHTML = 0

                score += combineTotal
                scoreDisplay.innerHTML = score
                numCombine += 1
            }
        }
        checkForWin()
        return numCombine
    }

    //combine Columns
    function combineColumn() {
        let numCombine = 0
        for (let i=0; i<width*(width-1); i++) {
            if (squares[i].innerHTML === squares[i+width].innerHTML && parseInt(squares[i].innerHTML) !== 0) {
                let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combineTotal
                squares[i+width].innerHTML = 0

                score += combineTotal
                scoreDisplay.innerHTML = score
                numCombine += 1
            }
        }
        checkForWin()
        return numCombine
    }

    //assign keycodes
    function control(e) {
        if (e.keyCode === 39 || e.keyCode === 68) {
            keyRight()
        } else if (e.keyCode === 37 || e.keyCode === 65) {
            keyLeft()
        } else if (e.keyCode === 38 || e.keyCode === 87) {
            keyUp()
        } else if (e.keyCode === 40 || e.keyCode === 83) {
            keyDown()
        }
        color()
    }

    document.addEventListener("keyup", control)

    function keyRight() {
        let mv = moveRight()
        let cm = combineRow()
        moveRight()
        if (mv || cm) { //if moveRight & combineRow did nothing -> this was a useless move, don't register it
            generate()
        } else if (!movePossible()) {
            checkForGameOver()
        }
    }

    function keyLeft() {
        let mv = moveLeft()
        let cm = combineRow()
        moveLeft()
        if (mv || cm) {
            generate()
        } else if (!movePossible()) {
            checkForGameOver()
        }
    }

    function keyDown() {
        let mv = moveDown()
        let cm = combineColumn()
        moveDown()
        if (mv || cm) {
            generate()
        } else if (!movePossible()) {
            checkForGameOver()
        }
    }

    function keyUp() {
        let mv = moveUp()
        let cm = combineColumn()
        moveUp()
        if (mv || cm) {
            generate()
        } else if (!movePossible()) {
            checkForGameOver()
        }
    }

    function movePossible() {
        for (let i=0; i<width*width-1; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML) {
                return true
            }
        }
        for (let i=0; i<width*(width-1); i++) {
            if (squares[i].innerHTML === squares[i+width].innerHTML) {
                return true
            }
        }
        return false
    }




    //check for the number 2048 in squares to win
    function checkForWin() {
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You Win!"
                document.removeEventListener("keyup", control)
            }
        }
    }

    // chedk if there are no 0s on board
    function checkForGameOver() {
        let zeros = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++
            }
        }
        if (zeros == 0){
            resultDisplay.innerHTML = "You Lose!"
            document.removeEventListener("keyup", control)
        }
    }
    




})

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