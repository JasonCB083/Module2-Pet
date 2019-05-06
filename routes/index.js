const express = require('express');
const router = express.Router();
const authRouter = require('./auth-routes');
const feedRouter = require('./feed');
const petRouter = require('./pet');

// *  '/'
router.use('/', authRouter);
router.use('/feed', feedRouter);
router.use('/pet', petRouter);

/* /* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Passport.js' });
  res.render('auth/pre-login');
});

module.exports = router;
