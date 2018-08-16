const express = require('express');
const router = express.Router()
const path = require('path')
const axios = require('axios');

// Default page
router.get('/', (req, res, next) => {
    // Render this view
    res.render(path.join(__dirname, '/../views/form.pug'));
})


// Feed route - display all the posts
router.get('/feed', (req, res) => {
    // async function getFeed() {
    //     try {
    //         const response = await axios.get('/feed')
    //         console.log(response);
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

    // Render this view
    res.render(path.join(__dirname, '/../views/feed.pug'))
})

// Feed route/:id - get all the posts for one user
router.get('/feed/:userId', (req, res) => {
    // get all the posts for one user


    // Render this view
    res.render(path.join(__dirname, '/../views/feed.pug'))
})

// Post post route - create a new post
router.post('/post', (req, res) => {
    // CREATE A NEW POST


    // Redirect to feed
    res.redirect('/feed')
})

// User post route - create a new user
router.post('/user', (req, res) => {
    // CREATE A NEW USER


    // Redirect to feed
    res.redirect('/feed')
})

// Post/:id put route - updates a post (changing the number of likes)
router.put('/post/:id', (req, res) => {
    // CHANGE THE NUMBER OF LIKES


    // Redirect to feed
    res.redirect('/feed')
})

// Post/:id Delete route - deletes a post
router.delete('/post/:id', (req, res) => {
    // DELETE A POST


    // Redirect to feed
    res.redirect('/feed')
})




module.exports = router;