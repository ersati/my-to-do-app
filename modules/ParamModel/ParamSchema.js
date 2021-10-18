const userSchema = require('../UserModel/UserSchema')

module.exports = {
    list: String,
    tasks: [userSchema]
}