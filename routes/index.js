const express = require('express');
const router = express.Router();
const authRouter = require('./auth-routes');
const feedRouter = require('./feed');
const petRouter = require('./pet');
const profileRouter = require('./profile');
const userProfile = require('./user-profile');

// *  '/'
router.use('/', authRouter);
router.use('/feed', feedRouter);
router.use('/pet', petRouter);
router.use('/profile', profileRouter);
router.use('/user-profile', userProfile);

/* /* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Passport.js' });
  res.render('auth/pre-login');
});

module.exports = router;
