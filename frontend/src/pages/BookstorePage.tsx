import { useRef } from "react";
import Header from "../components/Header";
import BookTable from "../components/BookTable";
import CartSummary from "../components/CartSummary";
import "bootstrap/dist/css/bootstrap.min.css";

// @ts-ignore
declare global {
  interface Window {
    bootstrap: any;
  }
}

function BookstorePage() {
  const toastRef = useRef<HTMLDivElement>(null);

  const showToast = () => {
    const toastEl = toastRef.current;
    if (toastEl) {
      const toast = new window.bootstrap.Toast(toastEl);
      toast.show();
    }
  };

  return (
    <>
      <CartSummary />
      <div className="container">
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <BookTable showToast={showToast} />
        </div>
      </div>

      <div
        ref={toastRef}
        className="toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-4"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-delay="1500"
      >
        <div className="d-flex">
          <div className="toast-body">☑️ Book added to cart</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </>
  );
}

export default BookstorePage;
