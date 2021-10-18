const mongoose = require("mongoose");
const paramSchema = require('./ParamSchema')

module.exports = mongoose.model('ParamModel', paramSchema)