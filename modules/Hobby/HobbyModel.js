const mongoose = require("mongoose");

const hobbySchema = require('./HobbySchema.js');

module.exports = mongoose.model('Hobby', hobbySchema, 'hobby')