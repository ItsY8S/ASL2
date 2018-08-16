
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Pug folder
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Looks at JSON requests and sets them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to mongo database
mongoose.connect('mongodb://localhost:27017/assignment8')

const index = require('./routes/index')
app.use('/', index)

module.exports = app