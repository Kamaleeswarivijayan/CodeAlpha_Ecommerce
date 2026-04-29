const router = require("express").Router();
const Razorpay = require("razorpay");
const router = require("express").Router();
// Neon console styling
const neonLog = (message, type = 'neon') => {
  const styles = {
    success: '\x1b[36m%s\x1b[0m',     // Cyan/Neon Blue
    error: '\x1b[31m%s\x1b[0m',       // Red
    info: '\x1b[35m%s\x1b[0m',        // Magenta
    warning: '\x1b[33m%s\x1b[0m',     // Yellow
    neon: '\x1b[38;5;51m%s\x1b[0m'    // Bright Neon Blue
  };
  
  console.log(styles[type], `[PAYMENT] ${message}`);
};

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET"
});
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Mock order creation
    const mockOrder = {
      id: "order_" + Date.now(),
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };
    
    res.json(mockOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
// Create order endpoint
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    
    neonLog(`Creating order for amount: ₹${amount}`, 'info');
    
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };
    
    neonLog(`Order options prepared`, 'neon');
    
    const order = await razorpay.orders.create(options);
    
    neonLog(`Order created successfully: ${order.id}`, 'success');
    neonLog(`Order amount: ₹${order.amount / 100}`, 'success');
    
    res.json(order);
    
  } catch (error) {
    neonLog(`Error creating order: ${error.message}`, 'error');
    res.status(500).json({ 
      error: "Failed to create payment order",
      details: error.message 
    });
  }
});

// Verify payment endpoint (optional but recommended)
router.post("/verify-payment", async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    
    neonLog(`Verifying payment for order: ${order_id}`, 'info');
    neonLog(`Payment ID: ${payment_id}`, 'neon');
    
    // Add your verification logic here
    const crypto = require('crypto');
    const secret = "YOUR_KEY_SECRET";
    
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${order_id}|${payment_id}`)
      .digest('hex');
    
    if (generatedSignature === signature) {
      neonLog(`Payment verified successfully`, 'success');
      res.json({ status: "success", message: "Payment verified" });
    } else {
      neonLog(`Payment verification failed`, 'error');
      res.status(400).json({ status: "failed", message: "Invalid signature" });
    }
    
  } catch (error) {
    neonLog(`Verification error: ${error.message}`, 'error');
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

// Get payment details endpoint
router.get("/payment-details/:paymentId", async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    neonLog(`Fetching payment details for: ${paymentId}`, 'info');
    
    const payment = await razorpay.payments.fetch(paymentId);
    
    neonLog(`Payment details retrieved`, 'success');
    res.json(payment);
    
  } catch (error) {
    neonLog(`Error fetching payment: ${error.message}`, 'error');
    res.status(500).json({ error: "Failed to fetch payment details" });
  }
});

module.exports = router;