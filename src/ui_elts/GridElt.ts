import { BaseElt } from "./BaseElt";
import { RectElt } from "./RectElt";
import { Gfx } from "../Gfx";
import { Rect } from "../Rect";

class GridElt extends BaseElt{
    rows: number;
    cols: number;
    cellW: number = 30;
    cellH: number = 30;
    cells: Array<Array<BaseElt>>;

    constructor(
        gfx: Gfx,
        rect: Rect,
        rows: number,
        cols: number,
    ) {
        super(gfx, rect);
        this.rows = rows;
        this.cols = cols;
        this.cells = [];

        for (let row = 0; row < rows; row++) {
            this.cells.push([]);

            for (let col = 0; col < cols; col++) {
                this.cells[row].push(
                    new RectElt(
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

    onDraw() {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.onDraw();
            }
        }
    }
}

export { GridElt };
