export function $(query: string) {
    return document.querySelector(query);
}

export function $All(query: string) {
    return document.querySelectorAll(query);
}

//TAKA KONWENCJA Z TYM $

export function $click(HTMLel: HTMLElement, callback: () => void):void {
    HTMLel.addEventListener("click", callback)
}



// $click($("#cośtam"), ()=>{})

// $click("#cośtam", ()=>{})
