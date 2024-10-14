import { Todo } from "../src/models";
import { addNewTodo, archiveCompletedTodos, deleteAllTodos, getTodos, updateTodo } from "../src/services/todoService";


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

    test('Todo can be renamed', async () => {
        const newTodo = { name: 'Test todo', done: false };
        const addedTodo = await addNewTodo(newTodo);

        const renamedTodo = { ...addedTodo, name: 'Updated todo' };
        const updatedTodo = await updateTodo(addedTodo.id, renamedTodo);
        expect(updatedTodo.name).toBe(renamedTodo.name);
        const allTodos = await getTodos();
        expect(allTodos).toHaveLength(1);
        expect(allTodos[0].name).toBe(renamedTodo.name);
    });

    test('Non existing todo cannot be updated', async () => {
        const newTodo = { id: 'this id does not exists', name: 'Test todo', done: false };
        expect(updateTodo(newTodo.id, newTodo)).rejects.toThrow();
    });

    test('Todo can be marked as done', async () => {
        const newTodo = { name: 'Test todo', done: false };
        const addedTodo = await addNewTodo(newTodo);

        const updatedTodo = await updateTodo(addedTodo.id, { ...addedTodo, done: true });
        expect(updatedTodo.done).toBe(true);
        const allTodos = await getTodos();
        expect(allTodos).toHaveLength(1);
        expect(allTodos[0].name).toBe(updatedTodo.name);
    });

    test('All completed todos can be archived', async () => {
        await addNewTodo({ name: 'first todo', done: true });
        await addNewTodo({ name: 'second todo', done: true });
        const thirdTodo = await addNewTodo({ name: 'third todo', done: false });

        expect(await getTodos()).toHaveLength(3);
        await archiveCompletedTodos();
        expect(await getTodos()).toHaveLength(1);
        const allTodos = await getTodos();
        expect(allTodos[0].get({plain: true})).toEqual(thirdTodo);
    });
});