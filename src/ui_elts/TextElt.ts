import { Gfx } from "../Gfx";
import { BaseElt } from "./BaseElt";
import { Rect } from "../Rect";
import { constants } from "../constants";
import { textConstants } from "../textConstants";

class TextElt extends BaseElt {
    text: string;
    color: string;
    size: number;
    z: number;

    constructor(
        gfx: Gfx,
        rect: Rect,
        text: string,
        size: number = textConstants.charHeight,
        color: string = constants.black,
        z: number = 0
    ) {
        super(gfx, rect);
        this.text = text;
        this.size = size;
        this.color = color;
        this.z = z;
    }

    setText(text: string) {
        this.text = text;
    }

    setRect(rect: Rect) {
        this.rect = rect;
    }

    onDraw() {
        this.gfx.drawText(
            this.text,
            this.size,
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
