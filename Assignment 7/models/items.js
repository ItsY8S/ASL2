const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Item Schema
let itemSchema = new Schema({
  title: String,
  status: String,
  date: Date,
  notes: String,
  _list: { type: Schema.Types.ObjectId, ref: 'List' }
})

// Set it to a variable and export it
let Item = mongoose.model('Item', itemSchema)

module.exports = Item
