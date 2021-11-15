const mongoose = require("mongoose");
const userSchema = require('./USchema')

module.exports = new mongoose.model("User", userSchema)