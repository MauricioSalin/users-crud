const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const ObjectId = require("mongodb").ObjectId
const app = express()

const port = process.env.PORT || 3000

let MONGO_URL = 'mongodb://admin:abc123@ds013456.mlab.com:13456/usercrud'; //URL para conexao no banco

MongoClient.connect(MONGO_URL, function(err, db) {
    db = db.db('usercrud')
    console.log("Conectado ao banco!")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

const collection = db.collection('Users')

collection.createIndex( { "email": 1 }, { unique: true },function(req, result) {
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {
    collection.find({}).toArray(function(err, result) {
        let accounts = new Object
        accounts.users = JSON.parse(JSON.stringify(result, null, 2))
        res.render('index', accounts)
        });
});

app.get('/newUser', function(req, res) {
    let newAccount = new Object
    newAccount.user = new Object
    newAccount.action = "/newUser"
        res.render('newUser', newAccount)
});

app.post('/newUser', function(req, res) {
  let name = req.body.name
  let lastname = req.body.lastname
  let email = req.body.email
  let cpf = req.body.cpf
  let phone = req.body.phone
  let date = req.body.date
  let status = req.body.status

   collection.insertOne({name, lastname, email, cpf, phone, date, status}, function(err, result) {
    if (result === null) {
        res.render('newUser', {user:{name,lastname,cpf,phone,date,status,return: "E-mail ja cadastrado!"}} )
    } else {
        res.redirect('/')}
     })
})

app.get('/edit/:id', function(req, res) {
    collection.find(new ObjectId(req.params.id)).toArray(function(err, result) {
        let account = new Object
        account.user = JSON.parse(JSON.stringify(result, null, 2))
        account.action = "/edit/:id"
        res.render('newUser', account)
        });
});

app.post('/edit/:id', function(req, res) {
    let id = new ObjectId(req.params.id)
    let name = req.body.name
    let lastname = req.body.lastname
    let email = req.body.email
    let cpf = req.body.cpf
    let phone = req.body.phone
    let date = req.body.date
    let status = req.body.status

    collection.save({ _id: id, name, lastname, email, cpf, phone, date, status}, function(err, result) {
        res.redirect('/')
        });
     });

app.get('/delete/:id', function(req, res) {
    let id = new ObjectId(req.params.id)
    collection.deleteOne({_id: id},function(err, result) {
        res.redirect('/')
        });
    });
});

app.listen(port, () => console.log(`Node app is running!!`))

