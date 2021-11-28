const User = require('../modules/Users/UModel');
const Task = require('../modules/Users/TaskModel');
const {
    createTaskObj
} = require('../helpers/createTask')

const homePageTasks = (req, res) => {

    const hobby = createTaskObj('Hobby');
    const work = createTaskObj('Work');
    const mainTask = createTaskObj('Main-task');
    const finance = createTaskObj('Finance');
    const health = createTaskObj('Health');
    const friendsAndFamily = createTaskObj('Friends-and-Family')
    const selfDevelopment = createTaskObj('Self-Development')
    if (req.user === undefined) {
        res.redirect('/logout')
    }
    if (req.isAuthenticated()) {
        User.findById({
            _id: req.user._id
        }, function (err, profile) {
            if (!err) {
                if (profile.generalTasks.length === 0) {
                    profile.generalTasks.push(mainTask, work, hobby, finance, health, friendsAndFamily, selfDevelopment);
                    profile.isTaskArrEmpty = false;
                    profile.save()
                    // User.findOneAndUpdate({
                    //     _id: req.user._id
                    // }, {
                    //     isTaskArrEmpty: false,
                    //     generalTasks: allTasksObj
                    // },  
                    // function (err, doc) {
                    // })
                }
                if (!profile.isTaskArrEmpty) {
                    const {
                        tasks
                    } = profile.generalTasks.find((el) => el.name === 'Main-task')
                    const listOfTasks = profile.generalTasks.filter(el => {
                        if (el.name === 'Main-task') {
                            return false
                        }
                        return true
                    }).map(el => el.name);
                    res.render("home", {
                        mainTasks: tasks,
                        lists: listOfTasks
                    })
                }

            }
        })
    } else {
        res.redirect('/login')
    }
}

const createTaskInHome = function (req, res) {
    const valueInput = req.body.addTask;
    const item = new Task({
        task: valueInput,
        date: new Date().toLocaleString('en-UK')
    })
    User.findById({
        _id: req.user._id
    }, function (err, profile) {
        if (profile) {
            const {
                tasks
            } = profile.generalTasks.find((el) => el.name === 'Main-task')
            tasks.push(item)
            profile.save()
            res.redirect('/home')
        }
    })
}

const deleteTaskinHome = function (req, res) {
    const id = req.body.idElement;
    const category = 'Main-task'
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
                res.redirect(`/home`)
            }
        })
    }
}

const createCategories = (req, res) => {
    const nameOfNewCategory = req.body.customCategory;
    const query = {
        _id: req.user._id
    }
    User.findById(query, function (err, profile) {
        if (!err) {
            const isCategoryExists = profile.generalTasks.some(el => el.name === nameOfNewCategory)
            if (!isCategoryExists) {
                const newCategory = createTaskObj(nameOfNewCategory)
                profile.generalTasks.push(newCategory)
                profile.save()
            }
        }
    })
    res.redirect('/home')
}
const deleteCategories = (req, res) => {
    const category = req.body.catName;
    const query = {
        _id: req.user._id
    }
    if (category) {
        User.findById(query, function (err, profile) {
            if (!err) {
                const idCategory = profile.generalTasks.findIndex(el => el.name == category)
                if (idCategory !== -1) {
                    profile.generalTasks.splice(idCategory, 1);
                } else {
                    console.log('no elements to delete')
                }
                profile.save()
                res.redirect(`/home`)
            }
        })
    }
}

module.exports = {
    homePageTasks,
    createTaskInHome,
    deleteTaskinHome,
    createCategories,
    deleteCategories
}