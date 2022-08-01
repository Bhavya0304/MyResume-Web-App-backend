const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId ,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  ProfilePic: {
    type: String,
    required: true,
  },
  ProfileCovers: [{
    type: String
  }],
  About: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  }
});

const UserInfo = mongoose.model("userinfo", UserInfoSchema);

module.exports = UserInfo;