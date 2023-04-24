import { Gfx } from "../Gfx";
import { BaseElt } from "./BaseElt";
import { Rect } from "../Rect";
import { constants } from "../constants";
import { textConstants } from "../textConstants";

type OnClick = (x: number, y: number) => void;

class TextElt extends BaseElt{
    public onClick: OnClick;
    text: string;
    color: string;
    z: number;

    constructor(
        gfx: Gfx,
        rect: Rect,
        text: string,
        color: string = constants.black,
        onClick: OnClick = (x: number, y: number) => {},
        z: number = 0
    ) {
        super(gfx, rect);
        this.text = text;
        this.color = color;
        this.onClick = onClick;
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

    onLeftMBDown(x: number, y: number) {
        this.onClick(x, y);
    }
}

export { TextElt };
