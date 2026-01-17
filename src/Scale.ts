import { Note } from "./Note";
import { modAddition } from "./util";

type ScaleQuality = "major" | "minor" | "mixolydian";

const majorScale: Array<number> = [0, 2, 4, 5, 7, 9, 11];
const minorScale: Array<number> = [0, 2, 3, 5, 7, 8, 10];

const notesFlats: Array<Note> = [
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
const notesCFlat: Array<Note> = [ // Gb major and Eb minor keys use Cb instead of B
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
const notesSharps: Array<Note> = [
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

const noteToNumMap: Record<string, number> = {
    "A":  0,
    "A#": 1,
    "Bb": 1,
    "B":  2,
    "Cb": 2,
    "C":  3,
    "C#": 4,
    "Db": 4,
    "D":  5,
    "D#": 6,
    "Eb": 6,
    "E":  7,
    "F":  8,
    "Gb": 9,
    "F#": 9,
    "G":  10,
    "G#": 11,
    "Ab": 11,
};

function noteToNum(note: string): number {
    const n = noteToNumMap[note];
    if (n === undefined) {
        throw new Error(`Unknown note: ${note}`);
    }
    return n;
}

class Scale {
    root: Note;
    curNote: number;
    scaleQuality: ScaleQuality;
    notes: Note[];
    allNotes: Note[];

    constructor(
        root: number,
        scaleQuality: ScaleQuality,
    ) {
        this.scaleQuality = scaleQuality;
        this.notes = [];
        this.allNotes = [];

        if (this.scaleQuality === "major" && root == 0) {
            this.allNotes = notesSharps;
        } else if (this.scaleQuality === "major" && root == 1) {
            this.allNotes = notesFlats;
        } else if (this.scaleQuality === "major" && root == 2) {
            this.allNotes = notesSharps;
        } else if (this.scaleQuality === "major" && root == 3) {
            this.allNotes = notesFlats;
        } else if (this.scaleQuality === "major" && root == 4) {
            this.allNotes = notesFlats;
        } else if (this.scaleQuality === "major" && root == 5) {
            this.allNotes = notesSharps;
        } else if (this.scaleQuality === "major" && root == 6) {
            this.allNotes = notesFlats;
        } else if (this.scaleQuality === "major" && root == 7) {
            this.allNotes = notesSharps;
        } else if (this.scaleQuality === "major" && root == 8) {
            this.allNotes = notesFlats;
        } else if (this.scaleQuality === "major" && root == 9) {
            // root == 9 -> root is Gb major. Gb major uses Cb.
            this.allNotes = notesCFlat;
        } else if (this.scaleQuality === "major" && root == 10) {
            this.allNotes = notesSharps;
        } else if (this.scaleQuality === "major" && root == 11) {
            this.allNotes = notesFlats;
        }

        if (this.scaleQuality === "minor" && root == 0) {
            this.allNotes = notesSharps;
        } else if (this.scaleQuality === "minor" && root == 1) {
            this.allNotes = notesFlats;
        } else if (this.scaleQuality === "minor" && root == 2) {
            this.allNotes = notesSharps;
        } else if (this.scaleQuality === "minor" && root == 3) {
            this.allNotes = notesFlats;
        } else if (this.scaleQuality === "minor" && root == 4) {
            this.allNotes = notesSharps;
        } else if (this.scaleQuality === "minor" && root == 5) {
            this.allNotes = notesFlats;
        } else if (this.scaleQuality === "minor" && root == 6) {
            // root == 6 -> root is Eb minor. Eb minor uses Cb.
            this.allNotes = notesCFlat;
        } else if (this.scaleQuality === "minor" && root == 7) {
            this.allNotes = notesSharps;
        } else if (this.scaleQuality === "minor" && root == 8) {
            this.allNotes = notesFlats;
        } else if (this.scaleQuality === "minor" && root == 9) {
            this.allNotes = notesSharps;
        } else if (this.scaleQuality === "minor" && root == 10) {
            this.allNotes = notesFlats;
        } else if (this.scaleQuality === "minor" && root == 11) {
            this.allNotes = notesFlats;
        }

        this.root = this.allNotes[root];
        this.curNote = 0;

        let baseScale: Array<number> = [];
        if (this.scaleQuality === "major") {
            baseScale = majorScale;
        } else if (this.scaleQuality === "minor") {
            baseScale = minorScale;
        }

        for (let i = 0; i < baseScale.length; i++) {
            let noteNum = modAddition(baseScale[i], root, 12);
            this.notes.push(
                this.allNotes[noteNum]
            );
        }
    }

    // set the current note of the scale.
    // note that this sets the current note as an "absolute" value.
    // i.e. `setCurNote(3)` doesn't set the current note to the third note of the scale,
    // it sets the current note to C.
    setCurNote(n: number): void {
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i].noteNum === n) {
                this.curNote = i;
                return;
            }
        }
        throw new Error(`setCurNote: couldn't find: ${n}`);
    }

    getCurNote(): Note {
        return this.notes[this.curNote];
    }

    incCurNote(n: number): void {
        this.curNote = modAddition(this.curNote, n, this.notes.length);
    }

    toString(): string {
        return `root: ${this.root.toString()}, curNote: ${this.curNote.toString()}, scaleQuality: ${this.scaleQuality}, notes: ${this.notesToString()}`;
    }

    notesToString(): string {
        let arr = [];
        for (const note of this.notes) {
            arr.push(note.toString());
        }
        return arr.join(", ");
    }
}

// return true if `s1` and `s2` both contain `note`, otherwise return `false`
function doScalesIntersect(s1: Scale, s2: Scale, note: number): boolean {
    let foundInS1: boolean = false;
    let foundInS2: boolean = false;

    for (let i = 0; i < s1.notes.length && i < s2.notes.length; i++) {
        if (s1.notes[i].noteNum === note) {
            foundInS1 = true;
        }
        if (s2.notes[i].noteNum === note) {
            foundInS2 = true;
        }
    }

    return (foundInS1 && foundInS2);
}

export { Scale, ScaleQuality, doScalesIntersect, noteToNum };
