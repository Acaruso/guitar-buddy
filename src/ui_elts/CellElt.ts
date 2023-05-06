import { Gfx } from "../Gfx";
import { State } from "../State";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { FretboardModel, AbsoluteRelativeMode } from "../FretboardModel";
import { constants } from "../constants";
import { Rect } from "../Rect";

type OnClick = (x: number, y: number) => void;

class CellElt extends BaseElt {
    state: State;
    fretboardModel: FretboardModel;
    row: number;
    col: number;
    cells: Array<Array<CellElt>>;
    public onClick: OnClick;
    toggled: boolean = false;
    passiveColor: string = constants.white;
    activeColor: string = constants.lightBlue;
    outlineVisible: boolean;
    textElt: TextElt;

    constructor(
        gfx: Gfx,
        rect: Rect,
        state: State,
        fretboardModel: FretboardModel,
        row: number,
        col: number,
        cells: Array<Array<CellElt>>,
        onClick: OnClick = (x: number, y: number) => {},
        outlineVisible: boolean = true
    ) {
        super(gfx, rect);
        this.state = state;
        this.fretboardModel = fretboardModel;
        this.row = row;
        this.col = col;
        this.cells = cells;
        this.onClick = onClick;
        this.outlineVisible = outlineVisible;

        const noteString = this.fretboardModel.getCell(this.row, this.col).noteString;
        const xOffset = (noteString.length === 1) ? 14 : 10;
        const yOffset = 5;

        this.textElt = new TextElt(
            this.gfx,
            {
                x: this.rect.x + xOffset,
                y: this.rect.y + yOffset,
                w: 1,
                h: 1
            },
            noteString,
            constants.white,
            3
        );
    }

    setRelativeModeText() {
        const curNote = this.fretboardModel.strangFretToNote(this.row, this.col);
        const selectedNote = this.fretboardModel.strangFretToNote(
            this.fretboardModel.selectedRow,
            this.fretboardModel.selectedCol
        );
        let delta = (curNote - selectedNote) % 12;
        if (delta < 0) {
            delta = 12 + delta;
        }

        this.textElt.setText(String(delta));

        this.updateRect();
    }

    setAbsoluteModeText() {
        this.textElt.setText(
            this.fretboardModel.getCell(this.row, this.col).noteString
        );

        this.updateRect();
    }

    private updateRect() {
        const newText = this.textElt.text;
        const xOffset = (newText.length === 1) ? 14 : 10;
        const yOffset = 5;
        this.textElt.setRect(
            {
                x: this.rect.x + xOffset,
                y: this.rect.y + yOffset,
                w: 1,
                h: 1
            }
        );
    }

    onDraw() {
        const cell = this.fretboardModel.getCell(this.row, this.col);

        if (cell.toggled) {
            this.gfx.drawFilledCircle(
                {
                    x: this.rect.x + (this.rect.w / 2),
                    y: this.rect.y + (this.rect.h / 2)
                },
                (this.rect.h / 2) - 2,
                0,
                cell.color
            );

            this.textElt.onDraw();

            if (cell.ring) {
                this.gfx.drawOutlinedCircle(
                    {
                        x: this.rect.x + (this.rect.w / 2),
                        y: this.rect.y + (this.rect.h / 2)
                    },
                    (this.rect.h / 2) - 5,                      // radius
                    2,                                          // line width
                    3,                                          // z
                    constants.white                             // color
                );
            }
        }

        if (this.fretboardModel.isSecondaryCursor(this.row, this.col)) {
            this.gfx.drawOutlinedCircle(
                {
                    x: this.rect.x + (this.rect.w / 2),
                    y: this.rect.y + (this.rect.h / 2)
                },
                (this.rect.h / 2) - 2,                          // radius
                4,                                              // line width
                1,                                              // z
                constants.lightGreen                            // color
            );
        }

        if (this.fretboardModel.isSelected(this.row, this.col)) {
            this.gfx.drawOutlinedCircle(
                {
                    x: this.rect.x + (this.rect.w / 2),
                    y: this.rect.y + (this.rect.h / 2)
                },
                (this.rect.h / 2) - 2,                          // radius
                4,                                              // line width
                1,                                              // z
                constants.lightBlue                              // color
            );
        }

        // this is only for debugging:
        if (this.outlineVisible) {
            this.gfx.strokeRectHeavy(this.rect);
        }
    }

    onLeftMBDown(x: number, y: number) {
        if (this.state.keyboard.control) {
            this.fretboardModel.setSecondaryCursor(this.row, this.col);
        } else {
            if (!this.state.keyboard.shift) {
                this.fretboardModel.setToggle(this.row, this.col);
            }
            this.fretboardModel.setSelected(this.row, this.col);

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

export { CellElt };
