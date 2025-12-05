import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { Note } from "../Note";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomBool, getRandomInt, modDistance } from "../util";

const UP = true;
const DOWN = false;

class NotesSemitoneGameElt extends BaseElt {
    tickRef: any = null;
    tickTime: number = 2000;    // milliseconds
    timerOn: boolean = false;
    textElt: TextElt;
    textSize: number = 82;
    flipped: boolean = false;
    curText: string = "";
    i1: number = 0;
    i2: number = 0;
    upOrDown: boolean = false;
    startStopTimerButton: TextElt;
    increaseTimerIntervalButton: TextElt;
    decreaseTimerIntervalButton: TextElt;
    useAccidentalsButton: TextElt;
    useAccidentals: boolean = false;
    nextButton: TextElt;

    notes: Array<Note> = [];

    notesWithoutAccidentals: Array<Note> = [
        new Note("A", 0),
        new Note("B", 2),
        new Note("C", 3),
        new Note("D", 5),
        new Note("E", 7),
        new Note("F", 8),
        new Note("G", 10),
    ];

    notesWithFlats: Array<Note> = [
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

        this.notes = this.notesWithoutAccidentals;

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

        this.curText = this.getNotesText();
        this.textElt.setText(this.curText);

        let nextY = this.rect.y + 100;
        this.startStopTimerButton = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            "start/stop timer",
            this.textSize
        );
        this.startStopTimerButton.onClick = () => { this.startStopTimer(); };
        this.startStopTimerButton.drawRect = true;
        this.pushChild(this.startStopTimerButton);

        nextY += 100;
        this.increaseTimerIntervalButton = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            "increase timer interval",
            this.textSize
        );
        this.increaseTimerIntervalButton.onClick = () => {
            this.tickTime += 200;
            if (this.timerOn) {
                clearInterval(this.tickRef);
                this.tickRef = setInterval(() => this.tick(), this.tickTime);
            }
        };
        this.increaseTimerIntervalButton.drawRect = true;
        this.pushChild(this.increaseTimerIntervalButton);

        nextY += 100;
        this.decreaseTimerIntervalButton = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            "decrease timer interval",
            this.textSize
        );
        this.decreaseTimerIntervalButton.onClick = () => {
            this.tickTime -= 200;
            if (this.tickTime < 200) this.tickTime = 200;
            if (this.timerOn) {
                clearInterval(this.tickRef);
                this.tickRef = setInterval(() => this.tick(), this.tickTime);
            }
        };
        this.decreaseTimerIntervalButton.drawRect = true;
        this.pushChild(this.decreaseTimerIntervalButton);

        nextY += 100;
        this.useAccidentalsButton = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            "use accidentals",
            this.textSize
        );
        this.useAccidentalsButton.onClick = () => {
            this.useAccidentals = !this.useAccidentals;
            if (this.useAccidentals) {
                this.notes = this.notesWithFlats;
            } else {
                this.notes = this.notesWithoutAccidentals;
            }
        };
        this.useAccidentalsButton.drawRect = true;
        this.pushChild(this.useAccidentalsButton);

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
        this.nextButton.onClick = () => {
            this.update();
        };
        this.nextButton.drawRect = true;
        this.pushChild(this.nextButton);
    }

    tick(): void {
        this.update();
    }

    update(): void {
        if (this.flipped === false) {
            this.flipped = true;
            let res = 0;
            if (this.upOrDown == UP) {
                res = modDistance(this.notes[this.i1].noteNum, this.notes[this.i2].noteNum, 12);
            } else {
                res = modDistance(this.notes[this.i2].noteNum, this.notes[this.i1].noteNum, 12);
            }
            this.curText = String(res);
        } else {
            this.flipped = false;
            this.curText = this.getNotesText();
        }

        this.textElt.setText(this.curText);
    }

    getNotesText(): string {
        this.i1 = getRandomInt(this.notes.length);
        this.i2 = getRandomInt(this.notes.length);
        while (this.i1 === this.i2) {
            this.i2 = getRandomInt(this.notes.length);
        }
        this.upOrDown = getRandomBool();
        let upOrDownStr = this.upOrDown == UP ? "up" : "down";
        return `${this.notes[this.i1].noteName} ${this.notes[this.i2].noteName} ${upOrDownStr}`;
    }

    onKeyDown(key: string): void {
        if (key === "space") {
            this.update();
        } else if (key === "t") {
            this.startStopTimer();
        }
    }

    startStopTimer(): void {
        if (!this.timerOn) {
            this.tickRef = setInterval(() => this.tick(), this.tickTime);
        } else {
            clearInterval(this.tickRef);
        }
        this.timerOn = !this.timerOn;
    }

    // onLeftMBDown(x: number, y: number) {
    //     this.update();
    // }
}

export { NotesSemitoneGameElt };
