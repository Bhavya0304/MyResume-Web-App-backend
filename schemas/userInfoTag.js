const mongoose = require("mongoose");

const UserInfoTagSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId ,
    required: true,
  },
  Tag_Name: {
    type: String,
    required: true,
  },
  Link: {
    type: String,
    required: true,
  },
  user_id: {
    type: String
  }
});

const UserInfoTag = mongoose.model("userinfotag", UserInfoTagSchema);

module.exports = UserInfoTag;