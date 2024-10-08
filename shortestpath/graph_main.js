
const element_width = 28;//28;   // size of each square (in px)
var height = 40;          // number of squares from top to bottom
var width = 60;           // number of squares from left to right

var squares = []            // list of all squares in gameplay
var gridDisplay            // query that contains all the squares in gameplay

window.addEventListener('resize', generateMain);

// generates the grid
function generateMain() {
    getScreenDimensions();
    setGridDims();
    createBoard();
    dropDown_Helper();

    //generateColor("000000", "#111f78", 5);

    var cursor = document.getElementById("cursor");
    document.body.addEventListener("mousemove", function(e) {
        cursor.style.left = e.clientX + "px",
        cursor.style.top = e.clientY + "px";
    });
}
