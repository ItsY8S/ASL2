const express = require('express')
const router = express.Router()
const path = require('path')
const { check, validationResult } = require('express-validator/check')
const Film = require('../models/films')
const Person = require('../models/people')

router.get('/', (req, res) => {
  res.render('movies')
})

router.get('/films', (req, res) => {
  // get all the users
  Film.find({}, function(err, films) {
    if (err) throw err

    // object of all the user
    console.log(films)
    res.json(films)
  })
})

router.get('/films/:id', (req, res) => {
  // get a film with ID of 1
  Film.findById(req.params.id, function(err, films) {
    if (err) throw err

    // show the one film
    // console.log(films)
    res.json(films)
  })
})

router.post('/films', [check('name').isString()], (req, res) => {
  // grab errors
  const errors = validationResult(req)
  console.log(errors.mapped())

  try {
    errors.throw()
  } catch (err) {
    return res.status(422).json({ errors: err.array() })
  }

  // create a new user
  var newFilm = Film(req.body)

  // save the user
  newFilm.save(function(err) {
    if (err) throw err

    console.log('Film created!')
  })
})

router.post('/people', [check('name').isString()], (req, res) => {
  // grab errors
  const errors = validationResult(req)
  console.log(errors.mapped())

  try {
    errors.throw()
  } catch (err) {
    return res.status(422).json({ errors: err.array() })
  }

  const newPerson = new Person(req.body)

  newPerson.save(function(err) {
    if (err) throw err

    console.log('Person Created')
  })
})

router.put('/people/:id', (req, res) => {
  // get a person with ID
  Person.findByIdAndUpdate(req.params.id, req.body, function(err, person) {
    if (err) throw err

    console.log(person)
  })
})

router.delete('/people/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id, function(err) {
    if (err) throw err

    console.log('user deleted')
  })
})

module.exports = router
