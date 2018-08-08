const express = require('express')
const router = express.Router()
const path = require('path')
const pug = require('pug')

router.get('/', (req, res, next) => {
  res.render('<h1>Hello World</h1>')
})

module.exports = router
