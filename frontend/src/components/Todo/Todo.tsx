

interface TodoProps {
    id: string,
    name: string,
    done: boolean,
};

const Todo = ({id, name, done}: TodoProps) => {


    return (
        <li>
            {name}
        </li>
    )
}



export default Todo;