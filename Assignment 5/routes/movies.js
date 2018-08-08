const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/movies', (req, res, next) => {
  res.send('<h1>Movies</h1>')
})

axios
  .get(
    'https://api.nasa.gov/planetary/apod?api_key=a6315c7d-852e-4efb-97ba-7c1f44076048'
  )
  .then(response => {
    console.log(response.data.url)
    console.log(response.data.explanation)
  })
  .catch(error => {
    console.log(error)
  })

let getMovies = (req, res, next) => {
  fs.readFile(noteDataPath, (err, data) => {
    req.notes = JSON.parse(data)
    next()
  })
}
