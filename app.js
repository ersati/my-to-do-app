require('dotenv').config()

const express = require('express');
const mongoose = require("mongoose");
const _ = require('lodash');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use('/favicon.ico', express.static('images/favicon.ico'));
app.use(express.static("public"))
// Mongoose Connection 

// mongoose.connect("mongodb://localhost:27017/todolistDB", {

// mongodb+srv://<username>:<password>@cluster0.zikdv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb://localhost:27017
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zikdv.mongodb.net/todolistDB`, {

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

const {
    main,
    addTasktoMain,
    addList,
    deleteMain
} = require("./routes/main")
const {
    work,
    addWork,
    deleteWork
} = require("./routes/work")
const {
    hobby,
    addHobby,
    deleteHobby
} = require("./routes/hobby")
const {
    health,
    addHealth,
    deleteHealth
} = require("./routes/health")
const {
    finance,
    addFinance,
    deleteFinance
} = require("./routes/finance")
const {
    self,
    addSelf,
    deleteSelf
} = require("./routes/self")
const {
    fandf,
    addFandf,
    deleteFandf
} = require("./routes/fandf")
const {
    own,
    addOwn,
    deleteOwn
} = require('./routes/own')
app.get('/', main)
app.get('/work', work)
app.get('/self-development', self)
app.get('/hobby', hobby)
app.get('/health', health)
app.get('/finance', finance)
app.get('/fandf', fandf)
app.get('/cat/:paramName', own)

app.post('/', addTasktoMain)
app.post('/cat/:paramName', addOwn)
app.post('/another-list', addList)
app.post('/work', addWork)
app.post('/hobby', addHobby)
app.post('/health', addHealth)
app.post('/finance', addFinance)
app.post('/fandf', addFandf)
app.post('/self', addSelf)

app.post('/delete', deleteMain)
app.post('/delete-own', deleteOwn)
app.post('/delete-work', deleteWork)
app.post('/delete-hobby', deleteHobby)
app.post('/delete-health', deleteHealth)
app.post('/delete-finance', deleteFinance)
app.post('/delete-fandf', deleteFandf)
app.post('/delete-self', deleteSelf)


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log('serwer is working on port 3000')
})