const userInfo = require('../schemas/userInfo');
const userInfoTag = require('../schemas/userInfoTag');
const UserSkillTag = require('../schemas/userSkillTag');
const UserSocialIcons = require('../schemas/userSocialButton');
const userEducation = require('../schemas/userEducation');
const userExperince = require('../schemas/userExperience');
const userTimeline = require('../schemas/userTimeline');
const User = require('../schemas/users');
var ObjectID = require('mongodb').ObjectID;


const editUserProfile = async (userid,userProfileData)=>{
    const status = await User.findOneAndUpdate({_id:userid},{Status:"active"},{new:true,upsert:true});
    const data = await userInfo.findOneAndUpdate({user_id:userid},userProfileData,{new:true,upsert:true});
    return data;
}

const editUserInfoTag = async (userid,userInfoTagData)=>{
    const data = await userInfoTag.findOneAndUpdate({user_id:userid,_id:userInfoTagData._id},userInfoTagData,{new:true})
    return data;
}

const addUserInfoTag = async (userid,userInfoTagData)=>{
    var newData = new userInfoTag(
        {
            _id:new ObjectID(),
            user_id:userid,
        ...userInfoTagData
        }
    );
    const data = await userInfoTag.findOneAndUpdate({user_id:userid,_id:newData._id},newData,{new:true,upsert:true});
    return data;
}

const deleteUserInfoTag = async (userid,id)=>{
    const data = await userInfoTag.deleteOne({user_id:userid,_id:id._id});
    return data;
}

const editUserSkillTag = async (userid,userSkillTagData)=>{
    const data = await UserSkillTag.findOneAndUpdate({user_id:userid,_id:userSkillTagData._id},userSkillTagData,{new:true})
    return data;
}

const UpdateSkillsOrder = async (arrObj)=>{
    const data = await new Promise((resolve,reject)=>{
        arrObj.forEach(async (obj)=>{
            await UserSkillTag.findOneAndUpdate({_id:obj._id},{_id:obj._id,order:obj.order},{new:true})
        })
        resolve(true)
    }) 
    return data;
}

const addUserSkillTag = async (userid,userSkillTagData)=>{
    var newData = new UserSkillTag(
        {
            _id:new ObjectID(),
            user_id:userid,
        ...userSkillTagData
        }
    );
    const data = await UserSkillTag.findOneAndUpdate({user_id:userid,_id:newData._id},newData,{new:true,upsert:true});
    return data;
}

const deleteUserSkillTag = async (userid,id)=>{
    const data = await UserSkillTag.deleteOne({user_id:userid,_id:id._id});
    return data;
}



const editUserSocialIcons = async (userid,userSocialIconsData)=>{
    console.log(userSocialIconsData)
    const data = await UserSocialIcons.findOneAndUpdate({user_id:userid,_id:userSocialIconsData._id},userSocialIconsData,{new:true})
    return data;
}

const addUserSocialIcons = async (userid,userSocialIconsData)=>{
    var newData = new UserSocialIcons(
        {
            _id:new ObjectID(),
            user_id:userid,
        ...userSocialIconsData
        }
    );
    const data = await UserSocialIcons.findOneAndUpdate({user_id:userid,_id:newData._id},newData,{new:true,upsert:true});
    return data;
}

const deleteUserSocialIcons = async (userid,id)=>{
    const data = await UserSocialIcons.deleteOne({user_id:userid,_id:id._id});
    return data;
}


const editUserEducation = async (userid,userEducationData)=>{
    const data = await userEducation.findOneAndUpdate({user_id:userid,_id:userEducationData._id},userEducationData,{new:true})
    return data;
}

const UpdateEducationOrder = async (arrObj)=>{
    const data = await new Promise((resolve,reject)=>{
        arrObj.forEach(async (obj)=>{
            await userEducation.findOneAndUpdate({_id:obj._id},{_id:obj._id,order:obj.order},{new:true})
        })
        resolve(true)
    }) 
    return data;
}

const addUserEducation = async (userid,userEducationData)=>{
    var newData = new userEducation(
        {
            _id:new ObjectID(),
            user_id:userid,
        ...userEducationData
        }
    );
    const data = await userEducation.findOneAndUpdate({user_id:userid,_id:newData._id},newData,{new:true,upsert:true});
    return data;
}

const deleteUserEducation = async (userid,id)=>{
    const data = await userEducation.deleteOne({user_id:userid,_id:id._id});
    return data;
}


const editUserExperience = async (userid,UserExperienceData)=>{
    const data = await userExperince.findOneAndUpdate({user_id:userid,_id:UserExperienceData._id},UserExperienceData,{new:true})
    return data;
}

const UpdateExperienceOrder = async (arrObj)=>{
    const data = await new Promise((resolve,reject)=>{
        arrObj.forEach(async (obj)=>{
            await userExperince.findOneAndUpdate({_id:obj._id},{_id:obj._id,order:obj.order},{new:true})
        })
        resolve(true)
    }) 
    return data;
}

const addUserExperience = async (userid,UserExperienceData)=>{
    var newData = new userExperince(
        {
            _id:new ObjectID(),
            user_id:userid,
        ...UserExperienceData
        }
    );
    const data = await userExperince.findOneAndUpdate({user_id:userid,_id:newData._id},newData,{new:true,upsert:true});
    return data;
}

const deleteUserExperience = async (userid,id)=>{
    const data = await userExperince.deleteOne({user_id:userid,_id:id._id});
    return data;
}

const editUserTimeline = async (userid,UserTimelineData)=>{
    const data = await userTimeline.findOneAndUpdate({user_id:userid,_id:UserTimelineData._id},UserTimelineData,{new:true})
    return data;
}

const addUserTimeline = async (userid,UserTimelineData)=>{
    var newData = new userTimeline(
        {
            _id:new ObjectID(),
            user_id:userid,
        ...UserTimelineData
        }
    );
    const data = await userTimeline.findOneAndUpdate({user_id:userid,_id:newData._id},newData,{new:true,upsert:true});
    return data;
}

const deleteUserTimeline = async (userid,id)=>{
    const data = await userTimeline.deleteOne({user_id:userid,_id:id._id});
    return data;
}
const addUser = async (UserData)=>{
    var newData = new User(
        {
            _id:new ObjectID(),
        ...UserData
        }
    );
    const data = await User.findOneAndUpdate({_id:newData._id},newData,{new:true,upsert:true});
    return data;
}

const ActivateUser = async (UserId)=>{
    var newData = new User(
        {
            _id:UserId,
            Status:"incomplete"
        }
    );
    const data = await User.findOneAndUpdate({_id:newData._id},newData,{new:true,upsert:true});
    return data;
}




module.exports = { editUserProfile,editUserInfoTag,addUserInfoTag,deleteUserInfoTag,editUserSkillTag,UpdateSkillsOrder,addUserSkillTag,deleteUserSkillTag,editUserSocialIcons,addUserSocialIcons,deleteUserSocialIcons,editUserEducation,addUserEducation,deleteUserEducation,editUserExperience,UpdateEducationOrder,UpdateExperienceOrder,addUserExperience,deleteUserExperience,editUserTimeline,addUserTimeline,deleteUserTimeline,addUser,ActivateUser }