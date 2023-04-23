import { Gfx } from "../Gfx";
import { BaseElt } from "./BaseElt";
import { Rect } from "../Rect";

type OnClick = (x: number, y: number) => void;

class RectElt extends BaseElt{
    public onClick: OnClick;

    constructor(
        gfx: Gfx,
        rect: Rect,
        onClick: OnClick = (x: number, y: number) => {}
    ) {
        super(gfx, rect);
        this.onClick = onClick;
    }

    onDraw() {
        this.gfx.strokeRectHeavy(this.rect);
    }

    onLeftMBDown(x: number, y: number) {
        this.onClick(x, y);
    }
}

export { RectElt };
