const mongoose = require("mongoose");

const itemsSchema = require("./ItemSchema.js")


module.exports = mongoose.model("Item", itemsSchema, 'tasks')