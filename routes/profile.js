const express = require('express');
const router = express.Router();
const Pet = require('../models/pet')
const User = require('../models/user')

const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) {res.redirect('/login');} // if not logged in / authenticated
  else next(); // if logged in / authenticated
};
// GET  '/private-page'
router.get('/profile', checkIfAuthenticated, (req, res, next) => {
    res.render('pet/profile')

   // this shit was wrong needed username: req.username
});

module.exports = router;
