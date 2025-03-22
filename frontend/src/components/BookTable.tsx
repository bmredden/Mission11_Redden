import { useEffect, useState } from "react";

interface Books {
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

function BookTable() {
  const [books, setBooks] = useState<Books[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const fetchBooks = () => {
    fetch(
      `https://localhost:5001/api/books?page=${page}&pageSize=${pageSize}&sortBy=Title`
    )
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  return (
    <>
      <table border={1} width="100%" cellPadding={20}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Page Count</th>
            <th>Price</th>
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
                {typeof b.price === "number" ? `$${b.price.toFixed(2)}` : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <br></br>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </>
  );
}

export default BookTable;
