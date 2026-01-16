import React, {useState} from 'react';

function Todo(taskEntry) {
    const [selectedTasks, setSelectedTasks] = useState([]);
    function handleCheckboxChange(event) {
        const value = event.target.value;

        if (selectedTasks.includes(value)) {
            setSelectedTasks(selectedTasks.filter((item) => item !== value));
        } else {
            setSelectedTasks([...selectedTasks, value]);
        }
        console.log(selectedTasks);
    }

    return (
        <tr>
            <td> {taskEntry.id} </td>
            <td> {taskEntry.name} </td>
            <td> {taskEntry.description}</td>
            <td> {taskEntry.isCompleted ? 'Completed' : 'Active'} </td>
            <td> 
                <input
                    type="checkbox"
                    name="selectCheckbox"
                    value={taskEntry.id}
                    checked={taskEntry.isChecked}
                    onChange={handleCheckboxChange}
                /> 
            </td>
        </tr>
    );
}

export default Todo;