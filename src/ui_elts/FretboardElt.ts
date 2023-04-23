import { Gfx } from "../Gfx";
import { State } from "../State";
import { FretboardModel, Dir } from "./FretboardModel";
import { BaseElt } from "./BaseElt";
import { CellElt } from "./CellElt";
import { LineElt } from "./LineElt";
import { constants } from "../constants";
import { Rect } from "../Rect";

class FretboardElt extends BaseElt {
    state: State;
    numRows: number;
    numCols: number;
    cellW: number = 36;
    cellH: number = 30;
    cells: Array<Array<BaseElt>>;
    fretboardModel: FretboardModel;

    constructor(
        gfx: Gfx,
        rect: Rect,
        state: State,
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

        this.state = state;

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
                    this.state,
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

    onKeyDown(key: string) {
        if (key === "space") {
            if (this.fretboardModel.selected) {
                this.fretboardModel.toggle(
                    this.fretboardModel.selectedRow,
                    this.fretboardModel.selectedCol
                );
            }
        }

        if (key === "escape") {
            this.fretboardModel.unselect();
        }

        if (key === "q" && this.state.keyboard.control) {
            this.fretboardModel.untoggleAll();
        }

        if (this.isArrowKey(key)) {
            const dir = this.keyToDir(key);

            if (
                this.state.keyboard.shift
                && this.fretboardModel.isToggled(
                    this.fretboardModel.selectedRow,
                    this.fretboardModel.selectedCol
                )
            ) {
                this.fretboardModel.moveToggle(
                    dir,
                    this.fretboardModel.selectedRow,
                    this.fretboardModel.selectedCol
                );
            }

            this.fretboardModel.moveSelected(dir);
        }
    }

    isArrowKey(key: string) {
        return (
            key === "arrowup"
            || key === "arrowdown"
            || key === "arrowleft"
            || key === "arrowright"
        );
    }

    keyToDir(key: string) {
        switch (key) {
            case "arrowup":
                return Dir.Up;
            case "arrowdown":
                return Dir.Down;
            case "arrowleft":
                return Dir.Left;
            case "arrowright":
                return Dir.Right;
            default:
                return Dir.Up;
        }
    }
}

export { FretboardElt, FretboardModel };
