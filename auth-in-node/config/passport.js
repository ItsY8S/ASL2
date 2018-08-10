const passport = require('passport')
const User = require('../models/User')

passport.serializeUser((user, next) => {
  next(null, user._id)
})

passport.deserializeUser((id, next) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) return next(err)
    next(null, user)
  })
})

module.exports = passport
