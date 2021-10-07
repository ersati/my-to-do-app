const mongoose = require("mongoose");
const listSchema = require("./ListSchema.js")

module.exports = mongoose.model("List", listSchema, 'lists')