export function $(query: string) {
    return document.querySelector(query);
}

export function $all(query: string) {
    return document.querySelectorAll(query);
}

//TAKA KONWENCJA Z TYM $

export function $click(HTMLel: HTMLElement, callback: () => void):void {
    HTMLel.addEventListener("click", callback)
}

export function $dblclick(HTMLel: Element, callback: () => void):void {
    HTMLel.addEventListener("dblclick", callback)
}

export function $rightclick(HTMLel: Element, callback: () => void):void {
    HTMLel.addEventListener("contextmenu", callback)
    
}

// $click($("#cośtam"), ()=>{})

// $click("#cośtam", ()=>{})
