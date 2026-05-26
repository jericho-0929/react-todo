function DeleteButton(props) {
    const numberOfSelected = props.selectedTasks.length;

    function handleDeleteTasks() {
        const isConfirmed = window.confirm("Are you sure you want to delete: " + numberOfSelected + " items?");

        if (isConfirmed) {
            const remainingTasks = props.tasks.filter(
                (task) => !props.selectedTasks.includes(task.id)
            );
            const deletedTasks = props.tasks.filter(
                (task) => props.selectedTasks.includes(task.id)
            );

            props.setTasks(remainingTasks);
            props.setSelectedTasks([]);

            // Set aside delete tasks for reversion.
            props.setDeletedTasks(deletedTasks);
            // Open temporary toast for delete undo.
            props.openUndoDialog();
        }
    }
    return (
        <button name='deleteTaskBtn' type='button' onClick={handleDeleteTasks}> 
         Delete {(numberOfSelected > 0) ? (numberOfSelected) + " ": ""}Task(s) 
        </button>
    );
}

export default DeleteButton;