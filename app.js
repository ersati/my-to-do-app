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

// mongoose.set("setCreateIndex", true)
//Mongoose Connection

//USER Schema
const typeOfTaskSchema = new mongoose.Schema({
    // mainTask: Array, 
    // hobby:Array,
    // work:Array
    name: String,
    tasks: Array
})
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId:String,
    facebookId:String,
    // generalTasks:Array,
    generalTasks:[typeOfTaskSchema]
    // generalTasks:[
    //     {mTask: Array}, 
    //     {hob:Array},
    //     {wor:Array},
    // ]
})
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate)


const User = new mongoose.model("User", userSchema)
const taskSchema = new mongoose.Schema({
    mainTask: String,
    hobby: String,
    work:String
})

const Task = new mongoose.model("Do", taskSchema)
passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
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
  function(accessToken, refreshToken, profile, cb) {
    //   console.log(profile)
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


//GOOGLE


//FACEBOOK
passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/hexagon"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
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
const { findOne } = require('./modules/Items/ItemModel');



//LOGIN AND REGISTER SECTION

app.get("/login", function (req, res) {
    res.render("login");
})

app.get("/register", function (req, res) {
    res.render("register");
})

app.get("/home", function (req, res) {

    const task = new Task({
        mainTask: "Hello everyone",
        
    })
    const task1 = new Task({
        mainTask: "Press the Add button to add tasks",
       
    })
    
    const task2 = new Task({
        mainTask: "Press ---> to delete the file",
        
    })

    const taskh = new Task({
       
        hobby: "Hello everyone"
    })
    const taskh1 = new Task({
        
        hobby: "Press the Add button to add tasks"
    })
    
    const taskh2 = new Task({
       
        hobby: "Press the Add button to add tasks"
    })

    const taskw = new Task({
       
        work: "Hello everyone"
    })
    const taskw1 = new Task({
        
        work: "Press the Add button to add tasks"
    })
    
    const taskw2 = new Task({
       
        work: "Press the Add button to add tasks"
    })
    const t = "Hello everyone"
    const t2 = "Press the Add button to add tasks"
    const t3 = "Press ---> to delete the file"

    const allTasks =[task, task1, task2]



    if (req.isAuthenticated()) {
        // console.log(req.user._id)
        // User.find({}, function(err, foundTasks){
        //     console.log(foundTasks)
        // })


         User.findById({_id: req.user._id}, function(err, profile){
            if(!err){
                console.log('before')
                if(profile.generalTasks.length === 0){
                    console.log('hello')
                    User.findOneAndUpdate({_id: req.user._id}, {
                        // generalTasks: [{hob:[taskh, taskh1, taskh2]}, {wor:[taskw, taskw1, taskw2]} ],
                        generalTasks: [{name: 'hobby', tasks:[taskh, taskh1, taskh2]}, {name: 'work', tasks:[taskw, taskw1, taskw2]} ],
                        // generalTasks:[task, task1, task2]
                    }, { upsert: true },  function( err, doc ) {
                        // console.log( doc )
                        
                    })
                }
                
            }
        })

      
      
        // User.findOneAndUpdate({_id: req.user._id}, {
        //     // generalTasks: [{hob:[taskh, taskh1, taskh2]}, {wor:[taskw, taskw1, taskw2]} ],
        //     generalTasks: [{name: 'hobby', tasks:[taskh, taskh1, taskh2]}, {name: 'work', tasks:[taskw, taskw1, taskw2]} ],
        //     // generalTasks:[task, task1, task2]
        // }, { upsert: true },  function( err, doc ) {
        //     // console.log( doc )
            
        // })




        // let update = { $inc: { number: 1 } };
        // let update = {$exists:true, $size:0};
        // const opts = { runValidators: true,
        //     upsert: true };
        // User.findOneAndUpdate({_id: req.user._id}, update,
        //     opts,  function( err, doc ) {
        //     console.log( doc )
        //         console.log(`before: ${doc.generalTasks.length === 0}`)
        //     if(doc.generalTasks.length === 0){
        //         console.log(`after: ${doc.generalTasks.length === 0}`)
        //         update = { $push: [{name: 'hobby', tasks:[taskh, taskh1, taskh2]}, {name: 'work', tasks:[taskw, taskw1, taskw2]}] };
        //     User.findOneAndUpdate({_id: req.user._id}, update, opts, function(error) {
        //       // This will never error either even though the array will have at
        //       // least 2 elements.
        //       console.log(error)
        //     });

        //     }
            
        // })
        // let data = User.findOne({_id: req.user._id})

        // console.log(data.generalTasks)

        //   User.findOneAndUpdate({_id: req.user._id}, {
        //     // generalTasks: [{mainTask:[task, task1, task2]}, {hobby:[task, task1, task2]} ],
        //     generalTasks:[taskh, taskh1, taskh2]
        // }, { upsert: true },  function( err, doc ) {
        //     console.log( doc )
        //   })
        // User.findOne({_id: req.user._id}, function(err, foundUser){
        //     console.log(foundUser)
        //     if(foundUser.generalTasks.length === 0) {
        //         // foundUser.generalTasks.push(task, task1, task2)
        //         const item = new User ({ 
        //             _id: req.user._id,
        //             generalTasks: [task, task1, task2]
        //         })
        //         item.save()
                
        //     }
    // })
            
            // console.log(foundUser.generalTasks)
        res.render("home")
    } else {
        res.redirect('/login')
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
        username: req.body.username
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
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
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