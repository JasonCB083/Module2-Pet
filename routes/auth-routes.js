// routes/auth-routes.js
const express = require('express');
const router = express.Router();
const passport = require('passport'); // i hope this works

// const ensureLogin = require('connect-ensure-login');

// // Custom middleware to check if user is logged in
// const checkIfAuthenticated = (req, res, next) => {
//   if (!req.user) {res.redirect('/login');} // if not logged in / authenticated
//   else next(); // if logged in / authenticated
// };

// User model
const User = require('../models/user');
const Pet = require('../models/pet');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// GET  '/logout'
router.get('/logout', (req, res) => {
  /* Passport exposes a `logout()` method on `req` that can be called
  from any route handler. `req.logout()` deletes the session from the session storage
  and in this way 'logs out' the user
  . */
  req.logout();
  res.redirect('/login');
});

// GET  '/private-page'
/* router.get('/feed', checkIfAuthenticated, (req, res, next) => {
  Pet.find({})
    .then((pets)=>{
      console.log(pets)
      res.render('auth/feed', {pets})
    })
    .catch(err => {console.log(err)});
}); */

// GET  '/login'
router.get('/login', (req, res, next) => {
  res.render('auth/login', { 'message': req.flash('error') });
});

// POST  '/login'
router.post('/login', passport.authenticate('local', {
  successRedirect: '/feed', // changed
  failureRedirect: '/login',
  passReqToCallback: true,
  failureFlash: true
}));
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   })(req, res, next);
// });

// GET '/signup'
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

// POST  '/signup'
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') { // this shit was also wrong password was because of a single quote
    res.render('auth/signup', { message: 'Indicate username and password' });
    return;
  }
  User.findOne({ username: username })
    .then((user) => {
      console.log('user', user);
      if (user !== null) {
        res.render('auth/signup', { message: 'The username already exists' });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({ username, password: hashPass });

      newUser.save((err) => {
        if (err) res.render('auth/signup', { message: 'Something went wrong' });
        else res.redirect('/login');
      });
    })
    .catch(error => next(error));
});

module.exports = router;
