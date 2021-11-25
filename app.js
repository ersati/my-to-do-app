require('dotenv').config()

const express = require('express');
const mongoose = require("mongoose");
const _ = require('lodash');
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate')

app.use(session({
    secret: "Hexagon Task Manager.",
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use('/favicon.ico', express.static('images/favicon.ico'));
app.use("/public", express.static('./public/'));
app.use(express.static("public"))
// Mongoose Connection 


// mongoose.connect("mongodb://localhost:27017/todolistDB", {

// mongodb+srv://<username>:<password>@cluster0.zikdv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb://localhost:27017
// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zikdv.mongodb.net/todolistDB`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// })
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

//USER Schema
const typeOfTaskSchema = new mongoose.Schema({
    name: String,
    tasks: Array
})
const CategoryTask = new mongoose.model('Category', typeOfTaskSchema)
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    facebookId: String,
    isTaskArrEmpty: Boolean,
    generalTasks: [typeOfTaskSchema]
  
})
// const userSchema = require('./modules/Users/USchema')

// const User =require('./modules/Users/UModel');
// const Task =require('./modules/Users/TaskModel');
// const CategoryTask = require('./modules/Users/CategoryModel')
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate)


const User = new mongoose.model("User", userSchema)
const taskSchema = new mongoose.Schema({
  task: String,
  date: Date
})

const Task = new mongoose.model("Do", taskSchema)

passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


//GOOGLE
passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/hexagon",
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    function (accessToken, refreshToken, profile, cb) {
          console.log(profile)
        User.findOrCreate({
            googleId: profile.id,
        }, function (err, user) {
            return cb(err, user);
        });
    }
));


//GOOGLE


//FACEBOOK
passport.use(new FacebookStrategy({
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: "https://hex-task-tanager.herokuapp.com/auth/facebook/hexagon"
    },
    function (accessToken, refreshToken, profile, cb) {
        // console.log(profile)
        User.findOrCreate({
            facebookId: profile.id,
            // isTaskArrEmpty:true
        }, function (err, user) {
            return cb(err, user);
        });
    }
));
//FACEBOOK
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
} = require('./routes/own');
const {
    findOne
} = require('./modules/Items/ItemModel');
const {
    create
} = require('lodash');
// const {customCategory} = require('./routes/categories')

//LOGIN AND REGISTER SECTION
app.get("/login", function (req, res) {
    res.render("login", {msg:'Welcome'});
})

app.get("/register", function (req, res) {
    res.render("register");
})
function createTaskObj(taskName) {
    const firstTask = new Task({
        task: "Hello everyone"
    })
    const secondTask = new Task({
        task: `Press the Add button to add ${taskName}`
    })
    const thirdTask = new Task({
        task: "Press ---> to delete the file"
    })
    return new CategoryTask({
        name: taskName,
        tasks: [firstTask, secondTask, thirdTask]
    })
}
app.get("/home", function (req, res) {

    const hobby = createTaskObj('Hobby');
    const work = createTaskObj('Work');
    const mainTask = createTaskObj('Main-task');
    const finance = createTaskObj('Finance');
    const health = createTaskObj('Health');
    const friendsAndFamily = createTaskObj('Friends-and-Family')
    const selfDevelopment = createTaskObj('Self-Development')
    if (req.isAuthenticated()) {
        User.findById({
            _id: req.user._id
        }, function (err, profile) {
            if (!err) {
                if (profile.generalTasks.length === 0) {
                    profile.generalTasks.push(mainTask, work, hobby, finance, health, friendsAndFamily, selfDevelopment);
                    profile.isTaskArrEmpty = false;
                    profile.save()
                    // User.findOneAndUpdate({
                    //     _id: req.user._id
                    // }, {
                    //     isTaskArrEmpty: false,
                    //     generalTasks: allTasksObj
                    // },  
                    // function (err, doc) {
                    // })
                }
                if(!profile.isTaskArrEmpty){
                    const {tasks} = profile.generalTasks.find((el) => el.name === 'Main-task')
                    const listOfTasks = profile.generalTasks.filter(el => {
                        if (el.name === 'Main-task') {
                            return false
                        }
                        return true
                    }).map(el => el.name);
                    res.render("home", {mainTasks: tasks, lists: listOfTasks})
                }

            }
        })

        // res.render("home")
    } else {
        res.redirect('/login')
    }
})
app.post('/your', function (req,res){
    const valueInput = req.body.addTask;
    const item = new Task({
        task: valueInput,
        date: new Date().toLocaleString('en-UK')
    })
    User.findById({
        _id: req.user._id
    }, function (err, profile) {
        if(profile){
            const {tasks} = profile.generalTasks.find((el) => el.name === 'Main-task')
            tasks.push(item)
            profile.save()
            res.redirect('/home')
        }
    })
})



