
// Global Variables
var askShowAnswer_pressed=false; // is the "Give Up" button pressed


// the "Give Up" button
// hides/shows Conformation div
// changes innerHTML of showAnswer
function askShowAnswer() {
    if (askShowAnswer_pressed) {
        // this means that this is now just an X
        // therefore, make confirmShowAnswer dissapear
        // return the showAnswer div to "Give Up"

        helper_hideShowAnswer()
        askShowAnswer_pressed = false;
    } else {
        let control_width = 180;
        let confirm = document.getElementById("confirmShowAnswer");     

        //displays the Confirmation div        
        confirm.style.width = "150px";
        confirm.style.paddingLeft = control_width/6 + "px";
        
        //displays the Confirmation div text (after 150ms)
        confirm_text_delay = setInterval(function() {
            console.log("AHHHHHH")
            confirm.innerHTML = "Confirm?";
            clearInterval(confirm_text_delay)
        }, 150)
        
        // change showAnswer to a X
        document.getElementById("showAnswer").innerHTML = "X"
        askShowAnswer_pressed=true;
    }
}
// hides Confirmation div
function helper_hideShowAnswer() {
    let confirm = document.getElementById("confirmShowAnswer");
    confirm.innerHTML = "";
    confirm.style.paddingLeft = "0px";
    confirm.style.width = "0px";
    document.getElementById("showAnswer").innerHTML = "Give Up"
}

//shows the answer, sets lose to be true, and then ends the game
function showAnswer(callWinLose = true) {
    helper_hideShowAnswer()
    colorDict["answer"] = "orange";
    lose = true;
    screenSize()
    let i = 0;
    let movement = setInterval(function() {
        if (i<answer.length) {
            squares[answer[i]].style.backgroundColor = "orange"
            squares[answer[i]].id = "answer"
            i++
        } else {
            clearInterval(movement)
            if (callWinLose) {
                winLose()
            }
            return;
        }
    }, 20);
}
