import { useEffect, useState } from "react";
import { useContext } from "react";
import BookFilters from "./BookFilters";
import { CartContext } from "./CartContext";

interface Book {
  bookID: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}

interface BookTableProps {
  showToast: () => void;
}

function BookTable({ showToast }: BookTableProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState("Title");
  const [totalCount, setTotalCount] = useState(0);

  const { addToCart } = useContext(CartContext);

  const totalPages = Math.ceil(totalCount / pageSize);

  const fetchCategories = async () => {
    const res = await fetch("https://localhost:5001/api/books/categories");
    const data = await res.json();
    setCategories(data);
  };

  const fetchBooks = async () => {
    const categoryQuery = selectedCategories
      .map((c) => `category=${encodeURIComponent(c)}`)
      .join("&");

    const url = `https://localhost:5001/api/books?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&${categoryQuery}`;
    const res = await fetch(url);
    const data = await res.json();
    setBooks(data.books);
    setTotalCount(data.totalCount);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [page, pageSize, sortBy, selectedCategories]);

  return (
    <div className="row">
      {/* filters */}
      <div className="col-md-2">
        <BookFilters
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          sortBy={sortBy}
          setSortBy={setSortBy}
          pageSize={pageSize}
          setPageSize={setPageSize}
          resetPage={() => setPage(1)}
        />
      </div>

      {/* table */}
      <div className="col-md-10">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Classification</th>
              <th>Category</th>
              <th>Page Count</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.bookID}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publisher}</td>
                <td>{b.isbn}</td>
                <td>{b.classification}</td>
                <td>{b.category}</td>
                <td>{b.pageCount}</td>
                <td>
                  {typeof b.price === "number"
                    ? `$${b.price.toFixed(2)}`
                    : "N/A"}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      addToCart({
                        bookID: b.bookID,
                        title: b.title,
                        price: b.price,
                        quantity: 1,
                      });
                      showToast();
                    }}
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagintaion */}
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="fw-bold">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary ms-2"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookTable;
