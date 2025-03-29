import Header from "../components/Header";
import BookTable from "../components/BookTable";
import CartSummary from "../components/CartSummary";
import "bootstrap/dist/css/bootstrap.min.css";

function BookstorePage() {
  return (
    <>
      <CartSummary />
      <div className="container">
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <BookTable />
        </div>
      </div>
    </>
  );
}

export default BookstorePage;
