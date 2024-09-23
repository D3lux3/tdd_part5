import { Todo } from "../models";
import { todoSchema } from "../utils/todoValidator";
import { v4 as uuidv4 } from 'uuid';

export const getTodos = async () => {
    const todos = await Todo.findAll();
    return todos;
};

export const addNewTodo = async (requestBody: Request) => {
    // try catch
    const validated = await todoSchema.validate(requestBody);
    const newTodo = await Todo.create({id: uuidv4() , ...validated});
    return newTodo;
};


export const deleteAllTodos = async () => {
    await Todo.destroy({where: {}});
};