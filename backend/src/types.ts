import { InferType } from "yup";
import { todoSchema } from "./utils/todoValidator";


export interface Todo extends InferType<typeof todoSchema> {
    id: string;
}


export type TodoWithoutId = InferType<typeof todoSchema>;