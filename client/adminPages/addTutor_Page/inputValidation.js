// Input validation related warnings for shift cards
const NO_SHIFTS = "No shifts were added to this tutor!";
const EMPTY_SHIFT_FIELDS = "There are empty fields in one or more shifts!";
const INVALID_TIMES = "Starting time is greater than or equal to ending time in one or more shifts!";
const OVERLAP_SHIFTS = "There are shifts with overlapping times on the same day!";

// Input validation related warnings for course cards
const NO_COURSES = "No courses were added to this tutor!";
const EMPTY_COURSE_FIELD = "There are empty fields in one or more courses!";
const DUPLICATE_COURSES = "There are duplicate courses!";

// Input validation related warnings for name field
const NO_NAME = "A name was not provided for this tutor!"

function validateShiftInput(shifts) {
    var shiftLength = shifts.length;

    // Check if there are shifts added at all
    if (shiftLength <= 0) {
        alert(NO_SHIFTS);
        return "Invalid";
    }

    // Check for blank values or simple invalid times
    for (var i = 0; i < shiftLength; i++) {
        if (shifts[i].day === "" || shifts[i].startTime === 0 || shifts[i].endTime === 0) {
            // Alert: Missing fields
            alert(EMPTY_SHIFT_FIELDS);
            return "Invalid";
        }

        if (shifts[i].endTime <= shifts[i].startTime) {
            // Alert: A shift has invalid times (It ends earlier than it starts or at the same time)
            alert(INVALID_TIMES);
            return "Invalid";
        }
    }

    // Check for overlapping shifts
    for (var i = 0; i < shiftLength; i++) {
        for (var j = 0; j < shiftLength; j++) {
            if (i === j) {
                continue;
            }

            if (shifts[i].day === shifts[j].day) {
                /*
                    Overlap if:
                    - Same start time
                    - i.startTime < j.startTime && i.endTime > j.startTime
                    - i.startTime > j.startTime && j.endTime > i.startTime
                */
                if (shifts[i].startTime === shifts[j].startTime || 
                    (shifts[i].startTime < shifts[j].startTime && shifts[i].endTime > shifts[j].startTime) ||
                    (shifts[i].startTime < shifts[j].startTime && shifts[i].endTime > shifts[j].startTime)) {
                        // Alert: There are shifts with overlapping times on the same day
                        alert(OVERLAP_SHIFTS);
                        return "Invalid";
                }
            }
        }
    }
}


function validateCourseInput(courseList) {
    var courseLength = courseList.length;

    // Check if there are courses added at all
    if (courseLength <= 0) {
        alert(NO_COURSES);
        return "Invalid";
    }

    // Check for empty fields
    for (var i = 0; i < courseLength; i++) {
        if (courseList[i] === "") {
            alert(EMPTY_COURSE_FIELD);
            return "Invalid";
        }
    }

    // Check for duplicates
    for (var i = 0; i < courseLength; i++) {
        for (var j = 0; j < courseLength; j++) {
            if (i === j) {
                continue;
            }

            if (courseList[i] === courseList[j]) {
                alert(DUPLICATE_COURSES);
                return "Invalid";
            }
        }
    }
}


function validateNameInput(name) {
    if (name === "") {
        alert(NO_NAME);
        return "Invalid";
    }
}