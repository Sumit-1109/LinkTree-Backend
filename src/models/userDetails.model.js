const mongoose = require("mongoose");

const CATEGORIES = [
  "Business",
  "Creative",
  "Education",
  "Entertainment",
  "Fashion & Beauty",
  "Food & Beverage",
  "Government & Politics",
  "Health & Wellness",
  "Non-Profit",
  "Other",
  "Tech",
  "Travel & Tourism",
];

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
    username: {
      type: String,
      unique: true,
      trim: true,
      sparse: true,
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
    tAndC: {
      type: Boolean,
      required: true,
      default: false,
    },
    category: {
      type: String,
      enum: CATEGORIES,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userDetails);
