import { capitalizeFirstLetter } from "./CapitalizeFirstLetter";

export function createListLabel(inputDate: string) {
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const defaultListLabel = new Date(inputDate)
        .toLocaleDateString("pl-PL", dateOptions);
    const formattedListLabel = capitalizeFirstLetter(defaultListLabel);
    return formattedListLabel;
}