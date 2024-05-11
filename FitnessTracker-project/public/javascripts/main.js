
let exerciseArray = [];

// Define a constructor to create exercise objects
let exerciseObject = function (pType, pDuration, pCalories, pNotes) {
    this.Type = pType;
    this.Duration = pDuration;
    this.ID = exerciseArray.length + 1;
    this.Calories = pCalories;
    this.Notes = pNotes;
}

exerciseArray.push(new exerciseObject("Weight lifting", "35 minutes", "215 Calories", "3 sets and 15 reps"));
exerciseArray.push(new exerciseObject("Running", "1 hour and 15 minutes", "887 Calories", "3.75 miles"));
exerciseArray.push(new exerciseObject("Yoga", "23 minutes", "97 Calories", "Need to increase back streching"));


document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("buttonAdd").addEventListener("click", function() {
        exerciseArray.push(new exerciseObject(document.getElementById("type").value, document.getElementById("duration").value,
        document.getElementById("calories").value, document.getElementById("notes").value));

        document.location.href = "index.html#list";
    });

    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("type").value = "";
        document.getElementById("duration").value = "";
        document.getElementById("calories").value = "";
        document.getElementById("notes").value = "";
    });

    document.getElementById("buttonSortType").addEventListener("click", function () {
        exerciseArray.sort(dynamicSort("Type"));
        createList()
        document.location.href = "index.html#list";
    });

    document.getElementById("buttonSortCalories").addEventListener("click", function () {
        exerciseArray.sort(dynamicSort("Calories"));
        createList()
        document.location.href = "index.html#list";
    });

    $(document).on("pagebeforeshow", "#list", function (event) { createList();
    });

    $(document).on("pagebeforeshow", "#home", function (event) {    });

    $(document).on("pagebeforeshow", "#add", function (event) {     });

    $(document).on("pagebeforeshow", "#details", function (event) {
        let localID = localStorage.getItem('parm');
        let pointer = GetObjectPointer(localID);

        exerciseArray = JSON.parse(localStorage.getItem('exerciseArray'));

        document.getElementById("oneType").innerHTML = "Exercise Type: " + exerciseArray[pointer].Type;
        document.getElementById("oneDuration").innerHTML = "Exercise Duration: " + exerciseArray[pointer].Duration;
        document.getElementById("oneCalories").innerHTML = "Calories Burned: " + exerciseArray[pointer].Calories;
        document.getElementById("oneNotes").innerHTML = "Your Additional Notes: " + exerciseArray[pointer].Notes;
    });

}); // End of page load

function GetObjectPointer(whichID){
    for(i=0; i< exerciseArray.length; i++){
        if(exerciseArray[i].ID = whichID){
            return i;
        }
    }
}

function createList(){
    var theList = document.getElementById("myul");
    theList.innerHTML = "";

    exerciseArray.forEach(function (element, pointer) {
        var myLi = document.createElement('li');
        myLi.classList.add('oneExercise');
        myLi.innerHTML = element.ID + ": " + element.Type + " for " + element.Duration + " and "
        + element.Calories + " Calories.";
            myLi.setAttribute("data-parm", element.ID);
        theList.appendChild(myLi);
    });

    let liList = document.getElementsByClassName("oneExercise")
    let newLIArray = Array.from(liList);

    newLIArray.forEach(function (element,i) {
        element.addEventListener('click', function () {

            let parm = this.getAttribute("data-parm");

            localStorage.setItem('parm', parm);
            
        let stringExerciseArray = JSON.stringify(exerciseArray);
        localStorage.setItem('exerciseArray', stringExerciseArray);

        document.location.href = "index.html#details";
        });
    });

}

function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(a[property]);
        }
    }
}