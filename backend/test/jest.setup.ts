import { connectToDatabase } from "../src/utils/database";

export const setup = async () => {
    await connectToDatabase();
}