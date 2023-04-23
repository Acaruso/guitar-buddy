import { Gfx } from "../Gfx";
import { BaseElt } from "./BaseElt";
import { Coord } from "../Coord";

class LineElt extends BaseElt{
    beginCoord: Coord;
    endCoord: Coord;

    constructor(
        gfx: Gfx,
        beginCoord: Coord,
        endCoord: Coord
    ) {
        super(gfx, { x: 0, y: 0, w: 0, h: 0 });
        this.beginCoord = beginCoord;
        this.endCoord = endCoord;
    }

    onDraw() {
        this.gfx.drawLineHeavy(this.beginCoord, this.endCoord);
    }

}

export { LineElt };
