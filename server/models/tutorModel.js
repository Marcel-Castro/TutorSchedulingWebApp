const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shiftSchema = new Schema({
    day: { type: String, required: true},
    startTime: { type: Number, required: true},
    endTime: { type: Number, required: true}
})

const tutorSchema = new Schema({
    tutorName: {type: String, required: true},
    shifts: [shiftSchema],
    courses: [{type: String}]
})

const tutor = mongoose.model('Tutor', tutorSchema);
module.exports = tutor;