import { number } from "prop-types";

export function showTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${padLeft(month, 2)}-${padLeft(day, 2)}`;
}

export function padLeft(value: number, width: number): string {
    let valueAsString = value.toString()
    const numberOfZerosToPad = width - valueAsString.length
    for (let i = 0; i < numberOfZerosToPad; i++) {
        if (valueAsString.length < width) {
            valueAsString = "0" + valueAsString;
        }
    }
    return valueAsString;
}