const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const e = require('express');
const { join } = require('lodash');


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
const listTask = [hobb, heal,fin]

// List.insertMany(listTask, (err) =>{
//     if(err) console.log(err)
// })
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
const hobbysTasks = [firstElHobby,secondElHobby, thirdElHobby]

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
const healthsTasks = [firstElHealth,secondElHealth, thirdElHealth]


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

const list = List.find({}, function (err, data){
    if(err){
        console.log(err)
    } else {
        listArr.push(data)
        console.log([listArr, ...data])
    }
})
app.get('/', (req, res) => {

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
    res.render('work', {
        work: work,
        param: param
    })
})

app.get('/self-development', (req, res) => {
    res.render('self-development', {
        self: self,
        param: param
    })
})

app.get('/hobby', (req, res) => {
    // res.render('hobby', {
    //     hobby: hobby,
    //     param: param
    // })
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
    // res.render('health', {
    //     health: health,
    //     param: param
    // })

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
    res.render('finance', {
        finance: finance,
        param: param
    })
})
app.get('/fandf', (req, res) => {
    res.render('fandf', {
        fandf: fandf,
        param: param
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
    // const valueInput = req.body.name2;
    // arr.push(valueInput);
    // res.redirect('/')
// old version


const valueInput = req.body.name2;
const listName = req.body.listName;
console.log(req.body, valueInput)
const item = new Item({
    name:valueInput
})


if(listName === "List"){
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
        arr.splice(deleteInput, 1);
    }
    res.redirect('/')
})

app.post('/work', (req, res) => {
    const valueInput = req.body.name2;
    work.push(valueInput);
    res.redirect('/work')
})

app.post('/delete-work', (req, res) => {
    const index = req.body.checkbox
    work.splice(index, 1);
    res.redirect('/work')
})



app.post('/hobby', (req, res) => {
    const valueInput = req.body.name2;
    hobby.push(valueInput);
    res.redirect('/hobby')
})

app.post('/delete-hobby', (req, res) => {
    const index = req.body.checkbox
    hobby.splice(index, 1);
    res.redirect('/hobby')
})
app.post('/health', (req, res) => {
    const valueInput = req.body.name2;
    health.push(valueInput);
    res.redirect('/health')
})

app.post('/delete-health', (req, res) => {
    const index = req.body.checkbox
    health.splice(index, 1);
    res.redirect('/health')
})

app.post('/finance', (req, res) => {
    const valueInput = req.body.name2;
    finance.push(valueInput);
    res.redirect('/finance')
})

app.post('/delete-finance', (req, res) => {
    const index = req.body.checkbox
    finance.splice(index, 1);
    res.redirect('/finance')
})


app.post('/fandf', (req, res) => {
    const valueInput = req.body.name2;
    fandf.push(valueInput);
    res.redirect('/fandf')
})

app.post('/delete-fandf', (req, res) => {
    const index = req.body.checkbox
    fandf.splice(index, 1);
    res.redirect('/fandf')
})

app.post('/self', (req, res) => {
    const valueInput = req.body.name2;
    self.push(valueInput);
    res.redirect('/self-development')
})

app.post('/delete-self', (req, res) => {
    const index = req.body.checkbox
    self.splice(index, 1);
    res.redirect('/self-development')
})

app.listen(3000, function () {
    console.log('serwer is working on port 3000')
})