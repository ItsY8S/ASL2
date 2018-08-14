const mongoose = require('mongoose')
const Schema = mongoose.Schema

let listSchema = new Schema({
  title: String,
  color: String,
  items: [Array]
})

let List = mongoose.model('List', listSchema)

module.exports = List
