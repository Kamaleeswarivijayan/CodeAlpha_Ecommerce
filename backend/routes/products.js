const router = require("express").Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");

// Neon console styling
const neonLog = (message, type = 'neon') => {
  const styles = {
    success: '\x1b[36m%s\x1b[0m',
    error: '\x1b[31m%s\x1b[0m',
    info: '\x1b[35m%s\x1b[0m',
    warning: '\x1b[33m%s\x1b[0m',
    neon: '\x1b[38;5;51m%s\x1b[0m'
  };
  console.log(styles[type], `[PRODUCTS] ${message}`);
};

// ========== GET ALL PRODUCTS ==========
router.get("/", async (req, res) => {
  try {
    neonLog("Fetching all products", "info");
    const products = await Product.find().sort({ createdAt: -1 });
    neonLog(`Found ${products.length} products`, "success");
    res.json(products);
  } catch (error) {
    neonLog(`Error fetching products: ${error.message}`, "error");
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ========== GET SINGLE PRODUCT ==========
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    neonLog(`Error: ${error.message}`, "error");
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// ========== CREATE PRODUCT ==========
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    neonLog(`Product created: ${product.name}`, "success");
    res.status(201).json(product);
  } catch (error) {
    neonLog(`Error creating product: ${error.message}`, "error");
    res.status(500).json({ error: "Failed to create product" });
  }
});

// ========== UPDATE PRODUCT ==========
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    neonLog(`Error updating product: ${error.message}`, "error");
    res.status(500).json({ error: "Failed to update product" });
  }
});

// ========== DELETE PRODUCT ==========
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    neonLog(`Error deleting product: ${error.message}`, "error");
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;