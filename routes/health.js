const Health = require("../modules/Health/HealthModel")
const healthsTasks = require("../modules/Health/HealthTasks")

const health = (req, res) => {
    Health.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Health.insertMany(healthsTasks, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(foundItems)
                    console.log("Successfully saved default items to DB health")
                }
            })
            res.redirect("/health")
        } else {
            res.render('health', {
                health: foundItems,
                param: 'health'
            })
        }
    })
}

const addHealth = (req, res) => {
    const valueInput = req.body.task;
    const item = new Health({
        health: valueInput
    })
    if (valueInput !== '') {
        item.save()
        res.redirect('/health')
    } else {
        res.redirect('/health')
    }
}

const deleteHealth =  (req, res) => {
    const index = req.body.checkbox
    Health.findByIdAndRemove(index, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/health')
        }
    })
}

module.exports = {health, addHealth, deleteHealth}