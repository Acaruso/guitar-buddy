import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { State } from "../State";
import { FretboardModel, Dir, AbsoluteRelativeMode, StringMode } from "../FretboardModel";
import { BaseElt } from "./BaseElt";
import { CellElt } from "./CellElt";
import { LineElt } from "./LineElt";
import { SingleDotElt } from "./SingleDotElt";
import { DoubleDotElt } from "./DoubleDotElt";
import { constants } from "../constants";

class FretboardElt extends BaseElt {
    state: State;
    topPadding: number = 20;
    fretboardX: number;
    fretboardY: number;
    numRows: number;
    numCols: number;
    stringMode: StringMode;
    cellW: number = 36;
    cellH: number = 30;
    cells: Array<Array<CellElt>>;
    fretboardModel: FretboardModel;

    constructor(
        gfx: Gfx,
        rect: Rect,
        state: State,
        // numRows: number,
        // numCols: number,
    ) {
        super(gfx, rect);

        // this.numRows = numRows;
        // this.numCols = numCols;

        // this.numRows = 6;
        this.numRows = 16;
        this.numCols = 30;

        this.rect = {
            x: rect.x,
            y: rect.y,
            w: this.cellW * this.numCols,
            h: this.cellH * this.numRows + this.topPadding,
        };

        this.fretboardX = this.rect.x;
        this.fretboardY = this.rect.y + this.topPadding;

        this.state = state;

        // this.stringMode = StringMode.Normal;
        this.stringMode = StringMode.Infinite;

        this.cells = [];

        this.fretboardModel = new FretboardModel(this.numRows, this.numCols, this.stringMode);

        // create cells

        for (let row = 0; row < this.numRows; row++) {
            this.cells.push([]);

            for (let col = 0; col < this.numCols; col++) {
                const newCell = new CellElt(
                    this.gfx,
                    {
                        x: this.fretboardX + (this.cellW * col),
                        y: this.fretboardY + (this.cellH * row),
                        w: this.cellW,
                        h: this.cellH,
                        color: constants.lightBlue,
                    },
                    this.state,
                    this.fretboardModel,
                    row,
                    col,
                    this.cells,
                    () => {},
                    false
                );

                this.children.push(newCell);

                this.cells[row].push(newCell);
            }
        }

        // create strings

        for (let i = 0; i < this.numRows; i++) {
            this.children.push(
                new LineElt(
                    this.gfx,
                    {
                        x: this.fretboardX,
                        y: this.fretboardY + (this.cellH * i) + (0.5 * this.cellH)
                    },
                    {
                        x: this.fretboardX + (this.cellW * this.numCols),
                        y: this.fretboardY + (this.cellH * i) + (0.5 * this.cellH)
                    }
                )
            );
        }

        // create frets

        for (let i = 0; i < this.numCols + 1; i++) {
            this.children.push(
                new LineElt(
                    this.gfx,
                    {
                        x: this.fretboardX + (this.cellW * i),
                        y: this.fretboardY + (0.5 * this.cellH)
                    },
                    {
                        x: this.fretboardX + (this.cellW * i),
                        y: this.fretboardY + (this.cellH * this.numRows) - (0.5 * this.cellH)
                    }
                )
            );
        }

        // create fretboard dots

        const singleDotPositions = [2, 4, 6, 8, 14, 16, 18, 20];
        const doubleDotPosition = 11;

        const dotRectW = this.cellW;
        const dotRectH = this.fretboardY - this.rect.y;

        for (let col = 0; col < this.numCols; col++) {
            if (singleDotPositions.includes(col)) {
                this.children.push(
                    new SingleDotElt(
                        this.gfx,
                        {
                            x: this.rect.x + (dotRectW * col),
                            y: this.rect.y,
                            w: dotRectW,
                            h: dotRectH
                        }
                    )
                );
            }

            if (col === doubleDotPosition) {
                this.children.push(
                    new DoubleDotElt(
                        this.gfx,
                        {
                            x: this.rect.x + (dotRectW * col),
                            y: this.rect.y,
                            w: dotRectW,
                            h: dotRectH
                        }
                    )
                );
            }
        }
    }

