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
    upDown: Array<string> = ["up", "down"];
    upDownIdx: number = 0;
    modes: Array<string> = ["degrees", "thirds"];
    modeIdx: number = 0;
    stepSize: number = 1;

    majorScaleIntervalsUp: Array<number>   = [0, 2, 4, 5, 7, 9, 11];
    majorScaleIntervalsDown: Array<number> = [0, 1, 3, 5, 7, 8, 10];
    minorScaleIntervalsUp: Array<number>   = [0, 2, 3, 5, 7, 8, 10];
    minorScaleIntervalsDown: Array<number> = [0, 2, 4, 5, 7, 9, 10];
    scaleIntervals: Array<number> = [];

    scales: Array<string> = ["major", "minor"];
    scaleIdx: number = 0;

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
    notesCFlat: Array<Note> = [ // Gb major and Eb minor keys use Cb instead of B
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

    keysToSharpsFlatsMajor: Array<string> = [
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
    keysToSharpsFlatsMinor: Array<string> = [
        "sharps",    // 0  - A
        "flats",     // 1  - Bb (A#)
        "sharps",    // 2  - B
        "flats",     // 3  - C
        "sharps",    // 4  - C#
        "flats",     // 5  - D
        "flats",     // 6  - Eb (D#)
        "sharps",    // 7  - E
        "flats",     // 8  - F
        "sharps",    // 9  - F#
        "flats",     // 10 - G
        "flats",     // 11 - Ab (G#)
    ];
    keysToSharpsFlats: Array<string> = [];

    displayElt1: TextElt;
    displayElt2: TextElt;
    nextButton: TextElt;
    useThirdsButton: TextElt;
    useMinorScalesButton: TextElt;

    flipped: boolean = false;
    useThirds: boolean = true;
    useMinorScales: boolean = true;
    displayTextSize: number = 62;
    buttonTextSize: number = 82;

    constructor(gfx: Gfx, rect: Rect) {
        super(gfx, rect);

        this.getRandVals(true);

        let nextY = this.rect.y;
        this.displayElt1 = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            this.getDisplay1TextFront(),
            this.displayTextSize
        );
        this.pushChild(this.displayElt1);

        nextY += 80;
        this.displayElt2 = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            this.getDisplay2TextFront(),
            this.displayTextSize
        );
        this.pushChild(this.displayElt2);

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
            this.buttonTextSize
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
            this.buttonTextSize
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

        nextY += 100;
        this.useMinorScalesButton = new TextElt(
            this.gfx,
            {
                x: this.rect.x,
                y: nextY,
                w: 1100,
                h: 100
            },
            `use minor scales: ${this.useMinorScales}`,
            this.buttonTextSize
        );
        this.useMinorScalesButton.drawRect = true;
        this.useMinorScalesButton.onClick = () => {
            if (this.useMinorScales) {
                this.scales = ["major"];
            } else {
                this.modes = ["major", "minor"];
            }
            this.useMinorScales = !this.useMinorScales;
            this.useMinorScalesButton.setText(`use minor scales: ${this.useMinorScales}`);
        };
        this.pushChild(this.useMinorScalesButton);
    }

    update(): void {
        if (this.flipped == false) {
            this.displayElt2.setText(this.getDisplay2TextBack());
        } else {
            this.getRandVals();
            this.displayElt1.setText(this.getDisplay1TextFront());
            this.displayElt2.setText(this.getDisplay2TextFront());
        }
        this.flipped = !this.flipped;
    }

    getDisplay1TextFront(): string {
        return `${this.notes[this.root].noteName} ${this.scales[this.scaleIdx]}`;
    }

    getDisplay2TextFront(): string {
        return `note: ${this.notes[this.curNote].noteName}`
            + `, ${this.upDown[this.upDownIdx]} ${this.numNotes} ${this.modes[this.modeIdx]}`;
    }

    getDisplay2TextBack(): string {
        let arr: Array<string> = [];
        for (let i = 0; i < this.numNotes; i++) {
            const k = modAddition(
                this.root,
                this.sign * this.scaleIntervals[
                    ((i * this.stepSize) + this.offset) % this.scaleIntervals.length
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
        if (init) {
            this.root = getRandomInt(12);
            this.curNote = this.root;
            this.offset = 0;
        } else {
            this.root = this.getNextRoot();
        }

        this.upDownIdx = getRandomInt(this.upDown.length);
        this.scaleIdx  = getRandomInt(this.scales.length);

        if (this.scales[this.scaleIdx] == "major") {
            this.keysToSharpsFlats = this.keysToSharpsFlatsMajor;
            if (this.root === 9) {              // if root == Gb
                this.notes = this.notesCFlat;   // use Cb because Gb major has Cb rather than B
            } else {
                if (this.keysToSharpsFlats[this.root] == "flats") {
                    this.notes = this.notesFlats;
                } else {
                    this.notes = this.notesSharps;
                }
            }
            if (this.upDown[this.upDownIdx] == "up") {
                this.scaleIntervals = this.majorScaleIntervalsUp;
            } else {
                this.scaleIntervals = this.majorScaleIntervalsDown;
            }
        } else if (this.scales[this.scaleIdx] == "minor") {
            this.keysToSharpsFlats = this.keysToSharpsFlatsMinor;
            if (this.root === 6) {              // if root == Eb
                this.notes = this.notesCFlat;   // use Cb because Eb minor has Cb rather than B
            } else {
                if (this.keysToSharpsFlats[this.root] == "flats") {
                    this.notes = this.notesFlats;
                } else {
                    this.notes = this.notesSharps;
                }
            }
            if (this.upDown[this.upDownIdx] == "up") {
                this.scaleIntervals = this.minorScaleIntervalsUp;
            } else {
                this.scaleIntervals = this.minorScaleIntervalsDown;
            }
        }

        this.sign = this.upDown[this.upDownIdx] == "up"
            ? 1
            : -1

        this.numNotes = getRandomInt(3) + 3;

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

            for (let i = 0; i < this.scaleIntervals.length; i++) {
                const note = modAddition(
                    rootCandidate,
                    this.sign * this.scaleIntervals[i % this.scaleIntervals.length],
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
