import {useEffect, useState, useRef} from "react";

function AddTaskDialog({ isOpen, onClose, addTaskHandler, editTaskHandler }) {
    const ref = useRef();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    console.log(name.length)

    useEffect(() => {
        if (isOpen) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [isOpen]);

    function handleNameChange(event) {
        event.preventDefault();
        setName(event.target.value);
    };

    function handleDescriptionChange(event) {
        event.preventDefault();
        setDescription(event.target.value);
    }

    function handleAddTask(event) {
        event.preventDefault();
        if (name.length <= 0) {
            alert("Enter a task name!");
            return null;
        }
        
        addTaskHandler(name, description);
        setName("");
        setDescription("");
        onClose();
    }

    return (
        <dialog
            ref={ref}
            onCancel={onClose}
            id="TaskDialog"
        >
            <form onSubmit={handleAddTask}>
                <span> Add Task: </span>
                <br/>
                <label htmlFor="task-name-entry"> Task Name: </label>
                <input 
                    type="text" 
                    id="task-name-entry" 
                    name="taskNameEntry"
                    autoComplete="off"
                    value={name}
                    onChange={handleNameChange}
                />
                <br/>
                <label htmlFor="task-name-entry"> Task Description: </label>
                <input 
                    type="text" 
                    id="task-name-description" 
                    name="taskNameDescription" 
                    autoComplete="off"
                    value={description}
                    onChange={handleDescriptionChange}
                />

                <br/><button type="button" name="DialogCancel" onClick={onClose} autoFocus> Cancel </button>
                <button name="DialogSubmit" type="submit"> Enter </button>
            </form>
        </dialog>

    );
}

export default AddTaskDialog;