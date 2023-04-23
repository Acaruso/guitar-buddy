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
    outlineVisible: boolean;

    constructor(
        gfx: Gfx,
        rect: Rect,
        onClick: OnClick = (x: number, y: number) => {},
        outlineVisible: boolean = true
    ) {
        super(gfx, rect);
        this.onClick = onClick;
        this.outlineVisible = outlineVisible;
    }

    onDraw() {
        if (this.toggled) {
            this.gfx.drawFilledCircle(
                {
                    x: this.rect.x + (this.rect.w / 2),
                    y: this.rect.y + (this.rect.h / 2)
                },
                (this.rect.h / 2) - 2
            )
        }

        if (this.outlineVisible) {
            this.gfx.strokeRectHeavy(this.rect);
        }
    }

    onLeftMBDown(x: number, y: number) {
        this.toggled = !this.toggled;
        this.onClick(x, y);
    }
}

export { ToggleRectElt };
