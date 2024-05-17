import { useState } from 'react'
import './App.css'
import TodosForm from './components/TodosForm';

function App() {
  const[todos, setTodos] = useState([]);

  return (
    <div>
      <TodosForm todos={todos} setTodos={setTodos}/>
    </div>
  )
}

export default App
