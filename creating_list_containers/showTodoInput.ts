export function showTodoInput(destination: HTMLDivElement): void {
    const todoInput = document.createElement("input");
    todoInput.type="text";
    todoInput.placeholder="My next todo is..."
    todoInput.classList.add("todo-input");
    destination.appendChild(todoInput);
}