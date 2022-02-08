import { capitalizeFirstLetter } from "./creatingListLabels/CapitalizeFirstLetter";
import { $, $all, $click, $rightclick, $dblclick } from "./EventListenersShortcuts";
import { showTodaysDate } from "./creatingListLabels/ShowTodaysDate";
import { createListLabel } from "./creatingListLabels/CreateListLabel";

const $dateInput = $("#date-input") as HTMLInputElement; // TODO: typy generyczne
const $addListButton = $("#add-list-button") as HTMLButtonElement;
const $listMenu = $("#current-lists-container") as HTMLDivElement;
const $infoIcon = $("#info-icon") as HTMLElement;
const $infoText = $("#info-text") as HTMLElement;
const $createTodoContainer = $("#create-todo-container") as HTMLDivElement;
const $todoListContainer = $("#todos-ul") as HTMLUListElement;

$dateInput.defaultValue = showTodaysDate();

let allLists: TodoList[];
if (localStorage.getItem("todoLists") !== null) {
    const todoLists: string = localStorage.getItem("todoLists") as string;
    allLists = JSON.parse(todoLists);
} else {
    allLists = [];
}

displayCurrentListsTitles(allLists);

class TodoList {
    constructor(
        public label: string,
        public todos: Todo[] = []
    ) { }
}

export class Todo {
    constructor(
        public text: string,
        public completed: boolean
    ) { }
}

//zrobić "kopiuj tekst"
//przenoszenie na inny dzień?

$click($infoIcon, () => {
    $infoText.classList.toggle("hidden"); // TODO: extension method
})

$click($addListButton, () => {
    createNewList();
    $listMenu.innerHTML = "";
    displayCurrentListsTitles(allLists);
    updateLocalStorage();
})

function createNewList() {
    const newListLabel = createListLabel($dateInput.value);
    const newList = new TodoList(newListLabel);
    allLists.push(newList);
    console.log("pusz do currentLists", allLists);
}

function displayCurrentListsTitles(lists: TodoList[]) {
    lists.forEach((list)=> {
        const listButton: HTMLDivElement = document.createElement("div");
        listButton.classList.add("list-button");
        listButton.textContent = list.label;
        $listMenu.appendChild(listButton);
        showRemoveListButton(listButton, listButton, list);
        $click(listButton, () => {
            $todoListContainer.innerHTML = "";
            $createTodoContainer.innerHTML = "";
            showTodoInput($createTodoContainer);
            showAddButton(list);
            list.todos.forEach((todo: Todo) => {
                showTodo(todo, $todoListContainer, list)
            });
        })
    });
}

function showAddButton(list: TodoList) {
    const addButton = document.createElement("button");
    addButton.classList.add("add-todo-button");
    addButton.textContent = "+";
    $createTodoContainer.appendChild(addButton);
    const todoInput = $(".todo-input") as HTMLInputElement;
    $click(addButton, () => {
        addTodoToList(todoInput, list)
        todoInput.value = "";
        $createTodoContainer.innerHTML = ""
        $todoListContainer.innerHTML = "";
        showTodoInput($createTodoContainer);
        showAddButton(list);
        list.todos.forEach((todo: Todo) => {
            showTodo(todo, $todoListContainer, list)
        });
    });
}

function showTodoInput(destination: HTMLDivElement): void {
    const todoInput = document.createElement("input");
    todoInput.type="text";
    todoInput.placeholder="My next todo is..."
    todoInput.classList.add("todo-input");
    destination.appendChild(todoInput);
}

function showRemoveListButton(destination: HTMLDivElement, listToRemove: HTMLDivElement, list: TodoList){
    const removeButton = document.createElement("button");
    removeButton.textContent="x"
    destination.appendChild(removeButton);
    $dblclick(removeButton, ()=>{
        $listMenu.removeChild(listToRemove);
        allLists = allLists.filter((todoList)=>{
            return todoList.label!==list.label;
        });
        console.log("usunięte", allLists);
        updateLocalStorage();
    })
}

function addTodoToList(input: HTMLInputElement, list: TodoList) {
    const todoText = input.value;
    if (todoText !== "") {
        list.todos.push(new Todo(todoText, false));
    }
    updateLocalStorage();
}

function showTodo(todo: Todo, destination: HTMLUListElement, list: TodoList) {
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo");
    newTodo.textContent = todo.text;
    destination.appendChild(newTodo);
    $dblclick(newTodo, () => removeTodo(newTodo, list))
    newTodo.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        crossTodo(newTodo)
    });
}

function removeTodo(todo: HTMLLIElement, list: TodoList): void {
    let editedTodos = list.todos.filter((todoEl) => {
        return todoEl.text !== todo.textContent;
    })
    list.todos = editedTodos;
    $todoListContainer.removeChild(todo);
}

function crossTodo(todo: HTMLLIElement): void {
    todo.classList.add("crossed");
}

function updateLocalStorage():void{
localStorage.setItem("todoLists", JSON.stringify(allLists));
}