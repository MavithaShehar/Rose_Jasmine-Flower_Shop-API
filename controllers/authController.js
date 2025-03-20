
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
require("dotenv").config();

// Register User
const registerUser = async (req, res) => {
    try {
        let { username, email, password, role } = req.body;    
        if (!role) {
            role = "user";
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ username, email, password: hashedPassword, role });

        await newUser.save();
        
        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expiry time
      });
  
      res.json({ token, role: user.role });  // Sending token and role
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

module.exports = { registerUser, loginUser };
