const Finance = require("../modules/Finance/FinanceModel")
const financeTasks = require("../modules/Finance/FinanceTasks")

const finance = (req, res) => {
    Finance.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Finance.insertMany(financeTasks, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(foundItems)
                    console.log("Successfully saved default items to DB finance")
                }
            })
            res.redirect("/finance")
        } else {
            res.render('finance', {
                finance: foundItems,
                param: 'finance'
            })
        }
    })
}

const addFinance = (req, res) => {
    const valueInput = req.body.task;
    const item = new Finance({
        finance: valueInput
    })
    if (valueInput !== '') {
        item.save()
        res.redirect('/finance')
    } else {
        res.redirect('/finance')
    }
}

const deleteFinance =  (req, res) => {
    const index = req.body.checkbox

    Finance.findByIdAndRemove(index, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/finance')
        }
    })
}


module.exports = {finance, addFinance, deleteFinance}