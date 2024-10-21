import { render, screen } from '@testing-library/react';
import Todo from './Todo';


test('Renders Todo Component', () => {
    const todo = {
        id: '1',
        name: 'Test Todo',
        done: false
    }

    render(<Todo todo={todo} />);
    const element = screen.getByText('Test Todo');
    expect(element).toBeDefined();
});