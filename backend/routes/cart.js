const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");

// Neon console styling
const neonLog = (message, type = 'neon') => {
  const styles = {
    success: '\x1b[36m%s\x1b[0m',
    error: '\x1b[31m%s\x1b[0m',
    info: '\x1b[35m%s\x1b[0m',
    warning: '\x1b[33m%s\x1b[0m',
    neon: '\x1b[38;5;51m%s\x1b[0m'
  };
  console.log(styles[type], `[CART] ${message}`);
};

// ========== ADD TO CART ==========
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, quantity = 1, price, name } = req.body;
    
    neonLog(`Adding product to cart for user: ${userId}`, "info");
    neonLog(`Product ID: ${productId}`, "neon");
    
    const user = await User.findById(userId);
    
    if (!user) {
      neonLog(`User not found: ${userId}`, "error");
      return res.status(404).json({ error: "User not found" });
    }
    
    // Check if product already exists in cart
    const existingItem = user.cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      neonLog(`Product quantity updated: ${existingItem.quantity}`, "success");
    } else {
      user.cart.push({ 
        productId, 
        quantity,
        price,
        name,
        addedAt: new Date()
      });
      neonLog(`New product added to cart`, "success");
    }
    
    await user.save();
    
    neonLog(`Cart updated successfully`, "success");
    res.json({ 
      cart: user.cart,
      message: "Product added to cart",
      count: user.cart.length
    });
    
  } catch (error) {
    neonLog(`Error adding to cart: ${error.message}`, "error");
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// ========== GET CART ==========
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    neonLog(`Fetching cart for user: ${userId}`, "info");
    
    const user = await User.findById(userId);
    
    if (!user) {
      neonLog(`User not found: ${userId}`, "error");
      return res.status(404).json({ error: "User not found" });
    }
    
    neonLog(`Cart fetched successfully: ${user.cart.length} items`, "success");
    res.json(user.cart);
    
  } catch (error) {
    neonLog(`Error fetching cart: ${error.message}`, "error");
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// ========== UPDATE CART ITEM QUANTITY ==========
router.put("/update/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, quantity } = req.body;
    
    neonLog(`Updating quantity for product: ${productId}`, "info");
    neonLog(`New quantity: ${quantity}`, "neon");
    
    const user = await User.findById(userId);
    
    if (!user) {
      neonLog(`User not found: ${userId}`, "error");
      return res.status(404).json({ error: "User not found" });
    }
    
    const cartItem = user.cart.find(item => item.productId === productId);
    
    if (!cartItem) {
      neonLog(`Product not found in cart: ${productId}`, "warning");
      return res.status(404).json({ error: "Product not found in cart" });
    }
    
    cartItem.quantity = quantity;
    await user.save();
    
    neonLog(`Quantity updated successfully`, "success");
    res.json({ 
      cart: user.cart,
      message: "Cart updated"
    });
    
  } catch (error) {
    neonLog(`Error updating cart: ${error.message}`, "error");
    res.status(500).json({ error: "Failed to update cart" });
  }
});

// ========== REMOVE FROM CART ==========
router.delete("/remove/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;
    
    neonLog(`Removing product from cart: ${productId}`, "warning");
    
    const user = await User.findById(userId);
    
    if (!user) {
      neonLog(`User not found: ${userId}`, "error");
      return res.status(404).json({ error: "User not found" });
    }
    
    user.cart = user.cart.filter(item => item.productId !== productId);
    await user.save();
    
    neonLog(`Product removed successfully`, "success");
    res.json({ 
      cart: user.cart,
      message: "Product removed from cart",
      count: user.cart.length
    });
    
  } catch (error) {
    neonLog(`Error removing from cart: ${error.message}`, "error");
    res.status(500).json({ error: "Failed to remove from cart" });
  }
});

// ========== CLEAR ENTIRE CART ==========
router.delete("/clear/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    neonLog(`Clearing cart for user: ${userId}`, "warning");
    
    const user = await User.findById(userId);
    
    if (!user) {
      neonLog(`User not found: ${userId}`, "error");
      return res.status(404).json({ error: "User not found" });
    }
    
    user.cart = [];
    await user.save();
    
    neonLog(`Cart cleared successfully`, "success");
    res.json({ 
      message: "Cart cleared",
      cart: []
    });
    
  } catch (error) {
    neonLog(`Error clearing cart: ${error.message}`, "error");
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

module.exports = router;