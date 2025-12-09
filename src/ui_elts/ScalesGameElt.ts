import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { Note } from "../Note";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomBool, getRandomInt, modAddition } from "../util";

class ScalesGameElt extends BaseElt {
    textElt: TextElt;

    textSize: number = 82;

    constructor(gfx: Gfx, rect: Rect) {
        super(gfx, rect);

        let nextY = this.rect.y;
        this.textElt = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            `test`,
            this.textSize
        );
        this.pushChild(this.textElt);
    }
}

export { ScalesGameElt };
