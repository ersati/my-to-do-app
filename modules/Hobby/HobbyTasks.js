const Hobby = require("./HobbyModel.js")

const firstElHobby = new Hobby({
    hobby: "Hello everyone in Hobby section"
})

const secondElHobby = new Hobby({
    hobby: "Press the Add button to add tasks in Hobby section"
})

const thirdElHobby = new Hobby({
    hobby: "Press <--- to delete the file in Hobby section"
})

module.exports = [firstElHobby, secondElHobby, thirdElHobby]
