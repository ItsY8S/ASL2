const express = require('express')
const router = express.Router()
const path = require('path')
const movieController = require('../controllers/movieController')

router.get('/', movieController.moviePage)

module.exports = router
