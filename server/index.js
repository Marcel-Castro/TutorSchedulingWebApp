const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Mongodb connection
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Routes
const coursesRouter = require('./routes/courses.js');
const tutorsRouter = require('./routes/tutors.js');
const shiftsRouter = require('./routes/shifts.js');

app.use('/courses', coursesRouter);
app.use('/tutors', tutorsRouter);
app.use('/shifts', shiftsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})