import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { Note } from "../Note";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomBool, getRandomInt, modAddition } from "../util";

class SemitonesUpDownGameElt extends BaseElt {
    noteInt: number = 0;
    note: string = "";
    semitonesInt: number = 0;
    semitonesStr: string = "";
    flipped: boolean = false;

    upDown: Array<string> = ["up", "down"];
    upDownIdx: number = 0;

    modes: Array<string> = ["Semitones", "Major Scale"];
    modeIdx: number = 0;

    majorScaleIntervalsUp: Array<number>   = [2, 4, 5, 7, 9, 11];
    majorScaleIntervalsDown: Array<number> = [1, 3, 5, 7, 8, 10];
    majorScaleNextInterval: number = 0;

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

    textSize: number = 82;
    modeElt: TextElt;
    textElt: TextElt;
    nextButton: TextElt;
    changeModeButton: TextElt;

    constructor(gfx: Gfx, rect: Rect) {
        super(gfx, rect);

        this.noteInt = getRandomInt(this.notes.length);

        let nextY = this.rect.y;
        this.modeElt = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            `Mode: ${this.modes[this.modeIdx]}`,
            this.textSize
        );
        this.pushChild(this.modeElt);

        nextY += 100;
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

        nextY += 100;
        this.changeModeButton = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            "change mode",
            this.textSize
        );
        this.changeModeButton.drawRect = true;
        this.changeModeButton.onClick = () => {
            this.updateMode();
        };
        this.pushChild(this.changeModeButton);
    }

    update(): void {
        if (this.modes[this.modeIdx] == "Semitones") {
            this.updateSemitones();
        } else if (this.modes[this.modeIdx] == "Major Scale") {
            this.updateMajorScale();
        }
    }

    updateSemitones(): void {
        if (this.flipped == false) {
            // get int in range [0, 11), then add 1 to get range [1, 12)
            this.semitonesInt = getRandomInt(11) + 1;
            this.semitonesStr = String(this.semitonesInt);
            this.upDownIdx = getRandomInt(2);
            let s = `${this.semitonesStr} ${this.upDown[this.upDownIdx]}`;
            this.textElt.setText(s);
        } else {
            let x = this.upDown[this.upDownIdx] == "up" ? this.semitonesInt : -1 * this.semitonesInt;
            this.noteInt = modAddition(this.noteInt, x, 12);
            let s = this.notes[this.noteInt].noteName;
            this.textElt.setText(s);
        }
        this.flipped = !this.flipped;
    }

    updateMajorScale(): void {
        if (this.flipped == false) {
            this.upDownIdx = getRandomInt(2);
            let i = getRandomInt(this.majorScaleIntervalsUp.length);
            if (this.upDown[this.upDownIdx] == "up") {
                this.majorScaleNextInterval = this.majorScaleIntervalsUp[i];
            } else {
                this.majorScaleNextInterval = this.majorScaleIntervalsDown[i];
            }
            let s = `${this.majorScaleNextInterval} ${this.upDown[this.upDownIdx]}`;
            this.textElt.setText(s);
        } else {
            let x = this.upDown[this.upDownIdx] == "up"
                ? this.majorScaleNextInterval
                : -1 * this.majorScaleNextInterval;
            this.noteInt = modAddition(this.noteInt, x, 12);
            let s = this.notes[this.noteInt].noteName;
            this.textElt.setText(s);
        }
        this.flipped = !this.flipped;
    }

    updateMode(): void {
        this.modeIdx = (this.modeIdx + 1) % this.modes.length;
        this.modeElt.setText(`Mode: ${this.modes[this.modeIdx]}`);
    }
}

export { SemitonesUpDownGameElt };
