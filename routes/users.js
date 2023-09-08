const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Instagram");

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  gender: String,
  DateOfBirth: {
    type: Date,
  },
  image: {
    type: String,
    default: "./user.png",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    }
  ],
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }
  ],
  friendRequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: "FriendRequest" },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  bio: String,
  email: {
    type: String,
    required: true,
  },
  sockeId: String,
  password: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);
