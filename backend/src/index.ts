import express from 'express';
import { connectToDatabase } from './utils/database';
import todoRouter from './routers/todoRouter';
import resetRouter from './routers/databaseResetRouter';

import cors from 'cors';

const app = express();
const port = 1337;

app.use(express.json());
app.use(cors());
app.use('/todo', todoRouter)

if (process.env.NODE_ENV === 'test') {
    app.use('/reset', resetRouter);
}

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


const start = async () => {
    try {
        void await connectToDatabase();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

(async () => {
    await start();
})();
