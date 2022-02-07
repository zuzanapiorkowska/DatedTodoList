import { Todo } from "../script";

export function showTodoList(todo: Todo, destination: HTMLDivElement) {
    const currentTodo = document.createElement("div");
    currentTodo.classList.add("todo");
    currentTodo.textContent = todo.text;
    destination.appendChild(currentTodo);
}