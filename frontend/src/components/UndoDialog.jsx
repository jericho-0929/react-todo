import {useEffect, useState, useRef} from "react";

function UndoDialog(
    {isOpen, onClose, tasks, setTasks, deletedTasks}) {
    const ref = useRef();

    useEffect(() => {
        if (isOpen) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    });

    function handleUndo(event) {
        event.preventDefault();

        // Commented code below is such because deletedTasks may include more that one tasks.
        // const deletedTaskObject = deletedTask[0]

        if (deletedTasks.length <= 0) {
            console.error("Recently deleted task not found!");
            onClose();
            return false;
        }

        setTasks([...tasks, ...deletedTasks]); // "Sort by Date" functionality conveniently re-sorts this.
        onClose();
    }

    // TODO: Implement dynamic counting (or other helpful-to-user UI addition) of deleted entries.
    return (
        <dialog
            ref={ref}
            onCancel={onClose}
            id="undoDialog"
        >
        <span> Task(s) deleted! </span><br/>
        <button name="Undo" type="button" onClick={handleUndo}> Undo </button>
        </dialog>
    )
}

export default UndoDialog;