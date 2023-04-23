import { BaseElt } from "./BaseElt";
import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { constants } from "../constants";

type OnClick = (x: number, y: number) => void;

class ToggleRectElt extends BaseElt{
    public onClick: OnClick;
    toggled: boolean = false;
    passiveColor: string = constants.white;
    activeColor: string = constants.darkBlue;

    constructor(
        gfx: Gfx,
        rect: Rect,
        onClick: OnClick = (x: number, y: number) => {}
    ) {
        super(gfx, rect);
        this.onClick = onClick;
    }

    onDraw() {
        if (this.toggled) {
            let coloredRect = { ...this.rect };
            coloredRect.color = this.activeColor;
            this.gfx.drawRect(coloredRect, -1);
        }

        this.gfx.strokeRectHeavy(this.rect);
    }

    onLeftMBDown(x: number, y: number) {
        this.toggled = !this.toggled;
        this.onClick(x, y);
    }
}

export { ToggleRectElt };
