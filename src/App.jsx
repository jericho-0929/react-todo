import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

import FilterRadio from './components/FilterRadio';
import TaskDialog from './components/TaskDialog';
import DeleteButton from './components/DeleteButton';
import SearchBar from './components/Search';
import UndoDialog from './components/UndoDialog';
import FilterRecency from './components/FilterRecency';
import PaginatedItems from './components/PaginatedItems';

function App(props) {
  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem('tasks');
    return localData ? JSON.parse(localData) : props.tasks
  });
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const [selectedTasks, setSelectedTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("oldest");
  const [nameSearchFilter, setNameSearchFilter] = useState("");

  const [deletedTasks, setDeletedTasks] = useState();

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isUndoDialogOpen, setIsUndoDialogOpen] = useState(false);
  const [isEditDialog, setIsEditDialog] = useState(false);

  const openTaskDialog = () => setIsTaskDialogOpen(true);
  const closeTaskDialog = () => {
    setIsTaskDialogOpen(false);
    setIsEditDialog(false);
  };

  // Feature addition: Limited-time for undo delete.
  const openUndoDialog = () => setIsUndoDialogOpen(true);
  const closeUndoDialog = () => {
    setIsUndoDialogOpen(false);
    // Ensures that the state variable is emptied regardless of how UndoDialog is closed.
    setDeletedTasks([]);  
  }
  useEffect(() => {
    let toastTimer;
    if (isUndoDialogOpen) {
        toastTimer = setTimeout(() => {
          closeUndoDialog();
      }, 3000);
    }
    return () => {
      clearTimeout(toastTimer);
    };  
  }, [isUndoDialogOpen]);

  const tasksByStatus = tasks.filter((task) => {
    if (statusFilter === "all") {
      return true;
    }
    if (statusFilter === "true") {
      return task.isCompleted;
    }
    return !task.isCompleted;
  })

  const tasksByName = tasksByStatus.filter((task) => 
    task.name.toLowerCase().includes(nameSearchFilter.toLowerCase().trim())
  );

  // Feature addition: Sort by Date
  const tasksBySort = [...tasksByName].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.dateAdded - a.dateAdded;
    } else {
      return a.dateAdded - b.dateAdded;
    }
  });

  // const todoList refactored to return parameter of Todo function.

  function addTask(name, description) {
    // Generated nanoid output is still used as a way to track unique entries 
    // for all manners of entry manipulation/selection.
    const newTask = {
      id: nanoid(3),
      name, description, 
      isCompleted: false, 
      isSelected: false,
      dateAdded: Date.now() // Used for sorting.
    };
    setTasks([...tasks, newTask]);
  };

  function editTask(name, description) {
    const id = selectedTasks[0];

    setTasks(prevTasks => prevTasks.map(task => {
        if (task.id === id) {
          return {...task, name, description}; // dateAdded key not to be changed.
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


  // TODO: Attempt to refactor these two functions to Todo.jsx.
  function handleToggleSelect(event) {
      const value = event.target.value;

      if (event.target.checked) {
          setSelectedTasks([...selectedTasks, value]);
      } else {
          setSelectedTasks(selectedTasks.filter((item) => item !== value));
      }
  }

  function handleToggleStatus(event) {
    const updatedTasks = tasks.map((task) => {
      if (event.target.value === task.id) {
        return {...task, isCompleted: !task.isCompleted};
      }
      return task;
    });
    setTasks(updatedTasks);
  };

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
            statusFilter = {statusFilter}
            setStatusFilter = {setStatusFilter}
            originalTasks= {tasks}
          />
        </div>

        <div>
          <FilterRecency
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>

        <div id="container">
              {/* <Todo /> replaced with <PaginatedItems /> for dynamic rendering of pages*/}
              <PaginatedItems
                itemsPerPage={5}
                items={tasksBySort}
                handleToggleSelect={handleToggleSelect}
                handleToggleStatus={handleToggleStatus}
              />
        </div>

        <div className="user-input-buttons">
            <DeleteButton 
              tasks={tasks}
              setTasks={setTasks}
              deletedTasks={deletedTasks}
              setDeletedTasks={setDeletedTasks}
              selectedTasks={selectedTasks}
              setSelectedTasks={setSelectedTasks}
              openUndoDialog={openUndoDialog}
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

            <UndoDialog
              isOpen={isUndoDialogOpen}
              onClose={closeUndoDialog}
              tasks={tasks}
              setTasks={setTasks}
              deletedTasks={deletedTasks}
              setDeletedTasks={setDeletedTasks}
            />
        </div>
      </div>
    </>
  )
}

export default App
