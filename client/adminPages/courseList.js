function populateCourseList (courses) {
    var courseList = document.getElementById("courseList");

    for (var i = 0; i < courses.length; i++) {
        // Closure
        (function () {
            // Create course card
            var coursesSpan = document.createElement("span");
            var courseText = document.createTextNode(courses[i]);
            coursesSpan.appendChild(courseText);
            coursesSpan.classList.add("courseCard");

            // Create delete button
            var deleteButton = document.createElement("button");
            deleteButton.classList.add("courseCardButton");
            var deleteText = document.createTextNode("Delete");
            deleteButton.appendChild(deleteText);

            // Add button to card
            coursesSpan.appendChild(deleteButton);

            // Add card to course list
            courseList.appendChild(coursesSpan);
        }) ();
    }
}


function main () {
    populateCoursesArray(populateCourseList);
}