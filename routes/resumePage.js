const express = require('express');
const router = express.Router();
const userInfoController = require('../controllers/userInfoController');
const userEducationController = require('../controllers/userEducationController');
const userExperienceController = require('../controllers/userExperienceController');
const userInfoTagController = require('../controllers/userInfoTagController');
const userSkillTagController = require('../controllers/userSkillTagController');
const userSocialButtonController = require('../controllers/userSocialButtonController');
const userTimelineController = require('../controllers/userTimelineController');

router.get('/getuserinfo/:id?',userInfoController.get);
router.get('/getusereducation/:id?',userEducationController.get);
router.get('/getuserexperience/:id?',userExperienceController.get);
router.get('/getuserinfotag/:id?',userInfoTagController.get);
router.get('/getuserskilltag/:id?',userSkillTagController.get);
router.get('/getsocialbutton/:id?',userSocialButtonController.get);
router.post('/getusertimeline/:id?',userTimelineController.post);

module.exports = router;

