import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "20px",
        background: "#f8f9fa",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        fontSize: "16px",
        zIndex: 1000,
      }}
      onClick={() => navigate("/cart")}
    >
    <span style={{ position: "relative", marginRight: "8px" }}>
        🛒
        {itemCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-10px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {itemCount}
          </span>
        )}
      </span>
      <strong>${total.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;
