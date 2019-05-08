const express = require('express');
const router = express.Router();
// const Pet = require('../models/pet');
// const User = require('../models/user');

const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else next(); // if logged in / authenticated
};
// GET  '/profile page'
router.get('/', checkIfAuthenticated, (req, res, next) => {
  res.render('pet/profile');
});

module.exports = router;
