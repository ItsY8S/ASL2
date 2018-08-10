const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const db = require('./config/mongoose')
const passport = require('./config/passport')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)

app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db })
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
const index = require('./routes/index')
app.use('/', index)

module.exports = app
