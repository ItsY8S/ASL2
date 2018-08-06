const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(
  `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`
)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error: '))
db.once('open', () => console.log('DATABASE CONNECTED'))

const index = require('./routes/index')
app.use('/', index)

module.exports = app
