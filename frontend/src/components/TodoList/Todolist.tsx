import React, { useState } from "react";
import { TodoType, TodoWithoutId } from "../../types";
import Todo from "../Todo/Todo";

interface TodoListProps {
  todos: TodoType[];
  archiveTodoHandler?: () => void;
  createTodo?: (newTodo: TodoWithoutId) => void;
  toggleDone?: (id: string) => void;
  renameTodo?: (id: string) => void;
}

const TodoList = ({ todos, archiveTodoHandler, createTodo, toggleDone, renameTodo }: TodoListProps) => {
  const [todoInputValue, setTodoInputValue] = useState<string>("");

  const createTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodo = {
      name: todoInputValue,
      done: false,
    };
    if (createTodo) {
      setTodoInputValue("");
      return createTodo(newTodo);
    }
  };
  return (
    <div className="todo-list">
      <form onSubmit={createTodoHandler}>
        <a>Todo name</a>
        <input
          data-testid="new-todo-input"
          type="text"
          value={todoInputValue}
          onChange={(event) => setTodoInputValue(event.target.value)}
          name="name"
        />
        <button data-testid="new-todo-save" type="submit">
          Add new
        </button>
      </form>

      <button data-testid="todo-archive-all" onClick={archiveTodoHandler}>
        Archive Done Todos
      </button>
      <ul data-testid="todo-list-items">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            toggleDone={toggleDone ? () => toggleDone(todo.id) : undefined}
            renameTodo={renameTodo ? () => renameTodo(todo.id) : undefined}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
