const mongoose = require("mongoose");

const UserSkillTagSchema = new mongoose.Schema({
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
  Image: {
    type: String,
    required: true,
  },
  Color: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  order:{
    type:Number,
    required:true
  },
  user_id: {
    type: String
  }
});

const UserSkillTag = mongoose.model("userskilltag", UserSkillTagSchema);

module.exports = UserSkillTag;