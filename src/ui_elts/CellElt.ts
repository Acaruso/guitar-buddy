import { Gfx } from "../Gfx";
import { State } from "../State";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { FretboardModel } from "./FretboardElt";
import { constants } from "../constants";
import { Rect } from "../Rect";

type OnClick = (x: number, y: number) => void;

class CellElt extends BaseElt {
    state: State;
    fretboardModel: FretboardModel;
    row: number;
    col: number;
    public onClick: OnClick;
    toggled: boolean = false;
    passiveColor: string = constants.white;
    activeColor: string = constants.darkBlue;
    outlineVisible: boolean;
    textElt: TextElt;

    constructor(
        gfx: Gfx,
        rect: Rect,
        state: State,
        fretboardModel: FretboardModel,
        row: number,
        col: number,
        onClick: OnClick = (x: number, y: number) => {},
        outlineVisible: boolean = true
    ) {
        super(gfx, rect);
        this.state = state;
        this.fretboardModel = fretboardModel;
        this.row = row;
        this.col = col;
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

        if (this.fretboardModel.isSelected(this.row, this.col)) {
            this.gfx.drawOutlinedCircle(
                {
                    x: this.rect.x + (this.rect.w / 2),
                    y: this.rect.y + (this.rect.h / 2)
                },
                (this.rect.h / 2) - 2,                          // radius
                4,                                              // line width
                1,                                              // z
                constants.darkBlue                              // color
            );
        }

        // this is only for debugging:
        if (this.outlineVisible) {
            this.gfx.strokeRectHeavy(this.rect);
        }
    }

    onLeftMBDown(x: number, y: number) {
        if (!this.state.keyboard.shift) {
            this.fretboardModel.setToggle(this.row, this.col);
        }
        this.fretboardModel.setSelected(this.row, this.col);
    }
}

export { CellElt };
