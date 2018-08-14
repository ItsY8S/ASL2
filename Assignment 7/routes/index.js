const express = require('express')
const router = express.Router()
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
    res.json(lists)
  })
})

router.get('/lists/:id', (req, res) => {
  // get a list with ID
  List.findById(req.params.id, function(err, lists) {
    if (err) throw err

    // show the one list
    res.json(lists)
  })
})

router.get('/item/:id', (req, res) => {
  // get an item with ID of 1
  Item.findById(req.params.id, function(err, item) {
    if (err) throw err
    res.json(item)
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

router.post('/item', (req, res) => {
  let newItem = new Item(req.body)

  newItem.save(function(err, item) {
    if (err) throw err
    res.json(item._id)
  })
})

router.put('/item/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    item
  ) {
    if (err) throw err
    res.json(item)
  })
})

router.delete('/item/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, function(err, item) {
    if (err) throw err
    res.json('It works')
  })
})

module.exports = router
