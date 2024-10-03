const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// Controller to register a new user by hashing their password and saving them to the database
const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, role } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email address is already registered" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object with the role passed in the request
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, // Add role here (either 'admin' or 'user')
    });

    // Save the new user to the database
    await newUser.save();

    // Return success response
    return res.status(201).json({ 
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      message: "User registered successfully",
    });

  } catch (error) {
    // Return error response in case of failure
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to log in a user by validating their credentials and generating a JWT token
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email. Please try again." });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid password. Please try again." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Optional: Set token expiration
    );

    // Respond with token and user data
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ msg: "An error occurred. Please try again later." });
  }
};


module.exports = {
  registerUser,
  loginUser,
};
