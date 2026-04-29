import { useState } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Navbar from "./components/Navbar";

function App() {
  const [page, setPage] = useState("home");
  const [total, setTotal] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #0a192f 100%)",
      position: "relative"
    }}>
      <Navbar setPage={setPage} />

      <div style={{
        animation: "fadeIn 0.5s ease-in-out"
      }}>
        {page === "home" && <Home setPage={setPage} />}
        {page === "cart" && <Cart setPage={setPage} setTotal={setTotal} />}
        {page === "checkout" && <Checkout total={total} setPage={setPage} />}
        {page === "success" && <Success setPage={setPage} />}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;