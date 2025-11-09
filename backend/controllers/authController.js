const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key_for_jwt";

// ========================== REGISTER ==========================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // Create new user (password auto-hashed via pre-save hook)
    const user = new User({ name, email, password });
    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ========================== LOGIN ==========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ========================== CURRENT USER (ME) ==========================
exports.me = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("❌ Token Verification Error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
