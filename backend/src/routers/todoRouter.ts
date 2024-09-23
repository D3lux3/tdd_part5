import express from 'express';
import { addNewTodo, getTodos } from '../services/todoService';

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
        console.log(req)
        const added = await addNewTodo(request);
        return res.status(200).send(added);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: JSON.stringify(error) });
    }
});


export default todoRouter;