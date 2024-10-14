import { connectToDatabase } from './utils/database';
import app from './app';

const port = process.env.PORT || 1337;

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
