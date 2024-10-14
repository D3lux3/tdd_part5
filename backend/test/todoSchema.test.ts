import { todoSchema } from "../src/utils/todoValidator";

describe('todoSchema', () => {

    test('fails validation when name is missing ', () => {
        const todo = { done: false };
        expect(() => todoSchema.validateSync(todo)).toThrow();
    });

    test('sucessfully validates valid objects ', () => {
        const todo = { name: "hello world!", done: false };
        expect(() => todoSchema.validateSync(todo)).not.toThrow();
    });


});

