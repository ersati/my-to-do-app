const mongoose = require("mongoose");
const taskSchema = require('./TaskSchema')

module.exports = mongoose.model("Do", taskSchema)