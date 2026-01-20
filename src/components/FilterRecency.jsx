function FilterRecency({sortOrder, setSortOrder}) {
  function handleSort(event) {
    setSortOrder(event.target.value);
  }
  
  // Use sortOrder === string instead of isNewest for ease-of-readability.

  return (
    <form>
      <label>
        Sort by:
      </label>
      <label>
        <input
          type="radio"
          value="newest"
          checked={sortOrder === "newest"}
          onChange={handleSort}
        />
        <span> Newest </span>
      </label>
      <label>
        <input
          type="radio"
          value="oldest"
          checked={sortOrder === "oldest"}
          onChange={handleSort}
        />
        <span> Oldest </span>
      </label>
    </form>
  );
}

export default FilterRecency;