app.post('/home/delete', function (req, res){
    const id = req.body.idElement;
    const category = 'Main-task'
    const query = {
        _id: req.user._id
    }
    if(category){
        User.findById(query, function (err, profile){
            if(profile){
                const {tasks} = profile.generalTasks.find((el) => el.name === category)
                const idTask = tasks.findIndex(el => el._id == id)
                if(idTask !== -1){
                    tasks.splice(idTask, 1);
                }else { 
                    console.log('no elements to delete')
                }
                profile.save()
                res.redirect(`/home`)
            }
        })
    }
})
app.post('/create-category', (req,res) => {
    const nameOfNewCategory = req.body.customCategory;
    const query = {
        _id: req.user._id
    }
    User.findById(query, function (err, profile){
        if(!err){
            const isCategoryExists = profile.generalTasks.some(el => el.name === nameOfNewCategory)
            if(!isCategoryExists){
                const newCategory = createTaskObj(nameOfNewCategory)
                profile.generalTasks.push(newCategory)
                profile.save()
            }
        }
    })
    res.redirect('/home')
})

app.post('/delete-category', (req,res) => {
    const category = req.body.catName;
    const query = {
        _id: req.user._id
    }
if(category){
    User.findById(query, function (err, profile){
        if(!err){
            const idCategory = profile.generalTasks.findIndex(el => el.name == category)
            if(idCategory !== -1){
                profile.generalTasks.splice(idCategory, 1);
            }else { 
                console.log('no elements to delete')
            }
            profile.save()
            res.redirect(`/home`)
        }
    })
}
})
app.get('/category/:paramName', (req, res) => {
    const id = req.user._id
    const {paramName} = req.params
    User.findById({ _id: id}, function(err, profile){
        if(!err) {
            const isCategoryExists = profile.generalTasks.some(el => el.name === paramName)
            if(!isCategoryExists){
                res.redirect('/home')
            }
            if(isCategoryExists){
            const {tasks , name } = profile.generalTasks.find(el => el.name === paramName)
                res.render('customCategory', {
                    title: name,
                    paramName: paramName,
                    tasks: tasks,
                })
            }
        } else {
            console.log(err)
        }
    })
})

app.post('/category/:paramName', (req,res) => {
    const categoryName = req.params.paramName;
    const taskValue = req.body.task
    const newTask = new Task({
        task: taskValue,
        date: new Date().toLocaleString('en-UK')
    })

    User.findById({
        _id: req.user._id
    }, function (err, profile) {
        if(profile){
            const {tasks} = profile.generalTasks.find((el) => el.name === categoryName)
            tasks.push(newTask)
            profile.save()
            res.redirect(`/category/${categoryName}`)
        }

    })

})

app.post('/category/:paramName/delete', (req,res) => {
    const id = req.body.idElement;
    const category = req.body.listName;
    const query = {
        _id: req.user._id
    }
    if(category){
        User.findById(query, function (err, profile){
            if(profile){
                const {tasks} = profile.generalTasks.find((el) => el.name === category)
                const idTask = tasks.findIndex(el => el._id == id)
                if(idTask !== -1){
                    tasks.splice(idTask, 1);
                }else { 
                    console.log('no elements to delete')
                }
                profile.save()
                res.redirect(`/category/${category}`)
            }
        })

        
    }
})
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect('/login');

})
app.post("/login", function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })

    req.login(user, function (err) {
        if (err) {
            console.log(err)
            res.redirect('/login')
        } else {
            passport.authenticate("local", {
                successRedirect: '/home',
                failureRedirect: '/login',
                failureFlash: 'Invalid username or password.'
            })(req, res, function () {
                res.redirect('/home')
            })
        }
    })
})

app.post("/register", function (req, res) {
    User.register({
        username: req.body.username,
        isTaskArrEmpty: true
    }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/home")
            })

        }
    })
})


//GOOGLE
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

app.get('/auth/google/hexagon',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/home');
    });
//GOOGLE


//FB
app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/hexagon',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/home');
    });

//FB
//LOGIN AND REGISTER SECTION
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