// Input validation related warnings for shift cards
const NO_SHIFTS = "No shifts were added to this tutor!";
const EMPTY_SHIFT_FIELDS = "There are empty fields in one or more shifts!";
const INVALID_TIMES = "Starting time is greater than or equal to ending time in one or more shifts!";
const OVERLAP_SHIFTS = "There are shifts with overlapping times on the same day!";

// Input validation related warnings for course cards
const NO_COURSES = "No courses were added to this tutor!";
const EMPTY_COURSE_FIELD = "There are empty fields in one or more courses!";
const DUPLICATE_COURSES = "There are duplicate courses!";

// Shift compare function to use with javascript sort()
/*
    returns positive int for shiftA > shiftB
    returns zero for shiftA == shiftB
    returns negative shiftA < shiftB
*/
function compareShifts(shiftA, shiftB) {
    if (getDayNumber(shiftA.day) < getDayNumber(shiftB.day)) {
        return -1;
    } else if (getDayNumber(shiftA.day) > getDayNumber(shiftB.day)) {
        return 1;
    } else {
        // If days are equal, compare start times of each shift
        if (shiftA.startTime < shiftB.startTime) {
            return -1;
        } else if (shiftA.startTime > shiftB.startTime) {
            return 1;
        } else {
            return 0;
        }
    }
}

// Creates button elements with clone and delete icons
function createCloneAndDeleteButton() {
    // Create duplicate and delete buttons
    var deleteButton = document.createElement("button");
    var cloneButton = document.createElement("button");

    // Create elements to contain icons
    var deleteIcon = document.createElement("i");
    var cloneIcon = document.createElement("i");

    // Add classes corresponding to desired icons
    deleteIcon.classList.add("fas", "fa-trash-alt");
    cloneIcon.classList.add("fas", "fa-clone");

    // Add icons to buttons
    deleteButton.appendChild(deleteIcon);
    cloneButton.appendChild(cloneIcon);

    deleteButton.classList.add("cardIconButton");
    cloneButton.classList.add("cardIconButton");

    return {
        deleteButton: deleteButton,
        cloneButton: cloneButton
    }
}


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

    // Create clone and delete buttons
    var buttons = createCloneAndDeleteButton();
    var deleteButton = buttons.deleteButton;

    deleteButton.addEventListener("click", (event) => {
        newCard.parentNode.removeChild(newCard);
    })

    var buttonContainer = document.createElement("div");
    buttonContainer.classList.add("cardButtonContainer");
    buttonContainer.appendChild(deleteButton);

    newCard.appendChild(courseSelector);
    newCard.appendChild(buttonContainer);
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
    option.value = 0;

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

        var buttons = createCloneAndDeleteButton();
        var deleteButton = buttons.deleteButton;
        var cloneButton = buttons.cloneButton;

        deleteButton.addEventListener("click", (event) => {
            newCard.parentNode.removeChild(newCard);
        })

        cloneButton.addEventListener("click", (event) => {
            newCard.parentNode.appendChild(createShiftCard({
                day: newCard.childNodes[0].value,
                startTime: parseFloat(newCard.childNodes[2].value),
                endTime: parseFloat(newCard.childNodes[4].value)
            }))
        })

        // Create div to act as container for buttons (for formatting purposes)
        var buttonContainer = document.createElement("div");
        buttonContainer.classList.add("cardButtonContainer");

        buttonContainer.appendChild(cloneButton);
        buttonContainer.appendChild(deleteButton);

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


function validateShiftInput(shifts) {
    var shiftLength = shifts.length;

    // Check if there are shifts added at all
    if (shiftLength <= 0) {
        alert(NO_SHIFTS);
        return "Invalid";
    }

    // Check for blank values or simple invalid times
    for (var i = 0; i < shiftLength; i++) {
        if (shifts[i].day === "" || shifts[i].startTime === 0 || shifts[i].endTime === 0) {
            // Alert: Missing fields
            alert(EMPTY_SHIFT_FIELDS);
            return "Invalid";
        }

        if (shifts[i].endTime <= shifts[i].startTime) {
            // Alert: A shift has invalid times (It ends earlier than it starts or at the same time)
            alert(INVALID_TIMES);
            return "Invalid";
        }
    }

    // Check for overlapping shifts
    for (var i = 0; i < shiftLength; i++) {
        for (var j = 0; j < shiftLength; j++) {
            if (i === j) {
                continue;
            }

            if (shifts[i].day === shifts[j].day) {
                /*
                    Overlap if:
                    - Same start time
                    - i.startTime < j.startTime && i.endTime > j.startTime
                    - i.startTime > j.startTime && j.endTime > i.startTime
                */
                if (shifts[i].startTime === shifts[j].startTime || 
                    (shifts[i].startTime < shifts[j].startTime && shifts[i].endTime > shifts[j].startTime) ||
                    (shifts[i].startTime < shifts[j].startTime && shifts[i].endTime > shifts[j].startTime)) {
                        // Alert: There are shifts with overlapping times on the same day
                        alert(OVERLAP_SHIFTS);
                        return "Invalid";
                }
            }
        }
    }
}


function validateCourseInput(courseList) {
    var courseLength = courseList.length;

    // Check if there are courses added at all
    if (courseLength <= 0) {
        alert(NO_COURSES);
        return "Invalid";
    }

    // Check for empty fields
    for (var i = 0; i < courseLength; i++) {
        if (courseList[i] === "") {
            alert(EMPTY_COURSE_FIELD);
            return "Invalid";
        }
    }

    // Check for duplicates
    for (var i = 0; i < courseLength; i++) {
        for (var j = 0; j < courseLength; j++) {
            if (i === j) {
                continue;
            }

            if (courseList[i] === courseList[j]) {
                alert(DUPLICATE_COURSES);
                return "Invalid";
            }
        }
    }
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
            startTime: parseFloat(shiftList[i].childNodes[2].value),
            endTime: parseFloat(shiftList[i].childNodes[4].value)
        }

        newTutor.shifts.push(newShift);
    }

    // Validate user input for shifts
    if (validateShiftInput(newTutor.shifts) === "Invalid") {
        return "Invalid";
    }

    // Sort shift list of this tutor
    newTutor.shifts.sort(compareShifts);

    // Create courses from courseList
    for (var i = 0; i < courseList.length; i++) {
        var newCourse = courseList[i].childNodes[1].value;

        newTutor.courses.push(newCourse);
    }

    // Validate user input for courses
    if (validateCourseInput(newTutor.courses) === "Invalid") {
        return "Invalid";
    }

    // Sort course list of this tutor
    newTutor.courses.sort();

    return newTutor;
}


function newTutorButton() {
    var newTutorButton = document.getElementById("new");

    newTutorButton.addEventListener("click", (event) => {
        var newTutor = createNewTutor();

        if (newTutor !== "Invalid") {
            // Post tutor to database
            addTutor(newTutor);

            window.location.href = "tutorList.html";
        }
    })
}


function updateTutorButton(tutorID) {
    var updateTutorButton = document.getElementById("update");

    updateTutorButton.addEventListener("click", (event) => {
        var newTutor = createNewTutor();

        if (newTutor !== "Invalid") {
            // Post tutor to database
            updateTutor(tutorID, newTutor);

            window.location.href = "tutorList.html";
        }
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
    
    // Promise initializes tutors array with all tutors from database TODO ---------------------------------------

    if (queryString !== "") {
        // Add button functionality
        updateTutorButton(queryString);
    } else {
        setPageForAdding();
    }
}