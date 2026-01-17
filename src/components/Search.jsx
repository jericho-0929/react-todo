function SearchBar({nameSearchFilter, setNameSearchFilter}) {
  function handleSearchChange(event) {
    setNameSearchFilter(event.target.value);
  }

  return (
      <>
        <label htmlFor="search-input"> 
          Search by Name: 
        </label>
        <input
          className='todoapp user-inputs'
          type="text"
          id="search-input"
          name="search-input"
          autoComplete='off'
          value={nameSearchFilter}
          onChange={handleSearchChange}
        />
      </>
  );
}

export default SearchBar;