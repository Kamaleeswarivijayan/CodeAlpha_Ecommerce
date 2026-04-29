const mongoose = require("mongoose");

// ========== NEON PRODUCT SCHEMA ==========
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"]
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
    max: [999999, "Price cannot exceed 999999"]
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
    maxlength: [1000, "Description cannot exceed 1000 characters"]
  },
  image: {
    type: String,
    required: [true, "Product image URL is required"],
    trim: true
  },
  category: {
    type: String,
    enum: ["Electronics", "Clothing", "Books", "Home", "Other"],
    default: "Other"
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, "Stock cannot be negative"]
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating cannot be less than 0"],
    max: [5, "Rating cannot exceed 5"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
productSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual field for formatted price
productSchema.virtual("formattedPrice").get(function() {
  return `₹${this.price.toLocaleString("en-IN")}`;
});

// Method to check if product is in stock
productSchema.methods.isInStock = function(quantity = 1) {
  return this.stock >= quantity;
};

// Static method to get products by category
productSchema.statics.getByCategory = function(category) {
  return this.find({ category });
};

module.exports = mongoose.model("Product", productSchema);