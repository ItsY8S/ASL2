const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create a list schema
let listSchema = new Schema({
  title: String,
  color: String,
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
})

// Set it to a variable and export it
let List = mongoose.model('List', listSchema)

module.exports = List
