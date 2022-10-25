const express = require('express');
const router = express.Router();
const passport = require('passport');
const userAuthenticationController = require('../controllers/userAuthenticationController');
const userDashboardController = require('../controllers/userDashboardController');
const userInfoController = require('../controllers/userInfoController');
const decodeToken = require('../middlewares/decodeToken');

router.post('/login',userAuthenticationController.post);
router.get('/dashboard',decodeToken.decodeToken,  passport.authenticate('jwt', { session: false }) ,userDashboardController.get);
router.post('/userinfoedit',decodeToken.decodeToken,  passport.authenticate('jwt', { session: false }) ,userInfoController.post);
router.get('/verifyuser',decodeToken.decodeToken,  passport.authenticate('jwt', { session: false }) ,userAuthenticationController.get)

module.exports = router;