function FilterRadio({statusFilter, setStatusFilter}) {
  function handleRadioChange(event) {
    if (event.target.value === "all") {
      setStatusFilter("all")
      return null;
    }

    setStatusFilter(event.target.value);
  }

  return (
      <form>
        <label htmlFor="filter-input">
          Filter by: 
        </label>
        <label htmlFor="filter-input">
          <input 
            type="radio" 
            id="filter-choice-all" 
            name="filterChoice" 
            value="all"
            checked={statusFilter === "all"}
            onChange={handleRadioChange}
          />
          <span> All </span>
        </label>
        <label htmlFor="filter-input">
          <input 
            type="radio" 
            id="filter-choice-all" 
            name="filterChoice" 
            value="false"
            checked={statusFilter === "false"}
            onChange={handleRadioChange}
          />
          <span> Active </span>
        </label>
          <label htmlFor="filter-input">
          <input 
            type="radio" 
            id="filter-choice-all" 
            name="filterChoice" 
            value="true"
            checked={statusFilter === "true"}
            onChange={handleRadioChange}
          />
          <span> Completed </span>
        </label>
      </form>
  );
}

export default FilterRadio;