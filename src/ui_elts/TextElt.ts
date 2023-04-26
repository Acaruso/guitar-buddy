import { Gfx } from "../Gfx";
import { BaseElt } from "./BaseElt";
import { Rect } from "../Rect";
import { constants } from "../constants";
import { textConstants } from "../textConstants";

class TextElt extends BaseElt {
    text: string;
    color: string;
    z: number;

    constructor(
        gfx: Gfx,
        rect: Rect,
        text: string,
        color: string = constants.black,
        z: number = 0
    ) {
        super(gfx, rect);
        this.text = text;
        this.color = color;
        this.z = z;
    }

    onDraw() {
        this.gfx.drawText(
            this.text,
            textConstants.charHeight,
            {
                x: this.rect.x,
                y: this.rect.y
            },
            this.color,
            this.z
        )
    }
}

export { TextElt };
