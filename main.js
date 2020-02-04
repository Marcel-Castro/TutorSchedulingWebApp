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
    populateTutorSelector(tutors);
    populateCourseSelector(courses);
    // fillTable();
    var filter = document.getElementById("filter");


    populateTableShifts(condenseTutorShifts(tutors, "COP2"));
}