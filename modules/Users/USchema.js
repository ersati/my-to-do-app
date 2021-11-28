const mongoose = require("mongoose");

const typeOfTaskSchema = require('./CategorySchema')

module.exports = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    facebookId: String,
    isTaskArrEmpty: Boolean,
    generalTasks: [typeOfTaskSchema],
    
})