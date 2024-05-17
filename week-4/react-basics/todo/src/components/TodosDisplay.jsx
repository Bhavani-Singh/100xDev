import PropTypes from "prop-types";

function TodosDisplay({todos}) {
    return <div>
        {todos.map((todo, index) => {
            return <div key={index}>
                    <h1>{todo.title}</h1>
                    <p>{todo.description}</p>
                </div>
        })}
    </div>
}

TodosDisplay.propTypes = {
    todos: PropTypes.array.isRequired
}

export default TodosDisplay;