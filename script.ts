import { $, $click } from "./EventListenersShortcuts";

const $dateInput = $("#date-input") as HTMLInputElement; // TODO: typy generyczne
const $addListButton = $("#add-list-button") as HTMLButtonElement;

const currentLists = []

class TodoList {
    constructor(
        public label: string,
        public todos: string[]=[]
    ) { }
}

//stworzyć tablicę z wszystkimi listami
//stworzyć menu z przyciskami dla każdej etykiety

$click($addListButton, createNewTodoList);

function createNewTodoList() {
    const newListLabel = createListLabel($dateInput.value);
    const newList = new TodoList(newListLabel);
    console.log(newList);
}

function createListLabel(inputDate: string) {
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const defaultListLabel = new Date(inputDate)
    .toLocaleDateString("pl-PL", dateOptions);
    const formattedListLabel = capitalizeFirstLetter(defaultListLabel);
    return formattedListLabel;
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
