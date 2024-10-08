


// creates the grid of size width*height
// defaults all divs to have id "wall"
// defaults all divs to have classname "grid_div"
// pushes all divs to gridDisplay query
// pushes all divs to squares list
function createBoard() {
    gridDisplay = document.querySelector('.grid');
    
    for (let i = 0; i < squares.length; i++) {
        squares[i].remove();
    }
    squares = [];
    //console.log(width, height);

    for (let i=0; i < width*height; i++) {
        square = document.createElement('div');
        square.className = "grid_div";
        square.innerHTML = i;
        square.addEventListener("mousedown", mousedown);
        square.addEventListener("mouseout", mouseout);
        square.addEventListener("mouseup", mouseup);

        

        //square.addEventListener("mouseup", debug);
        gridDisplay.appendChild(square);
        squares.push(square);
    }
    //console.log(square);

    //document.getElementById("gridback").style.width = String(width * element_width) + "px";
    //document.getElementById("gridback").style.height = String(height * element_width) + "px";


}