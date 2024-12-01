const mongoose = require("mongoose");

const UserEducationSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId ,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Value: {
    type: String
  },
  Year_from: {
    type: String,
    required: true,
  },
  Year_to: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  About: {
    type: String,
    required: true,
  },
  order:{
    type:Number,
    required:true
  }
});

const UserEducation = mongoose.model("usereducation", UserEducationSchema);

module.exports = UserEducation;