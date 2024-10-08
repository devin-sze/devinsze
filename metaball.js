
const INF = Number.POSITIVE_INFINITY;


var container_x_bound_left = parseFloat(document.getElementById("ball_container").getBoundingClientRect().left); //window.innerWidth;window.innerWidth; //1050;
var container_x_bound_right = parseFloat(document.getElementById("ball_container").getBoundingClientRect().right);
var container_x_bound_top = parseFloat(document.getElementById("ball_container").getBoundingClientRect().top); //window.innerWidth;window.innerWidth; //1050;
var container_y_bound_bottom = parseFloat(document.getElementById("ball_container").getBoundingClientRect().bottom); //window.innerHeight;

var container_x_bound = container_x_bound_right - container_x_bound_left;
var container_y_bound = container_y_bound_bottom - container_x_bound_top;

var padding = 25;

var x_bound_l = padding;
var x_bound_r = container_x_bound - padding;
var y_bound_t = padding;
var y_bound_b = container_y_bound - padding;

var created = false;
var shown = true; // if the text is shown
var moving = false;
var play_pause_on = false; // if mouse is on the play/pause button

var ball_widths = [65, 70, 96, 100, 108, 117, 147, 200, 250]
var ball_dx = [18, 16, -37/2, 30/2, -55/2, 46/2, 60/2, -30/2, 5/2, -8/2]
var ball_dy = [-2, 12, 10/2, -40/2, -20/2, 25/2, -13/2, 24/2, 15/2, -3/2]
// var ball_left = [-1000, -1000, -1000, -1000, -1000, -1000, -1000, -1000]
// var ball_top = [-1000, -1000, -1000, -1000, -1000, -1000, -1000, -1000]



var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);



// display variables
var gridDisplay = document.getElementById("ball_container");

var DARK_MODE = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
var light_transparent_color_3 = "#afafafc0"; //808080";
var light_color_grey_1 = "#808080";
var light_color_line = "#dddddd";

var hover_color = light_color_grey_1;
var original_color = light_transparent_color_3;
if (DARK_MODE) {
    hover_color = light_color_line;
    original_color = light_transparent_color_3;
}





window.addEventListener('resize', function(event) {
    // container_x_bound = parseFloat(document.getElementById("ball_container").getBoundingClientRect().right); //window.innerWidth;
    // container_y_bound = parseFloat(document.getElementById("ball_container").getBoundingClientRect().bottom); //window.innerHeight;
    // x_bound_r = container_x_bound; // - padding;
    // y_bound_b = container_y_bound; // - padding;


    container_x_bound_left = parseFloat(document.getElementById("ball_container").getBoundingClientRect().left); //window.innerWidth;window.innerWidth; //1050;
    container_x_bound_right = parseFloat(document.getElementById("ball_container").getBoundingClientRect().right);
    container_x_bound_top = parseFloat(document.getElementById("ball_container").getBoundingClientRect().top); //window.innerWidth;window.innerWidth; //1050;
    container_y_bound_bottom = parseFloat(document.getElementById("ball_container").getBoundingClientRect().bottom); //window.innerHeight;
    
    container_x_bound = container_x_bound_right - container_x_bound_left;
    container_y_bound = container_y_bound_bottom - container_x_bound_top;
    
    
    x_bound_r = container_x_bound - padding;
    y_bound_b = container_y_bound - padding;


}, true);




function create_balls() {
    if (created) {
        return;
    }

    for (let i=0; i < ball_widths.length; i++) {
        ball = document.createElement('div')
        ball.id = "b" + String(i);
        ball.className = "balls";

        ball.style.width = ball_widths[i] + "px";
        ball.style.height = ball_widths[i] + "px";
        ball.style.left = "calc(50% - " + ball_widths[i]/2 + "px"; //ball_left[i] + "px";
        ball.style.top = "calc(50% - " + ball_widths[i]/2 + "px"; //ball_top[i] + "px";

        gridDisplay.appendChild(ball);

        // jitter dx dy
        ball_dx[i] = Math.round((ball_dx[i]*0.95 - ball_dx[i]/10 * Math.random()) * 10) / 10;
        ball_dy[i] = Math.round((ball_dy[i]*0.95 - ball_dy[i]/10 * Math.random()) * 10) / 10;
    }
    created = true;
    // return;
    if (!isSafari) {
        setTimeout(() => {
            // after delay, start moving the balls
            start_stop_balls();
        }, 2500)
    }
}

