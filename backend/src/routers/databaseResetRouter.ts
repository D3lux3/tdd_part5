import express from 'express';
import { deleteAllTodos } from '../services/todoService';

const resetRouter = express.Router();


resetRouter.post('/', async (req, res) => {
    try {
        await deleteAllTodos();
        return res.status(200).send({ message: 'Database reset' });
    } catch (error) {
        return res.status(500).send({ error: JSON.stringify(error) });
    }
});


export default resetRouter;