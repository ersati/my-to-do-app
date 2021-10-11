const Work = require("../modules/Work/WorkModel")
const worksTasks = require("../modules/Work/WorkTasks")

const work = (req, res) =>{
    Work.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Work.insertMany(worksTasks, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(foundItems)
                    console.log("Successfully saved default items to DB Work")
                }
            })
            // console.log('redirectioning')
            res.redirect("/work")
        } else {
            res.render('work', {
                work: foundItems,
                param: 'work'
            })
            // console.log('renderin g')
        }
    })
}

const addWork = (req, res) => {
    const valueInput = req.body.task;
    const item = new Work({
        work: valueInput
    })
    if (valueInput !== '') {
        item.save()
        res.redirect('/work')
    } else {
        res.redirect('/work')
    }
}

const deleteWork = (req, res) => {
    const index = req.body.checkbox
    Work.findByIdAndRemove(index, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/work')
        }
    })
}

module.exports = {work, addWork, deleteWork}