const router = require('express').Router()
let Course = require('../models/courseModel')

// Get all courses
router.route('/').get((req, res) => {
    Course.find()
        .then(course => res.json(course))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Create course
router.route('/add').post((req, res) => {
    const courseCode = req.body.courseCode

    const newCourse = new User({
        courseCode
    })

    newCourse.save()
        .then(() => res.json('Course added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Delete course
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Course deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router