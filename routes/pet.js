const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');
const User = require('../models/user');
const Borrow = require('../models/borrow');
const parser = require('../config/cloudinary');
const borrowController = require('../controller/borrow');

const checkEmptyFields = (req, res, next) => {
  const { petName, age, description, type, size } = req.body;
  if (petName === '' || age === '' || description === '' || type === '' || size === '') {
    res.render('pet/add-pet', { message: 'Fill all the fields' });
  } else next();
};

const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login'); // if not logged in /authenticated
  } else next(); // if logged in / authenticated
};

// GET  '/add-pet-page'
router.get('/add', checkIfAuthenticated, (req, res, next) => {
  res.render('pet/add-pet');
});

// post route
router.post('/add', checkIfAuthenticated, checkEmptyFields, parser.single('picture'), (req, res, next) => {
  console.log(req.body);

  const { petName, age, description, type, size } = req.body;
  console.log(req.body);
  const id = req.session.passport.user;
  if (!req.file) {
    res.render('pet/add-pet', { message: 'Plase select a picture!' });
  }
  const picture = req.file.secure_url;

  const newPet = new Pet({
    petName,
    age,
    description,
    type,
    size,
    picture
  });

  const savePet = newPet.save();
  const updateUserPromise = User.findByIdAndUpdate(id, { $push: { pets: newPet._id } });

  Promise.all([savePet, updateUserPromise])
    .then((response) => {
      console.log(response);
      res.redirect('/feed');
    })
    .catch(next);
});

// GET - Pet ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Pet.findById(id)
    .then((pet) => res.render(`pet/pet-profile`, pet))
    .catch((err) => console.log(err));
});

// POST - request Pet
// router.post('/pet-profile/request/:id', (req, res, next) => {
//   const id = req.params.borrowId;
//   console.log(id);

//   borrowController.getBorrowInfo(id)
//     .then((borrowInfo) => {
//       if (!borrowInfo) {
//         return next();
//       }
//       const data = {
//         requestedPet: borrowInfo.requestedPet,
//         offeredPet: borrowInfo.offeredPet,
//         borrowId: borrowInfo.borrowId,
//         isApprover: borrowInfo.approver.equals(req.session.currentUser._id)
//       };
//       res.render('feed', data);
//     })
//     .catch(next);
// });

router.post('/pet-profile/request/:id', (req, res, next) => {


  const {id} = req.params;

  const userID = req.session.passport.user

  let updateUser = User.findByIdAndUpdate(userID, { $push: { requested: id } })
  let updatePet = Pet.findByIdAndUpdate(id, { $set: { isPending: false } })
    Promise.all([updateUser, updatePet])
    .then((response) => {console.log(response);res.redirect('/feed')})
    .catch((err) => console.log(err));
});

// POST - accept request
router.post('/user-profile/request/accept/:id', (req, res, next) => {
  const id = req.params.id;

  Pet.findByIdAndUpdate(id, { $set: { isAvailable: false } })
    .then((pet)=> {
      console.log(pet)
    })
    .catch((err)=>{
      console.log(err)})
  // Borrow.findOne({ _id: borrowId })
  //   .then((borrow) => {
  //     if (!borrow) {
  //       return next();
  //     }
  //     if (!borrow.approver._id.equals(req.session.currentUser._id)) {
  //       return next();
  //     }
  //     return Pet.findByIdAndUpdate(borrow.petOffered, { owner: borrow.approver })
  //       .then(() => {
  //         return Pet.findByIdAndUpdate(borrow.petRequested, { owner: borrow.borrower });
  //       })
  //       .then(() => {
  //         return Borrow.findByIdAndUpdate(borrowId, { status: 'approved' });
  //       })
  //       .then(() => {
  //         return Borrow.updateMany({
  //           $and: [
  //             { $or: [
  //               { petRequested: borrow.petOffered },
  //               { petRequested: borrow.petRequested },
  //               { petOffered: borrow.petOffered },
  //               { petOffered: borrow.petRequested }
  //             ]
  //             },
  //             { status: 'pending' }
  //           ] }
  //         );
  //       });
  //   })
    .then(() => {
      res.redirect('/user-profile');
    })
    .catch(next);
});

// POST - decline request
router.post('/user-profile/request/decline/:id', (req, res, next) => {
  const id = req.params.id;

  Pet.findByIdAndUpdate(id, { $set: { isAvailable: true, isPending: true  } })
    .then((pet)=> {
      res.redirect('/user-profile');
    })
    .catch((err)=>{
      console.log(err)})

  // Borrow.findOne({ _id: borrowId })
  //   .then((trade) => {
  //     if (!trade) {
  //       return next();
  //     }
  //     if (!trade.requestApprover._id.equals(req.session.currentUser._id)) {
  //       return next();
  //     }
  //     return Borrow.findByIdAndUpdate(borrowId, { status: 'rejected' })
  //       .then(() => {
  //         res.redirect('/user-profile');
  //       })
  //       .catch(next);
  //   });
});

module.exports = router;
