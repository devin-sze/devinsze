
var start_color = "#008000";
var finish_color = "red";

var start_cursor_color = "#00800080";
var finish_cursor_color = "#ff000080";
var standard_cursor_color = "#63636380";

var grey_color = "grey";
var grey_light_color = "#cecece";
var blank_color = "white";

//var color1 = "#00ffe5";
//var color2 = "#ff6f00";
var color1 = "#DAA9B2";
var color2 = "#B9CEA1";


function updateColor(square, color, isPath=false) {
    if (!isPath) {
        square.style.borderRadius = "50%";
        square.style.backgroundColor = color;
    }
    square.style.transition = "all 0.15s";
    var colorTimer = setInterval(function() {
        square.style.borderRadius = "0%";
        if (isPath) {
            square.style.border = "solid 5px " + grey_light_color;
        }
        clearInterval(colorTimer);
        return;
    }, 150);
}

function removeBorder(square) {
    square.style.border = "solid 0px white";
}



function updateCursorColor(color) {
    document.getElementById("cursor").style.backgroundColor = color;
}


//https://www.google.com/search?q=hexadecimal+color+picker&rlz=1C1VDKB_enUS962US962&oq=hexadecimal&aqs=chrome.1.69i57j69i59j69i65.2015j0j1&sourceid=chrome&ie=UTF-8
function generateColor(colorStart,colorEnd,colorCount){
	var start = convertToRGB (colorStart);    
	var end   = convertToRGB (colorEnd);    
	var len = colorCount;
	var alpha = 0.0;
	var saida = [];
	for (i = 0; i < len; i++) {
		var c = [];
		alpha += (1.0/len);
		c[0] = start[0] * alpha + (1 - alpha) * end[0];
		c[1] = start[1] * alpha + (1 - alpha) * end[1];
		c[2] = start[2] * alpha + (1 - alpha) * end[2];
		saida.push(convertToHex (c));		
	}
	return saida;
}
function convertToHex (rgb) {
    return "#" + String(hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]));
}
/* Remove '#' in color hex string */
function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }
/* Convert a hex string to an RGB triplet */
function convertToRGB (hex) {
    var color = [];
    color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
    color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
    color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
    return color;
}
function hex (c) {
    var s = "0123456789abcdef";
    var i = parseInt (c);
    if (i == 0 || isNaN (c))
      return "00";
    i = Math.round (Math.min (Math.max (0, i), 255));
    return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
}