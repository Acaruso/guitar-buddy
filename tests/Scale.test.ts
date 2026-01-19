import { describe, expect, it } from "vitest";
import { Scale, doScalesIntersect, noteToNum } from "../src/Scale"
import { Note } from "../src/Note"

function checkNotes(actualNotes: Array<Note>, expectedNotes: Array<Note>): void {
    expect(actualNotes.length === expectedNotes.length).toBe(true);

    for (let i = 0; i < actualNotes.length; i++) {
        expect(actualNotes[i].noteName === expectedNotes[i].noteName).toBe(true);
        expect(actualNotes[i].noteNum === expectedNotes[i].noteNum).toBe(true);
    }
}

describe("scale", () => {
    it("C major scale", () => {
        const root = 3;
        const scale: Scale = new Scale(root, "major");

        expect(scale.root.noteNum).toBe(root);

        const expectedNotes: Array<Note> = [
            new Note("C",   3),
            new Note("D",   5),
            new Note("E",   7),
            new Note("F",   8),
            new Note("G",  10),
            new Note("A",   0),
            new Note("B",   2),
        ];

        checkNotes(scale.notes, expectedNotes);
    });

    it("Gb major scale, uses Cb", () => {
        const root = 9;
        const scale: Scale = new Scale(root, "major");

        expect(scale.root.noteNum).toBe(root);

        const expectedNotes: Array<Note> = [
            new Note("Gb",  9),
            new Note("Ab", 11),
            new Note("Bb",  1),
            new Note("Cb",  2),
            new Note("Db",  4),
            new Note("Eb",  6),
            new Note("F",   8),
        ];

        checkNotes(scale.notes, expectedNotes);
    });

    it("F minor scale", () => {
        const root = 8;
        const scale: Scale = new Scale(root, "minor");

        expect(scale.root.noteNum).toBe(root);

        const expectedNotes: Array<Note> = [
            new Note("F",   8),
            new Note("G",  10),
            new Note("Ab", 11),
            new Note("Bb",  1),
            new Note("C",   3),
            new Note("Db",  4),
            new Note("Eb",  6),
        ];

        checkNotes(scale.notes, expectedNotes);
    });

    it("Eb minor scale, uses Cb", () => {
        const root = 6;
        const scale: Scale = new Scale(root, "minor");

        expect(scale.root.noteNum).toBe(root);

        const expectedNotes: Array<Note> = [
            new Note("Eb",  6),
            new Note("F",   8),
            new Note("Gb",  9),
            new Note("Ab", 11),
            new Note("Bb",  1),
            new Note("Cb",  2),
            new Note("Db",  4),
        ];

        checkNotes(scale.notes, expectedNotes);
    });

    it("doScalesIntersect true 1", () => {
        const Amin: Scale = new Scale(0, "minor");
        const DbMaj: Scale = new Scale(4, "major");
        const intersection = 8; // F
        const res = doScalesIntersect(Amin, DbMaj, intersection);
        expect(res).toBe(true);
    });

    it("doScalesIntersect false 1", () => {
        const Amin: Scale = new Scale(0, "minor");
        const DbMaj: Scale = new Scale(4, "major");
        const intersection = 6; // Eb
        const res = doScalesIntersect(Amin, DbMaj, intersection);
        expect(res).toBe(false);
    });

    it("doScalesIntersect false 2", () => {
        const Bmin: Scale = new Scale(2, "minor");
        const GMaj: Scale = new Scale(10, "major");
        const intersection = 8; // F -- not in either scale
        const res = doScalesIntersect(Bmin, GMaj, intersection);
        expect(res).toBe(false);
    });

    it("bug test", () => {
        const Bbmin: Scale = new Scale(1, "minor");
        Bbmin.setCurNote(9);
        const Ebmin: Scale = new Scale(6, "minor");
        Bbmin.setCurNote(6);
        const intersection = 9;
        const res = doScalesIntersect(Bbmin, Ebmin, intersection);
        expect(res).toBe(true);
        Ebmin.setCurNote(intersection);
    });

    it("incCurNote", () => {
        const root = noteToNum("C");
        const scale: Scale = new Scale(root, "major");

        expect(scale.root.noteNum).toBe(root);
        expect(scale.getCurNote().noteNum).toBe(root);

        scale.incCurNote(1);
        expect(scale.getCurNote().noteNum).toBe(noteToNum("D"));
        scale.incCurNote(1);
        expect(scale.getCurNote().noteNum).toBe(noteToNum("E"));
        scale.incCurNote(1);
        expect(scale.getCurNote().noteNum).toBe(noteToNum("F"));
        scale.incCurNote(1);
        expect(scale.getCurNote().noteNum).toBe(noteToNum("G"));
        scale.incCurNote(1);
        expect(scale.getCurNote().noteNum).toBe(noteToNum("A"));
        scale.incCurNote(1);
        expect(scale.getCurNote().noteNum).toBe(noteToNum("B"));
        scale.incCurNote(1);
        expect(scale.getCurNote().noteNum).toBe(noteToNum("C"));
    });

    it("setCurNote", () => {
        const root = noteToNum("C");
        const scale: Scale = new Scale(root, "major");

        expect(scale.root.noteNum).toBe(root);
        expect(scale.getCurNote().noteNum).toBe(root);

        scale.setCurNote(noteToNum("F"));
        expect(scale.getCurNote().noteNum).toBe(noteToNum("F"));
    });
});
