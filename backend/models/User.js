const mongoose = require("mongoose");

// ========== NEON USER SCHEMA ==========
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"]
  },
  cart: [
    {
      productId: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
        default: 1
      },
      price: {
        type: Number,
        min: [0, "Price cannot be negative"]
      },
      name: {
        type: String,
        trim: true
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  address: {
    street: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    pincode: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      default: "India"
    }
  },
  phoneNumber: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Update the updatedAt timestamp before saving
userSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual field for full address
userSchema.virtual("fullAddress").get(function() {
  if (!this.address.street) return null;
  return `${this.address.street}, ${this.address.city}, ${this.address.state} - ${this.address.pincode}, ${this.address.country}`;
});

// Virtual field for cart item count
userSchema.virtual("cartItemCount").get(function() {
  return this.cart.reduce((total, item) => total + item.quantity, 0);
});

// Virtual field for cart total
userSchema.virtual("cartTotal").get(function() {
  return this.cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
});

// Method to add item to cart
userSchema.methods.addToCart = function(productId, quantity = 1, price = null, name = null) {
  const existingItem = this.cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.cart.push({
      productId,
      quantity,
      price,
      name,
      addedAt: new Date()
    });
  }
  
  return this.save();
};

// Method to remove item from cart
userSchema.methods.removeFromCart = function(productId) {
  this.cart = this.cart.filter(item => item.productId !== productId);
  return this.save();
};

// Method to update cart item quantity
userSchema.methods.updateCartQuantity = function(productId, quantity) {
  const item = this.cart.find(item => item.productId === productId);
  if (item) {
    if (quantity <= 0) {
      return this.removeFromCart(productId);
    }
    item.quantity = quantity;
  }
  return this.save();
};

// Method to clear entire cart
userSchema.methods.clearCart = function() {
  this.cart = [];
  return this.save();
};

// Method to hide password when sending user data
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Static method to find active users
userSchema.statics.findActiveUsers = function() {
  return this.find({ isActive: true });
};

// Static method to get users by role
userSchema.statics.getByRole = function(role) {
  return this.find({ role });
};

module.exports = mongoose.model("User", userSchema);