const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');

const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) { res.redirect('/login'); } // if not logged in / authenticated
  else next(); // if logged in / authenticated
};
// GET  '/private-page'
router.get('/', checkIfAuthenticated, (req, res, next) => {
  Pet.find({})
    .then((pets) => {
      res.render('feed', { pets });
    })
    .catch(err => { console.log(err); });
  // this shit was wrong needed username: req.username
});

module.exports = router;
