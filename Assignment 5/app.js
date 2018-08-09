const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.set('views', path.join(__dirname, 'views')) // this is the folder where we keep our pug files
app.set('view engine', 'pug')

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/assignment5')

const index = require('./routes/index')
app.use('/', index)

module.exports = app
