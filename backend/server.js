require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Import models first
const Product = require("./models/Product");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ========== DIRECT SEED ROUTE (BEFORE ANY OTHER ROUTES) ==========
app.get("/api/seed-products", async (req, res) => {
  try {
    console.log("Seeding products...");
    
    // Clear existing products
    await Product.deleteMany({});
    
    const products = await Product.insertMany([
      {
        name: "iPhone 15 Pro Max",
        price: 129999,
        description: "Apple's latest flagship smartphone with A17 Pro chip",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
        category: "Electronics",
        stock: 25,
        rating: 4.8
      },
      {
        name: "Gaming Laptop",
        price: 84999,
        description: "High-performance gaming laptop with RTX 4060",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
        category: "Electronics",
        stock: 15,
        rating: 4.6
      },
      {
        name: "Wireless Headphones",
        price: 3999,
        description: "Premium noise-cancelling wireless headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        category: "Electronics",
        stock: 50,
        rating: 4.5
      },
      {
        name: "Smart Watch",
        price: 24999,
        description: "Fitness tracker with heart rate monitor",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
        category: "Electronics",
        stock: 40,
        rating: 4.4
      },
      {
        name: "Mechanical Keyboard",
        price: 5499,
        description: "RGB mechanical keyboard with blue switches",
        image: "https://images.unsplash.com/photo-1618384887929-16ec33a9efc3?w=400",
        category: "Electronics",
        stock: 35,
        rating: 4.7
      },
      {
        name: "Gaming Mouse",
        price: 2499,
        description: "High-precision gaming mouse with 16000 DPI",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
        category: "Electronics",
        stock: 60,
        rating: 4.3
      }
    ]);
    
    res.json({ 
      success: true,
      message: "Products seeded successfully!", 
      count: products.length 
    });
    
  } catch (error) {
    console.error("Seed error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ========== REGULAR ROUTES ==========
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orders"));
// TEMPORARILY COMMENT OUT PAYMENT - Install razorpay first
// app.use("/api/payment", require("./routes/payment"));

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));