// LOGO STUFF

var DARK_MODE = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
// console.log(DARK_MODE)



// var light_transparent_color_0 ="#8080805f";
var is_hovering = false;
var containerHoverOn = false;


var unit = 17;




var light_color_grey_1 = "#808080"; //ham hover color
var light_color_grey_2 = "#b7b7b7"; //ham color

var logo_white = "#808080"; //hover accent color
var logo_color_3 = "#afafafc0"; //hover background color
var logo_color_1 = light_color_grey_2; //"#b7b7b7"; //original logo color
var transparent_color = "#ffffff00";

var light_transparent_color_0 = "#8080805f";
var light_transparent_color_6 = "#808080c4";
var light_shadow_hover = "3px 3px 3px " + light_transparent_color_0;
var light_shadow_active = "1.5px 1.5px 2px " + light_transparent_color_6;

var dark_transparent_color_0 = "#232323c4";
var dark_shadow_hover = "3px 3px 3px " + dark_transparent_color_0;



var shadow_hover = light_shadow_hover;

if (DARK_MODE) {
    logo_white = "white";
    light_color_grey_1 = "white";
    shadow_hover = dark_shadow_hover; //light_shadow_hover;
}


let _ids = ["d1", "s1", "s3"]
let _d = ["d1", "d3"]
let _s = ["s1", "s2", "s3"]







function logo_hover() {
    d3 = document.getElementById("d3");
    s2 = document.getElementById("s2");
    is_hovering = !is_hovering;
    if (is_hovering) {
        
        for (let i = 0; i < _ids.length; i++) {
            let _id = _ids[i]
            document.getElementById(_id).style.backgroundColor = logo_white;
        }
        document.getElementById("outer_container").style.borderColor = logo_white;

        d3.style.backgroundColor = logo_color_3;
        s2.style.backgroundColor = logo_color_3;
        document.getElementById("outer_container").style.borderColor = transparent_color;
        for (let i = 0; i < _d.length; i++) {
            document.getElementById(_d[i]).style.transform = "translateX(-"+unit/8+"px)"
        }
        for (let i = 0; i < _s.length; i++) {
            document.getElementById(_s[i]).style.transform = "translateX("+unit/8+"px)"
        }


    } else {
        for (let i = 0; i < _ids.length; i++) {
            let _id = _ids[i]
            document.getElementById(_id).style.backgroundColor = logo_color_1;
        }
        document.getElementById("outer_container").style.borderColor = logo_color_1;


        d3.style.backgroundColor = transparent_color;
        s2.style.backgroundColor = transparent_color;

        document.getElementById("outer_container").style.borderColor = logo_color_1;
        for (let i = 0; i < _d.length; i++) {
            document.getElementById(_d[i]).style.transform = "translateX(0px)"
        }
        for (let i = 0; i < _s.length; i++) {
            document.getElementById(_s[i]).style.transform = "translateX(0px)"
        }
    }
}


function arrowLeft(x) {
    x.children[0].style.transform = "skewX(-12deg)"
    x.children[1].style.transform = "translateX(6px) scale(0.9, 1)"
}
function arrowReset(x) {
    x.children[0].style.transform = "skewX(0deg)"
    x.children[1].style.transform = "translateX(0)"
}

var hamburger_height = 22;
var ham_size = 4.5;
var ham_gap = (hamburger_height - 3*ham_size)/2;
var ham1_btm = String(ham_size) + "px";
var ham2_top = String(ham_size + ham_gap) + "px";
var ham2_btm = String(2*ham_size + ham_gap) + "px";
var ham3_top = String(2*ham_size + 2*ham_gap) + "px";

var ham_size_hover = 5.2;
var ham_gap_hover = (hamburger_height - 3*ham_size_hover)/2;
var ham1_btm_hover = String(ham_size_hover) + "px";
var ham2_top_hover = String(ham_size_hover + ham_gap_hover) + "px";
var ham2_btm_hover = String(2*ham_size_hover + ham_gap_hover) + "px";
var ham3_top_hover = String(2*ham_size_hover + 2*ham_gap_hover) + "px";

var x_size = 3;
var x_top = String(x_size) + "px";
var x_btm = String(hamburger_height - x_size) + "px";

var x_size_hover = 4;
var x_top_hover = String(x_size_hover) + "px";
var x_btm_hover = String(hamburger_height - x_size_hover) + "px";


