import express from 'express';
import { addNewTodo, archiveCompletedTodos, getTodos, updateTodo } from '../services/todoService';

const todoRouter = express.Router();


todoRouter.get('/', async (req, res) => {
    try {
        const todos = await getTodos();
        return res.status(200).send(todos);
    } catch (error) {
        return res.status(500).send({ error: JSON.stringify(error) });
    }
});

todoRouter.post('/', async (req, res) => {
    try {
        const request = req.body;
        const added = await addNewTodo(request);
        return res.status(200).send(added);
    } catch (error) {
        return res.status(500).send({ error: JSON.stringify(error) });
    }
});

todoRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const todo = req.body;
        const updated = await updateTodo(id, todo);
        return res.status(200).send(updated);
    } catch (error) {
        return res.status(500).send({ error: JSON.stringify(error) });
    }
});

todoRouter.delete('/archive', async (req, res) => {
    try {
        await archiveCompletedTodos();
        return res.status(200).send();
    } catch (error) {
        return res.status(500).send({ error: JSON.stringify(error) });
    }
});

export default todoRouter;