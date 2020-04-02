var tutors = [];
var courses = [];
var coursesDB = [];

// Tutor queries ----------------------------
function populateTutorsArray (callback) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("getTutors(): Data fetched successfully");

            var resData = JSON.parse(xhttp.responseText);

            // Sets global tutors array equal to the list of tutors returned from the database
            tutors = resData;

            callback(tutors);
        }
    }
    xhttp.open("GET", "http://localhost:4000/tutors/", true);
    xhttp.send();
}


function getTutorsPromise() {
    var xhttp = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    console.log("getTutors(): Data fetched successfully");

                    var resData = JSON.parse(xhttp.responseText);

                    resolve(resData);
                } else {
                    reject({
                        status: xhttp.status,
                        statusText: xhttp.statusText
                    });
                }
            }
        }
        xhttp.open("GET", "http://localhost:4000/tutors/", true);
        xhttp.send();
    })
}


function getOneTutor(ID, callback) {
    var xhttp = new XMLHttpRequest();
    var tutorData;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("getOneTutor(): Data fetched successfully");

            var resData = JSON.parse(xhttp.responseText);

            tutorData = resData;

            callback(tutorData);
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


function updateTutor (ID, tutor) {
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:4000/tutors/update/" + ID, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("updateTutor(): Data sent successfully");
        }
    }
    xhttp.send(JSON.stringify(tutor));
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
function populateCoursesArray (callback) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("getCourses(): Data fetched successfully");

            var resData = JSON.parse(xhttp.responseText);
            coursesDB = resData;

            for (var i = 0; i < resData.length; i++) {
                courses.push(resData[i].courseCode);
            }

            callback(courses);
        }
    }
    xhttp.open("GET", "http://localhost:4000/courses/");
    xhttp.send();
}


function getCoursesPromise() {
    var xhttp = new XMLHttpRequest();
    var thisCourses = [];

    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    console.log("getCourses(): Data fetched successfully");

                    var resData = JSON.parse(xhttp.responseText);

                    for (var i = 0; i < resData.length; i++) {
                        thisCourses.push(resData[i].courseCode);
                    }

                    resolve(thisCourses);
                } else {
                    reject({
                        status: xhttp.status,
                        statusText: xhttp.statusText
                    });
                }
            }
        }
        xhttp.open("GET", "http://localhost:4000/courses/");
        xhttp.send();
    })
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
