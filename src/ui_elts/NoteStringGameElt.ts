import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomInt } from "../util";

class NoteStringGameElt extends BaseElt {
    textSize: number = 82;
    textPadding: number = 16;
    strang: string = "";
    note: string = "";
    stringElt: TextElt;
    noteElt: TextElt;
    tickRef: any = null;
    tickTime: number = 2300;    // milliseconds
    timerOn: boolean = false;

    strangs: Array<string> = [
        "low E",
        "A",
        "D",
        "G",
        "B",
        "high E",
    ];

    // strangs: Array<string> = [
    //     "D",
    //     "G",
    // ];

    notes: Array<string> = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
    ];

    constructor(
        gfx: Gfx,
        rect: Rect
    ) {
        super(gfx, rect);

        this.stringElt = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: this.rect.y,
                w: this.rect.w,
                h: this.rect.h
            },
            "",
            this.textSize
        );

        this.noteElt = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: this.rect.y + this.textSize + this.textPadding,
                w: this.rect.w,
                h: this.rect.h
            },
            "",
            this.textSize
        );

        this.pushChild(this.stringElt);
        this.pushChild(this.noteElt);

        this.update();
    }

    onKeyDown(key: string) {
        if (key === "space") {
            this.timerOn = true;
            clearInterval(this.tickRef);
            this.tickRef = setInterval(() => this.tick(), this.tickTime);
            this.update();
        }

        if (key === "t") {
            if (!this.timerOn) {
                this.tickRef = setInterval(() => this.tick(), this.tickTime);
            } else {
                clearInterval(this.tickRef);
            }
            this.timerOn = !this.timerOn;
        }
    }

    tick() {
        this.update();
    }

    update() {
        const r1 = getRandomInt(this.strangs.length);
        const r2 = getRandomInt(this.notes.length);
        this.stringElt.setText(`string: ${this.strangs[r1]}`);
        this.noteElt.setText(`note:   ${this.notes[r2]}`);
    }
}

export { NoteStringGameElt };
