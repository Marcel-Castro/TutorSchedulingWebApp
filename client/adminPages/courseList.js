// Alert message displayed when "Add Course" button is pressed while "Course Code" text box is empty
const EMPTY_SUBMIT_WARNING = "A Course Code is Required";

// Get array containing the tutors that cover specified course
function getTutorsByCourse (tutors, course) {
    var tutorsForCourse = [];

    for (var i = 0; i < tutors.length; i++) {
        for (var j = 0; j < tutors[i].courses.length; j++) {
            if (tutors[i].courses[j] === course) {
                tutorsForCourse.push(tutors[i]);
            }
        }
    }

    return tutorsForCourse;
}


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

            var currentCourse = courses[i];

            // Add card onClick event listener
            coursesSpan.addEventListener("click", (event) => {
                var tutorsList = document.getElementById("tutorsCovering");
                var tutorsForCourse = getTutorsByCourse(tutors, currentCourse);

                // Clear current contents of the container element
                tutorsList.innerHTML = "";
                // Create spans for each tutor covering the course
                for (var j = 0; j < tutorsForCourse.length; j++) {
                    var tutorSpan = document.createElement("span");
                    var tutorText = document.createTextNode(tutorsForCourse[j].name);
                    tutorSpan.appendChild(tutorText);
                    tutorSpan.classList.add("listSpan");
                    tutorsList.appendChild(tutorSpan);
                }

                setCardFocus(coursesSpan, "course");
            })

            // Create delete button
            var deleteButton = document.createElement("button");
            deleteButton.classList.add("courseCardButton");
            var deleteText = document.createTextNode("Delete");
            deleteButton.appendChild(deleteText);

            // Add delete button functionality
            deleteButton.addEventListener("click", (event) => {
                if (confirm("Delete " + currentCourse + "?")) {
                    deleteCourse(currentCourse);
                    location.reload();
                }
            })

            // Add button to card
            coursesSpan.appendChild(deleteButton);

            // Add card to course list
            courseList.appendChild(coursesSpan);
        }) ();
    }
}


function addFunctionalSubmit (text, submit) {
    submit.addEventListener("click", (event) => {
        if (text.value === "") {
            alert(EMPTY_SUBMIT_WARNING);
        } else {
            addCourse(text.value);
            location.reload();
        }
    })
}


function main () {
    var inputText = document.getElementById("courseCode");
    var inputSubmit = document.getElementById("submit");
    var form = document.getElementById("form");

    // Disable default behaviour for form (such as reloading page on submit)
    function handleForm (event) { 
        event.preventDefault(); 
    } 
    form.addEventListener('submit', handleForm);

    populateTutorsArray(function () {});
    populateCoursesArray(populateCourseList);

    addFunctionalSubmit(inputText, inputSubmit);
}