document.addEventListener("DOMContentLoaded", main);

function main() {
    
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
        
    }
}


function showGoal_2(elem){
    if(elem.value == "goals") {
        document.getElementsByClassName("goal_results")[0].style.display = "block";
        document.getElementsByClassName("not_goal_results")[0].style.display = "none";
    }
    else {
        document.getElementsByClassName("goal_results")[0].style.display = "none";
        document.getElementsByClassName("not_goal_results")[0].style.display = "block";
    }
}