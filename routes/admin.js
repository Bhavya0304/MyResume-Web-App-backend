const express = require('express');
const router = express.Router();
// var multipart = require('connect-multiparty');
const passport = require('passport');
const userAuthenticationController = require('../controllers/userAuthenticationController');
const userDashboardController = require('../controllers/userDashboardController');
const userInfoController = require('../controllers/userInfoController');
const decodeToken = require('../middlewares/decodeToken');
const fileController = require('../controllers/fileController');
const uploadMiddleware = require('../middlewares/uploadFiles');
const userInfoTagController = require('../controllers/userInfoTagController');
const passportCallback = require('../classes/PassportCallback');
const AuthMiddleware = require('../middlewares/Authentication');

// var multipartMiddleware = multipart();

router.post('/login',userAuthenticationController.post);
router.get('/verifyuser',decodeToken.decodeToken,  passport.authenticate('jwt',{session:false}),userAuthenticationController.get)
router.get('/getallfiles',decodeToken.decodeToken,passport.authenticate('jwt',{session:false}),fileController.getAllFiles);
router.post('/uploadfiles',decodeToken.decodeToken, passport.authenticate('jwt',{session:false}) ,uploadMiddleware.uploadHandlerImg);
router.post('/uploadresume',decodeToken.decodeToken, passport.authenticate('jwt',{session:false})  ,uploadMiddleware.uploadHandlerPDF);
router.post('/deletefiles',decodeToken.decodeToken,  passport.authenticate('jwt',{session:false}) ,fileController.deleteFiles);
router.get('/dashboard',decodeToken.decodeToken, passport.authenticate('jwt',{session:false})  ,userDashboardController.get);
router.post('/userinfoedit',decodeToken.decodeToken,  passport.authenticate('jwt',{session:false})  ,userInfoController.post);
router.post('/userinfotagedit',decodeToken.decodeToken,  passport.authenticate('jwt',{session:false}) ,userInfoTagController.editPost);
router.post('/userinfotagadd',decodeToken.decodeToken,  passport.authenticate('jwt',{session:false}) ,userInfoTagController.addPost);
router.post('/userinfotagdelete',decodeToken.decodeToken,  passport.authenticate('jwt',{session:false})  ,userInfoTagController.delete);
router.post('/userskilltagedit',decodeToken.decodeToken,  passport.authenticate('jwt',{session:false}) ,userInfoTagController.editPost);
router.post('/userskilltagadd',decodeToken.decodeToken,  passport.authenticate('jwt',{session:false}) ,userInfoTagController.addPost);
router.post('/userskilltagdelete',decodeToken.decodeToken,  passport.authenticate('jwt',{session:false})  ,userInfoTagController.delete);

module.exports = router;