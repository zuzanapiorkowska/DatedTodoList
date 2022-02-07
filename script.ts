import { capitalizeFirstLetter } from "./CapitalizeFirstLetter";
import { $, $All, $click } from "./EventListenersShortcuts";
import { showTodaysDate } from "./ShowTodaysDate";

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

class Todo {
    constructor(
        public text: string,
        public completed: boolean
    ) {}
}

//dodać inputa po kliknięciu dnia
//dodać todosy też po kliknięciu dnia
//zrobić "createNewTodo" w danej liście
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
        // currentList.todos.push(new Todo("ok", true));
        $listMenu.appendChild(ListButton);
        $click(ListButton, () => {
            currentList.todos.forEach((todo: Todo) => {
                const currentTodo = document.createElement("div");
                currentTodo.classList.add("todo");
                currentTodo.textContent=todo.text;
                $todoListContainer.innerHTML="";
                $todoListContainer.appendChild(currentTodo);
            });
        })
        
    });
}

// function showTodoList(todos) {

// }