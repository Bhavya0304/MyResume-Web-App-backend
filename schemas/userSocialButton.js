const mongoose = require("mongoose");

const UserSocialButtonSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId ,
    required: true,
  },
  Social_Media_Name: {
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
  user_id: {
    type: String
  }
});

const UserSocialButton = mongoose.model("usersocialbutton", UserSocialButtonSchema);

module.exports = UserSocialButton;