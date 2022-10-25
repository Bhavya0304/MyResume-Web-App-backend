const userInfo = require('../schemas/userInfo');

const editUserProfile = async (userid,userProfileData)=>{
    const data = await userInfo.findOneAndUpdate({user_id:userid},userProfileData,{new:true,upsert:true});
    return data;
}

module.exports = { editUserProfile }