    onKeyDown(key: string) {
        if (key === "space") {
            if (this.fretboardModel.selected) {
                this.fretboardModel.setToggle(
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

        // global/local mode ////////////////////////////////////

        if (key === "g") {
            this.fretboardModel.toggleGlobalLocalMode();
        }

        if (key === "a") {
            this.fretboardModel.toggleAbsoluteRelativeMode();

            if (this.fretboardModel.getAbsoluteRelativeMode() === AbsoluteRelativeMode.Relative) {
                for (const row of this.cells) {
                    for (const cell of row) {
                        cell.setRelativeModeText();
                    }
                }
            } else if (this.fretboardModel.getAbsoluteRelativeMode() === AbsoluteRelativeMode.Absolute) {
                for (const row of this.cells) {
                    for (const cell of row) {
                        cell.setAbsoluteModeText();
                    }
                }
            }
        }

        // colors ///////////////////////////////////////////////////

        if (key === "1") {
            const color = constants.red;
            if (this.state.keyboard.control) {
                this.fretboardModel.setColorAllToggled(color);
            } else {
                this.fretboardModel.setColor(
                    color,
                    this.fretboardModel.selectedRow,
                    this.fretboardModel.selectedCol
                );
            }
        }

        if (key === "2") {
            const color = constants.green;
            if (this.state.keyboard.control) {
                this.fretboardModel.setColorAllToggled(color);
            } else {
                this.fretboardModel.setColor(
                    color,
                    this.fretboardModel.selectedRow,
                    this.fretboardModel.selectedCol
                );
            }
        }

        if (key === "3") {
            const color = constants.blue;
            if (this.state.keyboard.control) {
                this.fretboardModel.setColorAllToggled(color);
            } else {
                this.fretboardModel.setColor(
                    color,
                    this.fretboardModel.selectedRow,
                    this.fretboardModel.selectedCol
                );
            }
        }

        if (key === "4") {
            const color = constants.gray;
            if (this.state.keyboard.control) {
                this.fretboardModel.setColorAllToggled(color);
            } else {
                this.fretboardModel.setColor(
                    color,
                    this.fretboardModel.selectedRow,
                    this.fretboardModel.selectedCol
                );
            }
        }

        if (key === "0" || key === "`") {
            const color = constants.black;
            if (this.state.keyboard.control) {
                this.fretboardModel.setColorAllToggled(color);
            } else {
                this.fretboardModel.setColor(
                    color,
                    this.fretboardModel.selectedRow,
                    this.fretboardModel.selectedCol
                );
            }
        }

        /////////////////////////////////////////////////////////////

        if (key === "r") {
            this.fretboardModel.setRing(
                this.fretboardModel.selectedRow,
                this.fretboardModel.selectedCol
            );
        }

        if (isArrowKey(key)) {
            const dir = arrowKeyToDir(key);

            // TODO: get rid of moveToggle(), moveToggleByOctave(), and moveToggleByString()?
            // currently they don't work with relative mode
            // not sure if they're useful enough to keep

            if (this.state.keyboard.shift) {
                this.fretboardModel.moveToggle(
                    dir,
                    this.fretboardModel.selectedRow,
                    this.fretboardModel.selectedCol
                );
            } else if (this.state.keyboard.control) {
                if (dir === Dir.Right || dir === Dir.Left) {
                    this.fretboardModel.moveToggleByOctave(
                        dir,
                        this.fretboardModel.selectedRow,
                        this.fretboardModel.selectedCol
                    );
                } else if (dir === Dir.Up || dir === Dir.Down) {
                    this.fretboardModel.moveToggleByString(
                        dir,
                        this.fretboardModel.selectedRow,
                        this.fretboardModel.selectedCol
                    );
                }
            } else {
                this.fretboardModel.moveSelected(dir);

                if (this.fretboardModel.getAbsoluteRelativeMode() === AbsoluteRelativeMode.Relative) {
                    for (const row of this.cells) {
                        for (const cell of row) {
                            cell.setRelativeModeText();
                        }
                    }
                }
            }
        }
    }
}

function isArrowKey(key: string) {
    return (
        key === "arrowup"
        || key === "arrowdown"
        || key === "arrowleft"
        || key === "arrowright"
    );
}

function arrowKeyToDir(key: string) {
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

export { FretboardElt };
