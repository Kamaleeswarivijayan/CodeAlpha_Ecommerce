# 🛒 MERN E-Commerce Application

A complete full-stack E-Commerce web application built using the MERN Stack with JWT Authentication, Cart Management, Order System, and Razorpay Payment Integration.

---

# 🚀 Live Features

✅ User Authentication (Register/Login)
✅ JWT Token Authentication
✅ Responsive Product Listing
✅ Add to Cart System
✅ Quantity Update & Remove Cart Items
✅ Checkout & Order Placement
✅ Razorpay Payment Gateway Integration
✅ MongoDB Database Integration
✅ Responsive Amazon-Style UI

---

# 🛠 Tech Stack

## Frontend

* React.js
* Axios
* React Hooks
* CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

## Payment

* Razorpay (Test Mode)

---

# 📁 Folder Structure

```bash id="yjlwmf"
ecommerce-app/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.js
│   │   └── index.js
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash id="u8v88m"
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app
```

---

# 🔧 Backend Setup

## Navigate to backend

```bash id="l0pb9j"
cd backend
```

## Install dependencies

```bash id="p4sp8y"
npm install
```

## Create `.env` file

```env id="w6p5xy"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=secret123

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## Run backend server

```bash id="5v4z5n"
npm run dev
```

Backend running at:

```bash id="4v5xpw"
http://localhost:5000
```

---

# 💻 Frontend Setup

## Navigate to frontend

```bash id="hq86o1"
cd frontend
```

## Install dependencies

```bash id="v7jdyq"
npm install
```

## Start React app

```bash id="1zl7u0"
npm start
```

Frontend running at:

```bash id="x1zhjm"
http://localhost:3000
```

---

# 🗄 MongoDB Setup

## MongoDB Atlas

1. Create MongoDB Atlas account
2. Create cluster
3. Copy connection string
4. Paste into `.env`

Example:

```env id="3l6j2h"
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
```

---

# 🔐 Authentication APIs

## Register User

### POST

```http id="5a1vm8"
/api/auth/register
```

### Body

```json id="nly2k0"
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

## Login User

### POST

```http id="57wq0v"
/api/auth/login
```

### Body

```json id="ru2htr"
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

# 📦 Product APIs

## Get Products

### GET

```http id="0j9n5v"
/api/products
```

---

## Add Product

### POST

```http id="xibuk8"
/api/products
```

### Body

```json id="94e9kr"
{
  "name": "Laptop",
  "price": 50000,
  "image": "https://via.placeholder.com/150",
  "description": "Gaming Laptop"
}
```

---

# 🛒 Cart APIs

## Add To Cart

### POST

```http id="8cyd9u"
/api/cart/add
```

### Body

```json id="9r5kz0"
{
  "userId": "USER_ID",
  "productId": "PRODUCT_ID"
}
```

---

## Update Cart Quantity

### PUT

```http id="dd5uxq"
/api/cart/update
```

### Body

```json id="tddv6n"
{
  "userId": "USER_ID",
  "productId": "PRODUCT_ID",
  "quantity": 2
}
```

---

## Remove Cart Item

### DELETE

```http id="mtx6h1"
/api/cart/remove
```

### Body

```json id="v6k99p"
{
  "userId": "USER_ID",
  "productId": "PRODUCT_ID"
}
```

---

# 📦 Order API

## Place Order

### POST

```http id="abjhlk"
/api/orders
```

### Body

```json id="s93g6r"
{
  "userId": "USER_ID",
  "products": [],
  "totalAmount": 5000
}
```

---

# 💳 Razorpay Test Payment

## Test Card Details

```text id="70p4rq"
Card Number: 4111 1111 1111 1111
CVV: 123
Expiry: Any future date
```

---

# 🧪 Testing Guide

## ✅ Authentication

* Register a new user
* Login with credentials
* Verify token stored in localStorage

---

## ✅ Product Listing

* Add products using Postman
* Refresh frontend
* Products appear automatically

---

## ✅ Cart Functionality

* Add products to cart
* Increase/decrease quantity
* Remove cart items
* Verify total updates automatically

---

## ✅ Payment Flow

* Open checkout page
* Click Pay Now
* Razorpay popup opens
* Complete test payment successfully

---

# ⚠️ Common Bugs Fixed

✅ Duplicate function declarations
✅ Identifier already declared errors
✅ MongoDB ObjectId validation
✅ Safe localStorage handling
✅ Proper API baseURL configuration
✅ Cart auto-refresh after updates
✅ Clean backend/frontend separation

---

# 🎨 UI Highlights

* Amazon-inspired UI
* Dark Navbar (#131921)
* Product Card Shadows
* Responsive Grid Layout
* Mobile Friendly Design
* Smooth Hover Effects

---

# 🚀 Future Enhancements

* Admin Dashboard
* Product Search & Filters
* Wishlist
* Redux Toolkit
* Image Upload with Cloudinary
* Order History
* User Profile Management
* Deployment Support

---

# 🌐 Deployment

## Frontend

* Vercel
* Netlify

## Backend

* Render
* Railway

## Database

* MongoDB Atlas

---

# 📜 License

This project is open-source and available for educational and hackathon purposes.

---

# 👨‍💻 Developer

Built with ❤️ using MERN Stack Architecture.
