const User = require("../models/userDetails.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
};

const signup = async (req, res) => {
  try {
    const { fName, lName, email, password, confirmPassword, tAndC } = req.body;

    let errors = {};

    if (!firstName) {
      errors.firstName = "First name is required*";
    }
    if (!email) {
      errors.email = "Email is required*";
    }
    if (!password) {
      errors.password = "Password is required*";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match*";
    }
    if (!validatePassword(password)) {
      errors.password =
        "Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character (!@#$%^&*)";
    }
    if (!tandcCheckBox) {
      errors.tandcCheckBox = "You must accept the terms and conditions*";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ errors: { email: "Email already in use*" } });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      tandcCheckBox
    });

    await newUser.save();
    
    res.status(201).json({ message: "Welcome aboard !!" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { signup };