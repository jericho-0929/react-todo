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

        // Removed because deletedTasks may include more that one tasks, 
        // and all should be reverted if done.
        // const deletedTaskObject = deletedTask[0]

        if (deletedTasks.length <= 0) {
            console.error("Recently deleted task not found!");
            onClose();
            return false;
        }

        setTasks([...tasks, ...deletedTasks]);
        onClose();
    }

    return (
        <dialog
            ref={ref}
            onCancel={onClose}
            id="undoDialog"
        >
        <span> Tasks deleted! </span><br/>
        <button name="Undo" type="button" onClick={handleUndo}> Undo </button>
        </dialog>
    )
}

export default UndoDialog;