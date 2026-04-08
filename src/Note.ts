class Note {
    noteName: string;
    noteNum: number;
    constructor(noteName: string, noteNum: number) {
        this.noteName = noteName;
        this.noteNum = noteNum;
    }

    toString(): string {
        return `{ noteName: ${this.noteName}, noteNum: ${this.noteNum} }`;
    }
}

export { Note };
