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
  }
});

const User = mongoose.model("user", UsersSchema);

module.exports = User;