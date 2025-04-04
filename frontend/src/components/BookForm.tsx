import { useState, useEffect } from "react";
import { Book } from "../types/Book";

interface BookFormProps {
  onBookSaved: () => void;
  editingBook: Book | null;
  clearEditing: () => void;
}

const defaultBook = {
  bookID: 0,
  title: "",
  author: "",
  publisher: "",
  isbn: "",
  classification: "",
  category: "",
  pageCount: 0,
  price: 0,
};

const BookForm = ({
  onBookSaved,
  editingBook,
  clearEditing,
}: BookFormProps) => {
  const [book, setBook] = useState(defaultBook);

  useEffect(() => {
    if (editingBook) {
      setBook(editingBook);
    } else {
      setBook(defaultBook);
    }
  }, [editingBook]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: name === "pageCount" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const method = book.bookID ? "PUT" : "POST";
    const url = book.bookID
      ? `https://localhost:5001/api/books/${book.bookID}`
      : "https://localhost:5001/api/books";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    onBookSaved();
    setBook(defaultBook);
    clearEditing();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>{book.bookID ? "Edit Book" : "Add New Book"}</h5>
      <div className="row">
        <div className="col-md-4 mb-2">
          <input
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Title"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Author"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            name="publisher"
            value={book.publisher}
            onChange={handleChange}
            placeholder="Publisher"
            className="form-control"
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            placeholder="ISBN"
            className="form-control"
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            name="classification"
            value={book.classification}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Classification</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select
            name="category"
            value={book.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Category</option>
            <option value="Action">Action</option>
            <option value="Biography">Biography</option>
            <option value="Business">Business</option>
            <option value="Christian Books">Christian Books</option>
            <option value="Classic">Classic</option>
            <option value="Health">Health</option>
            <option value="Historical">Historical</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Thrillers">Thrillers</option>
          </select>
        </div>
        <div className="col-md-6 mb-2">
          <label htmlFor="pageCount">Page Count</label>
          <input
            type="number"
            id="pageCount"
            name="pageCount"
            value={book.pageCount}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-6 mb-2">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={book.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-success mt-2">
        {book.bookID ? "Update Book" : "Add Book"}
      </button>
      {editingBook && (
        <button
          type="button"
          className="btn btn-secondary mt-2 ms-2"
          onClick={() => {
            setBook(defaultBook);
            clearEditing();
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default BookForm;
