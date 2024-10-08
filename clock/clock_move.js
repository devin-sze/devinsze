
var digit_width = 50; //50px
var digit_padding = 3;

var sec;
var min;
var hr;

function doTime() {
    let doTime = setInterval(function() {
        let d = new Date();
        if (sec != d.getSeconds()) {

            let newSec = d.getSeconds();
            let newSec0 = Math.floor(newSec/10);
            let newSec1 = newSec % 10;

            let oldSec0 = Math.floor(sec/10);
            let oldSec1 = sec % 10;

            updateDig(oldSec0, newSec0, "sec0", "digit_sec0");
            updateDig(oldSec1, newSec1, "sec1", "digit_sec1");

            sec = newSec;

            if (min != d.getMinutes()) {
                let newMin = d.getMinutes();
                let newMin0 = Math.floor(newMin/10);
                let newMin1 = newMin % 10;

                let oldMin0 = Math.floor(min/10);
                let oldMin1 = min % 10;

                updateDig(oldMin0, newMin0, "min0", "digit_min0");
                updateDig(oldMin1, newMin1, "min1", "digit_min1");

                min = newMin;

                if (hr != d.getHours()) {
                    let newHr = d.getHours();
                    let newHr0 = Math.floor(newHr/10);
                    let newHr1 = newHr % 10;
    
                    let oldHr0 = Math.floor(hr/10);
                    let oldHr1 = hr % 10;
    
                    updateDig(oldHr0, newHr0, "hr0", "digit_hr0");
                    updateDig(oldHr1, newHr1, "hr1", "digit_hr1");
                    hr = newHr;

                    //if hour has changed, update date anyways
                    updateDay(d.getDay(), d.getDate(), d.getMonth(), d.getFullYear())

                }
            }
        }
    }, 50);
}

function updateDig(dig, newDig, idDig, idDigit) {
    if (dig == newDig) {
        return;
    }

    let translateAmount = digit_width * newDig;
    document.getElementById(idDig).style.transform = "translate(0px, -" + translateAmount + "px)";

    let isDigitDiv = document.getElementById(idDigit);
    isDigitDiv.innerHTML = "";
    isDigitDiv.style.width = digit_width/3 + "px";
    isDigitDiv.style.height = digit_width/3 + "px";

    isDigitDiv.style.marginTop = digit_width/3 + "px";
    isDigitDiv.style.marginBottom = digit_width/3 + "px";
    isDigitDiv.style.marginLeft = digit_width/3 + digit_padding + "px";
    isDigitDiv.style.marginRight = digit_width/3 + digit_padding + "px";

    let resetTransition = setInterval(function() {
        isDigitDiv.innerHTML = newDig;

        isDigitDiv.style.width = digit_width + "px";
        isDigitDiv.style.height = digit_width + "px";
        //isDigitDiv.style.backgroundColor = "orange";

        isDigitDiv.style.margin = "0px " + digit_padding + "px 0px " + digit_padding + "px";
        clearInterval(resetTransition)
    }, 150)
}

var weekDay = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday" 
};

var months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
}

function updateDay(week, day, month, year) {
    let elem = document.getElementById("bottom_right");
    elem.innerHTML = weekDay[week] + ", " + months[month] + " " + day + ", " + year;
}






function updateSec(newSec) {
    sec = newSec;

    let sec0 = Math.floor(sec/10);
    let sec1 = sec%10;

    let sec0_translate = digit_width * sec0;
    document.getElementById("sec0").style.transform  = "translate(0px, -" + sec0_translate + "px)";
    document.getElementById("digit_sec0").innerHTML = sec0;

    let sec1_translate = digit_width * sec1;
    document.getElementById("sec1").style.transform  = "translate(0px, -" + sec1_translate + "px)";
    document.getElementById("digit_sec1").innerHTML = sec1;
}

function updateMin(newMin) {
    min = newMin;

    let min0 = Math.floor(min/10);
    let min1 = min%10;

    let min0_translate = digit_width * min0;
    document.getElementById("min0").style.transform  = "translate(0px, -" + min0_translate + "px)";

    let min1_translate = digit_width * min1;
    document.getElementById("min1").style.transform  = "translate(0px, -" + min1_translate + "px)";

}

function updateHr(newHr) {
    hr = newHr;

    let hr0 = Math.floor(hr/10);
    let hr1 = hr%10;

    let hr0_translate = digit_width * hr0;
    document.getElementById("hr0").style.transform  = "translate(0px, -" + hr0_translate + "px)";

    let hr1_translate = digit_width * hr1;
    document.getElementById("hr1").style.transform  = "translate(0px, -" + hr1_translate + "px)";

}





