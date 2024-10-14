import { Todo } from "../src/models";
import { addNewTodo, deleteAllTodos, getTodos } from "../src/services/todoService";


describe('Todo database', () => {

    beforeAll(async () => {
        await Todo.sync({ force: true });
   });

   beforeEach(async () => {
        await Todo.destroy({ where: {} });
    });

    
    test('Database can be reset', async () => {
        await deleteAllTodos();
        expect(await Todo.findAll()).toHaveLength(0);
    });

    test('New Todo can be added', async () => {
        const newTodo = { name: 'Test todo', done: false };
        const addedTodo = await addNewTodo(newTodo);
        expect(addedTodo.name).toBe(newTodo.name);
        expect(addedTodo.done).toBe(newTodo.done);
    });

    test('Invalid todo is not added', async () => {
        const invalidTodo = { done: false };
        await expect(addNewTodo(invalidTodo)).rejects.toThrow();
    });

    test('All todos are returned', async () => {
        const newTodo = { name: 'Test todo', done: false };
        const addedTodo = await addNewTodo(newTodo);
        const todos = await getTodos();
        expect(todos).toHaveLength(1);
        expect(todos[0].name).toBe(addedTodo.name);
        expect(todos[0].done).toBe(addedTodo.done);
        expect(todos[0].id).toBe(addedTodo.id);
    });
});