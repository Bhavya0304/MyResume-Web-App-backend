const userInfo = require('../schemas/userInfo');
const user = require('../schemas/users');
const userEducation = require('../schemas/userEducation');
const userExperience = require('../schemas/userExperience');
const userInfoTag = require('../schemas/userInfoTag');
const userSkillTag = require('../schemas/userSkillTag');
const userSocialButton = require('../schemas/userSocialButton');
const userTimeline = require('../schemas/userTimeline');

let getUserId = async (username)=>{
    const data = await user.findOne({username:username});
    return data;
}


let getUserInfo = async (userid)=>{
    const data = await userInfo.findOne({user_id:userid});
    return data;
}

let getUserEducation = async (userid)=>{
    const data = await userEducation.find({user_id:userid});
    return data;
}

let getUserExperience = async (userid)=>{
    const data = await userExperience.find({user_id:userid});
    return data;
}

let getUserInfoTag = async (userid)=>{
    const data = await userInfoTag.find({user_id:userid});
    return data;
}

let getUserSkillTag = async (userid)=>{
    const data = await userSkillTag.find({user_id:userid});
    return data;
}

let getUserSocialButton = async (userid)=>{
    const data = await userSocialButton.find({user_id:userid});
    return data;
}

let getUserTimeline = async (userid,number,skip)=>{
    const data = await userTimeline.find({user_id:userid}).skip(skip).limit(number);
    return data;
}

module.exports = {getUserInfo,getUserEducation,getUserExperience,getUserInfoTag,getUserSkillTag,getUserSocialButton,getUserTimeline,getUserId};