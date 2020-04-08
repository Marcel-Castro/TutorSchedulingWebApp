const router = require('express').Router()
let Tutor = require('../models/tutorModel')

// Get all tutors
router.route('/').get((req, res) => {
    Tutor.find().sort({ name: 'asc'})
        .then(tutors => res.json(tutors))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Get one tutor
router.route('/getTutor/:id').get((req, res) => {
    Tutor.findById(req.params.id)
        .then(tutors => res.json(tutors))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Create tutor
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const shifts = req.body.shifts;
    const courses = req.body.courses;

    const newTutor = new Tutor({
        name,
        shifts,
        courses
    })

    newTutor.save()
        .then(() => res.json('Tutor added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Update tutor
router.route('/update/:id').post((req, res) => {
    Tutor.findById(req.params.id)
        .then(tutor => {
            tutor.name = req.body.name;
            tutor.shifts = req.body.shifts;
            tutor.courses = req.body.courses;

            tutor.save()
                .then(() => res.json('Tutor updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

// Delete tutor
router.route('/deleteOne/:id').delete((req, res) => {
    Tutor.findByIdAndDelete(req.params.id)
        .then(() => res.json('Tutor deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Delete All
router.route('/deleteAll').delete((req, res) => {
    Tutor.deleteMany({})
        .then(() => res.json('All tutors deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router