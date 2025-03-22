using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11_Redden.Data;

namespace Mission11_Redden.API.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookstoreContext _context;

        public BooksController(BookstoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Books>>> GetBooks(int page = 1, int pageSize = 5, string sortBy = "Title")
        {
            var query = _context.Books.AsQueryable();

            if (sortBy == "Price")
            {
                // Fetch all books into memory for in-memory sorting
                var allBooks = await query.ToListAsync();

                // Sort and paginate manually
                var sorted = allBooks
                    .OrderBy(b => b.Price)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                return Ok(sorted);
            }

            // Server-side sorting and pagination for supported fields
            var books = await query
                .OrderBy(b => EF.Property<object>(b, sortBy))
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(books);
        }
    }
}