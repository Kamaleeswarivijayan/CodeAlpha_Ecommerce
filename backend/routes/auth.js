const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Neon console styling
const neonLog = (message, type = 'neon') => {
  const styles = {
    success: '\x1b[36m%s\x1b[0m',     // Cyan/Neon Blue
    error: '\x1b[31m%s\x1b[0m',       // Red
    info: '\x1b[35m%s\x1b[0m',        // Magenta
    warning: '\x1b[33m%s\x1b[0m',     // Yellow
    neon: '\x1b[38;5;51m%s\x1b[0m'    // Bright Neon Blue
  };
  
  console.log(styles[type], `[AUTH] ${message}`);
};

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    neonLog(`Registration attempt for email: ${email}`, 'info');
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      neonLog(`User already exists: ${email}`, 'warning');
      return res.status(400).json({ error: "User already exists with this email" });
    }
    
    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    neonLog(`Password hashed successfully`, 'neon');
    
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      createdAt: new Date(),
      cart: []
    });
    
    neonLog(`User registered successfully: ${user._id}`, 'success');
    neonLog(`User email: ${email}`, 'success');
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({ 
      user: userResponse,
      message: "Registration successful"
    });
    
  } catch (error) {
    neonLog(`Registration error: ${error.message}`, 'error');
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    neonLog(`Login attempt for email: ${email}`, 'info');
    
    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      neonLog(`User not found: ${email}`, 'warning');
      return res.status(400).json({ error: "User not found" });
    }
    
    neonLog(`User found: ${user._id}`, 'neon');
    
    // Check password
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      neonLog(`Invalid password for user: ${email}`, 'warning');
      return res.status(400).json({ error: "Wrong password" });
    }
    
    neonLog(`Password verified successfully`, 'neon');
    
    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    neonLog(`JWT token generated`, 'neon');
    neonLog(`Login successful for: ${email}`, 'success');
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({ 
      token, 
      user: userResponse,
      message: "Login successful"
    });
    
  } catch (error) {
    neonLog(`Login error: ${error.message}`, 'error');
    res.status(500).json({ error: "Login failed" });
  }
});

// Get user profile
router.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    neonLog(`Fetching profile for user: ${userId}`, 'info');
    
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      neonLog(`User not found: ${userId}`, 'warning');
      return res.status(404).json({ error: "User not found" });
    }
    
    neonLog(`Profile fetched successfully`, 'success');
    res.json({ user });
    
  } catch (error) {
    neonLog(`Profile fetch error: ${error.message}`, 'error');
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Update user profile
router.put("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;
    
    neonLog(`Updating profile for user: ${userId}`, 'info');
    
    const user = await User.findByIdAndUpdate(
      userId,
      { 
        name, 
        email,
        updatedAt: new Date()
      },
      { new: true }
    ).select("-password");
    
    if (!user) {
      neonLog(`User not found: ${userId}`, 'warning');
      return res.status(404).json({ error: "User not found" });
    }
    
    neonLog(`Profile updated successfully`, 'success');
    res.json({ 
      user,
      message: "Profile updated successfully"
    });
    
  } catch (error) {
    neonLog(`Profile update error: ${error.message}`, 'error');
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Change password
router.put("/change-password/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    
    neonLog(`Password change attempt for user: ${userId}`, 'info');
    
    const user = await User.findById(userId);
    
    if (!user) {
      neonLog(`User not found: ${userId}`, 'warning');
      return res.status(404).json({ error: "User not found" });
    }
    
    // Verify current password
    const match = await bcrypt.compare(currentPassword, user.password);
    
    if (!match) {
      neonLog(`Current password is incorrect`, 'warning');
      return res.status(400).json({ error: "Current password is incorrect" });
    }
    
    // Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
    
    neonLog(`Password changed successfully`, 'success');
    res.json({ message: "Password changed successfully" });
    
  } catch (error) {
    neonLog(`Password change error: ${error.message}`, 'error');
    res.status(500).json({ error: "Failed to change password" });
  }
});

// Get all users (admin only - recommend adding auth middleware)
router.get("/users", async (req, res) => {
  try {
    neonLog(`Fetching all users`, 'info');
    
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    
    neonLog(`Users fetched: ${users.length} users found`, 'success');
    res.json({ 
      users,
      count: users.length
    });
    
  } catch (error) {
    neonLog(`Fetch users error: ${error.message}`, 'error');
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;