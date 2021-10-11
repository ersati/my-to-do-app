const Self = require("../modules/SelfDevelopment/SelfModel")
const selfsTasks = require("../modules/SelfDevelopment/SelfTask")

const self =  (req, res) => {
    Self.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Self.insertMany(selfsTasks, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(foundItems)
                    console.log("Successfully saved default items to DB self")
                }
            })
            res.redirect("/self-development")
        } else {
            res.render('self-development', {
                self: foundItems,
                param: 'Self Development'
            })
        }
    })
}

const addSelf = (req, res) => {
    const valueInput = req.body.task;

    const item = new Self({
        self: valueInput
    })
    if (valueInput !== '') {
        item.save()
        res.redirect('/self-development')
    } else {
        res.redirect('/self-development')
    }
}

const deleteSelf = (req, res) => {
    const index = req.body.checkbox

    Self.findByIdAndRemove(index, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/self-development')
        }
    })
}



module.exports = { self, addSelf, deleteSelf}