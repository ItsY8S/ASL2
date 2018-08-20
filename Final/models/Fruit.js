const mongoose = require('mongoose')
const Schema = mongoose.Schema

let fruitSchema = new Schema({
  name: String,
  quantity: Number,
  _owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

let Fruit = mongoose.model('Fruit', fruitSchema, 'fruits')

module.exports = Fruit
