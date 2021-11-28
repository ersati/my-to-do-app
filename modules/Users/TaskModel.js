const mongoose = require("mongoose");
const taskSchema = require('./TaskSchema')

module.exports = new mongoose.model("Do", taskSchema)