function FilterRadio({statusFilter, setStatusFilter, originalTasks, setTasksByStatus}) {
  function handleRadioChange(event) {
    setTasksByStatus(originalTasks.filter(
      (task) => {
        if (event.target.value === "all") {
          setStatusFilter("all");
          return true;
        }
        if (event.target.value === "true") {
          console.log(event.target.value);
          setStatusFilter("true");
          return task.isCompleted;
        }
        setStatusFilter("false");
        return !task.isCompleted;
      }
    ));
  }

  const allCount = originalTasks.length;
  const activeCount = originalTasks.reduce ((count, tasks) => {
    return count + (!tasks.isCompleted ? 1 : 0)
  }, 0);
  const completedCount = allCount - activeCount;

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
          <span> All ({allCount}) </span>
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
          <span> Active ({activeCount}) </span>
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
          <span> Completed ({completedCount})</span>
        </label>
      </form>
  );
}

export default FilterRadio;