
const User =require('../modules/Users/UModel');
const Task =require('../modules/Users/TaskModel');

const customCategory = (req, res) => {
    User.findById({ _id: req.user._id}, function(err, profile){
        if(!err) {
           console.log( profile.generalTasks.some(el => el.name === req.params.paramName))




        } else {
            console.log(err)
        }
    })
}


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
    customCategory
}