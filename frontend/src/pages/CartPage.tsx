import { useContext } from "react";
import { CartContext } from "../components/CartContext.tsx";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <>
          <div className="alert alert-info">Your cart is empty.</div>
          <div className="text-center mt-3">
            <Link to="/" className="btn btn-outline-primary">
              ← Continue Shopping
            </Link>
          </div>
        </>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th style={{ width: "120px" }}>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.bookID}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.bookID, parseInt(e.target.value))
                      }
                      className="form-control"
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.bookID)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="text-end">Total: ${total.toFixed(2)}</h4>

          <div className="d-flex justify-content-between mt-4">
            <Link to="/" className="btn btn-outline-primary">
              ← Continue Shopping
            </Link>
            <button className="btn btn-outline-danger" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
