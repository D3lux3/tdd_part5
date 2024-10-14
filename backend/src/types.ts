import { InferType } from "yup";
import { todoSchemaWithId } from "./utils/todoValidator";


export interface Todo extends InferType<typeof todoSchemaWithId> {
    id: string;
}


export type TodoWithoutId = InferType<typeof todoSchemaWithId>;