var displayed = "ham";

function manageHam() {
    if (displayed == "ham") {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        document.getElementById("ham1").style.clipPath = "polygon(0% "+x_top+", 0% 0%, "+x_top+" 0%, 100% "+x_btm+", 100% 100%, "+x_btm+" 100%)";
        document.getElementById("ham2").style.clipPath = "polygon(50% "+ham2_top+", 50% "+ham2_top+", 50% "+ham2_btm+", 50% "+ham2_btm+")";
        document.getElementById("ham3").style.clipPath = "polygon(0% "+x_btm+", "+x_btm+" 0%, 100% 0%, 100% "+x_top+", "+x_top+" 100%, 0% 100%)";

        document.getElementById("nav_container_small").style.top = "50px";
        document.getElementById("buffer").style.height = "200px";

        displayed = "x";
    } else {
        document.getElementById("ham1").style.clipPath = "polygon(0% "+ham1_btm+",0% 0%, "+ham1_btm+" 0%, 100% 0%, 100% "+ham1_btm+", 100% "+ham1_btm+")";
        document.getElementById("ham2").style.clipPath = "polygon(0% "+ham2_top+", 100% "+ham2_top+", 100% "+ham2_btm+", 0% "+ham2_btm+")";
        document.getElementById("ham3").style.clipPath = "polygon(0% "+ham3_top+", "+ham3_top+" "+ham3_top+", 100% "+ham3_top+", 100% 100%, "+ham1_btm+" 100%, 0% 100%)";
        
        document.getElementById("nav_container_small").style.top = "-150px";
        document.getElementById("buffer").style.height = "0px";


        displayed = "ham";
    }
}



function hoverHam(action) {
    if (displayed == "ham") {
        if (action == 'onmouseover') {
            document.getElementById("ham1").style.clipPath = "polygon(0% "+ham1_btm_hover+",0% 0%, "+ham1_btm_hover+" 0%, 100% 0%, 100% "+ham1_btm_hover+", 100% "+ham1_btm_hover+")";
            document.getElementById("ham2").style.clipPath = "polygon(0% "+ham2_top_hover+", 100% "+ham2_top_hover+", 100% "+ham2_btm_hover+", 0% "+ham2_btm_hover+")";
            document.getElementById("ham3").style.clipPath = "polygon(0% "+ham3_top_hover+", "+ham3_top_hover+" "+ham3_top_hover+", 100% "+ham3_top_hover+", 100% 100%, "+ham1_btm_hover+" 100%, 0% 100%)";
            
        } else {
            document.getElementById("ham1").style.clipPath = "polygon(0% "+ham1_btm+",0% 0%, "+ham1_btm+" 0%, 100% 0%, 100% "+ham1_btm+", 100% "+ham1_btm+")";
            document.getElementById("ham2").style.clipPath = "polygon(0% "+ham2_top+", 100% "+ham2_top+", 100% "+ham2_btm+", 0% "+ham2_btm+")";
            document.getElementById("ham3").style.clipPath = "polygon(0% "+ham3_top+", "+ham3_top+" "+ham3_top+", 100% "+ham3_top+", 100% 100%, "+ham1_btm+" 100%, 0% 100%)";
        }
    } else {
        if (action == 'onmouseover') {
            document.getElementById("ham1").style.clipPath = "polygon(0% "+x_top_hover+", 0% 0%, "+x_top_hover+" 0%, 100% "+x_btm_hover+", 100% 100%, "+x_btm_hover+" 100%)";
            document.getElementById("ham2").style.clipPath = "polygon(50% "+ham2_top_hover+", 50% "+ham2_top_hover+", 50% "+ham2_btm_hover+", 50% "+ham2_btm_hover+")";
            document.getElementById("ham3").style.clipPath = "polygon(0% "+x_btm_hover+", "+x_btm_hover+" 0%, 100% 0%, 100% "+x_top_hover+", "+x_top_hover+" 100%, 0% 100%)";
        } else {
            document.getElementById("ham1").style.clipPath = "polygon(0% "+x_top+", 0% 0%, "+x_top+" 0%, 100% "+x_btm+", 100% 100%, "+x_btm+" 100%)";
            document.getElementById("ham2").style.clipPath = "polygon(50% "+ham2_top+", 50% "+ham2_top+", 50% "+ham2_btm+", 50% "+ham2_btm+")";
            document.getElementById("ham3").style.clipPath = "polygon(0% "+x_btm+", "+x_btm+" 0%, 100% 0%, 100% "+x_top+", "+x_top+" 100%, 0% 100%)";
        }
    }

    if (action == "onmouseover") {
        document.getElementById("ham1").style.backgroundColor = light_color_grey_1;
        document.getElementById("ham2").style.backgroundColor = light_color_grey_1;
        document.getElementById("ham3").style.backgroundColor = light_color_grey_1;
    } else {
        document.getElementById("ham1").style.backgroundColor = light_color_grey_2;
        document.getElementById("ham2").style.backgroundColor = light_color_grey_2;
        document.getElementById("ham3").style.backgroundColor = light_color_grey_2;
    }

}


