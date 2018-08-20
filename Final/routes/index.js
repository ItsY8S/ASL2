const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Fruit = require('../models/Fruit')
const passportLocal = require('../auth/local')
const protect = require('connect-ensure-login').ensureLoggedIn
const { check, validationResult } = require('express-validator/check')

// GET - / Route
// This should redirect the user to the list page if they are logged in. If not, render the login page
router.get('/', (req, res, next) => {
  if (req.user) {
    res.redirect('list')
  } else {
    // Render the login view and pass the user request along
    res.render('login', { user: req.user })
    // Verify this line
  }
})

// GET - Login Route
router.get('/login', (req, res, next) => {
  // Render the login view
  res.render('login')
})

// POST - Login route
// This should attempt to authenticate the user with the credentials they entered. If authentication was unsuccessful, redirect them to the login page
router.post(
  '/login',
  passportLocal.authenticate('local', { failureRedirect: '/login' }),
  (req, res, next) => {
    // Upon successful authentication, redirect the user to the list page
    res.redirect('/list')
  }
)

// GET - Signup route
router.get('/signup', (req, res, next) => {
  // Display the signup view
  res.render('signup')
})

// POST - Signup route
// This should do a few things. It will perform a check with express-validator to ensure that the user had provided a username with a minimum of 5 characters. It should also validate the password to be a minimum length of 4 and a maximum length of 15
router.post(
  '/signup',
  [
    check(
      'username',
      'Invalid Username. Must be minimum of 5 characters.'
    ).isLength({ min: 5 }),
    check(
      'password',
      'Invalid Password. Must be between 4 and 15 characters.'
    ).isLength({ min: 4, max: 15 })
  ],
  (req, res, next) => {
    // Store the errors in a variable
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // Send the user back to the signup page if errors occurred
      return res.redirect('/signup')
      // Not sure if I should return JSON or redirect
      //   return res.status(422).json({ errors: errors.array() })
    }
    // Use bcrypt to hash the password 10 times
    require('bcrypt').hash(req.body.password, 10, (err, pass) => {
      // User mongoose to initialize a model and store the newly created users request and hashed password
      const user = new User({
        username: req.body.username,
        password: pass
      })
      // Save the user to the database
      user.save((err, user) => {
        // If there was an error saving the user, redirect to the signup page
        if (err) return res.redirect('/signup')
        passportLocal.authenticate('local', { failureRedirect: '/signup' })(
          req,
          res,
          () => {
            // If everything was successful, redirect the user to the list page
            res.redirect('/list')
          }
        )
      })
    })
  }
)

// GET - Logout route
router.get('/logout', (req, res, next) => {
  // Use the logout method to end the session
  req.logout()
  // Send the user back to the login page
  res.redirect('/login')
})

// GET - List route ---PROTECTED🔒
router.get('/list', protect(), (req, res, next) => {
  // Use the fruit model to find the fruits of the currently logged in user
  Fruit.find({ _owner: req.user._id }, function(err, fruits) {
    // Output errors if any
    if (err) return err
    // Else - render the list and pass it some stuff
    res.render('list', { user: req.user, fruits: fruits })
  })
})

// POST - New route ---PROTECTED🔒
router.post('/new', protect(), (req, res, next) => {
  // Find a user in the database with the user id in the request. The point of finding a user first is to access the id and set it to the newly created fruit
  User.findOne(req.user._id, function(err, user) {
    // Create a new fruit
    const fruit = new Fruit({
      name: req.body.name,
      quantity: req.body.quantity,
      _owner: user._id
    })
    // Save the fruit to the database
    fruit.save((err, fruit) => {
      // If any errors occur, go back to the list page
      if (err) return res.redirect('/list')
      // Make sure the user is logged in
      passportLocal.authenticate('local', { failureRedirect: '/list' })(
        req,
        res,
        () => {
          // This redirect is essentially to see the new fruit on the page without manually refreshing
          res.redirect('/list')
        }
      )
    })
  })
})

// GET - Edit by fruit id route ---PROTECTED🔒
router.get('/edit/:fruitId', protect(), (req, res) => {
  // Before editing, the fruit to be modified must be found in the database.
  Fruit.findById(req.params.fruitId, function(err, fruit) {
    console.log(req.user)
    // Once found, render the edit view and pass it the user and the fruit data
    res.render('edit', { user: req.user, fruit: fruit })
  })
})

// POST - Edit by fruit id route ---PROTECTED🔒
router.post('/edit/:fruitId', protect(), (req, res) => {
  console.log('Fruit Id', req.params.fruitId)
  // Find the fruit and update it with the request body
  // Set new to true to see the updated value of the fruit
  Fruit.findByIdAndUpdate(
    req.params.fruitId,
    req.body,
    { new: true, upsert: true },
    function(err, fruit) {
      // Throw an error if things act up
      if (err) throw err
      // Redirect to the list view to see changes
      return res.redirect('/list')
    }
  )
  console.log('Body here', req.body)
})

// GET - Delete fruit by id ---PROTECTED🔒
router.get('/delete/:fruitId', protect(), (req, res) => {
  // Find the fruit by the id in the url (req.params) and remove it
  Fruit.findByIdAndRemove(req.params.fruitId, function(err) {
    // Throw an error if needed
    if (err) throw err
    // Verify deletion in the console
    console.log('Fruit deleted')
    // Redirect back to the list (refresh for changes)
    return res.redirect('/list')
  })
})

// GET - Use the api route to show fruits owned by the user
router.get('/api/:userId', (req, res) => {
  // Splitting the url path to extract the userId
  const pathArray = req.url.split('/')
  const userId = pathArray[2]

  // Find all fruits owned by the user
  Fruit.find({ _owner: userId }, function(err, fruit) {
    // Redirect if errors
    if (err) return res.redirect('/')
    // console.log(fruit)
    // Set the header to be ready for JSON
    res.setHeader('Content-Type', 'application/json')
    // Send a pretty json string back to the user
    res.send(JSON.stringify(fruit))
  })
})

module.exports = router
