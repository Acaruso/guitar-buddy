import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";

class IntervalsGame2Elt extends BaseElt {
    textSize: number = 82;
    line1: TextElt;

    constructor(
        gfx: Gfx,
        rect: Rect
    ) {
        super(gfx, rect);

        this.line1 = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: this.rect.y,
                w: this.rect.w,
                h: this.rect.h
            },
            "interval game 2",
            this.textSize
        );

        this.pushChild(this.line1);
    }
}

export { IntervalsGame2Elt };
