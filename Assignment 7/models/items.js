const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = new Schema({
  title: String,
  status: String,
  duedate: String,
  notes: String
})

let Item = mongoose.model('Item', itemSchema)

module.exports = Item
