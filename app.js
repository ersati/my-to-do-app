const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const e = require('express');
const {
    join
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

//Task Main Page

const itemsSchema = {
    name: String,
    list: String
}

const Item = mongoose.model("Item", itemsSchema, 'tasks')


const task = new Item({
    name: "Hello everyone"
})
const task1 = new Item({
    name: "Press the Add button to add tasks"
})

const task2 = new Item({
    name: "Press <--- to delete the file"
})


//Task Main Page

const tasksSchema = {
    list: String
}
const listSchema = {
    task: String
}
const List = mongoose.model("List", listSchema, 'lists')

const hobb = new Item({
    list: "Hobby"
})

const heal = new Item({
    list: "Health"
})

const fin = new Item({
    list: "Finance"
})
const listTask = [hobb, heal, fin]


const defaultTask = [task, task1, task2]


//Hobby

const hobbySchema = {
    hobby: String
}
const Hobby = mongoose.model('Hobby', hobbySchema, 'hobby')

const firstElHobby = new Hobby({
    hobby: "Hello everyone in Hobby section"
})

const secondElHobby = new Hobby({
    hobby: "Press the Add button to add tasks in Hobby section"
})

const thirdElHobby = new Hobby({
    hobby: "Press <--- to delete the file in Hobby section"
})
const hobbysTasks = [firstElHobby, secondElHobby, thirdElHobby]

//Hobby

//Health

const healthsSchema = {
    health: String
}
const Health = mongoose.model('Health', healthsSchema, 'health')

const firstElHealth = new Health({
    health: "Hello everyone in health section"
})

const secondElHealth = new Health({
    health: "Press the Add button to add tasks in health section"
})

const thirdElHealth = new Health({
    health: "Press <--- to delete the file in health section"
})
const healthsTasks = [firstElHealth, secondElHealth, thirdElHealth]
//Heatlh

//Finance

const financeSchema = {
    finance: String
}
const Finance = mongoose.model('Finance', financeSchema, 'finance')

const firstElFinance = new Finance({
    finance: "Hello everyone in Finance section"
})

const secondElFinance = new Finance({
    finance: "Press the Add button to add tasks in Finance section"
})

const thirdElFinance = new Finance({
    finance: "Press <--- to delete the file in Finance section"
})
const financeTasks = [firstElFinance, secondElFinance, thirdElFinance]


//Finance


// Friends and Family
const fandfSchema = {
    fandf: String
}
const Fandf = mongoose.model('Fandf', fandfSchema, 'fandf')

const firstElFandf = new Fandf({
    fandf: "Hello everyone in Fandf section"
})

const secondElFandf = new Fandf({
    fandf: "Press the Add button to add tasks in Fandf section"
})

const thirdElFandf = new Fandf({
    fandf: "Press <--- to delete the file in Fandf section"
})
const fandfTasks = [firstElFandf, secondElFandf, thirdElFandf]
//Friends and Family 


//self development
const selfsSchema = {
    self: String
}
const Self = mongoose.model('Self', selfsSchema, 'self')

const firstElSelf = new Self({
    self: "Hello everyone in Self section"
})

const secondElSelf = new Self({
    self: "Press the Add button to add tasks in Self section"
})

const thirdElSelf = new Self({
    self: "Press <--- to delete the file in Self section"
})
const selfsTasks = [firstElSelf, secondElSelf, thirdElSelf]

//self development

// Work
const worksSchema = {
    work: String
}
const Work = mongoose.model('Work', worksSchema, 'work')

const firstElWork = new Work({
    work: "Hello everyone in Work section"
})

const secondElWork = new Work({
    work: "Press the Add button to add tasks in Work section"
})

const thirdElWork = new Work({
    work: "Press <--- to delete the file in Work section"
})
const worksTasks = [firstElWork, secondElWork, thirdElWork]

//Work
const arr = []
// const list = []
const hobby = [];
const health = [];
const finance = [];
const fandf = [];
const self = [];
const work = []
let param = '';

const listArr = []

const list = List.find({}, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        listArr.push(data)
        console.log([listArr, ...data])
    }
})

app.get('/', (req, res) => {
    console.log(listArr[0])
    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultTask, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(foundItems)
                    console.log("Successfully saved default items to DB item")
                }
            })
            res.redirect("/")
        } else {
            res.render('list', {
                people: foundItems,
                list: listArr[0]
            })
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
                param: param
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
                param: param
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
                param: param
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
                param: param
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
    param = paramName
    const namesTitle = listArr[0].map(item => item.list)
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
    list.push(ownList);
    res.redirect('/')
})

app.post('/delete', (req, res) => {
    const deleteInput = req.body.checkbox
    const deleteOwnList = req.body.checkboxown
    if (deleteOwnList > -1) {
        list.splice(deleteOwnList, 1)
    } else {
        Item.findByIdAndRemove(index, (err) => {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/')
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