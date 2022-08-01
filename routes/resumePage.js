const express = require('express');
const router = express.Router();
const userInfoController = require('../controllers/userInfoController');
const userEducationController = require('../controllers/userEducationController');
const userExperienceController = require('../controllers/userExperienceController');
const userInfoTagController = require('../controllers/userInfoTagController');
const userSkillTagController = require('../controllers/userSkillTagController');
const userSocialButtonController = require('../controllers/userSocialButtonController');
const userTimelineController = require('../controllers/userTimelineController');

router.get('/getuserinfo',userInfoController.get);
router.get('/getusereducation',userEducationController.get);
router.get('/getuserexperience',userExperienceController.get);
router.get('/getuserinfotag',userInfoTagController.get);
router.get('/getuserskilltag',userSkillTagController.get);
router.get('/getsocialbutton',userSocialButtonController.get);
router.post('/getusertimeline',userTimelineController.post);

module.exports = router;

