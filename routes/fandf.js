const Fandf = require("../modules/FriendsAndFamily/FModel")
const fandfTasks = require("../modules/FriendsAndFamily/FTask")

const fandf = (req, res) => {
    Fandf.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Fandf.insertMany(fandfTasks, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(foundItems)
                    console.log("Successfully saved default items to DB fandf")
                }
            })
            res.redirect("/fandf")
        } else {
            res.render('fandf', {
                fandf: foundItems,
                // param: param
                param: 'Friends and Family'
            })
        }
    })
}

const addFandf = (req, res) => {

    const valueInput = req.body.task;

    const item = new Fandf({
        fandf: valueInput
    })
    if (valueInput !== '') {
        item.save()
        res.redirect('/fandf')
    } else {
        res.redirect('/fandf')
    }


}

const deleteFandf = (req, res) => {
    const index = req.body.checkbox

    Fandf.findByIdAndRemove(index, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/fandf')
        }
    })
}

module.exports={fandf, addFandf, deleteFandf}