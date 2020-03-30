// Returns an array of shifts sorted by day first and starting time second 
// (different from the one found in table which goes by starting time first) TODO -------------
// function sortShiftsDayFirst(tutorShifts) {
//     var shifts = [];
//     var i;

//     shifts.push(tutorShifts[0]);

//     for (i = 1; i < tutorShifts.length; i++) {
//         var j = 0;
//         var placed = false;

//         while (j < i && placed === false) {
//             if (tutorShifts[i].startTime === shifts[j].startTime) {
//                 var k = j;

//                 while (shifts[k].startTime === shifts[j].startTime) {
//                     if (getDayNumber(tutorShifts[i].day) < getDayNumber(shifts[k].day)) {
//                         shifts.splice(k, 0, tutorShifts[i]);
//                         placed = true;
//                         break;
//                     } else if (shifts[k + 1] === undefined || shifts[k + 1].startTime !== shifts[j].startTime) {
//                         shifts.splice(k + 1, 0, tutorShifts[i]);
//                         placed = true;
//                         break;
//                     } else {
//                         k++;
//                     }
//                 }
//             } else if (tutorShifts[i].startTime < shifts[j].startTime) {
//                 shifts.splice(j, 0, tutorShifts[i]);
//                 placed = true;
//             }
//             else if (j >= i - 1) {
//                 shifts.push(tutorShifts[i]);
//                 placed = true;
//             } else {
//                 j++;
//             }
//         }
//     }

//     return shifts;
// }


// Creates a card for the course list with the appropriate fields
function createCourseCard(course) {
    var courseList = document.getElementById("coursesCovered");

    var newCard = document.createElement("div");
    newCard.classList.add("card");
    var courseSelector = document.createElement("select");

    // Add text preceeding the selector
    var newSpan = document.createElement("span");
    var newText = document.createTextNode("Course Code: ");
    newSpan.classList.add("cardText");
    newSpan.appendChild(newText);
    newCard.appendChild(newSpan);

    // Default option
    var option = document.createElement("option");
    var optionText = document.createTextNode("");
    option.appendChild(optionText);
    option.value = "";

    if (course === "") {
        option.selected = "selected";
    }

    courseSelector.appendChild(option);

    // Populate selector with all course options (set one as "selected" depending on tutor data)
    for (var j = 0; j < courses.length; j++) {
        var option = document.createElement("option");
        var optionText = document.createTextNode(courses[j]);
        option.appendChild(optionText);
        option.value = courses[j];

        if (option.value === course) {
            option.selected = "selected";
        }

        courseSelector.appendChild(option);
    }

    newCard.appendChild(courseSelector);
    courseList.appendChild(newCard);
}


// Adds the specified tutor's courses to the "add course" list
function populateCourseList(tutor) {
    for (var i = 0; i < tutor.courses.length; i++) {
        createCourseCard(tutor.courses[i]);
    }
}


// Generates all the time options for time selector of shift cards
function generateTimeOptions(time) {
    let options = [];

    // Create default option
    var option = document.createElement("option");
    var optionText = document.createTextNode("");
    option.appendChild(optionText);
    option.value = "";

    if (time === 0) {
        option.selected = "selected";
    }

    options.push(option);

    // Create all other time options
    for (currentID = START_TIME; currentID <= END_TIME; currentID = currentID + .5) {
        var option = document.createElement("option");
        var optionText = document.createTextNode(getTimeFromID(currentID));
        option.appendChild(optionText);
        option.value = currentID;

        if (currentID === time) {
            option.selected = "selected";
        }

        options.push(option);
    }

    return options;
}


// Creates a card for the shift list with the appropriate fields
function createShiftCard(shift) {
    // Closure
    return (function () {
        var newCard = document.createElement("div");
        newCard.classList.add("card");
        var daySelector = document.createElement("select");
        var timeSelectorOne = document.createElement("select");
        var timeSelectorTwo = document.createElement("select");

        // Create array containing all the option names/values
        var optionNames = [
            "", // Default Option
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]

        // Create option for each day
        for (var i = 0; i < optionNames.length; i++) {
            var option = document.createElement("option");
            var optionText = document.createTextNode(optionNames[i]);
            option.appendChild(optionText);
            option.value = optionNames[i];

            if (option.value === shift.day) {
                option.selected = "selected";
            }

            daySelector.appendChild(option);
        }


        // Create time options for each selector
        var options = generateTimeOptions(shift.startTime);

        for (var i = 0; i < options.length; i++) {
            timeSelectorOne.appendChild(options[i]);
        }

        options = generateTimeOptions(shift.endTime);

        for (var i = 0; i < options.length; i++) {
            timeSelectorTwo.appendChild(options[i]);
        }

        //Create text spans to go in between the selectors
        var spanFrom = document.createElement("span");
        var fromText = document.createTextNode("from");
        spanFrom.appendChild(fromText);
        spanFrom.classList.add("shiftCardText");

        var spanTo = document.createElement("span");
        var toText = document.createTextNode("to");
        spanTo.appendChild(toText);
        spanTo.classList.add("shiftCardText");

        // Create duplicate and delete buttons
        var deleteButton = document.createElement("button");
        var cloneButton = document.createElement("button");

        // For testing --------------------------------------------------------------
        deleteButton.appendChild(document.createTextNode("DELETE"));
        cloneButton.appendChild(document.createTextNode("CLONE"));

        deleteButton.classList.add("cardIconButton");
        cloneButton.classList.add("cardIconButton");

        // element.parentNode.removeChild(element);

        deleteButton.addEventListener("click", (event) => {
            newCard.parentNode.removeChild(newCard);
        })

        // TODO ----------------------------------------------------------------------
        cloneButton.addEventListener("click", (event) => {
            console.log(newCard.childNodes[2]);
            newCard.parentNode.appendChild(createShiftCard({
                day: newCard.childNodes[0].value,
                startTime: newCard.childNodes[2].value,
                endTime: newCard.childNodes[4].value
            }))
        })

        // Create div to act as container for buttons (for formatting purposes)
        var buttonContainer = document.createElement("div");
        buttonContainer.classList.add("cardButtonContainer");

        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(cloneButton);

        newCard.appendChild(daySelector);
        newCard.appendChild(spanFrom);
        newCard.appendChild(timeSelectorOne);
        newCard.appendChild(spanTo);
        newCard.appendChild(timeSelectorTwo);
        newCard.appendChild(buttonContainer);

        return newCard;
    }) ();
}


