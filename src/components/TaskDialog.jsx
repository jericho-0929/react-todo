import {useEffect, useState, useRef} from "react";

function TaskDialog({ isOpen, onClose, isEdit, addTaskHandler, editTaskHandler }) {
    const ref = useRef();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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

    function handleSubmit(event) {
        event.preventDefault();
        if (name.length <= 0) {
            alert("Enter a task name!");
            return null;
        }
        
        if (isEdit) {
            editTaskHandler(name, description);
        } else {
            addTaskHandler(name, description);
        }

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
            <form onSubmit={handleSubmit}>
                <span> {isEdit ? 'Edit Task' : 'Add Task'} </span>
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

export default TaskDialog;