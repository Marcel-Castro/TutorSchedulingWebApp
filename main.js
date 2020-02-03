function populateTutorSelector (tutors) {
    var courseSelector = document.getElementById("tutor");

    for (var i = 0; i < tutors.length; i++) {
        var newTutor = document.createElement("option");
    }
}

function populateCourseSelector (courses) {
    var courseSelector = document.getElementById("course");
}

function main () {
    fillTable();
    // populateTableShifts(condenseTutorShifts(tutors, "COP2"));
}