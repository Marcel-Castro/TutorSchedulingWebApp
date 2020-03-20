var tutors = [];
var courses = [];
var coursesDB = [];

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


function addTutor (tutor) {
    var data = tutor;

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:4000/tutors/add");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("addCourse(): Data sent successfully");
        }
    }
    xhttp.send(JSON.stringify(data));
}


function updateTutor (ID) {
    var data;

    // Get tutor data from ID (the tutor will have been updated inside the tutor array prior to calling this function)
    for (var i = 0; i < tutors.length; i++) {
        if (tutors[i]._id === ID) {
            data = tutors[i];
        } 
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:4000/tutors/update/" + ID, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("updateTutor(): Data sent successfully");
        }
    }
    xhttp.send(JSON.stringify(data));
}


function deleteTutor (ID) {
    var xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "http://localhost:4000/tutors/deleteOne/" + ID, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("deleteTutor(): Data deleted successfully");
        }
    }
    xhttp.send();
}


// DANGEROUS: completely removes all tutors entries
function deleteAllTutors () {
    var xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "http://localhost:4000/tutors/deleteAll", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("deleteAllTutors(): Data deleted successfully");
        }
    }
    xhttp.send();
}


// Course queries ----------------------------
function populateCoursesArray (populateCourseSelector) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("getCourses(): Data fetched successfully");

            var resData = JSON.parse(xhttp.responseText);
            coursesDB = resData;

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
    var data = {
        courseCode: code
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:4000/courses/add");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("addCourse(): Data sent successfully");
        }
    }
    xhttp.send(JSON.stringify(data));
}


function deleteCourse (courseCode) {
    var ID;

    // Get ID from course code
    if (courses.length === coursesDB.length) {
        for (var i = 0; i < coursesDB.length; i++) {
            if (coursesDB[i].courseCode === courseCode) {
                ID = coursesDB[i]._id;
            }
        }
    } else {
        console.log("Error: courses array does not mactch coursesDB array");
        return;
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "http://localhost:4000/courses/" + ID, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("deleteCourse(): Data deleted successfully");
        }
    }
    xhttp.send();
}
