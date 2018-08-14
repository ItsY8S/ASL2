const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const peopleSchema = require('./people')

let filmSchema = new Schema({
  name: String,
  releaseDate: Date,
  studio: String,
  rating: String,
  length: Number,
  people: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
})

let Film = mongoose.model('Film', filmSchema)

module.exports = Film
