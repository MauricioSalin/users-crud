const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser');

const url = ''

MongoClient.connect(url, function(err, db) {
    db = db.db('usercrud')
    console.log("Conectado ao banco!")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));    

const collection = db.collection('usuarios')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {
    collection.find({}).toArray(function(err, result) {
        let accounts = {
            users: Object
        }
        accounts.users = JSON.parse(JSON.stringify(result, null, 2))
        res.render('index', accounts);
        });
});

app.get('/newUser', function(req, res) {
        res.render('newUser')     
});

app.post('/newUser', function(req, res) {
  let nome = req.body.nome
  let email = req.body.email
  console.log(nome)
})

});


app.listen(3000, () => console.log('App listening on port 3000!'))