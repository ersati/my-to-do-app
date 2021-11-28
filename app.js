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
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zikdv.mongodb.net/todolistDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
// mongoose.connect("mongodb://localhost:27017/todolistDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// })
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connection Successful!");
});

//Mongoose Connection
//USER Schema
const userSchema = require('./modules/Users/USchema')
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate)

const User = require('./modules/Users/UModel');
passport.use(User.createStrategy());
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
        callbackURL: "https://hex-task-tanager.herokuapp.com/auth/google/hexagon",
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    function (accessToken, refreshToken, profile, cb) {
        //   console.log(profile)
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
//Version 2.0
const {
    homePageTasks,
    createTaskInHome,
    deleteTaskinHome,
    createCategories,
    deleteCategories
} = require('./routes/home')

const {
    getTaskFromDynamicCategory,
    addTaskToDynamicCategory,
    deleteTaskFromDynamicCategory
} = require('./routes/dynamic-categories')
//Version 2.0
//LOGIN AND REGISTER SECTION
app.get("/login", function (req, res) {
    res.render("login", {
        msg: 'Welcome'
    });
})

app.get("/register", function (req, res) {
    res.render("register");
})

app.get("/home", homePageTasks)
app.post('/home', createTaskInHome)
app.post('/home/delete', deleteTaskinHome)
app.post('/create-category', createCategories)
app.post('/delete-category', deleteCategories)

app.get('/category/:paramName', getTaskFromDynamicCategory)
app.post('/category/:paramName', addTaskToDynamicCategory)
app.post('/category/:paramName/delete', deleteTaskFromDynamicCategory)

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

// Version 1.0
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
// Version 1.0
//version 1.0
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
//version 1.0

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log('serwer is working on port 3000')
})