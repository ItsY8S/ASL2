const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// EXAMPLE STRING: mongodb://username:password@hostname:port/database
mongoose.connect('mongodb://'+process.env.MONGO_HOST+'/'+process.env.MONGO_DATABASE);

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('DATABASE CONNECTED SUCCESSFULLY') );

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
const users = require('./routes/users')
app.use('/users', users);

module.exports = app;