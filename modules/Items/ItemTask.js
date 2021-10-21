
const Item = require("./ItemModel")

const task = new Item({
    name: "Hello everyone"
})
const task1 = new Item({
    name: "Press the Add button to add tasks"
})

const task2 = new Item({
    name: "Press ---> to delete the file"
})

module.exports =  [task, task1, task2]
