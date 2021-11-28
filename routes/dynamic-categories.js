const User = require('../modules/Users/UModel');
const Task = require('../modules/Users/TaskModel');

const getTaskFromDynamicCategory = (req, res) => {
    if (req.user === undefined) {
        res.redirect('/logout')
    }
    const id = req.user._id
    const {
        paramName
    } = req.params
    User.findById({
        _id: id
    }, function (err, profile) {
        if (!err) {
            const isCategoryExists = profile.generalTasks.some(el => el.name === paramName)
            if (!isCategoryExists) {
                res.redirect('/home')
            }
            if (isCategoryExists) {
                const {
                    tasks,
                    name
                } = profile.generalTasks.find(el => el.name === paramName)
                res.render('customCategory', {
                    title: name,
                    paramName: paramName,
                    tasks: tasks,
                })
            }
        } else {
            console.log(err)
        }
    })
}

const addTaskToDynamicCategory = (req, res) => {
    const categoryName = req.params.paramName;
    const taskValue = req.body.task
    const newTask = new Task({
        task: taskValue,
        date: new Date().toLocaleString('en-UK')
    })
    User.findById({
        _id: req.user._id
    }, function (err, profile) {
        if (profile) {
            const {
                tasks
            } = profile.generalTasks.find((el) => el.name === categoryName)
            tasks.push(newTask)
            profile.save()
            res.redirect(`/category/${categoryName}`)
        }
    })
}

const deleteTaskFromDynamicCategory = (req, res) => {
    const id = req.body.idElement;
    const category = req.body.listName;
    const query = {
        _id: req.user._id
    }
    if (category) {
        User.findById(query, function (err, profile) {
            if (profile) {
                const {
                    tasks
                } = profile.generalTasks.find((el) => el.name === category)
                const idTask = tasks.findIndex(el => el._id == id)
                if (idTask !== -1) {
                    tasks.splice(idTask, 1);
                } else {
                    console.log('no elements to delete')
                }
                profile.save()
                res.redirect(`/category/${category}`)
            }
        })
    }
}
module.exports = {
    getTaskFromDynamicCategory,
    addTaskToDynamicCategory,
    deleteTaskFromDynamicCategory
}