import { Gfx } from "../Gfx";
import { Rect } from "../Rect";
import { Note } from "../Note";
import { BaseElt } from "./BaseElt";
import { TextElt } from "./TextElt";
import { getRandomInt, modAddition } from "../util";

class ScalesGameElt extends BaseElt {
    root: number = 0;
    mult: number = 0;
    curNote: number = 0;
    numNotes: number = 0;
    majorScaleIntervalsUp: Array<number>   = [0, 2, 4, 5, 7, 9, 11];
    majorScaleIntervalsDown: Array<number> = [0, 1, 3, 5, 7, 8, 10];
    majorScaleIntervals: Array<number> = [];
    flipped: boolean = false;
    upDown: Array<string> = ["up", "down"];
    upDownIdx: number = 0;

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

    keysToFlatsSharps: Array<string> = [
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

    constructor(gfx: Gfx, rect: Rect) {
        super(gfx, rect);

        this.getRandVals();

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
            this.textElt.setText(this.getDisplayStrBack());
        } else {
            this.getRandVals();
            this.textElt.setText(this.getDisplayStrFront());
        }

        this.flipped = !this.flipped;
    }

    getDisplayStrFront(): string {
        return `root: ${this.notes[this.root].noteName}, ${this.upDown[this.upDownIdx]} ${this.numNotes - 1}`;
    }

    getDisplayStrBack(): string {
        let arr: Array<string> = [];
        for (let i = 0; i < this.numNotes; i++) {
            const k = modAddition(
                // this.root,
                this.curNote,
                this.mult * this.majorScaleIntervals[i % this.majorScaleIntervals.length],
                12
            );
            arr.push(this.notes[k].noteName);
            if (i == this.numNotes - 1) {
                this.curNote = this.notes[k].noteNum;
            }
        }
        return arr.join(" ");
    }

    getRandVals() {
        this.upDownIdx = getRandomInt(2);
        this.majorScaleIntervals = this.upDown[this.upDownIdx] == "up"
            ? this.majorScaleIntervalsUp
            : this.majorScaleIntervalsDown;
        this.mult = this.upDown[this.upDownIdx] == "up"
            ? 1
            : -1
        this.root = this.getNextRoot();
        // this.numNotes = getRandomInt(3) + 3;
        this.numNotes = 10;
        this.notes = this.keysToFlatsSharps[this.root] == "flats"
            ? this.notesFlats
            : this.notesSharps;
    }

    getNextRoot(): number {
        let root: number = 0;
        while (true) {
            root = getRandomInt(12);
            while (root == this.root) {         // don't pick the same root twice in a row
                root = getRandomInt(12);
            }

            for (let i = 0; i < this.majorScaleIntervals.length; i++) {
                const k = modAddition(
                    root,
                    this.mult * this.majorScaleIntervals[i % this.majorScaleIntervals.length],
                    12
                );
                if (k == this.curNote) {
                    return root;
                }
            }
        }
    }
}

export { ScalesGameElt };
