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

// ========== REGISTER NEW USER ==========
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
      lastLogin: null,
      isActive: true
    });
    
    neonLog(`User registered successfully: ${user._id}`, 'success');
    neonLog(`User email: ${email}`, 'success');
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({ 
      success: true,
      user: userResponse,
      message: "Registration successful"
    });
    
  } catch (error) {
    neonLog(`Registration error: ${error.message}`, 'error');
    res.status(500).json({ 
      success: false,
      error: "Registration failed",
      details: error.message 
    });
  }
});

// ========== LOGIN USER ==========
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    neonLog(`Login attempt for email: ${email}`, 'info');
    
    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      neonLog(`User not found: ${email}`, 'warning');
      return res.status(401).json({ 
        success: false,
        error: "Invalid email or password" 
      });
    }
    
    // Check if user is active
    if (!user.isActive) {
      neonLog(`Account is deactivated: ${email}`, 'warning');
      return res.status(401).json({ 
        success: false,
        error: "Account is deactivated. Please contact support." 
      });
    }
    
    neonLog(`User found: ${user._id}`, 'neon');
    
    // Check password
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      neonLog(`Invalid password for user: ${email}`, 'warning');
      return res.status(401).json({ 
        success: false,
        error: "Invalid email or password" 
      });
    }
    
    neonLog(`Password verified successfully`, 'neon');
    
    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();
    
    // Generate token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        role: user.role 
      }, 
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    neonLog(`JWT token generated`, 'neon');
    neonLog(`Login successful for: ${email}`, 'success');
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({ 
      success: true,
      token, 
      user: userResponse,
      message: "Login successful"
    });
    
  } catch (error) {
    neonLog(`Login error: ${error.message}`, 'error');
    res.status(500).json({ 
      success: false,
      error: "Login failed",
      details: error.message 
    });
  }
});

// ========== VERIFY TOKEN ==========
router.get("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      neonLog(`No token provided for verification`, 'warning');
      return res.status(401).json({ 
        success: false,
        error: "No token provided" 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      neonLog(`User not found for token: ${decoded.id}`, 'warning');
      return res.status(401).json({ 
        success: false,
        error: "Invalid token" 
      });
    }
    
    neonLog(`Token verified for user: ${user.email}`, 'success');
    res.json({ 
      success: true,
      user 
    });
    
  } catch (error) {
    neonLog(`Token verification error: ${error.message}`, 'error');
    res.status(401).json({ 
      success: false,
      error: "Invalid or expired token" 
    });
  }
});

// ========== GET USER PROFILE ==========
router.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    neonLog(`Fetching profile for user: ${userId}`, 'info');
    
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      neonLog(`User not found: ${userId}`, 'warning');
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }
    
    neonLog(`Profile fetched successfully`, 'success');
    res.json({ 
      success: true,
      user 
    });
    
  } catch (error) {
    neonLog(`Profile fetch error: ${error.message}`, 'error');
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch profile" 
    });
  }
});

// ========== UPDATE USER PROFILE ==========
router.put("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phoneNumber, address } = req.body;
    
    neonLog(`Updating profile for user: ${userId}`, 'info');
    
    const user = await User.findByIdAndUpdate(
      userId,
      { 
        name, 
        email,
        phoneNumber,
        address,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).select("-password");
    
    if (!user) {
      neonLog(`User not found: ${userId}`, 'warning');
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }
    
    neonLog(`Profile updated successfully`, 'success');
    res.json({ 
      success: true,
      user,
      message: "Profile updated successfully"
    });
    
  } catch (error) {
    neonLog(`Profile update error: ${error.message}`, 'error');
    res.status(500).json({ 
      success: false,
      error: "Failed to update profile" 
    });
  }
});

// ========== CHANGE PASSWORD ==========
router.put("/change-password/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    
    neonLog(`Password change attempt for user: ${userId}`, 'info');
    
    const user = await User.findById(userId);
    
    if (!user) {
      neonLog(`User not found: ${userId}`, 'warning');
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }
    
    // Verify current password
    const match = await bcrypt.compare(currentPassword, user.password);
    
    if (!match) {
      neonLog(`Current password is incorrect`, 'warning');
      return res.status(400).json({ 
        success: false,
        error: "Current password is incorrect" 
      });
    }
    
    // Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.updatedAt = new Date();
    await user.save();
    
    neonLog(`Password changed successfully`, 'success');
    res.json({ 
      success: true,
      message: "Password changed successfully" 
    });
    
  } catch (error) {
    neonLog(`Password change error: ${error.message}`, 'error');
    res.status(500).json({ 
      success: false,
      error: "Failed to change password" 
    });
  }
});

module.exports = router;