import { useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

import Todo from "./components/Todo";
import FilterRadio from './components/FilterRadio';
import Search from './components/Search';
import AddTaskDialog from './components/AddTaskDialog';

function App(props) {
  const [count, setCount] = useState("Todo App");
  const [tasks, setTasks] = useState(props.tasks);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const todoList = tasks?.map((task) => (
    <Todo 
      id={task.id} 
      name={task.name} 
      description={task.description} 
      isCompleted={task.isCompleted}
      isSelected={task.isSelected}
      key={task.id}
    />
  ));
  
  function handleDelete(event) {
      alert("Delete Button Clicked.");
      // TODO: Remove alert() once functionality implemented.
  }

  function handleSetStatus(event) {
      alert("Set Status Button Clicked.");
      // TODO: Remove alert() once functionality implemented.
  };

  function addTask(name, description) {
    const newTask = {id: nanoid(3), name, description, isCompleted: false, isSelected: false};
    setTasks([...tasks, newTask]);
  };

  return (
    <>
      <div className="todoapp title-div">
        <h1> YET ANOTHER TO-DO APP</h1>
      </div>
      <div className="todoapp">

        <div>
          <Search/>
        </div>


        <div>
          <FilterRadio/>
        </div>

        <div className="todo-list-container">
          <table>

            <thead>
              <tr>
                <th> Task ID </th>
                <th> Task Name </th>
                <th> Description </th>
                <th> Status </th>
                <th> Selected </th>
              </tr>
            </thead>

            <tbody>
              {todoList}
            </tbody>

          </table>
        </div>

        <div className="user-input-buttons">
            <button name='deleteTaskBtn' type='button' onClick={handleDelete}> Delete Task(s) </button>
            <button name="setStatusBtn" type='button' onClick={handleSetStatus}> Set Status </button>
            
            <button name="addTaskBtn" type='button' onClick={openDialog}> 
              Add Task  
            </button>

            <AddTaskDialog 
              isOpen={isOpen} 
              onClose={closeDialog} 
              addTaskHandler={addTask}
            />
        </div>

      </div>
    </>
  )
}

export default App
