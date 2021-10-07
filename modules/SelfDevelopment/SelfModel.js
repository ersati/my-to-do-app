const mongoose = require("mongoose");

const selfsSchema = require("./SelfSchema")


module.exports = mongoose.model('Self', selfsSchema, 'self')