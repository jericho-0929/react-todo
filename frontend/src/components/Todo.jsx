function Todo({tasks, handleToggleSelect, handleToggleStatus}) {
    return (
        <>
        {
        tasks.map((task) => (
            <tr key={task.id}>
                <td> {task.name} </td>
                <td> {task.description}</td>
                <td> 
                    <input
                        type='checkbox'
                        defaultChecked={task.isCompleted}
                        value={task.id}
                        onChange= {handleToggleStatus}
                    />
                    {task.isCompleted ? 'Completed' : 'Active'} 
                </td>
                <td> 
                    <input
                        type="checkbox"
                        name="selectCheckbox"
                        value={task.id}
                        checked={task.isChecked}
                        onChange={handleToggleSelect}
                    /> 
                </td>
                <td> {(new Date(task.dateAdded)).toISOString().split('T')[0]} </td>
            </tr>
        ))}
        </>
    );
}

export default Todo;