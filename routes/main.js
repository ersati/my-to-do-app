const dat = require("./data")
const Item = require("../modules/Items/ItemModel.js");
const defaultTask = require("../modules/Items/ItemTask.js");
const listTask = require("../modules/Items/ItemListTasks.js")
const _ = require('lodash');
//Task Main Page
const List = require("../modules/List/ListModel.js")
const ParamModel = require("../modules/ParamModel/ParamModel")
const allTask = require('../modules/UserModel/UserTasks')

const main = (req, res) => {
    res.redirect('/home')
    if (req.user) {
        res.redirect('/home')
    }

    ParamModel.find({}, function (err, ids){
        if(!err){
            dat.id = ids
        }else {
            console.log(err)
        }
    })
    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultTask, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Successfully saved default items to DB item")
                }
            })
            res.redirect("/")
        } else {
            dat.people = foundItems
            res.render('list', dat)
        }
    })
}

const addTasktoMain = (req, res) => {
    const valueInput = req.body.name2;
    const listName = req.body.listName;
    const item = new Item({
        name: valueInput
    })
    if (listName === "List") {
        item.save()
        res.redirect('/')
    }
}

const addList = (req, res) => {
    const ownList = _.capitalize(req.body.ownList)
    console.log(ownList)
    ParamModel.findOne({list: ownList}, function(err, foundItem){
        if(!err){
            if(!foundItem){
                const item = new ParamModel({
                    list: ownList,
                    tasks: allTask
                })
                item.save()
            }
        }else {
            console.log('addlist in mainjs:' + err)
        }
    })

    

    res.redirect('/')
}

const deleteMain = function (req, res) {
    const deleteInput = req.body.checkbox
    const deleteOwnList = req.body.checkboxown
    const hidList = req.body.hiddenList
    console.log(deleteInput, deleteOwnList)
    if (deleteInput) {
        Item.findByIdAndRemove(deleteInput, (err) => {
            if (!err) {
                console.log('delete sukcesfully')
            } else {
                console.log(err)
            }
        })
    }
    if (deleteOwnList) {
      ParamModel.findOneAndRemove({_id: hidList}, function (err, obj){
            if(!err){
                console.log(`deleted: ${obj}`)
            }else {
                console.log(err)
            }
        })
    }
    res.redirect('/')
}

module.exports = {
    main,
    addTasktoMain,
    addList,
    deleteMain
}