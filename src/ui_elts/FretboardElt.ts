import { Gfx } from "../Gfx";
import { BaseElt } from "./BaseElt";
import { CellElt } from "./CellElt";
import { LineElt } from "./LineElt";
import { constants } from "../constants";
import { Rect } from "../Rect";

class Cell {
    toggled: boolean = false;

    constructor() {

    }
}

class FretboardModel {
    cells: Array<Array<Cell>>;
    numRows: number;
    numCols: number;

    selected: boolean = false;
    selectedRow: number = 0;
    selectedCol: number = 0;

    constructor(
        numRows: number,
        numCols: number
    ) {
        this.numRows = numRows;
        this.numCols = numCols;

        this.cells = [];

        for (let row = 0; row < numRows; row++) {
            this.cells.push([]);
            for (let col = 0; col < numCols; col++) {
                this.cells[row].push(new Cell());
            }
        }
    }

    toggle(row: number, col: number) {
        this.cells[row][col].toggled = !this.cells[row][col].toggled;
    }

    isToggled(row: number, col: number) {
        return this.cells[row][col].toggled;
    }
}

class FretboardElt extends BaseElt {
    numRows: number;
    numCols: number;
    cellW: number = 36;
    cellH: number = 30;
    cells: Array<Array<BaseElt>>;
    fretboardModel: FretboardModel;

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

        this.cells = [];

        this.fretboardModel = new FretboardModel(this.numRows, this.numCols);

        // create cells

        for (let row = 0; row < numRows; row++) {
            this.cells.push([]);

            for (let col = 0; col < numCols; col++) {
                const newCell = new CellElt(
                    this.gfx,
                    {
                        x: this.rect.x + (this.cellW * col),
                        y: this.rect.y + (this.cellH * row),
                        w: this.cellW,
                        h: this.cellH,
                        color: constants.blue,
                    },
                    this.fretboardModel,
                    row,
                    col,
                    () => {},
                    false
                );

                this.children.push(newCell);

                this.cells[row].push(newCell);
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

export { FretboardElt, FretboardModel };
