import { useEffect, useState } from "react";
import API from "../api";

export default function Navbar({ setPage }) {
  const [count, setCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      API.get(`/cart/${user._id}`).then(res => {
        setCount(res.data.length);
      }).catch(err => {
        console.error("Error fetching cart count:", err);
      });
    }
  }, [user]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "rgba(10, 25, 47, 0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(0, 255, 255, 0.3)",
      boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <h2 
        onClick={() => setPage("home")}
        style={{
          cursor: "pointer",
          color: "#00ffff",
          textShadow: "0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)",
          fontFamily: "monospace",
          fontSize: "24px",
          letterSpacing: "2px",
          transition: "all 0.3s ease",
          margin: 0
        }}
        onMouseEnter={(e) => {
          e.target.style.textShadow = "0 0 15px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.5)";
          e.target.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.target.style.textShadow = "0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)";
          e.target.style.transform = "scale(1)";
        }}
      >
        NEON STORE
      </h2>

      <div 
        onClick={() => setPage("cart")}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px 20px",
          backgroundColor: "rgba(0, 255, 255, 0.1)",
          border: "1px solid rgba(0, 255, 255, 0.3)",
          borderRadius: "25px",
          transition: "all 0.3s ease",
          position: "relative"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(0, 255, 255, 0.2)";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.3)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(0, 255, 255, 0.1)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <span style={{
          fontSize: "20px",
          color: "#00ffff"
        }}>
          🛒
        </span>
        
        <span style={{
          color: "#00ffff",
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: "monospace"
        }}>
          CART
        </span>
        
        <span style={{
          backgroundColor: "#00ffff",
          color: "#0a192f",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "bold",
          fontFamily: "monospace",
          boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)"
        }}>
          {count}
        </span>
      </div>
    </div>
  );
}