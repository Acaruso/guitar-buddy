import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { Note } from "../Note";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomInt, modAddition } from "../util";

class ScalesGameElt extends BaseElt {
    root: number = 0;
    offset: number = 0;
    sign: number = 0;
    curNote: number = 0;
    numNotes: number = 0;
    majorScaleIntervalsUp: Array<number>   = [0, 2, 4, 5, 7, 9, 11];
    majorScaleIntervalsDown: Array<number> = [0, 1, 3, 5, 7, 8, 10];
    majorScaleIntervals: Array<number> = [];
    flipped: boolean = false;
    upDown: Array<string> = ["up", "down"];
    upDownIdx: number = 0;
    modes: Array<string> = ["degrees", "thirds"];
    modeIdx: number = 0;
    stepSize: number = 1;
    useThirds: boolean = true;

    notesFlats: Array<Note> = [
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
    notesCFlat: Array<Note> = [ // Gb major scale uses Cb instead of B
        new Note("A",   0),
        new Note("Bb",  1),
        new Note("Cb",  2),
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
    notesSharps: Array<Note> = [
        new Note("A",   0),
        new Note("A#",  1),
        new Note("B",   2),
        new Note("C",   3),
        new Note("C#",  4),
        new Note("D",   5),
        new Note("D#",  6),
        new Note("E",   7),
        new Note("F",   8),
        new Note("F#",  9),
        new Note("G",  10),
        new Note("G#", 11),
    ];
    notes: Array<Note> = [];

    keysToNotes: Array<string> = [
        "sharps",    // 0  - A
        "flats",     // 1  - Bb
        "sharps",    // 2  - B
        "flats",     // 3  - C
        "flats",     // 4  - Db
        "sharps",    // 5  - D
        "flats",     // 6  - Eb
        "sharps",    // 7  - E
        "flats",     // 8  - F
        "flats",     // 9  - Gb
        "sharps",    // 10 - G
        "flats",     // 11 - Ab
    ];

    textSize: number = 82;
    textElt: TextElt;
    nextButton: TextElt;
    useThirdsButton: TextElt;

    constructor(gfx: Gfx, rect: Rect) {
        super(gfx, rect);

        this.getRandVals(true);

        let nextY = this.rect.y;
        this.textElt = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            this.getDisplayStrFront(),
            62
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
        this.useThirdsButton = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            `use thirds: ${this.useThirds}`,
            this.textSize
        );
        this.useThirdsButton.drawRect = true;
        this.useThirdsButton.onClick = () => {
            if (this.useThirds) {
                this.modes = ["degrees"];
            } else {
                this.modes = ["degrees", "thirds"];
            }
            this.useThirds = !this.useThirds;
            this.useThirdsButton.setText(`use thirds: ${this.useThirds}`);
        };
        this.pushChild(this.useThirdsButton);
    }

    update(): void {
        if (this.flipped == false) {
            this.textElt.setText(this.getDisplayStrBack());
        } else {
            this.getRandVals();
            this.textElt.setText(this.getDisplayStrFront());
        }
        this.flipped = !this.flipped;
    }

    getDisplayStrFront(): string {
        return `note: ${this.notes[this.curNote].noteName}`
            + `, root: ${this.notes[this.root].noteName}`
            + `, ${this.upDown[this.upDownIdx]} ${this.numNotes} ${this.modes[this.modeIdx]}`;
    }

    getDisplayStrBack(): string {
        let arr: Array<string> = [];
        for (let i = 0; i < this.numNotes; i++) {
            const k = modAddition(
                this.root,
                this.sign * this.majorScaleIntervals[
                    ((i * this.stepSize) + this.offset) % this.majorScaleIntervals.length
                ],
                12
            );
            arr.push(this.notes[k].noteName);
            if (i == this.numNotes - 1) {
                this.curNote = this.notes[k].noteNum;
            }
        }
        return arr.join(" ");
    }

    getRandVals(init: boolean = false): void {
        this.upDownIdx = getRandomInt(2);
        this.majorScaleIntervals = this.upDown[this.upDownIdx] == "up"
            ? this.majorScaleIntervalsUp
            : this.majorScaleIntervalsDown;
        this.sign = this.upDown[this.upDownIdx] == "up"
            ? 1
            : -1

        if (init) {
            this.root = getRandomInt(12);
            this.curNote = this.root;
            this.offset = 0;
        } else {
            this.root = this.getNextRoot();
        }

        this.numNotes = getRandomInt(3) + 3;
        this.notes = this.keysToNotes[this.root] == "flats"
            ? this.notesFlats
            : this.notesSharps;
        if (this.root === 9) {              // if root == Gb
            this.notes = this.notesCFlat;   // use Cb because Gb major has Cb rather than B
        }
        this.modeIdx = getRandomInt(this.modes.length);
        this.stepSize = this.modes[this.modeIdx] === "degrees"
            ? 1
            : 2;
        if (this.modes[this.modeIdx] === "thirds") {
            this.numNotes = getRandomInt(2) + 3;
        }
    }

    getNextRoot(): number {
        let rootCandidate: number = 0;
        while (true) {
            // don't pick the same root twice in a row
            rootCandidate = getRandomInt(12);
            while (rootCandidate == this.root) {
                rootCandidate = getRandomInt(12);
            }

            for (let i = 0; i < this.majorScaleIntervals.length; i++) {
                const note = modAddition(
                    rootCandidate,
                    this.sign * this.majorScaleIntervals[i % this.majorScaleIntervals.length],
                    12
                );
                if (note == this.curNote) {
                    this.offset = i;
                    return rootCandidate;
                }
            }
        }
    }

    onKeyDown(key: string): void {
        if (key === "space") {
            this.update();
        }
    }
}

export { ScalesGameElt };
