import { capitalizeFirstLetter } from "./CapitalizeFirstLetter";
import { $, $All, $click } from "./EventListenersShortcuts";
import { showTodaysDate } from "./ShowTodaysDate";
import { showTodoInput } from "./creating_list_containers/showTodoInput";
import { showTodoList } from "./creating_list_containers/showTodoList";

const $dateInput = $("#date-input") as HTMLInputElement; // TODO: typy generyczne
const $addListButton = $("#add-list-button") as HTMLButtonElement;
const $listMenu = $("#current-lists-container") as HTMLDivElement;
const $infoIcon = $("#info-icon") as HTMLElement;
const $infoText = $("#info-text") as HTMLElement;
const $todoListContainer = $("#todo-list-container") as HTMLDivElement;

$dateInput.defaultValue = showTodaysDate();

const currentLists: TodoList[] = [];

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

//dodać todosy też po kliknięciu dnia
//zrobić "addTodo" w danej liście
//zrobić zapisywanie Todosów w danej TodoLiście
//zrobić remove todosów
//zrobić done todosów
//zapisywanie w localStorage
//zrobić remove danego dnia

$click($infoIcon, () => {
    $infoText.classList.toggle("hidden"); // TODO: extension method
})

$click($addListButton, () => {
    createNewList();
    $listMenu.innerHTML = "";
    displayCurrentLists(currentLists);
})

function createNewList() {
    const newListLabel = createListLabel($dateInput.value);
    const newList = new TodoList(newListLabel);
    currentLists.push(newList);
}

function createListLabel(inputDate: string) {
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const defaultListLabel = new Date(inputDate)
        .toLocaleDateString("pl-PL", dateOptions);
    const formattedListLabel = capitalizeFirstLetter(defaultListLabel);
    return formattedListLabel;
}

function displayCurrentLists(lists: TodoList[]) {
    lists.forEach((list: TodoList): void => {
        const ListButton: HTMLButtonElement = document.createElement("button");
        const currentList = list;
        ListButton.classList.add("list-button");
        ListButton.textContent = list.label;
        currentList.todos.push(new Todo("ok", true));
        $listMenu.appendChild(ListButton);
        $click(ListButton, () => {
            currentList.todos.forEach((todo: Todo) => {
                $todoListContainer.innerHTML="";
                showTodoInput($todoListContainer);
                showAddButton(currentList);
                showTodoList(todo, $todoListContainer)
            });
        })
    });
}

function showAddButton(list: TodoList) {
    const addButton = document.createElement("button");
    addButton.classList.add("add-todo-button");
    addButton.textContent="+";
    $todoListContainer.appendChild(addButton);
    const todoInput = $(".todo-input") as HTMLInputElement
    // $click(addButton, () => addTodo(todoInput, list));
}

// function addTodo(input: HTMLInputElement, list: TodoList) {
// const todoText=input.value;
// list.todos.push(new Todo(todoText, false));
// }