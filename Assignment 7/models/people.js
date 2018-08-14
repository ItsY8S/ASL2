const mongoose = require('mongoose')
const Schema = mongoose.Schema

let peopleSchema = new Schema({
  name: String,
  character: String,
  role: String
})

let Person = mongoose.model('Person', peopleSchema)

module.exports = Person
