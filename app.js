const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"))

const arr = []
const list = []
let param = '';
app.get('/', (req,res) => {
    res.render('list',{
        people: arr,
        list: list
    })
})

app.get ('/work', (req,res) => {
    res.render('work')
})

app.get ('/self-development', (req,res) => {
    res.render('self-development')
})

app.get ('/hobby', (req,res) => {
    res.render('hobby')
})

app.get ('/health', (req,res) => {
    res.render('health')
})

app.get ('/finance', (req,res) => {
    res.render('finance')
})
app.get ('/fandf', (req,res) => {
    res.render('fandf')
})


app.get('/:paramName', (req, res) => {
    const paramName = req.params.paramName;
    console.log(paramName)
    res.render('own', {
        title: paramName
    })
})

app.post('/', (req,res) =>{
    const valueInput = req.body.name2;
    const valueInput1 = req.body.name1;
    const random = req.params
    console.log(random)
    arr.push(valueInput);
    console.log(arr)
    console.log(req.body)
    
   
})

app.post('/another-list' , (req,res) => {
    const ownList = req.body.ownList
    list.push(ownList);
    console.log(list)
    res.redirect('/')
})
app.post('/delete', (req, res) => {
    const deleteInput = req.body.checkbox
    console.log('ok', deleteInput)
    arr.splice(deleteInput, 1);
    console.log(arr)
    res.redirect('/')
})


app.listen(3000,function() {
    console.log('serwer is working on port 3000')
})