// Adds the specifed tutor's shifts to the "add shift" list
function populateShiftList(tutor) {
    var shifts = tutor.shifts;
    var shiftContainer = document.getElementById("shiftsCovered");

    for (var i = 0; i < shifts.length; i++) {
        var shiftCard = createShiftCard(shifts[i]);
        shiftContainer.appendChild(shiftCard);
    }
}


// Sets the "tutor name" field to the name of the specified tutor
function setTutorNameText(tutor) {
    var tutorName = document.getElementById("tutorName");
    tutorName.value = tutor.name;
}


// To be passed into getOneTutor() query function
function getOneTutorCallback(tutor) {
    setTutorNameText(tutor);
    populateShiftList(tutor);
    populateCourseList(tutor);
}


function newCourseButton() {
    var addButton = document.getElementById("addCourse");

    addButton.addEventListener("click", (event) => {
        createCourseCard("");
    })
}


function newShiftButton() {
    var addButton = document.getElementById("addShift");

    addButton.addEventListener("click", (event) => {
        var shiftList = document.getElementById("shiftsCovered");

        var newCard = createShiftCard({
            day: "",
            startTime: 0,
            endTime: 0
        });

        shiftList.appendChild(newCard);
    })
}


function courseClearButton() {
    var clearButton = document.getElementById("clearCourse");

    clearButton.addEventListener("click", (event) => {
        var courseList = document.getElementById("coursesCovered");
        
        courseList.innerHTML = "";
    })
}


function shiftClearButton() {
    var clearButton = document.getElementById("clearShift");

    clearButton.addEventListener("click", (event) => {
        var shiftList = document.getElementById("shiftsCovered");

        shiftList.innerHTML = "";
    })
}


// Creates a tutor object from the contents of the addTutor page
function createNewTutor() {
    var shiftList = document.getElementById("shiftsCovered").childNodes;
    var courseList = document.getElementById("coursesCovered").childNodes;

    var newTutor = {
        name: document.getElementById("tutorName").value,
        shifts: [],
        courses: []
    }

    // Create shifts from shiftList
    for (var i = 0; i < shiftList.length; i++) {
        var newShift = {
            // Indexes 0, 2, 4 correspond to the day and time selectors
            day: shiftList[i].childNodes[0].value,
            startTime: shiftList[i].childNodes[2].value,
            endTime: shiftList[i].childNodes[4].value
        }

        newTutor.shifts.push(newShift);
    }

    // Create courses from ccourseList
    for (var i = 0; i < courseList.length; i++) {
        var newCourse = courseList[i].childNodes[1].value;

        newTutor.courses.push(newCourse);
    }

    return newTutor;
}


function newTutorButton() {
    var newTutorButton = document.getElementById("new");

    newTutorButton.addEventListener("click", (event) => {
        var newTutor = createNewTutor();

        // Post tutor to database
        addTutor(newTutor);

        window.location.href = "tutorList.html"
    })
}


function updateTutorButton(tutorID) {
    var updateTutorButton = document.getElementById("update");

    updateTutorButton.addEventListener("click", (event) => {
        var newTutor = createNewTutor();

        // Post tutor to database
        updateTutor(tutorID, newTutor);

        window.location.href = "tutorList.html"
    })
}


/*
    Default page state is for editing a tutor
    If the page was not accessed via edit button
    This function can be used to show page state for adding a tutor
    (The only difference is the submit buttons)
*/
function setPageForAdding() {
    var addButton = document.getElementById("new");
    var updateButton = document.getElementById("update");

    // Hide update button
    updateButton.classList.add("hide");

    // Change add button text
    addButton.innerHTML = "";
    addButton.appendChild(document.createTextNode("Create Tutor"));
}


function main() {
    // Gets tutor ID from page url (if the addTutor page was accessed via a tutor's edit button)
    var queryString = decodeURIComponent(window.location.search);
    // tutor ID is stored in queryString
    queryString = queryString.substring(1);

    // Promise initializes courses array with all courses from database
    getCoursesPromise()
        .then (coursesArray => {
            courses = coursesArray;

            // Fill page with tutor data (if page was accessed via edit button)
            if (queryString !== "") {
                getOneTutor(queryString, getOneTutorCallback);
            }

            // Add button functionality (relies on courses array being available)
            newCourseButton();
        })
        .catch (error => {
            console.log(error)
        })

    // Add button functionalities
    newShiftButton();
    courseClearButton();
    shiftClearButton();
    newTutorButton();

    if (queryString !== "") {
        // Add button functionality
        updateTutorButton(queryString);
    } else {
        setPageForAdding();
    }
}