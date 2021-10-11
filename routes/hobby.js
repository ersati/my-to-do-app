const Hobby = require("../modules/Hobby/HobbyModel.js")
const hobbysTasks = require("../modules/Hobby/HobbyTasks")

const hobby =(req, res) => {
    Hobby.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Hobby.insertMany(hobbysTasks, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(foundItems)
                    console.log("Successfully saved default items to DB hobby")
                }
            })
            res.redirect("/hobby")
        } else {
            res.render('hobby', {
                hobby: foundItems,
                param: 'hobby'
            })
        }
    })
}

const addHobby = (req, res) => {
    const valueInput = req.body.task;
    console.log(valueInput)
    const item = new Hobby({
        hobby: valueInput
    })
    if (valueInput !== '') {
        item.save()
        res.redirect('/hobby')
    } else {
        res.redirect('/hobby')
    }
}

const deleteHobby =  (req, res) => {
    const index = req.body.checkbox
    Hobby.findByIdAndRemove(index, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/hobby')
        }
    })
}

module.exports = {hobby, addHobby,deleteHobby}