import { Rect } from "./Rect";

function isInsideRect(x: number, y: number, rect: Rect): boolean {
    return (
        x >= rect.x
        && x < (rect.x + rect.w)
        && y >= rect.y
        && y < (rect.y + rect.h)
    );
}

function addHandler(type: any, callback: any, options={}) {
    document.addEventListener(type, callback, options);
}

function addButtonOnClickHandler(id: string, callback: any) {
    let b = document.getElementById(id);
    if (b) {
        b.addEventListener("click", callback);
    }
}

// clamp val between low inclusive and high exclusive
function clamp(val: number, low: number, high: number): number {
    if (val < low) {
        return low;
    } else if (val >= high) {
        return high - 1;
    } else {
        return val;
    }
}

function inRange(val: number, low: number, high: number): boolean {
    if (val < low) {
        return false;
    } else if (val >= high) {
        return false;
    } else {
        return true;
    }
}

// get random integer between 0 inclusive and max exclusive
function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function getRandomBool(): boolean {
    return getRandomInt(2) == 0;
}

export { isInsideRect, addHandler, addButtonOnClickHandler, clamp, inRange, getRandomInt, getRandomBool };
