import { InferType } from 'yup';
import { todoSchema } from './validationSchemas/TodoValidationSchema';


export type TodoType = InferType<typeof todoSchema>;
export type TodoWithoutId = Omit<TodoType, 'id'>;