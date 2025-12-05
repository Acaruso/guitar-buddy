import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { Note } from "../Note";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomBool, getRandomInt, modAddition } from "../util";

const UP = true;
const DOWN = false;

class SemitonesUpDownGameElt extends BaseElt {
    noteInt: number = 0;
    note: string = "";
    semitonesInt: number = 0;
    semitonesStr: string = "";
    upDown: boolean = false;
    flipped: boolean = false;

    textSize: number = 82;
    textElt: TextElt;
    nextButton: TextElt;

    notes: Array<Note> = [
        new Note("A",   0),
        new Note("Bb",  1),
        new Note("B",   2),
        new Note("C",   3),
        new Note("Db",  4),
        new Note("D",   5),
        new Note("Eb",  6),
        new Note("E",   7),
        new Note("F",   8),
        new Note("Gb",  9),
        new Note("G",  10),
        new Note("Ab", 11),
    ];

    constructor(gfx: Gfx, rect: Rect) {
        super(gfx, rect);

        this.noteInt = getRandomInt(this.notes.length);

        let nextY = this.rect.y;
        this.textElt = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            this.notes[this.noteInt].noteName,
            this.textSize
        );
        this.pushChild(this.textElt);

        nextY += 100;
        this.nextButton = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            "next",
            this.textSize
        );
        this.nextButton.drawRect = true;
        this.nextButton.onClick = () => {
            this.update();
        };
        this.pushChild(this.nextButton);
    }

    update(): void {
        if (this.flipped == false) {
            this.semitonesInt = getRandomInt(11) + 1; // get int in range [0, 11), then add 1 to get range [1, 12)
            this.semitonesStr = String(this.semitonesInt);
            this.upDown = getRandomBool();
            let upDownStr = this.upDown == UP ? "up" : "down";
            let s = `${this.semitonesStr} ${upDownStr}`;
            this.textElt.setText(s);
        } else {
            let x = this.upDown == UP ? this.semitonesInt : -1 * this.semitonesInt;
            this.noteInt = modAddition(this.noteInt, x, 12);
            let s = this.notes[this.noteInt].noteName;
            this.textElt.setText(s);
        }

        this.flipped = !this.flipped;
    }
}

export { SemitonesUpDownGameElt };
