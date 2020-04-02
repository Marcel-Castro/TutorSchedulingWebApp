// Create cards for each tutor with all corresponding functionality
function populateTutorList (tutors) {
    var tutorList = document.getElementById("tutorList");

    for (var i = 0; i < tutors.length; i++) {
        // Closure
        (function () {
            // Create card with tutor name
            var newContainer = document.createElement("div");
            newContainer.classList.add("tutorCard");
            var newSpan = document.createElement("span");
            newSpan.classList.add("tutorCardSpan");
            var newText = document.createTextNode(tutors[i].name);
            newSpan.appendChild(newText);
            newContainer.appendChild(newSpan);

            // These need to be declared and initialized outside of the event listener
            // tutors is not available to the event listeners after this function runs
            var thisCourses = tutors[i].courses;
            var thisShifts = tutors[i].shifts;
            var tutorName = tutors[i].name;
            var tutorID = tutors[i]._id;

            // Add card onClick event listener
            newContainer.addEventListener("click", (event) => {
                var coursesList = document.getElementById("coursesCovered");
                var shiftsList = document.getElementById("shiftsCovered");
                var courses = thisCourses;
                var shifts = thisShifts;

                // Clear current contents of the element
                coursesList.innerHTML = "";
                // Add contents related to this card
                for (var j = 0; j < courses.length; j++) {
                    var coursesSpan = document.createElement("span");
                    var courseText = document.createTextNode(courses[j]);
                    coursesSpan.appendChild(courseText);
                    coursesSpan.classList.add("listSpan");
                    coursesList.appendChild(coursesSpan);
                }

                // Clear current contents of the element
                shiftsList.innerHTML = "";
                // Add contents related to this card
                for (var j = 0; j < shifts.length; j++) {
                    var tutorsSpan = document.createElement("span");
                    var tutorText = document.createTextNode(shifts[j].day 
                        + " from " + getTimeFromID(shifts[j].startTime) + " to " + getTimeFromID(shifts[j].endTime));
                    tutorsSpan.appendChild(tutorText);
                    tutorsSpan.classList.add("listSpan");
                    shiftsList.appendChild(tutorsSpan);
                }

                setCardFocus(newContainer, "tutor");
            })

            // Create and add edit button to card
            var editButton = document.createElement("button");
            editButton.classList.add("tutorCardButton");
            var editText = document.createTextNode("Edit");
            editButton.appendChild(editText);

            // Add edit button functionality
            editButton.addEventListener("click", (event) => {
                window.location.href = "./addTutor_Page/addTutor.html" + "?" + tutorID;
            })

            // Create and add delete button to card
            var deleteButton = document.createElement("button");
            deleteButton.classList.add("tutorCardButton");
            var deleteText = document.createTextNode("Delete");
            deleteButton.appendChild(deleteText);

            // Add delete button functionality
            deleteButton.addEventListener("click", (event) => {
                if (confirm("Delete " + tutorName + "?")) {
                    deleteTutor(tutorID);
                    location.reload();
                }
            })

            // Add buttons to card
            var buttonWrapper = document.createElement("div");
            buttonWrapper.classList.add("buttonWrapper");
            buttonWrapper.appendChild(editButton);
            buttonWrapper.appendChild(deleteButton);
            newContainer.appendChild(buttonWrapper);

            // Add card to tutor list
            tutorList.appendChild(newContainer);
        }) ();
    }
}


function main () {
    populateTutorsArray(populateTutorList);
}