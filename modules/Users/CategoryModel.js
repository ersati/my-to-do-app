const mongoose = require("mongoose");
const typeOfTaskSchema = require('./CategorySchema')

module.exports = new mongoose.model('Category', typeOfTaskSchema)