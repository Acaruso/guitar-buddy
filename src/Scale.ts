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

class Scale {
    root: number;
    curNote: number;
    scaleQuality: ScaleQuality;
    notes: Note[];

    constructor(
        root: number,
        scaleQuality: ScaleQuality,
    ) {
        this.root = root;
        this.curNote = 0;
        this.scaleQuality = scaleQuality;
        this.notes = [];
        let notesSharpsFlats: Array<Note> = [];

        if (this.scaleQuality === "major" && this.root == 0) {
            notesSharpsFlats = notesSharps;
        } else if (this.scaleQuality === "major" && this.root == 1) {
            notesSharpsFlats = notesFlats;
        } else if (this.scaleQuality === "major" && this.root == 2) {
            notesSharpsFlats = notesSharps;
        } else if (this.scaleQuality === "major" && this.root == 3) {
            notesSharpsFlats = notesFlats;
        } else if (this.scaleQuality === "major" && this.root == 4) {
            notesSharpsFlats = notesFlats;
        } else if (this.scaleQuality === "major" && this.root == 5) {
            notesSharpsFlats = notesSharps;
        } else if (this.scaleQuality === "major" && this.root == 6) {
            notesSharpsFlats = notesFlats;
        } else if (this.scaleQuality === "major" && this.root == 7) {
            notesSharpsFlats = notesSharps;
        } else if (this.scaleQuality === "major" && this.root == 8) {
            notesSharpsFlats = notesFlats;
        } else if (this.scaleQuality === "major" && this.root == 9) {
            // root == 9 -> root is Gb major. Gb major uses Cb.
            notesSharpsFlats = notesCFlat;
        } else if (this.scaleQuality === "major" && this.root == 10) {
            notesSharpsFlats = notesSharps;
        } else if (this.scaleQuality === "major" && this.root == 11) {
            notesSharpsFlats = notesFlats;
        }

        if (this.scaleQuality === "minor" && this.root == 0) {
            notesSharpsFlats = notesSharps;
        } else if (this.scaleQuality === "minor" && this.root == 1) {
            notesSharpsFlats = notesFlats;
        } else if (this.scaleQuality === "minor" && this.root == 2) {
            notesSharpsFlats = notesSharps;
        } else if (this.scaleQuality === "minor" && this.root == 3) {
            notesSharpsFlats = notesFlats;
        } else if (this.scaleQuality === "minor" && this.root == 4) {
            notesSharpsFlats = notesSharps;
        } else if (this.scaleQuality === "minor" && this.root == 5) {
            notesSharpsFlats = notesFlats;
        } else if (this.scaleQuality === "minor" && this.root == 6) {
            // root == 6 -> root is Eb minor. Eb minor uses Cb.
            notesSharpsFlats = notesCFlat;
        } else if (this.scaleQuality === "minor" && this.root == 7) {
            notesSharpsFlats = notesSharps;
        } else if (this.scaleQuality === "minor" && this.root == 8) {
            notesSharpsFlats = notesFlats;
        } else if (this.scaleQuality === "minor" && this.root == 9) {
            notesSharpsFlats = notesSharps;
        } else if (this.scaleQuality === "minor" && this.root == 10) {
            notesSharpsFlats = notesFlats;
        } else if (this.scaleQuality === "minor" && this.root == 11) {
            notesSharpsFlats = notesFlats;
        }

        let baseScale: Array<number> = [];
        if (this.scaleQuality === "major") {
            baseScale = majorScale;
        } else if (this.scaleQuality === "minor") {
            baseScale = minorScale;
        }

        for (let i = 0; i < baseScale.length; i++) {
            let noteNum = modAddition(baseScale[i], this.root, 12);
            this.notes.push(
                notesSharpsFlats[noteNum]
            );
        }
    }
}

export { Scale, ScaleQuality };
