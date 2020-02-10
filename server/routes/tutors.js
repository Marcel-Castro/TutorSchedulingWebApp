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