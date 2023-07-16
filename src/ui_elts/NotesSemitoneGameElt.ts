import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomInt } from "../util";

class Note {
    noteName: string;
    noteNum: number;
    constructor(noteName: string, noteNum: number) {
        this.noteName = noteName;
        this.noteNum = noteNum;
    }
}

const notes = [
    new Note("A", 0),
    new Note("B", 2),
    new Note("C", 3),
    new Note("D", 5),
    new Note("E", 7),
    new Note("F", 8),
    new Note("G", 10),
];

function modAddition(a: number, b: number, m: number) {
    let res = b - a;
    if (res < 0) {
        res = m + res;
    }
    return res;
}

class NotesSemitoneGameElt extends BaseElt {
    tickRef: any = null;
    tickTime: number = 2900;    // milliseconds
    timerOn: boolean = false;
    textElt: TextElt;
    textSize: number = 82;
    flipped: boolean = false;
    curText: string = "";
    i1: number = 0;
    i2: number = 0;

    constructor(gfx: Gfx, rect: Rect) {
        super(gfx, rect);

        this.textElt = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: this.rect.y,
                w: this.rect.w,
                h: this.rect.h
            },
            this.curText,
            this.textSize
        );

        this.pushChild(this.textElt);

        this.i1 = getRandomInt(notes.length);
        this.i2 = getRandomInt(notes.length);
        while (this.i1 === this.i2) {
            this.i2 = getRandomInt(notes.length);
        }
        this.curText = `${notes[this.i1].noteName} ${notes[this.i2].noteName}`;
        this.textElt.setText(this.curText);
    }

    update() {
        if (this.flipped === false) {
            this.flipped = true;
            let res = modAddition(notes[this.i1].noteNum, notes[this.i2].noteNum, 12);
            this.curText = String(res);
        } else {
            this.i1 = getRandomInt(notes.length);
            this.i2 = getRandomInt(notes.length);
            while (this.i1 === this.i2) {
                this.i2 = getRandomInt(notes.length);
            }

            this.flipped = false;
            this.curText = `${notes[this.i1].noteName} ${notes[this.i2].noteName}`;
        }

        this.textElt.setText(this.curText);
    }

    onKeyDown(key: string) {
        if (key === "space") {
            this.update();
        }
    }
}

export { NotesSemitoneGameElt };
