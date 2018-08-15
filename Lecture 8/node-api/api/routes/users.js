const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', (req, res, next) => {
  console.log('Get all');
  User.find((err, users) => {
    res.json(users)
  })
})

router.post('/', (req, res) => {
  console.log('Create new:', req.body)
  req.body.dob = req.body.dob.date
  let newUser = new User(req.body)
  newUser.save((err, user) => {
    if (err) {
      console.log('Error:', err)
      return res.send(err)
    }
    res.json(user)
  })
})

router.get('/:username', (req, res) => {
  console.log('Get one:', req.params.username);
  User.findOne({ username: req.params.username }, (err, user) => {
    res.json(user)
  })
})

router.put('/:username', (req, res) => {
  console.log('Update: ', req.params.username);
  req.body.dob = req.body.dob.date
  User.findOneAndUpdate({ username: req.params.username }, req.body, (err, user) => {
    res.json(user)
  })
})

router.delete('/:username', (req, res) => {
  console.log('Delete', req.params.username);
  User.remove({ username: req.params.username }, err => {
    res.sendStatus(200)
  })
})

module.exports = router
