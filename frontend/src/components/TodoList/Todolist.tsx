import { TodoType } from "../../types";
import Todo from "../Todo/Todo";

interface TodoListProps {
  todos: TodoType[];
}

const TodoList = ({ todos }: TodoListProps) => {


    return (
        <ul data-testid="todo-list">
            {todos.map((todo) => (
                <Todo key={todo.id} {...todo} />
            ))}
        </ul>
    )
};


export default TodoList;
