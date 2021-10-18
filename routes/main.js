const dat = require("./data")
const Item = require("../modules/Items/ItemModel.js");
const defaultTask = require("../modules/Items/ItemTask.js");
const listTask = require("../modules/Items/ItemListTasks.js")
const _ = require('lodash');
//Task Main Page
const List = require("../modules/List/ListModel.js")

const main = (req, res) => {

    const list = List.find({}, function (err, data) {
        if (data.length === 0) {
            List.insertMany(listTask, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    listArr.push(data)
                    console.log("Successfully saved default items to DB lists")
                }
            })
        } else {
            if (err) {
                console.log(err)
            } else {
                dat.list = data;
            }
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
    const item = new List({
        list: ownList
    })
    item.save()
    res.redirect('/')
}

const deleteMain = function (req, res) {
    const deleteInput = req.body.checkbox
    const deleteOwnList = req.body.checkboxown
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
        List.findByIdAndRemove(deleteOwnList, (err) => {
            if (!err) {
                console.log('delete own sukcesfully')
            } else {
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