const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const index = require('./routes/index')
const movies = require('./routes/movies')
app.use('/', index)
app.use('/movies', movies)

module.exports = app
