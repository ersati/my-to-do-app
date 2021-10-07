const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const e = require('express');
const {
    join,
    identity
} = require('lodash');


const app = express();


app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/favicon.ico', express.static('images/favicon.ico'));


app.use(express.static("public"))

// Mongoose Connection 


mongoose.connect("mongodb://localhost:27017/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
    console.log("Connection Successful!");
});
//Mongoose Connection

const Item = require("./modules/Items/ItemModel.js");
const defaultTask = require("./modules/Items/ItemTask.js");
const listTask = require("./modules/Items/ItemListTasks.js")

//Task Main Page
const List = require("./modules/List/ListModel.js")

//Hobby
const Hobby = require("./modules/Hobby/HobbyModel.js")
const hobbysTasks = require("./modules/Hobby/HobbyTasks")
//Hobby

//Health
const Health = require("./modules/Health/HealthModel")
const healthsTasks = require("./modules/Health/HealthTasks")
//Heatlh

//Finance
const Finance = require("./modules/Finance/FinanceModel")
const financeTasks = require("./modules/Finance/FinanceTasks")
//Finance

const Fandf = require("./modules/FriendsAndFamily/FModel")
const fandfTasks = require("./modules/FriendsAndFamily/FTask")
//Friends and Family 

//self development
const Self = require("./modules/SelfDevelopment/SelfModel")
const selfsTasks = require("./modules/SelfDevelopment/SelfTask")
//self development

// Work
const Work = require("./modules/Work/WorkModel")
const worksTasks = require("./modules/Work/WorkTasks")

const dat = {
    people: '',
    list: ''
}

app.get('/', (req, res) => {

    const list = List.find({}, function (err, data) {
        // console.log(data)
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
            console.log(dat)
            res.render('list', dat)
        }
    })
})

app.get('/work', (req, res) => {
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
            res.redirect("/work")
        } else {
            res.render('work', {
                work: foundItems,
                param: 'work'
            })
        }
    })
})

app.get('/self-development', (req, res) => {
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
                param: 'self'
            })
        }
    })
})

app.get('/hobby', (req, res) => {
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
})

app.get('/health', (req, res) => {
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
})

app.get('/finance', (req, res) => {
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
})

app.get('/fandf', (req, res) => {
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
                param: param
            })
        }
    })
})

app.get('/:paramName', (req, res) => {
    const paramName = req.params.paramName;
    const {
        people,
        list
    } = dat
    param = paramName
    console.log(paramName)
    const listArr = [...list]
    const namesTitle = listArr.map(item => item.list)
    const title = namesTitle.filter(item => !(param.indexOf(item) == -1))
    res.render('own', {
        title: title
    })
})

app.post('/', (req, res) => {
    const valueInput = req.body.name2;
    const listName = req.body.listName;

    console.log(req.body, valueInput)
    const item = new Item({
        name: valueInput
    })
    if (listName === "List") {
        item.save()
        res.redirect('/')
    }
})

app.post('/another-list', (req, res) => {
    const ownList = req.body.ownList
    console.log(ownList)
    const item = new List({
        list: ownList
    })
    item.save()
    res.redirect('/')
})

app.post('/delete', function (req, res) {
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
        console.log(deleteOwnList)
        List.findByIdAndRemove(deleteOwnList, (err) => {
            if (!err) {
                console.log('delete own sukcesfully')
            } else {
                console.log(err)
            }
        })
    }
    res.redirect('/')
})

app.post('/work', (req, res) => {
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
})

app.post('/delete-work', (req, res) => {
    const index = req.body.checkbox
    Work.findByIdAndRemove(index, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/work')
        }
    })
})

app.post('/hobby', (req, res) => {
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
})

app.post('/delete-hobby', (req, res) => {
    const index = req.body.checkbox
    Hobby.findByIdAndRemove(index, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/hobby')
        }
    })
})

app.post('/health', (req, res) => {
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
})

app.post('/delete-health', (req, res) => {
    const index = req.body.checkbox
    Health.findByIdAndRemove(index, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/health')
        }
    })
})

app.post('/finance', (req, res) => {
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
})

app.post('/delete-finance', (req, res) => {
    const index = req.body.checkbox

    Finance.findByIdAndRemove(index, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/finance')
        }
    })
})


app.post('/fandf', (req, res) => {

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


})

app.post('/delete-fandf', (req, res) => {
    const index = req.body.checkbox

    Fandf.findByIdAndRemove(index, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/fandf')
        }
    })
})

app.post('/self', (req, res) => {
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
})

app.post('/delete-self', (req, res) => {
    const index = req.body.checkbox

    Self.findByIdAndRemove(index, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/self-development')
        }
    })
})

app.listen(3000, function () {
    console.log('serwer is working on port 3000')
})