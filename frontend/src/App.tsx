import { useEffect, useState } from 'react'
import { TodoType } from './types';
import TodoList from './components/TodoList/Todolist';
import './styles.css';
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

  return (
    <div className='todo-container'>
      <TodoList todos={todos}  />
    </div>
  )
};

export default App;
