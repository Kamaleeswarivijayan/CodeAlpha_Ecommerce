const router = require("express").Router();
const Order = require("../models/Order");

// Neon console styling
const neonLog = (message, type = 'neon') => {
  const styles = {
    success: '\x1b[36m%s\x1b[0m',     // Cyan/Neon Blue
    error: '\x1b[31m%s\x1b[0m',       // Red
    info: '\x1b[35m%s\x1b[0m',        // Magenta
    warning: '\x1b[33m%s\x1b[0m',     // Yellow
    neon: '\x1b[38;5;51m%s\x1b[0m'    // Bright Neon Blue
  };
  
  console.log(styles[type], `[ORDER] ${message}`);
};

// Create new order
router.post("/", async (req, res) => {
  try {
    const { userId, items, total, paymentId, orderId, status } = req.body;
    
    neonLog(`Creating new order`, 'info');
    neonLog(`User ID: ${userId}`, 'neon');
    neonLog(`Total amount: ₹${total}`, 'neon');
    neonLog(`Items count: ${items?.length || 0}`, 'neon');
    
    const orderData = {
      userId,
      items: items || [],
      total: total || 0,
      paymentId: paymentId || null,
      orderId: orderId || `ORD_${Date.now()}`,
      status: status || "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const order = await Order.create(orderData);
    
    neonLog(`Order created successfully: ${order._id}`, 'success');
    neonLog(`Order status: ${order.status}`, 'success');
    
    res.json({ 
      order,
      message: "Order placed successfully",
      orderId: order._id
    });
    
  } catch (error) {
    neonLog(`Error creating order: ${error.message}`, 'error');
    res.status(500).json({ 
      error: "Failed to create order",
      details: error.message 
    });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    neonLog(`Fetching all orders`, 'info');
    
    const orders = await Order.find().sort({ createdAt: -1 });
    
    neonLog(`Orders fetched successfully: ${orders.length} orders found`, 'success');
    
    res.json({ 
      orders,
      count: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0)
    });
    
  } catch (error) {
    neonLog(`Error fetching orders: ${error.message}`, 'error');
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Get order by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    neonLog(`Fetching order: ${id}`, 'info');
    
    const order = await Order.findById(id);
    
    if (!order) {
      neonLog(`Order not found: ${id}`, 'warning');
      return res.status(404).json({ error: "Order not found" });
    }
    
    neonLog(`Order fetched successfully`, 'success');
    res.json(order);
    
  } catch (error) {
    neonLog(`Error fetching order: ${error.message}`, 'error');
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

// Get orders by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    neonLog(`Fetching orders for user: ${userId}`, 'info');
    
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    
    neonLog(`Orders fetched: ${orders.length} orders found`, 'success');
    res.json({ 
      orders,
      count: orders.length,
      totalSpent: orders.reduce((sum, order) => sum + (order.total || 0), 0)
    });
    
  } catch (error) {
    neonLog(`Error fetching user orders: ${error.message}`, 'error');
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
});

// Update order status
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    neonLog(`Updating order status: ${id}`, 'info');
    neonLog(`New status: ${status}`, 'neon');
    
    const order = await Order.findByIdAndUpdate(
      id,
      { 
        status, 
        updatedAt: new Date() 
      },
      { new: true }
    );
    
    if (!order) {
      neonLog(`Order not found: ${id}`, 'warning');
      return res.status(404).json({ error: "Order not found" });
    }
    
    neonLog(`Order status updated successfully`, 'success');
    res.json({ 
      order,
      message: "Order status updated"
    });
    
  } catch (error) {
    neonLog(`Error updating order status: ${error.message}`, 'error');
    res.status(500).json({ error: "Failed to update order status" });
  }
});

// Cancel order
router.delete("/:id/cancel", async (req, res) => {
  try {
    const { id } = req.params;
    
    neonLog(`Cancelling order: ${id}`, 'warning');
    
    const order = await Order.findByIdAndUpdate(
      id,
      { 
        status: "cancelled", 
        updatedAt: new Date() 
      },
      { new: true }
    );
    
    if (!order) {
      neonLog(`Order not found: ${id}`, 'warning');
      return res.status(404).json({ error: "Order not found" });
    }
    
    neonLog(`Order cancelled successfully`, 'success');
    res.json({ 
      order,
      message: "Order cancelled successfully"
    });
    
  } catch (error) {
    neonLog(`Error cancelling order: ${error.message}`, 'error');
    res.status(500).json({ error: "Failed to cancel order" });
  }
});

// Delete order (admin only - recommended to add auth middleware)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    neonLog(`Deleting order: ${id}`, 'warning');
    
    const order = await Order.findByIdAndDelete(id);
    
    if (!order) {
      neonLog(`Order not found: ${id}`, 'warning');
      return res.status(404).json({ error: "Order not found" });
    }
    
    neonLog(`Order deleted successfully`, 'success');
    res.json({ 
      message: "Order deleted successfully",
      deletedOrderId: id
    });
    
  } catch (error) {
    neonLog(`Error deleting order: ${error.message}`, 'error');
    res.status(500).json({ error: "Failed to delete order" });
  }
});

module.exports = router;