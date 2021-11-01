const Work = require('./WorkModel')

const firstElWork = new Work({
    work: "Hello everyone in Work section"
})

const secondElWork = new Work({
    work: "Press the Add button to add tasks in Work section"
})

const thirdElWork = new Work({
    work: "Press ---> to delete the file in Work section"
})
module.exports = [firstElWork, secondElWork, thirdElWork]