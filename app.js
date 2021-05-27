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
const health = [];
const finance = []; 
const fandf = [];
const self = [];
const work = []
let param = '';
app.get('/', (req,res) => {
    res.render('list',{
        people: arr,
        list: list
    })
})

app.get('/work', (req,res) => {
    res.render('work',{
        work:work,
        param:param
    })
})

app.get ('/self-development', (req,res) => {
    res.render('self-development', {
        self: self,
        param:param
    })
})

app.get ('/hobby', (req,res) => {
    res.render('hobby', {
        hobby: hobby,
        param:param
    })
})

app.get ('/health', (req,res) => {
    res.render('health', {
        health: health,
        param:param
    })
})

app.get ('/finance', (req,res) => {
    res.render('finance',{
        finance:finance,
        param:param
    })
})
app.get ('/fandf', (req,res) => {
    res.render('fandf', {
        fandf:fandf,
        param:param
    })
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
    arr.push(valueInput);
    res.redirect('/')
    
   
})

app.post('/another-list' , (req,res) => {
    const ownList = req.body.ownList
    list.push(ownList);
    res.redirect('/')
})
app.post('/delete', (req, res) => {
    const deleteInput = req.body.checkbox
    const deleteOwnList = req.body.checkboxown
    if(deleteOwnList > -1){
        list.splice(deleteOwnList, 1)
    }else {
        arr.splice(deleteInput, 1);
    }
    res.redirect('/')
})

app.post('/work', (req,res) => {
    const valueInput = req.body.name2;
    work.push(valueInput);
    res.redirect('/work')
})

app.post('/delete-work', (req, res) => {
    const index = req.body.checkbox
    work.splice(index, 1);
    res.redirect('/work')
})



app.post('/hobby', (req,res) => {
    const valueInput = req.body.name2;
    hobby.push(valueInput);
    res.redirect('/hobby')
})

app.post('/delete-hobby', (req, res) => {
    const index = req.body.checkbox
    hobby.splice(index, 1);
    res.redirect('/hobby')
})
app.post('/health', (req,res) => {
    const valueInput = req.body.name2;
    health.push(valueInput);
    res.redirect('/health')
})

app.post('/delete-health', (req, res) => {
    const index = req.body.checkbox
    health.splice(index, 1);
    res.redirect('/health')
})

app.post('/finance', (req,res) => {
    const valueInput = req.body.name2;
    finance.push(valueInput);
    res.redirect('/finance')
})

app.post('/delete-finance', (req, res) => {
    const index = req.body.checkbox
    finance.splice(index, 1);
    res.redirect('/finance')
})


app.post('/fandf', (req,res) => {
    const valueInput = req.body.name2;
    fandf.push(valueInput);
    res.redirect('/fandf')
})

app.post('/delete-fandf', (req, res) => {
    const index = req.body.checkbox
    fandf.splice(index, 1);
    res.redirect('/fandf')
})

app.post('/self', (req,res) => {
    const valueInput = req.body.name2;
    self.push(valueInput);
    res.redirect('/self-development')
})

app.post('/delete-self', (req, res) => {
    const index = req.body.checkbox
    self.splice(index, 1);
    res.redirect('/self-development')
})

app.listen(3000,function() {
    console.log('serwer is working on port 3000')
})