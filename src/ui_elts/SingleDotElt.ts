import { Gfx } from "../Gfx";
import { BaseElt } from "./BaseElt";
import { Rect } from "../Rect";
import { Coord } from "../Coord";

class SingleDotElt extends BaseElt {
    coord: Coord;
    radius: number;

    constructor(
        gfx: Gfx,
        rect: Rect
    ) {
        super(gfx, rect);
        this.radius = 4;
        this.coord = {
            x: this.rect.x + Math.floor(this.rect.w / 2),
            y: this.rect.y + Math.floor(this.rect.h / 2)
        };
    }

    onDraw() {
        this.gfx.drawFilledCircle(
            this.coord,
            this.radius
        );
    }
}

export { SingleDotElt };