window.onresize = function(event) {
    if (screen.width >= 600 && displayed != "ham") {
        manageHam();
    }
};



// const email_address = "devin.sze@berkeley.edu";

// function askEmail() {
//     copyEmail()
//     // document.getElementById("mail_span").style.display = "block";
//     // document.getElementById("mail_arrow").style.display = "block";
// }
// function copyEmail() {
//     var copyText = document.getElementById("email_copy");
//     copyText.select();
//     copyText.setSelectionRange(0, 99999);
//     navigator.clipboard.writeText(copyText.value);

function copyEmail() {

    navigator.clipboard.writeText("devinsze11@gmail.com");
    document.getElementById("copy_alert").style.opacity=1;
    document.getElementById("copy_alert").style.bottom="10px";

    setTimeout(() => {
        // after delay, start moving the balls
        document.getElementById("copy_alert").style.opacity=0;
        document.getElementById("copy_alert").style.bottom="0px";
    }, 2500)
}





//     // navigator.clipboard.writeText("devin.sze@berkeley.edu");
//     document.getElementById("mail_span").innerHTML = "Copied: devin.sze@berkeley.edu";
//     // console.log(document.getElementById("mail_span"));
// }




function resetEmail() {
    document.getElementById("mail_span").style.display = "none";
    document.getElementById("mail_arrow").style.display = "none";
    // document.getElementById("mail_span").innerHTML = "Copy to Clipboard";
}

var mail_span = document.getElementById("mail_span");
window.onscroll = function() {
    if (mail_span.style.display != "none" && mail_span.getBoundingClientRect().bottom <= 0) {
        resetEmail(); //console.log("REACHED");
    }
}


function openNewTab(link) {
    window.open(link);
}


function closeImage() {
    document.getElementById("largeImage").style.display = "none";
    document.getElementById("image_container").style.display = "none";
}

function openImage(img) {
    document.getElementById("largeImage").style.backgroundImage = "url(" + img.src + ")";
    document.getElementById("largeImage").style.display = "block";
    document.getElementById("image_container").style.display = "flex";
    
    document.getElementById("largeImage").style.opacity = "1";
    document.getElementById("image_container").style.opacity = "1";
}



// function toTop
function scrollToTop() {
    window.scrollTo(0, 0);
}
function manage_to_top(action) {
    console.log(action);
    if (action == 'onmouseenter') {
        document.getElementById("to_top").style.transform = "translateY(-4px)";
        document.getElementById("to_top").style.boxShadow = shadow_hover;
    } else {
        document.getElementById("to_top").style.transform = "translateY(0px)";
        document.getElementById("to_top").style.boxShadow = "";
    }
}





/**
 * https://css-tricks.com/styling-based-on-scroll-position/
 */

// The debounce function receives our function as a parameter
const debounce = (fn) => {

    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame;
  
    // The debounce function returns a new function that can receive a variable number of arguments
    return (...params) => {
      
      // If the frame variable has been defined, clear it now, and queue for next frame
      if (frame) { 
        cancelAnimationFrame(frame);
      }
  
      // Queue our function call for the next frame
      frame = requestAnimationFrame(() => {
        
        // Call our function and pass any params we received
        fn(...params);
      });
  
    } 
  };
  
  
  // Reads out the scroll position and stores it in the data attribute
  // so we can use it in our stylesheets
  const storeScroll = () => {
    document.documentElement.dataset.scroll = window.scrollY;
  }
  
  // Listen for new scroll events, here we debounce our `storeScroll` function
  document.addEventListener('scroll', debounce(storeScroll), { passive: true });
  
  // Update scroll position for first time
  storeScroll();