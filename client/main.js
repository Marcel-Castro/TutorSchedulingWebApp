// Width threshold at which page content switches between a condensed and non-condensed form
const MIN_WIDTH = 880;

function populateTutorSelector (tutors) {
    var tutorSelector = document.getElementById("tutor");

    for (var i = 0; i < tutors.length; i++) {
        var newTutor = document.createElement("option");
        var newName = document.createTextNode(tutors[i].name);
        newTutor.appendChild(newName);
        newTutor.setAttribute("value", tutors[i].name);
        tutorSelector.appendChild(newTutor);
    }
}


function populateCourseSelector (courses) {
    var courseSelector = document.getElementById("course");

    for (var i = 0; i < courses.length; i++) {
        var newCourse = document.createElement("option");
        var newName = document.createTextNode(courses[i]);
        newCourse.appendChild(newName);
        newCourse.setAttribute("value", courses[i]);
        courseSelector.appendChild(newCourse);
    }
}


// Assumes that all tutors have unique names
function getTutor (tutorList, tutorName) {
    var tutor = tutorList.filter(tutor => (tutor.name === tutorName));

    return tutor[0];
}


// Reposition tutor course tool tip depending on current screen width
function positionCourseToolTip () {
    window.addEventListener('resize', function () {

        if (window.outerWidth < MIN_WIDTH) {
            // Set tooltip to display below indicator
        } else {
            // Set tooltip to display right of indicator
        }
    });
}


// Update header row weekday names (between abreviated and non-abreviated) depending on current screen width
function setRowHeaderText () {
    var mon = document.getElementById("monday");
    var tue = document.getElementById("tuesday");
    var wed = document.getElementById("wednesday");
    var thu = document.getElementById("thursday");
    var fri = document.getElementById("friday");
    var sat = document.getElementById("saturday");
    var sun = document.getElementById("sunday");

    function alterText () {
        if (window.outerWidth < MIN_WIDTH && mon.firstChild !== "Mon") {
            // Set header texts to abreviated weekday names
            mon.removeChild(mon.childNodes[0]);
            var newText = document.createTextNode("Mon");
            mon.appendChild(newText);
    
            tue.removeChild(tue.childNodes[0]);
            newText = document.createTextNode("Tue");
            tue.appendChild(newText);
    
            wed.removeChild(wed.childNodes[0]);
            newText = document.createTextNode("Wed");
            wed.appendChild(newText);
    
            thu.removeChild(thu.childNodes[0]);
            newText = document.createTextNode("Thu");
            thu.appendChild(newText);
    
            fri.removeChild(fri.childNodes[0]);
            newText = document.createTextNode("Fri");
            fri.appendChild(newText);
    
            sat.removeChild(sat.childNodes[0]);
            newText = document.createTextNode("Sat");
            sat.appendChild(newText);
    
            sun.removeChild(sun.childNodes[0]);
            newText = document.createTextNode("Sun");
            sun.appendChild(newText);
        } else {
            // Set header texts to standard weekday names
            if (mon.firstChild !== "Monday") {
                mon.removeChild(mon.childNodes[0]);
                var newText = document.createTextNode("Monday");
                mon.appendChild(newText);
    
                tue.removeChild(tue.childNodes[0]);
                newText = document.createTextNode("Tuesday");
                tue.appendChild(newText);
    
                wed.removeChild(wed.childNodes[0]);
                newText = document.createTextNode("Wednesday");
                wed.appendChild(newText);
    
                thu.removeChild(thu.childNodes[0]);
                newText = document.createTextNode("Thursday");
                thu.appendChild(newText);
    
                fri.removeChild(fri.childNodes[0]);
                newText = document.createTextNode("Friday");
                fri.appendChild(newText);
    
                sat.removeChild(sat.childNodes[0]);
                newText = document.createTextNode("Saturday");
                sat.appendChild(newText);
    
                sun.removeChild(sun.childNodes[0]);
                newText = document.createTextNode("Sunday");
                sun.appendChild(newText);
            }
        }
    }

    // Run once initially to set text depending on the screen width at the time the page is loaded
    alterText();

    // Call continuously as the width of the window changes
    window.addEventListener('resize', alterText);
}


// Alters shift cell text depending on screen width
function alterShiftText (shiftText) {
    // Closure scope for the purpose of making the outer function work as a callback with parameters
    return function () {
        if (window.outerWidth < MIN_WIDTH) {
            // Set cell text content to smaller font size and abbreviate weekday name
            for (var i = 0; i < shiftText.length; i++) {
                shiftText[i].classList.add("hide");
            }
        } else {
            // Set cell text to default appearance
            for (var i = 0; i < shiftText.length; i++) {
                shiftText[i].classList.remove("hide");
            }
        }
    }
}


// Update shift cell text content depending on current screen width
function updateShiftCellText (shiftText) {
    // Call continuously as the width of the window changes
    window.addEventListener('resize', alterShiftText(shiftText));
}


