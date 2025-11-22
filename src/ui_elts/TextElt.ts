import { Gfx } from "../Gfx";
import { BaseElt } from "./BaseElt";
import { Rect } from "../Rect";
import { constants } from "../constants";
import { textConstants } from "../textConstants";

type OnClick = (x: number, y: number) => void;

class TextElt extends BaseElt {
    text: string;
    color: string;
    size: number;
    z: number;
    public onClick: OnClick;
    public drawRect: boolean;

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
        this.onClick = () => {};
        this.drawRect = false;
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
        );
        if (this.drawRect) {
            this.gfx.strokeRectHeavy(this.rect);
        }
    }

    onLeftMBDown(x: number, y: number) {
        this.onClick(x, y);
    }
}

export { TextElt };
