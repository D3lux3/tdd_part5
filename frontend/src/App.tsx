import { useEffect, useState } from 'react'
import { Todo, TodoWithoutId } from './types';
import { todoSchema } from './validationSchemas/TodoValidationSchema';

const API_URL = 'http://localhost:1337/todo'

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
  return validatedResponse;
}

const App = () => {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [ todoInputValue, setTodoInputValue ] = useState<string>('');


  const handleNewTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    setTodoInputValue('');
    
    try {
      const newTodo = {
        name: todoInputValue,
        done: false,
      }
      console.log(newTodo)
      const addedTodo = await addNewTodo(newTodo);
      setTodos([...todos, addedTodo]);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(API_URL);
        const todos = await response.json();
        setTodos(todos);
        console.log(todos);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTodos();
  }, []);

  return (
    <>
    <form onSubmit={handleNewTodo}>
      <a>Todo name</a>
      <input data-testid="taskname" type="text" value={todoInputValue} onChange={(event) => setTodoInputValue(event.target.value)} name='name' />
      <button data-testid="addtask" type="submit">Add new</button>
    </form>
    
    <ul data-testid="tasks">
      {todos.map((todo) => <li key={todo.id}>{todo.name} | {todo.done ? "✅": "❌"} </li>)}
    </ul>
    </>
  )
};

export default App;
