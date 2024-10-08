var showLegendTF = false;

function showLegend() {
   
    if (showLegendTF) {
        //already shown
        helper_hideLegend()
        showLegendTF = false;
        
    } else {
        helper_showLegend()
        showLegendTF = true;
    }
}


function showElem(id) {
    document.getElementById(id).style.opacity = 1;//"block";
}

function hideElem(id) {
    let hideElemInt = setInterval(function() {
        document.getElementById(id).style.opacity = 0;
        clearInterval(hideElemInt)
    }, 500)
}





function helper_hideLegend(){
    let control_width = 180;
    let button_top = 10;

    let tempTop = (control_width/3) + button_top*2 + "px";//control_width*0.75 + 50 + "px";
    
    document.getElementById("legend_start").style.top = tempTop;
    document.getElementById("legend_end").style.top = tempTop;
    document.getElementById("legend_position").style.top = tempTop;
    //document.getElementById("legend_auto").style.top = tempTop;


    document.getElementById("legend_description").innerHTML = ""
    document.getElementById("legend_description").style.width = "0px";
    //document.getElementById("legend_description").style.paddingRight = "0px";
    document.getElementById("legend_description").style.paddingLeft = "0px";



    document.getElementById("legend_start").style.opacity = 0;
    document.getElementById("legend_end").style.opacity = 0;
    document.getElementById("legend_position").style.opacity = 0;
    //document.getElementById("legend_auto").style.opacity = 0;
    //document.getElementById("legend_description").style.opacity = 0;

    
}



function helper_showLegend(){
    let control_width = 180;
    let element_width = 15;

    let button_top = 10; //control_width/3;


    
    document.getElementById("legend_start").style.top = (control_width/3)*2 + button_top*3 + "px";
    document.getElementById("legend_end").style.top = (control_width/3)*2 + button_top*3 + element_width*2 + "px";
    document.getElementById("legend_position").style.top = (control_width/3)*2 + button_top*3 + element_width*4 + "px";
    //document.getElementById("legend_auto").style.top = (control_width/3)*2 + button_top*3 + element_width*6 + "px";


    
    
    //document.getElementById("legend_description").style.paddingRight = 20 + control_width/6 + "px";
    document.getElementById("legend_description").style.paddingLeft = 20 + "px";
    document.getElementById("legend_description").style.width = "305px";

    let showDescription = setInterval(function() {
        document.getElementById("legend_description").innerHTML = "Beat the Computer to the Finish";
        clearInterval(showDescription);
    }, 200)




    document.getElementById("legend_start").style.opacity = 1;
    document.getElementById("legend_end").style.opacity = 1;
    document.getElementById("legend_position").style.opacity = 1;
    //document.getElementById("legend_auto").style.opacity = 1;
    //document.getElementById("legend_description").style.opacity = 1;

    showLegendTF = true;
}



