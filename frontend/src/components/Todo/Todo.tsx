

interface TodoProps {
    id: string,
    name: string,
    done: boolean,
};

const Todo = ({id, name, done}: TodoProps) => {


    return (
        <li data-testid={id}>
            {name}
        </li>
    )
}



export default Todo;