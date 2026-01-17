import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

import Todo from "./components/Todo";
import FilterRadio from './components/FilterRadio';
import TaskDialog from './components/TaskDialog';
import DeleteButton from './components/DeleteButton';
import SearchBar from './components/Search';

function App(props) {
  const [count, setCount] = useState(0); // TODO: Separate into activeCount & completedCount
  const [tasks, setTasks] = useState(props.tasks);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const [statusFilter, setStatusFilter] = useState("all");
  const [nameSearchFilter, setNameSearchFilter] = useState("Placeholder");

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isEditDialog, setIsEditDialog] = useState(false);

  const openTaskDialog = () => setIsTaskDialogOpen(true);
  const closeTaskDialog = () => {
    setIsTaskDialogOpen(false);
    setIsEditDialog(false);
  };

  const filteredTasksByStatus = tasks.filter((task) => {
    if (statusFilter === "all") {
      return true;
    }
    if (statusFilter === 'true') {
      return task.isCompleted;
    }
    return !task.isCompleted;
  });

  const filteredTasksByName = filteredTasksByStatus.filter((task) => 
    task.name.toLowerCase().includes(nameSearchFilter.toLowerCase().trim())
  );

  const todoList = filteredTasksByName?.map((task) => (
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

  function editTask(name, description) {
    const id = selectedTasks[0];

    setTasks(prevTasks => prevTasks.map(task => {
        if (task.id === id) {
          return {...task, name, description};
        }
        return task;
      })
    );
  }

  function handleEditSelect(event) {
    event.preventDefault();
    if (selectedTasks.length != 1 ) {
      alert("Please select only one task!");
      return null;
    }
    setIsEditDialog(true);
    openTaskDialog();
  }

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
          <SearchBar
            nameSearchFilter={nameSearchFilter}
            setNameSearchFilter={setNameSearchFilter}
          />
        </div>

        <div>
          <FilterRadio
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>

        <div className="todo-list-container">
{          <table>

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

          </table>}
        </div>

        <div className="user-input-buttons">
            <DeleteButton 
              tasks={tasks}
              setTasks={setTasks}
              selectedTasks={selectedTasks}
              setSelectedTasks={setSelectedTasks}
            />
            <button name="editTaskBtn" type="button" onClick={handleEditSelect}>
              Edit Task
            </button>
            <button name="addTaskBtn" type='button' onClick={openTaskDialog}> 
              Add Task  
            </button>

            <TaskDialog 
              isOpen={isTaskDialogOpen}
              onClose={closeTaskDialog}
              isEdit={isEditDialog}
              addTaskHandler={addTask}
              editTaskHandler={editTask}
            />
        </div>

      </div>
    </>
  )
}

export default App
