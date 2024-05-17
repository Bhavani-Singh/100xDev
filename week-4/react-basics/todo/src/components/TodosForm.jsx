import {useState} from "react";
import PropTypes from "prop-types";
import TodosDisplay from "./TodosDisplay";

function TodosForm({todos, setTodos}) {
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    

    function handleOnClick() {
        const todo = {
            title,
            description
        };

        todos.push(todo);

        setTodos(todos);
        setTitle("");
        setDescription("");
    }

    return <div>
        <center>
            <h1>Todos</h1>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/><br/><br/>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br/><br/>
            <button onClick={handleOnClick}>Add</button>
            <br/><br/>
            <h2>Todos:</h2>
            <TodosDisplay todos={todos} />
        </center>
    </div>
}

TodosForm.propTypes = {
    todos: PropTypes.array.isRequired,
    setTodos: PropTypes.func.isRequired
}

export default TodosForm;