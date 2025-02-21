const mongoose = require("mongoose");

const profileAppearance = new mongoose.Schema({
    userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  linkLayout: {
    type: String,
    enum: ["list", "grid"], 
    default: "list",
  },
  buttonFillColour: {
    type: String,
  },
  buttonFontColour: {
    type: String,
  },
  buttonOutline: {
    type: Boolean,
    default: false,
  },
  profileFont: {
    type: String,
  },
  profileFontColor: {
    type: String,
  },
  theme: {
    type: String,
  },
  buttonShadow: {
    type: Boolean,
    default: false,
  }
}, {timestamps: true});

module.exports = mongoose.model("ProfileAppearance", profileAppearance);