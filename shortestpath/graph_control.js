
var dropped = false; //false, the dropdown is still up
//true, the dropdown is down (in use)
var control_height = 90; //90px
var control_icon_size = 30; //30px
//var grey_color = "#cecece";
var shadow_color = "#292929";



function controlDropdown() {
    if (dropped) {
        document.getElementById("control_container").style.height = "90px";
        document.getElementById("control_arrow").style.transform = "rotate(0deg)";
        document.getElementById("control_arrow").style.boxShadow = "1.5px 1.5px 5px " + shadow_color;
    } else {
        document.getElementById("control_container").style.height = "170px";
        document.getElementById("control_arrow").style.transform = "rotate(180deg)";
        document.getElementById("control_arrow").style.boxShadow = "-1.5px -1.5px 5px " + shadow_color;
    }
    dropped = !dropped;
    dropDown_Helper();
}



function dropDown_Helper() {
    if (screenWidth > 600 - element_width) {
        dropDown(true);
    } else {
        dropDown(false);
    } 
}

/*let alg = document.getElementById("algorithm");
alg.style.width = "fit-content";
alg.style.height = "90px";
alg.style.lineHeight = String(control_height) + "px";
alg.style.paddingRight = "7px";*/

function dropDown(isOver600) {
    var cntr_left = document.getElementById("control_left");
    var algs = document.querySelectorAll(".algorithm");
    var control_icon_container = document.querySelectorAll(".control_icon_container");



    if (!dropped && isOver600) {
        //console.log("over 600, not expanded");
        //over 600, not expanded
        cntr_left.style.width = "";
        cntr_left.style.paddingLeft = "10px";
        cntr_left.style.paddingRight = "25px";
        cntr_left.style.height = "90px";
        cntr_left.style.lineHeight = "90px";

        document.getElementById("control_right").style.width = "fit-content";

        document.getElementById("algorithm_container").style.float = "left";
        document.getElementById("algorithm_container").style.margin = "0";
        document.getElementById("algorithm_container").style.marginLeft = "7px";
        document.getElementById("algorithm_container").style.marginRight = "15px";
        document.getElementById("algorithm_container").style.marginTop = String((control_height - 45)/2) + "px";



        for (let i = 0; i < algs.length; i++) {
            alg = algs[i];
            if (alg.classList.contains('selectAlgorithm')){ //} == "selectAlgorithm") {
                alg.style.display = "block";
                alg.style.width = "fit-content";
                alg.style.paddingRight = "7px";
                alg.style.paddingLeft = "7px";

                alg.style.lineHeight = String(45) + "px";
                alg.style.height = "45px";
                //alg.style.marginTop = String((control_height - 45)/2) + "px";

                alg.style.backgroundColor = "";
            } else {
                alg.style.display = "none";
            }
        }

        for (let i = 0; i < control_icon_container.length; i++) {
            curr_container = control_icon_container[i];
            curr_container.style.float = "left";
            curr_container.style.paddingLeft = "7px";
            curr_container.style.paddingRight = "7px";
            curr_container.style.paddingTop = String((control_height - 2 * control_icon_size - 7)/2) + "px";
            curr_container.style.width = String(control_icon_size + 14) + "px";
            curr_container.style.gap = "0px";
            curr_container.style.height = "90px";
        }

        document.getElementById("control_start_text").style.display = "none";
        document.getElementById("control_finish_text").style.display = "none";
        document.getElementById("control_randomize_text").style.display = "none";
        document.getElementById("control_reset_text").style.display = "none";

        document.getElementById("control_right").style.width = "fit-content";


        document.getElementById("control_start").style.width = "30px";
        document.getElementById("control_finish").style.width = "30px";
        document.getElementById("control_randomize").style.width = "30px";
        document.getElementById("control_reset").style.width = "30px";

        document.getElementById("control_arrow").style.top = "30px";
        document.getElementById("control_arrow").style.right = "15px";


    } else if (!dropped && !isOver600) {
        //console.log("under 600, not expanded");
        //under 600, not expanded
        let algs = document.querySelectorAll(".algorithm");
        let control_icon_container = document.querySelectorAll(".control_icon_container");

        for (let i = 0; i < algs.length; i++) {
            alg = algs[i];
            if (alg.classList.contains('selectAlgorithm')) {
                alg.style.display = "block";
                alg.style.width = "fit-content";
                alg.style.height = "30px";
                alg.style.lineHeight = "30px";
                alg.style.paddingLeft = "15px";
                alg.style.paddingRight = "15px";
            } else {
                alg.style.display = "none";
            }
        }

        for (let i = 0; i < control_icon_container.length; i++) {
            curr_container = control_icon_container[i];
            curr_container.style.float = "right";
            curr_container.style.padding = "0px";
            curr_container.style.width = "90px";
            curr_container.style.gap = "15px";
            curr_container.style.height = "45px";
        }
        
        document.getElementById("control_arrow").style.top = "75px";
        document.getElementById("control_arrow").style.right = "calc(50% - 15px)";

        document.getElementById("algorithm_container").style.width = "fit-width";
        document.getElementById("algorithm_container").style.margin = "0";
        document.getElementById("algorithm_container").style.float = "left";
        document.getElementById("algorithm_container").style.marginLeft = "7px";

        document.getElementById("control_start_text").style.display = "none";
        document.getElementById("control_finish_text").style.display = "none";
        document.getElementById("control_randomize_text").style.display = "none";
        document.getElementById("control_reset_text").style.display = "none";

        document.getElementById("control_start").style.width = "30px";
        document.getElementById("control_finish").style.width = "30px";
        document.getElementById("control_randomize").style.width = "30px";
        document.getElementById("control_reset").style.width = "30px";

        document.getElementById("control_right").style.width = "100%";
        document.getElementById("control_right").style.height = "30px";









    } else {
        //console.log("expanded");
        //expanded
        cntr_left.style.width = "100vw";
        cntr_left.style.padding = "0px";
        cntr_left.style.textAlign = "center";
        cntr_left.style.height = "60px";
        cntr_left.style.lineHeight = "60px";

        document.getElementById("algorithm_container").style.removeProperty('float');// = "";
        document.getElementById("algorithm_container").style.margin = "0 auto";
        document.getElementById("algorithm_container").style.width = "fit-content";
        //document.getElementById("algorithm_container").style.marginLeft = "0px";
        //document.getElementById("algorithm_container").style.width = "fit-content";


        for (let i = 0; i < algs.length; i++) {
            alg = algs[i];
            alg.style.display = "block";
            alg.style.width = "fit-content";
            alg.style.height = "30px";
            alg.style.lineHeight = "30px";
            alg.style.paddingRight = "15px";
            alg.style.paddingLeft = "15px";
            if (alg.classList.contains('selectAlgorithm')) {
                alg.style.backgroundColor = grey_light_color;
            }
        }

        for (let i = 0; i < control_icon_container.length; i++) {
            curr_container = control_icon_container[i];
            curr_container.style.gap = "0px";
            curr_container.style.paddingTop = "11.5px";
            curr_container.style.float = "left";
        }

        //console.log(isOver600);

        document.getElementById("start_finish").style.paddingLeft = "7px";
        document.getElementById("random_reset").style.paddingRight = "7px";

        /*if (isOver600) {
            document.getElementById("start_finish").style.paddingLeft = "7px";
            document.getElementById("random_reset").style.paddingRight = "7px";
        } else {
            document.getElementById("start_finish").style.paddingLeft = "0px";
            document.getElementById("random_reset").style.paddingRight = "0px";
        }*/

        document.getElementById("control_start_text").style.display = "block";
        document.getElementById("control_finish_text").style.display = "block";
        document.getElementById("control_randomize_text").style.display = "block";
        document.getElementById("control_reset_text").style.display = "block";




        document.getElementById("control_right").style.width = "100%";

        document.getElementById("start_finish").style.width = "50%";
        document.getElementById("start_finish").style.height = "fit-content";
        document.getElementById("start_finish").style.paddingRight = "0px";
        //document.getElementById("start_finish").style.overflow = "visible";


        //document.getElementById("control_start").style.overflow = "visible";
        document.getElementById("control_start").style.width = "50%";

        document.getElementById("control_start_icon").style.float = "left";
        document.getElementById("control_start_text").style.float = "left";
        document.getElementById("control_start_text").style.width = "fit-content";
        document.getElementById("control_start_text").style.lineHeight = "30px";
        document.getElementById("control_start_text").style.paddingLeft = "7px";






        document.getElementById("control_finish").style.width = "50%";

        document.getElementById("control_finish_icon").style.float = "left";
        document.getElementById("control_finish_text").style.float = "left";
        document.getElementById("control_finish_text").style.width = "fit-content";
        document.getElementById("control_finish_text").style.lineHeight = "30px";
        document.getElementById("control_finish_text").style.paddingLeft = "7px";




        document.getElementById("random_reset").style.width = "50%";
        document.getElementById("random_reset").style.height = "fit-content";
        document.getElementById("random_reset").style.paddingLeft = "0px";




        document.getElementById("control_randomize").style.width = "50%";

        document.getElementById("control_randomize_icon").style.float = "left";
        document.getElementById("control_randomize_text").style.float = "left";
        document.getElementById("control_randomize_text").style.width = "fit-content";
        document.getElementById("control_randomize_text").style.lineHeight = "30px";
        document.getElementById("control_randomize_text").style.paddingLeft = "7px";



        document.getElementById("control_reset").style.width = "50%";

        document.getElementById("control_reset_icon").style.float = "left";
        document.getElementById("control_reset_text").style.float = "left";
        document.getElementById("control_reset_text").style.width = "fit-content";
        document.getElementById("control_reset_text").style.lineHeight = "30px";
        document.getElementById("control_reset_text").style.paddingLeft = "7px";


        if (isOver600) {
            document.getElementById("control_arrow").style.top = "30px";
            document.getElementById("control_arrow").style.right = "15px";


        } else {
            document.getElementById("control_arrow").style.top = "155px";
            document.getElementById("control_arrow").style.right = "calc(50% - 15px)";
        }

        document.getElementById("control_right").style.width = "100%";
        document.getElementById("control_right").style.height = "30px";

        //console.log(document.getElementById("control_right"));







    }
}

/*function dropDown_under600() {

}*/