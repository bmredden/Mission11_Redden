import "./App.css";
import AdminBookPage from "./pages/AdminBookPage";
import BookstorePage from "./pages/BookstorePage";
import CartPage from "./pages/CartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookstorePage />} />
        <Route path="/store" element={<BookstorePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminBookPage />} />
      </Routes>
    </Router>
  );
}

export default App;
