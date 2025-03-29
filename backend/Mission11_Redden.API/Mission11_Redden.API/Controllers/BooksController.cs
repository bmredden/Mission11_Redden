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
        public async Task<ActionResult> GetBooks(
            int page = 1,
            int pageSize = 5,
            string sortBy = "Title",
            [FromQuery] List<string>? category = null)
        {
            var query = _context.Books.AsQueryable();

            if (category != null && category.Any())
            {
                query = query.Where(b => category.Contains(b.Category));
            }

            var totalCount = await query.CountAsync();

            List<Books> books;

            if (sortBy == "Price")
            {
                books = query
                    .ToList() 
                    .OrderBy(b => b.Price)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }
            else
            {
                books = await query
                    .OrderBy(b => EF.Property<object>(b, sortBy))
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
            }

            return Ok(new
            {
                books,
                totalCount
            });
        }
        
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<string>>> GetCategories()
        {
            var categories = await _context.Books
                .Select(b => b.Category)
                .Distinct()
                .OrderBy(c => c)
                .ToListAsync();

            return Ok(categories);
        }
    }
}