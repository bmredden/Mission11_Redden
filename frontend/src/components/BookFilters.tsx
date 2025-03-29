interface BookFiltersProps {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  resetPage: () => void;
}

function BookFilters({
  categories,
  selectedCategories,
  setSelectedCategories,
  sortBy,
  setSortBy,
  pageSize,
  setPageSize,
  resetPage,
}: BookFiltersProps) {
  const handleCategoryChange = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updated);
    resetPage();
  };

  return (
    <div className="text-start">
      <div className="mb-3">
        <label htmlFor="pageSize" className="form-label fw-bold">
          Books per page:
        </label>
        <select
          id="pageSize"
          className="form-select"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            resetPage();
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="sortBy" className="form-label fw-bold">
          Sort by:
        </label>
        <select
          id="sortBy"
          className="form-select"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            resetPage();
          }}
        >
          <option value="Title">Title</option>
          <option value="Author">Author</option>
          <option value="Price">Price</option>
        </select>
      </div>

      <div className="mb-3">
        <p className="fw-bold">Filter by Categories:</p>
        {categories.map((c) => (
          <div className="form-check" key={c}>
            <input
              className="form-check-input"
              type="checkbox"
              id={c}
              checked={selectedCategories.includes(c)}
              onChange={() => handleCategoryChange(c)}
            />
            <label className="form-check-label" htmlFor={c}>
              {c}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookFilters;
