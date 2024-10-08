var screenHeight;
var screenWidth;

function windowResize() {
    getScreenDimensions();
    setGridDims();
}

function getScreenDimensions() {
    screenWidth = window.innerWidth - element_width;
    screenHeight = window.innerHeight - 100;
}

function setGridDims() {
    width = Math.floor(screenWidth / element_width);
    height = Math.floor(screenHeight / element_width);
    //console.log(width, height);

    document.getElementById("grid").style.width = String(width * element_width) + "px";
    document.getElementById("grid").style.height = String(height * element_width) + "px";
    document.getElementById("grid").style.left = String((screenWidth - element_width*width)/2 + element_width/2) + "px"; 

    document.getElementById("gridback").style.width = String(width * element_width) + "px";
    document.getElementById("gridback").style.height = String(height * element_width) + "px";
    document.getElementById("gridback").style.left = String((screenWidth - element_width*width)/2 + element_width/2) + "px"; 
}

