// function nameForMongo (param){
//     const paramToLoverCase = param.toLowerCase()
//     const forMongoName = paramToLoverCase[0].toUpperCase() + paramToLoverCase.slice(1)
//     return forMongoName
// }
// function createSchemaModel (par) { 
//     const anySchema = { any: String }
//     console.log(par)
//     return  mongoose.model(par, anySchema, par.toLowerCase());

// }

// function createTask (Model){
//     const firstEl = new Model({
//         any: "Hello everyone in Own section"
//     })
    
//     const secondEl = new Model({
//         any: "Press the Add button to add tasks in Own section"
//     })
    
//     const thirdEl = new Model({
//         any: "Press <--- to delete the file in Own section"
//     })
//     return [firstEl, secondEl,thirdEl]
// }
// function runModel (Model){
//      Model = createSchemaModel(Model)
//      const anyTask = createTask(Model)

//      Model.find({}, function(err, anyItem){
//         if(anyItem === 0){
//             Model.insertMany(anyTask, err=> {
//                 if(err){
//                     console.log(err)
//                 }else {
//                     console.log('succesfull add item to own list')
//                 }
//             })
//         }else {
//             console.log(anyItem)
//         }

//     })

// }
var UserSchema = new Schema({
    name: {type:String}
});

var UserModel = mongoose.model('UserModel',UserSchema);

const firstEl = new UserModel({
    name: "Hello everyone in Hobby section"
})

const secondEl = new UserModel({
    name: "Press the Add button to add tasks in Hobby section"
})

const thirdEl = new UserModel({
    name: "Press <--- to delete the file in Hobby section"
})

const allTask = [firstEl, secondEl, thirdEl]
app.get('/:paramName', (req, res) => {
    const paramName = req.params.paramName;
    const {
        people,
        list
    } = dat
   
    console.log(paramName)
    // console.log(nameForMongo(paramName))
    // let forMongo = nameForMongo(paramName)
    // const item = runModel(forMongo)
    // let Model = createSchemaModel(forMongo)
    // let anyTask = createTask(Model)

    // Model.find({}, function(err, anyItem){
    //     if(anyItem === 0){
    //         Model.insertMany(anyTask, err=> {
    //             if(err){
    //                 console.log(err)
    //             }
    //         })
    //     }else {
    //         console.log(anyItem)
    //     }

    // })
    // console.log(item)
    //Find The Title from the param arrays.
    const listArr = [...list]
    const namesTitle = listArr.map(item => item.list)
    const title = namesTitle.filter(item => !(paramName.indexOf(item) == -1))
    res.render('own', {
        title: title,
        paramName: paramName
    })
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
    // const listArr = [...list]
    // const namesTitle = listArr.map(item => item.list)
    // const title = namesTitle.filter(item => !(paramName.indexOf(item) == -1))
    // res.render('own', {
    //     title: title,
    //     paramName: paramName,
    //     tasks: own
    // })