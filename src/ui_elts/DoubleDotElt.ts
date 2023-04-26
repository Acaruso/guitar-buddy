import { Gfx } from "../Gfx";
import { BaseElt } from "./BaseElt";
import { Rect } from "../Rect";
import { Coord } from "../Coord";

class DoubleDotElt extends BaseElt {
    coord1: Coord;
    coord2: Coord;
    radius: number;

    constructor(
        gfx: Gfx,
        rect: Rect
    ) {
        super(gfx, rect);
        this.radius = 4;

        const third = Math.floor(this.rect.w / 3);

        this.coord1 = {
            x: this.rect.x + third,
            y: this.rect.y + Math.floor(this.rect.h / 2)
        };

        this.coord2 = {
            x: this.rect.x + (2 * third),
            y: this.rect.y + Math.floor(this.rect.h / 2)
        };
    }

    onDraw() {
        this.gfx.drawFilledCircle(
            this.coord1,
            this.radius
        );

        this.gfx.drawFilledCircle(
            this.coord2,
            this.radius
        );
    }
}

export { DoubleDotElt };
