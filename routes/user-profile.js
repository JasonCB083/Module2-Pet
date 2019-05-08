const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');
const User = require('../models/user');

const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else next(); // if logged in / authenticated
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
      res.render('user/user-profile', user);
    })
    .catch((err) => console.log(err));
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Pet.findById(id)
    .then((pet) => console.log('PET ID', id))
    .catch((err) => console.log(err));
});

router.post('/delete/:id', (req, res, next) => {
  const { id } = req.params;
  Pet.findByIdAndRemove(id)
    .then((pet) => {
      res.redirect('/user-profile');
    })
    .catch((err) => console.log(err));
});

module.exports = router;
