const express = require('express')
const router = express.Router()
const path = require('path')
const axios = require('axios')

// Default page
router.get('/', (req, res, next) => {
  // GET DAT FEED WOWOWOW
  async function getFeed() {
    try {
      const response = await axios.get('http://localhost:8000/feed', {
        proxy: { host: '127.0.0.1', port: 8000 }
      })
      // Log the response data
      console.log(response.data)
      // Respond with the response data
      res.json(response.data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  // Render their feed
  getFeed()
})

// Render all posts from a user based on their id
router.get('/feed/:userId', (req, res) => {
  // Async / await axios response
  async function getUserPosts() {
    // Try it. Also check for failure.
    try {
      // Store the response in a variable
      const response = await axios.get('http://localhost:8000/feed/:id', {
        proxy: { host: '127.0.0.1', port: 8000 }
      })
      // Log the response data
      console.log(response.data)
      // Respond with the data
      res.json(response.data)
      // Catch the error in the event of one
    } catch (error) {
      // Log the error
      console.log('Error:', error)
    }
  }

  // Render the posts for a user
  getUserPosts()
})

// New route
router.get('/new', (req, res) => {
  // Reender the form view
  res.render('form')
})

// Create a new post
router.post('/post', (req, res) => {
  var bodyFormData = new FormData()
  bodyFormData.set('text', 'This is a new post')

  axios({
    method: 'post',
    url: 'http://localhost:8000/post',
    data: bodyFormData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  })
    .then(function(response) {
      //handle success
      console.log(response)
    })
    .catch(function(response) {
      //handle error
      console.log(response)
    })

  // axios.post('http://localhost:8000/post', {
  //     "id": "5",
  //     "text": "Test post",
  //     "likes": "5"
  // })
  //     .then(function (response) {
  //         console.log(response);
  //     })
  //     .catch(function (error) {
  //         console.log(error);
  //     })
})

module.exports = router
