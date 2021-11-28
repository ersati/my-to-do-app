const Task = require('../modules/Users/TaskModel');
const CategoryTask = require('../modules/Users/CategoryModel');

function createTaskObj(taskName) {
    const firstTask = new Task({
        task: "Hello everyone"
    })
    const secondTask = new Task({
        task: `Press the Add button to add ${taskName}`
    })
    const thirdTask = new Task({
        task: "Press ---> to delete the file"
    })
    return new CategoryTask({
        name: taskName,
        tasks: [firstTask, secondTask, thirdTask]
    })
}

module.exports = {createTaskObj}