const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"))
app.get('/', (req,res) => {
    res.render('list')
})


app.listen(3000,function() {
    console.log('serwer is working on port 3000')
})