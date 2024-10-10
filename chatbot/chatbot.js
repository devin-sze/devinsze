window.onload = function() {
    // document.body.className += " loaded";
    document.getElementById("r1").style.opacity = "1";
    document.getElementById("r1").style.transform = "translateY(0)";

    setTimeout(function() {
        document.getElementById("r1").style.borderBottomRightRadius = "5px";
        document.getElementById("r2").style.borderTopRightRadius = "5px";
        document.getElementById("r2").style.opacity = "1";
        document.getElementById("r2").style.transform = "translateY(0)";
    }, 300);

    // setTimeout(function() {
    //     document.getElementById("r3").style.opacity = "1";
    //     document.getElementById("r3").style.transform = "translateY(0)";
    // }, 600);

    // setTimeout(function() {
    //     document.getElementById("r4").style.opacity = "1";
    //     document.getElementById("r4").style.transform = "translateY(0)";
    // }, 900);

    setTimeout(function() {
        document.getElementById("l1").style.opacity = "1";
        document.getElementById("l1").style.transform = "translateY(0)";
    }, 900);
}

// window.addEventListener("scroll", function() {
//     var elementTarget = document.getElementById("content").getBoundingClientRect();
//     if (window.scrollY > (elementTarget.top + elementTarget.top)) {
//         document.getElementById("index").style.transition = "transform 0.2s";
//         document.getElementById("index").style.transform = "translateX(-82vw)";
//         document.getElementById("index_label").style.color = "black";
//     } else {
//         document.getElementById("index").style.transition = "transform 0.4s";
//         document.getElementById("index").style.transform = "translateX(0vw)";
//         document.getElementById("index_label").style.color = "#00000000";
//     }
// });