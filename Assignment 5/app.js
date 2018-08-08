const express = require('express')
const app = express()
const path = require('path')

app.set('views', path.join(__dirname, 'views')) // this is the folder where we keep our pug files
app.set('view engine', 'pug')

const index = require('./routes/index')
app.use('/', index)

module.exports = app
