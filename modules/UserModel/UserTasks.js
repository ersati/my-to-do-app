const UserModel= require('./UserModel')

const firstEl = new UserModel({
    name: "Hello everyone in Own section"
})

const secondEl = new UserModel({
    name: "Press the Add button to add tasks in Own section"
})

const thirdEl = new UserModel({
    name: "Press ---> to delete the file in Own section"
})

module.exports = [firstEl, secondEl, thirdEl]