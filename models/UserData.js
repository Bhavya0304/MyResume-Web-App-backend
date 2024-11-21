const userInfo = require('../schemas/userInfo');
const userInfoTag = require('../schemas/userInfoTag');
const UserSkillTag = require('../schemas/userSkillTag');
var ObjectID = require('mongodb').ObjectID;


const editUserProfile = async (userid,userProfileData)=>{
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

module.exports = { editUserProfile,editUserInfoTag,addUserInfoTag,deleteUserInfoTag,editUserSkillTag,addUserSkillTag,deleteUserSkillTag }