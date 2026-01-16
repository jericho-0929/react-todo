function FilterRadio() {
    return (
        <>
        <label htmlFor="filter-input">
          Filter by: 
        </label>
        <label htmlFor="filter-input">
          <input type="radio" id="filter-choice-all" name="filterChoice" value="byAll" />
          <span> All </span>
        </label>
        <label htmlFor="filter-input">
          <input type="radio" id="filter-choice-all" name="filterChoice" value="byActive" />
          <span> Active </span>
        </label>
                <label htmlFor="filter-input">
          <input type="radio" id="filter-choice-all" name="filterChoice" value="byCompleted" />
          <span> Completed </span>
        </label>
        </>
    );
}

export default FilterRadio;