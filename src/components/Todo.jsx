import React, {useState} from 'react';

function Todo(props) {
    return (
        <tr>
            <td> {props.id} </td>
            <td> {props.name} </td>
            <td> {props.description}</td>
            <td> 
                <input
                    id={props.id}
                    type='checkbox'
                    defaultChecked={props.isCompleted}
                    onChange= {() => props.handleToggleStatus(props.id)}
                />
                {props.isCompleted ? 'Completed' : 'Incomplete'} 
            </td>
            <td> 
                <input
                    type="checkbox"
                    name="selectCheckbox"
                    value={props.id}
                    checked={props.isChecked}
                    onChange={props.handleToggleSelect}
                /> 
            </td>
        </tr>
    );
}

export default Todo;