// var xx =285






function start_stop_balls() {
    if (moving) {
        // if currently moving, stop movement
        moving = !moving;
        document.getElementById("play_pause").title = "play simulation";
        document.getElementById("pp1").style.clipPath = "polygon(0% 0%, 100% 25%, 100% 75%, 0% 100%)";
        document.getElementById("pp2").style.clipPath = "polygon(0% 25%, 100% 50%, 100% 50%, 0% 75%)";
    } else {
        // if not currently moving, start movement
        moving = !moving;
        document.getElementById("play_pause").title = "pause simulation";
        document.getElementById("pp1").style.clipPath = "polygon(0% 10%, 50% 10%, 50% 90%, 0% 90%)";
        document.getElementById("pp2").style.clipPath = "polygon(50% 10%, 100% 10%, 100% 90%, 50% 90%)";
        continuous_balls();
    }
}


// https://stackoverflow.com/questions/5226285/settimeout-in-for-loop-does-not-print-consecutive-values

// continouosly move the balls (unless `moving` global variable is set to false) 
function continuous_balls() {
    var iters = INF;
    var delay = 400;

    (function myLoop(i) {
        setTimeout(function() {
            if (!moving) return;
            move_balls();
            if (--i) myLoop(i);
        }, delay)
    })(iters);
}

function move_balls() {
    // move the balls
    for (i=0; i<ball_widths.length; i++) {
        move_ball(i);
    }
}


function move_ball(i) {
    // move one ball
    var b_id = "b" + String(i)

    // get bounds
    var container_bounds = document.getElementById("ball_container").getBoundingClientRect();
    var ball = document.getElementById(b_id);
    var ball_bound = ball.getBoundingClientRect();

    // calculate bounds    
    var container_l = parseFloat(container_bounds.left);
    var container_t = parseFloat(container_bounds.top);

    // calculate current and next ball positions
    // these are all relative, padding included in positions
    var curr_l = parseFloat(ball_bound.left) - container_l;
    var next_l = curr_l + ball_dx[i];
    
    var curr_r = parseFloat(ball_bound.right) - container_l;
    var next_r = curr_r + ball_dx[i];

    var curr_t = parseFloat(ball_bound.top) - container_t;
    var next_t = curr_t + ball_dy[i];

    var curr_b = parseFloat(ball_bound.bottom) - container_t;
    var next_b = curr_b + ball_dy[i];

    // calculate LEFT position
    if (x_bound_r <= next_r) {
        ball.style.left = x_bound_r - ball_widths[i] + "px";
        ball_dx[i] = -1 * ball_dx[i];
    } else if (next_l <= x_bound_l) {
        ball.style.left = x_bound_l + "px";
        ball_dx[i] = -1 * ball_dx[i];
    } else {
        ball.style.left = next_l + "px"
    }

    // calculate TOP position
    if (y_bound_b <= next_b) {
        ball.style.top = y_bound_b - ball_widths[i] + "px";
        ball_dy[i] = -1 * ball_dy[i];
    } else if (next_t <= y_bound_t) {
        ball.style.top = y_bound_t + "px";
        ball_dy[i] = -1 * ball_dy[i];
    } else {
        ball.style.top = next_t + "px"
    }
}




function play_pause_mouse() {
    // console.log("!!!");
    if (play_pause_on) {
        document.getElementById("pp1").style.backgroundColor = original_color; 
        document.getElementById("pp2").style.backgroundColor = original_color;
    } else {
        document.getElementById("pp1").style.backgroundColor = hover_color;
        document.getElementById("pp2").style.backgroundColor = hover_color;
    }
    play_pause_on = !play_pause_on;
}





if (isSafari) {
    window.onload = function() {       
        setTimeout(function(){
            start_stop_balls();
        },5000); 
    }
}


