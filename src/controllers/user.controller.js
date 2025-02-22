const User = require("../models/userDetails.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const {
  isValidPassword,
  isValidEmail,
  isValidUsername,
  isValidCategory
} = require("../utils/validation");

const signup = async (req, res) => {
  try {
    const { fName, lName, email, password, confirmPassword, tAndC } = req.body;

    let errors = {};

    if (!fName) {
      errors.fName = "First name is required*";
    }
    if (!email) {
      errors.email = "Email is required*";
    }
    if (password === '') {
      errors.password = "Please enter your password*";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match*";
    }
    if (password && !isValidPassword(password)) {
      errors.password =
        "Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character (!@#$%^&*)";
    };
    if (!isValidEmail(email)) {
      errors.email = "Invalid email address*";
    }
    if (!tAndC) {
      errors.tAndC = "You must accept the terms and conditions*";
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ errors: { email: "Email already in use*" } });

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fName,
      lName,
      email,
      password: hashedPassword,
      tAndC
    });

    await newUser.save();
    
    res.status(201).json({ message: "Welcome aboard !!", userId: newUser._id });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message : "Incomplete Credentials" } );
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message : "Invalid Credentials"  });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message : "Invalid Credentials"  });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful!", token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const userinfo = async (req, res) => {
  try {
    const { userId, username, category } = req.body;

    let errors = {};

    if (!userId) {
      return res.status(400).json({ message: "User ID is required*"  });
    }

    if (!username) {
      errors.username = "Username is required*";
    } else if (!isValidUsername(username)) {
      errors.username = "Username must be 8-16 characters long and contain at least one letter*";
    }

    if (!category) {
      errors.category = "Category is required*";
    } else if (!isValidCategory(category)) {
      errors.category = "Invalid category selection*";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ errors: { username: "Username is already taken*" } });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ errors: { user: "User not found" } });
    }

    user.username = username;
    user.category = category;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully!"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { signup, signin, userinfo };