import { useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

import Todo from "./components/Todo";
import FilterRadio from './components/FilterRadio';
import Search from './components/Search';
import TaskDialog from './components/TaskDialog';
import DeleteButton from './components/DeleteButton';

function App(props) {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState(props.tasks);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const openTaskDialog = () => setIsTaskDialogOpen(true);
  const closeTaskDialog = () => setIsTaskDialogOpen(false);

  const todoList = tasks?.map((task) => (
    <Todo 
      id={task.id} 
      name={task.name} 
      description={task.description} 
      isCompleted={task.isCompleted}
      isSelected={task.isSelected}
      key={task.id}
      handleToggleSelect={handleToggleSelect}
      handleToggleStatus={handleToggleStatus}
    />
  ));

  function handleToggleStatus(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, isCompleted: !task.isCompleted};
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  function addTask(name, description) {
    const newTask = {id: nanoid(3), name, description, isCompleted: false, isSelected: false};
    setTasks([...tasks, newTask]);
  };

  function handleToggleSelect(event) {
      const value = event.target.value;

      if (event.target.checked) {
          setSelectedTasks([...selectedTasks, value]);
      } else {
          setSelectedTasks(selectedTasks.filter((item) => item !== value));
      }
      console.log(selectedTasks)
  }

  return (
    <>
      <div className="todoapp title-div">
        <h1> Todo Lister </h1>
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
            <DeleteButton 
              tasks={tasks}
              setTasks={setTasks}
              selectedTasks={selectedTasks}
              setSelectedTasks={setSelectedTasks}
            />
            <button name="editTaskBtn" type="button">
              Edit Task
            </button>
            <button name="addTaskBtn" type='button' onClick={openTaskDialog}> 
              Add Task  
            </button>

            <TaskDialog 
              isOpen={isTaskDialogOpen} 
              onClose={closeTaskDialog} 
              addTaskHandler={addTask}
            />
        </div>

      </div>
    </>
  )
}

export default App
