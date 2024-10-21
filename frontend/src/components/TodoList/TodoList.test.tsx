import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TodoList from "./Todolist";

describe("Todo List Component", () => {
  test("Renders Todo List Component", () => {
    const intitialTodos = [
      { id: "1", name: "Test Todo 1", done: false },
      { id: "2", name: "Test Todo 2", done: true },
      { id: "3", name: "Test Todo 3", done: false },
    ];

    render(<TodoList todos={intitialTodos} />);
    const todoListElement = screen.getByTestId("todo-list");
    expect(todoListElement).toBeInTheDocument();
    expect(todoListElement.children).toHaveLength(intitialTodos.length);
  });

  test("Clicking archive all button calls handler once", async () => {
    const intitialTodos = [
        { id: "1", name: "Test Todo 1", done: false },
        { id: "2", name: "Test Todo 2", done: true },
        { id: "3", name: "Test Todo 3", done: false },
      ];
    const mockArchiveHandler = vi.fn();
    render(<TodoList todos={intitialTodos} archiveTodoHandler={mockArchiveHandler} />);
    const user = userEvent.setup();
    
    const archiveDoneTodosButton = screen.getByTestId('todo-archive-all');
    await user.click(archiveDoneTodosButton);
    expect(mockArchiveHandler).toHaveBeenCalledTimes(1);
  });
});
