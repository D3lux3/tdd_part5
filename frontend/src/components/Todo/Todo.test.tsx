import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Todo from "./Todo";

describe("Todo Component", () => {
  test("Renders Todo Component", () => {
    const todo = {
      id: "1",
      name: "Test Todo",
      done: false,
    };

    render(<Todo {...todo} />);
    const element = screen.getByTestId(todo.id);
    expect(element).toHaveTextContent(todo.name);
  });

  test("Checkbox click changes done state", async () => {
    const todo = {
      id: "1",
      name: "Test Todo",
      done: false,
    };
    const mockHandler = vi.fn();

    render(<Todo {...todo} toggleDone={mockHandler} />);

    const user = userEvent.setup();
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  test('Todo can be renamed', async () => {
    const todo = {
        id: "1",
        name: "Test Todo",
        done: false,
      };

    const mockRenameHandler = vi.fn();
    render(<Todo {...todo} renameTodo={mockRenameHandler} />);

    const user = userEvent.setup();
    const todoName = screen.getByText(todo.name);
    await user.click(todoName);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    await user.clear(input);
    await user.type(input, 'New Todo Name');

    const saveButton = screen.getByText('Save');
    await user.click(saveButton);

    expect(mockRenameHandler).toHaveBeenCalledTimes(1);
  });
});
