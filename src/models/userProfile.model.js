const mongoose = require("mongoose");

const userProfile = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profileImage: {
    type: String,
  },
  profileTitle: {
    type: String,
  },
  bio: {
    type: String,
  },
  addLink: [
    {
      title: { type: String },
      url: { type: String },
      linkApplications : {type : String}
    }
  ],
  addShop: [
    {
      shopName: { type: String },
      shopUrl: { type: String },
      shopApplications : {type : String}
    }
  ],
  bannerBackgroundColour: {
    type: String,
  },
  appearance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProfileAppearance",
  }

}, {timestamps: true});

module.exports = mongoose.model("UserProfile", userProfile);