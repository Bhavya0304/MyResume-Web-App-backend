const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId ,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email:{
    type:String
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  latest_jwt: {
    type: String
  },
  Status:{
    type:String,
    required:true,
    default:"inactive"
  }
});

const User = mongoose.model("user", UsersSchema);

module.exports = User;