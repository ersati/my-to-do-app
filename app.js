const express = require('express');
const mongoose = require("mongoose");
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



const userSchema = {
    name: {type:String}
};




const UserModel = mongoose.model('UserModel',userSchema);

const firstEl = new UserModel({
    name: "Hello everyone in Own section"
})

const secondEl = new UserModel({
    name: "Press the Add button to add tasks in Own section"
})

const thirdEl = new UserModel({
    name: "Press <--- to delete the file in Own section"
})

const allTask = [firstEl, secondEl, thirdEl]

const paramSchema = {
    list: String,
    tasks: [userSchema]
}

const ParamModel = mongoose.model('ParamModel', paramSchema)


app.get('/:paramName', (req, res) => {
    const paramName = req.params.paramName;
    const {
        people,
        list, 
        own
    } = dat
   const obj = {
       own: ''
   }
    console.log(paramName)
  
    ParamModel.findOne({list: paramName}, function(err, result){
        if(!err){
            if(!result){
                console.log('doesnt exist')
                const l = new ParamModel({
                    list: paramName,
                    tasks: allTask
                })
                l.save()
            }
            else{
                console.log('exist')
                console.log(result.tasks)
                res.render('own', {
                    title: result.list,
                    paramName: paramName,
                    tasks: result.tasks
                })
            }
        }  else {
          console.log(err)
        }
    })

    
//      const item = UserModel.find({}, function(err, tasks){
//       if(tasks.length === 0){
//           UserModel.insertMany(allTask, function(err){
//               if(!err){
//                   console.log('succesfully add task')
//                   obj.own = tasks
//               }
//               else{console.log(err)}
//           })
//       }else {
//           if(!err){
//                dat.own = tasks
//               console.log(dat.own)
//           }else {
//               console.log(err)
//           }
//       }
//   })
//   console.dir(obj, item)
    //Find The Title from the param arrays.
    const listArr = [...list]
    const namesTitle = listArr.map(item => item.list)
    const title = namesTitle.filter(item => !(paramName.indexOf(item) == -1))
    // res.render('own', {
    //     title: title,
    //     paramName: paramName,
    //     tasks: own
    // })
})

// app.post('/:paramName', function (req, res){
//     const paramName = req.params.paramName;
//     console.log(paramName)
//     const valueInput = req.body.task;
//     console.log(valueInput)
//     const item = new UserModel({
//         name: valueInput
//     })
//     if (valueInput !== '') {
//         item.save()
        
//         res.redirect(`/:${paramName}`)
//     } else {
//         res.redirect(`/:${paramName}`)
//     }
// })

// app.post('/delete/:paramName', function (req, res){
//     const paramName = req.params.paramName;
//     console.log(paramName)
//     const index = req.body.checkbox
//     UserModel.findByIdAndRemove(index, (err) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.redirect(`/:${paramName}`)
//         }
//     })
// })

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