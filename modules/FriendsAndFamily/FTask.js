const Fandf = require("./FModel")

const firstElFandf = new Fandf({
    fandf: "Hello everyone in Fandf section"
})

const secondElFandf = new Fandf({
    fandf: "Press the Add button to add tasks in Fandf section"
})

const thirdElFandf = new Fandf({
    fandf: "Press <--- to delete the file in Fandf section"
})
module.exports = [firstElFandf, secondElFandf, thirdElFandf]