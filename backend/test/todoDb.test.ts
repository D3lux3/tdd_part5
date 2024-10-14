import { Todo } from "../src/models";
import { addNewTodo, deleteAllTodos } from "../src/services/todoService";


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
});