// heal.save(function(err, doc) {
    //         if (err) return console.error(err);
    //         console.log("Document inserted succussfully!");
    //       });
    
    
    // var schema = mongoose.Schema({
    //     name: String,
    //     age: Number
    //   });
    
    //   var Model = mongoose.model("model", schema, "myCollection");
    
    //   var doc1 = new Model({ name: "John", age: 21 });
    
    //   doc1.save(function(err, doc) {
    //     if (err) return console.error(err);
    //     console.log("Document inserted succussfully!");
    //   });
    
    // const Hobby = mongoose.model('Hobby', listSchema);
    // const hobbyList = new Hobby({
    //     name: 'Juzio',
    // })
    
    // hobbyList.save()
    // console.log(hobbyList)

    // Hobby.find({}, function(err, value){
// if(err){
//     console.log(err)
// }else {
//     console.log(value)
// }
// })


// List.find({}, function (err, foundItems) {
   
//     if (foundItems.length === 0) {
//         List.insertMany(listTask, function (err) {
//             if (err) {
//                 console.log(err)
//             } else {
//                 console.log(foundItems)
//                 console.log("Successfully saved default items to DB list")
//             }
//         })
//     } 