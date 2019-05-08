const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');
const User = require('../models/user');
const parser = require('../config/cloudinary');


const checkEmptyFields = (req, res, next) => {
  const { petName, age, description, type, size } = req.body;
  if ( petName === '' || age === '' || description === '' || type === '' || size === '' )
  {res.render('pet/add-pet', { message: 'Fill all the fields' });}
  else next();
  }


const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) {res.redirect('/login');} // if not logged in / authenticated
  else next(); // if logged in / authenticated
};



// GET  '/add-pet-page'
router.get('/add', checkIfAuthenticated, (req, res, next) => {
  res.render('pet/add-pet')

});

//post route
router.post('/add', checkIfAuthenticated, checkEmptyFields, parser.single('picture'), (req, res, next) => {
  console.log(req.body);

  const { petName, age, description, type, size } = req.body;
  console.log(req.body);
  const id = req.session.passport.user;
  if(!req.file){
    res.render('pet/add-pet', { message: 'Plase select a picture!' })
  }
  const picture = req.file.secure_url

  const newPet = new Pet({
    petName,
    age,
    description,
    type,
    size,
    picture
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
// GET - Pet ID

router.get('/:id', (req, res, next) => {
  const {id} = req.params;
  Pet.findById(id)
    .then((pet)=>res.render(`pet/pet-profile`, pet))
    .catch((err)=>console.log(err))

})

// POST - request Pet
router.post('/pet-profile/request/:id', (req, res, next) => {
  const {id} = req.params;
console.log(id)
  Pet.findByIdAndUpdate(id, { $set: {isPending: false}})
    .then((pet) => res.redirect('/feed'))
    .catch((err)=>console.log(err))
  })


// POST - accept request
router.post('/user-profile/accept/:id', (req, res, next) => {
  const {id} = req.params;
  console.log(req.body);
  Pet.findByIdAndUpdate(id, {$set: {isAvaiable: false} })
    .then((pet) => res.redirect('/feed'))
    .catch((err)=>console.log(err))
  })
// POST - decline request
  router.post('/user-profile/decline/:id', (req, res, next) => {
    const {id} = req.params;

    Pet.findByIdAndUpdate(id, {$set: {isAvaiable: true, isPending: false} })
      .then((pet) => res.redirect('/feed'))
      .catch((err)=>console.log(err))
    })

module.exports = router;
