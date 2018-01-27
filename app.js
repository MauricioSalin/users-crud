const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {
    res.render('index')
});

app.listen(3000, () => console.log('App listening on port 3000!'))