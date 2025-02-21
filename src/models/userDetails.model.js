const mongoose = require("mongoose");

const userDetails = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: [true, "Please enter your first name*"],
      trim: true,
    },
    lName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email*"],
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Invalid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password*"],
      minlength: [8, "The password must be at least 8 characters long*"],
    },
    tandcCheckBox: {
      type: Boolean,
      required: true,
      default: false,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userDetails);
