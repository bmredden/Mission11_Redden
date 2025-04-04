import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import AdminBookTable from "../components/AdminBookTable";
import { Book } from "../types/Book";

const AdminBookPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchBooks = async () => {
    const res = await fetch(
      `https://localhost:5001/api/books?page=${page}&pageSize=${pageSize}`
    );
    const data = await res.json();
    setBooks(data.books);
    setTotalCount(data.totalCount);
  };

  useEffect(() => {
    fetchBooks();
  }, [page]); // run when page changes

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const clearEditing = () => {
    setEditingBook(null);
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin Book Access</h2>

      <hr />
      <br></br>
      
      <AdminBookTable
        books={books}
        onEdit={handleEdit}
        onDeleted={fetchBooks}
      />

      <div className="text-center mt-3">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="fw-bold">
          Page {page} of {Math.ceil(totalCount / pageSize)}
        </span>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= Math.ceil(totalCount / pageSize)}
        >
          Next
        </button>
      </div>
      <br></br>
      <br></br>

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setEditingBook(null);
          setShowForm(true);
        }}
      >
        + Add New Book
      </button>

      {showForm && (
        <BookForm
          onBookSaved={() => {
            fetchBooks();
            setShowForm(false);
          }}
          editingBook={editingBook}
          clearEditing={clearEditing}
        />
      )}
    </div>
  );
};

export default AdminBookPage;
