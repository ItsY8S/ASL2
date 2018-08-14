const express = require('express')
const router = express.Router()
const path = require('path')
const { check, validationResult } = require('express-validator/check')
const Film = require('../models/films')
const Person = require('../models/people')
const List = require('../models/lists')
const Item = require('../models/items')

router.get('/', (req, res) => {
  res.render('movies')
})

router.get('/lists', (req, res) => {
  // get all the lists
  List.find({}, function(err, lists) {
    if (err) throw err

    // object of the lists
    console.log(lists)
    res.json(lists)
  })
})

router.get('/lists/:id', (req, res) => {
  // get a list with ID
  List.findById(req.params.id, function(err, lists) {
    if (err) throw err

    // show the one list
    // console.log(lists)
    const items = lists.items
    res.json(items)
  })
})

router.get('/item/:id', (req, res) => {
  // get an item with ID of 1
  List.findById(req.params.id, function(err, lists) {
    if (err) throw err

    // show the one item
    console.log(lists)
    // const items = items.items
    res.json(lists.items[0])
  })
})

router.post('/lists', (req, res) => {
  console.log('post', req.body)
  let newList = new List(req.body)

  newList.save(function(err, list) {
    if (err) throw err

    res.json({ id: list._id })
  })
})

router.post('/item', (req, res) => {})

router.put('/item/:id', (req, res) => {})

router.delete('/item/:id', (req, res) => {})

module.exports = router
