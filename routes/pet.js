const express = require('express');
const router = express.Router();
const Pet = require('../models/pet')
const User = require('../models/user')

const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) {res.redirect('/login');} // if not logged in / authenticated
  else next(); // if logged in / authenticated
};
// GET  '/private-page'
router.get('/add', checkIfAuthenticated, (req, res, next) => {
    res.render('pet/add-pet')

   // this shit was wrong needed username: req.username
});

//post route
router.post('/add', checkIfAuthenticated, (req, res, next) => {
  console.log(req.body);

  const { petName, age, description, type, size } = req.body;
  console.log(req.body);
  const id = req.session.passport.user;

  const newPet = new Pet({
    petName,
    age,
    description,
    type,
    size
  })

  const savePet = newPet.save();
  const updateUserPromise = User.findByIdAndUpdate(id, { $push: { pets : newPet._id}})

  Promise.all([savePet, updateUserPromise])
    .then((response) =>{
      console.log(response);
      res.redirect('/feed')
    })
    .catch(next)


});
// take the data from the req.body

// const newPet = {

//in here go your fields from the req.body
//}

// newPet = new Pet()

//newPet.save -- then -- catch
module.exports = router;
