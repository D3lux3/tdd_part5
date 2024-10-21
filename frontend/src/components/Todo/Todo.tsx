

interface TodoProps {
    id: string,
    name: string,
    done: boolean,
    toggleDone?: () => void
};

const Todo = ({id, name, done, toggleDone}: TodoProps) => {


    return (
        <li data-testid={id}>
            {name}
            <input type="checkbox" defaultChecked={done} value="done" onChange={() => toggleDone && toggleDone()}/>
        </li>
    )
}



export default Todo;