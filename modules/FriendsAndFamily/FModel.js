const mongoose = require("mongoose");

const fandfSchema = require("./FSchema")

module.exports = mongoose.model('Fandf', fandfSchema, 'fandf')