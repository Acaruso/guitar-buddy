import { BaseElt } from "./BaseElt";
import { ToggleRectElt } from "./ToggleRectElt";
import { Gfx } from "../Gfx";
import { Rect } from "../Rect";

class GridElt extends BaseElt{
    numRows: number;
    numCols: number;
    cellW: number = 30;
    cellH: number = 30;

    constructor(
        gfx: Gfx,
        rect: Rect,
        numRows: number,
        numCols: number,
    ) {
        super(gfx, rect);

        this.rect = {
            x: rect.x,
            y: rect.y,
            w: this.cellW * numCols,
            h: this.cellH * numRows
        }

        this.numRows = numRows;
        this.numCols = numCols;

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                this.children.push(
                    new ToggleRectElt(
                        this.gfx,
                        {
                            x: this.rect.x + (this.cellW * col),
                            y: this.rect.y + (this.cellH * row),
                            w: this.cellW,
                            h: this.cellH
                        }
                    )
                )
            }
        }
    }
}

export { GridElt };
