const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/favicon.ico', express.static('images/favicon.ico'));


app.use(express.static("public"))

const arr = []
const list = []
const hobby = [];
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
    res.render('hobby', {
        hobby: hobby,
        param:param
    })
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
    param = paramName
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
    res.redirect('/')
    
   
})

app.post('/another-list' , (req,res) => {
    const ownList = req.body.ownList
    list.push(ownList);
    console.log(list)
    res.redirect('/')
})
app.post('/delete', (req, res) => {
    const deleteInput = req.body.checkbox

    const hiddenInput = req.body.listName
    console.log( req.body.name)
    
    // console.log(req.body)
    const deleteOwnList = req.body.checkboxown

    if(deleteOwnList > -1){
        list.splice(deleteOwnList, 1)
    }else {
        arr.splice(deleteInput, 1);
    }

        console.log(arr)
    
    res.redirect('/')
})

app.post('/hobby', (req,res) => {
    const valueInput = req.body.name2;
    hobby.push(valueInput);
    res.redirect('/hobby')
})



app.listen(3000,function() {
    console.log('serwer is working on port 3000')
})