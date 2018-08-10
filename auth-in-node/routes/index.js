const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passportLocal = require('../auth/local')
const passportGithub = require('../auth/github')
const protect = require('connect-ensure-login').ensureLoggedIn

router.get('/', (req, res, next) => {
  res.render('home', { user: req.user })
})

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/signup', (req, res, next) => {
  require('bcrypt').hash(req.body.password, 10, (err, pass) => {
    const user = new User({
      username: req.body.username,
      name: req.body.name,
      password: pass
    })
    user.save((err, user) => {
      if (err) return res.redirect('/')
      passportLocal.authenticate('local', { failureRedirect: '/' })(
        req,
        res,
        () => {
          res.redirect('/profile')
        }
      )
    })
  })
})

router.post(
  '/login',
  passportLocal.authenticate('local', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/profile')
  }
)

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

router.get('/profile', protect(), (req, res, next) => {
  res.render('profile', { user: req.user })
})

router.get(
  '/auth/github',
  passportGithub.authenticate('github', { scope: ['user.email'] })
)

router.get(
  '/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/profile')
  }
)

module.exports = router
