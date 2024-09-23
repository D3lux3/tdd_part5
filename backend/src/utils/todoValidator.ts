import {string, object, boolean} from 'yup';


export const todoSchema = object({
    name: string().required(),
    done: boolean().default(false),
});