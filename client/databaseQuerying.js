var tutors = [];
var courses = [];

// Tutor queries ----------------------------
function populateTutorsArray (populate) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("getTutors(): Data fetched successfully");

            var resData = JSON.parse(xhttp.responseText);

            tutors = resData;

            populate(tutors);
        }
    }
    xhttp.open("GET", "http://localhost:4000/tutors/", true);
    xhttp.send();
}


function getOneTutor(ID) {
    var xhttp = new XMLHttpRequest();
    var tutorData;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("getTutors(): Data fetched successfully");

            var resData = JSON.parse(xhttp.responseText);

            tutorData = resData;
        }
    }
    xhttp.open("GET", "http://localhost:4000/tutors/getTutor/" + ID, true);
    xhttp.send();

    return tutorData;
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
function populateCoursesArray (populateCourseSelector) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("getCourses(): Data fetched successfully");

            var resData = JSON.parse(xhttp.responseText);

            for (var i = 0; i < resData.length; i++) {
                courses.push(resData[i].courseCode);
            }

            populateCourseSelector(courses);
        }
    }
    xhttp.open("GET", "http://localhost:4000/courses/");
    xhttp.send();
}


function addCourse (code) {

}


function deleteCourse (ID) {

}
