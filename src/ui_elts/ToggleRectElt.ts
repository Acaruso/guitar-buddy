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
            const r = (this.rect.w / 2);
            this.gfx.drawFilledCircle(
                {
                    x: this.rect.x + r,
                    y: this.rect.y + r
                },
                r
            )
        }

        this.gfx.strokeRectHeavy(this.rect);
    }

    onLeftMBDown(x: number, y: number) {
        this.toggled = !this.toggled;
        this.onClick(x, y);
    }
}

export { ToggleRectElt };
