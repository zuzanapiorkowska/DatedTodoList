import { capitalizeFirstLetter } from "./creatingListLabels/CapitalizeFirstLetter";
import { $, $all, $click, $rightclick, $dblclick } from "./EventListenersShortcuts";
import { showTodaysDate } from "./creatingListLabels/ShowTodaysDate";
import { createListLabel } from "./creatingListLabels/CreateListLabel";

const $dateInput = $("#date-input") as HTMLInputElement; // TODO: typy generyczne
const $addListButton = $("#add-list-button") as HTMLButtonElement;
const $listMenu = $("#current-lists-container") as HTMLDivElement;
const $infoBox = $("#info") as HTMLElement;
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

$click($infoBox, () => {
    $infoBox.classList.toggle("hidden"); // TODO: extension method
})

$click($addListButton, () => {
    createNewList();
    $listMenu.innerHTML = "";
    displayCurrentListsTitles(allLists);
    updateLocalStorage();
})

function createNewList() 
{
    const newListLabel = createListLabel($dateInput.value);
    const newList = new TodoList(newListLabel);
    const found = allLists.find(element =>
        element.label===newListLabel)
    if(found!==undefined){
        showAlert();
    } else {
        allLists.push(newList);
    }
    console.log("pusz do currentLists", allLists);
}

function displayCurrentListsTitles(lists: TodoList[]) {
    lists.forEach((list) => {
        const listLabelDiv: HTMLDivElement = document.createElement("div");
        listLabelDiv.classList.add("list-label-box");
        const listLabel: HTMLButtonElement = document.createElement("button");
        listLabelDiv.appendChild(listLabel)
        listLabel.textContent = list.label;
        listLabel.classList.add("list-label");
        $listMenu.appendChild(listLabelDiv);
        showRemoveListButton(listLabelDiv, listLabelDiv, list);
        $click(listLabel, () => {
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
    todoInput.type = "text";
    todoInput.placeholder = "My next todo is..."
    todoInput.classList.add("todo-input");
    destination.appendChild(todoInput);
}

function showRemoveListButton(destination: HTMLDivElement, listToRemove: HTMLDivElement, list: TodoList) {
    const removeButton = document.createElement("button") as HTMLButtonElement;
    removeButton.textContent = "x"
    removeButton.classList.add("remove-list-button")
    destination.appendChild(removeButton);
    $click(removeButton, () => {
        $listMenu.removeChild(listToRemove);
        allLists = allLists.filter((todoList) => {
            return todoList.label !== list.label;
        });
        $todoListContainer.innerHTML = "";
        $createTodoContainer.innerHTML = "";
        updateLocalStorage();
    })
    if (!allLists.length) {
        $listMenu.innerHTML = "";
    }
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
    if (todo.completed === true) {
        newTodo.classList.add("crossed");
        }
    destination.appendChild(newTodo);
    $dblclick(newTodo, () => removeTodo(newTodo, list))
    $click(newTodo, ()=> {
        crossTodo(newTodo, todo)
        updateLocalStorage();
    })
    newTodo.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        uncrossTodo(newTodo, todo)
        updateLocalStorage();
    });
}

function removeTodo(todo: HTMLLIElement, list: TodoList): void {
    let editedTodos = list.todos.filter((todoEl) => {
        return todoEl.text !== todo.textContent;
    })
    list.todos = editedTodos;
    $todoListContainer.removeChild(todo);
}

function crossTodo(todoEl: HTMLLIElement, todo: Todo): void {
    todoEl.classList.add("crossed");
    todo.completed = true;
}

function uncrossTodo(todoEl: HTMLLIElement, todo: Todo): void {
    todoEl.classList.remove("crossed");
    todo.completed = false;
}

function updateLocalStorage(): void {
    localStorage.setItem("todoLists", JSON.stringify(allLists));
}

function showAlert(): void {
    $addListButton.classList.toggle("red-border");
    setTimeout(()=>{
        $addListButton.classList.toggle("red-border");
    }, 200);
}