const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const index = require('./routes/index')
const notes = require('./routes/notes')
app.use('/', index)
app.use('/notes', notes)

module.exports = app
