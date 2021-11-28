
const User =require('../modules/Users/UModel');
const Task =require('../modules/Users/TaskModel');
const {createTaskObj} = require('../helpers/createTask')

const homePageTasks = (req, res) => {

    const hobby = createTaskObj('Hobby');
    const work = createTaskObj('Work');
    const mainTask = createTaskObj('Main-task');
    const finance = createTaskObj('Finance');
    const health = createTaskObj('Health');
    const friendsAndFamily = createTaskObj('Friends-and-Family')
    const selfDevelopment = createTaskObj('Self-Development')
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
                if(!profile.isTaskArrEmpty){
                    const {tasks} = profile.generalTasks.find((el) => el.name === 'Main-task')
                    const listOfTasks = profile.generalTasks.filter(el => {
                        if (el.name === 'Main-task') {
                            return false
                        }
                        return true
                    }).map(el => el.name);
                    res.render("home", {mainTasks: tasks, lists: listOfTasks})
                }

            }
        })

        // res.render("home")
    } else {
        res.redirect('/login')
    }
}



// const customCategory = (req, res) => {
//     User.findById({ _id: req.user._id}, function(err, profile){
//         if(!err) {
//            console.log( profile.generalTasks.some(el => el.name === req.params.paramName))




//         } else {
//             console.log(err)
//         }
//     })
// }


// const ParamModel = require('../modules/ParamModel/ParamModel');
// const UserModel = require('../modules/UserModel/UserModel');
// const allTask = require('../modules/UserModel/UserTasks')

// const own = (req, res) => {
//     const paramName = req.params.paramName;
//     ParamModel.findOne({
//         list: paramName
//     }, function (err, result) {
//         if (!err) {
//             if (!result) {
//                 console.log('doesnt exist')
//                 const l = new ParamModel({
//                     list: paramName,
//                     tasks: allTask
//                 })
//                 l.save()
//             } else {
//                 console.log('exist')
//                 res.render('own', {
//                     title: result.list,
//                     paramName: paramName,
//                     tasks: result.tasks
//                 })
//             }
//         } else {
//             console.log(err)
//         }
//     })

// }

// const addOwn = function (req, res) {
//     const paramName = req.params.paramName;
//     const valueInput = req.body.task;
//     const item = new UserModel({
//         name: valueInput
//     })
//     ParamModel.findOne({
//         list: paramName
//     }, function (err, foundList) {
//         if (foundList) {
//             foundList.tasks.push(item);
//             foundList.save();
//             res.redirect('/cat/' + paramName)
//         }
//     })
// }

// const deleteOwn = function (req, res) {
//     const itemId = req.body.checkbox;
//     const listName = req.body.listName;
//     if (listName) {
//         ParamModel.findOneAndUpdate({
//             list: listName
//         }, {
//             $pull: {
//                 tasks: {
//                     _id: itemId
//                 }
//             }
//         }, function (err, foundItem) {
//             if (!err) {
//                 res.redirect('/cat/' + listName)
//             }
//         })
//     }
// }

module.exports = {
    homePageTasks
}