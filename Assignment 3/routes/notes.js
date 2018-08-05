const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs')

let noteDataPath = path.join(__dirname, '/../data/notes.json')

let getNotes = (req, res, next) => {
  fs.readFile(noteDataPath, (err, data) => {
    req.notes = JSON.parse(data)
    next()
  })
}

let saveNotes = notes => {
  let json = JSON.stringify(notes)
  fs.writeFile(noteDataPath, json, 'utf8', () => {})
}

router.get('/list', getNotes, (req, res, next) => {
  res.json(req.notes)
})

router.post('/', getNotes, (req, res, next) => {
  req.notes[req.body.title] = req.body
  saveNotes(req.notes)
  res.redirect('/')
})

router.put('/:title', getNotes, (req, res, next) => {
  req.notes[req.params.title] = req.body
  saveNotes(req.notes)
  res.json(req.notes[req.params.title])
})

router.delete('/:title', getNotes, (req, res, next) => {
  delete req.notes[req.params.title]
  saveNotes(req.notes)
  res.sendStatus(200)
})

module.exports = router
