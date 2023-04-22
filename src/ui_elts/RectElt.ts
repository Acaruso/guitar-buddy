import { BaseElt } from "./BaseElt";
import { Gfx } from "../Gfx";
import { Rect } from "../Rect";

class RectElt extends BaseElt{
    constructor(gfx: Gfx, rect: Rect) {
        super(gfx, rect);
    }

    onDraw() {
        this.gfx.strokeRectHeavy(this.rect);
    }

    onLeftMBDown(x: number, y: number) {
        console.log("clicked rect");
        console.log(this.rect);
    }
}

export { RectElt };
