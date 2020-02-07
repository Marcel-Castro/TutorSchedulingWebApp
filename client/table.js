// First and last time slots in the table in military time
const START_TIME = 8;
const END_TIME = 24;

// Calculate how many cells a shift should cover on the table
function calculateRowSpan(shift) {
    var rowSpan = shift.endTime - shift.startTime;

    rowSpan = (rowSpan / .5) + 1;

    return rowSpan;
}

// Assign numerical value to day of the week
function getDayNumber(day) {
    if (day === "Monday") {
        return 1;
    } else if (day === "Tuesday") {
        return 2;
    } else if (day === "Wednesday") {
        return 3;
    } else if (day === "Thursday") {
        return 4;
    } else if (day === "Friday") {
        return 5;
    } else if (day === "Saturday") {
        return 6;
    } else {
        return 7;
    }
}

// Returns an array of shifts sorted by starting time first and day second
function sortShifts(tutorShifts) {
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
                    } else if (shifts[k + 1].startTime !== shifts[j].startTime) {
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

// Get array containing only the shifts of tutors who cover specified course
function getShiftsByCourse (tutors, course) {
    var shifts = [];

    for (var i = 0; i < tutors.length; i++) {
        var covered = false;

        for (var j = 0; j < tutors[i].courses.length; j++) {
            if (tutors[i].courses[j] === course) {
                covered = true;
            }
        }

        if (covered === true) {
            for (var j = 0; j < tutors[i].shifts.length; j++) {
                shifts.push(tutors[i].shifts[j]);
            }
        }
    }

    return shifts;
}

// Removes duplicate shifts in a list of shifts
function removeDuplicates (shifts) {
    for (var i = 0; i < shifts.length; i++) {
        for (var j = 0; j < shifts.length; j++) {
            if (shifts[i].day === shifts[j].day && shifts[i].startTime === shifts[j].startTime 
                && shifts[i].endTime === shifts[j].endTime && i !== j) {
                shifts.splice(j, 1);
            }
        }
    }

    return shifts;
}

// Take an array of shifts and join shifts with overlapping times into single elements
function joinOverlapping (shifts) {
    for (var i = 0; i < shifts.length; i++) {
        for (var j = 0; j < shifts.length; j++) {
            if (shifts[i] !== undefined && shifts[j] !== undefined) {
                if (getDayNumber(shifts[i].day) === getDayNumber(shifts[j].day) && i !== j) {
                    var overlap = false;
                    var shiftDay = shifts[i].day;
                    var newStartTime;
                    var newEndTime;
    
                    // Same start time
                    if (shifts[i].startTime === shifts[j].startTime) {
                        newStartTime = shifts[i].startTime;
                        overlap = true;
                    // i starts earlier, j starts before i finishes
                    } else if (shifts[i].startTime < shifts[j].startTime && shifts[i].endTime >= shifts[j].startTime) {
                        newStartTime = shifts[i].startTime;
                        overlap = true;
                    // j starts earlier, i starts before j finishes
                    } else if (shifts[i].startTime > shifts[j].startTime && shifts[i].startTime <= shifts[j].endTime) {
                        newStartTime = shifts[j].startTime;
                        overlap = true;
                    }
    
                    if (overlap === true) {
                        if (shifts[i].endTime > shifts[j].endTime) {
                            newEndTime = shifts[i].endTime;
                        } else {
                            newEndTime = shifts[j].endTime;
                        }
    
                        var newShift = {
                            day: shiftDay,
                            startTime: newStartTime,
                            endTime: newEndTime
                        }

                        // Accounting for the fact that splice() may shift element indexes
                        if (i > j) {
                            shifts.splice(i, 1);
                            shifts.splice(j, 1);
                        } else {
                            shifts.splice(i, 1);
                            shifts.splice(j - 1, 1);
                        }

                        shifts.splice(0, 0, newShift);
                    }
                }
            }
        }
        // console.log("Step: ", shifts.slice());
    }

    return shifts;
}

// Creates a list of all the shifts covered by tutors who cover the specified course
function condenseTutorShifts (tutors, course) {
    var shifts = [];

    // Create array containing only the shifts of tutors who cover specified course
    shifts = getShiftsByCourse(tutors, course);

    console.log("Course Selection: ", shifts.slice());

    // Remove duplicate shifts
    shifts = removeDuplicates(shifts);

    console.log("Duplicates Removed: ", shifts.slice());

    // Join shifts with overlapping times together
    shifts = joinOverlapping(shifts);

    return shifts;
}

// Allocate one or more shifts into the table and fill the rest of the table with empty cells
function populateTableShifts(shiftList) {
    var currentID;
    var shifts = sortShifts(shiftList);
    var i = 0;

    for (currentID = START_TIME; currentID <= END_TIME; currentID = currentID + .5) {
        for (var j = 1; j <= 7; j++) {
            const rowspan = calculateRowSpan(shifts[i]);

            if (currentID === shifts[i].startTime && getDayNumber(shifts[i].day) === j) {
                // Create and append shift cell with appropriate rowspan
                var newCell = document.createElement("td");
                var newContainer = document.createElement("div");
                var newSpan = document.createElement("span");
                var newText = document.createTextNode(shifts[i].day + " from " + shifts[i].startTime + " to " + shifts[i].endTime);
                newSpan.appendChild(newText);
                newSpan.classList.add("shiftText");
                newContainer.appendChild(newSpan);
                newContainer.classList.add("shiftDiv");
                newCell.setAttribute("rowspan", String(rowspan));
                newCell.classList.add("shiftCell");
                newCell.appendChild(newContainer);
                document.getElementById("time_" + String(currentID)).appendChild(newCell);

                if (i < shifts.length - 1) {
                    i++;
                }
            } else {
                var occupied = false;

                for (var k = 0; k <= i; k++) {
                    if (getDayNumber(shifts[k].day) === j) {
                        if (shifts[k].endTime >= currentID && shifts[k].startTime <= currentID) {
                            occupied = true;
                        }
                    }
                }

                if (occupied === false) {
                    // Create and append empty cell element
                    var newElement = document.createElement("td");
                    document.getElementById("time_" + String(currentID)).appendChild(newElement);
                }
            }
        }
    }
}

// Populate table with empty cells (represents default state of table)
function fillTable() {
    for (currentID = START_TIME; currentID <= END_TIME; currentID = currentID + .5) {
        for (var i = 1; i <= 7; i++) {
            var newElement = document.createElement("td");
            document.getElementById("time_" + String(currentID)).appendChild(newElement);
        }
    }
}

// Remove all data cells from the table
function removeDataCells() {
    var cells = document.getElementsByTagName("TD");
    const length = cells.length;
    for (var i = 0; i < length; i++) {
        cells[0].parentNode.removeChild(cells[0]);
    }
}

// Get the shift list from a single tutor
function getTutorShifts(tutorList, tutorName) {
    var tutor = tutorList.filter(tutor => (tutor.name === tutorName));

    return tutor[0].shifts;
}