const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const MongoClient = require('mongodb').MongoClient

const url = ''

MongoClient.connect(url, function(err, db) {
    db = db.db('usercrud')
    console.log("Conectado ao banco!")

const collection = db.collection('usuarios')

collection.find({}).toArray(function(err, person) {
    console.log(JSON.stringify(person, null, 2))
    });
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {
    res.render('index')
});

app.listen(3000, () => console.log('App listening on port 3000!'))