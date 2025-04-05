import { Book } from "../types/Book";

interface AdminBookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDeleted: () => void;
}

const AdminBookTable = ({ books, onEdit, onDeleted }: AdminBookTableProps) => {
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await fetch(`https://is413-mission13-backend-hfhygrhuhxeqbggp.westus2-01.azurewebsites.net/api/books/${id}`, {
        method: "DELETE",
      });
      onDeleted(); // refresh
    }
  };

  return (
    <>
      <h5 className="mt-3">Curernt Book List</h5>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.pageCount}</td>
              <td>${b.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => onEdit(b)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(b.bookID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminBookTable;
