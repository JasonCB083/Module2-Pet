const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');
const User = require('../models/user');

const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) {res.redirect('/login');} // if not logged in / authenticated
  else next(); // if logged in / authenticated
};

/* router.get('/', checkIfAuthenticated, (req, res, next) => {
  const id = req.session.passport.user;
  User.findById(id)
    .then((user) => res.render('user/user-profile', {id},))
    .catch((err) => console.log(err))

}); */

router.get('/', checkIfAuthenticated, (req, res, next) => {
  const id = req.session.passport.user;

  User.findById(id).populate('pets')
    .then((user) => {
      res.render('user/user-profile', user)
    })
    .catch((err) => console.log(err));
});
module.exports = router;
