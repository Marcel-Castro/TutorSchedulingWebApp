var tutors = [];
var courses = [];

// Tutor queries ----------------------------
function populateTutorsArray () {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("getTutors(): Data fetched successfully");

            var resData = JSON.parse(xhttp.responseText);

            tutors = resData;
        }
    }
    xhttp.open("GET", "http://localhost:4000/tutors/", true);
    xhttp.send();
}

function addTutor (name, shifts, courses) {

}

function updateTutor (ID) {

}

function deleteTutor (ID) {

}

function deleteAllTutors () {

}

// Course queries ----------------------------
function populateCoursesArray () {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("getCourses(): Data fetched successfully");

            var resData = JSON.parse(xhttp.responseText);

            for (var i = 0; i < resData.length; i++) {
                courses.push(resData[i].courseCode);
            }
        }
    }
    xhttp.open("GET", "http://localhost:4000/courses/");
    xhttp.send();
}

function addCourse (code) {

}

function deleteCourse (ID) {

}
