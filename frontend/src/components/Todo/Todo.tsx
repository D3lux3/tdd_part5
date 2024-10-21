import { useState } from "react";

interface TodoProps {
  id: string;
  name: string;
  done: boolean;
  toggleDone?: () => void;
  renameTodoHandler?: (newName: string) => void;
}

const Todo = ({ id, name, done, toggleDone, renameTodoHandler }: TodoProps) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  if (editing) {
    return (
      <li className="todo-item" data-testid={id}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            renameTodoHandler && renameTodoHandler(newName);
            setNewName("");
            setEditing(false);
          }}
        >
          <input
            onChange={(event) => setNewName(event.target.value)}
            name="name"
            data-testid={"rename-input"}
            type="text"
            defaultValue={name}
          />
          <button data-testid={"rename-save-btn"} type="submit">
            Save
          </button>
        </form>
      </li>
    );
  }
  return (
    <li className="todo-item" data-testid={id}>
      <p onClick={() => setEditing(true)}>{name}</p>
      <input type="checkbox" defaultChecked={done} name="done" onChange={() => toggleDone && toggleDone()} />
    </li>
  );
};

export default Todo;
