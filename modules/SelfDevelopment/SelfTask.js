const Self = require('./SelfModel')

const firstElSelf = new Self({
    self: "Hello everyone in Self section"
})

const secondElSelf = new Self({
    self: "Press the Add button to add tasks in Self section"
})

const thirdElSelf = new Self({
    self: "Press ---> to delete the file in Self section"
})
module.exports = [firstElSelf, secondElSelf, thirdElSelf]