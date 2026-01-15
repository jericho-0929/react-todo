import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from "./components/Todo";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="todoapp title-div">
        <h1> YET ANOTHER TO-DO APP</h1>
      </div>
      <div className="todoapp user-inputs">
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

        <div>
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
        </div>

        <div className="todo-list-container">
          <table>
            <thead>
              <tr>
                <th> Index </th>
                <th> Task Name </th>
                <th> Description </th>
                <th> Status </th>
              </tr>
            </thead>
            <tbody>
              <Todo name="Placeholder" id="0"/>
            </tbody>
          </table>
        </div>

        <div className="user-input-buttons">
          <button name='deleteTaskBtn' type='button'> Delete Task(s) </button>
          <button name="setStatusBtn" type='button'> Set Status </button>
          <button name="addTaskBtn" type='button'> Add Task </button>
        </div>

      </div>
    </>
  )
}

export default App
