const mongoose = require("mongoose");

const UserTimelineSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId ,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  Text: {
    type: String
  },
  Date: {
    type: String,
    required:true
  },
  Icon: {
    type: String,
  },
  Tags: [
    {
    Tag_Name:{
        type: String,
    },
    Tag_Color:{
        type: String,
    }
    }
  ],
  Html: {
    type: String,
  },
});

const UserTimeline = mongoose.model("usertimeline", UserTimelineSchema);

module.exports = UserTimeline;