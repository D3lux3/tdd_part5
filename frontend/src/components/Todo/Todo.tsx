import { useState } from "react";

interface TodoProps {
  id: string;
  name: string;
  done: boolean;
  toggleDone?: () => void;
  renameTodo?: () => void;
}

const Todo = ({ id, name, done, toggleDone, renameTodo }: TodoProps) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <li data-testid={id}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            renameTodo && renameTodo();
            setEditing(false);
          }}
        >
          <input type="text" defaultValue={name} />
          <button type="submit">Save</button>
        </form>
      </li>
    );
  }
  return (
    <li data-testid={id}>
      <p onClick={() => setEditing(true)}>{name}</p>
      <input type="checkbox" defaultChecked={done} name="done" onChange={() => toggleDone && toggleDone()} />
    </li>
  );
};

export default Todo;
