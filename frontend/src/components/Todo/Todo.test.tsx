import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from './Todo';


test('Renders Todo Component', () => {
    const todo = {
        id: '1',
        name: 'Test Todo',
        done: false
    }

    render(<Todo {...todo} />);
    const element = screen.getByTestId(todo.id);
    expect(element).toHaveTextContent(todo.name);
});