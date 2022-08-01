const userInfo = require('../schemas/userInfo');
const userEducation = require('../schemas/userEducation');
const userExperience = require('../schemas/userExperience');
const userInfoTag = require('../schemas/userInfoTag');
const userSkillTag = require('../schemas/userSkillTag');
const userSocialButton = require('../schemas/userSocialButton');
const userTimeline = require('../schemas/userTimeline');

let getUserInfo = async ()=>{
    const data = await userInfo.findOne({});
    return data;
}

let getUserEducation = async ()=>{
    const data = await userEducation.find({});
    return data;
}

let getUserExperience = async ()=>{
    const data = await userExperience.find({});
    return data;
}

let getUserInfoTag = async ()=>{
    const data = await userInfoTag.find({});
    return data;
}

let getUserSkillTag = async ()=>{
    const data = await userSkillTag.find({});
    return data;
}

let getUserSocialButton = async ()=>{
    const data = await userSocialButton.find({});
    return data;
}

let getUserTimeline = async (number,skip)=>{
    const data = await userTimeline.find({}).skip(skip).limit(number);
    return data;
}

module.exports = {getUserInfo,getUserEducation,getUserExperience,getUserInfoTag,getUserSkillTag,getUserSocialButton,getUserTimeline};