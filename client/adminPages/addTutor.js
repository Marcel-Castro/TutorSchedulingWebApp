// Returns an array of shifts sorted by day first and starting time second 
// (different from the one found in table which goes by starting time first) TODO -------------
function sortShiftsDayFirst(tutorShifts) {
    var shifts = [];
    var i;

    shifts.push(tutorShifts[0]);

    for (i = 1; i < tutorShifts.length; i++) {
        var j = 0;
        var placed = false;

        while (j < i && placed === false) {
            if (tutorShifts[i].startTime === shifts[j].startTime) {
                var k = j;

                while (shifts[k].startTime === shifts[j].startTime) {
                    if (getDayNumber(tutorShifts[i].day) < getDayNumber(shifts[k].day)) {
                        shifts.splice(k, 0, tutorShifts[i]);
                        placed = true;
                        break;
                    } else if (shifts[k + 1] === undefined || shifts[k + 1].startTime !== shifts[j].startTime) {
                        shifts.splice(k + 1, 0, tutorShifts[i]);
                        placed = true;
                        break;
                    } else {
                        k++;
                    }
                }
            } else if (tutorShifts[i].startTime < shifts[j].startTime) {
                shifts.splice(j, 0, tutorShifts[i]);
                placed = true;
            }
            else if (j >= i - 1) {
                shifts.push(tutorShifts[i]);
                placed = true;
            } else {
                j++;
            }
        }
    }

    return shifts;
}


// Adds the specified tutor's courses to the "add course" list
function populateCourseList(tutor) {
    var courseList = document.getElementById("coursesCovered");

    for (var i = 0; i < tutor.courses.length; i++) {
        var newCard = document.createElement("div");
        newCard.classList.add("card");
        var courseSelector = document.createElement("select");

        var newSpan = document.createElement("span");
        var newText = document.createTextNode("Course Code: ");
        newSpan.classList.add("cardText");
        newSpan.appendChild(newText);
        newCard.appendChild(newSpan);

        // Default option
        var option = document.createElement("option");
        var optionText = document.createTextNode("");
        option.appendChild(optionText);
        option.value = "";

        courseSelector.appendChild(option);

        for (var j = 0; j < courses.length; j++) {
            var option = document.createElement("option");
            var optionText = document.createTextNode(courses[j]);
            option.appendChild(optionText);
            option.value = courses[j];

            if (option.value === tutor.courses[i]) {
                option.selected = "selected";
            }

            courseSelector.appendChild(option);
        }

        newCard.appendChild(courseSelector);
        courseList.appendChild(newCard);
    }
}


// Creates a card for the shift list with the appropriate fields
function createShiftCard (shift) {
    var newCard = document.createElement("div");
    newCard.classList.add("card");
    var daySelector = document.createElement("select");

    // Create array containing all the option names/values
    var optionNames = [
        "", // Default Option
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]

    // Create option for each day
    for (var i = 0; i < optionNames.length; i++) {
        var option = document.createElement("option");
        var optionText = document.createTextNode(optionNames[i]);
        option.appendChild(optionText);
        option.value = optionNames[i];

        if (option.value === shift.day) {
            option.selected = "selected";
        }

        daySelector.appendChild(option);
    }


    newCard.appendChild(daySelector);

    return newCard;
}


// Adds the specifed tutor's shifts to the "add shift" list
function populateShiftList(tutor) {
    var shifts = tutor.shifts;
    var shiftContainer = document.getElementById("shiftsCovered");

    for (var i = 0; i < shifts.length; i++) {
        var shiftCard = createShiftCard(shifts[i]);
        shiftContainer.appendChild(shiftCard);
    }
}


// Sets the "tutor name" field to the name of the specified tutor
function setTutorNameText(tutor) {
    var tutorName = document.getElementById("tutorName");
    tutorName.value = tutor.name;
}


// To be passed into getOneTutor() query function
function getOneTutorCallback (tutor) {
    setTutorNameText(tutor);
    populateShiftList(tutor);
    populateCourseList(tutor);
}


function main() {
    var tutor;

    // Gets tutor ID from page url (if the addTutor page was accessed via a tutor's edit button)
    var queryString = decodeURIComponent(window.location.search);
    // tutor ID is stored in queryString
    queryString = queryString.substring(1);

    getCoursesPromise()
        .then (coursesArray => {
            courses = coursesArray;

            if (queryString !== "") {
                tutor = getOneTutor(queryString, getOneTutorCallback);
            }
        })
        .catch (error => {
            console.log(error)
        })
}