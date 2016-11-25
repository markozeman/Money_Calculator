document.addEventListener("DOMContentLoaded", main);



var submit;


function main() {
    // window.addEventListener("beforeunload", onCheckLeave);
    /*
    var logo_picture = document.getElementsByClassName("logo")[0];
    if (profile_picture != null) {
        logo_picture.src = profile_picture.src;    
    }
    */
    
    
    
    
    
    
    
}









function registration() {
    var inputs = document.getElementById("registration_form");
    
    var username = inputs[0];
    var password = inputs[1];
    var password_2 = inputs[2];
    
    var checkbox = document.getElementById("registration_form").elements["captcha"].checked;
    if (!checkbox) {
        alert ("Označite, da niste robot.");
    }
    
    if (submit.value == "Vpis") {
        if (username.value.length == 0) {
            alert("Vnesite uporabniško ime.");
            return;
        }
        if (username.value.length < 6) {
            alert("Uporabniško ime mora biti dolgo vsaj 6 znakov.");
            return;
        }
        
        // TODO
        // preveri, če je pravo uporabniško ime in pravilno geslo na vsaj enem od polj
    }
    else if (submit.value == "Registracija") {
        if (username.value.length == 0 || password.value.length == 0 || password_2.value.length == 0) {
            alert("Izpolnite vsa polja.");
            return;
        }
        
        if (username.value.length < 6) {
            alert("Uporabniško ime mora biti dolgo vsaj 6 znakov.");
            return;
        }
        if (password.value != password_2.value) {
            alert("Gesli se ne ujemata.");
            return;
        }
        
        // TODO
        // preveri če tako up. ime še ne obstaja
        
        // TODO
        // registriraj novo osebo, dodaj v seznam uporabnikov
    }
    
    
    return false;
}


function get_visual_minus() {
    
    return false;
}


function get_visual_plus() {
    
    return false;
}


function get_data() {

    
    return false;
}


function add_or_take_money() {
    // check which submit clicked

    
    return false;
}


function add_goal() {
    
    
    return false;
}

function add_to_goal() {
    
    
    return false;
}







function showGoal(elem){
    if(elem.value == "new_goal") { 
        document.getElementsByClassName("new_goals")[0].style.display = "block";
        document.getElementsByClassName("add_data")[0].style.display = "none";
        document.getElementsByClassName("add_to_goal")[0].style.display = "none";
    }
    else if(elem.value == "goal_add_money") { 
        document.getElementsByClassName("add_to_goal")[0].style.display = "block";
        document.getElementsByClassName("add_data")[0].style.display = "none";
        document.getElementsByClassName("new_goals")[0].style.display = "none";
    }
    else {
        document.getElementsByClassName("add_data")[0].style.display = "block";
        document.getElementsByClassName("new_goals")[0].style.display = "none";
        document.getElementsByClassName("add_to_goal")[0].style.display = "none";
    }
}


function showGoal_2(elem){
    if(elem.value == "goals") {
        document.getElementsByClassName("goal_results")[0].style.display = "block";
        document.getElementsByClassName("not_goal_results")[0].style.display = "none";
        document.getElementsByClassName("result_set")[0].style.display = "none";
    }
    else {
        document.getElementsByClassName("not_goal_results")[0].style.display = "block";
        document.getElementsByClassName("result_set")[0].style.display = "block";
        document.getElementsByClassName("goal_results")[0].style.display = "none";
    }
}


function Clicked (button) {
    submit = button ;
}










/*
function onCheckLeave (ev) {
    var inputs = document.querySelectorAll("input[type='text'], input[type='password']");
    
    for (var i=0; i<inputs.length; i++) {
        if (inputs[i].value != "") {
            ev.returnValue = "pozor";
            return "pozor";
        }
    }
}
*/