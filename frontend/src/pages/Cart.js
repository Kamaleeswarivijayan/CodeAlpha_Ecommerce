import { useEffect, useState } from "react";
import API from "../api";

export default function Cart({ setPage, setTotal }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      API.get(`/cart/${user._id}`)
        .then(res => {
          setCart(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching cart:", err);
          setLoading(false);
        });
    }
  }, [user]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await API.put(`/cart/update/${productId}`, { quantity: newQuantity });
      const updatedCart = cart.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await API.delete(`/cart/remove/${productId}`);
      setCart(cart.filter(item => item.productId !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        color: "#00ffff",
        textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
        fontFamily: "monospace"
      }}>
        LOADING CART...
      </div>
    );
  }

  const total = calculateTotal();

  return (
    <div style={{
      padding: "30px",
      minHeight: "calc(100vh - 80px)",
      background: "linear-gradient(135deg, #0a0a0a 0%, #0a192f 100%)"
    }}>
      <h2 style={{
        color: "#00ffff",
        textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff",
        marginBottom: "30px",
        fontFamily: "monospace",
        fontSize: "32px",
        letterSpacing: "2px",
        textAlign: "center"
      }}>
        SHOPPING CART
      </h2>

      {cart.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px",
          backgroundColor: "rgba(10, 25, 47, 0.7)",
          borderRadius: "20px",
          border: "1px solid rgba(0, 255, 255, 0.3)"
        }}>
          <p style={{
            color: "#ccddee",
            fontSize: "20px",
            fontFamily: "monospace",
            marginBottom: "20px"
          }}>
            YOUR CART IS EMPTY
          </p>
          <button
            onClick={() => setPage("home")}
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
              fontFamily: "monospace"
            }}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                padding: "20px",
                backgroundColor: "rgba(10, 25, 47, 0.7)",
                border: "1px solid rgba(0, 255, 255, 0.3)",
                borderRadius: "15px",
                marginBottom: "15px",
                transition: "all 0.3s ease",
                flexWrap: "wrap"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ flex: 2, minWidth: "150px" }}>
                <p style={{
                  color: "#00ffff",
                  fontSize: "16px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  marginBottom: "5px"
                }}>
                  PRODUCT ID: {item.productId}
                </p>
                {item.name && (
                  <p style={{
                    color: "#ccddee",
                    fontSize: "14px",
                    fontFamily: "monospace"
                  }}>
                    {item.name}
                  </p>
                )}
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "15px"
              }}>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "rgba(0, 255, 255, 0.1)",
                    color: "#00ffff",
                    border: "1px solid #00ffff",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "18px",
                    fontWeight: "bold",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(0, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgba(0, 255, 255, 0.1)";
                  }}
                >
                  -
                </button>
                
                <span style={{
                  color: "#00ffff",
                  fontSize: "16px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  minWidth: "30px",
                  textAlign: "center"
                }}>
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "rgba(0, 255, 255, 0.1)",
                    color: "#00ffff",
                    border: "1px solid #00ffff",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "18px",
                    fontWeight: "bold",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(0, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgba(0, 255, 255, 0.1)";
                  }}
                >
                  +
                </button>
              </div>

              <div style={{ minWidth: "100px", textAlign: "right" }}>
                <p style={{
                  color: "#00ffff",
                  fontSize: "18px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  textShadow: "0 0 5px rgba(0, 255, 255, 0.5)"
                }}>
                  ₹{(item.price || 0) * item.quantity}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.productId)}
                style={{
                  padding: "8px 15px",
                  backgroundColor: "transparent",
                  color: "#ff3366",
                  border: "1px solid #ff3366",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 51, 102, 0.2)";
                  e.target.style.boxShadow = "0 0 10px rgba(255, 51, 102, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.boxShadow = "none";
                }}
              >
                REMOVE
              </button>
            </div>
          ))}

          <div style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "rgba(10, 25, 47, 0.8)",
            borderRadius: "15px",
            border: "1px solid rgba(0, 255, 255, 0.3)",
            textAlign: "right"
          }}>
            <h3 style={{
              color: "#00ffff",
              fontSize: "24px",
              fontFamily: "monospace",
              marginBottom: "20px"
            }}>
              TOTAL: ₹{total}
            </h3>
            
            <button
              onClick={() => {
                setTotal(total);
                setPage("checkout");
              }}
              style={{
                padding: "15px 40px",
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
                fontFamily: "monospace"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      )}
    </div>
  );
}