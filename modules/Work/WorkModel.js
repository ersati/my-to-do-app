const mongoose = require("mongoose");

const worksSchema = require("./WorkSchema");

module.exports = mongoose.model('Work', worksSchema, 'work')