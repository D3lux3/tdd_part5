import supertest from 'supertest';
import app from '../src/app';
import { Todo } from '../src/models';
import { v4 as uuidv4 } from 'uuid';


const api = supertest(app);


describe('Todo api', () => {

   beforeAll(async () => {
        await Todo.sync({ force: true });
   });

   beforeEach(async () => {
        await Todo.destroy({ where: {} });
        const initialTodos = [
            { id: uuidv4(), name: 'First todo', done: false },
            { id: uuidv4(), name: 'Second todo', done: true }
        ]
        await Todo.bulkCreate(initialTodos);
    });

    test('Database can be reset', async () => {
        await api.post('/reset').expect(200);
    });
    
    test('Todos are returned as json', async () => {
        await api
            .get('/todo')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('All todos are returned', async () => {
        const response = await api.get('/todo');
        const returnedTodos = response.body as any[]; 
        expect(returnedTodos).toHaveLength(2);
        returnedTodos.forEach(todo => {
            expect(todo).toHaveProperty('name');
            expect(todo).toHaveProperty('done');
        });
        const names = returnedTodos.map(todo => todo.name);
        expect(names).toContain('First todo');
    });

    test('New Todo can be added', async () => {
        const newTodo = { name: 'Test todo', done: false };
        const response = await api.post('/todo').send(newTodo);
        const returnedTodo = response.body;
        expect(returnedTodo.name).toBe(newTodo.name);
        expect(returnedTodo.done).toBe(newTodo.done);
    });

    test('Invalid todo is not added', async () => {
        const invalidTodo = { done: false };
        await api.post('/todo').send(invalidTodo).expect(500);
    });
});

