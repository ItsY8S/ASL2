const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const db = require('./config/mongoose')
const passport = require('./config/passport')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)

app.use(express.json())
// Use express sessions
app.use(
  expressSession({
    secret: 'something',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db })
  })
)

// Use passport
app.use(passport.initialize())
app.use(passport.session())

// Set the views folder
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Parse requests into JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routing
const index = require('./routes/index')
app.use('/', index)

module.exports = app
