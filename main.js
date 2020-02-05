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

function main () {
    var filter = document.getElementById("filter");
    var courseSelector = document.getElementById("course");
    var tutorSelector = document.getElementById("tutor");

    var header = document.getElementById("header");
    var courseHead = document.getElementById("courseHeader");
    var tutorHead = document.getElementById("courseHeader");

    // Fill selectors with appropriate options from data
    populateTutorSelector(tutors);
    populateCourseSelector(courses);

    // Table should be populated with empty cells by default
    fillTable();

    filter.addEventListener("change", (event) => {
        if (event.target.value === "") {
            removeDataCells();
            fillTable();
            courseSelector.classList.add("hide");
            tutorSelector.classList.add("hide");
        } else if (event.target.value === "course") {
            courseSelector.classList.remove("hide");
            tutorSelector.classList.add("hide");
        } else if (event.target.value === "tutor") {
            courseSelector.classList.add("hide");
            tutorSelector.classList.remove("hide");
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
            populateTableShifts(condenseTutorShifts(tutors, event.target.value));
        }
    })

    tutorSelector.addEventListener("change", (event) => {
        if (event.target.value === "") {
            removeDataCells();
            fillTable();
            header.classList.add("hide");
            tutorHead.classList.add("hide");
        } else {
            header.classList.remove("hide");
            tutorHead.classList.remove("hide");

            if (tutorHead.childNodes.length >= 2) {
                var textChild = tutorHead.childNodes[1];
                tutorHead.removeChild(textChild);
            }

            var newText = document.createTextNode(event.target.value);
            tutorHead.appendChild(newText);

            removeDataCells();
            populateTableShifts(); // Not Finished
        }
    })


    // populateTableShifts(condenseTutorShifts(tutors, "COP2"));
}