function Todo(props) {
    return (
        <tr>
            <td> {props.id} </td>
            <td> {props.name} </td>
            <td> This is a placeholder </td>
            <td> Active </td>
        </tr>
    );
}

export default Todo;