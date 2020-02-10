const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    courseCode: {type: String, required: true}
})

const course = mongoose.model('Course', courseSchema);
module.exports = course;