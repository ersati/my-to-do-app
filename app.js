const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"))

const arr = []
app.get('/', (req,res) => {
    res.render('list',{
        people: arr,
    })
})

app.post('/', (req,res) =>{
    const valueInput = req.body.name2;
    const valueInput1 = req.body.name1;
    arr.push(valueInput);
    console.log(arr)
    console.log(req.body)
    res.redirect('/')
})


app.listen(3000,function() {
    console.log('serwer is working on port 3000')
})