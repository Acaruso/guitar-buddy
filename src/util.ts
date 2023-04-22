import { Rect } from "./Rect";

function isInsideRect(x: number, y: number, rect: Rect) {
    return (
        x >= rect.x
        && x < (rect.x + rect.w)
        && y >= rect.y
        && y < (rect.y + rect.h)
    );
}

export { isInsideRect };
