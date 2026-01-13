import { Note } from "./Note";

type ScaleQuality = "major" | "minor" | "mixolydian";

const majorScaleIntervalsUp: Array<number>   = [0, 2, 4, 5, 7, 9, 11];
const majorScaleIntervalsDown: Array<number> = [0, 1, 3, 5, 7, 8, 10];
const minorScaleIntervalsUp: Array<number>   = [0, 2, 3, 5, 7, 8, 10];
const minorScaleIntervalsDown: Array<number> = [0, 2, 4, 5, 7, 9, 10];

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
    scaleQuality: ScaleQuality;
    intervalsUp: number[];
    intervalsDown: number[];
    notes: Note[];

    constructor(
        root: number,
        scaleQuality: ScaleQuality,
    ) {
        this.root = root;
        this.scaleQuality = scaleQuality;

        this.intervalsUp = [];
        this.intervalsDown = [];
        this.notes = [];

        if (this.scaleQuality === "major") {
            this.intervalsUp = majorScaleIntervalsUp;
            this.intervalsDown = majorScaleIntervalsDown;
        } else if (this.scaleQuality === "minor") {
            this.intervalsUp = minorScaleIntervalsUp;
            this.intervalsDown = minorScaleIntervalsDown;
        }

        if (this.scaleQuality === "major" && this.root == 0) {
            this.notes = notesSharps;
        } else if (this.scaleQuality === "major" && this.root == 1) {
            this.notes = notesFlats;
        } else if (this.scaleQuality === "major" && this.root == 2) {
            this.notes = notesSharps;
        } else if (this.scaleQuality === "major" && this.root == 3) {
            this.notes = notesFlats;
        } else if (this.scaleQuality === "major" && this.root == 4) {
            this.notes = notesFlats;
        } else if (this.scaleQuality === "major" && this.root == 5) {
            this.notes = notesSharps;
        } else if (this.scaleQuality === "major" && this.root == 6) {
            this.notes = notesFlats;
        } else if (this.scaleQuality === "major" && this.root == 7) {
            this.notes = notesSharps;
        } else if (this.scaleQuality === "major" && this.root == 8) {
            this.notes = notesFlats;
        } else if (this.scaleQuality === "major" && this.root == 9) {
            // root == 9 -> root is Gb major. Gb major uses Cb.
            this.notes = notesCFlat;
        } else if (this.scaleQuality === "major" && this.root == 10) {
            this.notes = notesSharps;
        } else if (this.scaleQuality === "major" && this.root == 11) {
            this.notes = notesFlats;
        }

        if (this.scaleQuality === "minor" && this.root == 0) {
            this.notes = notesSharps;
        } else if (this.scaleQuality === "minor" && this.root == 1) {
            this.notes = notesFlats;
        } else if (this.scaleQuality === "minor" && this.root == 2) {
            this.notes = notesSharps;
        } else if (this.scaleQuality === "minor" && this.root == 3) {
            this.notes = notesFlats;
        } else if (this.scaleQuality === "minor" && this.root == 4) {
            this.notes = notesSharps;
        } else if (this.scaleQuality === "minor" && this.root == 5) {
            this.notes = notesFlats;
        } else if (this.scaleQuality === "minor" && this.root == 6) {
            // root == 6 -> root is Eb minor. Eb minor uses Cb.
            this.notes = notesCFlat;
        } else if (this.scaleQuality === "minor" && this.root == 7) {
            this.notes = notesSharps;
        } else if (this.scaleQuality === "minor" && this.root == 8) {
            this.notes = notesFlats;
        } else if (this.scaleQuality === "minor" && this.root == 9) {
            this.notes = notesSharps;
        } else if (this.scaleQuality === "minor" && this.root == 10) {
            this.notes = notesFlats;
        } else if (this.scaleQuality === "minor" && this.root == 11) {
            this.notes = notesFlats;
        }
    }
}

// const scales: Array<Scale> = [
//     new Scale(0, "major"),
// ];

export { Scale };
