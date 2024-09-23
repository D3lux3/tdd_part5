import { InferType } from 'yup';
import { todoSchema } from './validationSchemas/TodoValidationSchema';


export type Todo = InferType<typeof todoSchema>;
export type TodoWithoutId = Omit<Todo, 'id'>;