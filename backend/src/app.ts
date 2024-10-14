import express from 'express';
import todoRouter from './routers/todoRouter';
import resetRouter from './routers/databaseResetRouter';

import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/todo', todoRouter)

if (process.env.NODE_ENV === 'test') {
    app.use('/reset', resetRouter);
}

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


export default app;