import { useState } from "react";
import API from "../api";

export default function Login({ setUser, setShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      
      // Save both token AND user to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      setUser(res.data.user);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#0a0a0a"
    }}>
      <div style={{
        backgroundColor: "rgba(10, 25, 47, 0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "40px",
        width: "400px",
        boxShadow: "0 0 30px rgba(0, 255, 255, 0.3), 0 0 10px rgba(0, 255, 255, 0.2)",
        border: "1px solid rgba(0, 255, 255, 0.3)",
        textAlign: "center"
      }}>
        <h2 style={{
          color: "#00ffff",
          textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
          marginBottom: "30px",
          fontFamily: "monospace",
          fontSize: "32px"
        }}>LOGIN</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            backgroundColor: "rgba(0, 255, 255, 0.1)",
            border: "1px solid #00ffff",
            borderRadius: "8px",
            color: "#00ffff",
            fontSize: "16px",
            outline: "none",
            transition: "all 0.3s ease",
            boxSizing: "border-box"
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.5)";
            e.target.style.backgroundColor = "rgba(0, 255, 255, 0.2)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "none";
            e.target.style.backgroundColor = "rgba(0, 255, 255, 0.1)";
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            backgroundColor: "rgba(0, 255, 255, 0.1)",
            border: "1px solid #00ffff",
            borderRadius: "8px",
            color: "#00ffff",
            fontSize: "16px",
            outline: "none",
            transition: "all 0.3s ease",
            boxSizing: "border-box"
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.5)";
            e.target.style.backgroundColor = "rgba(0, 255, 255, 0.2)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "none";
            e.target.style.backgroundColor = "rgba(0, 255, 255, 0.1)";
          }}
        />

        <button onClick={login} style={{
          width: "100%",
          padding: "12px",
          margin: "20px 0 10px",
          backgroundColor: "#00ffff",
          color: "#0a192f",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "all 0.3s ease",
          textTransform: "uppercase",
          letterSpacing: "2px"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#00ccff";
          e.target.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.5)";
          e.target.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#00ffff";
          e.target.style.boxShadow = "none";
          e.target.style.transform = "scale(1)";
        }}>
          Login
        </button>
      </div>

      <button onClick={() => setShowRegister(false)} style={{
        marginTop: "20px",
        backgroundColor: "transparent",
        color: "#00ffff",
        border: "1px solid #00ffff",
        borderRadius: "8px",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "all 0.3s ease",
        textShadow: "0 0 5px rgba(0, 255, 255, 0.5)"
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "rgba(0, 255, 255, 0.1)";
        e.target.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.boxShadow = "none";
      }}>
        Don't have an account? Register
      </button>
    </div>
  );
}