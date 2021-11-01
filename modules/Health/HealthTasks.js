const Health = require("./HealthModel")

const firstElHealth = new Health({
    health: "Hello everyone in health section"
})

const secondElHealth = new Health({
    health: "Press the Add button to add tasks in health section"
})

const thirdElHealth = new Health({
    health: "Press ---> to delete the file in health section"
})
module.exports = [firstElHealth, secondElHealth, thirdElHealth]