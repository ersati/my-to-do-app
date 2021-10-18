const mongoose = require("mongoose");
const userSchema = require("./UserSchema")

module.exports = mongoose.model('UserModel',userSchema);