import API from "../api";

export default function Checkout({ total }) {

  const handlePayment = async () => {
    const { data } = await API.post("/payment/create-order", {
      amount: total
    });

    const options = {
      key: "YOUR_KEY_ID",
      amount: data.amount,
      currency: "INR",
      name: "Neon Dashboard",
      description: "Premium Task Management System",
      order_id: data.id,

      handler: function (response) {
        alert("Payment Successful");
        window.location.href = "/success";
      },

      theme: {
        color: "#00ffff"
      },

      modal: {
        backdropclose: false,
        escape: false,
        animation: true
      },

      prefill: {
        name: "Neon User",
        email: "user@neondashboard.com"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
        width: "400px"
      }}>
        <h2 style={{
          color: "#00ffff",
          textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff",
          marginBottom: "30px",
          fontFamily: "monospace",
          fontSize: "32px",
          letterSpacing: "2px"
        }}>
          CHECKOUT
        </h2>
        
        <div style={{
          marginBottom: "30px",
          padding: "20px",
          background: "rgba(0, 255, 255, 0.05)",
          borderRadius: "10px",
          border: "1px solid rgba(0, 255, 255, 0.2)"
        }}>
          <h3 style={{
            color: "#ccddee",
            fontSize: "24px",
            marginBottom: "10px",
            fontFamily: "monospace"
          }}>
            TOTAL AMOUNT
          </h3>
          <div style={{
            color: "#00ffff",
            textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
            fontSize: "48px",
            fontWeight: "bold",
            fontFamily: "monospace"
          }}>
            ₹{total}
          </div>
        </div>

        <button 
          onClick={handlePayment}
          style={{
            width: "100%",
            padding: "15px",
            background: "linear-gradient(135deg, #00ffff, #0066ff)",
            color: "#0a192f",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontFamily: "monospace",
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.02)";
            e.target.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.3)";
          }}
        >
          PAY NOW
        </button>
        
        <p style={{
          marginTop: "20px",
          color: "#8899aa",
          fontSize: "12px",
          fontFamily: "monospace"
        }}>
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
}