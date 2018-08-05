const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res, next) => {
  //   res.send('<h1>Hello World</h1>')
  res.sendFile(path.join(__dirname, '../views/notes.html'))
})

router.get('/notes', (req, res, next) => {
  res.send('<h1>Notes</h1>')
  // res.sendFile(path.join(__dirname, '../views/users.html'))
})

module.exports = router
