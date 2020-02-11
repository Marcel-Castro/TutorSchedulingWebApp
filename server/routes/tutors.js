const router = require('express').Router()
let Tutor = require('../models/tutorModel')

// Get all tutors
router.route('/').get((req, res) => {
    Tutor.find()
        .then(tutors => res.json(tutors))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Get tutors by course
router.route('/byCourse/:courseCode').get((req, res) => {
    Tutor.find({courses: req.params.courseCode})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Create tutor
router.route('/add').post((req, res) => {
    const tutorName = req.body.tutorName;
    const shifts = req.body.shifts;
    const course = req.body.courses;

    const newTutor = new Tutor({
        tutorName,
        shifts,
        course
    })

    newTutor.save()
        .then(() => res.json('Tutor added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Update tutor
router.route('/update/:id').post((req, res) => {
    Tutor.findById(req.params.id)
        .then(tutor => {
            tutor.tutorName = req.body.exerciseName;
            tutor.shifts = req.body.notes;
            tutor.courses = req.body.sets;

            tutor.save()
                .then(() => res.json('Tutor updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

// Delete tutor
router.route('/:id').delete((req, res) => {
    Tutor.findByIdAndDelete(req.params.id)
        .then(() => res.json('Tutor deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Delete All
router.route('/deleteAll').delete((req, res) => {
    Tutor.deleteMany({}, callback)
        .then(() => res.json('All tutors deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router