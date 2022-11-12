const express = require('express');
const router = express.Router();
const userInfoController = require('../controllers/userInfoController');
const userEducationController = require('../controllers/userEducationController');
const userExperienceController = require('../controllers/userExperienceController');
const userInfoTagController = require('../controllers/userInfoTagController');
const userSkillTagController = require('../controllers/userSkillTagController');
const userSocialButtonController = require('../controllers/userSocialButtonController');
const userTimelineController = require('../controllers/userTimelineController');
const decodeToken = require('../middlewares/decodeToken');

router.get('/getuserinfo/:id?',decodeToken.decodeToken,userInfoController.get);
router.get('/getusereducation/:id?',decodeToken.decodeToken,userEducationController.get);
router.get('/getuserexperience/:id?',decodeToken.decodeToken,userExperienceController.get);
router.get('/getuserinfotag/:id?',decodeToken.decodeToken,userInfoTagController.get);
router.get('/getuserskilltag/:id?',decodeToken.decodeToken,userSkillTagController.get);
router.get('/getsocialbutton/:id?',decodeToken.decodeToken,userSocialButtonController.get);
router.post('/getusertimeline/:id?',decodeToken.decodeToken,userTimelineController.post);

module.exports = router;

