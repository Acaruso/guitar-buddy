import { BaseElt } from "./BaseElt";
import { ToggleRectElt } from "./ToggleRectElt";
import { LineElt } from "./LineElt";
import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { Coord } from "../Coord";
import { constants } from "../constants";

class GridElt extends BaseElt{
    numRows: number;
    numCols: number;
    cellW: number = 36;
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
                            h: this.cellH,
                            color: constants.blue,
                        },
                        () => {},
                        false
                    )
                )
            }
        }

        // create strings

        for (let i = 0; i < numRows; i++) {
            this.children.push(
                new LineElt(
                    this.gfx,
                    {
                        x: this.rect.x,
                        y: this.rect.y + (this.cellH * i) + (0.5 * this.cellH)
                    },
                    {
                        x: this.rect.x + (this.cellW * this.numCols),
                        y: this.rect.y + (this.cellH * i) + (0.5 * this.cellH)
                    }
                )
            );
        }

        // create frets

        for (let i = 0; i < numCols + 1; i++) {
            this.children.push(
                new LineElt(
                    this.gfx,
                    {
                        x: this.rect.x + (this.cellW * i),
                        y: this.rect.y + (0.5 * this.cellH)
                    },
                    {
                        x: this.rect.x + (this.cellW * i),
                        y: this.rect.y + (this.cellH * this.numRows) - (0.5 * this.cellH)
                    }
                )
            );
        }
    }
}

export { GridElt };