// Updates table header text depending on current screen width
function updateTableHeader () {
    var tableHeaderText = document.getElementsByTagName("H2");

    function alterHeader () {
        if (window.outerWidth < MIN_WIDTH) {
            // Set header to condensed version
            for (var i = 0; i < tableHeaderText.length; i++) {
                tableHeaderText[i].classList.add("h2_SmallFont");
            }
        } else {
            // Set header to regular version
            for (var i = 0; i < tableHeaderText.length; i++) {
                tableHeaderText[i].classList.remove("h2_SmallFont");
            }
        }
    }

    // Run once initially to set text depending on the screen width at the time the page is loaded
    alterHeader();

    // Call continuously as the width of the window changes
    window.addEventListener('resize', alterHeader);
}


function main () {
    // Related to selectors
    var filter = document.getElementById("filter");
    var courseSelector = document.getElementById("course");
    var tutorSelector = document.getElementById("tutor");

    // Related to header
    var header = document.getElementById("header");
    var courseHead = document.getElementById("courseHeader");
    var tutorHead = document.getElementById("tutorHeader");
    var tutorCourses = document.getElementById("tutorCourseIndicator");
    var tutorCoursesText = document.getElementById("tutorCourseToolTip");
    
    // Related to shift cells
    var shiftText = document.getElementsByClassName("shiftText");

    // Fill selectors with appropriate options from data
    populateTutorSelector(tutors);
    populateCourseSelector(courses);

    // Adds row headers (the time labels) to the lefthand side of the table
    addHeaders();

    // Table should be populated with empty cells by default
    fillTable();

    // Screen resize event handlers
    setRowHeaderText();

    updateShiftCellText(shiftText);

    updateTableHeader();

    // positionCourseToolTip(); TODO ----------------

    // Selector changes event handlers
    filter.addEventListener("change", (event) => {
        if (event.target.value === "") {
            removeDataCells();
            fillTable();
            courseSelector.classList.add("hide");
            tutorSelector.classList.add("hide");
    
            // Hide header
            header.classList.add("hide");
            courseHead.classList.add("hide");
            tutorHead.classList.add("hide");
            tutorCourses.classList.add("hide");
            
            // Set selectors to back to defaults
            tutorSelector.value = "";
            courseSelector.value = "";
        } else if (event.target.value === "course") {
            removeDataCells();
            fillTable();
            courseSelector.classList.remove("hide");
            tutorSelector.classList.add("hide");
            
            // Hide Header (switching filtering criteria should trigger this, subject to change)
            header.classList.add("hide");
            tutorHead.classList.add("hide");
            tutorCourses.classList.add("hide");
    
            // Set only tutor selector back to default
            tutorSelector.value = "";
        } else if (event.target.value === "tutor") {
            removeDataCells();
            fillTable();
            courseSelector.classList.add("hide");
            tutorSelector.classList.remove("hide");
    
            // Hide Header (switching filtering criteria should trigger this, subject to change)
            header.classList.add("hide");
            courseHead.classList.add("hide");
    
            // Set only course selector back to default
            courseSelector.value = "";
        }
    })

    courseSelector.addEventListener("change", (event) => {
        if (event.target.value === "") {
            removeDataCells();
            fillTable();
            header.classList.add("hide");
            courseHead.classList.add("hide");
        } else {
            header.classList.remove("hide");
            courseHead.classList.remove("hide");

            if (courseHead.childNodes.length >= 2) {
                var textChild = courseHead.childNodes[1];
                courseHead.removeChild(textChild);
            }

            var newText = document.createTextNode(event.target.value);
            courseHead.appendChild(newText);

            removeDataCells();
            populateTableShifts(condenseTutorShifts(tutors, event.target.value), event.target.value);

            // Shift text will be changed between condensed vs regular at the time that selector event occurs
            // Syntax is on account of alterShiftText being setup to work as a callback function
            var altTextFunc = alterShiftText(shiftText);
            altTextFunc();
        }
    })

    tutorSelector.addEventListener("change", (event) => {
        if (event.target.value === "") {
            removeDataCells();
            fillTable();
            header.classList.add("hide");
            tutorHead.classList.add("hide");
            tutorCourses.classList.add("hide");
        } else {
            header.classList.remove("hide");
            tutorHead.classList.remove("hide");
            tutorCourses.classList.remove("hide");

            if (tutorHead.childNodes.length >= 2) {
                var textChild = tutorHead.childNodes[1];
                tutorHead.removeChild(textChild);
            }

            var newText = document.createTextNode(event.target.value);
            tutorHead.appendChild(newText);

            // Remove courses previously added to "courses covered" tool tip, if any
            while (tutorCoursesText.firstChild) {
                tutorCoursesText.removeChild(tutorCoursesText.lastChild);
            }

            // Add tutor's covered courses to the "courses covered" tool tip
            var courseList = getTutor(tutors, event.target.value).courses;

            for (var i = 0; i < courseList.length; i++) {
                var newSpan = document.createElement("span");
                var newText = document.createTextNode(" - " + courseList[i]);

                newSpan.appendChild(newText);
                newSpan.classList.add("toolTipSpan");

                tutorCoursesText.appendChild(newSpan);
            }

            removeDataCells();
            populateTableShifts(getTutorShifts(tutors, event.target.value), "");

            // Shift text will be changed between condensed vs regular at the time that selector event occurs
            // Syntax is on account of alterShiftText being setup to work as a callback function
            var altTextFunc = alterShiftText(shiftText);
            altTextFunc();
        }
    })
}