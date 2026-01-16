function FilterRadio() {
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
          />
        </>
    );
}

export default FilterRadio;