export function $(query: string) {
    return document.querySelector(query);
}

//TAKA KONWENCJA Z TYM $

export function $click(HTMLel: HTMLElement, callback: () => void):void {
    HTMLel.addEventListener("click", callback)
}



// $click($("#cośtam"), ()=>{})

// $click("#cośtam", ()=>{})
