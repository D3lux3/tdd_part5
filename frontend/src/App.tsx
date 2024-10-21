import { useEffect, useState } from 'react'
import { TodoType, TodoWithoutId } from './types';
import TodoList from './components/TodoList/Todolist';
import './styles.css';
import { todoSchema } from './validationSchemas/TodoValidationSchema';
const API_URL = 'http://localhost:1337/todo'



const App = () => {
  const [ todos, setTodos ] = useState<TodoType[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(API_URL);
        const todos = await response.json();
        setTodos(todos);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTodos();
  }, []);

  const addNewTodo = async (newTodo: TodoWithoutId) => {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const parsedResponse = await response.json();
    const validatedResponse = await todoSchema.validate(parsedResponse);
    setTodos([...todos, validatedResponse]);
    return validatedResponse;
  }
  
  return (
    <div className='todo-container'>
      <TodoList todos={todos} createTodo={addNewTodo}/>
    </div>
  )
};

export default App;
