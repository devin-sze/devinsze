var autoPos = 0; //unnecessary
var speed = 1000;
var lose = false;

var timeRemaining; // Global Variable for time (in seconds) that remains
var timerTickInterval; //Global Variable to be cleared when game ends

// creates Interval that decrements remaining time by 1 second per second
// if interval runs out, set lose to 0 and end the game
function autoMove() {
    let timeRemaining = Math.ceil(answer.length * speed / 1000);

    timerTickInterval = setInterval(function() {
        if (timeRemaining <= 0) {
            document.getElementById("timer").innerHTML = "Time Remaining: 0:00";
            clearInterval(timerTickInterval);
            lose = true;
            winLose()
            return;
        }

        let minutes = Math.floor(timeRemaining/60)
        let seconds = Math.floor(timeRemaining % 60)

        if (seconds >= 10) {
            document.getElementById("timer").innerHTML = "Time Remaining: " + minutes + ":" + seconds;
        } else {
            document.getElementById("timer").innerHTML = "Time Remaining: " + minutes + ":0" + seconds;
        }

        timeRemaining -= 1;
    }, 1000)
}

