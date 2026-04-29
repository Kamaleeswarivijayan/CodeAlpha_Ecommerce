import { useEffect, useState } from "react";
import API from "../api";

export default function Home({ setPage }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // ONLY ONE addToCart function - NO DUPLICATES
  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("User not ready, refresh page");
      return;
    }

    try {
      await API.post("/cart/add", {
        userId: user._id,
        productId: product._id,
        quantity: 1,
        price: product.price,
        name: product.name
      });

      alert("Added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart");
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
        fontFamily: "monospace",
        fontSize: "20px"
      }}>
        LOADING PRODUCTS...
      </div>
    );
  }

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
        textAlign: "center"
      }}>
        PRODUCTS
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "25px",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              background: "rgba(10, 25, 47, 0.9)",
              backdropFilter: "blur(10px)",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid rgba(0, 255, 255, 0.3)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {product.image && (
              <div style={{
                width: "100%",
                height: "200px",
                overflow: "hidden",
                borderRadius: "10px",
                marginBottom: "15px"
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

            <h4 style={{
              color: "#00ffff",
              marginBottom: "10px",
              fontFamily: "monospace"
            }}>
              {product.name}
            </h4>

            <p style={{
              color: "#ccddee",
              fontSize: "14px",
              marginBottom: "10px"
            }}>
              {product.description}
            </p>

            <p style={{
              color: "#00ffff",
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "15px"
            }}>
              ₹{product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              style={{
                background: "linear-gradient(135deg, #00ffff, #0066ff)",
                border: "none",
                padding: "12px",
                width: "100%",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#0a192f",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.02)";
                e.target.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}