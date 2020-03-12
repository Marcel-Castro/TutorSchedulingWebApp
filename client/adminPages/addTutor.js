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