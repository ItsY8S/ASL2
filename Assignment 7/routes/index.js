const express = require('express')
const router = express.Router()
const List = require('../models/lists')
const Item = require('../models/items')

// Base get route
router.get('/', (req, res) => {
  // Return some JSON that says wow beacuse why not?
  res.json('Wow')
})

// Lists get Route
router.get('/lists', (req, res) => {
  // get all the lists
  List.find({}, function(err, lists) {
    if (err) throw err

    // object of the lists
    return res.json(lists)
  })
})

// Lists/:id get route
router.get('/lists/:id', (req, res) => {
  // get list items with ID
  Item.find({ _list: req.params.id }, function(err, items) {
    if (err) throw err

    // show the one list
    return res.json(items)
  })
})

// Item/:id get route
router.get('/item/:id', (req, res) => {
  // get an item with ID of 1
  Item.findById(req.params.id, function(err, item) {
    if (err) throw err

    // return it
    return res.json(item)
  })
})

// Lists post route
router.post('/lists', (req, res) => {
  console.log('post', req.body)
  // Set a new list equal to the body of the request
  let list = new List(req.body)

  // Save the list
  list.save(function(err, list) {
    if (err) throw err
    // Return the id
    res.json({ id: list._id })
  })
})

// Item post route
router.post('/item', (req, res) => {
  // Find a list based on an id
  List.findById('5b79e94fc610fe9729c918e5', function(err, list) {
    console.log(req)
    // Set the request body equal to the item
    const item = new Item({
      title: req.body.title,
      status: req.body.status,
      date: req.body.date,
      notes: req.body.notes,
      _list: list._id
    })
    // Save the item to the database
    item.save((err, item) => {
      if (err) throw err
      // Return the item id
      return res.json(item._id)
    })
  })
})

// Item /:id put route
router.put('/item/:id', (req, res) => {
  // Find the item by id and update it with req.body
  // New : true gets the updated value
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    item
  ) {
    if (err) throw err
    // Return the updated item
    return res.json(item)
  })
})

// Item /:id delete route
router.delete('/item/:id', (req, res) => {
  // Find and remove based on params id
  Item.findByIdAndRemove(req.params.id, function(err, item) {
    if (err) throw err
    // Return a test confirmation
    return res.json('It works')
  })
})

module.exports = router
