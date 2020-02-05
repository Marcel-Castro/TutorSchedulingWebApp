/*
    All arrays in data file are globally available, this is subject to change (especially after database implementation)
*/

// Courses -------------------------------------------------- //

const course1 = "COP1";

const course2 = "COP2";

const course3 = "COP3";

// Course List -------------------------------------------------- //

var courses = [];

courses.push(course1);
courses.push(course2);
courses.push(course3);

// Shifts -------------------------------------------------- //

var sampleShift = {
    day: "Wednesday",
    startTime: 14.5,
    endTime: 21
}

var sampleShift2 = {
    day: "Friday",
    startTime: 8.5,
    endTime: 12
}

var sampleShift3 = {
    day: "Monday",
    startTime: 8,
    endTime: 10
}

var sampleShift4 = {
    day: "Sunday",
    startTime: 8,
    endTime: 13
}

var sampleShift5 = {
    day: "Thursday",
    startTime: 9,
    endTime: 14.5
}

var sampleShift6 = {
    day: "Wednesday",
    startTime: 8,
    endTime: 14
}

var sampleShift7 = {
    day: "Wednesday",
    startTime: 8,
    endTime: 14
}

var sampleShift8 = {
    day: "Monday",
    startTime: 8,
    endTime: 18
}

var sampleShift9 = {
    day: "Friday",
    startTime: 10,
    endTime: 16.5
}

// Tutors -------------------------------------------------- //

var sampleTutor = {
    name: "John Doe",
    courses: [],
    shifts: []
}

sampleTutor.shifts.push(sampleShift5);
sampleTutor.shifts.push(sampleShift4);
sampleTutor.shifts.push(sampleShift);
sampleTutor.shifts.push(sampleShift2);
sampleTutor.shifts.push(sampleShift3);
sampleTutor.shifts.push(sampleShift6);

sampleTutor.courses.push(course1);
sampleTutor.courses.push(course2);

var sampleTutor2 = {
    name: "Jim Foe",
    courses: [],
    shifts: []
}

sampleTutor2.shifts.push(sampleShift7);
sampleTutor2.shifts.push(sampleShift8);
sampleTutor2.shifts.push(sampleShift9);

sampleTutor2.courses.push(course2);
sampleTutor2.courses.push(course3);

// Tutor List -------------------------------------------------- //

var tutors = [];

tutors.push(sampleTutor);
tutors.push(sampleTutor2)