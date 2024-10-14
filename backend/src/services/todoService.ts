import { Todo } from "../models";
import { todoSchema, todoSchemaWithId } from "../utils/todoValidator";
import { v4 as uuidv4 } from 'uuid';

export const getTodos = async () => {
    const todos = await Todo.findAll();
    return todos;
};

export const updateTodo = async (id: string, todo: unknown) => {
    const validated = await todoSchemaWithId.validate(todo);
    const [affectedRows, [updatedTodo]] = await Todo.update(validated, {where: {id}, returning: true });

    if (affectedRows === 0) {
        throw new Error('Todo not found');
    }

    return updatedTodo.get({plain: true});
};

export const addNewTodo = async (requestBody: Request | unknown) => {
    // try catch
    const validated = await todoSchema.validate(requestBody);
    const newTodo = await Todo.create({id: uuidv4() , ...validated});
    return newTodo.get({plain: true});
};


export const deleteAllTodos = async () => {
    await Todo.destroy({where: {}});
};

export const archiveCompletedTodos = async () => {
    await Todo.destroy({where: {done: true}});
};