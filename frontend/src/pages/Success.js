export default function Success() {
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
      background: "linear-gradient(135deg, #0a0a0a 0%, #0a192f 100%)"
    }}>
      <div style={{
        backgroundColor: "rgba(10, 25, 47, 0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "50px",
        textAlign: "center",
        boxShadow: "0 0 50px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2)",
        border: "1px solid rgba(0, 255, 255, 0.3)",
        animation: "neonPulse 2s ease-in-out infinite"
      }}>
        <div style={{
          fontSize: "80px",
          marginBottom: "20px",
          animation: "glowText 1.5s ease-in-out infinite"
        }}>
          ✓
        </div>
        
        <h1 style={{
          color: "#00ffff",
          textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
          marginBottom: "20px",
          fontFamily: "monospace",
          fontSize: "36px",
          letterSpacing: "2px"
        }}>
          PAYMENT SUCCESSFUL
        </h1>
        
        <p style={{
          color: "#ccddee",
          fontSize: "18px",
          marginBottom: "30px",
          fontFamily: "monospace"
        }}>
          Your order has been placed successfully
        </p>
        
        <button 
          onClick={() => window.location.href = "/dashboard"}
          style={{
            padding: "12px 30px",
            backgroundColor: "#00ffff",
            color: "#0a192f",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontFamily: "monospace"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#00ccff";
            e.target.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.5)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#00ffff";
            e.target.style.boxShadow = "none";
            e.target.style.transform = "scale(1)";
          }}
        >
          RETURN TO DASHBOARD
        </button>
      </div>
      
      <style>
        {`
          @keyframes neonPulse {
            0% {
              box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
              border-color: rgba(0, 255, 255, 0.3);
            }
            50% {
              box-shadow: 0 0 60px rgba(0, 255, 255, 0.5);
              border-color: rgba(0, 255, 255, 0.8);
            }
            100% {
              box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
              border-color: rgba(0, 255, 255, 0.3);
            }
          }
          
          @keyframes glowText {
            0% {
              text-shadow: 0 0 5px #00ffff;
            }
            50% {
              text-shadow: 0 0 20px #00ffff, 0 0 30px #00ffff;
            }
            100% {
              text-shadow: 0 0 5px #00ffff;
            }
          }
        `}
      </style>
    </div>
  );
}