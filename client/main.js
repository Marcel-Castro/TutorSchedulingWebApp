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

    // Fill selectors with appropriate options from data
    populateTutorSelector(tutors);
    populateCourseSelector(courses);

    // Adds row headers (the time labels) to the lefthand side of the table
    addHeaders();

    // Table should be populated with empty cells by default
    fillTable();

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
        }
    })
}