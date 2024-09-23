import { object, string, boolean } from 'yup';


export const todoSchema = object().shape({
    id: string().required(),
    name: string().required(),
    done: boolean().default(false)
}).required();


export const todoSchemaWithoutId = object().shape({
    name: string().required(),
    done: boolean().default(false).required()
}).required();