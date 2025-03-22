using Microsoft.EntityFrameworkCore;

namespace Mission11_Redden.Data
{
    public class BookstoreContext : DbContext
    {
        public BookstoreContext(DbContextOptions<BookstoreContext> options) : base(options) { }

        public DbSet<Books> Books { get; set; }
    }
}