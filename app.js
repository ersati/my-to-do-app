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

const Fandf = require("./modules/FriendsAndFamily/FModel")
const fandfTasks = require("./modules/FriendsAndFamily/FTask")
//Friends and Family 

const dat = require("./routes/data")

const {main, addTasktoMain, addList, deleteMain} = require("./routes/main")
const {work, addWork, deleteWork} = require("./routes/work")
const {hobby, addHobby,deleteHobby} = require("./routes/hobby")
const {health, addHealth, deleteHealth} = require("./routes/health")
const {finance, addFinance, deleteFinance} = require("./routes/finance")
const { self, addSelf, deleteSelf} = require("./routes/self")
const {fandf, addFandf, deleteFandf} = require("./routes/fandf")

app.get('/', main)
app.get('/work', work)
app.get('/self-development',self)
app.get('/hobby', hobby)
app.get('/health', health)
app.get('/finance', finance)
app.get('/fandf', fandf)

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

app.post('/', addTasktoMain)
app.post('/another-list', addList)
app.post('/delete', deleteMain)
app.post('/work', addWork)
app.post('/delete-work', deleteWork)
app.post('/hobby', addHobby)
app.post('/delete-hobby', deleteHobby)
app.post('/health', addHealth)
app.post('/delete-health', deleteHealth)
app.post('/finance', addFinance)
app.post('/delete-finance',deleteFinance)
app.post('/fandf',addFandf)
app.post('/delete-fandf', deleteFandf)
app.post('/self', addSelf)
app.post('/delete-self',deleteSelf)

app.listen(3000, function () {
    console.log('serwer is working on port 3000')
})