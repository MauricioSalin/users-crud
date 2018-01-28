const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');

const ObjectId = require("mongodb").ObjectId;
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
        let accounts = new Object
        accounts.users = JSON.parse(JSON.stringify(result, null, 2))
        res.render('index', accounts);
        });
});

app.get('/newUser', function(req, res) {
    let newAccount = new Object
    newAccount.user = new Object
    newAccount.action = "/newUser"    
        res.render('newUser', newAccount)     
});

app.post('/newUser', function(req, res) {
  let nome = req.body.nome
  let sobrenome = req.body.sobrenome
  let email = req.body.email
  let cpf = req.body.cpf
  let telefone = req.body.telefone
  let data = req.body.data
  let status = req.body.status
  
  collection.insertOne({nome,sobrenome,email,cpf,telefone,data,status},function(err, result) {
    res.redirect('/')
    });
})

app.get('/edit/:id', function(req, res) {
    collection.find(new ObjectId(req.params.id)).toArray(function(err, result) {
        let account = new Object
        account.user = JSON.parse(JSON.stringify(result, null, 2))
        account.action = "/edit/:id"
        res.render('newUser', account);
        });    
});

app.post('/edit/:id', function(req, res) {  
    let id = new ObjectId(req.params.id)
    let nome = req.body.nome
    let sobrenome = req.body.sobrenome
    let email = req.body.email
    let cpf = req.body.cpf
    let telefone = req.body.telefone
    let data = req.body.data
    let status = req.body.status

    let newValue = { _id: id, nome, sobrenome, email, cpf, telefone, data, status}

    collection.save(newValue, function(err, result) {
        console.log(result)
        res.redirect('/')
        });
     });


});


app.listen(3000, () => console.log('App listening on port 3000!'))