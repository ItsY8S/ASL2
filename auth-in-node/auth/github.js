const passport = require('passport')
const Strategy = require('passport-github2').Strategy
const User = require('../models/User')

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    (accessToken, refreshToken, profile, next) => {
      User.findOneOrCreate(
        { username: profile.username },
        {
          username: profile.username,
          name: profile.displayName
        },
        (err, user) => {
          if (err) return next(err)
          if (!user) return next(null, false)
          return next(null, user)
        }
      )
    }
  )
)

module.exports = passport
