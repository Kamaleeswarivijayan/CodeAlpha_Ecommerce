import { useState } from "react";
import API from "../api";

export default function ProductCart({ product, onRemove, onUpdateQuantity }) {
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [isHovered, setIsHovered] = useState(false);

  const updateQuantity = async (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onUpdateQuantity(product.id, newQuantity);
    
    try {
      await API.put(`/cart/update/${product.id}`, { quantity: newQuantity });
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async () => {
    try {
      await API.delete(`/cart/remove/${product.id}`);
      onRemove(product.id);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <div
      style={{
        backgroundColor: "rgba(10, 25, 47, 0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
        padding: "20px",
        margin: "15px 0",
        border: `1px solid ${isHovered ? "#00ffff" : "rgba(0, 255, 255, 0.3)"}`,
        boxShadow: isHovered 
          ? "0 0 30px rgba(0, 255, 255, 0.3), 0 0 15px rgba(0, 255, 255, 0.2)"
          : "0 0 15px rgba(0, 255, 255, 0.1)",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      {product.image && (
        <div style={{
          flexShrink: 0,
          width: "100px",
          height: "100px",
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid rgba(0, 255, 255, 0.3)"
        }}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
      )}

      {/* Product Details */}
      <div style={{ flex: 2, minWidth: "150px" }}>
        <h3 style={{
          color: "#00ffff",
          textShadow: "0 0 5px rgba(0, 255, 255, 0.5)",
          marginBottom: "8px",
          fontFamily: "monospace",
          fontSize: "18px"
        }}>
          {product.name}
        </h3>
        
        <p style={{
          color: "#ccddee",
          fontSize: "14px",
          marginBottom: "8px",
          fontFamily: "monospace"
        }}>
          {product.description}
        </p>
        
        <div style={{
          color: "#00ffff",
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: "monospace",
          textShadow: "0 0 5px rgba(0, 255, 255, 0.3)"
        }}>
          ₹{product.price}
        </div>
      </div>

      {/* Quantity Controls */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexShrink: 0
      }}>
        <button
          onClick={() => updateQuantity(quantity - 1)}
          style={{
            width: "35px",
            height: "35px",
            backgroundColor: "rgba(0, 255, 255, 0.1)",
            color: "#00ffff",
            border: "1px solid #00ffff",
            borderRadius: "8px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(0, 255, 255, 0.3)";
            e.target.style.boxShadow = "0 0 10px rgba(0, 255, 255, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(0, 255, 255, 0.1)";
            e.target.style.boxShadow = "none";
          }}
        >
          -
        </button>
        
        <span style={{
          color: "#00ffff",
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "monospace",
          minWidth: "40px",
          textAlign: "center"
        }}>
          {quantity}
        </span>
        
        <button
          onClick={() => updateQuantity(quantity + 1)}
          style={{
            width: "35px",
            height: "35px",
            backgroundColor: "rgba(0, 255, 255, 0.1)",
            color: "#00ffff",
            border: "1px solid #00ffff",
            borderRadius: "8px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(0, 255, 255, 0.3)";
            e.target.style.boxShadow = "0 0 10px rgba(0, 255, 255, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(0, 255, 255, 0.1)";
            e.target.style.boxShadow = "none";
          }}
        >
          +
        </button>
      </div>

      {/* Price and Remove */}
      <div style={{
        textAlign: "right",
        flexShrink: 0,
        minWidth: "120px"
      }}>
        <div style={{
          color: "#00ffff",
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: "monospace",
          textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
          marginBottom: "10px"
        }}>
          ₹{totalPrice}
        </div>
        
        <button
          onClick={removeItem}
          style={{
            padding: "8px 20px",
            backgroundColor: "transparent",
            color: "#ff3366",
            border: "1px solid #ff3366",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 51, 102, 0.2)";
            e.target.style.boxShadow = "0 0 15px rgba(255, 51, 102, 0.3)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.boxShadow = "none";
            e.target.style.transform = "scale(1)";
          }}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
}