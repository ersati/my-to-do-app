const Finance = require("./FinanceModel")

const firstElFinance = new Finance({
    finance: "Hello everyone in Finance section"
})

const secondElFinance = new Finance({
    finance: "Press the Add button to add tasks in Finance section"
})

const thirdElFinance = new Finance({
    finance: "Press <--- to delete the file in Finance section"
})
module.exports = [firstElFinance, secondElFinance, thirdElFinance]