const userInfo = require('../schemas/userInfo');
const userInfoTag = require('../schemas/userInfoTag');


const editUserProfile = async (userid,userProfileData)=>{
    const data = await userInfo.findOneAndUpdate({user_id:userid},userProfileData,{new:true,upsert:true});
    return data;
}

const editUserInfoTag = async (userid,userInfoTagData)=>{
    const data = await userInfoTag.findOneAndUpdate({user_id:userid,_id:userInfoTagData._id},userInfoTagData,{new:true})
    return data;
}

const addUserInfoTag = async (userid,userInfoTagData)=>{
    const data = await userInfoTag.updateOne({user_id:userid},userInfoTagData,{new:true,upsert:true})
    return data;
}

const deleteUserInfoTag = async (userid,id)=>{
    const data = await userInfoTag.deleteOne({user_id:userid,_id:id});
    return data;
}

module.exports = { editUserProfile,editUserInfoTag,addUserInfoTag,deleteUserInfoTag }