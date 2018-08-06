const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Pet = require('../models/Pet')

router.get('/', (req, res) => {
  const griffin = new User({
    name: 'Griffin',
    meta: {
      dob: new Date(1998, 05, 06)
    }
    // pets: griffin._id
  })

  const cali = new Pet({
    name: 'Cali',
    type: 'Dog',
    owner: griffin._id
  })

  cali.validate(err => console.log('err', err))
  console.log('age', griffin.getAge())

  res.send('<h1>Hello World</h1>')
})

module.exports = router
