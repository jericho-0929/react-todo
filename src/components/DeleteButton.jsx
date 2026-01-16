function DeleteButton(props) {
    function handleDeleteTasks() {
        // TODO: Replace with custom modal dialog that displays names of selected tasks.
        const numberOfSelected = props.selectedTasks.length;
        const isConfirmed = window.confirm("Are you sure you want to delete: " + numberOfSelected + " items?");

        if (isConfirmed) {
            const remainingTasks = props.tasks.filter((task) => !props.selectedTasks.includes(task.id))
            props.setTasks(remainingTasks);
            alert(numberOfSelected + " items deleted!");
            console.log(remainingTasks);
        }
    }
    return (
        <button name='deleteTaskBtn' type='button' onClick={handleDeleteTasks}> 
         Delete Task(s) 
        </button>
    );
}

export default DeleteButton;