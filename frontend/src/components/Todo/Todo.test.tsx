import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import Todo from './Todo';


describe('Todo Component', () => {
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

test('Clicking checkbox calls handler once', async () => {
    const todo = {
        id: '1',
        name: 'Test Todo',
        done: false
    }
    const mockHandler = vi.fn();
    
    render(<Todo {...todo} toggleDone={mockHandler} />);
    
    const user = userEvent.setup();
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockHandler).toHaveBeenCalledTimes(1);
});
});