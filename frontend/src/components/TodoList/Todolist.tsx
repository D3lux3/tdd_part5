import { TodoType } from "../../types";
import Todo from "../Todo/Todo";

interface TodoListProps {
  todos: TodoType[];
  archiveTodoHandler?: () => void;
}

const TodoList = ({ todos, archiveTodoHandler }: TodoListProps) => {
  return (
    <>
      <button data-testid="todo-archive-all" onClick={archiveTodoHandler}>Archive Done Todos</button>
      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
