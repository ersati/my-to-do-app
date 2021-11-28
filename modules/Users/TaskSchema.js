const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    task: String,
    date: Date,
  })