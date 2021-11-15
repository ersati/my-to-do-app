const mongoose = require("mongoose");
const typeOfTaskSchema = require('./CategorySchema')

module.exports =mongoose.model('Category', typeOfTaskSchema)