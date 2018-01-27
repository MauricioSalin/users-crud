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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {
    collection.find({}).toArray(function(err, result) {
        let accounts = {
            users: Object
        }
        accounts.users = JSON.parse(JSON.stringify(result, null, 2))

        console.log(accounts)


        res.render('index', accounts);
        });
});

});


app.listen(3000, () => console.log('App listening on port 3000!'))